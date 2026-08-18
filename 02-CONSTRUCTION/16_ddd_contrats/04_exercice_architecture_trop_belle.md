---
stability: intemporel
acte: construction
noyau: oui
type: exercice
---

# EXERCICE : REFUSER UNE ARCHITECTURE TROP BELLE

Durée : 45 min. Rendu écrit obligatoire.

## Le cas

On te propose, sur ton fil rouge : event sourcing complet, un service par contexte borné (six
services), un bus de messages, une base par service, et CQRS avec vues asynchrones.
Le proposant est compétent et sincère. La proposition est *correcte* dans l'absolu.

## Ce qu'on te demande

Écrire une page `ADR/0xx-refus-architecture.md` qui **refuse**, sans mépris, avec des nombres.

Structure imposée :
1. Ce que la proposition résout réellement (sois honnête, il y a du vrai).
2. Le coût, en trois lignes chiffrées : jours-homme de mise en place, surcoût mensuel d'infrastructure
   (tiré de ton `BUDGET-CLOUD.md`), nombre de nouveaux modes de panne.
3. Le seuil déclencheur : « nous adopterons X quand Y dépassera Z » (une métrique, un nombre, un lieu
   de mesure).
4. Ce que tu fais à la place cette semaine, et le gain attendu.
5. La date de réexamen.

## Critère de réussite

Un lecteur qui n'était pas dans la discussion doit pouvoir dire : « le refus est réversible, il a une
condition de sortie ». Un refus sans seuil déclencheur est un refus idéologique : recale-toi seul.
