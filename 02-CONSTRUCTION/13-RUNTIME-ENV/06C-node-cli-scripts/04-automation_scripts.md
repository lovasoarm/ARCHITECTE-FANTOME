---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, transmission]
anti_recipe_key: constraints_injectees+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Scripts d'automatisation : le code qui bosse à ta place

Temps de lecture ~8 min

Un script d'automatisation, c'est du code qui fait à ta place ce que tu ferais à la main. Renommer 300 fichiers, transformer des données d'un format à un autre, synchroniser deux dossiers, générer des rapports : si tu le fais plus d'une fois, tu l'automatises. C'est la définition du dev qui ne travaille pas deux fois.

---

## 1) RENOMMER EN MASSE

```js
// scénario : t'as 200 fichiers de replay nommés en vrac
// match1.mp4, MATCH_2.mp4, match-3.mp4, Match4.mp4
// tu veux tout normaliser en : 2026-06-01_match-001.mp4

import { readdir, rename } from "node:fs/promises";
import path from "node:path";

async function normalizeFilenames(dir) {
  const files = await readdir(dir);
  const videoFiles = files.filter((f) => f.endsWith(".mp4"));

  const results = { renamed: 0, skipped: 0, errors: [] };

  for (const [index, filename] of videoFiles.entries()) {
    const oldPath = path.join(dir, filename);
    // format normalisé : numéro sur 3 chiffres, kebab-case
    const number = String(index + 1).padStart(3, "0");
    const newName = `2026-06-01_match-${number}.mp4`;
    const newPath = path.join(dir, newName);

    if (filename === newName) {
      results.skipped++;
      continue;
    }

    try {
      await rename(oldPath, newPath);
      console.log(`${filename} --> ${newName}`);
      results.renamed++;
    } catch (err) {
      results.errors.push({ file: filename, error: err.message });
    }
  }

  return results;
}
```

---

## 2) TRANSFORMER DES DONNÉES (ETL BASIQUE)

```js
// Extract-Transform-Load : lire une source, transformer, écrire ailleurs
// cas concret : convertir les stats de match depuis CSV vers JSON enrichi

import { createReadStream, createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { parse } from "csv-parse";
import path from "node:path";

// Dépendance à déclarer et verrouiller dans le projet : npm install csv-parse
// Le parseur gère les virgules, guillemets échappés et retours à la ligne CSV.
async function csvToJson(inputPath, outputDir) {
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(
    outputDir,
    path.basename(inputPath, ".csv") + ".json",
  );
  let count = 0;
  await pipeline(
    createReadStream(inputPath),
    parse({ columns: true, skip_empty_lines: true, trim: true, bom: true }),
    async function* toJsonArray(source) {
      let first = true;
      yield "[\n";
      for await (const record of source) {
        count += 1;
        const enriched = {
          ...record,
          id: count,
          processedAt: new Date().toISOString(),
          goals: Number.parseInt(record.goals, 10) || 0,
          assists: Number.parseInt(record.assists, 10) || 0,
        };
        yield `${first ? "" : ",\n"}${JSON.stringify(enriched)}`;
        first = false;
      }
      yield "\n]\n";
    },
    createWriteStream(outputPath, { encoding: "utf8" }),
  );
  return { input: inputPath, output: outputPath, count };
}
```

---

## 3) SYNCHRONISER DEUX DOSSIERS

```js
// copier les fichiers du dossier source vers destination
// seulement ceux qui sont nouveaux ou modifiés

import { readdir, stat, copyFile, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

async function sha256(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

async function syncDirs(source, dest) {
  await mkdir(dest, { recursive: true });

  const entries = await readdir(source, { withFileTypes: true });
  const report = { copied: [], skipped: [], errors: [] };

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // récursion dans les sous-dossiers
      const sub = await syncDirs(srcPath, destPath);
      report.copied.push(...sub.copied);
      report.skipped.push(...sub.skipped);
      report.errors.push(...sub.errors);
      continue;
    }

    try {
      const srcStat = await stat(srcPath);
      let destStat = null;

      try {
        destStat = await stat(destPath);
      } catch {
        // destination n'existe pas encore
      }

      // La date seule n'est pas une preuve : deux contenus différents peuvent
      // partager taille et mtime. Compare les octets (hash streaming) avant de sauter.
      const shouldCopy =
        !destStat ||
        srcStat.size !== destStat.size ||
        (await sha256(srcPath)) !== (await sha256(destPath));

      if (shouldCopy) {
        await copyFile(srcPath, destPath);
        report.copied.push(entry.name);
      } else {
        report.skipped.push(entry.name);
      }
    } catch (err) {
      report.errors.push({ file: entry.name, error: err.message });
    }
  }

  return report;
}
```

---

## 4) GÉNÉRER DES RAPPORTS

```js
// générer un rapport markdown depuis des données JSON

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function generateReport(votes, outputPath) {
  // Map évite les collisions avec des noms tels que __proto__ ou constructor.
  const byPlayer = new Map();
  votes.forEach(({ player, points, journalist }) => {
    const stats = byPlayer.get(player) ?? {
      points: 0,
      votes: 0,
      journalists: [],
    };
    stats.points += points;
    stats.votes += 1;
    stats.journalists.push(journalist);
    byPlayer.set(player, stats);
  });

  // trier par points décroissants
  const ranking = [...byPlayer.entries()]
    .sort(([, a], [, b]) => b.points - a.points)
    .map(([player, stats], index) => ({ rank: index + 1, player, ...stats }));

  // générer le markdown
  const lines = [
    "# Ballon d'Or 2026 : Classement provisoire",
    `> Généré le ${new Date().toLocaleDateString("fr-FR")} : ${votes.length} votes comptabilisés`,
    "",
    "| # | Joueur | Points | Votes |",
    "|---|--------|--------|-------|",
    ...ranking
      .slice(0, 10)
      .map((r) => `| ${r.rank} | ${r.player} | ${r.points} | ${r.votes} |`),
    "",
    "## Détail des votes",
    ...ranking
      .slice(0, 3)
      .map((r) =>
        [
          `### ${r.rank}. ${r.player}`,
          `${r.points} points de ${r.votes} journalistes`,
          `Votants : ${r.journalists.join(", ")}`,
          "",
        ].join("\n"),
      ),
  ];

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, lines.join("\n"), "utf-8");
  return outputPath;
}
```

---

## 5) ORCHESTRER PLUSIEURS SCRIPTS

```js
// un script qui coordonne d'autres opérations
// comme un chef d'orchestre : chaque tâche sait ce qu'elle fait,
// le script principal sait dans quel ordre

import { syncDirs } from "./sync.js";
import { csvToJson } from "./transform.js";
import { generateReport } from "./report.js";
import { loadVotes } from "./votes.js";

async function runPipeline() {
  const steps = [
    { name: "Sync des données sources", fn: () => syncDirs("./raw", "./data") },
    {
      name: "Transformation CSV → JSON",
      fn: () => csvToJson("./data/votes.csv", "./processed"),
    },
    {
      name: "Génération du rapport",
      fn: async () => {
        const votes = await loadVotes("./processed/votes.json");
        return generateReport(votes, "./reports/ballon-dor-2026.md");
      },
    },
  ];

  for (const step of steps) {
    process.stdout.write(`${step.name}...`);
    try {
      const result = await step.fn();
      process.stdout.write(" OK\n");
      if (result) console.log(" ", JSON.stringify(result));
    } catch (err) {
      process.stdout.write(" ERREUR\n");
      console.error(` ${err.message}`);
      process.exit(1); // une étape échoue : on arrête tout
    }
  }

  console.log("\nPipeline terminé.");
}

runPipeline();
```

---

## EXERCICES

## EXO 1 : le normaliseur de données

T'as des fichiers JSON de stats de joueurs générés par différentes sources. Le problème : les champs ont des noms différents selon la source (`goals` vs `nbGoals` vs `nb_goals`). Écris un script `normalize.js` qui lit tous les fichiers JSON d'un dossier et produit un format canonique : `{ player, goals, assists, matchesPlayed }`.

---

## EXO 2 : le générateur de fixtures

Écris `generateFixtures(teams, rounds)` qui génère un calendrier de compétition : chaque équipe joue contre chaque autre équipe `rounds` fois. Exporte les fixtures en JSON et en CSV. Les fichiers doivent être nommés `fixtures-YYYY-MM-DD.json` et `fixtures-YYYY-MM-DD.csv`.

---

## EXO 3 : le pipeline complet

Crée un script `pipeline.js` qui :

1. lit les votes depuis `./data/raw/*.csv`
2. normalise les données (un format canonique)
3. sauvegarde en `./data/processed/votes.json`
4. génère un rapport markdown en `./reports/`
5. affiche un résumé dans le terminal (combien de fichiers traités, combien de votes, top 3 joueurs)

Chaque étape doit logger son avancement. Si une étape échoue : les étapes suivantes ne s'exécutent pas.

---

## RÉSUMÉ

Un script d'automatisation fait une chose, bien, de manière reproductible. Le pattern ETL (Extract-Transform-Load) structure la plupart des scripts de données : lire la source, transformer, écrire ailleurs. Pour orchestrer plusieurs scripts : une boucle sur des étapes nommées, chaque étape peut fail-fast. La règle : si tu le fais deux fois à la main, tu l'automatises. Si tu l'automatises, tu le testes.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Transfert : changer de contexte

Applique le mécanisme de « Scripts d'automatisation : le code qui bosse à ta place » à un traitement exécuté en environnement contraint ou interrompu. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:runtime -->

## Repère visuel utile : Service Kintana reproductible et arrêtable

```text
processus démarre
      |
      v
valider config / secrets
      |
  +---+---+
  v       v
ready   échec explicite
  |
  v
traiter requêtes
  | SIGTERM
  v
drain -> fermer ressources -> exit
```

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Scripts d'automatisation : le code qui bosse à ta place** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Scripts d'automatisation : le code qui bosse à ta place » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
