// Scénario de panne partielle déterministe, rejouable à l'identique.
// Lancement : node 02-CONSTRUCTION/02_mini_projects/16_distributed_arena/INCIDENT/01_scenario_panne.js
// Aucune source d'aléa non maîtrisée : PRNG maison à seed fixe, pas de Math.random(), pas de Date.now() dans la logique.

const SEED = 20260416;

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);

// Horloge logique : jamais Date.now(), toujours un tick entier incrémental.
let tick = 0;
function nextTick() { tick += 1; return tick; }

function traceId(worker, op) { return `w${worker}-op${op}`; }

const events = [];
function log(traceId, node, message) {
  events.push({ t: nextTick(), traceId, node, message });
}

// Topologie : 1 coordinateur, 3 workers. Le worker 2 sera tué au tick logique 7 (déterministe).
const KILL_WORKER = 2;
const KILL_AT_TICK = 7;
const TOTAL_OPS = 12;

const coordinatorState = new Map(); // clé idempotence -> valeur acceptée
let total = 0;
const deadWorkers = new Set();

function coordinatorReceive(traceId, node, opKey, value) {
  if (deadWorkers.has(node) === false) {
    if (coordinatorState.has(opKey)) {
      log(traceId, "coordinator", `DUP rejetée opKey=${opKey} (déjà appliquée)`);
      return;
    }
    coordinatorState.set(opKey, value);
    total += value;
    log(traceId, "coordinator", `ACK opKey=${opKey} total=${total}`);
  }
}

for (let worker = 1; worker <= 3; worker++) {
  for (let opIndex = 1; opIndex <= TOTAL_OPS; opIndex++) {
    const id = traceId(worker, opIndex);
    const opKey = `${worker}:${opIndex}`;

    if (worker === KILL_WORKER && tick + 1 === KILL_AT_TICK) {
      log(id, `worker-${worker}`, `KILL -9 reçu avant ACK, opKey=${opKey} envoyée mais réponse jamais lue`);
      deadWorkers.add(`worker-${worker}`);
      // Le worker redémarre et rejoue l'opération à l'identique (retry idempotent attendu).
      log(id, `worker-${worker}`, `RESTART, retry opKey=${opKey}`);
      deadWorkers.delete(`worker-${worker}`);
      coordinatorReceive(id, `worker-${worker}`, opKey, 1);
      // Bug injecté : le worker rejoue une SECONDE fois par mauvaise gestion du timeout de retry.
      // Sans clé d'idempotence stable, ceci double le compteur. Avec, le coordinateur doit rejeter.
      coordinatorReceive(id, `worker-${worker}`, opKey, 1);
      continue;
    }

    coordinatorReceive(id, `worker-${worker}`, opKey, 1);

    if (worker === KILL_WORKER && opIndex === 5 && rand() < 1) {
      // Drop réseau déterministe (rand() toujours < 1 avec ce seed à ce point précis du script) :
      // le message part mais l'ACK n'arrive jamais au worker, qui retente avec la MÊME opKey.
      log(id, `worker-${worker}`, `ACK perdu (réseau), retry avec opKey identique=${opKey}`);
      coordinatorReceive(id, `worker-${worker}`, opKey, 1);
    }
  }
}

const expected = 3 * TOTAL_OPS; // 36
console.log(`expected=${expected} observed=${total} ${expected === total ? "[OK]" : "[INCIDENT]"}`);
console.log("--- LOGS (trace-id | tick | node | message) ---");
for (const e of events) {
  console.log(`${e.traceId} | t=${e.t} | ${e.node} | ${e.message}`);
}
