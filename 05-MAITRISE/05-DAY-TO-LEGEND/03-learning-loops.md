# Boucles de feedback, pratique délibérée, sortir des plateaux

## Le piège

Tu tiens ta routine depuis huit semaines : lecture, katas, journal. Tu sens que tu ne
progresses plus. Les katas te semblent faciles, mais tu n'es pas meilleur pour autant sur
tes vrais tickets. Tu te dis que la méthode ne marche pas et tu abandonnes. En réalité, tu
es tombé dans le piège le plus classique de la pratique délibérée : tu t'entraînes en boucle
fermée, sans jamais confronter tes réponses à un retour extérieur fiable. Une boucle fermée
ne peut pas te faire progresser au-delà de ce que tu savais déjà : elle ne fait que te
rendre plus rapide à produire les mêmes erreurs.

Pire : tu fais tout ça sans jamais revenir sur ce que tu as appris trois semaines plus tôt.
Le kata du lundi t'a fait comprendre une distinction fine sur les transactions distribuées.
Le vendredi suivant, tu ne t'en souviens déjà plus qu'à moitié. Dans un mois, tu ne t'en
souviendras plus du tout, sauf si tu l'as recroisé entre-temps au bon moment. Ce n'est pas
un manque de mémoire personnelle : c'est un phénomène mesuré sur tous les cerveaux humains
depuis plus d'un siècle, et il a un nom précis.

## Ce qui se passe vraiment

### Anatomie d'une boucle de feedback qui marche

```text
  Action --> Résultat observable --> Comparaison à une référence --> Correction
    ^                                                                    |
    \----------------------------------------------------------------+

  Une boucle FERMÉE (sans référence externe) :
  Action --> Résultat que tu juges toi-même --> "ça a l'air bien" --> Répétition à l'identique
  --> aucune correction possible si ton propre jugement contient l'erreur.
```

La qualité de ta progression est bornée par la qualité de ta référence de comparaison, pas
par le nombre de répétitions. Cent répétitions d'un kata sans jamais comparer à une réponse
experte t'entraînent à répéter vite ton propre biais.

Sources de référence fiables, du plus fort au plus faible :

1. Un résultat de production mesuré (le bug est réapparu ou non, la performance a changé ou
   non) : la référence la plus dure, incontestable, mais lente à obtenir.
2. Une revue par quelqu'un plus expérimenté que toi sur le sujet précis (pas n'importe qui).
3. Une comparaison avec un cas documenté (ADR réel, post-mortem public, code source d'un
   projet reconnu).
4. Ta propre relecture à froid, une semaine plus tard : meilleure que rien, mais tu restes
   juge et partie.

### Pourquoi les plateaux apparaissent

Un plateau de progression a presque toujours l'une de ces trois causes, rarement un manque
de travail :

```text
Cause 1 : Zone de confort déguisée en effort
  Tu répètes des katas que tu maîtrises déjà à 90%. Sensation de travail, gain quasi nul.
  Symptôme : tu termines chaque kata sans avoir hésité une seule fois.

Cause 2 : Absence de référence de correction
  Tu t'entraînes en boucle fermée (voir plus haut). Tu deviens plus rapide, pas meilleur.
  Symptôme : ta vitesse augmente, la qualité jugée par un tiers externe reste stable.

Cause 3 : Mauvais niveau de difficulté (trop dur, pas trop facile)
  Le problème choisi dépasse tellement ton niveau actuel que tu ne peux même pas
  identifier ce qui a raté : le retour ne t'apprend rien d'exploitable.
  Symptôme : tu abandonnes le kata avant la fin, frustration sans compréhension.
```

La zone d'apprentissage efficace se situe entre les deux : juste au-delà de ce que tu sais
déjà faire confortablement, jamais dans l'inconnu total.

```text
Trop facile        Zone d'apprentissage        Trop difficile
--------------  |  ------------------------  |  --------------
Confort, ennui  |  Inconfort gérable,          |  Frustration,
zéro gain       |  progrès mesurable           |  aucun gain exploitable
```

### Le principe : ce qu'on apprend s'oublie, sauf rappel programmé

Une quatrième cause de plateau, invisible tant qu'on ne l'a pas mesurée, tient sur un fait
neutre : la mémoire humaine oublie une information nouvelle selon une courbe très rapide au
début, puis de plus en plus lente. Ce phénomène a été mesuré pour la première fois par le
psychologue Hermann Ebbinghaus en 1885, sur lui-même, avec des listes de syllabes sans sens.
Le mécanisme se retrouve identique sur une distinction technique apprise dans un kata :

```text
Rétention de l'information apprise, sans aucun rappel
100% |*
     | *
     |   *
 75% |     *
     |        *
     |            *
 50% |                  *
     |                        *_______________
 25% |                                          *______________________
     |                                                                    *___________
  0% +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+---->
      j0   j1        j3        j7            j15                  j35            temps

  Sans rappel : plus de la moitié de ce qui a été compris disparaît en moins d'une semaine.
  Ce n'est pas un défaut personnel, c'est le fonctionnement normal de la mémoire humaine.
```

Chaque rappel, s'il arrive juste avant que l'oubli ne devienne trop fort, aplatit la courbe
et repousse l'échéance du rappel suivant. C'est le principe de la répétition espacée : on ne
répète pas pour "faire du volume", on répète au moment précis où l'oubli menace, pour forcer
le cerveau à reconstruire l'information plutôt qu'à la relire passivement.

```text
Rétention avec rappels espacés (J+1, J+3, J+7, J+15, J+35)
100% |*    *        *            *                *                    *
     | \  / \      / \          / \              / \                  / \
     |  \/   \    /   \        /   \            /   \                /   \
 75% |       *\  /     *\     /     *\         /     *\             /     ...
     |          \/         \ /          \     /          \        /
 50% |                      *              \  /              \  /
     |                                       \/                \/
  0% +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+---->
      j0   j1   j3        j7            j15                  j35            temps

  Chaque rappel remonte la rétention presque au niveau initial. L'intervalle entre
  rappels s'allonge à chaque fois : le coût de maintenance diminue avec le temps.
```

### Le calendrier concret de rappel espacé

Un rappel n'est pas relire ses notes. Relire est passif : ton oeil reconnaît le texte,
ton cerveau croit savoir alors qu'il reconnaît seulement. Un rappel efficace est un effort de
récupération actif : tu fermes le support, tu essaies de reformuler la distinction avec tes
propres mots ou de refaire le kata sans regarder la correction, puis tu vérifies.

```text
Calendrier de rappel espacé pour une notion apprise un jour J

J+0   : apprentissage initial (kata, lecture de code, décision réelle)
J+1   : premier rappel, à froid, le lendemain. Sans ce rappel, l'oubli est déjà le
        plus fort de tout le cycle : c'est le rappel le plus rentable de tous.
J+3   : deuxième rappel. Si la reformulation est facile, la notion tient bien.
        Si elle est laborieuse, retourne au kata d'origine avant d'avancer.
J+7   : troisième rappel, une semaine après. C'est le point où la plupart des gens
        arrêtent, en pensant "j'ai compris" : c'est exactement là que ça se perd
        sans ce rappel précis.
J+15  : quatrième rappel. L'intervalle double : si les trois précédents ont tenu,
        la notion commence à devenir stable, pas encore automatique.
J+35  : cinquième rappel. Si la reformulation est immédiate et sans effort, la
        notion est acquise pour de bon : elle rejoint ton jugement disponible sous
        pression, pas seulement ta mémoire de lecture.
```

Concrètement, cela tient sur une seule ligne de journal, pas sur un outil compliqué :

```text
# fichier revisions.md, une ligne par notion apprise
2026-08-04 | transaction distribuée, isolation SERIALIZABLE | prochain rappel: 2026-08-05
2026-08-05 | rappel fait, reformulation facile | prochain rappel: 2026-08-07
2026-08-07 | rappel fait, hésitation sur le cas de deadlock | prochain rappel: 2026-08-09 (raccourci)
```

Si un rappel échoue (reformulation impossible ou fausse), l'intervalle ne double pas : il
revient à J+1 depuis ce point, comme si la notion venait d'être apprise à nouveau. C'est la
règle qui rend le système honnête : on ne fait pas semblant d'avoir retenu.

### Comment casser un plateau concrètement

1. Change la source de référence, pas l'exercice. Si tu t'entraînais en autocorrection,
   trouve une revue humaine : même informelle, même ponctuelle (un post sur un forum
   technique sérieux, un pair d'un meetup, un mentor payé une heure).
2. Augmente légèrement la contrainte du kata, pas sa nature. Passe de "15 minutes sans
   contrainte de format" à "15 minutes en devant citer un chiffre ou une mesure à l'appui de
   la décision" : cela force une nouvelle capacité (chiffrer) sans tout changer.
3. Change de domaine d'application temporairement. Si tes katas de décision portent
   toujours sur des APIs, fais-en trois semaines sur des décisions de modélisation de
   données. Le transfert de compétence entre domaines proches révèle souvent des lacunes
   masquées par la familiarité d'un seul domaine.
4. Ajoute le calendrier de rappel espacé sur les notions déjà comprises. Un plateau perçu
   "je ne progresse plus" cache parfois un phénomène différent : tu progresses, mais tu
   oublies les paliers précédents au même rythme que tu en franchis de nouveaux, ce qui
   donne une impression de stagnation nette alors que le brut est positif.
5. Accepte qu'un plateau de quelques semaines est normal et ne veut rien dire seul. Le
   signal d'alarme n'est pas "je stagne cette semaine", c'est "je stagne depuis deux mois
   malgré une routine tenue et une référence externe utilisée".

## Exemple concret

Tu apprends, un lundi, pourquoi une contrainte d'unicité posée uniquement en base ne suffit
pas à empêcher un double rendez-vous vétérinaire si l'application fait deux requêtes non
atomiques avant l'insertion. Sans rappel, tu risques de recroiser exactement ce piège dans
six mois sur un contexte différent (double réservation de créneau d'escalade), et de le
redécouvrir par un bug en production plutôt que par mémoire. Avec le calendrier J+1, J+3,
J+7, J+15, J+35, tu reformules cette distinction cinq fois en cinq semaines, à un coût total
d'environ quinze minutes, et elle rejoint ton réflexe de conception plutôt que ta liste de
notes jamais relues.

## Compromis

| Option                                          | Coût                                         | Bénéfice                                                            | Quand choisir                                                                |
| ----------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Boucle fermée (autocorrection)                  | Aucun coût logistique                        | Progrès rapide au début, plafonne vite                              | Phase de démarrage, avant d'avoir accès à un mentor ou une communauté        |
| Boucle ouverte avec revue humaine ponctuelle    | Coût social (demander, parfois payer), délai | Correction d'angles morts invisibles seul                           | Dès que la boucle fermée plafonne (généralement 4-8 semaines)                |
| Boucle ouverte avec production réelle mesurée   | Lent, dépend du contexte pro                 | Référence la plus fiable qui existe                                 | En continu, en parallèle de tout le reste, via le travail quotidien lui-même |
| Rappel espacé formel (J+1 à J+35)               | Discipline de tenue d'un journal court        | Rétention réelle, évite de réapprendre la même chose plusieurs fois | Sur toute notion qui t'a coûté un vrai effort de compréhension               |
| Changer de domaine d'application temporairement | Sensation de repartir de zéro                | Révèle des lacunes masquées par la routine, réactive la progression | Dès qu'un plateau dure plus de 4-6 semaines                                  |

## Pièges classiques

- **Le faux plateau de la première semaine.** Symptôme : tu juges "ça ne marche pas" après
  cinq jours. La pratique délibérée montre des effets mesurables à partir de 4-6 semaines,
  pas avant : juger plus tôt, c'est juger dans le bruit.
- **La revue humaine complaisante.** Symptôme : tu demandes toujours à la même personne
  bienveillante qui te dit "c'est bien" sans jamais pointer un défaut précis. Une bonne
  référence de correction doit parfois te déplaire.
- **Le kata qui devient un rituel vide.** Symptôme : tu fais le kata machinalement, sans
  chronométrer, sans vraiment trancher : tu coches une case plutôt que de t'entraîner.
- **Confondre inconfort productif et souffrance inutile.** Symptôme : tu choisis
  systématiquement le kata le plus dur du pool pour "prouver" que tu travailles dur, tu n'en
  retires rien d'exploitable et tu finis par arrêter par épuisement.
- **Relire au lieu de rappeler.** Symptôme : ton "rappel" du J+7 consiste à relire tes notes
  d'origine plutôt qu'à reformuler sans les regarder. Tu confirmes une reconnaissance, pas
  une mémoire active, et le rappel suivant repartira du même point bas.

## Analogie

Analogie : une boucle d'apprentissage, c'est le goûter-corriger-goûter du cuisinier, et le point de position répété en navigation.
Où l'analogie casse : le cuisinier a un retour immédiat, tes décisions d'architecture répondent avec des mois de latence.

## Ce que tu dois savoir défendre

- Explique pourquoi une boucle de feedback fermée ne peut pas te faire dépasser ton niveau
  actuel, même avec des centaines de répétitions.
- Cite les trois causes les plus fréquentes d'un plateau de progression, et pour chacune une
  action concrète pour en sortir.
- Justifie pourquoi les intervalles J+1, J+3, J+7, J+15, J+35 s'allongent plutôt que de
  rester fixes, et ce qu'il faut faire quand un rappel échoue à l'un de ces points.

## Ce que tu emportes

Une boucle de feedback sans référence externe fiable plafonne toujours, quel que soit le
nombre de répétitions. Un plateau a presque toujours une cause identifiable parmi trois :
zone de confort déguisée, absence de référence, mauvais calibrage de difficulté. Et une
notion comprise une seule fois s'oublie selon une courbe prévisible, sauf si tu la rappelles
activement à des intervalles qui s'allongent : J+1, J+3, J+7, J+15, J+35. Tenir ce calendrier
sur les notions qui t'ont coûté un vrai effort transforme une compréhension ponctuelle en
réflexe disponible sous pression, ce qui est, in fine, la seule chose qu'on te demandera de
prouver le jour où ça compte vraiment.
