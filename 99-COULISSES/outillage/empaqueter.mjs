#!/usr/bin/env node
// Empaquetage d'une livraison : controle de livraison strict, puis zip horodate.
// node 99-COULISSES/outillage/empaqueter.mjs <nom-du-zip> [racine] [destination]
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { basename, resolve } from "node:path";

const [nom, racineArg = ".", destArg = "/mnt/documents"] = process.argv.slice(2);
if (!nom) {
  console.error("usage : node empaqueter.mjs <nom-du-zip> [racine] [destination]");
  process.exit(2);
}
const racine = resolve(racineArg);
const dest = resolve(destArg);
mkdirSync(dest, { recursive: true });

const controle = spawnSync(
  process.execPath,
  [`${racine}/99-COULISSES/outillage/controle_livraison.mjs`, racine, "--strict"],
  { encoding: "utf8" },
);
process.stdout.write(controle.stdout ?? "");
if (controle.status !== 0) {
  console.error("Empaquetage refuse : le controle de livraison n'est pas vert.");
  process.exit(1);
}

const zip = `${dest}/${nom}`;
spawnSync("rm", ["-f", zip]);
const r = spawnSync(
  "zip",
  ["-qr", zip, basename(racine), "-x", "*/node_modules/*", "*/.git/*"],
  { cwd: resolve(racine, ".."), encoding: "utf8" },
);
if (r.status !== 0) {
  console.error(r.stderr);
  process.exit(1);
}
console.log(`Livre : ${zip}`);
