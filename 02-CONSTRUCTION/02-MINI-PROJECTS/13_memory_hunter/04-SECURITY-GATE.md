---
stability: intemporel
gate: bloquante
acte: comprendre
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Security Gate : 13_memory_hunter

Temps de lecture ~2 min

> **Gate bloquante**. Ce mini-projet ne peut être marqué **publié** tant que
> la checklist OWASP Top 10 ci-dessous n'est pas remplie **et signée**.

> **Rejouer avant POSTMORTEM** à chaque livraison.

## Procédure

1. Copie [`../97-templates/05-SECURITY-GATE.md`](../97-templates/05-SECURITY-GATE.md) dans ce dossier sous le nom `SECURITY_GATE_FILLED.md`.
2. Renseigne **chaque** item A01→A10 avec une **preuve** (fichier:ligne, test, config, log). `N/A` n'est autorisé qu'avec une phrase de motivation.
3. Signe (`nom : date`) en fin de fichier.
4. Ajoute le lien vers `SECURITY_GATE_FILLED.md` dans le `README.md` du projet, section **Publication**.

## Règle de blocage

- Un item sans preuve **ni** motivation → gate **échouée**, projet **non publiable**.
- Une preuve pointant vers un fichier inexistant → gate **échouée**.
- Pas de signature → gate **échouée**.

## Rappel

La checklist OWASP existe pour être **appliquée**, pas récitée. Un mini-projet
sans `SECURITY_GATE_FILLED.md` signé ne compte pas dans ton portfolio, quelle
que soit la qualité du code.
