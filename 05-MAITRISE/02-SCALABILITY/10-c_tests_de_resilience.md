---
stability: intemporel
acte: appliquer
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Tests de résilience : prouver qu'une panne d'un service dépendant ne coule pas les autres

Temps de lecture ~8 min

> **Prérequis explicite.** Ce fichier suppose acquis
> [`03-distributed_primitives.md`](03-distributed_primitives.md) (idempotence, retry/backoff,
> timeout, circuit breaker, CAP) ET
> [`09-b_hypotheses_panne_distribuee.md`](09-b_hypotheses_panne_distribuee.md) (le protocole
> hypothèse-dirigé appliqué à un incident distribué). Ce fichier ne rejoue pas un incident déjà
> survenu : il t'apprend à en **provoquer un toi-même, avant qu'il n'arrive en vrai**, pour
> prouver qu'une primitive tient sous panne plutôt que de la croire sur parole.

## Ce que ce fichier n'est pas

Le [Chaos Day](../06-ANNEXES/27_synthese_mini_projects/02-chaos_day.md) simule une journée
pourrie sur **un seul système** (panne DB, changement de spec, incident de déploiement). Ici,
la question est différente et plus étroite : **quand le service A dépend du service B, et que
B tombe, qu'est-ce que A fait réellement ?** Un test unitaire ne répond jamais à cette question,
parce qu'il ne fait jamais tomber un vrai service dépendant : il mocke la dépendance et suppose
qu'elle répond comme prévu. Un test de résilience part de l'hypothèse inverse : la dépendance
va se comporter mal, et le but est de mesurer ce que ton service fait quand c'est le cas.

## Le principe : injecter la panne, pas la lire dans une doc

Une primitive citée dans un ADR ("j'ai mis un circuit breaker") est une affirmation. Une
primitive **testée sous panne injectée** est une preuve. La différence tient en une phrase :
tu ne demandes jamais "est-ce que j'ai un timeout ?", tu demandes "qu'est-ce qui se passe
exactement, mesuré, quand j'éteins le service pendant que l'autre continue de lui parler ?".

## Protocole (obligatoire, rendu écrit)

Sur ton fil rouge, choisis une dépendance réelle entre deux de tes services (ou, si ton projet
n'a qu'un seul service, entre ton service et une dépendance externe qu'il appelle : une base de
données, une API tierce, un cache). Puis :

1. **Choisis une primitive à mettre à l'épreuve** parmi les six de
   `03-distributed_primitives.md` : pas "je teste tout", une seule à la fois. Exemple : le
   circuit breaker qui protège l'appel au service de paiement.

2. **Formule la prédiction avant de lancer l'injection**, une phrase falsifiable : "si je coupe
   le service de paiement, mon service principal doit continuer à répondre sur ses autres routes
   en moins de 500 ms, et la route de paiement doit répondre 503 en moins de 200 ms après N
   échecs consécutifs". Une prédiction vague ("ça devrait bien se passer") ne compte pas.

3. **Injecte la panne, minuteur en main.** Selon ton contexte technique, une des méthodes
   suivantes suffit : inutile d'installer un outil de chaos engineering complet pour cet
   exercice :
   - couper le processus ou le conteneur du service dépendant ;
   - bloquer le port avec un firewall local le temps du test ;
   - remplacer temporairement l'URL appelée par une adresse qui ne répond jamais (timeout
     garanti) ;
   - ajouter un délai artificiel dans le code de la dépendance (`await sleep(30000)`) pour
     simuler une lenteur plutôt qu'une coupure franche : les deux ne produisent pas le même
     symptôme, teste les deux si le temps le permet.

4. **Mesure, ne suppose pas.** Chronomètre le temps avant que le service appelant réagisse
   (timeout atteint, circuit breaker ouvert). Observe si les routes qui ne dépendent pas du
   service coupé continuent de répondre normalement, ou si elles sont entraînées dans la panne
   (c'est le symptôme d'un défaut d'isolation, pas seulement d'un défaut de circuit breaker).

5. **Compare la mesure à la prédiction de l'étape 2.** Un écart n'est pas un échec de
   l'exercice : c'est le résultat le plus utile. Si le circuit breaker ne s'ouvre jamais, ou
   s'ouvre après 30 secondes au lieu de 3, c'est une preuve, pas une supposition.

## Preuve à livrer

Un fichier `RESILIENCE-TEST.md` sur ton fil rouge, avec :

- la dépendance testée et la primitive visée ;
- la prédiction écrite **avant** l'injection (horodatée) ;
- la méthode d'injection utilisée ;
- les chiffres mesurés (temps avant réaction, routes affectées vs routes épargnées) ;
- l'écart entre prédiction et mesure, et ce que tu corriges si la primitive n'a pas tenu.

## Ce qui invalide l'exercice

- Une primitive testée en la lisant dans le code plutôt qu'en la déclenchant réellement.
- Une prédiction écrite après avoir vu le résultat (elle doit être horodatée avant l'injection).
- Un test qui ne mesure que le service coupé lui-même, sans vérifier si les routes voisines
  ont été entraînées dans la panne : c'est précisément cette contagion que le test doit
  révéler ou écarter.

## RÉSUMÉ

Une primitive de résilience non testée sous panne réelle est une hypothèse, pas une garantie.
Ce protocole ajoute à `09-b_hypotheses_panne_distribuee.md` (qui explique une panne déjà
survenue) son symétrique : provoquer une panne contrôlée avant qu'elle ne survienne en
production, pour mesurer : chronomètre en main : si le circuit breaker, le timeout ou
l'isolation tiennent vraiment, plutôt que de les croire sur la foi d'une ligne de code qui les
mentionne.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
