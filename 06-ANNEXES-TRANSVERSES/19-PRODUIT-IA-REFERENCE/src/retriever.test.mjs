import test from "node:test";
import assert from "node:assert/strict";
import { retrieve } from "./retriever.mjs";

test("normalizes case and accents when matching terms", () => {
  const documents = [
    { id: "security", text: "La sécurité protège les clés API." },
    { id: "observability", text: "Les métriques décrivent le service." },
  ];
  assert.deepEqual(retrieve("SÉCURITÉ", documents, 3).map((doc) => doc.id), ["security"]);
});

test("uses a stable identifier tie-breaker for equal scores", () => {
  const documents = [
    { id: "zeta", text: "cache stable" },
    { id: "alpha", text: "cache stable" },
  ];
  assert.deepEqual(retrieve("cache", documents, 2).map((doc) => doc.id), ["alpha", "zeta"]);
});

test("respects the requested result limit", () => {
  const documents = [
    { id: "a", text: "cache cache mémoire" },
    { id: "b", text: "cache distribué" },
    { id: "c", text: "cache local" },
  ];
  assert.equal(retrieve("cache", documents, 2).length, 2);
  assert.deepEqual(retrieve("cache", documents, 0), []);
});

test("returns no hits for an empty or unmatched query", () => {
  const documents = [{ id: "a", text: "transactions durables" }];
  assert.deepEqual(retrieve("   ", documents, 3), []);
  assert.deepEqual(retrieve("terme absent", documents, 3), []);
});
