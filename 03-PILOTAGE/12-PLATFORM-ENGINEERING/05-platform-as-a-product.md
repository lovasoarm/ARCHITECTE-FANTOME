---
stability: evolutif
acte: piloter
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : vestiaire du Ballon d’Or :** un bon staff technique ne distribue pas des crampons au hasard. Il regarde où les joueurs perdent du temps, ce qu’ils cassent et ce qu’ils évitent.

# Platform as a Product : traiter les développeurs comme des utilisateurs

## 1. Définition

**Platform as a Product** consiste à gérer la plateforme interne comme un produit : comprendre ses utilisateurs, leurs tâches, la valeur attendue, les coûts, la qualité, l'adoption et la feuille de route. L'équipe plateforme ne livre pas seulement des composants ; elle réduit une difficulté récurrente pour des équipes identifiables.

## 2. Problème résolu

Une plateforme construite uniquement selon les préférences de ses ingénieurs risque d'optimiser la technologie plutôt que le travail des équipes. Un portail sophistiqué peut n'être utilisé par personne. Une bonne plateforme doit résoudre des problèmes qui existent et dont l'amélioration se mesure.

## 3. Cycle produit

```text
[Équipes utilisatrices]
       | problèmes / tâches / retours
       v
[Découverte + observation]
       |
       v
[Hypothèse de valeur + métriques]
       |
       v
[Priorisation / roadmap]
       |
       v
[Livraison d'une capacité]
       |
       v
[Adoption + fiabilité + coûts]
       |
       +------ apprentissage / feedback ------>
```

## 4. Découvrir les besoins

Observer une tâche de bout en bout plutôt que demander uniquement « quelles fonctionnalités voulez-vous ? ». Mesurer : fréquence, durée, points de blocage, nombre d'équipes touchées, risque d'erreur, coût de support et solution de contournement. Segmenter les utilisateurs : nouvelle équipe, équipe mature, service critique, développeur, opérateur, sécurité et finance.

Formuler un problème testable : « Les équipes mettent souvent plusieurs jours à obtenir un environnement de test ; les demandes manuelles et les droits variables provoquent des retards. » Éviter les solutions prématurées du type « il nous faut un portail Kubernetes ».

## 5. Roadmap et arbitrage

Évaluer chaque capacité selon valeur utilisateur, réduction du risque, nombre d'équipes bénéficiaires, effort de développement et d'exploitation, coût récurrent, dépendances et coût d'opportunité. Une priorité n'est pas un vote de popularité : elle doit être justifiée et réévaluée lorsque les faits changent.

**Exemple :** automatiser les environnements éphémères peut avoir plus de valeur que créer un nouveau dashboard si les équipes attendent surtout après les environnements. À l'inverse, si les incidents sont dus à une absence d'observabilité, le dashboard et les alertes peuvent être prioritaires.

## 6. Coûts et valeur

Distinguer coût de construction, coût d'exploitation, coût de support, coût du cloud, coût de migration et coût de sortie. Calculer un bénéfice avec prudence : temps économisé estimé × utilisateurs × fréquence, incidents évités, réduction des tâches manuelles et diminution du délai de mise en production. Documenter les hypothèses ; une estimation n'est pas une économie comptable certaine.

Une plateforme partagée crée aussi un risque de concentration : panne de l'IDP, changement de template ou vulnérabilité commune peuvent toucher toutes les équipes. Le produit doit intégrer disponibilité, support, communication de changement, compatibilité et voie de secours.

## 7. Indicateurs utiles

- délai jusqu'au premier déploiement ;
- temps de cycle entre changement et disponibilité ;
- taux de réussite des workflows ;
- fréquence et durée des demandes manuelles ;
- adoption parmi les équipes concernées ;
- satisfaction liée à une tâche précise ;
- coût par service ou équipe bénéficiaire ;
- incidents attribuables à la plateforme ;
- délai de correction des templates vulnérables.

Ne pas confondre corrélation et causalité. Si le temps de déploiement diminue après une version, vérifier les changements simultanés et comparer des groupes/tâches similaires.

## 8. Exercice et grille

Mener une mini-découverte sur un parcours (réel si possible, sinon scénario fourni). Livrer une fiche problème, trois hypothèses, une métrique principale, deux garde-fous, une roadmap de trois éléments et un calcul de coût total simplifié.

Évaluation sur 20 : problème démontré (4), utilisateurs segmentés (3), métriques non trompeuses (4), coût/risque (4), priorité justifiée (3), plan de feedback (2). Une réponse qui commence par le choix d'un outil sans problème utilisateur explicite ne peut obtenir la moyenne.

## 9. Lien et preuve de maîtrise

Prérequis : IDP et Golden Paths. Suite : SLO, cloud economics et leadership.

**Preuve attendue :** un mini product brief défendu devant une équipe, avec besoins observés, métriques, arbitrage coût/valeur, risques de dépendance et prochaine décision fondée sur les retours.

## Question organisationnelle conservée

Qui perd du pouvoir, de l'autonomie ou une pratique familière quand une plateforme standardise une tâche ? Identifie les intérêts et les risques de guerre de territoire. Une standardisation acceptable doit expliquer la valeur, laisser une voie d'exception et répartir clairement le coût de maintenance.

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Platform as a Product : traiter les développeurs comme des utilisateurs** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Platform as a Product : traiter les développeurs comme des utilisateurs » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
