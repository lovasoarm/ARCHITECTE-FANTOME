# Éditeur et shell comme prothèses cognitives

## Le piège

Tu gères le système de tournées d'un livreur régional. Un incident tombe un vendredi 18h :
une tournée entière a été assignée deux fois au même chauffeur. Tu dois ouvrir le repo,
trouver la fonction d'assignation, comprendre son historique récent, tester un correctif
localement, et vérifier qu'aucune autre tournée n'est affectée par le même bug : le tout
sans que la pression te fasse sauter une étape. Un collègue fait ça en douze minutes à la
main sur son clavier, sans lever les yeux vers une souris. Toi, tu passes six minutes rien
qu'à naviguer entre fichiers et onglets, parce que ton environnement n'a jamais été pensé
pour aller vite : seulement pour "marcher".

## Ce qui se passe vraiment

Un éditeur et un shell ne sont pas des logiciels que tu utilises. Ce sont des extensions de
ta mémoire de travail. Ta mémoire de travail humaine tient environ quatre à sept éléments à
la fois. Chaque seconde passée à chercher un fichier, à retaper une commande, ou à naviguer
manuellement dans un historique consomme un slot de cette mémoire : et te fait perdre le fil
du vrai problème que tu étais en train de résoudre.

```text
Mémoire de travail limitée (4-7 slots)

Sans outillage :
[chercher le fichier] [retenir où j'en étais] [retaper la commande] [le bug]
      ^ slot perdu          ^ slot perdu           ^ slot perdu        ^ ce qui reste

Avec outillage (raccourcis, historique, fuzzy-finder) :
[le bug] [le bug] [le bug] [le bug]
      --> toute la mémoire de travail reste disponible pour le vrai problème
```

Le but de l'outillage n'est pas "aller plus vite" au sens abstrait. C'est de libérer de la
mémoire de travail pour le problème réel, en rendant automatiques les actions mécaniques
répétées des centaines de fois par jour.

### Trois catégories d'automatismes à construire

1. **Navigation sans souris ni clic manuel** : ouvrir un fichier par son nom approximatif
   (fuzzy finder), sauter à une définition de fonction, revenir en arrière dans
   l'historique de navigation. Chacune de ces actions doit devenir un raccourci clavier
   mémorisé, jamais une suite de clics.
2. **Shell comme mémoire externe fiable** : historique de commandes cherchable (Ctrl+R ou
   équivalent), alias pour les commandes répétées de ton contexte précis (pas des alias
   génériques copiés d'un blog : les tiens, pour ton propre workflow), variables
   d'environnement pour ne jamais retaper un chemin ou un identifiant de ressource.
3. **Git comme extension du shell, pas comme interface graphique séparée** : `git log
--oneline --graph`, `git bisect`, `git blame` en ligne de commande. Une interface
   graphique de Git cache la structure réelle de l'historique derrière une représentation
   simplifiée : utile pour un aperçu rapide, insuffisante pour un vrai diagnostic.

### Exemple concret : configuration minimale qui change tout

```bash
# .bashrc / .zshrc : trois lignes qui économisent des centaines d'allers-retours par semaine

# Historique de commande cherchable en incrémental, jamais perdu entre sessions
export HISTSIZE=100000
export HISTFILESIZE=100000
shopt -s histappend   # ajoute à l'historique au lieu de l'écraser à chaque session

# Alias pour un git log lisible en une commande, pas une interface graphique à ouvrir
alias gl="git log --oneline --graph --decorate -20"

# cd vers le dernier repo travaillé sans retaper le chemin complet
alias proj="cd ~/code/$(ls -t ~/code | head -1)"
```

Ce n'est pas la configuration qui compte : c'est le principe : chaque friction répétée plus
de dix fois par semaine mérite d'être éliminée une fois pour toutes, même si l'élimination
prend vingt minutes.

## Compromis

| Option                                                                 | Coût                        | Bénéfice                                                                     | Quand choisir                                             |
| ---------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| Environnement par défaut, aucune personnalisation                      | Zéro coût de setup          | Friction constante, invisible mais réelle                                    | Jamais au-delà de la première semaine sur un nouvel outil |
| Copier la config d'un collègue ou d'un blog telle quelle               | Rapide, faible effort       | Tu ne comprends pas pourquoi chaque ligne existe, tu ne sais pas la déboguer | Point de départ acceptable, jamais destination finale     |
| Construire sa config incrémentalement, une friction éliminée à la fois | Effort régulier, discipline | Config comprise, adaptée à ton vrai workflow, maintenable                    | Approche par défaut recommandée, en continu               |

## Pièges classiques

- **La config "parfaite" jamais terminée.** Symptôme : tu passes plus de temps à configurer
  ton éditeur qu'à écrire du code : la personnalisation devient une procrastination
  déguisée en productivité.
- **Copier une configuration entière sans la comprendre.** Symptôme : un raccourci ne
  fonctionne plus après une mise à jour et tu es incapable de le réparer, parce que tu ne
  sais pas ce qu'il faisait.
- **Utiliser la souris pour des actions répétées plus de dix fois par jour.** Symptôme : tu
  ne remarques même plus le temps perdu, parce qu'il est fragmenté en centaines de micro-
  frictions de deux secondes.
- **Négliger le shell au profit de l'éditeur seul.** Symptôme : tu es rapide dans ton
  éditeur mais tu retapes des commandes shell identiques dix fois par jour sans historique
  cherchable ni alias.

## Analogie

Analogie : l'éditeur et le shell, ce sont les deux mains du menuisier, et la console de régie sous les doigts du technicien.
Où l'analogie casse : le geste manuel s'use avec la fatigue, un raccourci mal compris produit une erreur reproductible à l'infini.

## Ce que tu dois savoir défendre

- Explique pourquoi l'outillage sert la mémoire de travail, pas seulement la vitesse brute.
- Donne trois automatismes de navigation ou de shell que tu as réellement installés, et le
  temps approximatif qu'ils te font gagner par semaine.
- Explique pourquoi copier la config d'un autre développeur sans la comprendre est un piège,
  même si elle "marche" au premier essai.

## Le principe

Chaque friction mécanique répétée plus de dix fois par semaine mérite d'être éliminée une
fois pour toutes, même au prix d'un investissement ponctuel qui semble disproportionné vu de
l'extérieur. Le calcul n'est jamais "combien ça coûte à corriger" isolément, mais "combien ça
coûte cumulé sur l'année si je ne corrige jamais" : une friction de deux secondes, répétée
cinq cents fois par jour, dépasse largement trente minutes de configuration ponctuelle.

## Exemple concret

Un développeur travaille sur la bibliothèque d'un club d'escalade, un projet avec une
douzaine de modules. Il cherche un fichier par clic dans l'arborescence de son éditeur,
environ quarante fois par jour, deux à quatre secondes à chaque fois : entre deux et trois
minutes perdues par jour, invisibles une par une. Il installe un fuzzy finder au raccourci
`Ctrl+P`, tape trois lettres approximatives du nom de fichier, arrive directement dessus.
Le gain individuel semble dérisoire. Sur une année de travail, cumulé avec des dizaines
d'autres frictions du même ordre (retaper une commande shell identique, rechercher un
historique de commit à la souris, changer de terminal pour lancer un test), l'écart de temps
disponible pour le vrai problème se compte en journées entières, pas en minutes.

```text
Friction isolée         Fréquence/jour   Cout unitaire   Cout annuel (220 jours ouvres)
Navigation par clic      40               3s              440 minutes  (~7h20)
Commande retapee          25               5s              458 minutes  (~7h38)
Recherche historique Git  8                15s             440 minutes  (~7h20)
                                          Total cumule     ~22 heures/an, pour trois frictions seules
```


## Commandes que tu dois savoir taper sans réfléchir

Il existe un noyau de commandes shell et Git qui reviennent des centaines de fois par
semaine, quel que soit le projet. Les connaître par coeur, sans les chercher dans un
historique de recherche web, est ce qui distingue un développeur outillé d'un développeur
qui "sait que ça existe".

```bash
# Retrouver un fichier par nom approximatif, sans naviguer à la souris
find . -iname "*facturation*" -not -path "*/node_modules/*"

# Chercher une chaîne dans tout le code source, résultats avec numéro de ligne
grep -rn "calculAbonnement" --include="*.ts" src/

# Voir qui a modifié une ligne précise et pourquoi, sans ouvrir d'interface graphique
git blame -L 40,60 src/facturation.ts

# Retrouver le commit qui a introduit un bug par recherche binaire automatisée
git bisect start
git bisect bad HEAD
git bisect good v2.3.0
# git rejoue l'historique en dichotomie, tu marques bon/mauvais à chaque étape

# Voir les fichiers modifiés dans les 10 derniers commits, triés par fréquence
git log --name-only -10 --pretty=format: | sort | uniq -c | sort -rn | head

# Annuler un commit poussé sans réécrire l'historique partagé
git revert <hash>
```

Le piège n'est pas de ne pas connaître ces commandes : c'est de les chercher à chaque fois
sur un moteur de recherche au lieu de les mémoriser une bonne fois, alors qu'elles reviennent
plusieurs fois par jour.

## Piège supplémentaire : la guerre de religion des éditeurs

Vim contre Emacs contre VS Code contre un IDE propriétaire : ce débat consomme un temps
disproportionné par rapport à son enjeu réel. Le choix de l'éditeur compte beaucoup moins que
la profondeur avec laquelle tu maîtrises celui que tu as choisi. Un développeur qui connaît
VS Code en profondeur (raccourcis, extensions ciblées, débogueur intégré, recherche
multi-fichiers) est plus rapide qu'un développeur qui utilise Vim en surface, en tapant des
flèches directionnelles au lieu des mouvements modaux qui font tout l'intérêt de l'outil.

```text
Mauvaise question : "Quel est le meilleur éditeur ?"
Bonne question : "Est-ce que je maîtrise en profondeur celui que j'utilise déjà ?"

Signal d'alerte : tu changes d'éditeur plus d'une fois par an sans avoir épuisé les
raccourcis et extensions de celui d'avant. C'est souvent une forme de procrastination
technique déguisée en recherche de productivité.
```

## Ce que tu emportes

Un éditeur et un shell mal outillés consomment ta mémoire de travail sur des tâches
mécaniques au lieu de la réserver au problème réel. La friction invisible, répétée des
centaines de fois par jour, coûte plus cher sur une carrière qu'une friction ponctuelle
spectaculaire. Construis ta configuration par élimination incrémentale de frictions réelles
observées chez toi, jamais par copie aveugle d'une configuration d'un tiers : ce que tu ne
comprends pas dans ta propre config, tu ne sauras pas le réparer le jour où il casse.
