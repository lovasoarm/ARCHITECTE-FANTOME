import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { retrieve } from "./retriever.mjs";
import { generate } from "./llm_client.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(await fs.readFile(path.join(here, "..", "data", "knowledge.json"), "utf8"));
const question = process.argv.slice(2).join(" ").trim();

if (!question) {
  console.error('Usage: node src/cli.mjs "question"');
  process.exit(2);
}

const hits = retrieve(question, data.documents, 3);
const context = hits.map((hit) => `[${hit.id}] ${hit.text}`).join("\n---\n");
const result = await generate({ context, question });

console.log(JSON.stringify({
  question,
  retrieved: hits.map(({ id, score }) => ({ id, score: Number(score.toFixed(4)) })),
  mode: result.mode,
  model: result.model,
  answer: result.answer,
  failure_mode: result.failure_mode ?? null,
}, null, 2));
