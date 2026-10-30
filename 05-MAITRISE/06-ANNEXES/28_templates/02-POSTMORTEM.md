---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# POSTMORTEM : {titre}

<!-- AF-DIAGRAM:incident -->

```text
Signal
  │
  ▼
Triage ─► Mitigation ─► Recovery ─► Postmortem
  ▲                                  │
  └────────────── learning ─────────┘
```

La gestion d’incident transforme un signal de panne en restauration puis en apprentissage durable.

Temps de lecture ~5 min

## Contexte

Quoi, quand, où. Qui a été impacté.

## Timeline

- HH:MM : événement 1
- HH:MM : événement 2

## Cause racine

Pas la cause proximale. La vraie.

## Impact

Utilisateurs, revenu, réputation. Chiffré si possible.

## Ce qui a bien marché

Vraiment. Nomme.

## Ce qui a mal marché

Vraiment. Nomme.

## Actions correctives

- [ ] Action 1 : owner : deadline
- [ ] Action 2 : owner : deadline

## Protection des données

Toute donnée réelle (users, clients, endpoints internes) doit être anonymisée. Un post-mortem circule.

Check de publication : voir `PUBLICATION_CHECKLIST.md` dans ce même dossier.

<!-- AF-P0-2026-10-30: missing_practice -->

### Pratique autonome : production attendue

À partir de « POSTMORTEM : {titre} », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
