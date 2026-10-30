'use strict';
const { analyze } = require('./intermediate');
function report(input) { const r=analyze(input); return {...r, diagnostic:r.accepted?'entrée acceptée':'refus: vide ou valeur manquante'}; }
module.exports={report};
