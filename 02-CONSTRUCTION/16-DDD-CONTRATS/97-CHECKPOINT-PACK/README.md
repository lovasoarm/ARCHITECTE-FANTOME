---
stability: intemporel
acte: construction
noyau: renfort
---

# PACK DE VÉRIFICATION : MODULE 16

Ce dossier ne s'ouvre qu'après le challenge et le boss fight.

- `criteres.md` : la grille de passage, à cocher soi-même puis à faire contredire.

## Procédure

1. Tu coches seul, honnêtement.
2. Tu fais relire par un contradicteur (humain, ou la passe écrite du contradicteur).
3. Tout critère coché sans preuve **liée par un chemin de fichier** est décoché d'office.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Critères de passage : module 16](97-criteres.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **notification fiable** : Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables.
