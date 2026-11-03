---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, transmission]
anti_recipe_key: changement_echelle+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Penser en systèmes

Temps de lecture ~7 min

## Le piège

Le système de tournées de livraison d'une PME de messagerie doit "juste" ajouter un champ
`position_gps_du_chauffeur`. Le développeur l'ajoute à la table `chauffeur`. Deux semaines
plus tard, deux tournées lisent la même position au même instant et calculent des ETA
incohérents pour le client, parce que la position est mutée par un flux temps réel pendant
qu'un autre flux la lit pour un calcul de replanification. Le bug n'est pas dans le champ,
il est dans l'absence de modèle des entrées, sorties, état partagé et frontières du système.

## Ce qui se passe vraiment

Tout système logiciel se décrit avec quatre éléments, et la plupart des bugs de conception
viennent de l'un d'eux, mal identifié :

- **Entrées** : ce qui vient de l'extérieur et que le système ne contrôle pas (position GPS
  envoyée par l'app du chauffeur, requête HTTP d'un client).
- **Sorties** : ce que le système produit vers l'extérieur (notification SMS, réponse API).
- **État** : ce que le système retient entre deux appels (position actuelle, statut de
  tournée). L'état est la source de la plupart des bugs de concurrence, parce qu'il est
  partagé et mutable.
- **Effets de bord** : toute action qui modifie quelque chose en dehors du calcul courant
  (écrire en base, envoyer un email, appeler une API tierce). Un effet de bord ne peut pas
  être "annulé" par un simple retour arrière du programme.

```text
              FRONTIERE DU SYSTEME
        +-------------------------------+
Entrée -->|                               |--> Sortie
(GPS)   |   +-----------+               |  (ETA client)
        |   |   ETAT     |<-- lu/ecrit --+
        |   | (position, |    par plusieurs
        |   |  tournée)  |    flux concurrents
        |   +-----------+               |
        |        |                      |
        |        v                      |
        |   EFFET DE BORD               |
        |   (notif SMS envoyée)         |
        +-------------------------------+
```

Le vrai travail de modélisation consiste à répondre, pour chaque nouvelle feature, à trois
questions : quel état partagé est touché ? qui d'autre le lit ou l'écrit en même temps ? et
où est la frontière du système : jusqu'où va ma responsabilité, à partir d'où je fais
confiance à un tiers (une API externe, un autre service) ?

Dans l'exemple du chauffeur, la vraie question n'était pas "où stocker le champ" mais "cette
donnée doit-elle être une source de vérité unique et cohérente, ou une valeur qui peut être
légèrement en retard sans conséquence ?". Une position GPS pour affichage sur une carte peut
être en retard de quelques secondes. Une position GPS utilisée pour calculer un ETA facturé
au client ne le peut pas de la même façon : il faut décider explicitement, pas par défaut.

> **Schéma conceptuel uniquement : ne pas exécuter.** Ce fragment sert à illustrer une séparation de données ; il ne constitue pas un cours SQL. Tu peux ignorer sa syntaxe pendant la première passe.

```sql
-- Modèle explicite : séparer l'état "affichage" (tolère l'incohérence)
-- de l'état "calcul métier" (doit être cohérent au moment du calcul)
CREATE TABLE position_affichage (
  chauffeur_id INT,
  lat FLOAT, lng FLOAT,
  maj_at TIMESTAMP  -- peut être vieux de quelques secondes, sans risque
);

CREATE TABLE position_verrouillee_pour_calcul (
  chauffeur_id INT,
  lat FLOAT, lng FLOAT,
  version INT  -- verrou optimiste : le calcul d'ETA doit relire cette version
);
```

### Analogie

Analogie : l'état partagé d'un système, c'est le plan de salle d'un restaurant en service,
consulté à la fois par le maître d'hôtel qui place les clients et par le serveur qui vérifie
si une table est libre, et la carte marine partagée par la passerelle et la salle des machines
pendant une manoeuvre.
Où l'analogie casse : sur un plan de salle physique ou une carte marine, une personne peut
crier "attends, je modifie" et tout le monde s'arrête un instant. Dans un système logiciel,
deux flux concurrents peuvent lire et écrire l'état au même instant sans qu'aucun signal
naturel ne les synchronise, sauf si le code l'impose explicitement (verrou, transaction).

### Comment tracer les frontières d'un système existant

Une méthode concrète, applicable à n'importe quel système que tu reçois déjà construit :
liste toutes les données qu'il manipule, et pour chacune, réponds à ces trois questions.

```text
   Pour chaque donnée du système :
     1. Qui l'écrit ? (un seul acteur, ou plusieurs en concurrence ?)
     2. Qui la lit, et pour quel usage ? (affichage tolérant, ou calcul qui engage
        une conséquence irréversible : facturation, envoi, décision automatique)
     3. Si cette donnée est fausse pendant 5 secondes, qui le remarque et à quel coût ?

   Réponse "personne / affichage / coût nul"  --> état tolérant, pas besoin de verrou
   Réponse "plusieurs acteurs / calcul engageant / coût élevé" --> état à protéger
```

Ce tri, fait une seule fois par système, évite la sur-ingénierie (mettre un verrou partout
"par précaution") autant que le sous-dimensionnement (ne verrouiller nulle part et découvrir
le bug en charge réelle).

### Exemple chiffré fictif : le coût d'un état mal identifié

Dans cet exemple chiffré fictif, un système de tournées de livraison avec 40 chauffeurs
actifs subit environ 12 incohérences d'ETA visibles côté client pendant un mois de charge
illustrative. Chaque incohérence génère un appel au support de 6 minutes, soit 72 minutes
mensuelles. Ces chiffres servent uniquement à exercer le calcul : ils ne décrivent pas un
système réel et ne constituent pas une mesure observée. Un correctif hypothétique aurait pu
prendre moins d'une heure si l'état avait été identifié dès la conception. Le ratio coût de prévention / coût de correction tardive n'est presque
jamais en faveur du "on verra plus tard".

### Contre-exemple fictif : sur-protéger un état qui ne le mérite pas

L'erreur inverse existe et coûte aussi cher. Dans le même scénario pédagogique de tournées, un développeur
ajoute un verrou pessimiste (transaction bloquante) autour de la lecture du nom du chauffeur
affiché dans l'interface de suivi, "par précaution". Cette donnée change une fois par mois
en moyenne (changement d'affectation), elle est lue des centaines de fois par seconde en
période de pointe. Le verrou transforme un simple affichage en goulot d'étranglement : les
écrans de suivi rament pour tout le monde à chaque lecture, pour protéger une donnée qui
n'a jamais eu besoin de cohérence stricte. Dans cet exemple, le coût de la sur-ingénierie est aussi important que
celui de la sous-ingénierie, simplement moins visible en démo. Ce contre-exemple illustre un mécanisme ; il ne rapporte pas un incident observé.

```text
   Sous-protection : pas de verrou sur une donnée critique
        --> bug de course, incohérence visible côté client, rare mais coûteux

   Sur-protection : verrou sur une donnée qui change une fois par mois
        --> ralentissement systématique de toutes les lectures,
            visible en permanence, pour un risque qui n'existait pas
```

### Vérifier un modèle avant un éventuel déploiement

Une méthode rapide pour éviter les deux excès : pour chaque donnée jugée "à protéger",
demande combien de fois par mois elle est réellement modifiée en concurrence, et combien de
fois par seconde elle est lue. Un ratio lecture/écriture très élevé avec peu d'écritures
concurrentes réelles est un signal que le verrou coûtera plus cher en performance qu'il ne
rapportera en sécurité, et qu'une alternative plus légère (relecture avant écriture,
notification de conflit a posteriori) suffit largement.

## Compromis

| Option                                   | Coût                                    | Bénéfice                                                                         | Quand choisir                                                                 |
| ---------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Un seul état partagé pour tout usage     | Simple à coder au départ                | Risque de conditions de course dès que deux usages ont des exigences différentes | Prototype jetable, faible enjeu de cohérence                                  |
| Séparer l'état par exigence de cohérence | Plus de code, plus de tables/structures | Élimine une classe entière de bugs de concurrence                                | Dès qu'un même état sert à la fois de l'affichage et du calcul métier facturé |

## Pièges classiques

- Ajouter un champ à une entité existante sans se demander qui d'autre la lit en concurrence
  : symptôme : bug de course qui n'apparaît qu'en charge réelle, jamais en local.
- Confondre "frontière du système" avec "frontière du code" : symptôme : faire confiance
  aveuglément à une API tierce parce qu'elle est "dans le même repo" logique.
- Ignorer les effets de bord d'une fonction qu'on pense "pure" : symptôme : un test qui passe
  en isolation mais casse en série parce qu'un effet de bord persiste entre deux tests.
- Traiter tout état comme devant être parfaitement cohérent : symptôme : sur-ingénierie de
  verrous et de transactions là où une incohérence de quelques secondes serait sans impact.
- Ne jamais refaire l'exercice de tri "état tolérant / état à protéger" après une évolution
  du produit : symptôme : une donnée conçue à l'origine pour de l'affichage se retrouve
  utilisée, des mois plus tard, dans un calcul qui l'exige cohérente, sans qu'on l'ait décidé.

## Ce que tu dois savoir défendre

1. Dans le cas fictif Kintana (ou dans un système simple que tu connais), identifie une donnée qui peut tolérer un léger retard et une autre qui doit rester cohérente : justifie la différence. Tu peux rester entièrement dans le scénario fourni.
2. Explique pourquoi ajouter un champ à une table existante n'est jamais un acte neutre du
   point de vue du modèle en système.
3. Donne un exemple d'effet de bord qu'on oublie facilement de considérer comme tel.

### Ce que ce modèle change dans ta façon de lire une spec

Quand une spec de feature arrive, elle décrit presque toujours le cas nominal : "l'utilisateur
fait X, le système répond Y". Elle ne décrit presque jamais l'état partagé sous-jacent. Le
réflexe à construire : avant d'écrire du code, reformule la spec en termes d'entrées, d'état
touché, et d'effets de bord déclenchés, puis pose la question de la concurrence sur chaque
état identifié. Ce travail prend cinq à dix minutes et coûte beaucoup moins cher que le bug
de course qui pourrait apparaître en production, trois semaines plus tard, sur un système déjà utilisé.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Penser en systèmes** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : compléter la note de conception (partie 2/3)

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

> **Statut :** exercice conceptuel facultatif de première passe. Reprends la note commencée dans [Pourquoi ce niveau existe](01-01-why-this-level.md) ; ne recrée pas un livrable. Le scénario demeure fictif et aucune donnée réelle n'est à collecter.

**Mission liée à « Penser en systèmes » :** ajoute à la même note un schéma avec les acteurs, les entrées, les sorties, l'état et les deux invariants déjà identifiés. Pour chaque élément, indique qui le modifie et qui l'utilise. Ne choisis pas encore une architecture distribuée.

**Livrable :** la même note enrichie d'un schéma simple et de deux lignes « qui écrit / qui lit ». Un dessin à la main ou du texte suffit.

**Critères d’acceptation :** les flèches ont un sens ; les acteurs sont distingués des données ; les hypothèses restent identifiées ; tu peux expliquer le schéma à voix haute en une minute.

**Transfert facultatif :** modifie un acteur dans le scénario fictif et indique quelle partie du schéma doit changer.
