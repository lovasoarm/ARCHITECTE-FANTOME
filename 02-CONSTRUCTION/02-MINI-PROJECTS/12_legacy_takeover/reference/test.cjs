const test = require("node:test");
const assert = require("node:assert/strict");
const { evaluate } = require("./minimal");
const { report } = require("./complete");
test("entrée nominale  : reprise de legacy", () => {
  assert.equal(evaluate([1, 2]).count, 2);
  assert.equal(report([1]).accepted, true);
});
test("cas négatif explicite", () => {
  assert.throws(() => evaluate(null), /tableau/);
  assert.equal(report([null]).accepted, false);
});
