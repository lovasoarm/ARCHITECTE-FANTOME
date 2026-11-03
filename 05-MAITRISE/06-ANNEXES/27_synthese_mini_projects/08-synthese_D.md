---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Synthèse d : sécuriser le réseau radio de fox river

Temps de lecture ~7 min

> Couvre : `02-CONSTRUCTION/13-RUNTIME-ENV` + `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` + `02-CONSTRUCTION/18-WEB-CONCEPTS` + `02-CONSTRUCTION/19-API-CRAFT` + `03-PILOTAGE/04-SECURITY`
> Durée cible : 150 à 220 minutes
> La plus grosse synthèse du curriculum. C'est voulu : c'est le bloc système web complet.

---

## LE CONTEXTE

Michael Scofield a besoin d'un système de communication entre les détenus impliqués dans le plan d'évasion. Chaque message doit passer par une API, être authentifié, et T-Bag (qui a accès partiel au système depuis l'intérieur) ne doit RIEN pouvoir lire ni injecter.

Le système doit tourner en CLI côté serveur (un script Node qui simule le serveur de Fox River) et exposer une API REST que d'autres scripts viennent consommer (simulant les terminaux des différents détenus).

---

## CE QUE TU DOIS LIVRER

```text
src/
├── server.js         point d'entrée Express
├── routes/
│  └── messages.js
├── middleware/
│  ├── auth.js        vérification JWT
│  ├── rateLimit.js
│  └── validateMessage.js validation métier (type, non-vide, 500 caractères max)
├── cli/
│  └── envoyerMessage.js   script CLI qui consomme l'API comme un détenu le ferait
└── architecture/
  └── couches.md       explication de la séparation domaine/infra choisie

tests/
└── messages.test.js
```

---

## CONTRAINTES TECHNIQUES PRÉCISES

**Du module `02-CONSTRUCTION/13-RUNTIME-ENV` (runtime env) :**
Le script CLI (`envoyerMessage.js`) doit lire ses paramètres via `process.argv`, pas en dur dans le code. Il doit pouvoir tourner en argument minimal (`node envoyerMessage.js --to=westmoreland --msg="le plan tient"`) et gérer le cas où un argument obligatoire manque sans crasher silencieusement.

**Du module `02-CONSTRUCTION/18-WEB-CONCEPTS` (web concepts) :**
Le cycle de vie HTTP de chaque requête doit suivre le schéma canonique de la charte ASCII (`05-MAITRISE/06-ANNEXES/03-ascii_charte.md`, schéma 5) : auth, validation, handler, error handler, dans cet ordre, sans exception.
Choisis et justifie une stratégie de cache pour l'endpoint de lecture des messages (qui sera consulté en boucle par les terminaux des détenus) : pas de cache du tout serait une erreur de perf, un cache trop long serait un risque de sécurité (messages obsolètes affichés comme actuels).

**Du module `02-CONSTRUCTION/19-API-CRAFT` (api craft) :**
CRUD complet sur la ressource `messages` : envoyer, lire, marquer comme lu, supprimer. JWT obligatoire sur chaque endpoint sauf l'authentification elle-même. Le refresh token doit avoir une durée de vie différente du token d'accès, et tu dois documenter pourquoi cette différence existe.

**Du module `03-PILOTAGE/04-SECURITY` (security), le coeur critique de cette synthèse :**

- Validation métier stricte de chaque message entrant (chaîne non vide, 500 caractères maximum). Ne transforme pas le texte en HTML et ne le « nettoie » pas pour SQL : les requêtes de persistance utilisent des paramètres liés.
- Protection contre la prototype pollution si jamais un payload JSON malicieux essaie de polluer `Object.prototype`
- Rate limiting par détenu : un détenu qui spam 50 requêtes en 10 secondes doit être bloqué temporairement, pas le système entier
- Les mots de passe (si authentification locale en plus du JWT) doivent être stockés avec Argon2id pour un nouveau système ; bcrypt ne sert qu'à la compatibilité héritée, jamais au clair

**Du module `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` (architecture patterns) :**
Le fichier `architecture/couches.md` doit expliquer concrètement, avec le schéma canonique de la charte ASCII (schéma 6), pourquoi la logique de validation d'un message (un message ne peut pas dépasser 500 caractères, ne peut pas être vide) vit dans le domaine et pas dans le middleware Express. Si tu mets cette règle dans le middleware, elle est couplée à Express : le jour où tu changes de framework, tu la perds.

---

## CE QUI SE PASSE SI TU ZAPPES UNE CONTRAINTE

Si un client affiche un message utilisateur comme du HTML au lieu de texte, T-Bag peut injecter un script qui s'exécute dans le navigateur d'un autre détenu : c'est une XSS stockée. Pour un message texte, le client doit utiliser `textContent` ou le rendu texte sûr de son framework. Si le produit autorise réellement du HTML riche, le client doit le passer par DOMPurify juste avant le rendu, avec une liste autorisée adaptée ; la validation du message et les paramètres SQL restent des contrôles séparés.

Si tu mets la logique métier dans le middleware au lieu du domaine : ton architecture en couches existe sur le papier mais pas dans les faits, et le premier refacto sérieux va devoir tout déplacer.

---

## CHECKLIST AVANT DE VALIDER

```json
[ ] Le CLI lit ses params via process.argv et gère l'argument manquant proprement
[ ] Le cycle HTTP respecte exactement le schéma canonique (auth -> validation -> handler -> error handler)
[ ] CRUD complet avec JWT sur chaque endpoint sauf l'auth elle-même
[ ] Le message texte est rendu comme texte (`textContent` ou échappement automatique) ; si le HTML riche est autorisé, DOMPurify est testé sur un vrai payload
[ ] Rate limiting actif et testé (vérifie qu'un détenu spécifique est bloqué, pas tout le système)
[ ] Argon2id utilisé pour tout nouveau mot de passe ; bcrypt réservé à la compatibilité héritée ; jamais de mot de passe en clair
[ ] architecture/couches.md justifie pourquoi la validation vit dans le domaine
```

Cette synthèse est la plus exigeante du curriculum jusqu'ici. Si tu termines ça sans relire la doc 10 fois : t'es prêt pour les modules `03-PILOTAGE/04-SECURITY` a `05-MAITRISE/03-EDGE-CASES`.

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Pratique autonome : production attendue

À partir de « Synthèse d : sécuriser le réseau radio de fox river », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Synthèse d : sécuriser le réseau radio de fox river** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Synthèse d : sécuriser le réseau radio de fox river » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
