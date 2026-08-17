---
stability: intemporel
acte: évaluer
---

> **Document historique, ne pas suivre.** Archivé le 2026-08-16. Trace historique du prompt
> de fusion v3, celui qui a produit l'arborescence à six paliers depuis ProjectFunny et
> MyFunnyJS. Ce n'est pas la carte à suivre : ce qui fait autorité aujourd'hui, c'est le
> [README.md](../../README.md) racine et le
> [DEPENDENCY_LEDGER.md](../../00-SOCLE/03_referentiel/DEPENDENCY_LEDGER.md). Conservé ici
> pour rendre la fusion traçable dans ses règles et pas seulement dans ses effets, voir
> [archives/README.md](README.md).

# ARCHIVE : prompt de fusion v3

Acte attendu : évaluer.

## Statut de fidélité

Texte intégral reconstitué depuis ses traces sur disque : nommage des paliers, gabarit de
module, invariants typographiques, ordre de progression. Les points que la trace ne permet
pas de trancher sont notés `trace partielle`.

## Objectif donné à la fusion

Produire un parcours unique, linéaire, jouable en solo, menant d'un développeur autonome à
un Staff / Principal Engineer à forte dimension Solutions Architect. Un seul fil, six
paliers, aucune duplication de contenu entre les deux dépôts d'origine.

## Invariants imposés

1. Un fichier, un acte cognitif déclaré : restituer, appliquer, transférer, évaluer, produire.
2. Aucun exercice sans verdict binaire vérifiable seul.
3. Zéro emoji, zéro sélecteur de variation, zéro tiret cadratin, accents obligatoires.
4. Aucun nom de fichier avec espace, préfixes numériques continus par module.
5. Tout module du fil porte le gabarit complet : `00_prereq_check`, `00_why_*`, numérotés,
   `challenge`, `boss-fight`, `grimoire`, `EXO_JEUNE_IA`, son dossier de vérification, `README`.
6. Tout chiffre porte sa date de relevé et sa source.
7. La fusion doit être invisible de l'intérieur : aucun renvoi au dépôt d'origine dans le fil.
8. La fusion doit rester traçable de l'extérieur : les documents remplacés vont en archives
   avec la mention historique, jamais supprimés en silence.

## Règles de découpe des deux sources

- ProjectFunny fournissait la progression et les paliers de projet.
- MyFunnyJS fournissait la densité technique par domaine.
- En cas de recouvrement, la version qui rend l'acquis vérifiable seul l'emporte.
- Un contenu sans exercice vérifiable est absorbé dans un grimoire, jamais gardé tel quel.
  `trace partielle` : le seuil de longueur au-delà duquel un contenu devenait grimoire.

## Ce que le prompt v3 n'a pas demandé

- Le verrouillage automatisé de ses propres invariants. C'est ce que
  [outils/controle_livraison.mjs](../../outils/controle_livraison.mjs) apporte depuis.
- L'entraînement de la décision dans la durée, ajouté depuis en clôture du dernier palier.
