#!/usr/bin/env node
// B2 — Generateur unique des Boss de rythme (deux modules, un Boss).
// node 99-COULISSES/outillage/generer_boss.mjs [racine]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tousLesGroupes, bossFightExistant } from "./lib_boss.mjs";

const racine = process.argv[2] ?? ".";

const titre = (rel, repli) => {
  const p = join(racine, rel);
  if (!existsSync(p)) return repli;
  const m = readFileSync(p, "utf8").match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : repli;
};

const lisible = (m) => m.replace(/^\d{2}[-_]/, "").replace(/[-_]/g, " ");
const entete = "---\nstability: intemporel\nacte: appliquer\n---\n\n";
let ecrits = 0;

for (const g of tousLesGroupes(racine)) {
  if (g.estRetro) continue;
  const dir = join(racine, g.porteur);
  mkdirSync(dir, { recursive: true });
  const nom = `Boss ${g.rang} de ${g.palier}`;
  const mods = g.modules;
  const liens = mods.map((m) => `[${lisible(m)}](../${m}/README.md)`).join(" et ");
  const absorbes = mods
    .map((m) => ({ m, bf: bossFightExistant(racine, g.palier, m) }))
    .filter((x) => x.bf);

  const commande = absorbes.length
    ? absorbes
        .map(
          (x) =>
            `- La commande est celle deja ecrite dans [${titre(x.bf, "boss-fight")}](../${x.m}/boss-fight.md). Elle n'est pas recopiee ici : ce Boss l'absorbe, il ne la double pas.`,
        )
        .join("\n")
    : `- Aucun boss-fight n'existait pour ces deux modules. La commande : livre, sur ton projet fil rouge, un increment qui ne tient que si ${liens} tiennent ensemble. Un increment qui passe en n'utilisant qu'un seul des deux modules ne compte pas.`;

  writeFileSync(
    join(dir, "README.md"),
    `${entete}[Palier](../README.md)

# ${nom} : ${mods.map(lisible).join(" x ")}

Ce Boss ferme les deux modules ${liens}. Il n'enseigne rien : il verifie que les deux tiennent
**ensemble**, sur ton projet fil rouge, sous contrainte de temps et sous contradiction.

Rythme du parcours : deux modules, un Boss. Tant que ce Boss n'est pas passe, les deux modules
qu'il ferme comptent comme lus, pas comme acquis.

Ordre de passage, quatre pieces :

1. [01-PROJET-REEL.md](01-PROJET-REEL.md) — la commande, sur ton depot, pas un exercice.
2. [02-CONTRAINTE.md](02-CONTRAINTE.md) — le temps, le budget, ce qui est interdit.
3. [03-DEFENSE.md](03-DEFENSE.md) — la contradiction orale, chronometree.
4. [04-VERDICT.md](04-VERDICT.md) — passe / ne passe pas, sans nuance.
`,
  );

  writeFileSync(
    join(dir, "01-PROJET-REEL.md"),
    `${entete}[${nom}](README.md)

# Projet reel : ${mods.map(lisible).join(" x ")}

## Ce que tu livres

${commande}

## La regle qui fait de ce Boss un Boss

Le livrable sort dans **ton depot de fil rouge**, pas dans un fichier d'exercice. Il porte une
date de debut et une date de rendu. Un livrable sans les deux dates n'a pas eu lieu.

## Ce qui est explicitement hors sujet

Reciter les deux modules. Le Boss ne demande aucune restitution : il demande un artefact qui
casse si l'un des deux modules a ete survole.
`,
  );

  writeFileSync(
    join(dir, "02-CONTRAINTE.md"),
    `${entete}[${nom}](README.md)

# Contrainte

\`\`\`text
CONTRAINTE DE TEMPS
Livraison : 90 min chrono, montre lancee avant d'ouvrir le depot.
Au-dela : tu geles l'etat a 90 min et c'est CET etat qui est juge.
La version finie apres coup compte pour ta progression, pas pour ce Boss.
\`\`\`

## Budget

Une seule tentative par semaine calendaire. Un Boss retente le lendemain ne mesure plus ta
capacite a livrer sous pression : il mesure ta memoire de l'enonce.

## Interdits

- Aucune IA pendant les 90 min : ni completion, ni relecture, ni reformulation.
- Aucun copier-coller depuis les modules ${liens} : tu ecris de tete, tu verifies apres.
- Aucun secret en clair dans le livrable, quel qu'il soit.
`,
  );

  writeFileSync(
    join(dir, "03-DEFENSE.md"),
    `${entete}[${nom}](README.md)

# Defense sous contradiction

Cinq minutes, enregistrees. Tu presentes le livrable, puis un contradicteur (humain, ou toi
sur enregistrement differe a 24 h) attaque sur trois axes, dans cet ordre :

1. **Le cout** — combien coute ce que tu as fait, en heures ou en euros, et combien coute ce
   que tu n'as pas fait ?
2. **La rupture** — quel changement plausible casse ton livrable, et a quel endroit precis ?
3. **L'alternative refusee** — quelle autre solution as-tu ecartee, et sur quel chiffre ?

Une reponse sans nombre sur l'un des trois axes est comptee comme non repondue. Tu n'as pas le
droit de repondre « ca depend » sans donner immediatement de quoi.
`,
  );

  writeFileSync(
    join(dir, "04-VERDICT.md"),
    `${entete}[${nom}](README.md)

# Verdict

| Verification | Verdict |
| --- | --- |
| Le livrable existe dans le depot du fil rouge, date de debut ET de rendu | Une date manque = **ne passe pas** |
| Il mobilise reellement les deux modules ${liens} | Un seul des deux = **ne passe pas** |
| Les 90 min ont ete tenues, etat gele a l'heure | Depassement non gele = **ne passe pas** |
| Les trois axes de la defense ont recu un nombre | Un « ca depend » nu = **ne passe pas** |
| Zero secret en clair dans le livrable | Un seul = **ne passe pas** |

Passe ou ne passe pas, rien entre les deux. Au moindre doute : ne passe pas.

## Trace

Une ligne dans \`PROGRESSION.md\` : \`${g.porteur} : PASSE le <date>\`. Sans cette ligne, les deux
modules fermes par ce Boss restent ouverts, et le palier ne se coche pas.
`,
  );
  ecrits += 5;
}

// Les retros de palier sont les derniers Boss : elles le declarent, une fois.
for (const g of tousLesGroupes(racine)) {
  if (!g.estRetro) continue;
  const p = join(racine, g.porteur);
  let t = readFileSync(p, "utf8");
  const marqueur = "## Boss de palier (rythme deux modules, un Boss)";
  const bloc = `${marqueur}

Cette retrospective **est** le dernier Boss de son palier : elle ferme ${g.modules
    .map((m) => `[${lisible(m)}](${m}/README.md)`)
    .join(" et ")}. Il n'y a donc pas de dossier \`BOSS-\` supplementaire ici : le Boss final d'un
palier, c'est la relecture qui decide si le palier se coche. Meme verdict binaire que les Boss
intermediaires : passe, ou ne passe pas.

`;
  if (!t.includes(marqueur)) {
    const i = t.indexOf("\n## ");
    t = i === -1 ? `${t}\n${bloc}` : `${t.slice(0, i + 1)}${bloc}${t.slice(i + 1)}`;
    writeFileSync(p, t);
    ecrits += 1;
  }
}

console.log(`Boss generes : ${ecrits} fichiers ecrits ou mis a jour.`);
