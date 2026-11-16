// FIXTURE MEMORY HUNTER : rétention volontaire, charge bornée.
// Depuis ce dossier : node --expose-gc --inspect 00_leaky.js
//
// La Map est bornée à 5 entrées, mais le tableau listeners garde les closures
// des entrées évincées. Chaque closure conserve son Buffer.
// Limites de sécurité : 20 ticks au maximum, 1 Buffer de 1 Mio par tick.

const cache = new Map();
const MAX_ENTRIES = 5;
const MAX_TICKS = 20;
const BUFFER_BYTES = 1024 * 1024;
const listeners = [];

function makeHeavy(id) {
  const payload = Buffer.alloc(BUFFER_BYTES, id % 256);
  const onEvent = () => payload[0]; // la closure capture payload
  listeners.push(onEvent); // rétention volontaire, jamais nettoyée
  return { id, payload, onEvent };
}

function put(id) {
  if (cache.size >= MAX_ENTRIES) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey); // l'entrée disparaît de la Map, pas de listeners
  }
  cache.set(id, makeHeavy(id));
}

let tick = 0;
const timer = setInterval(() => {
  tick += 1;
  put(tick);

  if (global.gc) global.gc();
  const memory = process.memoryUsage();
  const toMB = (bytes) => (bytes / 1e6).toFixed(1);
  console.log(
    `tick=${tick}/${MAX_TICKS} rss=${toMB(memory.rss)}MB ` +
      `heapUsed=${toMB(memory.heapUsed)}MB ` +
      `external=${toMB(memory.external)}MB ` +
      `arrayBuffers=${toMB(memory.arrayBuffers)}MB ` +
      `cache=${cache.size} listeners=${listeners.length}`,
  );

  if (tick >= MAX_TICKS) {
    clearInterval(timer);
    console.log(`[DONE] Arrêt automatique après ${MAX_TICKS} ticks ; charge bornée.`);
  }
}, 1000);

process.once('SIGINT', () => {
  clearInterval(timer);
  console.log('[STOP] Interruption demandée ; timer annulé.');
  process.exitCode = 130;
});
