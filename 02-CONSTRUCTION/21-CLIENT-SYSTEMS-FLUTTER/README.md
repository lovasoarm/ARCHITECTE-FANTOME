---
stability: evolutif
acte: construire
noyau: oui
route: complete
---

# 21 : CLIENT SYSTEMS / FLUTTER : LE FRONT N’EST PAS UNE TÉLÉCOMMANDE

> **SCÈNE CRAZYDEVS : Prison Break :** Scofield ne construit pas juste un tunnel. Il connaît les murs, les rondes, les portes, le plan B et ce qui se passe si le téléphone disparaît. Un client sérieux, c’est pareil : réseau, état, identité, offline, reprise et observabilité font partie du système.

Ce module ne cherche pas à transformer l’apprenant en collectionneur de widgets Flutter. Il lui apprend à traiter le mobile/client comme une pièce d’un système distribué.

## Place dans le cerveau AF

```text
JS/TS + HTTP + API
      ↓
client Flutter
      ↓
état / cache / offline / auth
      ↓
contrats backend
      ↓
observabilité / sécurité / coût
      ↓
arbitrage architecture
```

Flutter est ici un **terrain d’application**. Les mécanismes durables restent : état, réseau, contrats, résilience, sécurité, observabilité et transfert.

## Parcours

- `00-PREREQUIS.md` : vérifier HTTP, async, API et états.
- `01-00-why-client-systems.md` : pourquoi un client est un système distribué miniature.
- `02-flutter-mental-model.md` : widgets, arbre, état, cycle de rendu et frontière UI/domain.
- `03-offline-sync.md` : cache local, synchronisation et conflits.
- `04-auth-network-security.md` : auth, tokens, retries et surfaces d’attaque côté client.
- `05-observability-performance.md` : latence perçue, traces, erreurs et budget de performance.
- `50-client-systems-minimini-projet.md` : construire un client survivant, sans corrigé.
- `95-challenge.md` : défendre la stratégie client.
- `96-boss-fight.md` : incident mobile sous changement de contrat API.
- `90-grimoire.md` : les invariants à retenir.
- `99-PORTAGE-MENTAL.md` : porter le raisonnement vers web/mobile natif.
- `99A-PONT.md` : rejoindre Platform Engineering / Pilotage.

## Règle anti-copie

Le mini-projet fournit des contraintes, un terrain de départ et des critères. Il ne fournit ni solution, ni branche `_solutions`, ni implémentation de référence.
