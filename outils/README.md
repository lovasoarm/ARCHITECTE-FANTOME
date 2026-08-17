# outils

Deux verrous de qualite, a lancer avant toute livraison du repo. Ils ne demandent aucune dependance : Node seul suffit.

```bash
node outils/verifier_numerotation.mjs .
node outils/verifier_liens.mjs . --ecrire
node outils/generer_perissabilite.mjs
node outils/controle_livraison.mjs --strict
```

## verifier_numerotation.mjs

Interdit qu'un module soit cite par son ancienne numerotation MyFunnyJS seule. Un module se cite toujours avec son prefixe de palier.

- Refuse : `22_security`, `30_mini_projects`, `31_annexes`
- Exige : `03-PILOTAGE/04_security`, `02-CONSTRUCTION/02_mini_projects`, `05-MAITRISE/06_annexes`

Le script sort en code 1 des la premiere occurrence, avec le fichier et la ligne fautive.

## verifier_liens.mjs

Rejoue le controle des liens relatifs : chemin resolu depuis le dossier du fichier source, ancre retiree, blocs de code et code inline exclus. Sort en code 1 si un seul lien ne resout pas.

Avec `--ecrire`, il produit la preuve d'exhaustivite [VERIFICATION_LIENS.md](../VERIFICATION_LIENS.md) a la racine : fichiers parcourus, liens trouves, liens resolus, liens casses. Le perimetre est le depot entier, jamais un echantillon.

## generer_perissabilite.mjs

Regenere `05-MAITRISE/06_annexes/21_PERISSABILITE_INDEX.md` depuis les en-tetes `stability:` du depot. Avec `--verifier`, ne reecrit rien et sort en code 1 si l'index commite differe de l'index regenere.

## controle_livraison.mjs

Refuse la livraison au premier controle en echec. Le drapeau `--strict` est accepte : il n'existe pas de mode indulgent. Controles ajoutes au bloc C : tout tableau portant un montant en euros doit etre precede de sa ligne `Releve le <date>, chez <fournisseur>, unite <unite>, URL <page>`, et l'index de perissabilite doit etre a jour.

Controles ajoutes au bloc F : la preuve d'exhaustivite des liens doit couvrir 100 % des `.md` du depot, afficher fichiers parcourus / liens trouves / liens resolus, et le depot ne doit porter aucun lien relatif casse.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `outils` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.


<!-- CONTENU-DOSSIER:fin -->

## generer_index_dossiers.mjs

Ecrit dans chaque README de dossier la section « Contenu du dossier », qui cite tous les fichiers et sous-dossiers. Garantit qu'aucun `.md` n'est orphelin. Avec `--verifier`, ne reecrit rien et sort en code 1 si un index est perime.

Controles ajoutes au bloc G : zero document orphelin, zero espace dans un nom de fichier, aucune phrase de colonne « Limite » repetee plus de deux fois.

## controle_typographie.mjs

Controle 22 (bloc B2). Trois regles gelees, sortie `fichier:ligne` : 0 emoji, 0 selecteur de variation (U+FE0E / U+FE0F), 0 tiret cadratin ni demi-cadratin. Usage : `node outils/controle_typographie.mjs .`

## controle_numerotation_continue.mjs

Controle 23 (bloc B4). Dans tout dossier de module (celui qui porte un `00_why_*.md`), les prefixes numeriques demarrent a 00 et se suivent sans trou ; les numeros reserves 90 a 99 sont hors perimetre. Usage : `node outils/controle_numerotation_continue.mjs .`
