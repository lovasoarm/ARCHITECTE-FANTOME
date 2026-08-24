---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Alertes et astreinte : ce qui réveille un humain

Temps de lecture ~8 min

## 1) LA RÈGLE UNIQUE

**Une alerte qui réveille = une action humaine immédiate et connue.**
Pas d'action → ce n'est pas une alerte, c'est un graphique.

## 2) TROIS NIVEAUX, TROIS CANAUX

| Niveau  | Déclencheur                                                       | Canal           | Délai         |
| ------- | ----------------------------------------------------------------- | --------------- | ------------- |
| Page    | le budget d'erreur brûle plus vite que X, ou parcours critique KO | téléphone       | immédiat      |
| Ticket  | dégradation non urgente, disque à 80 %                            | file de travail | 1 jour ouvré  |
| Journal | tout le reste                                                     | tableau de bord | jamais poussé |

## 3) ALERTER SUR LES SYMPTÔMES, PAS SUR LES CAUSES

« CPU à 90 % » n'est pas un problème si l'utilisateur est servi. « Le taux d'erreur du parcours de
réservation dépasse le budget » est un problème. Alerte sur la promesse, pas sur la machine.

## 4) LE TAUX DE COMBUSTION (burn rate)

Brûler le budget 14 fois plus vite que la normale sur 1 h = page immédiate.
Brûler 6 fois plus vite sur 6 h = page en heures ouvrées. Deux fenêtres, deux seuils : c'est ce qui
évite à la fois le réveil inutile et la découverte trop tardive.

## 5) ASTREINTE SOUTENABLE (même en solo)

- Maximum 2 réveils par semaine ; au-delà, on répare l'alerte avant de réparer le système.
- Chaque page a un **runbook** d'une page : symptôme, première commande à taper, critère d'arrêt.
- Variante solo, valable pour ce parcours : tu es ton propre astreint. Tu notes chaque déclenchement
  dans `ASTREINTE.md` avec l'heure, l'action, et si l'alerte était justifiée. Sept jours suffisent
  pour prouver la compétence.

## Exercice (25 min)

Écris deux alertes de burn rate (fenêtres courte et longue), le runbook de la plus critique, et la
liste des alertes que tu **supprimes** aujourd'hui, avec la raison.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
