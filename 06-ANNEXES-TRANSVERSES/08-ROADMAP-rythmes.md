---
stability: intemporel
acte: annexe
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

> **CrazyDevs : mission de rang S :** avant de foncer sur la solution, identifie ce qui fait réellement échouer la mission. Le piège est souvent dans la question, pas dans la réponse.

# 06 : Roadmap : trois rythmes (vues facultatives de planification)

> **La formation complète est sans durée prédéterminée.** Voir [FORMATION-COMPLETE-INGENIERIE.md](../FORMATION-COMPLETE-INGENIERIE.md). Les rythmes Sprint/Saison/Marathon sont des exemples d’organisation personnelle ; le Sprint 16 semaines / 192 h reste un sous-ensemble facultatif et ne doit pas remplacer les gates de maîtrise, la profondeur ou l’expérience terrain.

Temps de lecture ~2 min

Choisis un rythme. Un parcours irrégulier coûte plus cher qu'un parcours lent.

Carte : [03-the-map.md](../00-SOCLE/02-PROLOGUE/03-the-map.md).
Ordre détaillé : [04A-CARTE-DU-PARCOURS.md](04A-CARTE-DU-PARCOURS.md).

## SPRINT : 12 h / semaine

**Exemple facultatif : route CORE vers des preuves initiales de préparation à des responsabilités élargies, 16 semaines / 192 h planifiées. Ce n’est pas une préparation Staff certifiée ni la route complète.** Le Mode Survie reste disponible comme vue accélérée (~6 semaines), mais il réutilise les mêmes niveaux, Boss et preuves ; il ne constitue pas une seconde progression. La profondeur additionnelle reste dans le corpus sans être obligatoire pendant le sprint.

La règle n’est plus « terminer le maximum ». La règle devient : **produire les preuves CORE, réussir les transferts, puis ouvrir DEPTH selon les faiblesses observées**.

## SAISON : 6 h / semaine

Un module tous les 7 à 10 jours. Recommandé avec un emploi. Le capstone prend un mois.

## MARATHON : 4 h / semaine

Plancher. 2 h lire / 2 h produire. En dessous : droit d'entrée à chaque reprise.

## Route CORE

<!-- AF-DIAGRAM:core -->

```text
16 semaines
│
├─ pratique / projets ───────── 80 h
├─ compréhension active ────── 48 h
├─ transfert / perturbations ─ 32 h
├─ rappel ───────────────────── 16 h
└─ décision / défense ───────── 16 h
                               ─────
                               192 h
```

La route CORE planifie 192 heures pour une progression intensive et sélective ; c'est une hypothèse à calibrer lors d'un pilote, pas une durée mesurée valable pour tous les profils. Aucun critère de compétence ne doit être contourné pour tenir le calendrier. DEPTH/VAULT reste distinct du parcours obligatoire.

Le détail opérationnel est dans [19A-ROUTE-CORE-16-SEMAINES.md](19A-ROUTE-CORE-16-SEMAINES.md). Les 19 projets sont cartographiés dans [25-CORE-MINI-PROJECT-MAP.md](25-CORE-MINI-PROJECT-MAP.md).

Chaque semaine : 3 h compréhension active + 5 h pratique + 2 h ambiguïté/transfert + 1 h rappel + 1 h journal de décision.

## Jalons (paliers réels, pas « 6 paliers »)

```text
SOCLE     : environnement + premières fonctions testées
CADRAGE   : problème, coupe MVP, fil rouge
NIVEAU 2  : mini-projets + tests + BOSS-1..6
2bis      : ADR, API, CQRS chiffré
PILOTAGE  : BUDGET, SLO, injection de panne, DECISION-ARBITRAGE
EPREUVE   : capstone + addendum + double dérive
MAITRISE  : dossier unique sous contradiction
```

Changer de rythme : une ligne datée dans `JOURNAL.md`, pas une nouvelle architecture de
parcours.
