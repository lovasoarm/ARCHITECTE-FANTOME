---
stability: intemporel
acte: pilotage
noyau: oui
type: boss
---

# BOSS FIGHT — MODULE 06 : LE BUDGET EST VIDE, LE MÉTIER VEUT LIVRER

Durée : 3 h. Un essai par semaine.

## Le scénario

Jour 19 sur 28. Ton budget d'erreur est consommé à 94 % : deux incidents et une migration lente.
Le métier veut livrer vendredi une fonctionnalité attendue par le plus gros client.
Tu es la seule personne qui connaît le chiffre.

## Les manches

1. **Établir le fait (30 min)** — recalcule le budget consommé depuis les données brutes, pas depuis
   un tableau de bord. Produis le calcul, ligne par ligne.
2. **Restaurer (60 min)** — restauration réelle depuis sauvegarde, RTO chronométré, écart au RTO visé
   expliqué.
3. **Décider (30 min)** — applique ta politique de budget. Écris la décision en une page, pour une
   direction non technique, avec la contrepartie chiffrée des deux options.
4. **Réduire le bruit (30 min)** — supprime au moins une alerte inutile, ajoute une alerte de burn
   rate à deux fenêtres, écris le runbook.
5. **Contradiction (30 min)** — le métier répond « on assume le risque, livre quand même ». Tu écris
   la réponse : ce que tu acceptes, sous quelle condition mesurable, et qui porte la décision.

## Conditions de passage

- [ ] Budget recalculé à la main, écart au tableau de bord expliqué.
- [ ] RTO mesuré au chronomètre, écrit dans `SLO.md`, daté.
- [ ] Décision écrite sans jargon, avec deux chiffres et une contrepartie.
- [ ] Gate sécurité : la restauration n'a exposé aucun secret en clair (procédure de secrets écrite).
- [ ] Post-mortem au gabarit pour l'incident le plus coûteux du mois.

## Échec automatique

Livrer sans écrire la décision. Annoncer un RTO non mesuré. Garder une alerte sans action associée.
