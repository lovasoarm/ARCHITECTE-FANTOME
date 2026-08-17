# Pourquoi ce niveau existe

## La scène

Le cabinet vétérinaire lance enfin son appli mobile pour que les propriétaires d'animaux
prennent rendez-vous eux-mêmes. L'API existe déjà, elle sert le site web depuis un an, elle
marche bien. L'équipe mobile branche l'appli dessus en trois jours. Deux semaines après le
lancement, un vétérinaire retrouve trois fois le même rendez-vous pour le même chat, à la
même heure, créé en triple par le même utilisateur. En creusant : sur le parking de la
clinique, le réseau 4G de l'utilisateur coupait une seconde après l'envoi de la requête,
l'appli affichait une roue qui tourne, l'utilisateur appuyait à nouveau sur "confirmer", et
l'appli retentait automatiquement l'envoi trente secondes plus tard sans jamais savoir si la
première tentative avait abouti. L'API, elle, a fait exactement ce qu'on lui demandait : créer
un rendez-vous à chaque requête reçue. Le bug n'est dans aucune ligne de code défectueuse.
Il est dans une hypothèse jamais écrite : "un appelant n'enverra jamais deux fois la même
requête".

## Ce qui se passe vraiment

Une API interne, appelée uniquement par le code que tu contrôles toi-même, tolère des
hypothèses implicites. Tu sais que le front n'enverra jamais un champ manquant parce que
c'est toi qui as écrit le formulaire qui l'empêche. Tu sais qu'un seul serveur appelle l'API,
donc pas de concurrence surprise. Tu peux casser un format de réponse un mardi et le
redéployer le même jour, parce que "les deux bouts" sont dans le même déploiement.

Le jour où un deuxième appelant existe : une appli mobile, un partenaire, un service tiers,
même un autre projet écrit par une autre équipe dans la même entreprise : toutes ces
hypothèses s'effondrent en même temps, et aucune ne prévient avant de casser quelque chose :

```text
API interne, un seul appelant maîtrisé      API publique, appelants multiples et hors contrôle
-------------------------------------      --------------------------------------------------
Tu déploies front et API ensemble       -->   Les appelants sont déployés à des rythmes différents,
                                             parfois jamais mis à jour (appli mobile ancienne)

Une seule requête à la fois par flux   -->   Retries automatiques, doubles clics, connexions
                                             instables : la même intention peut arriver 3 fois

Le format de réponse est un détail     -->   Le format de réponse EST le produit : le casser
d'implémentation                            casse le client sans prévenir, souvent en silence

Un message d'erreur en français        -->   Un code d'erreur doit être lisible par une machine
suffit pour un humain qui debug             avant d'être lisible par un humain

N'importe qui dans l'équipe peut       -->   Un client externe peut interroger 1000 fois par
appeler l'API autant qu'il veut             seconde par accident (boucle infinie côté partenaire)

"On se fait confiance, c'est notre     -->   Un token volé, un scope trop large, une frontière de
code" suffit comme sécurité                confiance floue = fuite de données patients ou factures
```

C'est le passage d'un **code qui répond** à un **contrat qui engage**. Une fonction interne
peut changer de signature librement tant que tu mets à jour tous ses appelants dans le même
commit. Une API publique ne peut pas : tu ne sais ni qui l'appelle, ni avec quelle version de
client, ni quand ce client sera mis à jour. Le vétérinaire de la scène n'a pas un bug de
code, il a un système qui a grandi sans que personne ne décide consciemment de passer d'un
mode à l'autre.

## Qui souffre en premier

Le propriétaire de l'animal souffre en premier : trois rendez-vous facturés ou trois rappels reçus
pour rien, sans comprendre pourquoi. L'équipe technique souffre en second, en devant recouper des
logs pour comprendre un incident que personne n'a vu venir, pendant que le vétérinaire perd
confiance dans l'outil qu'on lui a vendu comme fiable.

## À quel moment du projet ça se manifeste

Jamais tant qu'un seul client contrôlé appelle l'API. Le problème apparaît exactement au moment où
un deuxième appelant existe : une appli mobile, un partenaire, un import automatisé. Ce moment
arrive souvent bien plus tôt que prévu, dès qu'un projet a du succès, ce qui rend la préparation en
amont plus rentable que la correction en urgence.

## Le mécanisme sous-jacent

Le mécanisme commun à ces cinq réflexes est le même : transformer une hypothèse implicite en règle
explicite, vérifiable par du code plutôt que par la mémoire d'une personne. Un contrat écrit rend
visible un changement cassant avant qu'il parte en production. Une clé d'idempotence rend une
opération sûre à rejouer sans jamais avoir à faire confiance au réseau. Un scope d'autorisation rend
explicite ce qu'un token peut faire, au lieu de dépendre du bon vouloir de qui l'utilise.

```text
Hypothèse implicite (fragile)             Règle explicite (robuste)
------------------------------            --------------------------
"le champ restera au même                 contrat de schéma versionné,
 format, je m'en souviendrai"             vérifié par un test automatique

"un retry ne devrait pas arriver          clé d'idempotence stockée,
 deux fois pour la même action"           deuxième requête identique renvoie
                                           le même résultat sans nouvel effet

"ce token n'est utilisé que par           scope explicite vérifié à chaque
 notre propre appli, pas de souci"        appel, indépendant de qui le détient
```

## Contre-exemple : quand ce niveau de rigueur serait excessif

Un script d'administration interne, appelé une fois par un seul développeur pour corriger une
donnée, n'a pas besoin de versionnage de contrat ni de pagination : le coût de traiter cet appel
comme une API publique dépasse le bénéfice pour un usage unique, contrôlé, jamais exposé à un
appelant extérieur. La rigueur de ce niveau s'applique dès qu'un deuxième appelant, humain ou
machine, existe ou existera un jour.

## Ce que ce niveau corrige

Ce niveau te donne les cinq réflexes qui séparent une API qui survit à son succès d'une API
qui s'effondre dès qu'elle rencontre un vrai appelant extérieur :

1. **Écrire le contrat avant le code**, pour que "casser un client" devienne une décision
   consciente et versionnée, jamais un accident de refactoring.
2. **Rendre les erreurs exploitables et les opérations rejouables sans danger**, pour que
   les retries : inévitables sur un réseau réel : ne dupliquent jamais une action.
3. **Séparer qui es-tu de ce que tu as le droit de faire**, pour qu'un token volé ou mal
   scope ne devienne pas une fuite de données ou une facture modifiée sans autorisation.
4. **Anticiper le succès** : pagination, limites de débit, cache : les problèmes qui
   n'existent pas à dix appels par jour et qui deviennent une panne à dix mille.
5. **Penser en dehors de ton propre déploiement** : ton API vit plus longtemps et plus
   largement que le code qui l'a écrite au départ.

## Ce qui casse sans ce niveau

- Des doublons silencieux (rendez-vous, factures, livraisons) causés par des retries sans
  garde-fou, découverts des jours plus tard par un humain qui recoupe des chiffres à la main.
- Des appelants externes cassés à chaque déploiement, parce qu'un renommage de champ JSON,
  anodin dans un IDE, est en réalité une rupture de contrat pour quelqu'un d'autre.
- Des incidents de sécurité qui ne sont pas des piratages sophistiqués mais des scopes trop
  larges accordés par facilité ("donne-lui un accès admin, ça ira plus vite").
- Une API qui tient à dix appels par minute et tombe à mille, sans qu'aucune alerte n'ait
  prévenu avant l'incident, parce que personne n'avait mesuré ni limité la charge acceptable.

## Ce que ce niveau ne couvre pas

Ce niveau ne couvre pas la modélisation des données servies par l'API (traitée au
[niveau 05](../08-DATA-SPELLS/README.md)) ni la façon dont la logique métier est organisée en
interne avant d'atteindre la route HTTP (traitée au [niveau 06](../15-ARCHI-LAB/README.md)). Il se
concentre sur la frontière que ton système présente au monde extérieur.

## Ce que tu sais faire à la sortie

- Écrire un contrat d'API avant le code, et décider consciemment quand une modification casse ce
  contrat.
- Rendre une opération sensible (paiement, création de rendez-vous) rejouable sans risque de
  doublon, via une clé d'idempotence.
- Distinguer authentification et autorisation, et attribuer un scope minimal à chaque token.
- Anticiper la charge (pagination, limites de débit) avant qu'un pic de trafic ne la révèle en
  panne.

## Comment ce niveau est réutilisé plus tard

Le contrat défini ici devient la base des changements suivis dans le temps au
[niveau 08](../../03-PILOTAGE/01-ROADMAP-RUN/README.md), et les erreurs et limites définies ici alimentent
directement l'observabilité traitée au [niveau 09](../../03-PILOTAGE/03-QUALITY-SHIELD/README.md).

## Analogie

Analogie : une API, c'est le passe entre la cuisine et la salle, et la procédure radio entre deux navires.
Où l'analogie casse : au passe, les deux côtés se voient ; sur une API, l'appelant ne verra jamais ton serveur.

## Ce que tu dois savoir défendre

- Explique, avec l'exemple du rendez-vous vétérinaire dupliqué, pourquoi le bug n'est ni dans
  le front ni dans l'API prise séparément.
- Donne un exemple concret de décision qui est acceptable pour une API interne à un seul
  appelant, et inacceptable dès qu'un deuxième appelant externe apparaît.
- Pourquoi "on se fait confiance, c'est notre code" cesse d'être un argument de sécurité
  valable dès qu'un token peut être volé ou qu'un partenaire externe existe.
