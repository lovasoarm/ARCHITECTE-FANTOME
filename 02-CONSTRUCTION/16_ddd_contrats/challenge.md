# CHALLENGE : LE DÉCOUPAGE QUI TIENT SOUS PRESSION

Un découpage se juge le jour où quelqu'un te demande un changement que tu n'avais pas prévu. Ce challenge simule ce jour-là, sur ton propre projet fil rouge. Compte 25 minutes, chrono lancé, sans IA.

## Le contexte narratif

Ton commanditaire revient de réunion. Il ne veut pas d'une nouvelle fonctionnalité : il veut que l'existant se comporte autrement pour une catégorie d'utilisateurs qu'il vient d'inventer ce matin. Il t'annonce ça un vendredi, comme Hank annonce une mauvaise nouvelle dans Breaking Bad : sans préavis, et en pensant que c'est un détail.

## Ce que tu produis

1. La carte ASCII de tes contextes bornés, avant le changement.
2. La liste des contextes que le changement touche réellement, avec la preuve : quel champ traverse quelle frontière.
3. La même carte, après.
4. Trois lignes de verdict : ton découpage a-t-il absorbé le changement dans un seul contexte, ou a-t-il propagé la modification dans trois endroits.

## Barème honnête

- Un seul contexte touché : ton critère de coupe suit le métier.
- Deux contextes touchés avec un contrat modifié et une note de migration : acceptable, tu paies ce que tu as choisi.
- Trois contextes ou plus touchés : ton découpage suit encore les couches techniques. Refais l'exercice 1 du fichier [01_langage_contextes_bornes.md](01_langage_contextes_bornes.md) avant d'aller plus loin.


## Deuxième consigne : CQRS dans deux registres, dans le même fichier de rendu

CQRS est le concept de ce module où l'écart entre le jargon et la compréhension réelle est le
plus grand : on peut le défendre en vocabulaire pendant dix minutes sans jamais dire ce qu'il
coûte. Tu écris donc les deux versions, l'une sous l'autre, dans le même fichier de rendu que la
carte ci-dessus.

**Registre 1 : à un enfant de cinq ans, trois phrases, zéro terme technique.** Le mécanisme et
son coût. Interdits : lecture, écriture au sens technique, projection, cohérence à terme, modèle,
commande au sens CQRS, requête, événement. Si tu ne peux pas dire le coût sans jargon, tu n'as pas
compris le coût.

**Registre 2 : devant un CTO qui préfère garder un CRUD.** Cinq phrases maximum, avec deux
chiffres obligatoires et sourcés : un chiffre de lecture (volume de lectures rapporté au volume
d'écritures sur ton fil rouge) et un chiffre de cohérence à terme (délai maximal accepté entre
l'écriture et la lecture correspondante, en secondes, et ce qui casse au-delà). Tu nommes aussi
le cas où le CTO a raison, c'est-à-dire le seuil en dessous duquel CQRS te coûte plus qu'il ne te
rapporte.

La méthode de passage d'un registre à l'autre est celle de la matrice de traduction :
[03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md](../../03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md).

Mode de vérification de cette consigne : défense orale enregistrée contre grille
([05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)),
les deux registres dits à la suite. Signal d'échec immédiat : un terme technique dans le registre
1, ou un chiffre sans source dans le registre 2.

## Où ça ressort

La carte finale et le verdict partent dans l'ADR d'architecture de ton capstone : [04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md).

## ET APRÈS

Une fois ce challenge passé, enchaîne sur [04_exercice_architecture_trop_belle.md](04_exercice_architecture_trop_belle.md) : un exercice de lecture critique d'un schéma d'architecture, avant le [boss fight](boss-fight.md).
