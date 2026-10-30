import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { retrieve } from "../src/retriever.mjs";

// Test de fumée lexical déterministe : il vérifie les cas fournis sur le corpus local.
// Il ne constitue pas une évaluation de qualité/sécurité d'un RAG de production.
const here = path.dirname(fileURLToPath(import.meta.url));
const knowledgePath = path.join(here, "..", "data", "knowledge.json");
const casesPath = path.join(here, "cases.json");
const [knowledgeRaw, casesRaw] = await Promise.all([fs.readFile(knowledgePath), fs.readFile(casesPath)]);
const knowledge = JSON.parse(knowledgeRaw.toString("utf8"));
const cases = JSON.parse(casesRaw.toString("utf8"));
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
console.log(`REPRODUCIBILITY runtime=${process.version}; knowledge_sha256=${sha256(knowledgeRaw)}; cases_sha256=${sha256(casesRaw)}`);

if (!Array.isArray(knowledge.documents) || knowledge.documents.length === 0) {
  console.error("CONFIG FAIL: knowledge.documents doit être un tableau non vide.");
  process.exit(2);
}
if (!Array.isArray(cases) || cases.length === 0) {
  console.error("CONFIG FAIL: eval/cases.json doit contenir au moins un cas.");
  process.exit(2);
}

const knownIds = new Set(knowledge.documents.map((doc) => doc?.id).filter((id) => typeof id === "string"));
const caseIds = new Set();
for (const test of cases) {
  if (!test || typeof test.id !== "string" || !test.id.trim() || caseIds.has(test.id)) {
    console.error("CONFIG FAIL: chaque cas doit avoir un identifiant unique non vide.");
    process.exit(2);
  }
  caseIds.add(test.id);
  const expected = test.expected;
  const noHitCase = test.expectNoHit === true;
  const schemaValid = typeof test.query === "string" && test.query.trim() && Array.isArray(expected)
    && (noHitCase ? expected.length === 0 : expected.length > 0 && expected.every((id) => typeof id === "string" && knownIds.has(id)));
  if (!schemaValid) {
    console.error(`CONFIG FAIL ${test.id}: query/expected invalides. Un cas no-hit doit avoir expectNoHit=true et expected=[], sinon expected doit contenir des ID présents dans knowledge.json.`);
    process.exit(2);
  }
}

let positivePassed = 0;
let positiveCount = 0;
let reciprocalRankSum = 0;
let noHitPassed = 0;
let noHitCount = 0;
for (const test of cases) {
  const hits = retrieve(test.query, knowledge.documents, 3);
  const ids = hits.map((hit) => hit.id);
  if (test.expectNoHit === true) {
    noHitCount++;
    const ok = hits.length === 0;
    if (ok) noHitPassed++;
    console.log(`${ok ? "NO-HIT PASS" : "NO-HIT FAIL"} ${test.id}: ${ids.join(", ") || "(aucun résultat)"}`);
    continue;
  }
  positiveCount++;
  // `expected` liste des documents acceptables : un hit suffit par cas.
  const rank = hits.findIndex((hit) => test.expected.includes(hit.id));
  const ok = rank !== -1;
  if (ok) {
    positivePassed++;
    reciprocalRankSum += 1 / (rank + 1);
  }
  console.log(`${ok ? "SMOKE PASS" : "SMOKE FAIL"} ${test.id}: ${ids.join(", ") || "(aucun résultat)"}${ok ? `; rang=${rank + 1}` : ""}`);
}

const hitRateAt3 = positiveCount ? positivePassed / positiveCount : 0;
const mrrAt3 = positiveCount ? reciprocalRankSum / positiveCount : 0;
const noHitRate = noHitCount ? noHitPassed / noHitCount : 1;
console.log(`LEXICAL SMOKE POSITIVE TOP-3: ${positivePassed}/${positiveCount}; HitRate@3=${hitRateAt3.toFixed(3)}; MRR@3=${mrrAt3.toFixed(3)}`);
console.log(`NO-HIT SMOKE: ${noHitPassed}/${noHitCount}; accuracy=${noHitRate.toFixed(3)}`);
console.log("Limite: ces métriques portent uniquement sur les cas étiquetés de ce petit corpus local; elles ne valident ni les ACL, ni les citations, ni les refus, ni les attaques par prompt, ni une qualité de production. Le cas no-hit est synthétique et n'est pas une mesure de couverture du monde réel.");
if (positivePassed !== positiveCount || noHitPassed !== noHitCount || positiveCount === 0) process.exit(1);
