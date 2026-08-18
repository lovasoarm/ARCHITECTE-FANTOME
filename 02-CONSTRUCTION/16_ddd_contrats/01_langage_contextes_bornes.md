---
stability: intemporel
acte: construction
noyau: oui
---

# LANGAGE UBIQUITAIRE ET CONTEXTES BORNÉS

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
