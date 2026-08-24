---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Choisir un fournisseur : la grille, et la porte de sortie

Temps de lecture ~8 min

## 1) LA GRILLE À SEPT CRITÈRES

| Critère                   | Question précise                                    | Poids |
| ------------------------- | --------------------------------------------------- | ----- |
| Coût à l'échelle visée    | facture aux trois paliers, egress inclus            | 3     |
| Unités facturées lisibles | sais-tu prédire la facture à ±20 % ?                | 2     |
| Empreinte de dépendance   | combien de services propriétaires sans équivalent ? | 3     |
| Coût de sortie            | prix et délai pour tout rapatrier (egress total)    | 3     |
| Fiabilité publiée         | SLA réel, historique d'incidents consultable        | 2     |
| Conformité / localisation | où sont les données, sous quelle juridiction        | 2     |
| Compétence disponible     | ce que tu sais déjà opérer seul à 3 h du matin      | 1     |

## 2) LA RÈGLE DE LA PORTE DE SORTIE

Avant de signer : écris le coût de sortie. Combien de Go à faire sortir, à quel prix, en combien de
jours, et quels services n'ont **aucun** équivalent ailleurs. Si tu ne sais pas l'écrire, tu ne choisis
pas un fournisseur, tu en épouses un.

## 3) DÉPENDANCE ACCEPTABLE ET DÉPENDANCE SUBIE

Acceptable : un service propriétaire derrière une interface de ton code, remplaçable en une semaine.
Subie : le modèle de données de ton domaine exprimé dans le format d'un service propriétaire.
La frontière est la même que celle du module DDD : traduis à la frontière.

## 4) DÉCIDER PAR ÉCRIT

Un ADR `choix-fournisseur.md` : les trois candidats, la grille remplie avec **tes** chiffres relevés,
le choix, le coût de sortie, et la date de réexamen (12 mois).

## Exercice (25 min)

Remplis la grille pour deux fournisseurs sur ton fil rouge, avec des prix relevés par toi et datés.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
