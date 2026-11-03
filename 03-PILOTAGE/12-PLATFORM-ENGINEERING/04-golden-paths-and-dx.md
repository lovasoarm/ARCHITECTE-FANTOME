---
stability: evolutif
acte: appliquer
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Dragon Ball Z :** un golden path n’est pas une autoroute où tout le monde est forcé de rouler. C’est le chemin où le combat est le moins coûteux quand la mission est standard.

# Golden Paths et Developer Experience : réduire la friction sans enfermer les équipes

## 1. Définitions

Un **Golden Path (parcours recommandé)** est une voie documentée, maintenue et automatisée pour accomplir une tâche récurrente avec un niveau de sécurité et de qualité connu. Il fournit un bon défaut, pas une obligation universelle.

La **Developer Experience (DX, expérience développeur)** désigne la facilité avec laquelle une personne peut comprendre, construire, tester, livrer et exploiter son logiciel. Elle dépend des outils, des processus, de la documentation, des dépendances organisationnelles et du feedback.

## 2. Pourquoi ces concepts existent

Une équipe perd du temps lorsqu'elle doit découvrir seule les versions compatibles, copier un pipeline depuis un ancien dépôt, deviner la configuration de sécurité et attendre une validation manuelle. Cette friction augmente le délai de livraison et crée des pratiques divergentes.

Un Golden Path transforme les bonnes pratiques répétées en parcours utilisable. Il doit rester améliorable : un chemin pénible ne devient pas bon parce qu'il est officiel.

## 3. Flux d'un Golden Path

```text
[Besoin développeur]
        |
        v
[Choix du parcours adapté]
        |
        v
[Template versionné] ---> [Paramètres + validations]
                                   |
                                   v
                             [Génération]
                                   |
                                   v
                           [Tests / policies]
                                   |
                            succès / échec
                                   v
                            [Déploiement]
                                   |
                                   v
                      [Documentation + feedback]
                                   |
                                   +----> amélioration du chemin
```

Le template ne doit pas être un copier-coller figé : il doit intégrer les versions supportées, tests, configuration de sécurité, ownership, observabilité et procédure de mise à jour.

## 4. Construire un chemin utile

1. Observer une tâche réelle auprès de plusieurs équipes (ex. démarrer un service HTTP).
2. Mesurer le parcours actuel : étapes, attentes, erreurs, demandes de support et détours.
3. Identifier les invariants qui doivent être sûrs (identité, logs, tests, réseau, ownership).
4. Définir un chemin minimal qui laisse les choix métier à l'équipe.
5. Automatiser les étapes répétitives et rendre les contrôles explicables.
6. Tester avec un utilisateur qui ne connaît pas le mécanisme interne.
7. Versionner le chemin, annoncer les changements et maintenir les migrations.
8. Mesurer adoption, temps jusqu'au premier déploiement, taux d'échec, contournements et satisfaction.

## 5. Fil rouge : démarrer `orders-api`

L'équipe choisit le parcours « service HTTP standard ». Elle renseigne nom, propriétaire, langage, niveau de criticité et dépendances. Le template génère squelette, README, tests de santé, pipeline, configuration de déploiement, dashboard et exemple de politique. Les paramètres invalides sont rejetés avec explication. L'équipe peut s'écarter du chemin si elle documente le besoin, les risques et le maintien qu'elle assume.

La mesure ne s'arrête pas au clic « créer » : on suit le temps jusqu'au premier déploiement fonctionnel, les changements manuels nécessaires, les incidents liés au template et le taux d'abandon.

## 6. Mesurer la DX sans métrique trompeuse

Mesures possibles :

- temps entre création du dépôt et premier service opérationnel ;
- durée et taux d'échec du pipeline ;
- temps d'attente pour obtenir une ressource ;
- fréquence des interruptions et re-travail ;
- taux d'adoption du chemin parmi les équipes éligibles ;
- nombre de dérogations et leurs raisons ;
- retours qualitatifs et facilité de résolution autonome.

Ne pas optimiser une seule métrique. Réduire le temps de pipeline en supprimant des contrôles de sécurité serait une dégradation, pas une amélioration.

## 7. Pièges

- **Golden cage** : le parcours devient impossible à adapter. Prévoir une voie de sortie et des critères d'exception.
- **Template sans maintenance** : les services créés sont déjà obsolètes. Prévoir versionnage et migration.
- **Adoption forcée** : les équipes contournent l'outil. Comprendre la friction au lieu de punir le contournement.
- **Métrique vanity** : nombre de templates ou de connexions au portail sans bénéfice mesuré.
- **Chemin opaque** : l'équipe ne sait pas ce qui a été généré ni comment le diagnostiquer.

## 8. Exercice

Cartographier le démarrage d'un service tel qu'il se ferait aujourd'hui, puis proposer un Golden Path. Indiquer les paramètres, contrôles, exceptions, versionnement, migration et trois mesures de DX. Ajouter une hypothèse falsifiable (« le parcours réduit le délai médian de création de X à Y ») et expliquer comment collecter la mesure sans surveiller individuellement les développeurs.

**Vérification :** le chemin doit être utilisable sans support humain pour son cas nominal, observable, sécurisé, maintenable et adaptable. Un simple template dépourvu de pipeline, de documentation et de gouvernance ne valide pas l'exercice.

## 9. Lien et preuve

Prérequis : IDP, GitOps et CI/CD. Suite : Platform as a Product et fiabilité.

**Preuve attendue :** prototype ou spécification détaillée d'un Golden Path testé par un pair, avec mesure avant/après, retours utilisateurs, politique d'exception et plan de maintenance.

## Mesures minimales conservées

En plus des métriques proposées plus haut, suit explicitement le temps du premier déploiement, le nombre d'étapes manuelles, les erreurs fréquentes, le temps de récupération et le taux de contournement. Une plateforme contournée n'est pas nécessairement « mal comprise » : observe la friction avant de conclure.

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Golden Paths et Developer Experience : réduire la friction sans enfermer les équipes** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Golden Paths et Developer Experience : réduire la friction sans enfermer les équipes » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
