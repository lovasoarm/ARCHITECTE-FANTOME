#!/usr/bin/env node
// B1 — Pose la cle YAML `route: survie | complete` sur le README de CHAQUE module du fil.
// node 99-COULISSES/outillage/appliquer_route_survie.mjs [racine]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROUTE, CLE, tousLesModules, surLaRoute } from "./lib_route_survie.mjs";

const racine = process.argv[2] ?? ".";
let touches = 0;

for (const module of tousLesModules(racine)) {
  const p = join(racine, module, "README.md");
  if (!existsSync(p)) {
    console.error(`ignore : ${module} n'a pas de README.md`);
    continue;
  }
  const valeur = surLaRoute(module) ? "survie" : "complete";
  const src = readFileSync(p, "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  let sortie;
  if (m) {
    const entete = m[1];
    const remplace = new RegExp(`^${CLE}:.*$`, "m");
    const neuf = remplace.test(entete)
      ? entete.replace(remplace, `${CLE}: ${valeur}`)
      : `${entete}\n${CLE}: ${valeur}`;
    sortie = `---\n${neuf}\n---\n${src.slice(m[0].length)}`;
  } else {
    sortie = `---\nstability: stable\nacte: comprendre\n${CLE}: ${valeur}\n---\n\n${src}`;
  }
  if (sortie !== src) {
    writeFileSync(p, sortie);
    touches += 1;
  }
}

console.log(`Route survie appliquee : ${touches} en-tetes mis a jour, ${ROUTE.length} modules sur la route.`);
