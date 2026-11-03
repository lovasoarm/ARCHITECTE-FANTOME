---
perishability_id: PER-0001
stability: perissable
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, premiere_execution]
anti_recipe_key: consigne_simple+premiere_execution
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_historical"
source_type: primary
source_url: https://nodejs.org/en/download/archive/v22.23.4
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Archive officielle Node.js 22.23.4 : existence de la distribution et de ses fichiers d’installation. Il s’agit d’une version de référence historique et épinglée, pas de la dernière version LTS. Les étapes d’installation sur chaque OS ne sont pas exécutées par cette revue."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_historical » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "ARCHIVE_RELEASE_EXISTENCE_AND_PINNED_REFERENCE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# Installer Node.js : premier passage (Windows / macOS / Linux)

> **SCÈNE : préparer l’outil avant le travail :** Node.js est le programme qui exécutera ton fichier JavaScript. Pour le premier exercice, un éditeur et ce runtime suffisent ; Git, les paquets npm, Docker et les autres outils ne sont pas nécessaires aujourd’hui.

Temps de lecture indicatif : 5 à 10 min, hors téléchargement.

## 1. Choisis une seule méthode d'installation

La version de référence reproductible de cette édition est **Node.js 22.23.4** (`.nvmrc`). Au 3 novembre 2026, Node 22.x et 24.x sont en **Maintenance LTS** ; Node 26.x est en **Active LTS** depuis le 28 octobre 2026 ; Node 27.x est en Alpha. Node 22.23.4 reste pris en charge jusqu'au 30 avril 2027, selon le calendrier officiel, mais ce n'est plus la branche LTS la plus récente. AF conserve le pin 22.23.4 pour éviter un changement de runtime non exécuté ni validé dans cette édition : la compatibilité avec Node 24 ou 26 n'est pas présumée. Une revue de version est prévue au plus tard le 31 janvier 2027, avant la fin de support de Node 22. Consulte le [calendrier officiel du groupe Release](https://github.com/nodejs/Release#release-schedule), les [releases Node.js](https://github.com/nodejs/node/releases) et l'[archive Node.js 22.23.4](https://nodejs.org/en/download/archive/v22.23.4).

**Politique de maintien du runtime AF :** `22.23.4` est le pin reproductible de cette édition, pas une affirmation selon laquelle Node 22 serait la branche LTS la plus récente. Le 3 novembre 2026, Node 26.x est en Active LTS depuis le 28 octobre ; Node 22.x et 24.x sont en Maintenance LTS, et Node 22 est annoncé en fin de support au 30 avril 2027. Le pin 22.23.4 est conservé pour ne pas introduire une migration non exécutée dans les projets et exercices de cette archive. **Ne remplace pas `.nvmrc` par 26.x de ta propre initiative pour suivre le numéro le plus récent.** La revue de version est due au 31 janvier 2027 ; une alerte de sécurité importante, un changement du calendrier officiel ou une rupture de disponibilité déclenche une revue anticipée.

Une migration ultérieure doit être une release distincte : vérifier la version et son statut LTS sur la source officielle, mettre à jour `.nvmrc`, `engines`, les guides d'installation et les outils CI, puis exécuter les tests des projets concernés sur les plateformes annoncées. Tant que ces vérifications n'ont pas été faites, la compatibilité avec Node 24 ou 26 n'est pas certifiée par cette édition.

Choisis une méthode pour ton système. **Ne mélange pas plusieurs installations de Node.js** : deux installations concurrentes peuvent rendre la commande `node` difficile à diagnostiquer.

### Windows : méthode A : installeur officiel (la voie la plus directe)

1. Ouvre l'[archive officielle Node.js 22.23.4](https://nodejs.org/en/download/archive/v22.23.4).
2. Télécharge le **Windows Installer (`.msi`)** correspondant à l'architecture de ton ordinateur.
3. Lance l'installeur et conserve les options par défaut.
4. Ferme puis rouvre PowerShell.
5. Passe à la vérification de la section 2.

Avec cette méthode, **n'utilise pas** `nvm install` ou `nvm use` : l'installeur a déjà installé Node.js.

### Windows : méthode B : nvm-windows (gestionnaire de versions)

Choisis cette méthode seulement si tu souhaites gérer plusieurs versions de Node.js.

1. Installe `nvm-windows` en suivant sa [documentation officielle](https://github.com/coreybutler/nvm-windows#installation--upgrades).
2. Ferme puis rouvre PowerShell.
3. Exécute :

```powershell
nvm install 22.23.4
nvm use 22.23.4
```

4. Passe à la vérification de la section 2.

`nvm-windows` reçoit ici la version explicitement : ne suppose pas qu'il sélectionne automatiquement la valeur de `.nvmrc`.

### macOS / Linux : nvm

`nvm` permet d'installer et de sélectionner la version demandée sans modifier manuellement le chemin système.

1. Suis l'installation de `nvm` décrite dans son [dépôt officiel](https://github.com/nvm-sh/nvm#installing-and-updating), en choisissant les instructions adaptées à ton shell.
2. Ferme puis rouvre le terminal. Si la commande `nvm` n'est pas reconnue, reprends l'étape d'installation avant de continuer.
3. Depuis le dossier du curriculum, exécute :

```bash
nvm install 22.23.4
nvm use 22.23.4
```

4. Passe à la vérification de la section 2.

## 2. Vérification obligatoire pour le premier exercice

Dans PowerShell, Terminal, bash ou zsh, exécute :

```text
node -v
```

La sortie attendue pour reproduire exactement cette édition est :

```text
v22.23.4
```

Puis vérifie que Node peut exécuter une instruction :

```text
node -e "console.log('node ok')"
```

Sortie attendue : `node ok`.

Si `node` n'est pas reconnu, ferme et rouvre le terminal. Si le problème reste présent, reprends uniquement la méthode d'installation que tu as choisie. Si la version affichée n'est pas `v22.23.4`, sélectionne ou installe la version de référence avec cette même méthode.

**Tu peux commencer le premier exercice dès que ces deux commandes fonctionnent.** Aucun contrôle Git ou npm ne bloque cette étape.

## 3. Outils à installer plus tard, uniquement si une activité les demande

- **npm** : il est fourni avec Node.js. Vérifie `npm -v` seulement avant une activité qui installe des dépendances.
- **Git** : installe-le avant le premier exercice qui demande un clone, un commit ou un diff ; vérifie alors `git --version`.
- **Éditeur** : VS Code est recommandé, mais tout éditeur capable de créer et d'enregistrer un fichier texte `.js` convient.
- **Extensions** : ESLint, Prettier, Error Lens et GitLens sont facultatives. Elles ne sont pas requises pour le premier fichier.

## 4. Comprendre `.nvmrc` sans en faire un obstacle

Le fichier `.nvmrc` contient la version Node.js de référence du curriculum : `22.23.4`. C'est une déclaration de version, pas un programme à exécuter.

- Avec `nvm` sur macOS/Linux, place-toi à la racine du curriculum puis lance `nvm use` : `nvm` lit le fichier `.nvmrc`.
- Avec `nvm-windows`, utilise `nvm use 22.23.4` explicitement.
- Avec l'installeur Windows `.msi`, tu n'as pas besoin de `nvm` ni de `nvm use`.

La commande `node -v` reste le contrôle simple à utiliser après le changement de version.

## Dépannage minimal

- **`node` n'est pas reconnu :** ferme et rouvre le terminal ; si l'erreur persiste, vérifie que l'installation s'est terminée correctement.
- **Plusieurs versions semblent se mélanger :** ne réinstalle pas au hasard. Vérifie quelle méthode a été choisie et évite de combiner l'installeur `.msi` et un gestionnaire de versions.
- **Une future commande npm échoue avec `EPERM` sous Windows :** ferme les processus Node/VS Code qui utilisent le dossier, puis réessaie avec ton compte normal. N'utilise pas systématiquement un terminal administrateur.
- **Sous macOS/Linux :** ne contourne pas un problème de permissions par `sudo npm install -g` sans comprendre sa cause. Pour les premières activités, aucune installation globale npm n'est nécessaire.

## Mission utile (différée) : Kintana : environnement reproductible

> **Cette mission n'est pas un prérequis de Getting Started.** Reviens-y après avoir étudié les ressources Git, gestionnaires de paquets et configuration/sécurité. Elle appartient au travail de préparation d'un projet, pas au premier exercice JavaScript.

Prépare alors un clone propre du projet Kintana : vérifie le runtime, installe seulement les dépendances déclarées, ajoute un contrôle de configuration sans afficher les secrets et documente le démarrage ainsi que le nettoyage.

**Livrable de cette mission différée :** un `SETUP.md`, un fichier de versions, un contrôle automatisé de prérequis et une capture de commandes réellement exécutées.

**Critères d’acceptation :** un autre poste suit la procédure sans deviner ; une version incorrecte échoue avec un message utile ; aucun secret n'est commité ; les commandes décrites existent.

**Transfert obligatoire :** (pour cette mission différée uniquement) rejoue la procédure sur une autre machine ou avec un runtime manquant uniquement lorsque tu disposes réellement de cet environnement. Documente les limites si ce transfert n'a pas été exécuté.

## Défi avancé facultatif : prédire avant de réparer

À faire après avoir appris les notions de charge, de données et de concurrence. Introduis un changement de contexte, prédis deux effets observables avant toute correction, puis explique le mécanisme causal. Termine par une intuition plausible, une mesure qui pourrait la réfuter et le signal qui te ferait changer de modèle. **Ce défi ne conditionne ni l'installation ni la sortie de Getting Started.**

<!-- AF-DIAGRAM:setup -->

## Repère visuel : de l'installation au premier résultat

```text
installer Node.js
       |
       v
vérifier node -v
       |
       v
créer un fichier .js
       |
       v
lancer node fichier.js
       |
       v
lire le résultat dans le terminal
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** Node.js est le runtime qui exécute le fichier JavaScript en dehors du navigateur. Une version connue rend les exercices plus faciles à reproduire.
- **Quand l’utiliser / quand l’éviter :** installe Node avant les exercices qui exécutent du JavaScript. N'installe Git, un gestionnaire de paquets ou une extension que lorsqu'une activité en a besoin.
- **Limites :** `node -v` confirme la version sélectionnée ; cela ne prouve pas qu'un projet complet, ses dépendances ou un service en production fonctionnent.

## Mécanisme : la version sans magie

Installer le runtime rend la commande `node` disponible. Le terminal transmet le nom du fichier à exécuter ; Node lit le fichier, exécute son code et renvoie les sorties ou les erreurs.

## Ancrage produit / terrain : Kintana

Kintana est un cas d'étude pédagogique. À ce premier palier, le but est uniquement de savoir que le runtime est disponible. Le clonage, la configuration, les dépendances et la livraison sont traités dans des activités ultérieures.

**À observer :** la version réelle affichée, la commande exécutée et son résultat. Ne présente pas une procédure lue comme une installation effectuée.

## Sortie de cette étape

Tu peux quitter cette étape lorsque `node -v` affiche `v22.23.4` et que la commande de test affiche `node ok`. npm et Git auront leurs propres vérifications au moment utile.

> La compatibilité avec une autre branche n'est pas présumée ni certifiée par cette consigne.
