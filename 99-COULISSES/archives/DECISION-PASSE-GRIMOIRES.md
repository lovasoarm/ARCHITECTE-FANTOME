---
stabilite: stable
acte: évaluer
---

# DECISION : LA PASSE AUTOMATIQUE SUR LES GRIMOIRES A ETE ANNULEE

## Ce que le script a fait

A la fin de la fusion des deux depots sources, un script a reecrit
mecaniquement la colonne « Limite » des tableaux de grimoire et a tente
d'echapper les pipes internes. Resultat mesure sur le depot v6.6 :

- 911 lignes de « Limite » portaient l'une de six phrases generiques,
  repetees mot pour mot, sans accents, sur des termes sans rapport entre eux
  (10 lignes sur 10 dans `03-PILOTAGE/07_cloud_foundations/grimoire.md`) ;
- 8 lignes avaient perdu la colonne « Analogies » entiere, son texte ayant
  fusionne avec la cellule voisine ;
- 7 fragments de code inline etaient devenus faux (`null \| \ / "defaut"`
  pour `||`), donc enseignaient une syntaxe qui n'existe pas.

Aucune de ces phrases n'existe dans les deux zips sources : c'est une
regression produite par la fusion, pas un heritage.

## Pourquoi c'etait une erreur

La colonne « Limite » est le seul endroit du parcours ou l'apprenant est
oblige de juger la frontiere de validite d'un modele. Une phrase unique
recopiee partout ramene le grimoire au niveau « reconnaissance de mots » et
discredite le dispositif « 2 analogies + 1 limite » y compris la ou il est
bien fait.

## Ce qui a ete refait

- Colonne « Limite » refaite terme par terme, avec
  `02-CONSTRUCTION/16_ddd_contrats/grimoire.md` comme etalon : la limite nomme
  le mecanisme technique precis par lequel l'analogie devient fausse et se
  termine par la consequence operationnelle.
  Ordre suivi : (1) grimoires des modules Staff neufs, (2) grimoires du bloc
  Epreuve, (3) grimoires herites.
- 8 cellules « Analogies » reconstruites a la main.
- 7 fragments de code restaures et re-echappes proprement.
- Tous les pipes internes de code inline echappes en `\|`.

## Ce qui empeche la recidive

Controles bloquants dans `outils/controle_livraison.mjs`
(`node outils/controle_livraison.mjs --strict` refuse la livraison) :

- aucune phrase de colonne « Limite » n'apparait plus de deux fois ;
- toute ligne de grimoire a exactement 5 colonnes ;
- aucun fragment de code inline de grimoire ne contient d'echappement
  orphelin.
