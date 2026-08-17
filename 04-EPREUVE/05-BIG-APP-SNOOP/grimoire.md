# Grimoire : Big App Snoop

Ce grimoire est un mémo à quatre colonnes exactes. La table de défense orale vit à côté, dans [defense-orale.md](defense-orale.md).

Ouvre ce mémo avant de toucher à du code étranger dans un gros dépôt. Il te donne la méthode
d'archéologie, pas un cours sur la lecture de code.

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Cartographie du terrain | Repérer la structure d'un dépôt (arborescence, dépendances, schéma DB) sans lire la logique métier. | `find . -maxdepth 2 -type d && cat package.json \| jq '.dependencies'` | un relevé de plan avant travaux / un survol de reconnaissance avant l'atterrissage | « un relevé de plan avant travaux » se rejoue à l'identique, le code non ; sur Cartographie du terrain, la frontière dessinée sur le schéma n'existe dans le code que si un mécanisme l'empêche d'être franchie. Date le schéma et fixe la prochaine relecture. |
| Flux de bout en bout | Suivre un cas d'usage réel du clic jusqu'à l'écriture en base, sans dévier. | `rg -n "createTournee" --type ts` | urgences d'hôpital / atelier de menuiserie | « urgences d'hôpital » raconte le cas nominal ; sur Flux de bout en bout, un composant partagé par deux équipes appartient de fait à personne. Chiffre le coût de retour arrière avant de découper. |
| Zone à risque | Fichier ou fonction à fort impact ou fort historique de modification. | `git log --name-only --pretty=format: > /tmp/touches.txt` puis comptage des occurrences | poste de cuisine où tout finit par passer, donc premier à saturer / passage étroit d'une voie que toutes les cordées empruntent | « poste de cuisine où tout finit par passer, donc premier à saturer » s'arrête à la première surprise ; sur Zone à risque, le schéma vieillit plus vite que le code qu'il décrit. Vérifie dans le code qu'un import interdit échoue vraiment. |
| Contrainte reconstruite | Raison externe (légale, contractuelle, performance, équipe) qui explique un design en apparence mauvais. | `git log --follow -p -- chargeSplitter.ts \| head -80` | une porte murée qui cachait un escalier / un détour imposé par un pont trop bas | « une porte murée qui cachait un escalier » n'a ni facture ni horloge ; sur Contrainte reconstruite, le découpage optimise un critère (déploiement, équipe, donnée) et dégrade les autres. Écris l'ADR avec les options rejetées et la condition qui la rendrait obsolète. |
| Dette délibérée vs dette subie | Distinction entre un compromis choisi consciemment et une dégradation non maîtrisée. | `git log --all --grep="TODO temporaire" -i --oneline` | navigation maritime / urgences d'hôpital | « navigation maritime » suppose un seul acteur à la fois ; sur Dette délibérée vs dette subie, un appel synchrone entre composants crée une dépendance de disponibilité invisible sur le diagramme. Vérifie dans le code qu'un import interdit échoue vraiment. |
| Rayon d'impact | Ensemble des appelants, tests et données qui dépendent de ce que tu modifies. | `rg -n "from ['\"].*slotWindow" --type ts` | régie technique de spectacle / course en montagne | « régie technique de spectacle » décrit un monde où chaque étape se voit ; sur Rayon d'impact, le coût du réseau entre deux composants séparés est de plusieurs ordres de grandeur au-dessus d'un appel local. Écris l'ADR avec les options rejetées et la condition qui la rendrait obsolète. |
| Test de caractérisation | Test qui documente le comportement actuel du code, bug inclus, avant toute modification. | `it("caracterise le comportement actuel", () => { expect(splitHeatingCost(oldBuilding, readings)).toEqual(snapshotActuel); })` | atelier de menuiserie / urgences d'hôpital | « atelier de menuiserie » n'a ni facture ni horloge ; sur Test de caractérisation, le schéma vieillit plus vite que le code qu'il décrit. Chiffre le coût de retour arrière avant de découper. |
| Patch minimal | Le plus petit changement qui corrige le problème réel, sans nettoyage ni renommage mêlés. | `git diff --stat # verifie que le diff ne touche que la ligne du bug` | cuisine de restaurant en service / navigation maritime | « cuisine de restaurant en service » a une frontière visible à l'oeil ; sur Patch minimal, la réversibilité de la décision se paie au moment du découpage, pas après. Date le schéma et fixe la prochaine relecture. |
| Non-régression | Preuve que ce qui marchait avant ton patch marche toujours après. | `npm test -- --run tests/chargeSplitter.spec.ts` | urgences d'hôpital / course en montagne | « urgences d'hôpital » n'a ni facture ni horloge ; sur Non-régression, la réversibilité de la décision se paie au moment du découpage, pas après. Chiffre le coût de retour arrière avant de découper. |
| Données déjà écrites | Lignes en base ou fichiers créés sous l'ancien comportement, non concernées automatiquement par ton patch. | `SELECT count(*) FROM allocations WHERE created_at < '2026-01-01';` | atelier de menuiserie / régie technique de spectacle | « atelier de menuiserie » n'a ni facture ni horloge ; sur Données déjà écrites, la transaction distribuée n'existe pas : il reste des états intermédiaires observables. Écris l'ADR avec les options rejetées et la condition qui la rendrait obsolète. |

## Défense orale

La table de défense orale a son propre fichier, pour que ce grimoire garde un format unique de quatre colonnes : [defense-orale.md](defense-orale.md).

## La méthode en une page

```text
1. Cartographie (30 min)     -> README, arborescence, dependances, schema DB
2. Flux de bout en bout       -> suis UN cas d'usage reel du clic jusqu'a la base
3. Zones a risque             -> fichiers chauds (git log --stat), fonctions longues,
                                  absence de tests
4. Historique cible           -> git log -p sur la zone, tickets lies, mots-cles du domaine
5. Synthese ecrite            -> carte + flux + risques + inconnues + estimation en fourchette
6. Rayon d'impact avant patch -> appelants, tests existants, donnees deja ecrites
7. Patch minimal + non-regression -> plus petit diff possible, preuve avant/apres
```

## Commandes utiles

```bash
# Fichiers les plus modifiés (points chauds)
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -30

# Historique complet d'un fichier, y compris renommages
git log --follow -p -- chemin/du/fichier.ts

# Chercher un mot-clé métier dans les commits
git log --all --grep="liste d'attente" -i

# Date de création d'un fichier
git log --diff-filter=A --follow --format="%ad" -- chemin/du/fichier.ts | tail -1

# Compter les occurrences d'un terme dans le code (repérer l'ampleur d'un concept)
rg -c "creneau" --stats

# Trouver tous les appelants directs d'une fonction avant de la modifier
rg -n "slotWindow" --type ts
rg -n "from ['\"].*slotWindow" --type ts
```

## Les 4 familles de contraintes cachées

```text
Legale / reglementaire  -> dates en dur, versions paralleles jamais fusionnees, delais courts
Contractuelle / client  -> identifiants clients en dur, branches conditionnelles nommees
Performance / charge    -> denormalisation, caches, champs dupliques, commentaires d'incident
Equipe / historique     -> duplication entre zones jamais synchronisees, code "v2" abandonne
```

## Les 4 questions de reconstruction

```text
1. Quand a-t-il ete ecrit ?
2. Quel probleme resolvait-il alors (pas aujourd'hui) ?
3. Quelle contrainte externe l'a faconnee ?
4. Cette contrainte existe-t-elle encore ?
   -> Active     : garder, isoler proprement
   -> Disparue   : dette reelle, preuve ecrite avant suppression
   -> Inconnue   : traiter comme actif, proteger par un test avant de toucher
```

## Les 5 branches du rayon d'impact

```text
1. Appelants directs      -> cassent tout de suite, bruyamment
2. Appelants indirects     -> cassent via une chaine d'appels, plus dur a tracer
3. Tests existants         -> verrouillent (bien ou mal) un comportement attendu
4. Donnees deja ecrites    -> cassent en silence, decouvertes des semaines plus tard
5. Consommateurs externes  -> API publique, export, job planifie, rapport
```

## Checklist avant de proposer une suppression ou une réécriture

```text
[ ] J'ai cherché le commit d'origine du code visé.
[ ] J'ai cherché les tickets ou PR liés au message de commit.
[ ] J'ai vérifié si un client ou un cas identifié en dur est encore actif.
[ ] J'ai écrit un test de caractérisation si je ne suis pas sûr du comportement actuel.
[ ] J'ai posé la question à quelqu'un de l'équipe en place, si disponible, avant de conclure.
```

## Checklist avant de livrer une modification sur du code étranger

```text
[ ] J'ai listé tous les appelants directs trouvés par une recherche exécutée, pas devinée.
[ ] J'ai vérifié ce que chaque appelant attend, pas seulement qu'il existe.
[ ] J'ai un test de caractérisation du comportement actuel avant de le changer.
[ ] Mon patch ne mélange pas correction et nettoyage.
[ ] J'ai vérifié si des données déjà écrites deviennent incohérentes avec mon changement.
[ ] J'ai fait tourner la suite de tests de la zone touchée avant et après mon patch.
```

## Phrases à bannir en réunion tant que tu n'as pas vérifié

- "C'est clairement du code mort."
- "Ça n'a aucun sens, on peut le supprimer."
- "C'est juste mal fait."

## Phrases qui remplacent les précédentes

- "Je n'ai pas encore trouvé pourquoi ce code existe, je vérifie avant de proposer quoi que
  ce soit."
- "Ce design semble répondre à [contrainte hypothèse], je le confirme avec [action précise]."
- "Voici ce que j'ai vérifié, voici ce qui reste une hypothèse."

## Budget de temps type pour une enquête de 3 heures

```text
30 min  cartographie
45 min  flux de bout en bout
45 min  zones a risque
45 min  historique cible
15 min  synthese ecrite
```

## Si tu rates le boss-fight

Relis la leçon sur la reconstruction de contraintes et celle sur le rayon d'impact avant de
retenter. Refais l'exercice en écrivant d'abord les quatre questions de reconstruction pour
chaque branche de code suspecte, avant toute recommandation. Donne-toi 48 heures, pas plus.
Si le score reste sous 78/100, ou si le traitement de l'absence de preuve reste sous 20/25,
remonte au niveau amont sur la distinction entre hypothèse et certitude avant de revenir ici.
