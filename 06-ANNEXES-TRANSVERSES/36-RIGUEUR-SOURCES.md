---
perishability_id: PER-0104

stability: perissable
acte: pratiquer
route_family: core
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_type: primary
source_url: https://github.com/nodejs/Release
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Calendrier officiel Node.js : exemple pédagogique de vérification du statut des branches au 3 novembre 2026. La règle de méthode est un exercice ; les statuts changent et doivent être reconsultés au moment d’une décision."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_current » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "NODE_RELEASE_SCHEDULE_EXAMPLE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---
# 36 : Vérifier une affirmation technique

Une affirmation technique n’est pas plus vraie parce qu’elle contient un chiffre, un nom d’outil ou une date.

## La règle

Avant de reprendre une information dans une décision, un ADR, un rapport ou un livrable :

1. identifie ce qui est affirmé ;
2. distingue mécanisme, version, mesure, benchmark et heuristique ;
3. cherche d’abord une source primaire lorsque l’information est externe ;
4. note la version ou la date lorsqu’elle peut changer ;
5. vérifie les limites et les conditions de validité ;
6. indique ce que tu sais réellement et ce qui reste une hypothèse.

## Cinq types d’affirmation

| Type        | Exemple                                | Exigence                                               |
| ----------- | -------------------------------------- | ------------------------------------------------------ |
| Stable      | règle du langage ou mécanisme durable  | expliquer le mécanisme                                 |
| Versionnée  | comportement d’un runtime ou d’une API | version explicite                                      |
| Empirique   | mesure effectuée sur ton système       | commande / contexte / résultat                         |
| Benchmark   | comparaison de performances            | environnement + limites + source                       |
| Heuristique | règle pratique                         | présentée comme heuristique, pas comme loi universelle |

## Test anti-certitude

Pour toute affirmation importante, réponds :

> Quelle observation me ferait changer d’avis ?

Puis :

> Dans quel contexte cette affirmation devient-elle mauvaise ?

## Exemple : versions

Le parcours est reproductible sur **Node.js 22.23.4**. Cette version est le point de référence de l’expérience AF ; elle ne signifie pas que toute autre version LTS est interdite. Une compatibilité avec une autre version doit être vérifiée séparément. Vérification ciblée de la source primaire le 3 novembre 2026 : Node 22.x et 24.x sont en Maintenance LTS, Node 26.x en Active LTS (version relevée : 26.13.0) et Node 27.x en Alpha (première publication 27.0.0-alpha.0.0.0 affichée le 29 octobre 2026) ; consulte le [calendrier du groupe Release Node.js](https://github.com/nodejs/Release) avant toute décision versionnée.

Pour les versions, les prix, les services fournisseurs ou toute donnée évolutive, écris toujours la date de vérification et privilégie la source primaire.

## Exercice : source ou intuition ?

Choisis une affirmation technique récente de ton projet. Produis trois lignes :

- ce que la source primaire affirme ;
- ce que ton système mesure réellement ;
- ce que tu en déduis, avec la limite de cette déduction.

La qualité de l’argument compte plus que la quantité de références.

## Fiche minimale de vérification d'une source

Pour une information susceptible d'évoluer, consigne la source consultée et la date réelle de vérification. N'utilise jamais une date de revue interne comme preuve qu'une source externe est encore à jour.

```yaml
stability: perissable
source_type: primary          # primary | secondary | internal | none
source_url: https://example.org/source
source_verified_on: null      # date réelle de consultation ; null si la source n'a pas été vérifiée
freshness_status: not_verified    # not_verified | verified_current | verified_reference | verified_historical | verified_link_only | review_due | source_missing
```

Renseigne `source_verified_on` uniquement après avoir consulté la source. `verified_current` signifie que les affirmations précises listées dans `source_scope` ont été comparées à la source à la date indiquée ; cela ne garantit pas qu'elles resteront actuelles. `verified_reference` signifie que l'identité de la source, son éditeur et sa pertinence pour le concept annoncé ont été confirmés, sans prétendre avoir contrôlé chaque phrase du document. `verified_historical` désigne une source historique employée comme fait historique, sans la présenter comme la documentation actuelle. `verified_link_only` confirme seulement l'identité et l'accès au lien ; ce statut ne suffit pas pour soutenir une affirmation technique. `not_verified` signifie qu'aucune vérification exploitable n'est attestée. `review_due` signifie qu'une vérification périodique est échue. Si la source manque, utilise `source_missing`.


### Cas où une URL externe n'est pas la bonne preuve

- **Exercice ou simulation :** si les données sont fictives ou si l'exercice vérifie une notion déjà enseignée, indique explicitement cette hypothèse dans l'exercice. Utilise `source_type: internal` avec `canonical_resource` vers la leçon réellement utilisée, ou `source_type: none` si aucune ressource externe n'est nécessaire. Ne fabrique pas une URL pour remplir un champ.
- **README / porte d'entrée :** une référence interne peut être héritée d'une leçon canonique seulement si le lien vers cette leçon est explicite. Ne copie pas une date `source_verified_on` comme si le README avait lui-même été vérifié.
- **Document multi-sources :** une seule valeur `source_url` ne certifie pas l'ensemble du catalogue. Chaque affirmation sensible doit rester reliée à la source qui la soutient ; la vérification d'une URL ne doit pas être généralisée aux autres.
- **Contenu évolutif non vérifié :** utilise `freshness_status: not_verified` lorsque la confirmation est nécessaire mais n'a pas été faite. Ce statut est une alerte honnête, pas une validation ni une preuve que l'affirmation est correcte.

### Statut explicite et cadence de revue

- `freshness_status: not_verified` signifie que la fraîcheur factuelle n'est pas attestée dans cette édition. Ce statut n'affirme ni que le contenu est faux, ni qu'une source manque forcément ; il interdit simplement de présenter la ressource comme vérifiée.
- `source_type: null` signifie que la nature de la preuve n'a pas encore été tranchée. Ne le remplace pas par `primary`, `secondary`, `internal` ou `none` sans examiner le rôle du document.
- `source_type: none` est réservé aux documents dont le contenu est explicitement conceptuel, fictif ou autonome et qui ne font aucune affirmation externe nécessitant une source. Explique ce choix dans le corps ou dans une note de périmètre.
- `review_interval` est la cadence prévue pour recontrôler un élément volatile. `review_due` est l'échéance calculée depuis la date réelle de vérification ; une cadence ajoutée ne transforme jamais `not_verified` en `verified_current`.
- Une leçon globalement intemporelle peut porter un `perishability_id` pour une API ou un runtime ; la note `perishability_scope` doit nommer cet élément et sa cadence. Ne duplique pas le même identifiant sur le prerequis, l'exercice et le corrigé si la leçon canonique porte déjà le suivi.

## Historique du contrôle de référence (3 novembre 2026) : statut de référence et statut de preuve

Les champs suivants évitent de confondre une source consultée avec une affirmation entièrement démontrée :

- `source_review_status: SCOPED_REFERENCE_REVIEW_COMPLETE_YYYY-MM-DD` : la fiche a fait l’objet d’une vérification de source et de portée à cette date. Ce champ ne certifie pas toutes les assertions du document.
- `claim_reviewed_on` : date à laquelle les affirmations explicitement listées dans `source_scope` ont été rapprochées de la source.
- `claim_alignment_status` : résultat compact et descriptif du rapprochement ; il doit rester précis et ne pas être interprété comme un audit complet.
- `source_access_status` : précise si la page source, une version archivée officielle ou une documentation officielle de substitution a été consultée.

Une URL accessible n'est pas une preuve. Une documentation officielle peut confirmer un concept sans rendre le code local exécutable ; un article historique ne doit pas être utilisé comme état courant ; une source secondaire reste secondaire. Les sources de marché et les enquêtes doivent conserver leur territoire, leur échantillon, leur période et leur méthode. Les dates de revue sont des dates de constat, pas une garantie de stabilité.

### Portée explicite d’une provenance interne ou externe

Pour éviter qu’un champ donne une assurance plus large que la preuve réellement consultée, les fiches évolutives peuvent également renseigner :

```yaml
source_scope: "Partie exacte de la fiche couverte par cette source"
provenance_note: "Ce qui est étayé et ce qui reste à vérifier"
```

`canonical_resource` désigne un point d’ancrage du curriculum ; il ne certifie pas une version d’outil, un prix, un comportement fournisseur ou une norme. `source_url` et `source_verified_on` ne couvrent que le `source_scope` réellement consulté. Pour plusieurs affirmations indépendantes, consigne plusieurs sources avec leur portée ; ne généralise jamais la vérification d’une URL à tout le document. Une fiche dont le contenu est un journal fictif ou un exercice autonome peut utiliser `source_type: none` et expliquer pourquoi ; une fiche qui comporte des assertions externes non vérifiées conserve `freshness_status: not_verified`, même si son point d’ancrage interne est connu.
