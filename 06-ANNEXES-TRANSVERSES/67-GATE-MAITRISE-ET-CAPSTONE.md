---
stability: evolutif
acte: evaluer
noyau: oui
route: formation-complete
---

# 67 : Gate de maîtrise et capstone : ce que le projet doit prouver

Ce document unifie les critères de sortie des modules, des mini-projets et du fil rouge. Il évite deux erreurs : confondre un grand dépôt avec une compétence acquise, et laisser un bon score moyen masquer un défaut critique.

## 1. Les quatre états d'un apprentissage

| État                        | Signification                                                                                      | Ce qui est autorisé                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `COMPRIS`                   | Le mécanisme peut être expliqué et prédit sur l'exemple étudié                                     | Passer à une première pratique, pas annoncer la maîtrise |
| `PRATIQUE`                  | Une solution fonctionne sur l'exercice entraîné                                                    | Tenter un exercice indépendant                           |
| `MAITRISE_DANS_LE_CONTEXTE` | Tests/mesures et explication montrent une solution correcte dans le contexte défini                | Utiliser la compétence dans les limites documentées      |
| `TRANSFERT_VERIFIE`         | La compétence est appliquée avec succès à un contexte nouveau où au moins deux dimensions changent | Citer la preuve de transfert et sa portée exacte         |

Une revue externe peut ensuite ajouter un statut de revue, mais elle n'est pas simulée par une auto-évaluation. Les statuts décrivent une preuve disponible, pas une identité professionnelle.

## 2. Dossier obligatoire pour une compétence critique

Le dossier contient les éléments suivants, adaptés au domaine :

1. objectif et prérequis explicites ;
2. prédiction datée avant l'expérience ;
3. solution produite par l'apprenant ;
4. cas nominal, cas limite et cas négatif ;
5. test ou mesure reproductible ;
6. exemple défectueux qui échoue ;
7. correction et résultat après correction ;
8. limites de la preuve et hypothèses non testées ;
9. transfert avec au moins deux dimensions modifiées ;
10. défense orale/écrite de la décision et meilleur argument contre ;
11. rappel différé, avec date et résultat ;
12. artefact versionné, contexte et environnement utilisés.

Une réponse d'IA, un tutoriel suivi ou un test copié ne remplace pas les artefacts indépendants. Ils peuvent servir d'aide s'ils sont déclarés, critiqués et suivis d'une reproduction autonome.

## 3. Barème commun de 100 points

| Dimension                         | Points | Preuve recherchée                                                                             |
| --------------------------------- | -----: | --------------------------------------------------------------------------------------------- |
| Exactitude technique              |     20 | Le comportement est correct dans le périmètre annoncé ; invariants et limites sont précis     |
| Qualité des tests et des mesures  |     15 | Les tests détectent une faute réelle ; les mesures ont une méthode et une portée claires      |
| Robustesse et cas limites         |     15 | Une hypothèse est cassée volontairement, puis le système réagit selon le contrat              |
| Sécurité et confidentialité       |     15 | Autorisation aux frontières, tests négatifs et contrôle des données dérivées selon le domaine |
| Conception et arbitrages          |     10 | Deux options plausibles, coût, risque, alternative et condition de révision                   |
| Exploitabilité et récupération    |     10 | Logs/metrics adaptés, comportement dégradé, reprise ou rollback selon le projet               |
| Transfert et autonomie            |     10 | Variante nouvelle, au moins deux dimensions modifiées, peu ou pas d'indices                   |
| Communication et reproductibilité |      5 | Un tiers peut comprendre le livrable, reproduire le résultat et identifier les limites        |

### Règles non compensatoires

Le score total ne suffit pas à valider un projet. Les conditions suivantes bloquent la réussite même si la somme dépasse 80/100 :

- défaut critique de sécurité/confidentialité non traité ;
- invariant de correction violé sans détection ;
- test ou mesure annoncés mais non reproductibles ;
- effet externe dupliqué ou perdu alors que le contrat promet le contraire ;
- aucun transfert autonome ;
- résultats présentés comme preuve universelle au-delà du scénario testé ;
- contribution de l'apprenant impossible à distinguer d'une sortie copiée ou générée sans vérification.

Les dimensions critiques sont définies avant la correction ; par défaut, il s’agit de l’exactitude, des tests/mesures, de la robustesse et du transfert, plus la sécurité dès que des données ou permissions sont en jeu et l’exploitabilité dès que le projet prétend être opérable. Les autres dimensions doivent atteindre au moins 2/4. Pour réussir le gate pédagogique : **au moins 80/100, au moins 3/4 à chaque dimension critique de la grille locale et aucune condition non compensatoire**. Ce seuil est un repère de formation, pas une certification industrielle ou un grade de carrière.

## 4. Déroulé du capstone

### F0 : Contrat et domaine

Écrire les utilisateurs, objectifs, non-objectifs, données, invariants, menaces et critères d'acceptation. Séparer les besoins confirmés des hypothèses.

**Gate :** un lecteur peut proposer un test qui fait échouer une implémentation incorrecte.

### F1 : Noyau correct

Construire le plus petit flux métier utile avec une fonction de domaine ou un module. Ajouter tests nominaux, négatifs et de limite.

**Gate :** comportement expliqué et cas défectueux reproduit avant le correctif.

### F2 : Contrat et persistance

Ajouter la frontière de service, la persistance si nécessaire, la gestion d'erreurs et un contrat de compatibilité.

**Gate :** les invariants sont conservés après lecture/écriture, et la migration ne suppose pas une bascule instantanée de toutes les versions.

### F3 : Concurrence et panne

Choisir une panne pertinente : duplicat, timeout, course, indisponibilité d'une dépendance ou événement répété. Définir le comportement acceptable.

**Gate :** le scénario est reproductible ; la preuve porte sur les effets finaux, pas seulement les codes HTTP.

### F4 : Sécurité et vie privée

Écrire le modèle de menace, les autorisations nécessaires et les tests négatifs. Tracer où vont les données, y compris logs, cache et composants IA éventuels.

**Gate :** aucun accès interdit dans les scénarios couverts ; les limites hors scénario sont explicites.

### F5 : Exploitation et changement

Versionner l'artefact, suivre les signaux utiles, planifier rollback/restauration et tester un changement qui traverse une frontière.

**Gate :** mesurer un résultat avant/après et démontrer une récupération ou dire précisément pourquoi elle n'a pas été testée.

### F6 : Transfert et défense

Une personne ou un évaluateur choisit une contrainte différente après la première solution : coût, volume, organisation, environnement, protocole ou modèle de panne. L'apprenant prédit, adapte, teste et explique.

**Gate :** la solution évolue quand une hypothèse change ; le dossier identifie ce qui reste invariant et ce qui doit être adapté.

## 5. Grille de correction à quatre niveaux

- **0 : Absent/incorrect :** aucune preuve, solution incorrecte ou explication contradictoire.
- **1 : Guidé :** fonctionne seulement avec la recette ou l'aide étroite ; limites largement inconnues.
- **2 : Autonome dans l'exercice :** correct sur le cas entraîné, avec test et explication partielle.
- **3 : Robuste dans le contexte :** cas limites et hypothèses testés, décision défendable et limites documentées.
- **4 : Transférable :** même qualité de raisonnement dans une variante réellement nouvelle, avec révision explicite des hypothèses.

Une note 4 nécessite une preuve de transfert distincte. La formulation ou la longueur du rapport n'est pas une preuve de maîtrise.

## 6. Rappel différé

À une date choisie après l'exercice, l'apprenant reçoit une question sans notes, puis une variante. Le résultat est noté : mécanisme restitué, prédiction correcte, résolution autonome et besoin d'indices. Une compétence oubliée retourne à `PRATIQUE` ou `COMPRIS` ; elle n'est pas conservée comme maîtrisée par ancienneté.

## 7. Ce que le diplôme AF peut et ne peut pas signifier

Un portfolio AF peut montrer que son auteur a produit certains artefacts dans des contextes datés et qu'il a réussi des exercices de transfert. Il ne prouve pas automatiquement une expérience de production réelle, un impact à l'échelle d'une organisation ou la portée d'un Distinguished Engineer. Les preuves réelles, collaboratives et externes doivent porter leurs propres étiquettes.

## Liens de travail

- [58 : Route apprenant cohérente](58-ROUTE-APPRENANT-COHERENTE.md)
- [62 : Fiche apprentissage / preuve](62-FICHE-APPRENTISSAGE-PREUVE.md)
- [27 : Matrice des preuves CORE](27-MATRICE-PREUVES-CORE.md)
- [61 : Exercices systèmes et arbitrages](61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md)
