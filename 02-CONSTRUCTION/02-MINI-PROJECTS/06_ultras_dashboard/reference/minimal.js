// Tranche minimale de référence pour 06_ultras_dashboard; NE couvre PAS le cahier des charges complet.
'use strict';
function evaluate(input) {
  if (!Array.isArray(input)) throw new TypeError('Entrée attendue : tableau');
  return { domain: "tableau de bord", count: input.length, valid: input.every(x => x !== null && x !== undefined) };
}
module.exports = { evaluate };
