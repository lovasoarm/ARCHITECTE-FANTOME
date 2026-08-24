---
stability: intemporel
acte: annexe
noyau: oui
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# 08 : Simulation d'entreprise (sans entreprise)

Temps de lecture ~2 min

Aucun module du palier 3+ n'a le droit d'exiger une équipe, un manager ou une direction
réels. Quand le texte dit « comité », « astreinte », « finance », tu joues **trois
protocoles solo**, sur artefacts **publics**. Modèle : la variante solo de
[11-LEADERSHIP-MENTORAT](../03-PILOTAGE/11-LEADERSHIP-MENTORAT/README.md).

Déclencheur : [16-DDD-CONTRATS](../02-CONSTRUCTION/16-DDD-CONTRATS/README.md) et tout
Boss qui parle d'une organisation.

## Protocole 1 : Comité d'architecture (45 min)

1. Tu publies un ADR d'une page (décision, options, chiffre, seuil de révision).
2. Tu joues le contradicteur : **trois** objections tirées de
   [09-CONTRADICTEUR.md](09-CONTRADICTEUR.md), dix lignes max, chiffre si coût ou dispo.
3. Tu publies `COMITE-<date>.md` : ADR + trois réponses + SHA du commit.
4. Preuve vérifiable : URL du fichier, pas « j'en IA parlé à un collègue ».

Échec : objection rhétorique sans mesure, ou ADR modifié en silence après coup.

## Protocole 2 : Direction financière (30 min)

1. Une ligne de `06A-BUDGET-CLOUD.md` (palier 10 000) + une ligne de
   `DECISION-ARBITRAGE.md`.
2. Tu rédiges la **question** que poserait quelqu'un qui paie : « pourquoi cet euro-là ? »
3. Tu réponds en une page : option retenue, option refusée **avec le chiffre du refus**,
   date de revisite.
4. Fichier : `FINANCE-<date>.md`. Même règle que S4 / addendum capstone.

Échec : total sans ligne, ou refus sans montant.

## Protocole 3 : Astreinte (un drill, pas un récit)

1. Tu t'imposes une fenêtre de 90 minutes un soir de semaine.
2. Tu **injectes** une panne
   ([07-injection_panne.md](../03-PILOTAGE/06-FIABILITE-SLO/07-injection_panne.md)).
3. Tu remplis `ASTREINTE-<date>.md` : heure d'alerte, hypothèse, geste, RTO chrono,
   décision de réveil (oui/non) avec le seuil.
4. Preuve : extraits de logs + horodatage. Pas de screenshot flou d'un dashboard vide.

Échec : tu as « imaginé » la panne.

## Ce que ça débloque

Les Boss, le contradicteur, le mentorat et le dossier unique peuvent parler d'entreprise
sans mentir : l'entreprise est un **protocole d'écriture**, reproductible par un tiers
qui ouvre ton dépôt.
