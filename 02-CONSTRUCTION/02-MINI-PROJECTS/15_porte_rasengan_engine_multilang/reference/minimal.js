// Tranche minimale de référence pour 15_porte_rasengan_engine_multilang; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "moteur polyglotte", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
