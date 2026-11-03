---
perishability_id: PER-0059

stability: "perissable"
acte: produire
cognitive_level: L3
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: high
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://calculator.aws/"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "AWS Pricing Calculator : outil d’estimation. Les hypothèses tarifaires officielles précisent que le résultat n’est pas une offre/devis et que la facture réelle dépend de l’usage, de la région, des services et des conditions applicables. Aucun tarif fixe n’est garanti par cette référence."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "AWS_CALCULATOR_ESTIMATE_LIMITS_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# 07 : Relevé tarifaire réel, obligatoire et contredisible

Temps de lecture ~5 min

Temps de travail indicatif : **75 min**. Prévois davantage si les pages tarifaires demandent une configuration ou un compte.

Un budget cloud devient défendable quand chaque prix est rattaché à un service précis, une région, une unité, des conditions et une date. « Environ 7 € » sans ces éléments n'est pas une donnée exploitable.

> **Limite de l’estimation tarifaire :** AWS Pricing Calculator fournit une estimation fondée sur les hypothèses saisies ; ce n’est ni un devis contractuel ni une facture garantie. Le coût réel varie selon la région, les services, la consommation, les options et les conditions de facturation. Date la simulation et conserve ses hypothèses.

## Ce que tu produis

Un fichier `RELEVE-TARIFAIRE.md` à la racine de ton fil rouge, avec les trois sections ci-dessous. Il devient la source de tout montant réel que tu écriras ensuite dans ton `06A-BUDGET-CLOUD.md`.

## Section 1 : relever trois fournisseurs et quatre postes

Choisis trois fournisseurs : un hyperscaler généraliste, un fournisseur européen et un fournisseur à tarification simple. Pour chaque fournisseur, relève les quatre postes suivants, si le service existe. Si une offre n'a pas d'équivalent suffisamment comparable, écris `non comparable` et explique pourquoi : ne fabrique pas de ligne équivalente.

| Poste          | Configuration de comparaison                                                                          | Unité à relever                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Calcul         | 1 vCPU + 2 Go de RAM, fonctionnement 730 h/mois ; variante la plus proche disponible                  | prix mensuel ou calcul détaillé converti en prix mensuel             |
| Base managée   | plus petite instance de base relationnelle, avec 20 Go de stockage si l'offre le sépare               | prix mensuel, en séparant calcul, disque et sauvegarde si nécessaire |
| Stockage objet | 100 Go conservés pendant un mois ; préciser classe et nombre de requêtes si facturées                 | prix mensuel                                                         |
| Egress         | 1 Go sortant vers Internet depuis la région retenue ; préciser destination et éventuel palier gratuit | prix par Go et frais fixes éventuels                                 |

Le tableau contient normalement douze lignes (trois fournisseurs × quatre postes). Ce nombre est une cible de comparaison, pas une obligation de remplir une case avec un tarif inexistant. Une ligne non comparable, avec sa raison, vaut mieux qu'un chiffre inventé.

```text
| Fournisseur | Poste/service exact | Région | SKU/configuration et conditions | Quantité | Unité facturée | Prix | Devise | URL complète | Date consultée | Limites / éléments exclus |
|---|---|---|---|---:|---|---:|---|---|---|---|
```

Pour chaque tarif, note au minimum : fournisseur, nom du service, région, SKU ou configuration, prix, devise, unité exacte, conditions (à la demande, engagement, réservation, niveau de service, frais minimums), quantité utilisée pour la conversion, URL qui mène à l'information tarifaire et date réelle de consultation. Précise si les taxes, crédits, remises, frais d'API, stockage, sauvegardes ou transferts ne sont pas inclus.

**Règles de recevabilité :**

1. L'URL doit pointer vers la page tarifaire du service concerné, et non vers la page d'accueil du fournisseur. Si le montant provient d'un calculateur, conserve aussi les paramètres du calcul.
2. La date est celle à laquelle tu as consulté la source (`AAAA-MM-JJ`), pas la date de publication de la page ni une date supposée.
3. La région, le SKU, la devise et l'unité doivent être visibles. Une conversion (heure → mois, GiB → GB, devise → EUR) doit afficher son taux, sa date et sa formule.
4. Une page qui présente seulement une fourchette ou qui ne montre pas le prix de la configuration choisie ne justifie pas un montant exact.

**Repli hors ligne :** [07-RELEVE-REFERENCE-2026.md](07-RELEVE-REFERENCE-2026.md) fournit une simulation arithmétique fictive pour apprendre à calculer et contrôler un budget. Elle ne contient aucun tarif réel, ne remplace aucune des douze recherches et ne valide pas le relevé personnel. Indique `SIMULATION` dans ta preuve si tu utilises ce repli.

Protocole de sourçage : [../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md](../../06-ANNEXES-TRANSVERSES/17A-PROTOCOLE-DONNEE-SOURCEE.md).

## Section 2 : comparer au modèle pédagogique

Le dépôt fournit un exemple rempli : [02-S1-BUDGET-CLOUD.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/02-S1-BUDGET-CLOUD.md). Ses montants sont **des paramètres de simulation**, pas les prix d'un fournisseur et pas une référence de marché.

Pour chacun des quatre postes, compare ton prix calculé au montant du scénario S1. Présente l'écart comme un exercice de lecture des hypothèses, pas comme un classement réel de fournisseurs : les configurations peuvent différer et les données du modèle sont fictives.

```text
écart (%) = (ton_prix - montant_simulé_S1) / montant_simulé_S1 × 100
```

Si la simulation vaut zéro ou si les configurations ne sont pas comparables, n'effectue pas la division : explique la limite et donne une comparaison adaptée.

| Poste | Montant simulé S1 | Ton relevé comparable | Écart % ou « non comparable » | Cause ou limite vérifiable |
| ----- | ----------------: | --------------------: | ----------------------------: | -------------------------- |

## Section 3 : expliquer les écarts

Pour chaque écart, écris une phrase qui nomme une cause vérifiable : région, SKU, engagement, palier gratuit, unité de facturation, volume, nombre de requêtes, sauvegardes, rétention, transfert ou date de consultation. « C'est moins cher chez X » ne suffit pas.

## Le piège de l'egress

Utilise une seule convention d'unité. Dans cet exercice, `kB`, `MB` et `GB` sont décimaux : 1 kB = 1 000 octets et 1 GB = 1 000 000 000 octets.

```text
Hypothèse : 50 000 réponses par jour, 40 kB par réponse.
50 000 × 40 kB = 2 000 000 kB = 2 000 MB = 2 GB/jour.
2 GB/jour × 30 jours = 60 GB/mois.
Coût mensuel = 60 GB × ton tarif d'egress par GB,
              en ajoutant séparément tout frais fixe ou palier applicable.
```

Compare ce résultat au coût du calcul. Ne conclus pas que l'egress est toujours le poste dominant : vérifie-le avec tes volumes, ton contrat et tes seuils gratuits.

## Preuve à livrer

- `RELEVE-TARIFAIRE.md` : douze lignes si les douze configurations sont réellement tarifables ; sinon, les lignes disponibles et les équivalences refusées, avec justification.
- Les paramètres de calcul et les conversions, conservés à côté de chaque prix.
- Le tableau d'écarts, avec `non comparable` quand c'est nécessaire.
- Le calcul d'egress mensuel, avec les unités et l'hypothèse de trafic.

## Verdict

Le critère de [98-criteres.md](97-CHECKPOINT-PACK/98-criteres.md) est binaire pour chaque prix présenté comme réel : sans source précise, date, région, unité ou conditions essentielles, le montant est refusé. Une ligne explicitement déclarée `non comparable` n'est pas une erreur ; elle interdit simplement de conclure sur ce poste.

## Où ce relevé ressert

- Ton `06A-BUDGET-CLOUD.md` : chaque montant réel doit provenir de tes relevés, avec hypothèses et limites.
- Le prix de la neuvième : [03-rayon_impact_zones.md](03-rayon_impact_zones.md), section 3 bis.
- Le choix de fournisseur : [04-choisir_fournisseur.md](04-choisir_fournisseur.md).
- Le portage multi-fournisseur : [99-PORTAGE-MENTAL.md](99-PORTAGE-MENTAL.md).
- La tension n°1 imposée du capstone : [06-addendum-staff-engineer.md](../../04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md).

## RÉSUMÉ

Un prix défendable est associé à un service, une configuration, une région, une unité, des conditions, une URL et une date de consultation. Les douze lignes sont un objectif de comparaison ; les équivalences impossibles sont signalées, jamais fabriquées.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : besoin → service → unité → hypothèse → calcul → limite. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Transfert : changer de contexte

Refais le relevé dans une autre région ou avec un fournisseur aux primitives différentes. Explique ce qui reste comparable, ce qui change et quelle preuve permet de le confirmer.

**Preuve à conserver :** les sources consultées, la date, les paramètres, les calculs, les limites et la décision de comparaison.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [AWS Pricing Calculator](https://calculator.aws/)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)
- [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)
