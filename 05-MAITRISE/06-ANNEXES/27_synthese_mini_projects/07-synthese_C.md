---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, fausse_piste]
anti_recipe_key: decision_organisationnelle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Synthèse c : la v2 du système de vote ballon d'or

Temps de lecture ~7 min

> Couvre : `02-CONSTRUCTION/10-DESIGN-PATTERNS` + `02-CONSTRUCTION/11-REFACTORING` + `00-SOCLE/05-PROBLEM-SOLVING` + `02-CONSTRUCTION/12-TYPESCRIPT`
> Durée cible : 120 à 180 minutes
> Cette synthèse part d'un code existant pourri. Pas d'un fichier vide.

---

## LE CONTEXTE

Un stagiaire a codé en une nuit un système de comptage de votes pour le Ballon d'Or. Ça marche. Mais c'est une seule fonction de 180 lignes, des `if/else` imbriqués sur 6 niveaux, aucun type, et le moindre changement de règle de calcul oblige à toucher à 4 endroits différents du même fichier.

Ta mission : pas réécrire from scratch. Refactorer en identifiant les vrais problèmes, en typant tout avec TypeScript, et en injectant les patterns qui résolvent vraiment quelque chose, pas ceux qui font joli sur un CV.

Le piège classique ici : balancer 5 design patterns juste pour le plaisir d'en placer 5. Si un pattern complique plus qu'il résout, tu le mets pas.

---

## LE CODE DE DÉPART (à recréer toi-même dans `src/legacy/voteCalculator.js`)

Recrée volontairement un fichier qui ressemble à ça avant de commencer le refacto :

- une fonction `calculerClassement(votes, joueurs, regles)` de 150+ lignes
- des `if (regles.type === 'standard')` puis `else if (regles.type === 'ponderee')` puis `else if (regles.type === 'continentale')` qui dupliquent 80% de la logique de comptage
- des magic numbers partout (`if (score > 850)` sans dire ce que 850 représente)
- aucune validation des données d'entrée

C'est volontaire. Tu dois d'abord ressentir la douleur de lire ce fichier avant de le réparer. Si tu sautes direct à la solution propre sans avoir vécu le problème, t'apprends rien sur la détection de code smells.

---

## CE QUE TU DOIS LIVRER

```text
src/
├── legacy/
│  └── voteCalculator.js     le code pourri d'origine, gardé pour comparaison
├── strategies/
│  ├── voteStrategy.ts      l'interface commune
│  ├── standardStrategy.ts
│  ├── pondereeStrategy.ts
│  └── continentaleStrategy.ts
├── voteCalculator.ts       la nouvelle version, propre, typée
└── types.ts            tous les types et interfaces du domaine

tests/
└── voteCalculator.test.ts
```

---

## CONTRAINTES TECHNIQUES PRÉCISES

**Du module `02-CONSTRUCTION/11-REFACTORING` (refactoring), à faire EN PREMIER :**
Avant de toucher une ligne de solution, liste par écrit (dans un fichier `AUDIT_LEGACY.md`) au moins 4 code smells précis trouvés dans le fichier legacy. Pas "c'est mal écrit". Du concret : "la fonction viole SRP parce qu'elle fait à la fois la validation, le calcul, et le formatage du résultat" par exemple.

**Du module `02-CONSTRUCTION/10-DESIGN-PATTERNS` (design patterns) :**
Le Strategy pattern doit remplacer la cascade de `if/else if` sur le type de vote. Chaque type de calcul (standard, pondérée, continentale) devient une stratégie interchangeable derrière une interface commune.
Réfléchis aussi à un Factory pour instancier la bonne stratégie selon la config, plutôt que de laisser l'appelant choisir lui-même quelle classe importer.
N'ajoute PAS de Singleton ou d'Observer ici si tu trouves pas une vraie raison technique : un pattern injecté sans besoin réel, c'est un code smell de plus, pas une amélioration.

**Du module `02-CONSTRUCTION/12-TYPESCRIPT` (typescript) :**
Tout le domaine (Joueur, Vote, Resultat, RegleDeCalcul) doit être typé avec des interfaces strictes. Utilise un discriminated union pour les 3 types de stratégie de vote (`{ type: 'standard', ... } | { type: 'ponderee', poids: number, ... } | { type: 'continentale', zones: string[], ... }`), pas un seul type avec des champs optionnels partout.
Les magic numbers du code legacy doivent devenir des constantes nommées et typées (`const SEUIL_QUALIFICATION: number = 850`).

**Du module `00-SOCLE/05-PROBLEM-SOLVING` (problem solving) :**
Avant de coder la moindre stratégie, écris dans `AUDIT_LEGACY.md` le contrat de l'interface `VoteStrategy` en langage naturel : qu'est-ce qu'elle reçoit, qu'est-ce qu'elle garantit en retour, quelles sont les invariants (ce qui doit toujours être vrai peu importe la stratégie utilisée). Code après, pas pendant.

---

## CE QUI SE PASSE SI TU ZAPPES UNE CONTRAINTE

Si tu sautes l'étape d'audit écrit et tu fonces direct dans le code : tu vas refactorer au feeling, et tu vas probablement rater le vrai problème (souvent c'est pas le `if/else` qui pue le plus, c'est l'absence de validation d'entrée qui permet à n'importe quelle donnée pourrie de rentrer dans le calcul).

Si tu types avec des champs optionnels au lieu d'un discriminated union : TypeScript va te laisser créer un objet `{ type: 'standard', poids: 50 }` qui a pas de sens (un vote standard a pas de poids), et tu perds tout l'intérêt d'avoir migré vers TS.

---

## CHECKLIST AVANT DE VALIDER

```json
[ ] AUDIT_LEGACY.md liste au moins 4 code smells précis et nommés
[ ] Le contrat de VoteStrategy est écrit en langage naturel avant le code
[ ] 3 stratégies distinctes implémentent la même interface
[ ] Un discriminated union type les 3 variantes de RegleDeCalcul
[ ] Aucun pattern ajouté sans justification écrite de pourquoi il résout un vrai problème
[ ] Les magic numbers du legacy sont devenus des constantes nommées et typées
```

Si t'as ajouté un pattern juste parce que "ça fait plus pro" : enlève-le. Un code avec 2 patterns justifiés bat toujours un code avec 5 patterns décoratifs.

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « Synthèse c : la v2 du système de vote ballon d'or » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Synthèse c : la v2 du système de vote ballon d'or** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Synthèse c : la v2 du système de vote ballon d'or » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
