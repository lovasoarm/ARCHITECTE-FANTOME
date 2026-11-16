---
stability: evolutif
acte: comprendre
cognitive_level: L3
perturbation_modes: [frontiere_runtime, injection_entree]
anti_recipe_key: frontiere_runtime+injection_entree
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Node.js child_process : lancer un programme sans confondre processus et thread

Temps de lecture ~15 min

Un `Worker Thread` partage le processus Node et sert surtout au calcul JavaScript CPU-intensif. Un processus enfant est un programme séparé : il possède son propre espace mémoire, son PID, son cycle de vie et ses flux standard. On le choisit pour lancer un outil système, isoler un programme ou communiquer avec un autre exécutable.

## 1) Choisir la bonne API

| API                    | Usage                                              | Attention                                                                     |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `spawn(command, args)` | Processus long, flux stdout/stderr, gros volumes   | Gérer `error`, `close`, sortie et annulation                                  |
| `execFile(file, args)` | Exécuter un binaire précis sans shell              | Bufferise la sortie ; fixer `maxBuffer` si nécessaire                         |
| `exec(command)`        | Petite commande shell dont la chaîne est maîtrisée | Le shell interprète les caractères ; jamais concaténer une entrée utilisateur |
| `fork(modulePath)`     | Lancer un module Node avec canal IPC               | Le module enfant doit gérer le protocole IPC                                  |

## 2) `spawn` : flux et cycle de vie

```js
import { spawn } from "node:child_process";

const child = spawn("node", ["./scripts/report.js", "--format", "json"], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
  shell: false,
});

child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => process.stdout.write(chunk));
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => process.stderr.write(chunk));
child.on("error", (error) =>
  console.error("Impossible de lancer le processus :", error),
);
child.on("close", (code, signal) => {
  if (code === 0) console.log("Rapport terminé");
  else console.error(`Échec : code=${code}, signal=${signal ?? "aucun"}`);
});
```

`close` signifie que le processus est terminé et ses flux fermés. `exit` indique la sortie du processus, mais les flux peuvent encore être en cours de fermeture. Pour un outil qui consomme beaucoup de données, `spawn` permet de traiter les sorties par morceaux au lieu de tout conserver en mémoire.

## 3) `execFile` : éviter le shell

```js
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const { stdout } = await execFileAsync(
  "git",
  ["rev-parse", "--short", "HEAD"],
  {
    cwd: process.cwd(),
    timeout: 5000,
    maxBuffer: 1024 * 1024,
    windowsHide: true,
  },
);
console.log("Commit :", stdout.trim());
```

Passe le programme et chaque argument séparément. Ne fabrique pas une commande en concaténant `userInput`. `shell: true` ou `exec()` avec une entrée non fiable peut créer une injection de commande. Valide aussi l'exécutable autorisé, les arguments, le répertoire de travail et les permissions.

## 4) `fork` : processus Node avec IPC

```js
// parent.mjs
import { fork } from "node:child_process";
import { fileURLToPath } from "node:url";
const childPath = fileURLToPath(new URL("./child.mjs", import.meta.url));
const child = fork(childPath, [], {
  stdio: ["inherit", "inherit", "inherit", "ipc"],
});
child.on("message", (message) => {
  if (message?.type === "result") console.log("Résultat :", message.data);
});
child.send({ type: "run", payload: { count: 10 } });
child.on("error", console.error);
child.on("exit", (code) => console.log("Enfant terminé :", code));
```

```js
// child.mjs
process.on("message", (message) => {
  if (message?.type !== "run") return;
  process.send?.({ type: "result", data: message.payload.count * 2 });
});
```

Le message IPC est un protocole applicatif : définis les types, les erreurs, les délais, l'annulation et la fermeture. Ne laisse pas un processus enfant orphelin au shutdown.

## 5) Comparer sans mélanger

| Besoin                                        | Choix de départ       | Pourquoi                                            |
| --------------------------------------------- | --------------------- | --------------------------------------------------- |
| Calcul CPU JS dans la même application Node   | `worker_threads`      | Threads dans le même processus, heap/isolate séparé |
| Lancer `git`, `ffmpeg` ou un binaire autorisé | `spawn` / `execFile`  | Programme externe et flux système                   |
| Isoler un programme Node avec IPC             | `fork`                | Processus Node indépendant et canal de messages     |
| Appel réseau / I/O asynchrone                 | API asynchrone native | Un processus enfant serait généralement inutile     |

Aucun choix n'est universel : les coûts de démarrage, les permissions, la portabilité OS, les données échangées et le besoin d'isolation tranchent.

## EXERCICE : générateur de rapport isolé

Construis un script parent qui lance un enfant pour produire un rapport de taille contrôlée. Le parent doit afficher la progression, distinguer `error`, `close` et code non nul, imposer un timeout et arrêter l'enfant au shutdown. Teste au minimum : exécutable absent, sortie non nulle, sortie volumineuse et entrée utilisateur contenant `;`, `&&` et espaces. Aucun de ces textes ne doit être interprété comme une commande shell.

**Preuves :** commande exacte, sortie capturée, code de sortie, comportement au timeout, et note sur les différences Windows/Linux. Ne marque pas `PRODUCTION` si seul un test local a été réalisé.

## Limites

Un processus enfant n'est pas automatiquement un sandbox. Il peut hériter d'identifiants, de variables, de fichiers et de permissions du parent. Le séparer ne remplace ni un utilisateur système dédié, ni un contrôle d'accès, ni une isolation OS adaptée.
