import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { retrieve } from "../src/retriever.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const knowledge = JSON.parse(await fs.readFile(path.join(here, "..", "data", "knowledge.json"), "utf8"));
const cases = JSON.parse(await fs.readFile(path.join(here, "cases.json"), "utf8"));

let passed = 0;
for (const test of cases) {
  const hits = retrieve(test.query, knowledge.documents, 3);
  const ids = hits.map((hit) => hit.id);
  const ok = test.expected.some((id) => ids.includes(id));
  console.log(`${ok ? "PASS" : "FAIL"} ${test.id}: ${ids.join(", ")}`);
  if (ok) passed++;
}

console.log(`EVAL ${passed}/${cases.length}`);
if (passed !== cases.length) process.exit(1);
