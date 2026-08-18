# Correction A17 — Gate securite sur les modules a livrable d'architecture

Date : 2026-08-18 — reference d'audit : angle mort A3

## Le defaut

Le gate securite etait obligatoire dans les exercices d'ecole (mini-projets de
`02-CONSTRUCTION`) et absent des decisions d'architecture : un ADR, un budget cloud, un SLO
ou un schema pouvaient etre valides sans qu'on ait jamais regarde les secrets ni le rayon
d'impact. C'est l'inversion exacte du risque reel : le mal fait par un exercice s'arrete au
depot de l'apprenant, celui d'une decision d'architecture s'etend a tout un systeme.

## Ce qui a ete fait

1. Definition unique, ecrite et lisible par machine, de « module a livrable d'architecture » :
   `99-COULISSES/outillage/lib_gate_securite.mjs` (motifs : ADR, BUDGET-CLOUD, SLO, schema
   d'architecture). Aucune liste tenue a la main.
2. `99-COULISSES/outillage/appliquer_gate_securite.mjs` ecrit dans chaque
   `verification_pack/criteres.md` concerne un bloc binaire, place **avant** la regle de
   verdict : « Aucun secret en clair, rayon d'impact du livrable ecrit », verdict
   *module non valide* meme avec tous les drills REUSSI, et renvoi vers
   [le module securite](../../../03-PILOTAGE/04_security/README.md).
3. Perimetre applique : **54 verification_pack** sur les 58 du depot.
4. `controle_livraison.mjs` regle 7 ne cite plus trois chemins en dur : elle enumere les
   modules a livrable d'architecture et refuse l'absence du gate.

## Test de morsure (joue)

Suppression des lignes de gate dans `02-CONSTRUCTION/16_ddd_contrats/verification_pack/criteres.md`
→ `REFUS GATE-SECURITE : ... porte un livrable d'architecture sans gate securite`. Fichier
restaure, controle revenu a 0 refus.

## Critere de fin

Zero module a livrable d'architecture sans gate securite : verifie par
`node 99-COULISSES/outillage/controle_livraison.mjs .` → 0 refus.
