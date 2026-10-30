const test=require('node:test');const assert=require('node:assert/strict');
const {damage}=require('./minimal.cjs');const {createFighter,attack}=require('./intermediate.cjs');const {tick,fight}=require('./complete.cjs');
test('dégât borné et reproductible',()=>{assert.equal(damage(30,10),20);assert.equal(damage(5,10),0)});
test('erreur négative explicite',()=>assert.throws(()=>damage(-1,3),/positifs/));
test('chakra insuffisant bloque sans muter',()=>{const a=createFighter('N',100,0),b=createFighter('S');assert.throws(()=>attack(a,b,{name:'R',power:30,cost:20,cooldown:1}),/chakra/);assert.equal(a.chakra,0)});
test('cooldown interdit la répétition directe',()=>{const m={name:'R',power:25,cost:10,cooldown:2};const r=attack(createFighter('N'),createFighter('S'),m);assert.throws(()=>attack(r.attacker,r.defender,m),/cooldown/);assert.equal(tick(r.attacker).cooldowns.R,1)});
test('combat termine dans la limite sans PV négatifs',()=>{const r=fight(createFighter('N'),createFighter('S'),[{name:'R',power:25,cost:10,cooldown:1}],8);assert.ok(r.log.length<=8);assert.ok(r.a.hp>=0&&r.b.hp>=0);});
test('paramètres invalides refusés',()=>assert.throws(()=>fight(createFighter('N'),createFighter('S'),[],1),/moves/));
