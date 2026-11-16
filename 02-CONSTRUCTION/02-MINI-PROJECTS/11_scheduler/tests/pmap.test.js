import test from "node:test";
import assert from "node:assert/strict";
import { pMap } from "../src/pmap.js";

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function waitFor(predicate, message) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setImmediate(resolve));
  }
  assert.fail(message ?? "condition not reached before timeout");
}

test("préserve l'ordre des résultats même si les mappers terminent dans le désordre", async () => {
  const started = [];
  const gates = new Map();
  const items = ["first", "second", "third"];

  const resultPromise = pMap(
    items,
    (item, index) => {
      started.push(index);
      const gate = deferred();
      gates.set(index, gate);
      return gate.promise;
    },
    { concurrency: 3 }
  );

  await waitFor(() => started.length === 3, "all three mappers should start");
  gates.get(2).resolve("THIRD");
  gates.get(1).resolve("SECOND");
  gates.get(0).resolve("FIRST");

  assert.deepEqual(await resultPromise, ["FIRST", "SECOND", "THIRD"]);
});

test("ne dépasse jamais la concurrence configurée", async () => {
  let active = 0;
  let maximum = 0;

  await pMap(
    Array.from({ length: 20 }, (_, index) => index),
    async (value) => {
      active += 1;
      maximum = Math.max(maximum, active);
      await new Promise((resolve) => setImmediate(resolve));
      active -= 1;
      return value;
    },
    { concurrency: 4 }
  );

  assert.equal(maximum, 4);
});

test("concurrency=1 exécute les mappers en série stricte", async () => {
  const events = [];
  let active = 0;
  let maximum = 0;

  await pMap(
    [1, 2, 3],
    async (value) => {
      active += 1;
      maximum = Math.max(maximum, active);
      events.push(`start-${value}`);
      await Promise.resolve();
      events.push(`end-${value}`);
      active -= 1;
      return value;
    },
    { concurrency: 1 }
  );

  assert.equal(maximum, 1);
  assert.deepEqual(events, [
    "start-1", "end-1",
    "start-2", "end-2",
    "start-3", "end-3"
  ]);
});

test("renvoie un tableau vide pour une entrée vide", async () => {
  assert.deepEqual(await pMap([], async (value) => value), []);
});

test("rejette les entrées et options invalides avant de lancer un mapper", async () => {
  let calls = 0;
  const mapper = async (value) => {
    calls += 1;
    return value;
  };

  await assert.rejects(pMap(null, mapper), /items.*array/i);
  await assert.rejects(pMap([1], null), /mapper.*function/i);
  await assert.rejects(pMap([1], mapper, { concurrency: 0 }), /concurrency/i);
  await assert.rejects(pMap([1], mapper, { concurrency: 1.5 }), /concurrency/i);
  await assert.rejects(pMap([1], mapper, { concurrency: 101 }), /concurrency/i);
  assert.equal(calls, 0);
});

test("propage l'erreur du mapper et ne lance pas les éléments suivants", async () => {
  const failure = new Error("mapper failure");
  const started = [];

  await assert.rejects(
    pMap(
      [0, 1, 2],
      async (value) => {
        started.push(value);
        if (value === 0) throw failure;
        return value;
      },
      { concurrency: 1 }
    ),
    (error) => error === failure
  );

  assert.deepEqual(started, [0]);
});

test("un signal déjà annulé empêche tout démarrage", async () => {
  const controller = new AbortController();
  controller.abort();
  let calls = 0;

  await assert.rejects(
    pMap([1, 2], async () => {
      calls += 1;
    }, { concurrency: 1, signal: controller.signal }),
    (error) => error?.name === "AbortError"
  );

  assert.equal(calls, 0);
});

test("une annulation en cours empêche les nouveaux lancements et atteint les tâches actives", async () => {
  const controller = new AbortController();
  const started = [];

  const resultPromise = pMap(
    [0, 1, 2, 3],
    async (value, _index, signal) => {
      started.push(value);
      await new Promise((resolve) => {
        signal.addEventListener("abort", resolve, { once: true });
      });
      return value;
    },
    { concurrency: 2, signal: controller.signal }
  );

  await waitFor(() => started.length === 2, "two mappers should be active before abort");
  controller.abort();

  await assert.rejects(
    resultPromise,
    (error) => error?.name === "AbortError"
  );
  assert.deepEqual(started, [0, 1]);
});
