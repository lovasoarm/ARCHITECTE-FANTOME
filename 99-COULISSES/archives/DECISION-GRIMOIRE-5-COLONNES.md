---
stability: intemporel
acte: restituer
---

# DECISION : LE GRIMOIRE A CINQ COLONNES, SANS EXCEPTION

**Date :** 2026-08-17
**Portee :** les 62 fichiers `*grimoire*.md` du fil pedagogique, sans exception.
**Statut :** actee, executoire, verifiee mecaniquement.

## Le probleme

Le referentiel de style imposait quatre colonnes (Terme / Definition / Code / Analogie)
pour les modules de langage et cinq (avec Analogies et Limite) pour les modules
d'architecture. Le disque, lui, portait cinq colonnes partout. Deux regles coexistaient :
aucune ne faisait autorite. Un depot qui exige un ADR pour chaque choix de l'apprenant ne
peut pas laisser son propre gabarit derivier sans decision ecrite.

## La decision

Cinq colonnes partout : `| Terme | Définition | Code | Analogies | Limite |`.

## Pourquoi cinq et pas quatre

1. **Analogies (exactement deux).** Une analogie unique se confond avec le concept et
   devient fausse des qu'on la pousse. Deux analogies de domaines differents forcent
   l'apprenant a chercher ce qu'elles ont en commun : le concept lui-meme.
2. **Limite.** Un concept se juge sur le moment ou il cesse de s'appliquer. La colonne
   porte « ou l'analogie casse », qui est le coeur de la methode et exactement ce qu'un
   jury ou le contradicteur ira chercher.

Meme sur un mecanisme de langage, ces deux colonnes travaillent : c'est la ou les fausses
intuitions coutent le plus cher.

## Consequences

- `06-ANNEXES-TRANSVERSES/meta/_STYLE.md` ne decrit plus qu'un seul gabarit.
- Les en-tetes divergents (`Termes`, `Définition (max 2 lignes)`, `Code / Exemple`) sont
  ramenes a l'en-tete canonique.
- `99-COULISSES/outillage/controle_livraison.mjs` refuse la livraison si un grimoire
  porte un autre en-tete ou un autre nombre de colonnes.
