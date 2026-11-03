---
stability: evolutif
acte: arbitrer
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/08-PRODUIT-COUT-ROI/06-CMS-ARCHITECTURE-LAB/01-00-why-cms-architecture.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/08-PRODUIT-COUT-ROI/06-CMS-ARCHITECTURE-LAB/01-00-why-cms-architecture.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Garo :** tu peux utiliser le temple complet ou seulement les salles dont tu as besoin. Le bon choix dépend de ce que tu dois protéger, déplacer et faire évoluer.

# CMS couplé, headless ou sur mesure : choisir selon le produit, pas selon la mode

## 1. Définition

Un **CMS couplé** fournit dans un même système l'administration du contenu, le stockage, le modèle de page et souvent le rendu du site. Un **CMS headless** gère le contenu et l'expose par API ; une application séparée choisit comment le consommer et le présenter. « Headless » décrit une séparation de présentation ; cela ne garantit ni scalabilité, ni sécurité, ni bonne architecture.

## 2. Architectures

```text
CMS COUPLÉ
[Éditeur] -> [CMS : contenu + templates + rendu]
                         |
                         v
                    [Pages web]

HEADLESS
[Éditeur] -> [CMS : contenu + workflow + API]
                              |
                              v
                   [Front web / mobile / app]
                              |
                              v
                     [Cache / CDN / BFF]
```

Dans le modèle couplé, le CMS contrôle plus directement le rendu et l'édition peut bénéficier d'une prévisualisation intégrée. Dans le headless, le contenu peut alimenter plusieurs canaux, mais il faut construire ou maintenir les frontends, les aperçus, les contrats API, les caches et les pipelines de publication.

## 3. Comparaison de décision

| Dimension        | Couplé souvent adapté si…                          | Headless souvent adapté si…                 |
| ---------------- | -------------------------------------------------- | ------------------------------------------- |
| Équipe           | petite équipe web et peu de frontends              | plusieurs équipes/canaux autonomes          |
| Publication      | pages éditoriales et workflow intégré prioritaires | contenu distribué à plusieurs produits      |
| Personnalisation | templates dans le CMS suffisent                    | expériences front indépendantes nécessaires |
| Opérations       | simplicité de déploiement prioritaire              | équipe sait opérer API, cache et frontends  |
| Prévisualisation | édition et rendu doivent rester intégrés           | preview peut être conçue et maintenue       |
| Coût             | un système complet est moins cher à exploiter      | valeur multi-canal compense l'intégration   |
| Risque           | dépendance à l'écosystème du CMS acceptable        | fragmentation/contrats API maîtrisables     |

Décider avec les contraintes réelles : nombre de canaux, fréquence de publication, compétences, SEO, prévisualisation, personnalisation, accessibilité, sécurité, disponibilité et coût total.

## 4. Fil rouge

Une association publie des actualités sur un site et une application mobile. Si la seule exigence est un site éditorial maintenu par deux personnes, un CMS couplé peut réduire la complexité et fournir aperçu, workflow et rendu. Si le même contenu alimente site, app, kiosques et partenaires, un CMS headless peut réduire la duplication, à condition de gérer versions d'API, cache, preview, publication et disponibilité.

## 5. Compromis techniques

### Couplé

Avantages possibles : un seul cycle de publication, intégration de preview, thèmes/plugins, moins d'adaptateurs. Risques : couplage entre mises à jour du CMS et du thème, surface d'attaque des plugins, personnalisation limitée et difficulté à réutiliser le contenu hors du canal principal.

### Headless

Avantages possibles : réutilisation de contenu, frontends indépendants, déploiement distinct et contrats explicites. Risques : plus de composants, panne API, invalidation de cache, preview complexe, divergence des modèles et coûts d'intégration. La séparation peut aussi rendre les éditeurs dépendants d'une équipe front pour voir le résultat.

## 6. Sécurité et gouvernance

Dans les deux modèles : MFA pour l'administration, rôles minimaux, revue des extensions, mises à jour, sauvegardes testées, audit des publications, validation des fichiers importés, politique de secrets et séparation des environnements. Pour headless, limiter les scopes des tokens, éviter un token d'administration dans le navigateur, protéger les webhooks et contrôler les origines/CORS selon l'architecture. Pour couplé, réduire les plugins inutiles et isoler les comptes d'administration.

Un CDN peut accélérer du contenu public mais doit avoir une stratégie d'invalidation, de purge et de traitement des contenus privés. Le cache ne doit jamais rendre publique une réponse personnalisée.

## 7. Pièges

- Choisir headless parce que c'est « moderne » sans besoin multi-canal.
- Oublier preview et workflow éditorial.
- Multiplier les plugins pour compenser un CMS mal adapté.
- Utiliser des tokens de privilège élevé dans un frontend public.
- Ne pas versionner les contrats API.
- Comparer le prix de licence sans inclure frontends, hébergement, support, migrations, sécurité et disponibilité.

## 8. Exercice et décision

Pour le cas fil rouge, proposer deux architectures, une carte des composants, une matrice pondérée (poids explicités) et un scénario d'incident. Indiquer comment un éditeur prévisualise, publie, corrige et restaure une version. Faire varier une contrainte (ajout d'une app mobile) et réévaluer la décision.

**Grille /20 :** adéquation besoin (4), workflow/preview (3), architecture/API/cache (3), sécurité (3), coût total (3), migration/rollback (2), hypothèses et limites (2). Échec si la décision ne cite pas les utilisateurs, le workflow de publication et les coûts d'exploitation.

## 9. Suite et preuve

Prérequis : architecture web, API, cache et sécurité. Suite : coûts, migration, cloud et fiabilité.

**Preuve attendue :** ADR comparant les deux modèles, carte d'architecture, hypothèses de coût et un plan de test de publication/rollback.

## Option custom et critères conservés

Comparer également la construction d'un CMS sur mesure. Cette option peut répondre à une exigence métier très spécifique, mais transfère à l'organisation la responsabilité durable de l'éditeur, du workflow, des permissions, des migrations, des patchs, du support et de l'export. La décision doit comparer workflow éditorial, performance, intégration front, preview, SEO, sécurité, nombre d'équipes, migration et lock-in ; aucune option n'est gagnante sans contexte.

<!-- AF-DIAGRAM:cost -->

## Repère visuel utile : Coût total par demande terminée

```text
options A / B
     |
     v
hypothèses de volume + prix datés
     |
     v
coûts directs + coûts humains
     |
     v
coût par résultat utile
     |
     v
sensibilité -> seuil -> décision
```

<!-- AF-LESSON-PROFILE: cost -->

## Repères de décision

- **Pourquoi :** Le coût technique et le coût d'opportunité déterminent si une solution reste soutenable pour l'équipe et les utilisateurs.
- **Quand l’utiliser / quand l’éviter :** Compare le coût total quand un choix influence infrastructure, maintenance ou temps humain. N'optimise pas à l'extrême sans connaître l'usage et la qualité attendue.
- **Limites :** Une estimation dépend de tarifs datés, d'hypothèses de charge et d'un périmètre. Le coût calculé n'est pas la valeur créée ; l'impact doit être mesuré séparément.

## Mécanisme : la version sans magie

Définis unité économique, volume, coûts directs/indirects, fréquence et horizon ; compare options et analyse la sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CMS couplé, headless ou sur mesure : choisir selon le produit, pas selon la mode** se rattache à ce cas concret : Pour Kintana, un coût par demande terminée est plus utile qu'un coût serveur mensuel isolé si le produit doit aider les centres à traiter leurs demandes.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Coût total par demande terminée

> **Arc Capsule Corp. / DBZ :** chaque transformation consomme du ki. Une feature doit acheter une valeur réelle, pas juste remplir le tableau des nouveautés.

**Mission liée à « CMS couplé, headless ou sur mesure : choisir selon le produit, pas selon la mode » :** Compare deux options pour une capacité Kintana (cache, stockage, notifications, outil managé ou développement maison). Calcule coût total sur un horizon déclaré, puis relie le coût à un résultat utilisateur observable.

**Livrable :** tableau de coût daté, hypothèses de volume, coût par unité, sensibilité et recommandation réversible.

**Critères d’acceptation :** tarifs sourcés et datés ; charge déclarée ; coûts opérationnels et humains inclus ; économies non présentées comme réalisées sans mesure ; seuil de réévaluation indiqué.

**Transfert obligatoire :** Le volume réel est deux fois plus faible que prévu et le coût fixe domine. Recalcule et explique si ton choix reste valable.
