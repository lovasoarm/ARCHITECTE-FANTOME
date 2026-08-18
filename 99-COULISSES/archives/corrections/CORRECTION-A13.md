# Correction A13 — TECH-ILA, parcours parallele obligatoire a 6 jalons

Date : 2026-08-18 — reference d'audit 0.9

## Le defaut

TECH-ILA etait annonce comme un compagnon facultatif, et sa seule validation vivait dans les
retrospectives de bloc : un module du fil pouvait donc etre declare valide sans que le jalon
technologique correspondant existe.

## Ce qui a ete fait

1. `06-ANNEXES-TRANSVERSES/03-TECH-ILA/README.md` requalifie : section « Parcours parallele
   obligatoire : 6 jalons », avec le tableau des six modules declencheurs (chemin exact) et le
   niveau attendu, binaire, pour chacun.
2. Le critere binaire descend dans le `verification_pack/criteres.md` des six modules appelants
   (`00-SOCLE/01_getting_started`, `02-CONSTRUCTION/18_web_concepts`, `02-CONSTRUCTION/19_api_craft`,
   `03-PILOTAGE/07_cloud_foundations`, `05-MAITRISE/02_scalability`, `04-EPREUVE/04_ai_native_dev`).
   Il precede les trois drills et ne se compense pas.
3. Trace exigee : `TECH-ILA jalon N franchi le <date> : <chemin de l'artefact>`.
4. Regle 15 du controle de livraison : un pack de module declencheur sans jalon bloquant = refus.
   La retrospective de bloc ne valide plus, elle relit.

## Test de morsure

Retirer le bloc « Jalon TECH-ILA » d'un des six `criteres.md` : refus `TECH-ILA`, sortie 1.
