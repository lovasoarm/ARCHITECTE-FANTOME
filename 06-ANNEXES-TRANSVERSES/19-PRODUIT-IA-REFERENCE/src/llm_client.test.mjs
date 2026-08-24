import test from "node:test";
import assert from "node:assert/strict";
import { generate } from "./llm_client.mjs";

const previous = {
  base: process.env.LLM_BASE_URL,
  key: process.env.LLM_API_KEY,
  model: process.env.LLM_MODEL,
  max: process.env.LLM_MAX_RESPONSE_BYTES,
};

function restoreEnv() {
  for (const [key, value] of [["LLM_BASE_URL", previous.base], ["LLM_API_KEY", previous.key], ["LLM_MODEL", previous.model], ["LLM_MAX_RESPONSE_BYTES", previous.max]]) {
    if (value == null) delete process.env[key];
    else process.env[key] = value;
  }
}

test.afterEach(restoreEnv);

test("falls back deterministically when no provider is configured", async () => {
  delete process.env.LLM_BASE_URL;
  delete process.env.LLM_API_KEY;
  const result = await generate({ context: "SLO: 99.9%", question: "Quel SLO ?" });
  assert.equal(result.mode, "deterministic-fallback");
  assert.match(result.answer, /99\.9%/);
});

test("rejects non-HTTP endpoints", async () => {
  process.env.LLM_BASE_URL = "file:///tmp/provider";
  process.env.LLM_API_KEY = "test";
  const promise = generate({ context: "x", question: "y" });
  await assert.rejects(promise, /LLM_INVALID_ENDPOINT_PROTOCOL/);
});

test("degrades on invalid content type", async () => {
  process.env.LLM_BASE_URL = "https://example.test";
  process.env.LLM_API_KEY = "test";
  const result = await generate({
    context: "x",
    question: "y",
    fetchImpl: async () => ({
      ok: true,
      headers: new Map([["content-type", "text/plain"]]),
      body: null,
      text: async () => "not-json",
    }),
  });
  assert.equal(result.mode, "degraded");
  assert.equal(result.failure_mode, "LLM_INVALID_CONTENT_TYPE");
});

test("rejects oversized declared responses before parsing", async () => {
  process.env.LLM_BASE_URL = "https://example.test";
  process.env.LLM_API_KEY = "test";
  process.env.LLM_MAX_RESPONSE_BYTES = "16384";
  const result = await generate({
    context: "x",
    question: "y",
    fetchImpl: async () => ({
      ok: true,
      headers: new Map([["content-type", "application/json"], ["content-length", "999999"]]),
      body: null,
      text: async () => "{}",
    }),
  });
  assert.equal(result.mode, "degraded");
  assert.equal(result.failure_mode, "LLM_RESPONSE_TOO_LARGE");
});
