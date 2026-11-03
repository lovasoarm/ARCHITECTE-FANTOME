---
perishability_id: PER-0002

stability: perissable
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, erreur_observable]
anti_recipe_key: consigne_simple+erreur_observable
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_type: primary
source_url: https://github.com/nodejs/learn/blob/main/pages/command-line/run-nodejs-scripts-from-the-command-line.md
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « 03 : DAY ONE (contexte, environnement, premier code) ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **Repère simple :** ton fichier contient les instructions ; Node les exécute ; le terminal montre ce qui s'est passé.

# 03 : DAY ONE (contexte, environnement, premier code)

Temps de lecture ~3 min

## QUIZ DE NIVEAU (30 secondes, auto-évalué)

Avant de continuer, réponds honnêtement à ces 6 questions :

- [ ] Je sais ouvrir une application de terminal (Terminal sur macOS ou Windows Terminal sur Windows).
- [ ] Je sais reconnaître le shell ouvert (PowerShell, Bash ou zsh).
- [ ] Je sais lancer `node -v` et lire sa sortie.
- [ ] Je sais lire la sortie qui apparaît après avoir lancé une commande.
- [ ] Je sais utiliser `cd`, `ls`, `pwd` dans un terminal.
- [ ] Je sais créer un fichier `.js` avec mon éditeur et le sauvegarder.

**Score** :

- **4+ oui** : tu peux continuer.
- **0 à 3 oui** : ouvre d'abord `04-shell_survival.md` (dans ce même dossier), puis reviens ici. Aucune honte : tu apprends le terminal en même temps que le métier.

Ce quiz n'est pas technique JS. Il ne teste que **l'environnement**. Tu peux ne rien connaître à JS et cocher 6/6.

Temps de pratique : ~15 min

> **INTEMPOREL** : les outils changent, l'idée non. Un environnement
> reproductible, la boucle _écrire -> exécuter -> lire l'erreur -> comprendre_,
> et le réflexe de tout noter : ça survivra à toutes les stacks.

Ce fichier réunit le contexte, l'environnement et le premier code. Il te met
en selle en une lecture : pourquoi tu es là, comment monter ton poste, et ton
tout premier cycle de debug.

---

## 1. Ce qu'on fabrique ici

Pas un développeur "qui sait faire une list". Un **ingénieur** qui :

- lit du code inconnu sans paniquer,
- debugge une prod cassée à 3h du matin,
- pilote une IA au lieu de la subir,
- reste employable quand la stack à la mode aura disparu.

### Le contrat

- **Lis la consigne et les prérequis de l'activité que tu fais.** Tu n'as pas à lire chaque fichier Markdown du dépôt avant d'écrire ta première ligne.
- **Note simplement ce que tu prévoyais, ce qui s'est passé et ce que tu as corrigé.** Un journal structuré ou un postmortem sera demandé plus tard, lorsqu'un module en aura besoin ; ce n'est pas un prérequis de cette première séance.
- **N'installe pas d'outil supplémentaire sans raison.** Pour cet exercice, Node.js et un éditeur suffisent. La mesure de l'usage de l'IA sera introduite dans le Référentiel, au moment prévu par la route.

### La règle de la première séance

> Exécute une commande à la fois. Observe sa sortie. Avant de passer à la suivante, sois capable de dire simplement ce qu'elle a fait.

---

---

## 2. Ton environnement (5 min)

Le pas-à-pas complet (Windows / macOS / Linux) est dans
[`02-install.md`](02-install.md). Ici, juste le check express.

```bash
node -v       # requis pour le premier exercice
npm -v        # utile avant une activité qui installe des dépendances
git --version # utile avant une activité qui demande Git
```

Node : voir [06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md](../../06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md) (référence documentaire : v22.23.4).

Si `node -v` échoue, ouvre [`02-install.md`](02-install.md) avant de continuer. Si seul `npm -v` ou `git --version` échoue, le premier exercice reste possible ; répare l'outil concerné avant l'activité qui en dépend.

### Éditeur

VS Code ou tout éditeur capable de créer et d'enregistrer un fichier texte avec l'extension `.js`. La coloration syntaxique et le terminal intégré sont pratiques ; le débogueur pas-à-pas n'est pas nécessaire aujourd'hui.

Vérification finale :

```bash
node -e "console.log('ok')"
```

Sortie attendue : `ok`. Sinon, retour à `02-install.md`.

---

## 3. Ton premier cycle (10 min)

### a. Crée et exécute

Choisis le bloc correspondant à ton terminal. Les deux font la même chose ; n'exécute pas les deux.

**Windows : PowerShell (Windows PowerShell 5.1 ou PowerShell 7) :**

```powershell
New-Item -ItemType Directory -Force -Name day_one | Out-Null
Set-Location day_one
Set-Content -Path hello.js -Value 'console.log(1 + 1)' -Encoding utf8
node .\hello.js
```

**macOS / Linux : shell Bash ou zsh dans l'application Terminal :**

```bash
mkdir -p day_one
cd day_one
printf '%s\n' 'console.log(1 + 1)' > hello.js
node hello.js
```

Attendu : `2`. Si tu vois autre chose, note le message affiché et l'étape où ça bloque. Tu viens de faire ta première observation de programme.

### b. Casse volontairement

Ouvre `hello.js` dans ton éditeur et remplace temporairement son contenu par :

```js
console.log(1 + )
```

Enregistre puis relance `node .\hello.js` dans PowerShell ou `node hello.js` dans macOS/Linux. Lis l'erreur : repère le fichier, la ligne et l'endroit où la syntaxe devient invalide. Il est normal de ne pas comprendre chaque mot du message.

### c. Répare

Remets `console.log(1 + 1)`, enregistre et relance la commande. Tu dois retrouver `2`. Tu viens de boucler un premier cycle : prédire → exécuter → observer → corriger. Le module `01-CADRAGE/03-DEBUGGING` approfondira plus tard cette méthode.

### Ce qu'on ne fait PAS aujourd'hui

- installer React, Vue, Next, Tailwind, Prisma, Docker, K8s...
- copier-coller une "app en 10 min",
- suivre un tuto YouTube.

---

Prochaine étape : retourne à [`01-START_HERE.md`](01-START_HERE.md) et vérifie que le noyau Getting Started est terminé. Ouvre ensuite le [Prologue](../02-PROLOGUE/README.md). Il conduit au Référentiel ; ne saute pas directement à l'auto-diagnostic.

## Défi facultatif : défendre une autre méthode

Quand le premier cycle devient facile, imagine une autre manière de créer le fichier. Compare les deux méthodes et explique laquelle tu choisirais sur ton poste. Ce défi ne conditionne pas la sortie de Day One.

<!-- AF-DIAGRAM:setup -->

## Repère visuel utile : Environnement reproductible et livraison

```text
écrire le fichier .js
       |
       v
lancer node fichier.js
       |
       v
lire la sortie ou l'erreur
       |
       v
corriger le fichier
       |
       v
relancer et comparer le résultat
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** La boucle écrire → exécuter → observer → corriger te permet de vérifier ce que fait réellement ton code.
- **Quand l’utiliser / quand l’éviter :** Utilise-la dès qu'un résultat te surprend. Pour ce premier exercice, une seule instruction suffit ; aucun framework ni outil de test n'est nécessaire.
- **Limites :** Réussir ce petit exemple montre que Node exécute un fichier simple. Cela ne prouve pas encore que tu maîtrises JavaScript ou que tu sais livrer une application.

## Mécanisme : la version sans magie

Le terminal lance Node, Node exécute le fichier, puis affiche le résultat ou une erreur. Tu changes le fichier et tu relances pour vérifier l'effet de ta correction.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **02 : DAY ONE (contexte, environnement, premier code)** commence par un geste très simple : lancer un fichier, lire la sortie, corriger une erreur puis relancer. Les procédures de clone, de dépendances, de secrets et de livraison arriveront dans les modules qui les enseignent.

**À observer :** la commande réellement lancée, sa sortie et la correction effectuée. À ce stade, une note texte suffit ; aucun rapport formel n'est demandé.

## Mission utile : Kintana : exécuter et expliquer un premier calcul

> **Arc Konoha / Naruto :** avant une grande mission, commence par réussir un geste simple et comprendre ce qu'il fait.

**Mission liée à « 02 : DAY ONE (contexte, environnement, premier code) » :** remplace temporairement le calcul `1 + 1` par `6 * 7`, exécute le fichier, puis explique ce que le programme affiche. Remets ensuite le fichier dans son état initial.

```js
console.log(6 * 7);
```

**Livrable :** le fichier exécuté et une phrase expliquant la sortie.

**Critères d’acceptation :** le terminal affiche `42`, l'apprenant sait quelle ligne produit ce résultat et restaure ensuite l'exercice initial. Aucun clone de projet, test automatisé ou document de livraison n'est attendu aujourd'hui.

**Transfert obligatoire :** remplace `6 * 7` par `8 + 5`, prédis la sortie avant d'exécuter, puis vérifie-la. Le but est de refaire le même raisonnement avec une opération différente.

## Sources des commandes de terminal

Les exemples PowerShell de création de dossier/fichier et d'écriture de contenu s'appuient sur la documentation Microsoft : [New-Item](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-item) et [Set-Content pour Windows PowerShell 5.1](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content?view=powershell-5.1). Les commandes Node sont alignées sur la version AF 22.23.4 : [documentation Node.js v22.23.4](https://nodejs.org/docs/v22.23.4/api/).

Vérification documentaire effectuée le 1er novembre 2026 ; la procédure devra être revérifiée lors d'un changement de runtime ou de shell. Aucune revue experte indépendante n'est revendiquée.
