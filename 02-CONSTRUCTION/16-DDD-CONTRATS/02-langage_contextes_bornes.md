---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Langage ubiquitaire et contextes bornés

Temps de lecture ~9 min

## 1) LE LANGAGE UBIQUITAIRE

Règle : **un mot du code = un mot que le métier prononce**. Pas de traduction mentale.
Si le métier dit « dossier », ta classe ne s'appelle pas `UserRecord`.

Méthode en trois passes, applicable seul :

1. Relis dix messages réels (tickets, mails, specs). Surligne chaque nom commun métier.
2. Pour chaque nom, écris une définition d'une ligne. Les mots dont tu écris deux définitions sont des
   **frontières déguisées**.
3. Renomme dans le code, en un commit par mot, jamais deux mots dans le même commit.

## 2) LE CONTEXTE BORNÉ

Un contexte borné est le territoire à l'intérieur duquel une définition tient.
« Commande » côté vente = une intention d'achat. « Commande » côté logistique = un colis à préparer.
Deux définitions, donc deux contextes, donc une traduction au passage.

```txt
[Vente]  Commande{lignes, montant, client}
            |  traduction explicite (anti-corruption)
            v
[Logistique] Ordre{colis, poids, adresse}
```

La couche de traduction n'est pas de la plomberie : c'est le seul endroit où le malentendu est visible.

## 3) LA CARTE DE CONTEXTES

Trois relations suffisent pour 95 % des cas :

- **Client / fournisseur** : l'aval demande, l'amont s'engage sur un contrat.
- **Conforme** : l'aval subit le modèle de l'amont (souvent un SaaS externe).
- **Anti-corruption** : l'aval traduit pour se protéger du modèle de l'amont.

## 4) LE COÛT D'UNE FRONTIÈRE

Chaque frontière coûte : une traduction, une latence, un mode de panne, un déploiement coordonné.
Écris ce coût. Une frontière que tu ne sais pas justifier par un mot ambigu ou une équipe distincte
est une frontière à supprimer.

## Exercice (25 min)

Sur ton fil rouge : liste 12 noms métier, écris leur définition, identifie les deux mots qui en ont
deux. Dessine la carte de contextes en ASCII. Rends `ADR/0xx-contextes-bornes.md`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
