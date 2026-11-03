---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** un plateau n’est pas un verdict. C’est un signal à diagnostiquer avec des preuves.

# Sortir d’un plateau

> **Ressource différée et facultative.** Tu peux l'ouvrir si une difficulté persiste, mais elle n'est pas dans la première passe du Référentiel et ne conditionne pas Fundamentals. Pour une installation qui échoue, une consigne incomprise ou un blocage réel, demande de l'aide dès que nécessaire : n'attends jamais 2 ou 7 jours.

Temps de lecture ~3 min

Compétence visée : diagnostiquer une stagnation, identifier sa cause probable et choisir une intervention mesurable sans changer de parcours par impulsion.

## Le seuil de surveillance

- **2 jours sans progrès observable** : commence à instrumenter le blocage.
- **7 jours sans progrès observable** : joue tout le protocole ci-dessous.

Ces seuils sont des règles opérationnelles du parcours, pas des lois psychologiques universelles.

## Arbre de décision

### 1. Prérequis

As-tu réussi le prérequis du module courant ?

- non : reviens au prérequis et produis la preuve demandée ;
- oui : passe à la question suivante ;
- résultat ambigu : reproduis le contrôle à livre fermé.

### 2. Lecture ou pratique ?

**Lecture** : explique le concept sans notes, donne un contre-exemple et identifie une limite.

**Pratique** : produis une tentative minimale avant de chercher une explication supplémentaire.

### 3. Debug ou conception ?

**Debug** : formule au moins trois hypothèses, indique pour chacune ce qui la confirmerait ou l’infirmerait, puis mesure.

**Conception** : explicite le problème, les contraintes et deux options avant de choisir une structure.

### 4. Fatigue ou compréhension ?

Si tes sessions sont systématiquement courtes et improductives pendant plusieurs jours, mesure d’abord le contexte de travail. Ne transforme pas automatiquement un problème de capacité en problème de motivation.

### 5. Explication externe

Explique ton blocage à voix haute pendant trois minutes. Si tu utilises une IA, demande des questions de diagnostic et des contre-exemples, jamais la solution finale.

### 6. Réduction temporaire de l’assistance IA

Pendant 48 h, désactive l’autocomplétion ou le copilote qui fournit les étapes de résolution. Le but est de mesurer ton autonomie, pas de punir l’utilisation d’un outil.

## Journal de plateau

Une ligne par session :

```text
DATE | MODULE | SYMPTÔME | HYPOTHÈSE | MESURE | ACTION | RÉSULTAT
```

Après plusieurs entrées, cherche un pattern. Si la même hypothèse échoue plusieurs fois, change d’hypothèse avant d’augmenter la quantité de travail.

## Quand reculer

Si trois tentatives instrumentées n’améliorent aucun indicateur de maîtrise, recule vers le dernier prérequis qui n’est pas démontré. N’abandonne pas le parcours pour une autre source tant que tu n’as pas isolé le mécanisme du blocage.

## Checkpoint

Sans relire : donne deux hypothèses expliquant ton plateau, une mesure discriminante pour chacune, puis une observation qui t’obligerait à changer de diagnostic.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Sortir d’un plateau », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:reference -->

## Repère visuel utile : Référentiel de compétences par preuves

```text
compétence -> tâche observable -> artefact
     ^                         |
     |                         v
révision datée <- verdict <- critère explicite
     |
     +-> remédiation ou nouvelle preuve
```

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Kintana est un cas d'étude fictif. Cette ressource ne demande pas d'y diagnostiquer une API, une base ou un problème d'idempotence avant que ces notions aient été enseignées.

## Mission utile : une micro-action sans jargon

**Livrable et critères d’acceptation :** une courte note contenant le blocage observé et une prochaine action faisable (ou une demande d’aide). Il n’est pas nécessaire de résoudre un problème technique ni de produire du code.

Choisis une difficulté actuelle et comprise (par exemple, retrouver le fichier que tu viens de créer). Note : 1) ce que tu voulais faire ; 2) ce que tu observes ; 3) la prochaine petite action ou la personne à qui demander de l'aide. Si tu ne sais pas diagnostiquer le problème, écris-le simplement : demander de l'aide est une action valable.

### Transfert : facultatif

Plus tard, après les modules correspondants, la même méthode pourra servir à analyser un problème technique de Kintana. Aucun test, code, API ou transfert n'est attendu ici.
