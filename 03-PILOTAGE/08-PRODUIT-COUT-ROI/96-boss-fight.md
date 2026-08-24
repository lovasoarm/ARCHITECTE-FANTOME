---
stability: intemporel
acte: pilotage
noyau: oui
type: boss
cognitive_level: L9
perturbation_modes: [preuve_partielle, solution_concurrente]
anti_recipe_key: preuve_partielle+solution_concurrente
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# BOSS FIGHT : MODULE 08 : L'ARBITRAGE DEVANT CELUI QUI PAIE

Durée : 3 h. Un essai par semaine.

## Le scénario

Trois demandes arrivent la même semaine, budget pour une seule :
A. une fonctionnalité réclamée par le plus gros client (valeur commerciale directe) ;
B. le chantier de fiabilité qui tient la promesse de `SLO.md` ;
C. une réduction de facture cloud de 35 % (chantier de 8 jours).

## Les manches

1. **Grille (45 min)** : les quatre lignes (dont « ne rien faire »), chaque nombre sourcé et daté.
2. **Point mort (30 min)** : calcule-le pour B et C. Si l'un dépasse 18 mois, écarte-le par écrit.
3. **Décision (30 min)** : une page pour une direction non technique : le choix, ce qu'on abandonne,
   la contrepartie, la date de réexamen.
4. **Refus (30 min)** : la direction refuse ton choix. Applique les trois temps de l'exercice 06,
   version à 20 % comprise.
5. **Registre (30 min)** : inscris les deux chantiers écartés dans `DETTE.md`, avec intérêt mensuel et
   déclencheur.
6. **Contradiction (15 min)** : un contradicteur attaque le nombre le plus fragile. Tu révises ou tu
   tiens, par écrit.

## Conditions de passage

- [ ] Chaque nombre a une source datée ou une fourchette étiquetée « estimation ».
- [ ] « Ne rien faire » est chiffré, pas mentionné.
- [ ] Un chantier est explicitement abandonné, avec la raison.
- [ ] La page de décision ne contient aucun terme technique non expliqué.
- [ ] `DETTE.md` mis à jour avec déclencheur mesurable.
- [ ] Cohérence : les euros cités viennent de `06A-BUDGET-CLOUD.md`, la promesse de `SLO.md`.

## Échec automatique

Un tableau sans « ne rien faire ». Un point mort calculé sans gain mensuel sourcé. Un refus sans trace
écrite.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `08-PRODUIT-COUT-ROI` ensemble. Il se passe une fois, sur artefact.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
