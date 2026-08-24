---
stability: evolutif
acte: appliquer
---

> **SCÈNE CRAZYDEVS : Garo :** si la prod et Git racontent deux histoires différentes, tu n’as pas deux vérités : tu as une prochaine panne qui cherche son heure.

# GitOps, dérive et réversibilité

Étudie :

- état désiré vs état observé ;
- drift ;
- revue des changements ;
- rollback ;
- secrets hors Git ;
- séparation code/application/infrastructure.

## Drill

Introduis une différence manuelle dans l’environnement. Ton défi : détecter la dérive, attribuer la cause, décider si on restaure Git ou si l’état Git était faux.
