---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Challenge : Problem Hunt

Temps de lecture ~3 min

## Contexte : choisir une voie de preuve sans confondre les sources

Le scénario de réseau de trois cabinets vétérinaires ci-dessous est une **simulation pédagogique**. Le carnet papier, le groupe WhatsApp et les difficultés de coordination sont des éléments fictifs fournis pour l'exercice ; ils ne sont pas des observations de terrain.

Tu choisis une des deux voies avant de commencer :

### Voie A : Terrain (à privilégier lorsque tu as un accès réel)

Choisis un problème professionnel, associatif ou personnel que tu peux observer avec l'accord des personnes concernées. Interroge au moins deux rôles impliqués dans le même processus, ou explique précisément pourquoi le second rôle n'est pas accessible. Demande des exemples de comportements passés, pas des opinions sur une application future. Note les faits, leur source et ce qui reste inconnu. N'enregistre pas de données personnelles ou confidentielles sans nécessité et autorisation.

### Voie B : Simulation (si aucun terrain n'est accessible)

Utilise le scénario vétérinaire fictif décrit dans ce challenge. Tu peux inventer des signaux plausibles pour tester ton raisonnement, mais chacun doit être étiqueté **HYPOTHÈSE DE SIMULATION**. N'écris jamais « observé », « interviewé » ou « mesuré » pour un fait que tu as inventé. Cette voie entraîne le cadrage ; elle ne prouve pas une interview, une observation ni une validation terrain.

## Ce que tu dois produire

Un document de cadrage, en markdown, structuré exactement comme suit :

1. **Demande initiale vs besoin réel** :
   - Voie A : Terrain : distingue les faits directement observés, les propos rapportés, les hypothèses et les inconnues. Identifie au moins trois interprétations possibles de la demande réelle et indique quelle preuve permettrait de les départager.
   - Voie B : Simulation : identifie au moins trois interprétations différentes de « mieux gérer les urgences » et propose des signaux faibles plausibles, chacun étiqueté **HYPOTHÈSE DE SIMULATION**. Explique quelle interprétation tu retiendrais provisoirement et quelle observation réelle pourrait l'invalider.
2. **Jobs to be done** : au moins deux jobs distincts pour au moins deux rôles différents
   (secrétaire, vétérinaire de garde, propriétaire d'animal), formulés avec la structure
   "Quand..., je veux..., pour pouvoir...". En voie Terrain, si le second rôle n'est pas
   accessible, présente son job comme une hypothèse à vérifier et indique explicitement
   qu'il n'a pas été confirmé par un entretien.
3. **Non-objectifs** : au moins trois non-objectifs écrits, chacun avec sa raison d'être
   explicite (risque, coût, complexité évitée), et une explication de la différence entre
   chaque non-objectif et une simple fonctionnalité reportée.
4. **Métrique de succès et seuil d'échec** : une métrique reliée directement au symptôme
   initial (pas une métrique de vanité), et un seuil d'échec chiffré, à évaluer après une
   durée que tu justifies.

## Contraintes

- Si tu utilises la simulation, conserve le contexte des cabinets vétérinaires, des urgences et du groupe WhatsApp ; ne le présente jamais comme un cas réel.
- Si tu utilises le terrain, tu peux choisir un autre domaine, mais distingue les faits des hypothèses et respecte la confidentialité des personnes.
- Le document ne doit contenir aucune fonctionnalité déjà décrite en détail : c'est un document de cadrage, pas une spécification technique.
- Longueur cible : 80 à 150 lignes de markdown dense, hors notes de provenance.

## Critères de réussite mesurables

- Les trois interprétations de la demande initiale sont réellement différentes entre elles.
- Chaque job to be done indique une situation concrète et un rôle ; il n'est pas une envie générale.
- Chaque non-objectif justifie une décision de conception, un risque, un coût ou une complexité évitée.
- La métrique est reliée au symptôme et accompagnée d'un dénominateur, d'une période et d'une limite d'interprétation.
- Le seuil d'échec est chiffré et son origine est expliquée ; une valeur inventée en simulation reste une hypothèse, pas un objectif validé.
- La provenance est explicite : `TERRAIN` pour un fait observé/rapporté avec source autorisée, `HYPOTHÈSE` pour une interprétation, `SIMULATION` pour un fait inventé.
- Aucun résultat d'interview, de mesure ou de validation réelle n'est revendiqué dans la voie Simulation.

## Durée cible

Pour la voie Simulation, vise environ 3 heures de rédaction en deux passes, avec une pause entre les deux. Pour la voie Terrain, ce temps couvre uniquement la rédaction : l'accès aux personnes, les entretiens et l'observation peuvent demander davantage de temps.

Passe 1 : demande, faits disponibles, interprétations et jobs to be done.
Passe 2 : non-objectifs, métrique, seuil d'échec et vérification des hypothèses.

Ne transforme pas la limite de temps en prétexte pour inventer des données terrain. Si une preuve manque, inscris-la comme inconnue et propose comment la collecter.

## Livrable

Un fichier Markdown unique, nommé `cadrage-probleme.md`, respectant la structure ci-dessus.

## Provenance et date

En tête du livrable, indique la voie choisie (`TERRAIN` ou `SIMULATION`), la date de rédaction et les sources utilisées. Pour la voie Terrain, indique le nombre d'entretiens/observations, les rôles rencontrés et les limites d'accès, sans révéler d'identité ni de donnée confidentielle. Pour la voie Simulation, écris explicitement : « Aucun entretien ni fait terrain n'a été réalisé pour cet exercice ; les signaux présentés sont fictifs. » Indique aussi si tu avais imaginé une solution avant de cadrer : cette information aide à repérer un biais d'ancrage.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
