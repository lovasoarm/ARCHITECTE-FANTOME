import test from "node:test";
import assert from "node:assert/strict";
import { Loop } from "../src/loop.js";

test("exécute une macro puis vide les microtasks avant la macro suivante", async () => {
  const out = [];
  const loop = new Loop();

  loop.queueMacro(() => out.push("A"));
  loop.queueMicro(() => out.push("B"));
  loop.queueMacro(() => out.push("C"));

  await loop.drain();
  assert.deepEqual(out, ["A", "B", "C"]);
});

test("vide aussi les microtasks ajoutées pendant le drainage", async () => {
  const out = [];
  const loop = new Loop();

  loop.queueMacro(() => out.push("M1"));
  loop.queueMicro(function chain() {
    out.push("u");
    if (out.filter((value) => value === "u").length < 3) {
      loop.queueMicro(chain);
    }
  });
  loop.queueMacro(() => out.push("M2"));

  await loop.drain();
  assert.deepEqual(out, ["M1", "u", "u", "u", "M2"]);
});

test("vide les microtasks restantes même si aucune macro n'est en attente", async () => {
  const out = [];
  const loop = new Loop();

  loop.queueMicro(() => {
    out.push("first");
    loop.queueMicro(() => out.push("nested"));
  });
  loop.queueMicro(() => out.push("second"));

  await loop.drain();
  assert.deepEqual(out, ["first", "second", "nested"]);
});

test("refuse les callbacks qui ne sont pas des fonctions", () => {
  const loop = new Loop();
  assert.throws(() => loop.queueMicro(null), TypeError);
  assert.throws(() => loop.queueMacro("not a callback"), TypeError);
});

test("propage une erreur de callback au lieu de la masquer", async () => {
  const loop = new Loop();
  loop.queueMacro(() => {
    throw new Error("callback failure");
  });

  await assert.rejects(loop.drain(), /callback failure/);
});


test("conserve les tâches non exécutées après une erreur pour un nouveau drainage", async () => {
  const out = [];
  const loop = new Loop();
  loop.queueMacro(() => {
    throw new Error("stop this drain");
  });
  loop.queueMacro(() => out.push("resumed"));

  await assert.rejects(loop.drain(), /stop this drain/);
  await loop.drain();
  assert.deepEqual(out, ["resumed"]);
});
