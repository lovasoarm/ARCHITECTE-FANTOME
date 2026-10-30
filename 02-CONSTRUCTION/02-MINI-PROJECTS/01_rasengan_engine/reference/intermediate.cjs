'use strict';
const {damage}=require('./minimal.cjs');
function createFighter(name,hp=100,chakra=100,defense=10) {
 if (typeof name!=='string'|| !name.trim()|| ![hp,chakra,defense].every(x=>Number.isFinite(x)&&x>=0)) throw new TypeError('combattant invalide');
 return {name,hp,chakra,defense,cooldowns:{}};
}
function attack(attacker, defender, move) {
 if (!move||typeof move.name!=='string'||![move.power,move.cost,move.cooldown].every(x=>Number.isInteger(x)&&x>=0)) throw new TypeError('jutsu invalide');
 if(attacker.chakra < move.cost) throw new Error('chakra insuffisant');
 if((attacker.cooldowns[move.name]||0)>0) throw new Error('jutsu en cooldown');
 const dealt=damage(move.power,defender.defense);
 return {attacker:{...attacker,chakra:attacker.chakra-move.cost,cooldowns:{...attacker.cooldowns,[move.name]:move.cooldown}},defender:{...defender,hp:Math.max(0,defender.hp-dealt)},dealt};
}
module.exports={createFighter,attack};
