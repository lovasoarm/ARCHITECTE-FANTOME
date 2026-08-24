---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_contexte, solution_concurrente]
anti_recipe_key: changement_contexte+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Modèles de coût : l'unité avant le prix

Temps de lecture ~9 min

## 1) LES SIX UNITÉS QUI COUVRENT 90 % D'UNE FACTURE

| Poste                  | Unité facturée                  | Ce qui la fait exploser                               |
| ---------------------- | ------------------------------- | ----------------------------------------------------- |
| Calcul                 | seconde-Go, ou heure d'instance | processus qui ne s'éteint jamais                      |
| Stockage objet         | Go-mois + requêtes              | petits fichiers en très grand nombre                  |
| Base managée           | heure + Go + IOPS               | index manquants, sauvegardes gardées à vie            |
| Sortie réseau (egress) | Go sortant                      | médias non mis en cache, allers-retours inter-régions |
| File / événements      | million de messages             | boucles de réessai mal bornées                        |
| Journalisation         | Go ingéré + rétention           | journal en niveau debug laissé en production          |

## 2) LA MÉTHODE DE CHIFFRAGE, EN CINQ LIGNES

1. Choisis **une** action utilisateur représentative (« consulter une réservation »).
2. Compte ce qu'elle consomme : requêtes, Ko sortants, ms de calcul, écritures.
3. Multiplie par le trafic aux trois paliers : 100, 10 000, 1 000 000 d'utilisateurs actifs.
4. Ajoute les coûts fixes (base, sauvegardes, journaux, domaine, surveillance).
5. Écris l'hypothèse **à côté** du nombre. Un chiffrage sans hypothèse est ininterprétable.

```txt
Consultation : 1 requête API + 40 Ko sortants + 60 ms calcul + 1 lecture base
10 000 utilisateurs x 12 consultations/jour x 30 j = 3,6 M requêtes/mois
Egress : 3,6 M x 40 Ko = 144 Go/mois
```

## 3) LES TROIS ERREURS DE DÉBUTANT

- Chiffrer au prix affiché sans compter les requêtes (le stockage à 0,02 €/Go-mois coûte souvent plus
  cher en requêtes qu'en octets).
- Oublier la rétention : garder 90 jours de journaux multiplie par 90 un coût que tu crois quotidien.
- Oublier l'environnement de test, qui tourne 24 h/24 pour rien.

## 4) LES TROIS LEVIERS QUI MARCHENT VRAIMENT

Cache au bord (coupe l'egress), rétention courte (coupe les journaux et sauvegardes), extinction des
environnements hors usage (coupe le calcul). Dans cet ordre.

## Exercice (25 min)

Chiffre ton action représentative aux trois paliers. Écris les hypothèses. Rends la section 2 de
`06A-BUDGET-CLOUD.md`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
