---

stability: "intemporel"
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [decision_inversee, changement_echelle]
anti_recipe_key: decision_inversee+changement_echelle
transfer_distance: high
assessment_role: staff_mastery
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "PREUVES-STAFF-ENGINEER.md"
source_scope: "Référentiel interne des preuves Staff Engineer utilisé pour cadrer le boss fight ; il ne constitue pas une certification externe."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---
> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Boss fight : soutenance du dossier unique sous contradiction

Branche obligatoire : [09-CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md).
Sans cette passe, la preuve S5 est impossible et ce combat est non jouable.

## Déroulement (30 min)

1. **12 min** : tu présentes le [dossier unique](02-dossier_unique.md) sans slides
   optionnelles : problème, coût, SLO, une tension, un refus.
2. **18 min** : contradiction. Le jury (ou toi en solo enregistré) pioche au moins
   **trois** objections parmi les vingt, qui croisent **deux familles** chacune.
3. Pour chaque objection : décision, chiffre, source, conséquence utilisateur,
   condition de changement d'avis : **10 lignes max**, protocole du contradicteur.

## Solo acceptable

Enregistrement horodaté + tableau des mesures. Une réponse qui renvoie à
« l'équipe » sans artefact public est refusée.

## Verdict

Réussi si, après contradiction :

- les six familles + le portage + les trois tensions restent cohérents ;
- aucune promesse ne dépasse le budget ou le SLO ;
- une décision refusée est assumée **avec son chiffre** ;
- `05A-transfert_hors_ecosysteme.md` existe et est cité. `STANDARDS-AGENTS.md` est joint si le fil rouge utilise des agents/automatisations autonomes ; sinon, `EVALUATION-IA.md` justifie le non-usage et son périmètre.

Échec : S6 encore CREUX, contradicteur non joué, ou tension qui ne perd rien.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `08-MAITRISE-STAFF-ENGINEER` ensemble. Il se passe une fois, sur artefact.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->

## Épreuve de maturation décisionnelle

Le boss doit inclure au moins quatre perturbations : information asymétrique, meilleure proposition venant d'un junior, pression de statut ou de délai, et décision sans IA parfaite.

Les preuves complémentaires sont dans [05-PSYCHOLOGIE-DECISION](05-PSYCHOLOGIE-DECISION/README.md), notamment `JUNIOR-WAS-RIGHT`, `DECISION-ATTRIBUTION-ERROR`, `NO-WIN-DECISION`, `ARCHITECTURE-HUMAN-BIASES` et `PSYCHOLOGICAL-SAFETY`.

La manche terminale doit également être jouée : [THE EXPERT TRAP](05-PSYCHOLOGIE-DECISION/16-EXPERT-TRAP.md). Une réponse qui raconte « je suis humble » sans changement observable entre avant / pendant / après est insuffisante.

### Gates de maturation

- [ ] P3 atteint sur humilité, plasticité, régulation, désidentification et influence.
- [ ] P4 atteint sur contradiction, changement d’avis, influence, conflit et pression.
- [ ] Au moins une meilleure proposition est venue d’un junior.
- [ ] Une mauvaise nouvelle a été portée sans maquillage ni dramatisation.
- [ ] Une décision sans IA parfaite a documenté le coût humain ou organisationnel accepté.
- [ ] Une compensation structurelle a été créée après identification d’un biais.
- [ ] Le candidat distingue une décision mauvaise de la qualité de décision compte tenu des informations disponibles.
- [ ] Le candidat sait identifier une asymétrie de pouvoir qui menace le signal technique et modifier la structure de la conversation.

## Perturbation supplémentaire : l’agent a maintenant les clés

> **SCÈNE CRAZYDEVS : Prison Break :** l’agent peut appeler une API, modifier une ressource et produire une décision plausible. La vitesse est excellente. Le danger aussi.

Traite ce scénario comme une analyse de menace, même si ton fil rouge n’utilise aucun agent autonome. Explique les permissions minimales, les données accessibles, les évaluations de sortie, le coût plafond, le mécanisme d’arrêt et le rollback. Si un agent autonome est réellement utilisé, relie l’analyse à `STANDARDS-AGENTS.md` ; sinon, marque le scénario `SIMULATION` et documente le non-usage dans `EVALUATION-IA.md`. Cette perturbation croise S3, S5 et S6. Aucun corrigé n’est fourni.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
