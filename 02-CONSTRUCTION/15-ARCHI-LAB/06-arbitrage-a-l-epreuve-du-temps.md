---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [constraints_injectees, decision_inversee]
anti_recipe_key: constraints_injectees+decision_inversee
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Arbitrage à l'épreuve du temps : mesurer, pas relire

Temps de lecture ~4 min

## Ce que ce fichier referme

Le challenge de ce niveau te fait déjà écrire deux ADR opposés sur une frontière de ton
projet fil rouge, puis trancher avec un critère mesurable. Ce que cet exercice-là ne peut
pas encore te donner, parce qu'il se joue le jour même de la décision : savoir si le
critère retenu a **tenu** une fois le code réellement en usage. Un arbitrage qui ne se
revisite jamais reste une opinion bien écrite, pas une décision d'ingénierie.

## Ce que tu dois faire

Attends d'avoir au moins deux semaines de recul sur la décision tranchée dans ton
`95-challenge.md` (ou choisis une décision de frontière plus ancienne de ton projet fil rouge
si tu en as une). Puis écris `docs/ARBITRAGE-REVISITE.md` avec, chiffré :

1. **Le critère annoncé au moment du choix**, cité tel quel depuis ton ADR retenu (nombre
   de déploiements couplés, taille d'équipe, budget de latence, coût de la compensation...).
2. **Sa valeur mesurée aujourd'hui**, avec la méthode de mesure (pas une impression :
   un `git log` compté, un temps chronométré, un compteur de commits touchant les deux
   modules à la fois).
3. **L'écart entre les deux**, dans un sens ou dans l'autre. Un écart nul est un résultat
   valide s'il est mesuré, pas supposé.
4. **Un coût que tu n'avais pas anticipé** au moment de trancher, même minime. S'il n'y en
   a vraiment aucun après recherche honnête, écris pourquoi tu penses que ta décision
   initiale avait déjà anticipé le bon niveau de risque.
5. **Ce que tu ferais différemment** si tu retranchais cette décision aujourd'hui avec ces
   chiffres en main : ou explicitement rien, si les chiffres confirment le choix.

## Ce qui invalide cet exercice

Une revisite écrite le même jour que la décision initiale : elle n'a rien à mesurer, elle
ne fait que répéter l'ADR avec d'autres mots. Un écart constaté mais non chiffré (« ça a
plutôt bien marché ») : c'est le même défaut que le critère non mesurable que le challenge
interdisait déjà à l'écriture de l'ADR.

## Lien avec le palier terminal

Cet exercice est une version courte, ciblée sur une seule frontière, du protocole de
[revisite datée](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/04-revisite_datee.md) que tu
retrouveras sur l'ensemble de ton dossier Staff. Le faire une fois ici, sur une décision
locale et encore fraîche, rend le protocole concret avant de l'appliquer à l'échelle d'un
système entier.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
