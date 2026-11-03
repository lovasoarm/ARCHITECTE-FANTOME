---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Table de hachage : recherche moyenne proche de O(1)

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Chercher un projet par slug dans un tableau coûte O(n) dans le cas général. Une `Map` offre un accès moyen sublinéaire ; on utilise souvent O(1) moyen comme modèle pratique pour une table de hachage, mais ECMAScript ne garantit ni cette complexité stricte ni cette implémentation (le module dédié à la complexité précise ce raisonnement).

## OBJECTIF

Ta recherche par slug est directe.

## APPLICATION

- Construis une `Map` slug → projet une seule fois au niveau module.
- Réécris `getProjectBySlug` pour l'utiliser.
- Vérifie qu'une clé absente renvoie bien le cas « introuvable » traité au module 5.

## Critère de réussite

- [ ] Construis une `Map` slug → projet une seule fois au niveau module.
- [ ] Réécris `getProjectBySlug` pour l'utiliser.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Sur six projets le gain de performance est nul : quelle est alors la vraie raison d'utiliser une `Map` ici ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta recherche par slug est directe.

Le code exprime maintenant « index par slug » au lieu de « parcours du tableau ». Commit.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

## Livraison produit obligatoire : Kintana : Mesurer avant d’optimiser

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-hash_table_basics_minimini_projet » :** Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le protocole indique machine, volume, concurrence et répétitions ; tu présentes p50/p95 ou mémoire ; tu expliques le coût secondaire et refuses toute extrapolation non justifiée. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
