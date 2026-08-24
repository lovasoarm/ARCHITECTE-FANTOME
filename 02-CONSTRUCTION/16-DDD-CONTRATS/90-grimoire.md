---
stability: intemporel
acte: construction
noyau: oui
type: grimoire
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Grimoire : DDD et contrats

<!-- AF-DIAGRAM:ddd -->

```text
┌────────────────────┐     ┌────────────────────┐
│ Context A           │     │ Context B          │
│ Order / Customer    │◄───►│ Billing / Payment  │
└────────────────────┘     └────────────────────┘
          ▲                          ▲
          └──── contrats explicites ─┘
```

Les bounded contexts isolent des modèles locaux et relient les domaines par des contrats explicites.

Temps de lecture ~2 min

| Terme             | Définition                                               | Code                                   | Analogies                                         | Limite                                     |
| ----------------- | -------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| Contexte borné    | Un mot, une définition, un territoire                    | `Planning.Client ≠ Facturation.Client` | panneau de frontière / fiche de dictionnaire      | Un dossier Git n'est pas un contexte       |
| Traduction        | Toute frontière s'explicite, on ne partage pas le modèle | `toBillingCustomer(planningClient)`    | interprète officiel / adaptateur secteur          | La traduction a un coût (latence, panne)   |
| Contrat           | On ajoute, on ne retire pas sans date d'extinction       | `v1 jusqu'au 2026-12-31`               | avenant / règlement réédité                       | Une dépréciation sans date n'arrive jamais |
| CQRS marche 1     | Deux modèles, une transaction, 0 lag                     | `writeModel + readModel same TX`       | deux files à la poste / deux guichets d'un bureau | Ce n'est pas un broker                     |
| Cohérence à terme | Promesse métier sur le lag de projection                 | `p95 lag < 30s`                        | courrier posté / train affiché en retard          | Une vue vide sans étiquette est un bug     |
| Event-driven      | Émettre sans connaître les écouteurs                     | `bus.emit('ReservationCreated')`       | signal d'alerte / passe sans regarder le receveur | Ce n'est pas CQRS (voir 02b)               |
