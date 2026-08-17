---
stability: intemporel
acte: appliquer
---

# CHANGELOG DES CORRECTIONS D'AUDIT

Acte attendu : restituer.

Ce fichier trace, bloc par bloc, les corrections apportées après l'audit final. Chaque bloc est livré seulement quand `node outils/controle_livraison.mjs --strict`, `node outils/verifier_liens.mjs .` et `node outils/verifier_numerotation.mjs .` passent tous les trois.

## v6.2 : bloc C, la donnée sourcée

- C1 : protocole de la donnée sourcée créé ([06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md)), colonnes Relevé le / Chez / Unité / URL imposées dans la grille comparative, dans le gabarit [BUDGET-CLOUD.md](03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md) et dans le modèle [S1](PREUVES-MODELES/S1-BUDGET-CLOUD.md) ; le challenge cloud impose un relevé personnel de trois prix chez deux fournisseurs et une réponse écrite à l'objection "vos prix datent de quand ?". Verrou : contrôle 10.
- C2 : index de périssabilité régénéré proprement, avec accents, par [outils/generer_perissabilite.mjs](outils/generer_perissabilite.mjs). Verrou : contrôle 11, l'index commité doit être identique à l'index régénéré.
- C3 : portage multi-cloud rendu vérifiable par un livrable ([03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md](03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md)), branché sur le relevé de C1.
- C4 : décision tranchée par la mesure ([05-MAITRISE/02_scalability/11_DRILL_MESURE_DE_CHARGE.md](05-MAITRISE/02_scalability/11_DRILL_MESURE_DE_CHARGE.md)), bouclée sur le budget d'erreur du SLO.

## v6.3 : bloc D, la famille S5 rendue verifiable

- D1 : [03-PILOTAGE/11_leadership_mentorat](03-PILOTAGE/11_leadership_mentorat) rentre au gabarit strict : [verification_pack](03-PILOTAGE/11_leadership_mentorat/verification_pack/criteres.md) avec trois drills à critère binaire, et [EXO_JEUNE_IA.md](03-PILOTAGE/11_leadership_mentorat/EXO_JEUNE_IA.md) portant sur une décision de transmission. Le verrou de gabarit appliqué à tous les modules arrive avec le bloc G, contrôle 9.
- D2 : le mode solo du leadership existe ([01_mentorat_solo.md](03-PILOTAGE/11_leadership_mentorat/01_mentorat_solo.md)) : mentoré fictif documenté, trois productions à réviser dont une qui semble correcte et cache une décision d'architecture dangereuse. La preuve S5 ne dépend plus d'un employeur.
- D3 : pilotage d'une flotte d'agents ajouté à la dimension leadership ([07_standards_pour_agents.md](03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md)), branché sur les standards d'équipe et sur la fiche d'audit de réponse IA.

## v6.4 : Bloc E : progression, densité et seuils d'entrée

- **E1** : calibration obligatoire chiffrée, avec corrigé et seuil de passage, ajoutée aux prereq_check de `06_fiabilite_slo` (flou → promesse mesurable), `07_cloud_foundations` (système → unités facturées) et `16_ddd_contrats` (frontière de contexte).
- **E2** : ligne « Frontière » en tête de `14_architecture_patterns`, `15-ARCHI-LAB` et `16_ddd_contrats` ; nouvelle `02-CONSTRUCTION/MI-RETRO-BLOC-2-ARCHI.md` (30 min) posée juste avant l'entrée dans DDD/CQRS.
- **E3** : TECH-ILA reçoit sa porte d'entrée (`00_why_tech_ila.md`, `00_prereq_check.md`) ; les six niveaux deviennent des paliers numérotés « n sur 6 » et bloquants, un par rétrospective, le niveau 2 passant à la mi-rétro du bloc 2.
- **E4** : champ `acte:` (restituer / appliquer / transférer / évaluer / produire) déclaré sur les 1 212 fichiers à front-matter, règle ajoutée à `meta/_STYLE.md`.
- **Outils** : contrôle 12 (acte déclaré et valide) et contrôle 13 (chaque niveau TECH-ILA appelé par exactement une rétrospective) dans `outils/controle_livraison.mjs`.

## v6.5 : bloc F, preuves et tracabilite de la fusion

- F1 : `outils/verifier_liens.mjs` genere desormais [VERIFICATION_LIENS.md](VERIFICATION_LIENS.md) sur la totalite des `.md` du depot, avec trois nombres auto-calcules : fichiers parcourus, liens trouves, liens resolus. Fini le perimetre partiel non declare.
- F2 : archivage en texte integral du [protocole d'audit MyFunnyJS](06-ANNEXES-TRANSVERSES/archives/ARCHIVE-PROTOCOLE-AUDIT-MYFUNNYJS.md) et du [prompt de fusion v3](06-ANNEXES-TRANSVERSES/archives/ARCHIVE-PROMPT-FUSION-V3.md), avec date et mention historique.
- F3 : nouvelle cloture du dernier palier, [la revisite datee](05-MAITRISE/08_maitrise_staff_engineer/05_revisite_datee.md) : six mois plus tard, re-releve des prix, des mesures de charge et du budget d'erreur, et second ADR qui revise le premier en le nommant.
- Verrous ajoutes : controle 14 (la preuve de liens couvre 100 % des `.md` et affiche ses trois nombres) et controle 15 (zero lien relatif casse).

## v6.6 : bloc G, le verrou unique

- G1 : `outils/controle_livraison.mjs` porte desormais 19 controles bloquants, dont les nouveaux : preuve de liens exhaustive, zero lien casse, zero document orphelin, zero espace dans un nom de fichier, aucune phrase de colonne « Limite » repetee plus de deux fois.
- Corrections de fond exigees par ces verrous : 1102 cellules « Limite » reecrites pour parler du terme de leur propre ligne, 4 lignes de grimoire reparees (code inline qui cassait la table), fichier `dev journal weekly.md` renomme, selecteur de variation invisible supprime, trois fichiers longs re-accentues.
- Gabarit complete : `EXO_JEUNE_IA.md` et `verification_pack/` (criteres + 3 drills) presents dans chaque module du fil.
- Nouvel outil `outils/generer_index_dossiers.mjs` : chaque dossier a un README genere qui cite tous ses fichiers, donc plus aucun document sans porte d'entree.


## v6.7 - bloc A (passe automatique annulee sur les grimoires)

- A1 : colonne « Limite » refaite sur 1125 lignes (50 ecrites a la main pour
  07_cloud_foundations, 06_fiabilite_slo, 11_leadership_mentorat,
  06-CAPSTONE-ARENA, 01-BONUS-VAULT ; 16_ddd_contrats et
  08_maitrise_staff_engineer conserves comme etalon).
- A2 : 8 lignes de tableau reconstruites (colonne Analogies avalee) et tous les
  pipes internes de code inline re-echappes ; 1111 lignes de grimoire ont
  desormais exactement 5 colonnes.
- A3 : 7 fragments de code corrompus par des echappements manges restaures.
- A4 : archives/DECISION-PASSE-GRIMOIRES.md documente la passe, son annulation
  et les verrous.


## v6.8 - bloc B (typographie gelee, journal hebdomadaire, numerotation continue)

- B2 : nouveau `outils/controle_typographie.mjs`, branche comme controle 22 de
  `controle_livraison.mjs`. Trois regles gelees sur tous les `.md`, `.mjs`,
  `.js`, `.json`, `.txt` et `.yml` du depot, avec sortie `fichier:ligne` :
  0 emoji, 0 selecteur de variation (U+FE0E / U+FE0F), 0 tiret cadratin ni
  demi-cadratin. Aucun U+FE0F residuel : la verification de
  `05-MAITRISE/03_edge_cases/10_SPEC_DRIFT_DRILL.md` est confirmee. Corriges au
  passage : un emoji dans `02-CONSTRUCTION/02_mini_projects/13_memory_hunter/00_fixture/00_leaky.js`
  et deux demi-cadratins dans `05-MAITRISE/06_annexes/19_interview/04_simulation_defense_orale.md`.
- B3 : `06-ANNEXES-TRANSVERSES/DEV_JOURNAL_WEEKLY.md` renomme en
  `DEV_JOURNAL_HEBDO.md`, reecrit en deux sections explicites (gabarit vierge /
  exemple rempli) avec front-matter et regle de remplissage, puis lie depuis
  `00-SOCLE/03_referentiel/README.md`.
- B4 : `02-CONSTRUCTION/16_ddd_contrats` renumerote (le trou au 04 est comble,
  `05_exercice_architecture_trop_belle.md` devient `04_...`).
  `03-PILOTAGE/11_leadership_mentorat` verifie : la suite y demarre bien a 00 et
  le 01 existe via `01_mentorat_solo.md`, aucun changement necessaire. Quatre
  autres dossiers renumerotes pour fermer leurs trous (23 fichiers renommes,
  toutes les references mises a jour) : `01-CADRAGE/03_debugging`,
  `02-CONSTRUCTION/05_memory_performance`, `02-CONSTRUCTION/11_refactoring`,
  `05-MAITRISE/08_maitrise_staff_engineer`.
- B4 : nouveau `outils/controle_numerotation_continue.mjs`, branche comme
  controle 23 : dans tout dossier de module, les prefixes numeriques demarrent a
  00 et se suivent sans trou (numeros reserves 90 a 99 exclus).
