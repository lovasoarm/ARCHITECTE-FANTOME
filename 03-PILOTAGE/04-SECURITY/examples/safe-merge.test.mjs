import test from "node:test";
import assert from "node:assert/strict";
import { safeMergeJson } from "./safe-merge.mjs";

test("refuse __proto__ without changing Object.prototype", () => {
  const source = JSON.parse('{"__proto__":{"canExecuteCode":true}}');
  assert.throws(() => safeMergeJson(Object.create(null), source), /clé interdite/);
  assert.equal(Object.hasOwn(Object.prototype, "canExecuteCode"), false);
  assert.equal(({}).canExecuteCode, undefined);
});

test("refuse constructor.prototype at nested depth without partial mutation", () => {
  const target = Object.create(null);
  const source = JSON.parse('{"first":{"safe":true},"feature":{"constructor":{"prototype":{"polluted":true}}}}');
  assert.throws(() => safeMergeJson(target, source), /clé interdite/);
  assert.equal(Object.hasOwn(target, "first"), false);
  assert.equal(Object.hasOwn(Object.prototype, "polluted"), false);
});

test("refuse dangerous keys in records inside arrays", () => {
  const source = JSON.parse('{"items":[{"prototype":{"bad":true}}]}');
  assert.throws(() => safeMergeJson(Object.create(null), source), /clé interdite/);
  assert.equal(Object.hasOwn(Object.prototype, "bad"), false);
});

test("accepts ordinary nested data and keeps an independent null-prototype dictionary", () => {
  const result = safeMergeJson(Object.create(null), JSON.parse('{"feature":{"enabled":true},"count":2}'));
  assert.equal(result.feature.enabled, true);
  assert.equal(result.count, 2);
  assert.equal(Object.getPrototypeOf(result), null);
  assert.equal(Object.getPrototypeOf(result.feature), null);
});

test("rejects non-record root values", () => {
  assert.throws(() => safeMergeJson(Object.create(null), []), /objets simples/);
  assert.throws(() => safeMergeJson(Object.create(null), null), /objets simples/);
});


test("rejects cyclic input and excessive nesting before mutation", () => {
  const target = { safe: true };
  const cyclic = {};
  cyclic.self = cyclic;
  assert.throws(() => safeMergeJson(target, cyclic), /référence cyclique/);
  assert.deepEqual(target, { safe: true });

  let deep = {};
  const root = deep;
  for (let index = 0; index < 102; index++) deep = (deep.next = {});
  assert.throws(() => safeMergeJson(target, root), /profondeur maximale/);
  assert.deepEqual(target, { safe: true });
});
