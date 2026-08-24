---
stability: intemporel
acte: pilotage
noyau: oui
type: boss
cognitive_level: L9
perturbation_modes: [preuve_partielle, transmission]
anti_recipe_key: preuve_partielle+transmission
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# BOSS FIGHT : MODULE 06 : LE BUDGET EST VIDE, LE MÉTIER VEUT LIVRER

Durée : 3 h. Un essai par semaine.

## Le scénario

Jour 19 sur 28. Ton budget d'erreur est consommé à 94 % : deux incidents et une migration lente.
Le métier veut livrer vendredi une fonctionnalité attendue par le plus gros client.
Tu es la seule personne qui connaît le chiffre.

## Les manches

1. **Établir le fait (30 min)** : recalcule le budget consommé depuis les données brutes, pas depuis
   un tableau de bord. Produis le calcul, ligne par ligne.
2. **Restaurer (60 min)** : restauration réelle depuis sauvegarde, RTO chronométré, écart au RTO visé
   expliqué.
3. **Décider (30 min)** : applique ta politique de budget. Écris la décision en une page, pour une
   direction non technique, avec la contrepartie chiffrée des deux options.
4. **Réduire le bruit (30 min)** : supprime au moins une alerte inutile, ajoute une alerte de burn
   rate à deux fenêtres, écris le runbook.
5. **Contradiction (30 min)** : le métier répond « on assume le risque, livre quand même ». Tu écris
   la réponse : ce que tu acceptes, sous quelle condition mesurable, et qui porte la décision.

## Conditions de passage

- [ ] Budget recalculé à la main, écart au tableau de bord expliqué.
- [ ] RTO mesuré au chronomètre, écrit dans `SLO.md`, daté.
- [ ] Décision écrite sans jargon, avec deux chiffres et une contrepartie.
- [ ] Gate sécurité : la restauration n'a exposé aucun secret en clair (procédure de secrets écrite).
- [ ] Post-mortem au gabarit pour l'incident le plus coûteux du mois.

## Échec automatique

Livrer sans écrire la décision. Annoncer un RTO non mesuré. Garder une alerte sans action associée.

<!-- VERDICT-BOSS:debut -->

## Verdict du Boss

Ce Boss juge les modules `06-FIABILITE-SLO` ensemble. Il se passe une fois, sur artefact.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
