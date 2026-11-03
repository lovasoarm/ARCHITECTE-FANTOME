---
perennite: evolutif
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: OpenTelemetry standardise, les vendors bougent.
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: diagnostic_mastery
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : debugging (01-CADRAGE/03-DEBUGGING), erreurs (01-CADRAGE/04-ERROR-HANDLING). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : observability

<!-- AF-DIAGRAM:tracing -->

```text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

<!-- AF-DIAGRAM:observability -->

```text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Temps de lecture ~5 min

> **Durée de vie : 2-3 ans, revenir en 2028.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Temps de lecture ~8 min

Ton app est en prod. Un utilisateur signale un bug vague : "ça marche pas parfois". Tu n'as aucun log structuré, aucune trace, aucune métrique. Tu es aveugle, et tu débugues en production à l'aveugle, en ajoutant des logs et en redéployant, en espérant reproduire le bug avant que d'autres utilisateurs ne le signalent aussi.

L'observabilité, c'est la différence entre voir le problème arriver et le découvrir trois jours plus tard via un ticket de support frustré.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Un système en prod n'est pas un système en dev : tu ne peux pas mettre un breakpoint (point d'arrêt) sur le serveur d'un client pour voir ce qui se passe en direct. Sans observabilité, la seule information disponible quand quelque chose casse, c'est ce que les utilisateurs veulent bien signaler, ce qui est rare, vague, et tardif.

Ce module construit la capacité de voir ce qui se passe en prod avant que l'utilisateur ait besoin de le signaler : le structured logging (logs en JSON avec un correlation ID, un identifiant unique qui permet de suivre une requête précise à travers tout le système), le distributed tracing (suivre une requête à travers plusieurs services sans perdre le fil de ce qui s'est passé à chaque étape), les métriques et l'alerting (compteurs, gauges, histogrammes qui annoncent un problème avant qu'il ne devienne critique), Sentry pour capturer et contextualiser les erreurs en production avec tout le contexte nécessaire pour les comprendre, et le debug en prod sans pouvoir reproduire localement, grâce à des snapshots et des feature flags (drapeaux qui permettent d'activer/désactiver une fonctionnalité sans redéployer).

L'objectif final : qu'un incident en prod se détecte et se diagnostique en minutes, pas en heures de fouille à l'aveugle dans des logs non structurés.

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev sans observabilité découvre les problèmes par les plaintes des utilisateurs, toujours en retard, toujours avec une information incomplète. Un message d'erreur générique sans contexte ("Error: undefined") ne dit rien sur quelle requête, quel utilisateur, quelle donnée a déclenché le problème, ce qui transforme chaque debug en enquête longue et frustrante.

Sur un système distribué avec plusieurs services, l'absence de tracing rend impossible de savoir où, parmi 5 ou 10 services différents, une requête a réellement échoué ou ralenti. Le dev se retrouve à ajouter des logs manuellement service par service, en redéployant à chaque étape, ce qui peut prendre des heures pour localiser un problème qu'un trace correct aurait montré instantanément.

Et sans alerting proactif, les problèmes de performance ou de taux d'erreur grandissent silencieusement jusqu'à devenir critiques, alors qu'une alerte bien configurée aurait prévenu l'équipe dès les premiers signes, bien avant que ça n'affecte une majorité d'utilisateurs.

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
erreur en prod sans contexte exploitable            --> structured logging  --> JSON avec correlation ID
requête qui traverse plusieurs microservices          --> distributed tracing --> suivi complet de bout en bout
dégradation de performance progressive et invisible       --> métriques + alerting --> détection avant la crise
exception capturée mais sans contexte sur ce qui s'est passé   --> Sentry       --> capture enrichie et priorisée
bug impossible à reproduire localement               --> debug en prod    --> snapshots et feature flags
```

L'observabilité n'est jamais "optionnelle" sur un système qui a des utilisateurs réels : c'est la seule façon de savoir si ton système est en bonne santé sans attendre qu'un humain te le dise après coup, souvent frustré.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Le besoin de voir ce qui se passe en prod est intemporel. Ce qui a beaucoup évolué, c'est la sophistication des outils : on est passé d'un simple fichier de logs texte brut à des plateformes complètes de tracing distribué et d'alerting intelligent, rendues nécessaires par la complexité grandissante des architectures distribuées modernes.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Avant, "debugger en prod" voulait souvent dire ajouter des `console.log` partout et lire un fichier de logs texte non structuré, où chercher une information précise demandait de parcourir manuellement des milliers de lignes sans structure exploitable. Le passage au logging structuré (JSON, avec des champs cohérents et un correlation ID systématique) a transformé les logs en données qu'on peut filtrer, chercher, et corréler automatiquement.

La montée des architectures en microservices a aussi rendu le tracing distribué presque indispensable : quand une seule requête traverse 5 services différents, savoir où exactement le ralentissement ou l'erreur s'est produit devient impossible sans un système de trace qui suit la requête de bout en bout.

---

## 6) NOYAU DUR DU MÉTIER ?

Prérequis explicite : `03-PILOTAGE/05-OBSERVABILITY`, prérequis `02-CONSTRUCTION/13-RUNTIME-ENV` + `02-CONSTRUCTION/19-API-CRAFT`. Tu ne peux pas observer correctement un système sans déjà comprendre où il s'exécute et comment ses APIs fonctionnent. Central aussi dans le mini-projet `06_ultras_dashboard`, où l'observabilité (logs structurés, tracing, alerting, Sentry) est une condition directe pour qu'un système avec des milliers d'utilisateurs en direct ne s'effondre jamais sans que l'équipe le voie venir.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

Plus un système grandit et se distribue, plus le besoin de visibilité sur son fonctionnement réel augmente, jamais l'inverse. Un dev qui sait construire un système observable dès la conception (pas après le premier incident grave) reste une ressource stratégique pour n'importe quelle équipe, parce que la capacité à diagnostiquer rapidement un problème en prod est directement liée au temps d'indisponibilité que subissent les utilisateurs réels.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Sans observabilité, tu découvres tes problèmes par les plaintes des utilisateurs, toujours en retard. Ça casse de trois façons sans elle : logs inexploitables, requêtes perdues dans un système distribué, dégradation silencieuse jusqu'à la crise. Ce besoin augmente avec la complexité du système, jamais l'inverse.

Maintenant, ouvre `02-structured_logging.md`. Et commence à donner à ton système les yeux qu'il n'a jamais eus.

> Ce module réutilise : le debugging du `01-CADRAGE/03-DEBUGGING`, le logging vu en gestion d'erreurs (`01-CADRAGE/04-ERROR-HANDLING`).

> **Si tu arrives ici depuis `03-QUALITY-SHIELD/03-observability.md`** : ce module est le
> cours complet dont ce fichier-là n'était qu'un résumé de contexte. Repars de zéro ici,
> tout y est.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

<!-- AF-LESSON-PROFILE: observability -->

## Repères de décision

- **Pourquoi :** L'observabilité réduit le temps entre un symptôme et une hypothèse vérifiable. Elle aide à savoir si le problème est local, partagé ou externe.
- **Quand l’utiliser / quand l’éviter :** Instrumente un parcours critique et chaque frontière qui peut échouer. Évite les logs sans action associée, les cardinalités infinies et les identifiants personnels.
- **Limites :** Plus de télémétrie n'est pas toujours mieux : stockage, coûts, bruit et données sensibles augmentent. Une métrique isolée ne prouve pas une cause.

## Mécanisme : la version sans magie

Relie logs structurés, métriques et traces par un identifiant de corrélation ; choisis des signaux qui répondent à une question opérationnelle ; définis l'action attendue sur alerte.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : observability** se rattache à ce cas concret : Le parcours Kintana création -> réservation -> notification doit pouvoir être suivi sans enregistrer le contenu personnel de la demande.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Traçage du parcours critique Kintana

> **Arc Walking Dead :** quand le camp crie « ça ne marche plus », les logs, métriques et traces doivent te dire où regarder sans exposer les habitants.

**Mission liée à « Pourquoi ce module mérite ton temps : observability » :** Instrumente le parcours choisi avec correlation ID, événements structurés et métriques utiles. Injecte une panne dans une frontière et rédige un diagnostic qui s'appuie uniquement sur les signaux collectés.

**Livrable :** schéma de logs, métriques avec unités et labels bornés, trace corrélée, règle d'alerte et runbook de diagnostic.

**Critères d’acceptation :** chaque signal répond à une question ; les secrets et contenus personnels sont exclus ; cardinalité maîtrisée ; l'alerte possède une action ; les résultats simulés restent LAB/SIMULATION.

**Transfert obligatoire :** Une dépendance externe dégrade sa latence sans tomber. Explique quels signaux distinguent saturation, lenteur fournisseur et erreur interne.
