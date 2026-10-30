'use strict';
const {createFighter,attack}=require('./intermediate.cjs');
function tick(fighter) {return {...fighter,cooldowns:Object.fromEntries(Object.entries(fighter.cooldowns).map(([k,v])=>[k,Math.max(0,v-1)]))};}
function fight(a,b,moves,maxTurns=30) {
 if(!Number.isInteger(maxTurns)||maxTurns<1) throw new RangeError('maxTurns invalide');
 if(!Array.isArray(moves)||moves.length===0) throw new TypeError('moves vides');
 let log=[];
 for(let i=0;i<maxTurns && a.hp>0 && b.hp>0;i++) {
   let current=i%2===0?a:b, target=i%2===0?b:a;
   current=tick(current);
   const move=moves.find(m=>current.chakra>=m.cost&&(current.cooldowns[m.name]||0)===0);
   if(move){const r=attack(current,target,move);current=r.attacker;target=r.defender;log.push({turn:i+1,name:current.name,move:move.name,damage:r.dealt});}
   else log.push({turn:i+1,name:current.name,move:'repos',damage:0});
   if(i%2===0){a=current;b=target;}else{b=current;a=target;}
 }
 return {a,b,log,winner:a.hp===b.hp?'égalité':a.hp>b.hp?a.name:b.name};
}
if(require.main===module){console.log(JSON.stringify(fight(createFighter('Naruto'),createFighter('Sasuke'),[{name:'Rasengan',power:35,cost:20,cooldown:1}]),null,2));}
module.exports={tick,fight};
