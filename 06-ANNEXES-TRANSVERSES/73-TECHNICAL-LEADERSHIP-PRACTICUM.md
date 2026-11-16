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

<!-- AF-LEADERSHIP-SIMULATION-GATE -->

<a id="leadership-simulation-gate--kintana--décision-technique-transverse"></a>

## Leadership Simulation Gate : Kintana : décision technique transverse

Cette épreuve est **autonome et réalisable en solo**. L'apprenant conduit une équipe fictive dont les rôles, intérêts et informations sont fournis ci-dessous. Elle évalue le raisonnement de leadership en simulation ; elle ne remplace ni le feedback d'une vraie équipe, ni l'adoption professionnelle, ni une preuve Staff/Principal/Distinguished sur le terrain.

### Situation initiale

Kintana doit lancer une réservation avec paiement différé. Le produit demande une livraison en deux semaines. Le système actuel est un monolithe avec PostgreSQL, une API et un worker. Une hausse de trafic est attendue lors d'une campagne régionale. Le budget n'autorise pas une refonte complète. Les réservations doivent rester traçables et les paiements ne peuvent pas être dupliqués.

### Les cinq rôles fictifs

| Rôle               | Priorité déclarée                        | Contrainte non négociable                                                          | Angle de désaccord possible                                                |
| ------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Product Owner      | Livrer à la date promise                 | Une réservation doit rester compréhensible côté utilisateur                        | Refuse une refonte qui décale la release sans réduire le risque mesuré     |
| Backend Engineer   | Garder une conception simple             | Pas de duplication de logique métier ni de dette irréversible                      | Préfère un traitement transactionnel dans le service existant              |
| Platform Engineer  | Préserver fiabilité et exploitabilité    | Charge bornée, observabilité, rollback et capacité de reprise                      | S'oppose à une file ou un service supplémentaire sans owner/runbook        |
| Security Engineer  | Protéger données et frontières tenant    | Autorisation côté serveur, secrets hors code, idempotence des opérations sensibles | Bloque un raccourci qui mélange statut de réservation et paiement confirmé |
| Responsable métier | Préserver la continuité des réservations | Les dossiers ne doivent pas disparaître ; les clients doivent être informés        | Refuse un mode dégradé qui masque les réservations en attente              |

Ces acteurs sont des personnages de simulation. Ne leur attribue pas de feedback réel.

### Révélations progressives

Lis une carte à la fois ; rédige ta décision avant d'ouvrir la suivante.

1. **Carte A : brief :** date fixe dans deux semaines ; charge attendue multipliée par trois pendant 30 minutes ; le système actuel tient la charge nominale mais aucune mesure de pic récente n'est fournie.
2. **Carte B : objection backend :** « une file séparée ajoute des retries, de l'ordre et un nouveau mode d'échec ; pourquoi ne pas garder le flux transactionnel et borner le traitement ? »
3. **Carte C : objection plateforme :** « le worker actuel n'a ni limite de concurrence explicite ni alerte sur l'âge du plus vieux travail ; un broker ne résout pas l'absence de runbook. »
4. **Carte D : objection sécurité :** « si un message est rejoué, comment garantis-tu l'idempotence par tenant et l'absence de double paiement ? »
5. **Carte E : contrainte métier inconnue :** 15 % des clients ont une connexion instable ; le client peut renvoyer la même demande après timeout. La réponse API peut être perdue alors que l'opération a été créée.
6. **Carte F : incident pendant le travail :** une intégration paiement ralentit ; la file augmente ; le produit veut maintenir la date. Tu dois décider ce qui est suspendu, dégradé ou conservé et nommer les responsables.
7. **Carte G : transfert :** un nouvel ingénieur reprend demain ; il ne connaît pas tes hypothèses ni les risques acceptés.

### Les sept épreuves obligatoires

1. **Cadrage collectif.** Produis `PROBLEM-BRIEF.md` et `STAKEHOLDER-MAP.md` : problème commun, objectifs métier, contraintes techniques, acteurs, inconnues, non-objectifs, critères de réussite et décisions à différer.
2. **Négociation architecturale.** Produis `RFC.md` et `ADR-INITIAL.md`. Compare la solution retenue, deux alternatives crédibles et le statu quo. Chiffre ce qui peut l'être, indique les hypothèses et les coûts opérationnels.
3. **Désaccord et révision.** Produis `OBJECTION-LOG.md` et `ADR-REVISED.md`. Classe chaque objection (risque, inconnue, conflit d'objectifs ou coordination). Réponds avec une preuve, une expérience de vérification ou une révision explicite.
4. **Gestion de crise.** Produis `INCIDENT-COMMUNICATION.md` : impact, faits confirmés, inconnues, priorité, décideur, responsables, actions réversibles, message utilisateurs et critères de retour à la normale.
5. **Délégation.** Produis `DELEGATION-PLAN.md` avec pour chaque tâche : responsable fictif, résultat, dépendances, critères d'acceptation, définition de terminé, risque et condition de transfert.
6. **Mentorat.** Dans `MENTORING-REVIEW.md`, analyse cette PR fictive :

   ```js
   async function confirmReservation(repo, payment, tenantId, request) {
     const reservation = await repo.find(request.reservationId);
     if (reservation.status === "PENDING_PAYMENT") {
       await payment.charge(request.amount);
       await repo.update(reservation.id, { status: "CONFIRMED", tenantId });
       return true;
     }
     return false;
   }
   ```

   Identifie au minimum : absence de contrôle explicite de l'appartenance au tenant avant lecture/modification, absence de clé d'idempotence transmise au prestataire, risque de double charge après timeout/rejeu, absence de gestion des erreurs et absence de vérification d'invariant après paiement. Rédige des commentaires qui posent des questions et guident le développeur ; ne fournis pas seulement un patch final. Propose une seconde version fictive et explique ce qu'elle corrige sans prétendre l'avoir exécutée.

7. **Transmission et continuité.** Produis `HANDOVER.md` et `RETROSPECTIVE.md` : architecture retenue, décisions, responsabilités, runbook, risques résiduels, seuils d'alerte, conditions de rollback, questions ouvertes et prochaines décisions. Un ingénieur fictif doit pouvoir reprendre sans dépendre de toi.

### Livrables canoniques

```text
LEADERSHIP-PRACTICUM/
├── PROBLEM-BRIEF.md
├── STAKEHOLDER-MAP.md
├── RFC.md
├── ADR-INITIAL.md
├── OBJECTION-LOG.md
├── ADR-REVISED.md
├── INCIDENT-COMMUNICATION.md
├── DELEGATION-PLAN.md
├── MENTORING-REVIEW.md
├── HANDOVER.md
└── RETROSPECTIVE.md
```

Ces fichiers sont des livrables de l'apprenant, pas des preuves préremplies. Étiquette le dossier `SIMULATION`. N'ajoute pas de prétendu retour d'équipe ou d'adoption.

### Barème reproductible : 100 points

| Domaine                                  |  Points | Ce qui est évalué                                                             |
| ---------------------------------------- | ------: | ----------------------------------------------------------------------------- |
| Cadrage et compréhension collective      |      15 | Problème commun, objectifs, contraintes, inconnues et critères mesurables     |
| Décisions et arbitrages techniques       |      20 | Options, statu quo, coûts, risques, réversibilité et justification            |
| Gestion des objections et désaccords     |      15 | Reformulation loyale, classification, preuve, révision ou refus argumenté     |
| Communication adaptée aux interlocuteurs |      15 | Messages cohérents selon produit, ingénierie, plateforme, sécurité et métier  |
| Délégation et organisation               |      15 | Owners, dépendances, résultats et critères de fin vérifiables                 |
| Mentorat et transmission                 |      10 | Feedback actionnable, progression du raisonnement et passation compréhensible |
| Révision et continuité                   |      10 | Intégration de l'incident, limites, risques et actions de suivi               |
| **Total**                                | **100** |                                                                               |

Attribue pour chaque domaine : 0 % si absent/faux, 25 % si très incomplet, 50 % si partiel, 75 % si solide avec une lacune, 100 % si complet et traçable. Un niveau intermédiaire entre deux paliers est permis si la preuve est expliquée ; conserve le calcul dans le rapport.

**Seuil : 80/100 minimum**, avec au moins 9/15 en communication, 12/20 en arbitrage et 6/10 en transmission.

### Échecs éliminatoires

- Ignorer volontairement une objection techniquement fondée sans l'examiner.
- Dissimuler un risque connu ou présenter une hypothèse comme un fait.
- Déléguer sans responsable, résultat attendu et critère d'acceptation.
- Être incapable d'expliquer pourquoi une décision est retenue plutôt qu'une alternative.
- Produire une passation qui masque les limites, les risques ou les actions encore ouvertes.
- Inventer une adoption, un avis d'équipe, une exécution ou un résultat de production.

### Statut de preuve

`SIMULATION` valide l'entraînement au gate. `PILOT` ou `PRODUCTION` exige des éléments réellement observés, consentis et datés. L'adoption externe reste une preuve ultérieure ; elle n'est pas nécessaire pour passer ce Leadership Simulation Gate.
