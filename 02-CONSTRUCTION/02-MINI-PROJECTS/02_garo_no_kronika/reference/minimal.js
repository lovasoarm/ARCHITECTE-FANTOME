// Tranche minimale de référence pour 02_garo_no_kronika; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "chronologie", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
