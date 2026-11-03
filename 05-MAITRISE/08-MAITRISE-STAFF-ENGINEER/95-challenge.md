---

stability: "intemporel"
acte: maitrise
noyau: oui
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "PREUVES-STAFF-ENGINEER.md"
source_scope: "Référentiel interne des preuves Staff Engineer utilisé pour cadrer le challenge ; il ne constitue pas une certification externe."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---
> **SCÈNE CRAZYDEVS : Boss final :** ton architecture est plausible, ton budget est joli et ton agent IA applaudit. Puis un junior te montre une contrainte que tu n’avais pas vue. Le niveau Staff commence là.

# Challenge : assembler et défendre le dossier unique

Temps de lecture : 5 à 7 min. Travail : 6 à 10 h réparties sur plusieurs sessions.

Ce challenge transforme les preuves construites pendant le parcours en un dossier qu'un jury peut lire sans toi, puis contester. Il ne certifie pas un niveau Staff : il vérifie si tes décisions sont traçables, mesurées, transférables et révisables.

## 1. Livrable attendu

Crée `PREUVES/DOSSIER-UNIQUE.md`, de 10 à 14 pages maximum, à partir du [plan de référence](02-dossier_unique.md). Les dix sections doivent être présentes :

1. problème et impact utilisateur ;
2. découpage et frontières ;
3. coût et hypothèses ;
4. fiabilité (SLI, SLO, budget d'erreur, RPO/RTO) ;
5. arbitrage et options rejetées ;
6. note destinée à la direction, sans jargon inutile ;
7. livraison, exploitation et récupération ;
8. trois tensions chiffrées des deux côtés ;
9. transfert vers un autre langage ou fournisseur ;
10. transformation décisionnelle : croyance initiale, signal contradictoire, changement éventuel, biais et compensation.

Chaque section contient au moins une affirmation vérifiable, un chiffre daté avec sa méthode, et un lien relatif vers un artefact existant. Si une donnée n'existe pas, écris `NON MESURÉ`, précise pourquoi, puis propose une mesure réalisable. N'invente jamais une métrique pour remplir une case.

## 2. Pièces obligatoires

- Lier les six familles S1–S6 et la preuve de transfert S7 décrites dans [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).
- Joindre le contrôle transversal G8 `PREUVES/EVALUATION-IA.md`, même si le système ne contient pas de brique IA ; dans ce cas, justifier explicitement pourquoi le risque IA est absent ou hors périmètre.
- Joindre `STANDARDS-AGENTS.md` uniquement si le système utilise des agents ou automatisations autonomes qui prennent ou exécutent des décisions/actions. Si aucun n’est utilisé, `EVALUATION-IA.md` documente le non-usage, son périmètre et les contrôles conservés. Un assistant sous validation humaine directe ne déclenche pas automatiquement cette pièce.
- Joindre `PREUVES/IA-EN-PROD.md` uniquement si une brique IA est réellement en production.
- Annexer `04-BELIEF-CHANGE-LOG.md`, `05-BIAS-LOG.md`, `BAD-NEWS-UPWARD` et au moins deux épreuves de `05-PSYCHOLOGIE-DECISION/`.
- Inclure une date de revisite et le fichier `04-revisite_datee.md`.

Ne coche pas une pièce inexistante. Si un nom ou chemin varie dans ton dépôt, donne le chemin réel et vérifie qu'il ouvre bien le bon artefact.

## 3. Les trois tensions

Pour chaque tension, indique les deux objectifs qui se contredisent, leurs unités, la période et la source. Par exemple :

| Tension | Côté A | Côté B | Arbitrage attendu |
|---|---:|---:|---|
| Délai / fiabilité | temps de livraison médian | taux d'échec de release | quel risque accepte-t-on et pour combien de temps ? |
| Coût / résilience | coût mensuel réel | durée/fréquence d'indisponibilité | quel niveau de redondance est justifié ? |
| Autonomie / contrôle | temps de self-service | exceptions ou incidents de sécurité | quels garde-fous sont nécessaires ? |

Ce tableau est un exemple de structure, pas des données à recopier. Utilise les mesures de ton fil rouge. Une tension sans unité, sans période ou sans conséquence n'est pas recevable.

## 4. Contrôle de qualité avant remise

- [ ] Les dix sections existent et suivent le plan.
- [ ] Chaque chiffre possède une date, une unité, une méthode et une source.
- [ ] Les liens relatifs ouvrent les artefacts cités ; les chemins ne sont pas fictifs.
- [ ] Les trois tensions présentent des mesures des deux côtés.
- [ ] Au moins un échec, une hypothèse infirmée ou un coût sous-estimé est analysé sans maquillage.
- [ ] Les options écartées et les conditions qui feraient changer la décision sont explicites.
- [ ] Le dossier distingue mesure observée, estimation, hypothèse et opinion.
- [ ] La section 10 montre un changement ou une confirmation après contradiction, pas une simple déclaration d'humilité.
- [ ] Une personne extérieure peut identifier le problème, la décision, le risque accepté et la preuve en moins de 40 minutes.

## 5. Grille d'évaluation (30 points)

| Critère | Points | Pleine réussite |
|---|---:|---|
| Problème et impact | 3 | utilisateur, fréquence, impact et méthode de mesure identifiés |
| Architecture et frontières | 4 | responsabilités, dépendances, contrat et limites justifiés |
| Coût et arbitrages | 4 | hypothèses explicites, alternatives comparées, coût de sortie inclus |
| Fiabilité et exploitation | 4 | SLI/SLO, budgets, RPO/RTO, rollback et signaux observables cohérents |
| Trois tensions | 4 | deux côtés mesurés, unités et période comparables, coût assumé |
| Transfert | 2 | changement de langage/fournisseur réellement essayé, limites documentées |
| Transformation décisionnelle | 4 | contradiction sourcée, biais identifié, réponse modifiée et compensation vérifiable |
| Traçabilité et lisibilité | 3 | références ouvrables, dates, artefacts, dossier autonome |
| **Total** | **30** | |

Interprétation : 26–30 = dossier défendable sous réserve d'une contradiction externe ; 21–25 = dossier à reprendre sur ses critères faibles ; 15–20 = preuves partielles ; moins de 15 = dossier non recevable. Une pièce inventée, un chiffre sans source présenté comme observé ou un lien cassé bloque la réussite quel que soit le total.

## 6. Défense

Soutenance de 30 minutes : 12 minutes de présentation sans slides obligatoires, puis 18 minutes de contradiction. Le jury ou le contradicteur solo attaque au moins trois objections qui croisent deux familles : coût/fiabilité, sécurité/autonomie, délai/qualité, architecture/organisation, IA/responsabilité.

Pour chaque objection, réponds en dix lignes maximum : décision, preuve, chiffre, conséquence utilisateur, option rejetée et condition de changement d'avis. En solo, conserve un enregistrement horodaté et la grille d'objections réellement jouée.

## 7. Corrigé différé et preuve de maîtrise

Il n'existe pas de dossier modèle à recopier : le contenu doit provenir de ton propre système. Après une première remise, demande à un pair de noter chaque critère sans explication orale. Compare les notes, corrige les preuves manquantes, puis rejoue la contradiction. Archive les deux versions et un court journal des changements.

**Preuve attendue :** `PREUVES/DOSSIER-UNIQUE.md`, les artefacts liés, la grille remplie, l'enregistrement ou compte rendu contradictoire, et la version révisée datée. Le résultat démontre une capacité observée sur ce cas ; il ne prouve pas à lui seul un statut Staff ou Distinguished.



## Barrière de réussite non compensable

Une erreur critique de sécurité, d'intégrité des données ou de falsification de preuve entraîne une reprise ciblée, même si le total de points atteint le seuil. Une simulation doit être nommée comme simulation ; elle ne vaut pas preuve de production.
