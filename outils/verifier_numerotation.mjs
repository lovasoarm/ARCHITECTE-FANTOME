#!/usr/bin/env node
// Verrou anti-regression : interdit toute citation d'un module par son ancienne
// numerotation MyFunnyJS (ex: "22_security") sans son prefixe de palier
// (ex: "03-PILOTAGE/04_security").
// Usage : node outils/verifier_numerotation.mjs [racine]

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = process.argv[2] ?? ".";

const MORTS = [
  "00_getting_started", "00_referentiel", "01_fundamentals", "02_problem_solving",
  "03_async", "04_debugging", "05_error_handling", "06_testing", "07_math_basics",
  "08_memory_performance", "09_data_structures", "10_algorithms", "11_functional_js",
  "12_design_patterns", "13_refactoring", "14_typescript", "15_runtime_env",
  "16_architecture_patterns", "17_web_concepts", "18_oop_js", "19_web_inclusive",
  "20_realtime", "21_api_craft", "22_security", "23_ai_native_dev", "24_databases",
  "25_scalability", "26_observability", "27_team_craft", "28_edge_cases",
  "29_ai_agents_and_autonomy", "30_mini_projects", "31_annexes", "32_tools",
];

const MOTIF = new RegExp(`(?<![\\w/\\-.])(${MORTS.join("|")})\\b`, "g");

function* fichiers(dir) {
  for (const e of readdirSync(dir)) {
    if (e === ".git" || e === "node_modules") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* fichiers(p);
    else if (p.endsWith(".md")) yield p;
  }
}

let fautes = 0;
for (const f of fichiers(RACINE)) {
  // Les blocs de code et le code inline sont exclus du controle : ils servent
  // justement a montrer des exemples de ce qui est refuse.
  const brut = readFileSync(f, "utf8").replace(/```[\s\S]*?```/g, (b) => b.replace(/[^\n]/g, " "));
  const lignes = brut.split("\n").map((l) => l.replace(/`[^`]*`/g, ""));
  lignes.forEach((ligne, i) => {
    for (const m of ligne.matchAll(MOTIF)) {
      fautes++;
      console.log(`${relative(RACINE, f)}:${i + 1}: numerotation morte "${m[1]}"`);
    }
  });
}

if (fautes > 0) {
  console.error(`\nECHEC : ${fautes} citation(s) d'ancienne numerotation. Utilise le chemin de palier complet.`);
  process.exit(1);
}
console.log("OK : aucune numerotation morte citee dans le repo.");
