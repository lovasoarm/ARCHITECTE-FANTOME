// Tranche minimale de référence pour 18_human_vs_ai_smell; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "odeur de code", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
