---
perishability_id: PER-0086

companion: ce parcours
stability: "evolutif"
acte: comprendre
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
review_interval: "3 mois"
perishability_scope: "Correspondances technologiques et liens d’orientation TECH-ILA vers les ressources pédagogiques canoniques."
canonical_resource: "06-ANNEXES-TRANSVERSES/04-TECH-ILA/README.md"
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/04-TECH-ILA/README.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

[← Sommaire TECH-ILA](../README.md)

> **Tu viens de** : l'introduction du [README](../README.md).
> **Tu dois déjà savoir** : rien de technique : cette section pose la méthode de lecture.
> **Ensuite** : [Niveau 1 : Socle professionnel](03-niveau-1-socle.md)

# Orientation : lire, classer, ordonner (sections 0 à 3)

> **Périmètre de suivi (3 mois) :** Correspondances technologiques et liens d’orientation TECH-ILA vers les ressources pédagogiques canoniques.

Pour la première passe Getting Started → Prologue → Fundamentals, aucune lecture TECH-ILA obligatoire. Les correspondances sont des repères de consultation ; elles ne constituent pas une gate globale.

<!-- AF-DIAGRAM:incident -->

```text
Signal
  │
  ▼
Triage ─► Mitigation ─► Recovery ─► Postmortem
  ▲                                  │
  └────────────── learning ─────────┘
```

La gestion d’incident transforme un signal de panne en restauration puis en apprentissage durable.

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

## 0 : Comment lire ce document

Trois usages. Choisis le tien.

**Usage 1 : parcours.** La Route 58 et les modules principaux restent prioritaires. Tu ouvres une section TECH-ILA seulement lorsqu’un jalon te la signale, et après avoir atteint ses prérequis locaux. Le tableau de correspondance sert à retrouver une fiche ; il ne transforme pas chaque correspondance en lecture obligatoire.

**Usage 2 : dépannage.** Tu es en galère sur React ou NestJS. Tu ouvres la [carte inverse](08-cartes-parcours-technologies.md#11-carte-inverse-technologie-fichiers-du-parcours), tu retrouves le fichier du parcours qui explique le mécanisme sous-jacent, tu relis, tu reviens. En situation d'incident réel (prod qui casse), tu n'ouvres pas ce document : tu ouvres le [mode urgence](./09-mode-urgence.md).

**Usage 3 : décision.** Tu dois choisir un outil. Tu ouvres la fiche techno, tu lis "Quand ne pas la choisir" et "Alternatives", tu écris un ADR (`03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md`).

Le pipeline ci-dessous décrit une progression possible lorsqu’une fiche TECH-ILA est effectivement utile ; il ne s’applique pas à chaque technologie et ne constitue pas une gate globale :

```text
Fondamentaux ce parcours
        ↓
Compréhension du mécanisme
        ↓
Technologie ou framework
        ↓
Exercice ciblé
        ↓
Mini-projet si nécessaire
        ↓
Décision technique justifiée
```

**La règle de rattachement.** Toute techno à laquelle une section est consacrée est reliée à un mécanisme du parcours nommé, avec un lien relatif vers le fichier exact.

Un chemin ce parcours s'écrit de deux façons, jamais au hasard :

- **ANCRAGE** (lien cliquable obligatoire) : la première fois qu'une fiche techno relie son mécanisme. Une fiche = au moins un ancrage cliquable.
- **RAPPEL** (backticks, non cliquable) : toute mention ultérieure du même chemin dans la même fiche, ou une mention de dossier générique (`03-PILOTAGE/04-SECURITY/`).

Un backtick est donc un rappel volontaire, jamais un oubli. Et un chemin d'annexe s'écrit TOUJOURS préfixé de `05-MAITRISE/06-ANNEXES/` : les sous-dossiers d'annexes ont leur propre numérotation, indépendante de celle des 54 modules pédagogiques directs.
Les technos seulement citées : dans un tableau d'alternatives ou en passant (Fastify, Hono, Koa, Deno, Bun, Go, Terraform, Jaeger, Grafana, Datadog, Sentry, Renovate, clinic.js, autocannon…) : ne portent pas cet ancrage complet : elles portent au minimum leur tag entre parenthèses et une colonne « ce que ça change côté mécanisme » dans le tableau où elles apparaissent. Si une fiche complète n'a ni l'un ni l'autre, c'est un bug du document, pas de toi.

**Jargon.** Chaque terme technique est expliqué à sa première apparition, entre parenthèses ou en une ligne. Si un mot te bloque, il manque une explication : signale-le.

### Lire une doc officielle en 6 réflexes

Ce document te dit de garder « la doc ouverte, jamais par cœur ». Encore faut-il savoir la lire vite et sans te faire avoir.

1. **Identifie la version ciblée.** Utilise le sélecteur de version lorsqu’il existe ; sinon, relève la version dans les notes de version, le paquet, le dépôt ou la configuration. Si tu ne peux pas identifier la version, note cette limite au lieu de supposer qu’il s’agit de la dernière.
2. **Consulte les changements lorsque c’est utile.** Pour une migration, une régression ou un comportement susceptible d’avoir changé, lis le changelog et les notes de migration avant d’appliquer un guide ancien. Pour apprendre un concept stable, commence par le guide adapté à ton niveau.
3. **Lis les notes de migration** lorsque tu passes d’une version à une autre. Repère les changements incompatibles et vérifie s’ils touchent ton usage réel.
4. **Choisis la source selon la question.** Un guide explique le parcours ; une référence API décrit les paramètres et comportements ; une spécification définit un protocole ; une page de présentation donne le contexte du produit. Croise-les si la décision a un impact important.
5. **Évalue la date et la provenance.** Une page communautaire non datée ne suffit pas à confirmer un comportement versionné. Recherche une source primaire ou indique explicitement que le point reste à vérifier.
6. **Interprète les exemples dans leur contexte.** Un extrait peut omettre imports, configuration, variables d’environnement ou fichiers voisins. Identifie ce qui manque, puis reproduis-le dans un petit projet adapté lorsque c’est nécessaire ; ne suppose pas qu’un extrait est autonome.

---

## 1 : Philosophie : le geste d'ingénieur

Les outils changent. Les frameworks tournent. Les modes passent. Le geste reste :

```text
Comprendre le contexte
        ↓
Clarifier le problème
        ↓
Planifier
        ↓
Choisir une stratégie
        ↓
Choisir les bons outils
        ↓
Construire la solution
        ↓
Tester et observer
        ↓
Résoudre le problème réel
        ↓
Expliquer et défendre la décision
```

TECH-ILA ne forme pas quelqu'un qui récite React, Next.js, NestJS, Spring Boot, Python ou .NET.

Il forme quelqu'un capable de : comprendre un problème, le découper, poser les bonnes questions, choisir une stratégie, sélectionner les bons outils, construire, tester, observer, diagnostiquer, sécuriser, expliquer, remplacer une techno, et transférer son raisonnement vers un autre écosystème.

**La technologie est le terrain d'entraînement. La compétence finale, c'est la résolution de problèmes.**

### Le piège du CV-liste

Quinze frameworks connus en surface valent moins qu'un écosystème cohérent maîtrisé en profondeur. Pourquoi ? Parce qu'un recruteur technique ne teste pas ta mémoire, il teste ta capacité à :

- lire du code que tu n'as pas écrit ;
- expliquer pourquoi tu as choisi X plutôt que Y ;
- décrire comment ton système casse ;
- montrer une trace, un test, une métrique.

Aucune de ces quatre choses ne s'apprend en collectionnant des noms.

### Le contrat de ce document

- On ne te promet pas un job.
- On ne te dit pas qu'une techno est "la meilleure".
- On te dit ce qu'elle coûte, ce qu'elle masque, et quand la refuser.

---

## 2 : Système de classification

Chaque techno de ce document porte un tag. Le tag décide de ton investissement.

| Tag                 | Définition                                                            | Investissement                                          | Exemple                                                        |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| **NOYAU DURABLE**   | Concept dont les principes survivront à tout produit qui l'implémente | Profond, mémorisé, pratiqué                             | HTTP, SQL, Git, modèle relationnel, Linux, stratégies de rendu |
| **PROFESSIONNELLE** | Largement utilisée aujourd'hui, dans plusieurs contextes              | Sérieux, jusqu'à l'autonomie                            | React, Node.js, TypeScript, Docker, PostgreSQL                 |
| **CONTEXTUELLE**    | Utile selon secteur, équipe, architecture                             | À la demande, quand le contexte l'exige                 | GraphQL, Next.js, Spring Boot, .NET, MongoDB, Kafka            |
| **PÉRISSABLE**      | Syntaxe, API ou configuration susceptible de changer entre versions   | Jamais par cœur ; vérifier la version et la doc ciblées | API d'un routeur, flags CLI, config d'un bundler               |

**Ce que le tag ne dit pas.** PROFESSIONNELLE qualifie l'usage sur le marché, pas la longévité. Certaines technos PROFESSIONNELLES (PostgreSQL, Docker en tant que format d'image OCI) ont une longévité de NOYAU DURABLE. C'est la ligne « Durée de vie » de chaque fiche qui fait foi, pas le tag. Le tag oriente ton investissement d'aujourd'hui ; le chiffre engage la techno sur la durée.

**Les tags qualifient des TECHNOLOGIES.** Les sections de méthode (ADR, grille de lecture d'écosystème, postmortem, audit d'une réponse d'IA) n'en portent pas : une méthode ne se périme pas de la même façon qu'un outil, et sa durée de vie est celle de ta carrière. Elles sont repérables à leur absence de ligne « Coût / Durée de vie ». Ce n'est pas un oubli, c'est une exception assumée et déclarée ici. Une section de méthode le DÉCLARE en une ligne sous son titre (« **Section de méthode** … », ou « **Section de synthèse** … » pour une section de clôture de niveau). L'absence de déclaration ET de Coût/Durée est un bug du document.

**Deux niveaux de révision, à ne pas confondre.** Ce document est prévu pour une revue trimestrielle : cela signifie que sa sélection de technologies et ses liens doivent être réexaminés, pas que chaque entrée devient obsolète à une date fixe. Les durées de vie chiffrées des fiches sont des estimations pédagogiques, pas des garanties de marché. Un tag NOYAU DURABLE indique qu’on investit surtout dans le mécanisme sous-jacent ; un tag PÉRISSABLE signale qu’une syntaxe, une API ou une configuration doit être revérifiée pour la version utilisée. Aucun tag ne prédit avec certitude la durée de vie d’un produit.

Règle brutale : **on n'apprend jamais une syntaxe par cœur, on apprend le problème qu'elle résout.**

**NOYAU DURABLE est plafonné aux concepts, jamais aux produits.** Un produit peut disparaître ; un concept qu'il implémente reste. Next.js n'est pas NOYAU DURABLE : c'est le framework le plus mouvant du corpus (App Router / Pages Router, RSC en évolution constante) : il est CONTEXTUELLE. Ce qui est NOYAU DURABLE derrière lui, c'est « stratégies de rendu » (SSR, SSG, hydratation, cache) : un concept qui survivra à Next.js lui-même. Même logique pour Spring Boot (CONTEXTUELLE) vs injection de dépendances (NOYAU DURABLE), ou pour un ORM (CONTEXTUELLE/PROFESSIONNELLE selon le cas) vs modèle relationnel (NOYAU DURABLE).

**Gabarit d'exercice.** Chaque exercice porte ses huit champs, dont la ligne « Repli 100 % local et gratuit ». Cette ligne est OBLIGATOIRE, y compris quand l'exercice est déjà 100 % local : elle dit alors explicitement qu'il n'y a rien à payer et aucun compte à ouvrir. Une ligne toujours présente se vérifie par grep ; une ligne conditionnelle dérive à chaque ajout d'exercice.

Pour que le tag soit déductible et défendable, chaque fiche porte deux champs chiffrés obligatoires, en tête :

```text
Coût : ~N h avant utilité · Durée de vie : ~N ans
```

Un tag sans ces deux chiffres n'est pas une classification, c'est une opinion. Un titre de fiche porte les trois champs sur la même ligne : Tag, Coût, Durée de vie. Un champ en prose ne compte pas. « Combien d'heures avant d'être utile ? » et « combien d'années avant que ce soit obsolète ou remplacé ? » sont les deux questions qui rendent le tag vérifiable : et contestable, ce qui est le but.

ce parcours a déjà posé ce cadre dans `../../../00-SOCLE/03-REFERENTIEL/07-intemporel_vs_perissable.md` et `05-MAITRISE/06-ANNEXES/18-PERISSABILITE.md`. TECH-ILA applique la même grille aux technologies.

### Grille d'admission d'une techno dans ce document

Une techno n'entre ici que si elle passe ce filtre :

```text
Valeur pédagogique ?   → apprend-elle un mécanisme, ou juste une API ?
Usage professionnel ?  → combien d'offres réelles, dans combien de secteurs ?
Durée de vie ?         → l'écosystème est-il stable depuis 5+ ans ?
Transférabilité ?      → le concept se retrouve-t-il ailleurs ?
Coût d'apprentissage ? → combien d'heures pour être opérationnel ?
Alternatives ?         → existe-t-il plus simple pour le même problème ?
Lien ce parcours ?       → quel module la prépare ?
```

Si une techno échoue sur "durée de vie" mais réussit sur "usage professionnel", elle est mentionnée brièvement et classée **PÉRISSABLE**. Elle ne prend pas dix pages.

### Le test du zéro outil

La grille d'admission ci-dessus décide si une techno _peut_ entrer dans le document. Elle ne dit pas si _toi_, sur ton projet, tu dois l'ajouter. Avant d'introduire une dépendance, réponds à ces cinq questions :

1. **Pourrais-je remplacer ça par 20 à 50 lignes maison ?** Si oui, et que tu n'as pas de raison précise de ne pas le faire, ne l'ajoute pas.
2. **Quel est le coût d'exploitation à 3 ans ?** Pas le coût d'installation : le coût cumulé de mises à jour, de failles de sécurité à suivre, de breaking changes à absorber.
3. **Qui saura le retirer ?** Si la réponse est "seulement moi, et seulement aujourd'hui", tu es en train de créer une dette que personne d'autre ne pourra rembourser.
4. **Est-ce que j'ajoute cet outil pour résoudre un problème que j'ai, ou un problème que je pourrais avoir ?** Le second cas est un YAGNI déguisé.
5. **Si je supprime cette dépendance dans six mois, qu'est-ce qui casse : et est-ce que je le sais déjà, ou est-ce que je le découvrirai ?**

L'absence d'outil est une option à part entière, pas un renoncement. Sur un document qui présente plus de 30 technologies, il est facile de conclure que la bonne réponse est toujours d'en ajouter une. Ce n'est pas le cas : la compétence la plus rare en mission n'est pas de connaître un outil de plus, c'est de savoir dire non à un outil qu'on ne saura pas maintenir.

---

## 3 : Carte globale des 6 niveaux

```text
NIVEAU 1  SOCLE          terminal · Git · Node · TS · HTTP · SQL · Docker
                         (référentiel de sujets ; chaque fiche garde ses prérequis locaux)
NIVEAU 2  FRONTEND       React · état · routing · Next.js · perf · a11y
    ↓                    (prérequis selon la fiche : HTTP, DOM ou runtime ; pas le niveau 1 entier)
NIVEAU 3  BACKEND        Express/NestJS · auth · validation · Redis · files
    ↓                    (prérequis selon la fiche : SQL, Docker ou API ; pas le niveau 1 entier)
NIVEAU 4  SYSTÈMES       CI/CD · cloud · observabilité · messaging · résilience
    ↓                    (prérequis propre à la fiche : un service et ses bases d’exploitation)
NIVEAU 5  TRANSFERT      Python/FastAPI · Java/Spring · .NET
    ↓                    (prérequis propre à la fiche : le mécanisme source déjà compris)
NIVEAU 6  IA             diriger · vérifier · refuser
                         (approfondissement avancé : une livraison de niveau 3 sans IA
                         est nécessaire avant cette famille de fiches, pas avant le parcours débutant)
```

À côté de ces six niveaux, un fichier n'est pas un niveau : le [mode urgence](./09-mode-urgence.md) est une page de consultation en incident, pas de lecture linéaire : index par message d'erreur, index par symptôme, procédure d'incident en une page.

Les numéros organisent les familles de sujets ; ils ne créent ni ordre de lecture ni obligation de terminer un niveau. Respecte les prérequis indiqués dans chaque fiche. La Route 58 peut ne renvoyer qu’à une section précise, ou à aucune section TECH-ILA.

### Ordre conseillé en parallèle de ce parcours

| Modules ce parcours en cours                             | Section TECH-ILA à ouvrir en parallèle                                       |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 00 → 02 (getting started, fondamentaux, problem solving) | Aucune lecture TECH-ILA obligatoire ; suivre le Socle principal              |
| 03 → 08 (async, debugging, erreurs, testing, perf)       | Fiches ciblées seulement si la Route 58 les demande et après leurs prérequis |
| 09 → 13 (structures, algos, FP, patterns, refacto)       | rien de nouveau : consolide, code                                            |
| 14 → 15 (TypeScript, runtime)                            | Fiches TypeScript/runtime ciblées après les acquis correspondants            |
| 16 → 17 (architecture, web)                              | React, routing, Next.js                                                      |
| 18 → 22 (OOP, a11y, temps réel, API, sécurité)           | NestJS, PostgreSQL, auth, WebSocket/SSE                                      |
| 24 → 26 (bases de données, scalabilité, observabilité)   | Redis, files, Docker, OpenTelemetry, CI/CD                                   |
| 27 → 31 (team craft, edge cases, agents, projets)        | Cloud, transfert Python/Java/.NET, portfolio                                 |

**Seuil franchi.** Tu viens de comprendre que l'ordre n'est pas décoratif : chaque techno arrive au moment où tu as déjà le mécanisme en tête. Apprendre React avant les closures, c'est apprendre à conduire en regardant la radio.

---

[← Sommaire](../README.md) · [Niveau 1 →](03-niveau-1-socle.md)

<!-- AF-LESSON-PROFILE: reference -->

## Repères de décision

- **Pourquoi :** Un référentiel sert à rendre les compétences observables et à éviter de confondre familiarité, autonomie et maîtrise.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour établir un point de départ, prioriser une révision ou préparer une revue de portfolio. Ne l'utilise pas comme classement de valeur personnelle.
- **Limites :** Une auto-évaluation est biaisée. Le niveau doit être confirmé par une tâche inconnue, un artefact reproductible et, aux paliers avancés, une revue externe.

## Mécanisme : la version sans magie

Associe une compétence à une tâche, un critère, une preuve, une date et un statut. Réévalue quand le contexte ou la technologie change.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../77-FIL-ROUGE-KINTANA/README.md), **Orientation : lire, classer, ordonner (sections 0 à 3)** se rattache à ce cas concret : Pour Kintana, une compétence comme l'idempotence n'est acquise que si tu sais l'expliquer, l'implémenter et vérifier le rejeu et les conflits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Référentiel de compétences par preuves

> **Arc DBZ / Capsule Corp. :** Bulma ne dit pas « je suis forte » parce qu'elle a lu le manuel. Elle vérifie ce que l'outil permet réellement.

**Mission liée à « Orientation : lire, classer, ordonner (sections 0 à 3) » :** Établis ton état initial sur une tranche Kintana : sélectionne trois compétences, réalise une tâche de chacune sans suivre un corrigé, garde les tests et note ce que tu n'as pas pu démontrer.

**Livrable :** un registre de compétences avec preuves liées, statut honnête, date de révision et prochain test de transfert.

**Critères d’acceptation :** chaque statut pointe vers un artefact ; une compétence non testée reste `NON ÉVALUÉE` ; aucune preuve déclarative ne vaut une exécution ; les lacunes ont une action de remédiation.

**Transfert obligatoire :** Reprends une compétence dans un langage ou un composant différent et vérifie si le principe se transfère réellement.
