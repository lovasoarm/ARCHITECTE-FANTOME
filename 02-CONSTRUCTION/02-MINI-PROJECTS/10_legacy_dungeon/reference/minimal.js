// Tranche minimale de référence pour 10_legacy_dungeon; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "legacy", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
