# Correction B4 — Contrat de validation unique : construire, pas lire

Date : 2026-08-18 — reference d'audit : critere 8

## Le defaut

Chaque module validait a sa facon. Certains packs demandaient un artefact, d'autres se
contentaient d'une case cochee apres lecture. Une grande section pouvait donc etre declaree
acquise sans que rien n'ait ete construit, explique, justifie ni defendu.

## Ce qui a ete fait

1. `lib_contrat_validation.mjs` : definition **unique** des quatre criteres binaires, dans cet
   ordre, sans variante — CONSTRUCTION (un artefact existe), EXPLICATION (trois publics :
   enfant, pair, direction non technique), JUSTIFICATION (au moins un nombre date et source,
   renvoi au releve de reference A5), DEFENSE (trois objections, trois reponses, une
   concession ecrite, renvoi a l'annexe `07-CONTRADICTEUR.md` deja existante).
2. `appliquer_contrat_validation.mjs` a insere le contrat dans les **58** `verification_pack`
   du depot, avant la regle de verdict, avec des liens relatifs calcules (0 lien casse).
3. Aucune duplication de dispositif : le contradicteur n'est pas recopie, il est reference.

## Test de morsure (joue)

Ajout d'une case `- [ ] Lu` dans `05-MAITRISE/04_ai_agents_and_autonomy/00_prereq_check.md` →
`REFUS CONTRAT-VALIDATION : ... propose une validation par lecture` (regle 20). La regle refuse
aussi tout pack auquel manque l'un des quatre axes. La prose qui *parle* de lecture reste
permise : seule la case cochable est refusee. Case retiree, controle a 0 refus.

## Critere de fin

0 grande section validable sans artefact construit, explique, justifie et defendu : verifie sur
les 58 packs par la regle 20 de `controle_livraison.mjs`.
