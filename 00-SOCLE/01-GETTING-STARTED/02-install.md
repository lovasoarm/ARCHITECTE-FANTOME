---
perishability_id: PER-0001

stability: perissable
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, regression]
anti_recipe_key: changement_echelle+regression
transfer_distance: low
assessment_role: instructional_checkpoint
freshness_registry_id: PER-0001
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-04-28
review_status: a_verifier_date_absente
---
> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 01 : Installation pas-à-pas (Windows / macOS / Linux)

> **Voie zéro friction :** commence par le [`SETUP.md`](../../SETUP.md) racine, puis suis le `SETUP.md` le plus proche de l’activité. Ne bloque pas une première preuve sur Git, VSCode ou des extensions.

Temps de lecture ~5 min

> **INTEMPOREL** : les URLs changent, le protocole ne change pas :
> _installer proprement → vérifier → figer la version → documenter_.

Les numéros de version ci-dessous sont à jour pour 2026. Voir `.nvmrc`
à la racine pour la version canonique en cours.

> **C'est quoi `.nvmrc` ?** Un fichier texte d'une seule ligne (ex. `22`) placé
> à la racine du projet. `nvm` (Node Version Manager) lit ce fichier et bascule
> Node sur la version indiquée quand tu tapes `nvm use` dans le dossier. C'est
> **la source de vérité unique** de la version Node du curriculum : si un
> exercice ne marche pas, vérifie d'abord `node -v` contre `cat .nvmrc`. Tu
> n'as rien à créer : le fichier est déjà là.

---

## 0. Règle d'or

Tu n'installes **rien à la va-vite**. À chaque étape, tu vérifies avec une
commande. Si la vérification échoue, tu ne passes pas à la suivante.

---

## 1. Node.js

### macOS / Linux (recommandé : `nvm`)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
# ferme et rouvre le terminal
nvm install 22.23.4
nvm use 22.23.4
node -v  # doit renvoyer v22.23.4
```

### Windows

Option A (recommandée) : [`nvm-windows`](https://github.com/coreybutler/nvm-windows). Dans PowerShell, installe puis sélectionne explicitement la version canonique :

```powershell
nvm install 22.23.4
nvm use 22.23.4
```

Option B : installeur officiel depuis l’[archive Node.js 22.23.4](https://nodejs.org/en/download/archive/v22.23.4) ; choisis précisément cette version, et non automatiquement la LTS la plus récente.

Vérifie dans PowerShell :

```powershell
node -v
npm -v
```

Si `node` n'est pas reconnu : ferme et rouvre PowerShell. Toujours pas ?
→ variable `PATH` mal configurée. Cherche "Environment Variables" dans les
paramètres système, ajoute le dossier d'install de Node.

---

## 1bis. Version de référence et compatibilité

La version exacte de reproductibilité du curriculum est **Node 22.23.4**, indiquée dans `.nvmrc`. Pour reproduire les exercices dans les mêmes conditions, installe cette version. Une autre version Node 22.x peut fonctionner, mais sa compatibilité doit être vérifiée séparément : le fait qu'elle appartienne à la même branche majeure ne prouve pas que tous les exercices ont été testés avec elle.

Vérifie **maintenant**, avant même le premier exercice :

```bash
node -e 'if (process.versions.node !== "22.23.4") { console.error("Node 22.23.4 requis pour la reproduction exacte. Version détectée:", process.versions.node); process.exit(1); } else { console.log("Node de référence OK:", process.versions.node); }'
```

Si la commande échoue, installe ou sélectionne la version exacte indiquée dans `.nvmrc`. Le contrôle vérifie la reproductibilité de l'environnement ; il ne prouve pas que tous les exercices du dépôt ont été exécutés avec succès.

---

## 2. Git : utile, mais pas une barrière d’entrée

Git devient nécessaire dès que le chemin te demande un travail de versioning, d’ADR ou de diff. Pour une première séance de lecture ou un exercice Node autonome, tu peux continuer sans Git.

Installe-le seulement au moment où le module concerné l’exige, puis vérifie : `git --version`.

Configure une fois pour toutes :

```bash
git config --global user.name "Ton Prénom"
git config --global user.email "toi@example.com"
git config --global init.defaultBranch main
```

---

## 3. Éditeur

N’importe quel éditeur texte qui sait rechercher dans un dossier suffit pour démarrer. VSCode est recommandé mais **facultatif**. Les extensions ESLint, Prettier, Error Lens et GitLens sont des accélérateurs, pas des prérequis du parcours.

Rien de plus au démarrage. Chaque plugin est une dette cognitive.

---

## 4. Vérification finale

```bash
node -e "console.log('node ok')"
npm --version
git --version
```

Les trois doivent répondre. Sinon → retour à l'étape correspondante.

---

## 5. Fige ta version Node

À la racine du curriculum, un fichier `.nvmrc` déclare la version canonique.

```bash
cd chemin/vers/ce parcours_Thor_Edition
nvm use  # lit .nvmrc automatiquement
```

Si `nvm use` renvoie "version not installed" → `nvm install`.

---

## Permissions (piège classique)

- **macOS/Linux** : ne fais **jamais** `sudo npm install -g …`. C'est le signe
  que ton install Node est mal placée. Réinstalle via `nvm`.
- **Windows** : si un `npm install` échoue avec `EPERM`, ferme les processus
  Node/VSCode ouverts et relance en tant qu'utilisateur (pas admin).

---

## (attention) Ce que l'analogie "installer c'est juste cliquer" cache

Installer, c'est **configurer un environnement d'exécution**. Chaque outil
ajoute des variables `PATH`, des permissions, des caches. Un environnement
sale génère des bugs fantômes que tu attribueras à ton code. D'où : versions
figées (`.nvmrc`), vérifications systématiques, réinstall via gestionnaire
(`nvm`) plutôt que par installeur global.

Retour à `03-day_one.md`.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
