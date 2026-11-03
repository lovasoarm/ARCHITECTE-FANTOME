---
stability: evolutif
acte: evaluer
noyau: oui
route: formation-complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 67 : Gate de maîtrise et capstone : ce que le projet doit prouver

Ce document unifie les critères de sortie des modules, des mini-projets et du fil rouge. Il évite deux erreurs : confondre un grand dépôt avec une compétence acquise, et laisser un bon score moyen masquer un défaut critique.

## Mode d'emploi selon la Route 58 : ne pas anticiper le capstone

Ce document rassemble des repères communs et le déroulé complet du capstone. **Sa présence dans une étape de la route ne demande jamais de réaliser tout le document à ce moment-là.**

| Moment de la Route 58              | Repère autorisé à ce moment                                                                                                                                                                                                                     | Ce qui n'est pas demandé                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Étape 3 : Tests et changement sûr  | Utiliser uniquement le **repère minimal de test** ci-dessous : invariant testé, cas nominal/limite pertinent, résultat attendu, résultat observé et verdict. La section 1 sert seulement à nommer honnêtement l'état (`COMPRIS` ou `PRATIQUE`). | Ni dossier complet de la section 2, ni barème 100 points de la section 3, ni revue système, ni F0–F6, ni capstone.         |
| Étape 7 : Exploitabilité et DevOps | Utiliser le même repère minimal pour une seule preuve d'exploitation pertinente : signal, seuil, comportement attendu, récupération observée et limite.                                                                                         | Ni dossier complet de la section 2, ni barème 100 points de la section 3, ni capstone ; une simulation reste `SIMULATION`. |
| Étape 12 : Capstone                | Utiliser le dossier intégré complet, les critères non compensatoires, le barème et le déroulé F0–F6.                                                                                                                                            | Ne pas présenter une simulation comme production ni une auto-évaluation comme revue externe.                               |

### Repère minimal de preuve : étapes 3 et 7 uniquement

Pour une activité locale, une fiche courte suffit. À l’étape 3, elle porte sur le test ; à l’étape 7, elle porte sur le signal et la récupération :

1. **Invariant ou comportement visé :** une phrase qui décrit ce qui doit rester vrai.
2. **Scénario et mesure :** à l’étape 3, une entrée nominale et, si pertinente, une entrée limite ou dégradée ; à l’étape 7, un signal, un seuil et un scénario de panne/récupération pertinent.
3. **Résultat attendu :** écrit avant l'exécution.
4. **Résultat observé :** sortie, trace ou mesure réellement obtenue ; `NOT RUN` si rien n'a été exécuté.
5. **Verdict et limite :** `PASS` seulement si l'observation correspond au critère ; préciser ce que cet essai ne démontre pas.

Cette fiche ne constitue ni un dossier de maîtrise complet ni un score. Elle ne demande pas les 12 pièces listées en section 2 et n'ouvre pas les évaluations intégrées de section 3. La section 2 et le barème de la section 3 sont réservés aux gates de maîtrise intégrées et au capstone, sauf si une évaluation de module annonce explicitement un sous-ensemble adapté.

L'étape 3 ne valide pas par avance les compétences des étapes 4 à 12. L'étape 7 ne déclenche pas le capstone. Le capstone complet appartient à l'étape 12, après ses prérequis. Un apprenant peut consulter les définitions sans s'attribuer un statut ni ouvrir une gate. **Aucun passage vers Fundamentals ou une étape antérieure n'est conditionné par ce document.**

## 1. Les quatre états d'un apprentissage

| État                        | Signification                                                                                      | Ce qui est autorisé                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `COMPRIS`                   | Le mécanisme peut être expliqué et prédit sur l'exemple étudié                                     | Passer à une première pratique, pas annoncer la maîtrise |
| `PRATIQUE`                  | Une solution fonctionne sur l'exercice entraîné                                                    | Tenter un exercice indépendant                           |
| `MAITRISE_DANS_LE_CONTEXTE` | Tests/mesures et explication montrent une solution correcte dans le contexte défini                | Utiliser la compétence dans les limites documentées      |
| `TRANSFERT_VERIFIE`         | La compétence est appliquée avec succès à un contexte nouveau où au moins deux dimensions changent | Citer la preuve de transfert et sa portée exacte         |

Une revue externe peut ensuite ajouter un statut de revue, mais elle n'est pas simulée par une auto-évaluation. Les statuts décrivent une preuve disponible, pas une identité professionnelle.

**Application aux exercices V6.5 :** les 26 pages recensées dans [85 : Statut et retours des 26 exercices](85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md) sont des entraînements non certifiants et ne ferment jamais, à elles seules, une gate. Les 25 drills de code reposent sur un contrat et un vérificateur écrits par le même apprenant ; l’exercice de cadrage est autoévalué. Ils peuvent alimenter un dossier de pratique, mais ne valent ni corrigé indépendant ni preuve de transfert. Le [protocole de retour fiable](85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) permet une revue humaine indépendante ou, lorsqu’aucun reviewer n’est disponible, un auto-retour explicitement non indépendant. `REVIEWED` n’est consigné que pour une revue humaine réellement effectuée. Ne pas imposer une revue externe à la simple réalisation pédagogique de ces exercices.

## 2. Dossier de maîtrise complet pour une compétence critique

Le dossier complet ci-dessous s’applique aux gates de maîtrise intégrées et au capstone, ou à un checkpoint qui l’exige explicitement. Une leçon ou un exercice local ne doit reprendre que les éléments pertinents annoncés à l’avance. Il contient, selon le domaine :

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
