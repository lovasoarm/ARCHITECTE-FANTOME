'use strict';
function damage(power, defense) {
 if (!Number.isFinite(power) || power < 0 || !Number.isFinite(defense) || defense < 0) throw new RangeError('power/defense: nombres positifs requis');
 return Math.max(0, Math.floor(power - defense));
}
module.exports={damage};
