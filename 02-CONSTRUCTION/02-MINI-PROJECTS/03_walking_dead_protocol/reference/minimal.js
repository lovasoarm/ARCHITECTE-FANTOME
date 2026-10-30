// Tranche minimale de référence pour 03_walking_dead_protocol; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "protocole", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
