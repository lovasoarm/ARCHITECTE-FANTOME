---
stability: evolutif
acte: construction
noyau: renfort
---

# EXO JEUNE IA : L'AGENT QUI DÉCOUPE TROP

Durée : 45 min.

## Le prompt donné à l'agent

« Découpe ce domaine en contextes bornés et propose l'architecture. »
Domaine fourni : un outil de réservation de salles (utilisateurs, salles, réservations, factures).

## La sortie de l'agent (extrait, à auditer)

```txt
Contextes proposés : Utilisateur, Authentification, Profil, Salle, Équipement,
Disponibilité, Réservation, Annulation, Facturation, Paiement, Notification.
Un microservice par contexte. Communication par événements. Base par service.
```

## Ton travail

1. **Compte les frontières** et le coût mensuel implicite (11 déployables).
2. **Trouve les faux contextes** : ceux qui ne sont qu'un mot du même contexte (indice :
   Réservation / Annulation ; Utilisateur / Profil).
3. **Trouve le vrai contexte manquant** : celui que l'agent n'a pas vu parce qu'il n'apparaît pas
   comme un nom dans l'énoncé (indice : la tarification n'est pas la facturation).
4. Réécris la carte en **trois** contextes, avec pour chacun : le mot ambigu qui justifie la frontière,
   et la traduction au passage.
5. Écris les deux lignes de prompt qui auraient évité la sortie initiale.

## Critère

Un agent produit du plausible. La compétence auditée ici est de **retirer**, pas d'ajouter.
