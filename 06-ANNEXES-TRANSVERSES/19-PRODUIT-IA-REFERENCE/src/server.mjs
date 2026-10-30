import { createServer } from "node:http";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { retrieve } from "./retriever.mjs";
import { generate } from "./llm_client.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultKnowledgePath = path.join(here, "..", "data", "knowledge.json");

export function loadKnowledge(knowledgePath = defaultKnowledgePath) {
  const parsed = JSON.parse(readFileSync(knowledgePath, "utf8"));
  if (!Array.isArray(parsed.documents)) throw new TypeError("knowledge.json doit contenir documents[]");
  const ids = new Set();
  for (const doc of parsed.documents) {
    if (!doc || typeof doc.id !== "string" || !doc.id || typeof doc.text !== "string" || !doc.text.trim()) {
      throw new TypeError("document de connaissance invalide");
    }
    if (typeof doc.tenantId !== "string" || !doc.tenantId) {
      throw new TypeError(`tenantId manquant pour le document ${doc.id}`);
    }
    if (ids.has(`${doc.tenantId}\0${doc.id}`)) throw new TypeError(`id dupliqué dans un tenant : ${doc.id}`);
    ids.add(`${doc.tenantId}\0${doc.id}`);
  }
  return parsed.documents;
}

export function createAppServer({
  apiToken,
  tenantId = "demo",
  knowledge = loadKnowledge(),
  generateFn = generate,
  maxBodyBytes = 16_384,
  maxQuestionChars = 2_000,
  rateLimitWindowMs = 60_000,
  maxRequestsPerWindow = 120,
  maxInFlight = 32,
  now = Date.now,
  logger = (record) => console.log(JSON.stringify(record)),
} = {}) {
  if (!isUsableToken(apiToken)) {
    throw new TypeError("API_TOKEN doit être un secret non-placeholder d’au moins 32 caractères");
  }
  if (typeof tenantId !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(tenantId)) {
    throw new TypeError("API_TENANT_ID invalide");
  }
  if (!Array.isArray(knowledge)) throw new TypeError("knowledge doit être un tableau");
  for (const doc of knowledge) {
    if (!doc || typeof doc.id !== "string" || typeof doc.text !== "string" || typeof doc.tenantId !== "string") {
      throw new TypeError("chaque document doit contenir id, text et tenantId");
    }
  }
  for (const value of [maxBodyBytes, maxQuestionChars, rateLimitWindowMs, maxRequestsPerWindow, maxInFlight]) {
    if (!Number.isInteger(value) || value <= 0) throw new TypeError("limite de serveur invalide");
  }

  const limits = new Map();
  const authFailures = new Map();
  const durations = [];
  const metrics = { requests: 0, errors: 0, queries: 0, refusals: 0, degraded: 0, inFlight: 0 };
  const tenantDocuments = knowledge.filter((doc) => doc.tenantId === tenantId);

  const server = createServer(async (req, res) => {
    const started = now();
    const requestId = randomUUID();
    const url = new URL(req.url || "/", "http://localhost");
    res.setHeader("x-request-id", requestId);
    res.setHeader("x-content-type-options", "nosniff");
    res.setHeader("cache-control", "no-store");

    const finish = (status, extras = {}) => {
      metrics.requests++;
      if (status >= 400) metrics.errors++;
      const durationMs = Math.max(0, now() - started);
      durations.push(durationMs);
      if (durations.length > 1_000) durations.shift();
      try {
        logger({ event: "http_request", requestId, method: req.method, path: url.pathname, status, durationMs, ...extras });
      } catch { /* un logger défaillant ne doit pas casser la réponse */ }
    };
    const json = (status, value, extras = {}) => {
      if (res.writableEnded) return;
      res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(value));
      finish(status, extras);
    };

    if (req.method === "GET" && url.pathname === "/healthz") {
      return json(200, { status: "ok" });
    }
    if (req.method === "GET" && url.pathname === "/readyz") {
      return json(tenantDocuments.length > 0 ? 200 : 503, { status: tenantDocuments.length > 0 ? "ready" : "not-ready" });
    }

    const clientKey = req.socket.remoteAddress || "unknown"; // Ne pas faire confiance à X-Forwarded-For sans proxy de confiance configuré.
    if (!secureTokenMatches(req.headers.authorization, apiToken)) {
      const time = now();
      const attempt = authFailures.get(clientKey);
      if (!attempt || time - attempt.start >= rateLimitWindowMs) {
        authFailures.set(clientKey, { start: time, count: 1 });
      } else if (attempt.count >= Math.min(20, maxRequestsPerWindow)) {
        res.setHeader("retry-after", String(Math.max(1, Math.ceil((rateLimitWindowMs - (time - attempt.start)) / 1_000))));
        return json(429, { error: "authentication_rate_limit_exceeded", requestId });
      } else {
        attempt.count++;
      }
      pruneOldEntries(authFailures, time, rateLimitWindowMs);
      return json(401, { error: "unauthorized", requestId });
    }
    authFailures.delete(clientKey);

    if (req.method === "GET" && url.pathname === "/metrics") {
      const ordered = [...durations].sort((a, b) => a - b);
      const percentile = (p) => ordered.length ? ordered[Math.max(0, Math.ceil(p * ordered.length) - 1)] : 0;
      const body = [
        "# HELP af_http_requests_total Total HTTP requests.",
        "# TYPE af_http_requests_total counter",
        `af_http_requests_total ${metrics.requests}`,
        "# HELP af_http_errors_total Total HTTP responses with status >= 400.",
        "# TYPE af_http_errors_total counter",
        `af_http_errors_total ${metrics.errors}`,
        "# HELP af_query_requests_total Total query requests admitted to processing.",
        "# TYPE af_query_requests_total counter",
        `af_query_requests_total ${metrics.queries}`,
        "# HELP af_query_refusals_total Queries refused for lack of retrieval evidence.",
        "# TYPE af_query_refusals_total counter",
        `af_query_refusals_total ${metrics.refusals}`,
        "# HELP af_query_degraded_total LLM calls that returned degraded fallback mode.",
        "# TYPE af_query_degraded_total counter",
        `af_query_degraded_total ${metrics.degraded}`,
        "# HELP af_requests_in_flight Current query requests in flight.",
        "# TYPE af_requests_in_flight gauge",
        `af_requests_in_flight ${metrics.inFlight}`,
        "# HELP af_http_request_duration_ms_percentile Sampled request duration percentiles in milliseconds.",
        "# TYPE af_http_request_duration_ms_percentile gauge",
        `af_http_request_duration_ms_percentile{quantile="0.5"} ${percentile(0.5)}`,
        `af_http_request_duration_ms_percentile{quantile="0.95"} ${percentile(0.95)}`,
        "",
      ].join("\n");
      res.writeHead(200, { "content-type": "text/plain; version=0.0.4; charset=utf-8" });
      res.end(body);
      finish(200);
      return;
    }

    if (url.pathname !== "/v1/query") return json(404, { error: "not_found", requestId });
    if (req.method !== "POST") {
      res.setHeader("allow", "POST");
      return json(405, { error: "method_not_allowed", requestId });
    }

    const currentTime = now();
    const slot = limits.get(clientKey);
    if (!slot || currentTime - slot.start >= rateLimitWindowMs) {
      limits.set(clientKey, { start: currentTime, count: 1 });
    } else if (slot.count >= maxRequestsPerWindow) {
      res.setHeader("retry-after", String(Math.max(1, Math.ceil((rateLimitWindowMs - (currentTime - slot.start)) / 1_000))));
      return json(429, { error: "rate_limit_exceeded", requestId });
    } else {
      slot.count++;
    }
    pruneOldEntries(limits, currentTime, rateLimitWindowMs);
    if (metrics.inFlight >= maxInFlight) {
      return json(503, { error: "capacity_limit_exceeded", requestId });
    }

    metrics.inFlight++;
    metrics.queries++;
    let mode = "unknown";
    try {
      const body = await readJsonBody(req, maxBodyBytes);
      const question = typeof body.question === "string" ? body.question.trim() : "";
      if (!question || question.length > maxQuestionChars) {
        return json(400, { error: "invalid_question", requestId, maxQuestionChars });
      }
      // Tenant scope comes from server-side credentials/configuration, never from the request body.
      // Filter authorization BEFORE retrieval and before any context reaches the model.
      const hits = retrieve(question, tenantDocuments, 3);
      if (hits.length === 0) {
        metrics.refusals++;
        mode = "refused";
        return json(200, {
          requestId,
          mode,
          answerStatus: "refused-insufficient-evidence",
          answer: "Les documents autorisés ne fournissent pas de preuve suffisante pour répondre. Aucune réponse générée n'a été demandée au modèle.",
          retrieved: [],
          model: "none",
          failureMode: "NO_AUTHORIZED_RETRIEVAL_EVIDENCE",
        }, { mode });
      }

      const context = hits.map((hit) => `[${hit.id}] ${hit.text}`).join("\n---\n");
      const result = await generateFn({ context, question });
      const acceptedModes = new Set(["live", "degraded", "deterministic-fallback"]);
      if (!result || !acceptedModes.has(result.mode) || typeof result.answer !== "string" || !result.answer.trim()
        || (result.model != null && typeof result.model !== "string")) {
        const error = new Error("provider result does not match the response contract");
        error.statusCode = 502;
        error.code = "invalid_provider_result";
        throw error;
      }
      mode = result.mode;
      if (result.mode === "degraded") metrics.degraded++;
      const answerStatus = result.mode === "live" ? "unverified-model-output" : "deterministic-context-fallback";
      return json(200, {
        requestId,
        mode: result.mode,
        answerStatus,
        answer: result.answer,
        retrieved: hits.map(({ id, score }) => ({ id, score: Number(score.toFixed(4)) })),
        model: result.model || "none",
        failureMode: result.failure_mode ? safeFailureCode(result.failure_mode) : null,
      }, { mode });
    } catch (error) {
      const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
      const code = error?.code && (status < 500 || (status === 502 && error.code === "invalid_provider_result")) ? error.code : "internal_error";
      return json(status, { error: code, requestId }, { mode, errorCode: code });
    } finally {
      metrics.inFlight = Math.max(0, metrics.inFlight - 1);
    }
  });

  server.requestTimeout = 10_000;
  server.headersTimeout = 12_000;
  server.keepAliveTimeout = 5_000;
  server.maxRequestsPerSocket = 100;
  return server;
}

function safeFailureCode(raw) {
  if (raw === "timeout") return "provider_timeout";
  const allowed = new Set([
    "LLM_INVALID_ENDPOINT", "LLM_INVALID_ENDPOINT_PROTOCOL", "LLM_INVALID_ENDPOINT_CREDENTIALS",
    "LLM_HTTPS_REQUIRED", "LLM_INVALID_CONTENT_TYPE", "LLM_RESPONSE_TOO_LARGE",
    "LLM_INVALID_JSON", "LLM_EMPTY_RESPONSE",
  ]);
  if (allowed.has(raw)) return raw.toLowerCase();
  if (typeof raw === "string" && /^LLM_HTTP_\d{3}$/.test(raw)) return "provider_http_error";
  return "provider_request_failed";
}

function pruneOldEntries(map, currentTime, windowMs) {
  if (map.size <= 10_000) return;
  for (const [key, value] of map) {
    if (currentTime - value.start >= windowMs) map.delete(key);
    if (map.size <= 8_000) break;
  }
  while (map.size > 10_000) map.delete(map.keys().next().value);
}

function secureTokenMatches(header, token) {
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice(7), "utf8");
  const expected = Buffer.from(token, "utf8");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

async function readJsonBody(req, maxBytes) {
  const contentType = String(req.headers["content-type"] || "");
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    const error = new Error("JSON content type required");
    error.statusCode = 415;
    error.code = "unsupported_media_type";
    throw error;
  }
  const declared = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(declared) && declared > maxBytes) {
    const error = new Error("request body too large");
    error.statusCode = 413;
    error.code = "payload_too_large";
    req.resume();
    throw error;
  }
  const chunks = [];
  let bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > maxBytes) {
      req.resume();
      const error = new Error("request body too large");
      error.statusCode = 413;
      error.code = "payload_too_large";
      throw error;
    }
    chunks.push(chunk);
  }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch {
    const error = new Error("invalid JSON");
    error.statusCode = 400;
    error.code = "invalid_json";
    throw error;
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    const error = new Error("JSON object required");
    error.statusCode = 400;
    error.code = "invalid_json_shape";
    throw error;
  }
  return body;
}

export function readRuntimeConfig(env = process.env) {
  const apiToken = env.API_TOKEN;
  if (!isUsableToken(apiToken)) {
    throw new Error("API_TOKEN requis : secret non-placeholder d’au moins 32 caractères ; générer une valeur cryptographiquement aléatoire");
  }
  const tenantId = env.API_TENANT_ID || "demo";
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(tenantId)) throw new Error("API_TENANT_ID invalide");
  const port = boundedEnvInt(env.PORT, 8080, 1, 65535);
  const host = env.HOST || "127.0.0.1";
  const maxBodyBytes = boundedEnvInt(env.MAX_BODY_BYTES, 16_384, 1_024, 1_000_000);
  const maxQuestionChars = boundedEnvInt(env.MAX_QUESTION_CHARS, 2_000, 32, 20_000);
  const maxRequestsPerWindow = boundedEnvInt(env.RATE_LIMIT_REQUESTS, 120, 1, 100_000);
  const maxInFlight = boundedEnvInt(env.MAX_IN_FLIGHT, 32, 1, 10_000);
  return { apiToken, tenantId, port, host, maxBodyBytes, maxQuestionChars, maxRequestsPerWindow, maxInFlight };
}

function isUsableToken(value) {
  if (typeof value !== "string" || value.length < 32) return false;
  const normalized = value.toLowerCase();
  const placeholderPatterns = [
    /replace[-_ ]?with/, /change[-_ ]?me/, /placeholder/, /example/, /your[-_ ]/, /not[-_ ]a[-_ ]secret/,
    /random[-_ ]token/, /local[-_ ]test/, /insert[-_ ]token/, /todo/,
  ];
  return !placeholderPatterns.some((pattern) => pattern.test(normalized));
}

function boundedEnvInt(value, fallback, min, max) {
  if (value == null || value === "") return fallback;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new Error(`configuration numérique invalide : attendu un entier entre ${min} et ${max}`);
  }
  return n;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const config = readRuntimeConfig();
    const server = createAppServer(config);
    server.listen(config.port, config.host, () => {
      console.log(JSON.stringify({ event: "server_started", host: config.host, port: config.port, tenantBindingConfigured: true }));
    });
    const shutdown = (signal) => {
      console.log(JSON.stringify({ event: "server_shutdown_started", signal }));
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(1), 8_000).unref();
    };
    process.once("SIGTERM", () => shutdown("SIGTERM"));
    process.once("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
