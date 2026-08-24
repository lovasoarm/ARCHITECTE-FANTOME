---
stability: intemporel
scope: 19_supervise_the_ai
cognitive_level: L6
perturbation_modes: [decision_organisationnelle, preuve_partielle]
anti_recipe_key: decision_organisationnelle+preuve_partielle
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : salle de contrôle :** l’IA vient de livrer une version qui
> compile. Ça ne veut pas dire que la spécification n’a pas bougé. Le job du
> superviseur est de détecter le changement avant de le laisser devenir du code.

# SPEC DRIFT TRIGGERS

Ce fichier est la liste statique des situations qui déclenchent une revalidation
de la spécification dans `19_supervise_the_ai`. Il ne contient pas les occurrences
réelles du projet : celles-ci sont consignées dans `06-SPEC-DRIFT-DRILL.md`.

## T1 : Changement de comportement du modèle

Si l’IA modifie une hypothèse, un contrat ou un comportement attendu du watcher ou
du notifier, arrête la génération suivante et réécris explicitement l’invariant
concerné dans l’ADR ou le prompt qui le porte.

## T2 : Nouvelle contrainte de sûreté ou de reprise

Toute nouvelle exigence liée à `kill -9`, idempotence, perte d’événement, reprise
après redémarrage ou duplication déclenche une relecture du contrat d’événement et
du plan de test.

## T3 : Changement de frontière ou d’outil

Changement de format d’événement, de stratégie de persistance, de source de vérité
ou de mécanisme de transport : revalider l’ADR concerné avant d’accepter une
nouvelle proposition de l’IA.

## T4 : Écart observé entre promesse et livraison

Si la review constate que l’IA a produit quelque chose qui respecte les mots du
prompt mais pas l’intention vérifiable, le changement est traité comme un drift :
rejet, reformulation du prompt, preuve du nouveau résultat.

## Règle

Un drift n’est pas fermé par une phrase. Il est fermé quand l’invariant, la décision,
le test et la trace de supervision sont à nouveau alignés.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
