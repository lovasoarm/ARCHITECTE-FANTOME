---
stability: intemporel
acte: construction
noyau: oui
---

# CONTRATS : VERSIONNER, DÉPRÉCIER, ÉTEINDRE

Temps de lecture ~9 min

## 1) UN CONTRAT, C'EST QUOI

Le triplet : **forme** (schéma d'entrée/sortie), **sémantique** (ce que les champs veulent dire),
**garanties** (codes d'erreur, idempotence, ordre, délai). La forme seule ne suffit jamais.

## 2) CE QUI CASSE ET CE QUI NE CASSE PAS

| Changement | Casse ? |
| --- | --- |
| ajouter un champ optionnel en sortie | non, si les clients ignorent l'inconnu |
| rendre un champ optionnel obligatoire en entrée | oui |
| resserrer un format (`string` → `enum`) | oui |
| élargir un enum en sortie | oui, en pratique (les `switch` exhaustifs cassent) |
| renommer un champ | oui, toujours |

Règle : **on ajoute, on ne retire pas, on n'attribue jamais un nouveau sens à un ancien nom.**

## 3) LA MIGRATION EN QUATRE TEMPS, DATÉE

1. **Annonce** : v2 publiée, v1 marquée dépréciée, date d'extinction écrite dans la doc et dans
   l'en-tête `Deprecation` / `Sunset` de la réponse.
2. **Double service** : les deux versions vivent. Tu mesures le trafic v1 par client.
3. **Rappel** : à trafic v1 résiduel, tu contactes les clients restants, chiffres en main.
4. **Extinction** : date tenue. Une extinction non datée n'arrive jamais.

## 4) LE TEST DE CONTRAT EST LA SEULE PREUVE

Un jeu de cas exécutable, versionné à côté du contrat, rejoué en CI des deux côtés.
Le contrat qui n'est pas exécutable est une intention.

## Exercice (25 min)

Sur ton fil rouge : publie `contrats/v1.md` et `contrats/v2.md`, ajoute l'en-tête `Sunset`, écris
`ADR/0xx-rupture-contrat.md` avec la date d'extinction et le nom du client le plus exposé.
