import test from "node:test";
import assert from "node:assert/strict";
import { createAppServer, readRuntimeConfig } from "./server.mjs";

const TOKEN = "test-token-that-is-long-enough-123456";
const silent = () => {};
async function withServer(t, overrides = {}) {
  const server = createAppServer({
    apiToken: TOKEN,
    tenantId: "tenant-a",
    knowledge: [
      { id: "allowed", tenantId: "tenant-a", text: "Le SLO cible est 99,9 %." },
      { id: "secret-b", tenantId: "tenant-b", text: "Le secret du tenant B est RED-FOX-SECRET." },
    ],
    generateFn: async ({ context }) => ({ mode: "deterministic-fallback", answer: context, model: "none" }),
    logger: silent,
    ...overrides,
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}
function auth(token = TOKEN) { return { authorization: `Bearer ${token}` }; }

test("health et readiness exposent seulement un statut non sensible", async (t) => {
  const base = await withServer(t);
  const health = await fetch(`${base}/healthz`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });
  const ready = await fetch(`${base}/readyz`);
  assert.equal(ready.status, 200);
  assert.deepEqual(await ready.json(), { status: "ready" });
});

test("protège la query API avec bearer token", async (t) => {
  const base = await withServer(t);
  const response = await fetch(`${base}/v1/query`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: "SLO" }) });
  assert.equal(response.status, 401);
  assert.equal((await response.json()).error, "unauthorized");
});

test("filtre le retrieval par tenant côté serveur avant génération", async (t) => {
  let receivedContext = "";
  const base = await withServer(t, { generateFn: async ({ context }) => { receivedContext = context; return { mode: "live", answer: "modèle", model: "fake" }; } });
  const response = await fetch(`${base}/v1/query`, {
    method: "POST", headers: { ...auth(), "content-type": "application/json" },
    // Un tenant fourni par le client ne peut pas étendre le scope serveur.
    body: JSON.stringify({ question: "secret SLO", tenantId: "tenant-b" }),
  });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.deepEqual(payload.retrieved.map((x) => x.id), ["allowed"]);
  assert.match(receivedContext, /99,9/);
  assert.doesNotMatch(receivedContext, /RED-FOX-SECRET/);
  assert.equal(payload.answerStatus, "unverified-model-output");
});

test("refuse sans appeler le modèle quand aucun document autorisé ne correspond", async (t) => {
  let called = false;
  const base = await withServer(t, { generateFn: async () => { called = true; throw new Error("should not call"); } });
  const response = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "RED-FOX-SECRET" }) });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.mode, "refused");
  assert.deepEqual(payload.retrieved, []);
  assert.equal(called, false);
});

test("rejette les JSON invalides, médias non JSON et questions trop longues", async (t) => {
  const base = await withServer(t, { maxQuestionChars: 32 });
  const invalidType = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "text/plain" }, body: "hello" });
  assert.equal(invalidType.status, 415);
  const invalidJson = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: "{" });
  assert.equal(invalidJson.status, 400);
  const longQuestion = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "x".repeat(33) }) });
  assert.equal(longQuestion.status, 400);
});

test("limite la taille du body", async (t) => {
  const base = await withServer(t, { maxBodyBytes: 1_024 });
  const response = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "a".repeat(2_000) }) });
  assert.equal(response.status, 413);
});

test("rate limit et endpoint de métriques protégées", async (t) => {
  const base = await withServer(t, { maxRequestsPerWindow: 1 });
  const first = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "SLO" }) });
  assert.equal(first.status, 200);
  const second = await fetch(`${base}/v1/query`, { method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "SLO" }) });
  assert.equal(second.status, 429);
  const hiddenMetrics = await fetch(`${base}/metrics`);
  assert.equal(hiddenMetrics.status, 401);
  const metrics = await fetch(`${base}/metrics`, { headers: auth() });
  assert.equal(metrics.status, 200);
  assert.match(await metrics.text(), /af_query_requests_total/);
});

test("rejects weak startup tokens", () => {
  assert.throws(() => createAppServer({ apiToken: "weak", logger: silent }), /au moins 32/);
});

test("throttles repeated failed authentication attempts", async (t) => {
  const base = await withServer(t, { maxRequestsPerWindow: 1 });
  const request = () => fetch(`${base}/v1/query`, {
    method: "POST", headers: { authorization: "Bearer incorrect", "content-type": "application/json" },
    body: JSON.stringify({ question: "SLO" }),
  });
  assert.equal((await request()).status, 401);
  assert.equal((await request()).status, 429);
});

test("bounds in-flight query work and returns 503 at capacity", async (t) => {
  let release;
  let entered;
  const enteredPromise = new Promise((resolve) => { entered = resolve; });
  const base = await withServer(t, {
    maxInFlight: 1,
    generateFn: async ({ context }) => {
      entered();
      await new Promise((resolve) => { release = resolve; });
      return { mode: "deterministic-fallback", answer: context, model: "none" };
    },
  });
  const request = () => fetch(`${base}/v1/query`, {
    method: "POST", headers: { ...auth(), "content-type": "application/json" },
    body: JSON.stringify({ question: "SLO" }),
  });
  const firstPromise = request();
  await enteredPromise;
  const second = await request();
  assert.equal(second.status, 503);
  release();
  const first = await firstPromise;
  assert.equal(first.status, 200);
});

test("reports not-ready when the configured tenant has no documents", async (t) => {
  const base = await withServer(t, { tenantId: "tenant-without-docs" });
  const response = await fetch(`${base}/readyz`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "not-ready" });
});


test("runtime config rejects copied example token and accepts a strong local test secret", () => {
  const base = { API_TENANT_ID: "tenant-a", API_TOKEN: "replace-with-a-random-token-at-least-24-characters" };
  assert.throws(() => readRuntimeConfig(base), /non-placeholder/);
  const valid = readRuntimeConfig({ ...base, API_TOKEN: "af-ci-secret-9a3f87c24d1b6e50b7a8c0d2e4f61739" });
  assert.equal(valid.tenantId, "tenant-a");
  assert.equal(valid.apiToken.length >= 32, true);
});

test("invalid numeric runtime configuration fails closed instead of silently using a default", () => {
  assert.throws(() => readRuntimeConfig({ API_TOKEN: "af-ci-secret-9a3f87c24d1b6e50b7a8c0d2e4f61739", MAX_IN_FLIGHT: "-1" }), /configuration numérique invalide/);
  assert.throws(() => readRuntimeConfig({ API_TOKEN: "af-ci-secret-9a3f87c24d1b6e50b7a8c0d2e4f61739", PORT: "99999" }), /configuration numérique invalide/);
});


test("rejects malformed generator output instead of returning an unvalidated object", async (t) => {
  const base = await withServer(t, { generateFn: async () => ({ mode: "live", answer: { text: "not a string" }, model: "fake" }) });
  const response = await fetch(`${base}/v1/query`, {
    method: "POST", headers: { ...auth(), "content-type": "application/json" }, body: JSON.stringify({ question: "SLO" }),
  });
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, "invalid_provider_result");
});
