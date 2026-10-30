'use strict';
const { evaluate } = require('./minimal');
function analyze(input) { const outcome=evaluate(input); return {...outcome, accepted:outcome.valid && outcome.count>0}; }
module.exports={analyze};
