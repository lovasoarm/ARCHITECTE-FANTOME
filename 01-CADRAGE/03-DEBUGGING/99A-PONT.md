---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# PONT : de chasser un bug à l'organiser en amont à la gestion d'erreur

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `01-CADRAGE/03-DEBUGGING` et `01-CADRAGE/04-ERROR-HANDLING`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

Debug = tu réagis après. Error handling = tu prévois avant. Le passage change ta posture : tu arrêtes d'être pompier, tu deviens architecte de l'échec.

## CE QUE TU MAÎTRISES DÉJÀ

- Reproduire un bug de façon déterministe.
- Écrire une hypothèse avant d'éditer.
- Lire une stack trace jusqu'au frame utile.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Erreur attendue** : une condition prévue (fichier absent, réseau coupé), traitée comme un cas normal.
- **Erreur inattendue** : une invariante brisée, un bug, doit crasher fort.
- **Fail loud** : logger et lever tout de suite, pas silencieusement.
- **Domain error** vs **infrastructure error** : deux natures, deux traitements.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Vouloir `try/catch` partout. Un `catch` qui avale l'erreur sans agir masque un bug qu'un vrai debug aurait révélé en 5 min. Le bon `catch` a un plan.

## EXERCICE-CHARNIÈRE (5 min chrono)

Regarde ce code :

```js
try {
  JSON.parse(input);
} catch (e) {}
```

Nomme les 3 informations que tu perds. Puis écris une version qui distingue "input malformé attendu" et "vraie surprise".

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Dans Kintana, écris un scénario d’incident reproductible, capture la preuve avant correction et ajoute le test qui aurait empêché le retour du défaut. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
