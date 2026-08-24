---
stability: intemporel
gate: bloquante
acte: comprendre
---

> ### SCÈNE CRAZYDEVS : Walking Dead
>
> Le système est maintenant ton camp de survivants : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# Security Gate : 03_walking_dead_protocol

Temps de lecture ~2 min

> **Gate bloquante**. Ce mini-projet ne peut être marqué **publié** tant que
> la checklist OWASP Top 10 ci-dessous n'est pas remplie **et signée**.

> **Rejouer avant POSTMORTEM** à chaque livraison.

## Procédure

1. Copie [`../97-templates/06-SECURITY_GATE_TEMPLATE.md`](../97-templates/05-SECURITY-GATE.md) dans ce dossier sous le nom `SECURITY_GATE_FILLED.md`.
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
