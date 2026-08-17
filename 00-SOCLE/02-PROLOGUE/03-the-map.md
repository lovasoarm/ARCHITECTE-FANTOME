# La carte : les 16 niveaux

## La scène

Avant de partir en randonnée sur un itinéraire de plusieurs jours, tu regardes la carte
entière, pas seulement le premier sentier. Tu repères où sont les cols difficiles, où tu
pourras te ravitailler, où le dénivelé va te casser les jambes. Ce fichier est cette carte.
Tu n'as pas besoin de la mémoriser, mais tu dois savoir qu'elle existe et pourquoi l'ordre
n'est pas arbitraire.

## Ce qui se passe vraiment

Les 16 niveaux sont organisés en quatre arcs. Chaque arc construit une capacité que l'arc
suivant présuppose. Sauter un arc, c'est arriver au niveau 10 sans savoir pourquoi le
niveau 10 est nécessaire.

```text
ARC I : FONDATIONS DE PENSEE (niveaux 00-03)
  00 Prologue         --> les règles du jeu
  01 Mindset          --> penser en systèmes, coût des décisions, incertitude
  02 Modélisation     --> domaines métier, invariants, langage ubiquitaire
  03 Données & état   --> cohérence, transactions, sources de vérité

ARC II : CONSTRUCTION (niveaux 04-08)
  04 Architecture applicative   --> frontières, couches, dépendances
  05 API & contrats             --> versioning, compatibilité, erreurs
  06 Persistance avancée        --> migrations, index, requêtes coûteuses
  07 Concurrence & parallélisme --> verrous, files, idempotence
  08 Tests & vérification       --> pyramide de tests, mutation testing, contrats

ARC III : SYSTEME EN PRODUCTION (niveaux 09-12)
  09 Observabilité      --> logs, métriques, traces, alerting utile
  10 Résilience & pannes --> dégradation, retries, circuit breakers
  11 Performance         --> profiling, goulots d'étranglement, capacité
  12 Sécurité appliquée  --> surface d'attaque, auth, secrets, audit

ARC IV : INGENIEUR EN CONTEXTE (niveaux 13-15)
  13 Travail en équipe technique --> revues, dette, standards partagés
  14 Décision & influence        --> arbitrages produit/technique, négociation
  15 Le boss final                --> construire un système complet sous contrainte réelle
```

Chaque niveau débloque une capacité précise, pas un vague "tu en sais plus". Voici ce que
chaque arc rend possible concrètement.

### Arc I : Fondations de pensée

Sans cet arc, tu construis vite des systèmes qui s'effondrent dès que la réalité contredit
les hypothèses implicites que tu n'as jamais explicitées. Ce que tu débloques : la capacité
à modéliser un problème avant de coder, à évaluer le coût d'une décision avant de la prendre,
et à distinguer une donnée qui doit rester cohérente d'une donnée qui peut être approximative.

Exemple concret : à la fin de l'arc I, face à un système de gestion des adhésions d'un club
d'escalade (adhésions, accès aux murs par créneaux, assurance obligatoire), tu sais identifier
que "l'assurance valide" est un invariant qui doit bloquer l'accès en temps réel, alors que
"le nombre total d'adhérents ce mois-ci" peut être calculé de façon asynchrone sans risque.

### Arc II : Construction

Sans cet arc, tu sais quoi construire mais tu le construis dans une structure qui rend chaque
changement futur plus cher que le précédent. Ce que tu débloques : la capacité à découper un
système en composants dont les frontières résistent au changement, à concevoir des APIs qui
survivent à leurs propres évolutions, et à écrire des tests qui détectent de vraies
régressions plutôt que de la friction.

Exemple concret : sur un système de refacturation d'énergie pour un syndic d'immeubles, l'arc
II te donne les outils pour distinguer le contrat d'API de calcul de charges (qui doit rester
stable pour les intégrations comptables externes) de son implémentation interne (qui peut
changer librement tant que le contrat tient).

### Arc III : Système en production

Sans cet arc, ton système fonctionne en local et s'effondre silencieusement en production,
et tu l'apprends par un incident plutôt que par une mesure. Ce que tu débloques : la capacité
à voir ce qui se passe réellement dans un système que tu ne peux pas observer directement, à
concevoir pour l'échec plutôt que pour le cas nominal, et à raisonner sur la performance avec
des chiffres plutôt que des intuitions.

Exemple concret : sur un système de billetterie pour une régie de spectacle, l'arc III t'
apprend à distinguer un pic de charge normal (ouverture des ventes) d'une dégradation
anormale, et à concevoir la dégradation du système (afficher "complet provisoire" plutôt que
planter) au lieu de subir une panne totale au pire moment possible.

### Arc IV : Ingénieur en contexte

Sans cet arc, tu es un bon technicien isolé qui n'influence rien au-delà de son propre code.
Ce que tu débloques : la capacité à faire progresser une équipe entière (pas seulement toi),
à défendre un choix technique face à une pression produit légitime, et à livrer un système
complet, seul, sous une contrainte réelle et non simulée.

### Comment lire cette carte si tu es pressé

Certains lecteurs veulent sauter directement à l'arc qui les intéresse. Voici ce que ça coûte
réellement, arc par arc, si tu sautes ce qui précède :

```text
   Sauter l'arc I et attaquer l'arc II directement
        --> tu sais découper un système, mais tu découpes le mauvais système,
            parce que tu n'as jamais appris à identifier les invariants métier

   Sauter l'arc II et attaquer l'arc III directement
        --> tu sais observer un système, mais le système observé a des frontières
            si floues que tes métriques ne pointent jamais vers une cause précise

   Sauter l'arc III et attaquer l'arc IV directement
        --> tu sais argumenter en réunion, mais tu défends des choix techniques
            que tu n'as jamais vus se comporter sous charge réelle
```

### Contre-exemple : quand piocher dans le désordre est légitime

La carte n'interdit pas toute lecture non linéaire. Un ingénieur backend senior, déjà solide
sur la concurrence et la persistance (arc II largement acquis par la pratique), mais qui n'a
jamais eu à défendre un choix technique devant un product manager pressé, peut légitimement
sauter directement au niveau 14 (Décision & influence) sans repasser par l'arc II en entier.
Le risque existe quand même : il doit vérifier, avec l'auto-test d'entrée du niveau, que les
notions amont supposées acquises le sont vraiment, plutôt que de le supposer par confort.

```text
   Profil A : junior généraliste                Profil B : senior spécialisé backend
   --> suit les 16 niveaux dans l'ordre           --> passe l'auto-test d'entrée de
       sans exception                                 chaque niveau amont à l'arc IV,
                                                       saute ceux qu'il réussit sans effort
```

### Combien de temps représente la carte entière

À titre d'ordre de grandeur (le calcul précis vit dans `CURRICULUM.md`, jamais recopié ici
pour éviter deux sources de vérité qui divergent) : un parcours complet, lecture et exercices
compris, à raison de 6 heures par semaine, représente entre 7 et 11 mois selon la vitesse de
progression individuelle sur les boss-fights. Ce n'est pas un sprint. Un lecteur qui vise un
entretien technique dans deux semaines n'utilisera pas ce curriculum comme préparation
complète : il ciblera un ou deux niveaux précis correspondant à ses lacunes identifiées.

## Compromis

| Option                              | Coût                                    | Bénéfice                                                               | Quand choisir                                                                            |
| ------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Suivre les 16 niveaux dans l'ordre  | Long (plusieurs mois selon rythme)      | Modèle mental complet et cumulatif                                     | Objectif : devenir un ingénieur senior généraliste solide                              |
| Faire uniquement l'Arc I puis III   | Plus court, laisse des trous en Arc II  | Débloque vite le raisonnement critique sans maîtriser la construction | Tu es déjà bon technicien mais faible en modélisation et en lecture de systèmes en prod |

## Pièges classiques

- Vouloir sauter à l'Arc III (observabilité, résilience) parce que "c'est plus excitant" sans
  avoir fait l'Arc II : le symptôme est de savoir nommer les concepts sans savoir les
  appliquer à un système qu'on vient de construire soi-même.
- Traiter l'Arc IV comme "optionnel, c'est du soft skill" : le symptôme est de rester bloqué
  au rang d'exécutant senior sans jamais influencer les décisions d'équipe.
- Refaire un niveau entier après un échec de boss-fight au lieu de cibler la leçon précise en
  cause : perte de temps, et le symptôme est la démotivation par lassitude.
- Croire que la carte se lit une seule fois : le symptôme est de perdre de vue, au niveau 11,
  pourquoi le niveau 03 sur la cohérence des données reste pertinent pour un problème de
  performance.

## Analogie

Analogie : la carte des 16 niveaux est un plan de salle avant l'ouverture, et une carte d'itinéraire avec ses refuges.
Où l'analogie casse : un plan de salle se change en cours de service, l'ordre des niveaux non.

## Ce que tu dois savoir défendre

1. Pourquoi l'Arc I doit précéder l'Arc II, avec un exemple de ce qui casse si on inverse.
2. Donne un exemple concret de capacité débloquée par l'Arc III que l'Arc II ne peut pas
   donner, même en la faisant très sérieusement.
3. Pourquoi l'Arc IV existe dans un curriculum technique : qu'est-ce qui casse chez un
   ingénieur purement technique sans cet arc.

### Comment cette carte est utilisée dans le reste du curriculum

Chaque README de niveau, à partir du niveau 01, ouvre avec une section "Ce niveau réutilise"
qui pointe explicitement vers les niveaux amont concernés. Cette carte n'est donc pas un
document isolé que tu lis une fois : elle est le squelette que ces renvois activent à chaque
niveau. Si un renvoi te surprend ("pourquoi le niveau 11 sur la performance réutilise-t-il le
niveau 03 sur la cohérence des données ?"), reviens à cette carte pour comprendre la logique
d'ensemble avant de continuer.
