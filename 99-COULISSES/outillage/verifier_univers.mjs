#!/usr/bin/env node
// Lint des univers narratifs.
// Source unique : 06-ANNEXES-TRANSVERSES/04-UNIVERS_AUTORISES.md
//   - le tableau "UNIVERS AUTORISES" fournit la liste blanche ;
//   - la section "UNIVERS INTERDITS" fournit les tokens refuses.
// Le lint ne contient aucune liste en dur : il lit le fichier pedagogique.
//
// node 99-COULISSES/outillage/verifier_univers.mjs .
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { listerMd } from "./lib_depot.mjs";

const racine = process.argv[2] ?? ".";
const SOURCE = "06-ANNEXES-TRANSVERSES/04-UNIVERS_AUTORISES.md";

const brutSource = readFileSync(join(racine, SOURCE), "utf8");

// Liste noire : lignes "- **Token** (alias, alias) : motif."
const interdits = [];
const blocNoir = brutSource.split("## UNIVERS INTERDITS")[1]?.split("\n## ")[0] ?? "";
for (const ligne of blocNoir.split("\n")) {
  const m = ligne.match(/^- \*\*(.+?)\*\*(?:\s*\((.+?)\))?/);
  if (!m) continue;
  const tokens = [
    ...m[1].split("/").map((t) => t.trim()),
    ...(m[2] ? m[2].split(",").map((t) => t.trim()) : []),
  ].filter((t) => t.length > 2);
  interdits.push({ nom: m[1], tokens });
}

const refus = [];
const fichiers = listerMd(racine).filter(
  (rel) => !rel.startsWith("99-COULISSES/") && rel !== SOURCE,
);

for (const rel of fichiers) {
  const brut = readFileSync(join(racine, rel), "utf8");
  for (const { nom, tokens } of interdits) {
    for (const token of tokens) {
      const rx = new RegExp(`(?<![\\p{L}\\p{N}-])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}-])`, "iu");
      if (rx.test(brut)) refus.push(`${rel} : univers interdit "${token}" (${nom})`);
    }
  }
}

console.log(
  `${fichiers.length} fichiers .md lus, ${interdits.length} univers en liste noire, ${refus.length} refus.`,
);
for (const r of refus) console.log(`  FAUTE ${r}`);
process.exit(refus.length === 0 ? 0 : 1);
