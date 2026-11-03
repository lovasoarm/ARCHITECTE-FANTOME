---
stability: evolutif
acte: pratiquer-le-leadership-technique
noyau: oui
route: formation-complete
niveau: E-H
last_reviewed: 2026-10-30
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 73 : Technical Leadership Practicum : décider, influencer, transmettre

## But

Le leadership technique n'est ni un titre, ni une réunion, ni la personne qui parle le plus fort. Il consiste à améliorer la qualité des décisions et la capacité collective à livrer, exploiter et faire évoluer des systèmes.

Ce module complète `TEAM-CRAFT`, `LEADERSHIP-MENTORAT` et le dossier Staff. Il rend les compétences observables à travers quatre situations difficiles.

## Drill 1 : Comité d'architecture contradictoire

**Contexte :** trois équipes proposent trois solutions pour absorber une croissance de trafic : augmenter la capacité de la base, ajouter un broker, ou extraire un service de traitement.

**Travail :**

1. Écris les exigences fonctionnelles et les contraintes mesurables.
2. Identifie les inconnues et collecte les mesures qui pourraient changer la décision.
3. Compare au moins trois options, dont « ne pas changer l'architecture ».
4. Rédige un ADR ; liste les conséquences opérationnelles et organisationnelles.
5. Demande à un contradicteur de produire le meilleur argument contre ta décision.
6. Mets à jour l'ADR si une hypothèse tombe.

**Preuve :** ADR avant/après, avis contradictoire, hypothèse invalidée et critère de réexamen.

## Drill 2 : Incident avec perte d'information

**Contexte :** un consommateur de messages ralentit. Les offsets avancent, le dashboard affiche des données incomplètes et l'équipe métier demande une heure de retour à la normale.

**Travail :** rédige un journal de commandement d'incident : gravité, impact, responsable, canal, faits confirmés, hypothèses, actions réversibles, décision de couper ou dégrader, communication, récupération et vérification d'intégrité.

**Preuve :** chronologie horodatée, hypothèses falsifiées, décisions et post-mortem sans blâme. La reprise apparente du trafic ne suffit pas : rapproche le nombre d'événements source et destination.

## Drill 3 : Arbitrage roadmap / dette / budget

**Contexte :** une direction réduit le budget de 25 % tout en maintenant la date de livraison. Deux fonctionnalités sont promises, mais un composant fragile absorbe déjà une part importante des incidents.

**Travail :** compare livrer les deux fonctions, réduire le périmètre, investir dans la fiabilité ou retarder la sortie. Chiffre les coûts et les risques connus ; sépare les estimations des faits ; nomme les conséquences pour les utilisateurs et les équipes.

**Preuve :** note d'arbitrage d'une page, options rejetées, risque accepté, signal de réexamen et plan de communication.

## Drill 4 : Mentorat qui rend autonome

**Contexte :** une personne junior propose une solution qui contredit l'option retenue par l'équipe. Son raisonnement révèle une contrainte oubliée.

**Travail :** construis une revue formative : demande son modèle mental, reformule sans caricature, teste son hypothèse, reconnais les éléments corrects, explique les risques restants et donne une tâche qui augmente son autonomie.

**Preuve :** feedback daté, progression observable, retour de la personne accompagnée et trace d'une amélioration du standard d'équipe. Ne publie pas de données personnelles sans consentement.

## Évaluation

| Dimension     | Échec                  | Maîtrise dans le contexte                       | Preuve avancée                                   |
| ------------- | ---------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Décision      | préférence ou autorité | critères, options, risques, réversibilité       | décision revue après résultat mesuré             |
| Communication | jargon ou omission     | message adapté au public sans changer les faits | désaccord résolu sans supprimer la contradiction |
| Influence     | dépendance à l'auteur  | autre équipe comprend et adopte                 | adoption durable avec indicateurs                |
| Mentorat      | donner la réponse      | développe le raisonnement et autonomie          | progression confirmée par feedback longitudinal  |
| Ownership     | réparer le symptôme    | suit incident, action et effet                  | amélioration réutilisée par plusieurs équipes    |

## Gate Staff / Principal / Distinguished

- **Staff :** tu améliores les décisions et la livraison d'une équipe ou d'un domaine technique, avec preuves d'exécution et de suivi.
- **Principal :** tu influences plusieurs domaines/systèmes, coordonnes des migrations et rends cohérents des arbitrages qui dépassent une équipe.
- **Distinguished :** tu fais évoluer des standards ou capacités à une échelle organisationnelle ou écosystème, avec adoption indépendante et impact longitudinal.

Un exercice simulé peut entraîner le jugement ; il ne remplace jamais la preuve d'influence réelle. L'auto-évaluation ne remplace pas le feedback des personnes impactées.

## Portfolio de leadership

Conserve au minimum : trois ADR contradictoires, un RFC, un post-mortem, une note coût/risque/valeur, une revue de code formatrice, un exemple de décision révisée, une preuve d'adoption par un tiers et un journal de suivi des effets. Anonymise les éléments confidentiels.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Du problème à l’adoption

```text
initiative à impact
       |
       v
acteurs + contraintes
       |
       v
options et compromis
       |
       v
responsable + décision
       |
       v
adoption observée
       |
       v
résultat et révision
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **73 : Technical Leadership Practicum : décider, influencer, transmettre** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Conduire une décision technique de bout en bout

**Mission liée à « 73 : Technical Leadership Practicum : décider, influencer, transmettre » :** Sélectionne une initiative Kintana qui requiert influence, arbitrage, transfert et suivi. Établis un état initial, fais une recommandation, recueille les objections et définis comment observer le résultat.

**Livrable :** Dossier d’initiative avec diagnostic, ADR/RFC si utile, plan d’adoption et bilan à compléter après observation.

**Critères d’acceptation :** Les preuves réelles et les simulations sont séparées ; l’impact n’est pas revendiqué avant mesure ; les responsabilités et seuils de révision existent.

**Transfert obligatoire :** Une équipe refuse l’initiative : distingue le désaccord rationnel du blocage de coordination et adapte la séquence.
