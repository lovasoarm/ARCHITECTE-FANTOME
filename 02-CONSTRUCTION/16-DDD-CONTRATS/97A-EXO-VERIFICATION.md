---
stability: stable
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# EXO : Vérifier une IA séduisante

stability: evolutif
acte: construction
noyau: renfort

---

# EXO IA séduisante : l'agent qui découpe trop

Temps de lecture ~2 min

Durée : 45 min.

## Le consigne donné à l'agent

« Découpe ce domaine en contextes bornés et propose l'architecture. »
domaine fourni : un outil de réservation de salles (utilisateurs, salles, réservations, factures).

# EXO : Vérifier une IA séduisante

```txt
Contextes proposés : Utilisateur, Authentification, Profil, Salle, Équipement,
Disponibilité, Réservation, Annulation, Facturation, paiement, Notification.
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
5. Écris les deux lignes de consigne qui auraient évité la sortie initiale.

## Critère

Un agent produit du plausible. La compétence auditée ici est de **retirer**, pas d'ajouter.
