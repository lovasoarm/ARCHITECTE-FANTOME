---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Challenge : `01-DATABASES`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [Exercice 10 : requêtes paramétrées et injection SQL](10-EXO-VERIFICATION.md)

- [50-data_modeling_minimini_projet.md](50-data_modeling_minimini_projet.md)
- [EXO LECTURE : ~20 minutes : un cycle (Databases)](07-EXO_LECTURE.md)
- [Exercice 09 : analyser le risque de suppression multi-tenant](09-EXO-VERIFICATION.md) : identifier la portée, les risques et les contrôles métier.
- [Exercice 97 : laboratoire PostgreSQL transactionnel](97-EXO-VERIFICATION.md) : exécuter, vérifier et annuler une purge contrôlée.

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

## Validation spécifique des opérations destructives

Le challenge n’est validé que si les deux compétences sont démontrées séparément :

- **Analyse :** l’apprenant identifie précisément l’ensemble des lignes et des tenants touchés, les effets indirects et les obligations de récupération.
- **Exécution :** l’apprenant réalise le laboratoire PostgreSQL, prouve le rollback avant commit, contrôle le nombre de lignes et démontre qu’un autre tenant n’est pas affecté.

Un simple ajout de `WHERE` ne suffit pas. Le correcteur vérifie aussi la provenance du tenant, le critère métier, les privilèges, l’audit et la restauration après commit.

## Barème autonome : Databases (20 points)

- **Modèle relationnel (4 pts)** : clés, contraintes, cardinalités et anomalies de modification justifiés.
- **SQL sûr (4 pts)** : requêtes paramétrées, portée tenant et opérations destructives vérifiées avant exécution.
- **Transactions (4 pts)** : isolation, verrouillage, commit/rollback et restauration après commit distingués.
- **Performance (4 pts)** : index et plans d'exécution reliés à une requête représentative, sans sur-indexation aveugle.
- **Choix de stockage (4 pts)** : relationnel, document, cache et cluster comparés à partir des invariants métier.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : exécuter une suppression non bornée ou considérer un rollback après commit comme une restauration.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.

## Vérification papier / exécution PostgreSQL

La conception peut être évaluée sur papier à partir du schéma, des requêtes, des plans attendus, des transactions et des stratégies de sauvegarde/restauration. Les tests destructifs ne doivent être exécutés que sur une base jetable avec données déterministes. Le présent environnement ne dispose pas de `psql` : les requêtes sont donc documentées et confrontées à la syntaxe officielle, mais aucune exécution PostgreSQL n'est certifiée ici.
