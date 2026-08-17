# STYLE : LA CHARTE D'ÉCRITURE DU REPO

## Les quatre règles de livraison, non négociables

Ces quatre règles conditionnent toutes les autres. Un fichier qui en viole une n'est pas livrable, et le contrôle de livraison ([../../outils/controle_livraison.mjs](../../outils/controle_livraison.mjs)) les vérifie mécaniquement.

### 1. Un mode de vérification déclaré par exercice, parmi trois et trois seulement

Tout exercice a **exactement un** mode de vérification, nommé **sur place**, dans la même phrase que la consigne :

1. **solution commentée fournie** : le fichier de correction existe et est lié ;
2. **critère binaire du `verification_pack`** : le drill visé existe sur disque ;
3. **défense orale enregistrée contre grille** : la grille existe et est liée.

Aucun exercice ne reste sans mode déclaré. L'absence de correction n'est jamais un oubli implicite : soit le mode est nommé, soit le fichier est refusé.

### 2. Aucun renvoi vers un `verification_pack` qui n'existe pas sur disque

Chaque module qui cite un `verification_pack` possède un dossier `verification_pack/` contenant `drill_1.md`, `drill_2.md`, `drill_3.md` et `criteres.md`. Ordre imposé et identique partout : restituer sans support, appliquer sur un cas neuf, expliquer à voix haute en moins de deux minutes. Chaque drill porte un critère **binaire** (réussi / non réussi), tranchable seul, sans IA, sans barème intermédiaire.

### 3. Trois valeurs de péremption, et trois seulement

`stability: intemporel`, `stability: perissable_<annee>`, `stability: mouvant`. Tout fichier portant un prix, une version d'outil ou une offre fournisseur est tagué `perissable_2027` au minimum.

### 4. Tout tableau chiffré porte sa date de relevé

Ligne unique imposée juste au-dessus du tableau : `Relevé le <date>, chez <fournisseur>, unité <unité de facturation>, URL <page tarifaire>, à revérifier avant <année>.` Le protocole complet, colonnes de traçabilité comprises, est dans [PROTOCOLE-DONNEE-SOURCEE.md](PROTOCOLE-DONNEE-SOURCEE.md). Un montant en euros sans date de relevé est refusé mécaniquement. Un chiffre sans date est périmé le jour où on te le reproche.

### Grimoire : exemple conforme et exemple refusé

Conforme :

| Terme | Définition | Code | Analogies | Limite |
| --- | --- | --- | --- | --- |
| Backpressure | Mécanisme par lequel un consommateur lent impose son rythme au producteur. | `stream.pause()` | Le vestiaire du Kamehouse / la ligne défensive qui ralentit le jeu | Cette analogie casse quand le producteur ne peut pas ralentir : il faut alors jeter des messages, ce que ni le vestiaire ni la défense ne font. |

Refusé (quatre colonnes, et une Limite générale au lieu d'une rupture nommée) :

| Terme | Définition | Code | Analogies |
| --- | --- | --- | --- |
| Backpressure | Quand ça sature. | `pause()` | Un embouteillage |

La colonne Limite contient **toujours** une phrase de la forme « Cette analogie casse quand... », jamais une généralité.

Ce fichier existe parce que plusieurs fichiers du parcours y renvoient. Il fige les règles d'écriture communes aux contenus venus de MyFunnyJS, de ProjectFunny et des modules Staff Engineer ajoutés à la fusion.

## Règles de forme

- Français direct. Séparateur : le deux-points, jamais le tiret cadratin.
- Zéro emoji, zéro décoration inutile.
- Jargon technique expliqué entre parenthèses à sa première apparition dans chaque fichier.
- Diagrammes en ASCII avec des flèches du type A --> B --> C quand un schéma aide.
- Univers narratifs autorisés uniquement : Naruto, Dragon Ball Z, Garo Honoo no Kokuin, Avengers, football, country, trapsoul, rnb, Walking Dead, Prison Break, Breaking Bad, Banshee. La liste complète et ses règles d'usage sont dans [../UNIVERS_AUTORISES.md](../UNIVERS_AUTORISES.md).
- Exemples interdits : login, paiement, panier, commande, utilisateur générique, produit générique.

## Règles de fond

- Hypercomplétude par concept majeur : quoi, pourquoi, quand, comment, vraie utilité en production.
- Trois niveaux d'exemple : minimal, réaliste, celui qui casse.
- Cycle mental par section : intuition, puis code, puis explication technique, puis risque réel.
- Grimoires en **cinq colonnes exactes et sans exception** : Terme, Définition en deux lignes maximum, Code minimal, deux analogies séparées par une barre oblique, Limite.
- Exercices narratifs calibrés entre 5 et 25 minutes, jamais un énoncé scolaire.
- Résumé de 3 à 5 lignes en fin de leçon, jamais une liste de ce qu'on vient de voir.

## Structure d'un nouveau module

Un module neuf commence toujours par `00_why_<nom>.md` (convention MyFunnyJS) ou `01-why-this-level.md` (convention ProjectFunny), selon la convention dominante à l'endroit du fil où il est greffé, et déclare sa ligne "CE MODULE RÉUTILISE" plus son point de recroisement ultérieur.

## Vocabulaire interdit et contextes techniques autorisés

Termes bannis des exemples : `login`, `paiement`, `panier`, `commande`, `utilisateur générique`, `produit générique`, `e-commerce`.

Contextes techniques où le terme reste autorisé, parce qu'il désigne alors un objet technique et non un exemple métier : une commande de shell ou de CLI (`commande npm`), un nom d'API ou de champ cité dans un extrait de code, un rappel de règle rappelant que ces exemples sont interdits. Partout ailleurs, réécrire avec un domaine des univers autorisés.

Le contrôle de livraison vérifie ce vocabulaire au même titre que les liens, les emojis et les tirets cadratins.

## Acte cognitif déclaré (obligatoire)

Tout fichier portant un front-matter déclare le champ `acte:`, avec une valeur et une seule
parmi : `restituer`, `appliquer`, `transférer`, `évaluer`, `produire`.

L'acte dit ce que le lecteur doit **faire** avec la page, pas ce qu'elle contient :

| Acte | Le lecteur… | Typiquement |
| --- | --- | --- |
| `restituer` | redit de mémoire | `00_why_*`, grimoires, README |
| `appliquer` | exécute un geste sur son fil rouge | leçons, drills, ponts |
| `transférer` | reconnaît le même mécanisme ailleurs | TECH-ILA, portages |
| `évaluer` | juge un artefact, le sien ou un autre | prereq_check, critères, rétros |
| `produire` | livre une pièce datée et signée | boss-fights, challenges, capstone |

Règles :

- une seule valeur par fichier : une page qui en mérite deux est une page à couper ;
- l'acte se voit dans le corps du fichier (verbe de la consigne, forme du critère de réussite) ;
  un `acte: produire` sans livrable nommé est un défaut de rédaction, pas un défaut de champ ;
- le contrôle de livraison vérifie la présence et la validité du champ, jamais sa pertinence :
  celle-ci est du ressort de la revue humaine.

