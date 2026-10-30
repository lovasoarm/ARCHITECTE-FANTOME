---
stability: intemporel
acte: comprendre
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

# Drill : Go

Temps de lecture ~5 min

Objectif P6 : montrer que ta méthode ce parcours survit au changement de langage.

Un bug de channel Go où un observer manque des events. Ton job : identifier si c'est un problème de buffered vs unbuffered, de goroutine leak, ou de close prématuré.

- Écris ton diagnostic **avant** de tester.
- Trace le parallèle avec `EventEmitter` en JS : où est l'équivalent du buffer ?

## Debrief à écrire (obligatoire)

- Qu'est-ce qui a été **identique** à JS ?
- Qu'est-ce qui a été **différent** ?
- Qu'est-ce que tu retiens pour la prochaine fois ?

<!-- AF-P0-2026-10-30: missing_example -->

### Exemple travaillé : cas métier

Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Drill : Go » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
