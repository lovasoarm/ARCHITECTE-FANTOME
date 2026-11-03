---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Git survival : branches, rebase, conflits, bisect

Temps de lecture ~9 min

Le camp tient un historique de chaque décision : qui a renforcé la clôture, qui a changé le plan de garde, qui a merdé et quand. Git c'est exactement ça pour ton code. Sans lui, chaque modification est une rumeur. Avec lui, c'est un fait daté, signé, traçable.

---

## 1) LE PRINCIPE : UN GRAPHE, PAS UNE LIGNE DE TEMPS

Beaucoup de débutants pensent Git comme une ligne droite : commit après commit après commit. C'est faux. Git c'est un graphe (structure de noeuds reliés entre eux) de snapshots (photos de l'état complet du projet à un instant T).

```text
main:   A --- B --- C --- F
         \      /
feature:     D --- E --
```

Chaque lettre est un commit. Chaque commit pointe vers son parent. Une branche, c'est juste un pointeur (une étiquette mobile) qui suit le dernier commit d'une lignée.

```js
// Glenn crée une branche pour tester un nouveau plan de fouille
// "checkout -b" = créer la branche ET basculer dessus en une commande
// git checkout -b feature/plan-fouille

// le sniper reste sur main, le camp continue à fonctionner normalement
// La branche de Glenn n'affecte personne tant qu'elle n'est pas fusionnée
```

**Technique :** un commit Git n'est pas un diff (différence). C'est un snapshot complet, optimisé pour ne stocker que ce qui a changé. Ça veut dire que naviguer dans l'historique, c'est naviguer entre des états complets du projet, pas entre des patchs empilés.

**Risque réel :** si tu commits directement sur `main` sans branche, et que ton changement casse tout, tu casses la version que tout le camp utilise. Une branche c'est une zone de quarantaine (isolation avant validation).

---

## 2) MERGE VS REBASE : DEUX FAÇONS DE RÉCONCILIER

le sniper et Glenn ont chacun avancé sur leur branche. Il faut réunir le travail. Deux méthodes, deux philosophies.

### Merge : on garde l'histoire telle quelle

```text
main:   A --- B --- C ------- M (merge commit)
         \       /
feature:     D --- E ---
```

```js
// git checkout main
// git merge feature/plan-fouille
// Crée un nouveau commit M qui a DEUX parents : C et E
// L'historique garde la trace exacte de ce qui s'est passé
```

### Rebase : on réécrit l'histoire pour qu'elle soit linéaire

```text
AVANT :
main:   A --- B --- C
         \
feature:     D --- E

APRÈS rebase de feature sur main :
main:   A --- B --- C
            \
feature:         D' --- E'
```

```js
// git checkout feature/plan-fouille
// git rebase main
// D et E sont REJOUÉS par-dessus C, devenant D' et E'
// Les commits ont de nouveaux hash (identifiants), c'est une réécriture
```

**Pourquoi ça compte :** `merge` préserve la vérité historique (ce qui s'est vraiment passé, dans l'ordre). `rebase` produit un historique propre et linéaire, plus facile à lire, mais qui ment un peu sur la chronologie réelle.

**Qui casse en prod :** rebaser une branche que quelqu'un d'autre a déjà récupérée (pull). Les hash changent, Git voit ça comme des commits totalement différents, et la personne qui avait pull se retrouve avec des doublons ou des conflits fantômes.

```text
RÈGLE D'OR : rebase ta branche perso autant que tu veux.
Rebase JAMAIS une branche partagée que d'autres ont déjà récupérée.
```

---

## 3) CONFLITS : QUAND DEUX SURVIVANTS TOUCHENT LA MÊME CLÔTURE

Un conflit arrive quand Git ne peut pas décider tout seul quelle version garder, parce que les deux branches ont modifié les mêmes lignes.

```js
// Dans le fichier rations.js, après une tentative de merge :

<<<<<<< HEAD
const rationsParJour = 3;
=======
const rationsParJour = 2;
>>>>>>> feature/economie-rations

// HEAD = ta version actuelle (où tu es maintenant)
// feature/economie-rations = la version qu'on essaie d'intégrer
// Git te demande : laquelle on garde, ou on combine les deux ?
```

Résolution :

```js
// Tu choisis, tu édites, tu supprimes les marqueurs <<<, ===, >>>
const rationsParJour = 2; // décision : on suit le plan d'économie de rations

// Puis :
// git add rations.js
// git commit (ou "git rebase --continue" si t'étais en plein rebase)
```

**Technique :** un conflit n'est pas une erreur. C'est Git qui refuse de deviner à ta place. Il préfère te bloquer plutôt que de silencieusement choisir une version et perdre du travail.

**Qui casse en prod :** résoudre un conflit en panique, sans lire les deux versions, en gardant juste "la sienne" pour aller vite. Tu perds le travail de l'autre sans t'en rendre compte, et tu le découvres trois jours après.

---

## 4) BISECT : LA CHASSE AU COMMIT COUPABLE

Le simulateur de menace plantait pas la semaine dernière. Il plante maintenant. Entre les deux, 40 commits. Tu vas pas les lire un par un.

```js
// git bisect start
// git bisect bad         (l'état actuel est cassé)
// git bisect good a1b2c3d    (ce commit-là, on sait qu'il marchait)

// Git coupe en deux automatiquement et te donne un commit au milieu à tester
// Tu testes, tu dis :
// git bisect good  (si ce commit marche)
// git bisect bad  (si ce commit est cassé)

// Git répète la dichotomie jusqu'à isoler LE commit responsable
```

```text
40 commits à tester un par un --> jusqu'à 40 tests
40 commits avec bisect (recherche dichotomique, O(log n)) --> environ 6 tests
```

**Pourquoi ça marche :** bisect applique une recherche binaire (diviser l'espace de recherche en deux à chaque étape) sur ton historique. C'est le même principe qu'une recherche dans un tableau trié.

**Qui casse en prod :** des commits trop gros, qui changent 15 fichiers et 3 features en même temps. Bisect te dit "c'est ce commit-là", mais le commit fait tellement de choses que tu sais toujours pas QUELLE ligne est coupable. Des petits commits atomiques (qui font une seule chose) rendent bisect réellement utile.

---

## EXERCICES

EXO 1 : Le clone qui ment :
Le camp a une branche `feature/clone-detector` censée détecter les survivants infectés avant qu'ils tournent. Deux développeurs (toi et un coéquipier fictif) ont chacun modifié la fonction `detecterInfection()` sur leurs branches respectives, avec des seuils différents. Crée la situation en local (deux branches, deux modifications de la même ligne), merge-les, et résous le conflit en justifiant ton choix dans le message de commit. (indice : `git log --graph --oneline` t'aide à visualiser le graphe avant de merger)

EXO 2 : L'historique qui pue :
Sur une branche perso, fais 5 commits avec des messages pourris ("En pratique", "fix", "test", "encore", "ça marche"). Utilise `git rebase -i` (rebase interactif) pour les squasher (fusionner) en 1 seul commit avec un message clair qui raconte ce qui a réellement changé. (indice : l'option `squash` dans le rebase interactif)

EXO 3 : Le coupable retrouvé :
Crée un petit script Node qui fonctionne, fais 8 commits dessus, et casse-le volontairement à un commit aléatoire entre le 3e et le 7e. Utilise `git bisect` pour retrouver exactement quel commit a cassé le script, sans regarder l'historique à l'oeil.

---

## RÉSUMÉ

Git c'est un graphe de snapshots, pas une ligne de commandes à mémoriser bêtement. `merge` préserve l'histoire réelle, `rebase` la réécrit pour qu'elle soit propre, mais jamais sur une branche que d'autres ont déjà récupérée. Un conflit c'est Git qui refuse de deviner à ta place, pas un bug. `bisect` transforme une chasse à l'aveugle en recherche dichotomique. Maîtriser ça, c'est la différence entre un camp qui survit aux erreurs et un camp qui se déchire dessus.

<!-- AF-DIAGRAM:tooling -->

## Repère visuel utile : Outil reproductible pour l'équipe Kintana

```text
problème répétitif
       |
       v
solution native ?
   | oui       | non
   v           v
simple     outil évalué
               |
               v
version + tests + docs
               |
               v
usage reproductible
```

<!-- AF-LESSON-PROFILE: tooling -->

## Repères de décision

- **Pourquoi :** La toolchain et les outils de diagnostic réduisent les tâches répétitives et rendent le comportement du système visible.
- **Quand l’utiliser / quand l’éviter :** Choisis un outil quand il résout un problème fréquent et mesurable. Vérifie sa licence, sa maintenance, ses versions, ses permissions et son coût avant de l'ajouter.
- **Limites :** Un outil n'est pas une politique de qualité. Un benchmark, logger ou générateur peut donner une fausse confiance si son protocole et ses limites ne sont pas écrits.

## Mécanisme : la version sans magie

Décris le problème, compare l'outil à une commande native ou à une alternative plus simple, épingle sa version et vérifie le résultat qu'il produit.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Git survival : branches, rebase, conflits, bisect** se rattache à ce cas concret : L'équipe Kintana doit pouvoir diagnostiquer une panne et refaire un build sans dépendre d'une configuration cachée sur le poste d'une seule personne.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Outil reproductible pour l'équipe Kintana

> **Arc Capsule Corp. / DBZ :** le bon outil accélère le diagnostic ; dix outils mal choisis ne font que déplacer le bazar.

**Mission liée à « Git survival : branches, rebase, conflits, bisect » :** Automatise une opération récurrente du cycle Kintana (analyse, benchmark, log, build ou debug). Ajoute un mode dry-run si l'action est destructive et une vérification qui empêche l'outil de masquer une erreur.

**Livrable :** outil/script, README d'usage, tests sur succès/échec, version épinglée et comparaison au processus manuel.

**Critères d’acceptation :** les arguments sont validés ; les erreurs ont un code de sortie ; aucune donnée sensible n'est imprimée ; la même commande donne une sortie compréhensible et reproductible.

**Transfert obligatoire :** Exécute l'outil sur une autre machine ou avec une version différente. Documente les prérequis et le mode dégradé.
