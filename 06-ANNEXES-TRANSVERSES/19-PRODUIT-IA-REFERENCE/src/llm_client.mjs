export async function generate({ context, question, fetchImpl = fetch }) {
  if (typeof context !== "string" || typeof question !== "string") {
    throw new TypeError("context and question must be strings");
  }

  const endpoint = process.env.LLM_BASE_URL;
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL || "configured-model";

  if (!endpoint || !apiKey) {
    return {
      mode: "deterministic-fallback",
      answer: buildFallback(context, question),
      model: "none",
    };
  }

  validateEndpoint(endpoint);
  const timeoutMs = boundedInt(process.env.LLM_TIMEOUT_MS, 8_000, 1_000, 30_000);
  const maxResponseBytes = boundedInt(
    process.env.LLM_MAX_RESPONSE_BYTES,
    1_000_000,
    16_384,
    8_000_000,
  );

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "Answer only from the provided context. If the context is insufficient, say so.",
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nQuestion:\n${question}`,
          },
        ],
        temperature: 0,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`LLM_HTTP_${response.status}`);
    }

    const contentType = response.headers?.get?.("content-type") || "";
    if (contentType && !/application\/(json|.+\+json)(?:;|$)/i.test(contentType)) {
      throw new Error("LLM_INVALID_CONTENT_TYPE");
    }

    const declaredLength = Number(response.headers?.get?.("content-length") || "0");
    if (Number.isFinite(declaredLength) && declaredLength > maxResponseBytes) {
      throw new Error("LLM_RESPONSE_TOO_LARGE");
    }

    const raw = await readBodyWithLimit(response, maxResponseBytes);
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new Error("LLM_INVALID_JSON");
    }

    const answer =
      payload?.choices?.[0]?.message?.content ??
      payload?.output_text ??
      null;

    if (typeof answer !== "string" || answer.trim() === "") {
      throw new Error("LLM_EMPTY_RESPONSE");
    }

    return { mode: "live", answer, model };
  } catch (error) {
    return {
      mode: "degraded",
      answer: buildFallback(context, question),
      model,
      failure_mode:
        error?.name === "AbortError" ? "timeout" : String(error.message || error),
    };
  } finally {
    clearTimeout(timer);
  }
}

function buildFallback(context, question) {
  const snippets = context
    .split("\n---\n")
    .slice(0, 3)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  return `Réponse sans LLM pour « ${question} » :\n${snippets.join("\n")}`;
}

function validateEndpoint(endpoint) {
  let url;
  try {
    url = new URL(endpoint);
  } catch {
    throw new Error("LLM_INVALID_ENDPOINT");
  }
  if (!new Set(["http:", "https:"]).has(url.protocol)) {
    throw new Error("LLM_INVALID_ENDPOINT_PROTOCOL");
  }
}

function boundedInt(value, fallback, min, max) {
  if (value == null || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}

async function readBodyWithLimit(response, maxBytes) {
  if (!response.body?.getReader) {
    const text = await response.text();
    if (Buffer.byteLength(text, "utf8") > maxBytes) throw new Error("LLM_RESPONSE_TOO_LARGE");
    return text;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new Error("LLM_RESPONSE_TOO_LARGE");
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return text;
  } finally {
    reader.releaseLock();
  }
}
