---
perishability_id: PER-0089

companion: ce parcours
stability: perissable
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_type: primary
source_url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Niveau 3 : Backend (section 6) ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

[← Sommaire TECH-ILA](../README.md)

> **Tu viens de** : [04-niveau-2-frontend.md](04-niveau-2-frontend.md) (React, état, Vite, routing/formulaires/a11y, Next.js)
> **Tu dois déjà savoir** : `node:http` et les fondamentaux Node (`03-niveau-1-socle.md`), composition de fonctions (`../../../02-CONSTRUCTION/09-FUNCTIONAL-JS/04-composition.md`), les patrons SOLID de base (`02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/03-solid_principles.md`)
> **Ensuite** : [06-niveau-4-systemes.md](06-niveau-4-systemes.md) (CI/CD, cloud, observabilité, résilience)

# Niveau 3 : Backend (section 6)

<!-- AF-DIAGRAM:secrets -->

```text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

<!-- AF-DIAGRAM:tracing -->

```text
Request ─► Span A ─────► Span B ─────► Span C
             │             │              │
          service A     service B      service C
             └──────── trace-id ──────────┘
```

Une trace relie plusieurs spans pour reconstruire le chemin d’une requête à travers les services.

Temps de lecture ~43 min

---

## 6 : Niveau 3 : Backend

<a id="sec-express"></a>
<a id="61-express-et-les-micro-frameworks"></a>

### 6.1 : Express (et les micro-frameworks)

**Express** : Tag : PROFESSIONNELLE (présent dans de nombreux services et bases de code existants) ·
Coût d’apprentissage : dépend de l’expérience et de la profondeur visée · Durée de vie : ne se résume pas à un nombre d’années ; la compatibilité dépend de la version · À apprendre après : `node:http`, composition de fonctions

- **Ancrage ce parcours** : [02-express_from_scratch.md](../../../02-CONSTRUCTION/19-API-CRAFT/02-express_from_scratch.md), tu as déjà écrit le routeur et la chaîne de middlewares à la main
- **Ce qu'il ajoute** : un routeur, une chaîne de middlewares, et rien d'autre. C'est sa force et sa limite.
- **Ce qu'il masque** : la différence de propagation des erreurs asynchrones entre Express 4 et Express 5, et le fait qu'une variable capturée au niveau module est partagée par toutes les requêtes.
- **Ce qu'il ne résout pas** : l'organisation du code, la validation des entrées ni l'injection de dépendances ; ces choix restent à concevoir ou à ajouter.
- **Quand ne pas le choisir** : quand l'équipe a besoin d'un cadre architectural imposé, d'une injection de dépendances intégrée ou de conventions strictes dès le départ. La taille de l'équipe seule ne suffit pas à décider.
- **Exemple qui casse** : une route `async` qui jette est invisible pour le gestionnaire d'erreurs ; le client attend jusqu'au timeout, et le process affiche parfois `ERR_UNHANDLED_REJECTION` avant de mourir si rien ne capte le rejet au niveau global.
- **Preuve que c'est acquis** : tu sais écrire un middleware d'erreur unique qui voit toutes tes routes, y compris les async · **Si tu bloques, reviens à** : [02-express_from_scratch.md](../../../02-CONSTRUCTION/19-API-CRAFT/02-express_from_scratch.md)

**Ce qu'il ajoute par-dessus `node:http` :** un routeur, une chaîne de middlewares, et rien d'autre. C'est sa force et sa limite.

#### Ce que ce parcours permet déjà de comprendre

- [02-express_from_scratch.md](../../../02-CONSTRUCTION/19-API-CRAFT/02-express_from_scratch.md) : tu as déjà écrit le routeur et la chaîne de middlewares à la main ; Express n'en fait pas plus.
- [04-composition.md](../../../02-CONSTRUCTION/09-FUNCTIONAL-JS/04-composition.md) : un middleware est une fonction composée, avec un droit de court-circuit.
- [05-currying.md](../../../02-CONSTRUCTION/09-FUNCTIONAL-JS/05-currying.md) : un middleware configurable est une factory qui retourne un handler.
- [05-async_error_traps.md](../../../01-CADRAGE/04-ERROR-HANDLING/05-async_error_traps.md) : la promesse rejetée qu'aucun middleware ne voit, et le client qui attend jusqu'au timeout.
- [04-closure_trap.md](../../../00-SOCLE/04-FUNDAMENTALS/02_scope/04-closure_trap.md) : une variable capturée au niveau module est partagée par **toutes** les requêtes.

**Le modèle mental : la chaîne de middlewares :**

```text
requête → [logger] → [cors] → [auth] → [validation] → [handler] → réponse
                                 ↓ next(err)
                          [gestionnaire d'erreurs]
```

C'est une **composition de fonctions** ([04-composition.md](../../../02-CONSTRUCTION/09-FUNCTIONAL-JS/04-composition.md)) où chaque maillon peut court-circuiter ou passer la main. Si tu as compris la composition et le pattern Chain of Responsibility (`02-CONSTRUCTION/10-DESIGN-PATTERNS/`), tu as compris Express en dix minutes.

**Ce qu'il masque : la frontière async invisible.** Avec Express 4, une promesse rejetée par un handler `async` n'est pas automatiquement transmise au middleware d'erreur : il faut la transmettre explicitement (par exemple avec un wrapper). Express 5 transmet les rejets de promesse retournés par les handlers et middlewares. Vérifie donc la version réellement utilisée avant de reprendre un exemple. C'est [05-async_error_traps.md](../../../01-CADRAGE/04-ERROR-HANDLING/05-async_error_traps.md) en production.

**Sécurité dans le code, pas seulement en prose :**

```js
// Handler avec validation de schéma en frontière et requête paramétrée
app.post("/streams/:id/events", requireApiKey, async (req, res, next) => {
  const parsed = eventSchema.safeParse(req.body); // validation en frontière
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const apiSecret = process.env.INGEST_SECRET; // secret depuis l'environnement
  // console.log("secret utilisé:", apiSecret); // MAUVAIS : ne jamais journaliser un secret

  try {
    // requête paramétrée : jamais de concaténation de chaîne SQL
    await db.query("INSERT INTO events (stream_id, payload) VALUES ($1, $2)", [
      req.params.id,
      parsed.data,
    ]);
    // MAUVAIS : await db.query(`INSERT INTO events (stream_id, payload) VALUES (${req.params.id}, '${JSON.stringify(parsed.data)}')`);
    res.status(202).end();
  } catch (err) {
    next(err); // toute erreur passe par le middleware d'erreur unique
  }
});
```

#### Ce qui casse en production : trois pièges classiques

- **La configuration capturée une seule fois.** Un middleware qui met en cache une configuration dans une closure au niveau module (`config ??= await loadConfig(...)`) fonctionne parfaitement en développement, avec un seul tenant. En production multi-clients, le client B reçoit la configuration du client A : sans erreur, sans log, une fuite de données pure.
- **La concurrence non bornée.** Un service qui rafraîchit 800 flux avec `Promise.all(streams.map(fetchStats))` envoie 800 requêtes simultanées : le fournisseur bannit l'IP, le pool de connexions à la base explose. Le correctif n'est pas un framework différent, c'est une concurrence bornée (huit appels en vol maximum, pas huit cents).
- **Le code HTTP mal choisi.** Une route qui renvoie `500` pour un identifiant introuvable déclenche l'alerting à tort, fait réessayer un client qui croit à une panne transitoire, et noie le vrai incident du lendemain dans le bruit. C'était un `404`.
- **Le succès qui ment.** Une API qui renvoie `{ "error": "Utilisateur introuvable" }` avec un statut `200` pousse chaque consommateur à parser le message lui-même. Le jour où la phrase change, les intégrations qui la comparaient cassent en silence. Un code stable (`USER_NOT_FOUND`) et le bon statut HTTP rendent la faute impossible.

**Quand le choisir.** Petit service, prototype, code legacy à maintenir, équipe qui préfère assembler explicitement ses composants et besoin de contrôle sans conventions imposées.
**Quand l'éviter.** Lorsque l'équipe a besoin de conventions partagées, de frontières de modules ou d'une injection de dépendances intégrée, mais ne veut pas prendre en charge leur conception et leur maintien. Ces besoins peuvent aussi être satisfaits par des conventions et bibliothèques autour d'Express ; le framework ne décide pas seul de la qualité de l'architecture.

#### Alternatives

| Alternative        | Tag             | Ce qui change                                                        | Ce que ça change côté mécanisme du parcours                                                          |
| ------------------ | --------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Fastify**        | PROFESSIONNELLE | plus rapide, validation de schéma intégrée, excellent défaut moderne | le pipe de validation remplace le middleware maison, même chaîne de responsabilité                   |
| **Hono**           | CONTEXTUELLE    | léger, multi-runtime, edge                                           | la même composition de middlewares tourne aussi hors Node (Deno, Bun, Workers)                       |
| **Koa**            | PÉRISSABLE      | middlewares en `async/await` natif dès l'origine                     | plus besoin de wrapper `asyncHandler`, le piège async d'Express disparaît structurellement           |
| **Deno** (runtime) | CONTEXTUELLE    | permissions explicites, TypeScript natif                             | le modèle de sécurité par permission remplace la confiance implicite de Node                         |
| **Bun** (runtime)  | CONTEXTUELLE    | démarrage et installation très rapides                               | même graphe de middlewares, mais l'event loop et le profil mémoire diffèrent                         |
| **Go** (net/http)  | CONTEXTUELLE    | typage statique, goroutines au lieu de l'event loop                  | le concept de middleware existe encore, mais la concurrence n'est plus coopérative en un seul thread |

Le concept de middleware est identique partout.

> **Exercice : Le piège de l'erreur async**
> **Temps réaliste** : 1 h 30 · **Prérequis matériel / compte** : aucun · **Coût max** : 0 €
> **Mode** : jeûne d’IA obligatoire
> **Contraintes** : écris trois routes : une qui jette de façon synchrone, une qui jette dans une promesse non enveloppée, une qui jette depuis un `setTimeout` ; un seul middleware d'erreur, aucun `try/catch` dupliqué dans les handlers, un log structuré par erreur.
> **Réutilise** : [05-async_error_traps.md](../../../01-CADRAGE/04-ERROR-HANDLING/05-async_error_traps.md)
> **Piège** : la troisième ne sera jamais rattrapée par un simple wrapper de handler : dis pourquoi et ce que tu mets en place à la place (écoute sur `process.on('uncaughtException')`, mais seulement pour logguer et arrêter proprement, jamais pour continuer).
> **À observer** : le code HTTP reçu par le client, le temps qu'il attend, et ce que le process fait de l'erreur non gérée.
> **Vérification** (observable, chiffrée) : `curl` sur les trois routes renvoie une réponse en moins d'une seconde et aucun rejet non géré n'apparaît dans les logs du process.
> **Repli 100 % local et gratuit** : tout l'exercice tourne en local, aucun repli nécessaire.
> **Extension** : ajoute un middleware qui capture une valeur de configuration au niveau module, et prouve qu'un second client reçoit la configuration du premier.
> **Preuve du jeûne demandée** : avant d'écrire le code, rédige en 5 lignes ton hypothèse écrite sur laquelle des trois routes échappera au wrapper et pourquoi, horodatée avant toute exécution.

---

### 6.2 : NestJS

**NestJS** : Tag : PROFESSIONNELLE (framework structurant de l'écosystème Node.js / TypeScript) ·
Coût d’apprentissage : dépend de l'expérience TypeScript, POO et injection de dépendances · Durée de vie : ne se résume pas à un nombre d’années ; vérifier les versions et le rythme de maintenance · À apprendre après : POO, TypeScript, patrons de conception, architecture propre

- **Ancrage ce parcours** : [03-solid_principles.md](../../../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/03-solid_principles.md), l'injection de dépendances est l'inversion de dépendance de SOLID
- **Ce qu'il ajoute** : une architecture imposée, décorateurs, injection de dépendances, guards/interceptors/pipes ordonnés.
- **Ce qu'il masque** : le conteneur d'injection et la résolution des dépendances : symptôme typique, un module qui n'exporte pas ce qu'un autre importe.
- **Ce qu'il ne résout pas** : ton modèle de domaine ; Nest range les fichiers, il ne conçoit pas ton métier.
- **Quand ne pas le choisir** : lorsque son architecture, ses abstractions ou son coût d'initialisation dépassent le besoin réel ; un petit service ou une fonction serverless peut alors être plus simple avec un framework plus léger. La taille de l'équipe, isolément, ne constitue pas un critère suffisant.
- **Exemple qui casse** : `Nest can't resolve dependencies of the IngestService (?). Please make sure that the argument at index 0 is available in the current context.` : un module n'exporte pas ce qu'un autre importe.
- **Preuve que c'est acquis** : tu sais réciter l'ordre exact middleware → guard → interceptor → pipe → handler → interceptor → filtre, et dire à quelle étape une requête invalide est rejetée · **Si tu bloques, reviens à** : [03-solid_principles.md](../../../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/03-solid_principles.md)

#### Pourquoi il existe

Express ne dit rien sur l'organisation. Passé une certaine taille, chaque équipe réinvente sa structure, sa validation, son injection de dépendances, sa gestion d'erreurs. NestJS impose une architecture, largement inspirée d'Angular et de Spring.

#### Ce que ce parcours permet déjà de comprendre

- **Décorateurs** : c'est le pattern Decorator ([02-decorator_pattern.md](../../../02-CONSTRUCTION/10-DESIGN-PATTERNS/02_structural/02-decorator_pattern.md)) avec de la métadonnée. `@Injectable()` ne fait pas de magie : il marque une classe pour le conteneur.
- **Injection de dépendances** : c'est l'inversion de dépendance de SOLID ([03-solid_principles.md](../../../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/03-solid_principles.md)). Ta classe ne construit plus ses collaborateurs, on les lui donne. Conséquence pratique : tu peux tester en injectant un faux.
- **Guards / Interceptors / Pipes** : la même chaîne de responsabilité qu'Express, nommée et ordonnée.
- **Providers et cycle de vie** : un provider en portée singleton conserve son état entre les requêtes. Y stocker des données de requête est un bug de sécurité, pas un bug de performance.

#### Le cycle de vie d'une requête : à connaître par cœur (c'est du concept, pas de l'API)

```text
                       CYCLE DE VIE D'UNE REQUÊTE NESTJS

  requête HTTP
       │
       ▼
  ┌───────────┐  brut, façon Express
  │ Middleware │
  └─────┬─────┘
        ▼
  ┌───────────┐  IA-je le droit ? → sinon 403
  │   Guard    │
  └─────┬─────┘
        ▼
  ┌───────────────┐  avant : logs, timers
  │ Interceptor(1) │
  └───────┬───────┘
          ▼
  ┌───────────┐  validation + transformation → sinon 400
  │    Pipe    │
  └─────┬─────┘
        ▼
  ┌───────────┐  la logique métier
  │  Handler   │
  └─────┬─────┘
        ▼
  ┌───────────────┐  après : mapping de la réponse
  │ Interceptor(2) │
  └───────┬───────┘
          ▼
  ┌──────────────────┐  transforme les erreurs en réponses HTTP
  │ Exception filter  │  (capte aussi les erreurs jetées à toute étape ci-dessus)
  └─────────┬─────────┘
            ▼
        réponse HTTP
```

Quand tu débogues "pourquoi mon code ne s'exécute pas", 80 % du temps la réponse est dans cet ordre.

#### Exemple réaliste, avec sécurité montrée dans le code

```ts
@Controller("ingest")
export class IngestController {
  constructor(private readonly ingest: IngestService) {} // DI, pas de `new`

  @UseGuards(ApiKeyGuard) // guard AVANT le pipe : un appelant non autorisé n'atteint jamais la validation
  @Post("events")
  async push(@Body() dto: PushEventsDto) {
    // Pipe de validation en frontière
    const secret = process.env.INGEST_SIGNING_SECRET; // secret depuis l'environnement
    // this.logger.log(`secret: ${secret}`); // MAUVAIS : ne jamais journaliser un secret
    return this.ingest.enqueue(dto.events);
  }
}
```

Ce qui est invisible ici et qui compte : le guard s'exécute avant le pipe, donc un appelant non autorisé n'atteint jamais ta validation. Bonne nouvelle pour la sécurité, mauvaise nouvelle si tu comptais logger les payloads invalides.

#### Ce qu'il masque

Le conteneur d'injection et la résolution des dépendances. Symptôme littéral : `Nest can't resolve dependencies of the IngestService (?). Please make sure that the argument at index 0 is available in the current context.` : un module n'exporte pas ce qu'un autre importe. L'erreur est intimidante ; elle dit littéralement quel argument est manquant, à quelle position.

#### Ce qu'il ne résout pas

Ton modèle de domaine. Une architecture NestJS impeccable avec une logique métier étalée dans les contrôleurs reste du code jetable. Nest range les fichiers ; il ne conçoit pas ton métier.

#### Exemple qui casse : la dépendance directe au driver

Une équipe veut migrer de MongoDB vers PostgreSQL. Le code métier importe le driver Mongo dans 47 fichiers et manipule des `ObjectId` jusque dans le calcul des droits. La migration, estimée à trois semaines, en prend sept mois : ce n'est plus une migration de base, c'est une réécriture. La même application, avec un repository par agrégat derrière une interface, aurait changé quatre fichiers : exactement ce que l'inversion de dépendance de SOLID est censée acheter.

#### Testing

L'injection de dépendances est ton point de test : ta classe ne construit plus ses collaborateurs, tu lui injectes un faux dans un module de test. Les tests unitaires ciblent les services ; les tests d'intégration frappent l'application complète pour vérifier l'ordre guard → pipe → handler → exception filter, qui est justement ce que l'unitaire ne voit pas.

#### Sécurité

Le guard s'exécute avant le pipe : un appelant non autorisé n'atteint jamais ta validation. Deuxième point, moins connu : un provider en portée singleton conserve son état entre les requêtes. Y stocker des données de requête est un bug de sécurité (fuite d'un utilisateur vers un autre), pas un bug de performance.

#### Observabilité

C'est le point où l'architecture de NestJS paye vraiment. Les préoccupations transverses ont un endroit prévu : un **interceptor** entoure chaque handler, un **exception filter** voit toutes les erreurs sortantes, un logger injecté remplace le logger par défaut sans toucher un seul service.

Ce que ça donne concrètement : un identifiant de corrélation généré à l'entrée, propagé dans le contexte, présent dans chaque ligne de log et dans chaque span ([02-structured_logging.md](../../../03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md), [03-distributed_tracing.md](../../../03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md)). Instrumenter après coup un Express écrit à la main demande de toucher trente fichiers ; ici, un.

Le piège spécifique : un exception filter qui journalise et **renvoie une réponse 200**, ou qui renvoie la trace complète au client. Le premier rend l'erreur invisible pour l'appelant, le second lui offre le chemin de tes fichiers et parfois ta requête SQL.

#### Déploiement

Une application NestJS est un process Node de longue durée. Trois conséquences que la fiche Express ne pose pas de la même manière :

1. **L'arrêt gracieux n'est pas optionnel.** Sur `SIGTERM`, l'orchestrateur coupe. Sans `enableShutdownHooks`, les requêtes en vol sont perdues et les connexions à la base ne sont pas fermées proprement. Chaque déploiement produit alors une poignée d'erreurs 502 que personne ne relie au déploiement ([05-process_env_argv.md](../../../02-CONSTRUCTION/13-RUNTIME-ENV/05-process_env_argv.md)).
2. **Le pool de connexions se dimensionne par instance, pas par service.** Dix instances à vingt connexions font deux cents connexions sur une base qui en accepte cent. Le service tombe à la montée en charge, c'est-à-dire au pire moment. Symptôme observable : des requêtes qui échouent avec un timeout de pool (`timeout exceeded when trying to connect`), jamais avec un message clair sur la cause réelle (trop d'instances, pas assez de connexions autorisées côté base).
3. **La configuration se lit au démarrage, pas au build.** Contrairement au frontend, rien n'est inliné : un secret reste un secret. En revanche, une variable manquante doit faire **échouer le démarrage**, pas produire un `undefined` qui se propage jusqu'en production. Valide la configuration au boot avec le même schéma que tes DTO.

Sur le reste, c'est un conteneur Node standard : image de base à jour, utilisateur non root, endpoint de santé distinct de l'endpoint de disponibilité ([05-load_balancing.md](../../../05-MAITRISE/02-SCALABILITY/05-load_balancing.md)).

##### Pont vers les modules du parcours

[03-solid_principles.md](../../../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/03-solid_principles.md) (la DI et le graphe de modules), [05-clean_architecture.md](../../../02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/05-clean_architecture.md) (ce que la structure ne remplace pas), [03-singleton_pattern.md](../../../02-CONSTRUCTION/10-DESIGN-PATTERNS/01_creational/03-singleton_pattern.md) (l'état dans un provider singleton), [04-closure_trap.md](../../../00-SOCLE/04-FUNDAMENTALS/02_scope/04-closure_trap.md) (la même fuite, vue côté closure), [02-structured_logging.md](../../../03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md) et [03-distributed_tracing.md](../../../03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md) (les interceptors ci-dessus), [03-custom_errors.md](../../../01-CADRAGE/04-ERROR-HANDLING/03-custom_errors.md) (ce qu'un exception filter doit formater).

#### Quand le choisir

Backend qui va vivre des années, équipe de plusieurs personnes, besoin d'une structure commune, TypeScript assumé, beaucoup de préoccupations transverses (auth, logs, validation, traçage).

#### Quand ne pas le choisir

Petit service, fonction serverless, prototype, équipe rebutée par les classes et les décorateurs. Le coût d'entrée est réel : concepts empruntés à Angular et Spring, beaucoup de fichiers pour un premier endpoint.

#### Matrice de décision : Express / Fastify / NestJS

| Contrainte                                       | Express                                            | Fastify                                             | NestJS                                                                                                |
| ------------------------------------------------ | -------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Petit service ou prototype                       | Peu de conventions imposées ; démarrage direct     | Structure légère avec validation intégrable         | Cadre plus structuré, parfois disproportionné pour un besoin très simple                              |
| Plusieurs personnes ou plusieurs équipes         | Discipline et conventions à définir explicitement  | Plugins et conventions d'équipe à définir           | Modules, injection de dépendances et conventions intégrées ; utiles si l'équipe les adopte réellement |
| Débit élevé ou latence critique                  | Peut convenir ; mesurer le service réel            | Peut être un bon candidat ; mesurer le service réel | Mesurer aussi le coût du framework et des composants utilisés                                         |
| Authentification, validation, traçage et erreurs | Choisir et assembler les middlewares               | Choisir et assembler les plugins                    | Plusieurs points d'extension structurés sont intégrés                                                 |
| Fonction serverless / démarrage à froid          | Vérifier taille, initialisation et runtime         | Vérifier taille, initialisation et runtime          | Vérifier le coût réel de l'initialisation du conteneur                                                |
| Code existant à maintenir                        | Préserver le choix existant sauf raison documentée | Migration à justifier par un bénéfice mesurable     | Migration à justifier par un bénéfice mesurable                                                       |

**Repère de décision :** ne choisis pas un framework à partir d'un seuil universel de taille d'équipe ou de durée de projet. Pars des compétences déjà présentes, du besoin de conventions, des exigences d'exploitation, des bibliothèques nécessaires, du coût de démarrage et de la facilité de maintenance. Si plusieurs options restent plausibles, compare un petit parcours vertical représentatif et consigne le compromis dans un ADR.

#### Alternatives et transfert

<!-- AF-DIAGRAM:reference -->

<a id="sec-auth-cache-files-realtime"></a>

<a id="63-validation-authentification-autorisation"></a>

### 6.3 : Authentification et autorisation

Authentifier une personne répond à **« qui présente cette preuve d'identité ? »**. Autoriser une action répond à **« cette identité peut-elle agir sur cette ressource, dans ce contexte ? »**. Les deux contrôles sont liés, mais ne sont pas interchangeables.

- **Session** : état serveur ou référence de session permettant de rattacher plusieurs requêtes à une identité. Un identifiant de session doit être imprévisible, protégé et renouvelé lors d'un changement de privilège.
- **Access token** : preuve de courte durée qui accompagne une requête. Pour un JWT, vérifier explicitement signature, algorithme autorisé, émetteur (`iss`), destinataire (`aud`), expiration (`exp`) et contexte attendu. Décoder un JWT n'est pas le vérifier.
- **Refresh token** : credential de renouvellement à forte valeur. Un modèle robuste utilise une valeur opaque, une rotation à usage unique, une détection de réutilisation et une révocation liée à la session ou à la famille de tokens.
- **Autorisation** : vérifier côté serveur chaque action sur chaque ressource. Une identité valide ne donne pas automatiquement accès à tous les objets ni à tous les tenants.

```text
requête
  │
  ▼
preuve d'identité valide ? ── non ──► 401
  │ oui
  ▼
action permise sur cette ressource et ce tenant ?
  │ non
  └────────────────────────────────► 403
  │ oui
  ▼
règle métier et opération
```

**Pièges fréquents :**

- mettre un secret, un refresh token ou un token complet dans les logs ;
- utiliser `decode()` comme si la signature était validée ;
- accepter l'algorithme annoncé par le token sans liste autorisée ;
- stocker un rôle ou un tenant dans le client et lui faire confiance au moment de l'autorisation ;
- vérifier les droits à la création, mais pas à la lecture, à la modification, à l'export ou à la suppression ;
- laisser les accès de plusieurs comptes partager un cache ou un singleton avec état utilisateur.

Si les cookies transportent automatiquement la session, documente les protections adaptées contre les requêtes intersites (par exemple `SameSite`, jeton CSRF lorsque nécessaire, vérification d'origine) et les attributs `HttpOnly` / `Secure`. Pour une application native, le stockage des secrets doit utiliser les mécanismes sécurisés de la plateforme. Il n'existe pas une recette unique qui convienne à toutes les architectures.

**Preuve de compréhension :** construis une matrice acteur × action × ressource × tenant ; explique pourquoi un utilisateur authentifié reçoit parfois `403`, et comment une opération de révocation invalide une session déjà ouverte.

Sources : [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [RFC 8725 : JSON Web Token Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725.html).

<a id="sec-redis-cache"></a>

<a id="64-redis"></a>

### 6.4 : Cache et Redis

Un cache conserve temporairement une copie calculée ou lue ailleurs afin de réduire une latence, une charge ou un coût. **Par défaut, un cache n'est pas la source de vérité.** Redis peut servir de cache, de stockage temporaire, de compteur ou de primitive de coordination ; le choix dépend du modèle de données et des garanties attendues.

**Cache-aside (lecture à la demande) :**

```text
requête
  │
  ▼
clé présente ? ── oui ──► vérifier fraîcheur ──► retourner valeur
  │ non / expirée
  ▼
source de vérité (ex. base SQL)
  │
  ▼
mettre en cache avec TTL ──► retourner valeur
```

Points à décider explicitement :

1. **Clé** : inclure les dimensions qui changent la réponse (tenant, locale, droits, version de schéma). Une clé trop large peut exposer les données d'un autre utilisateur.
2. **TTL** : durée maximale pendant laquelle la copie peut être réutilisée. Un TTL long réduit les lectures mais augmente le risque de donnée périmée.
3. **Invalidation** : définir ce qui se passe après une écriture, une suppression ou un changement de droits. « On videra le cache plus tard » n'est pas une stratégie.
4. **Concurrence** : une expiration collective peut provoquer une ruée sur la source (cache stampede). Un jitter, un verrou de courte durée ou `stale-while-revalidate` peuvent aider selon le besoin.
5. **Panne** : décider si l'application continue sans cache, ralentit, ou refuse une opération. Ne fais pas dépendre une donnée durable de la seule mémoire volatile du cache.

Redis peut aussi soutenir un compteur de tentatives ou une limitation de débit. Il faut alors définir la fenêtre, l'identité de la clé, les limites par utilisateur/IP/tenant et le comportement si Redis est indisponible. Un compteur de sécurité mal configuré peut devenir une voie de contournement ou une cause de déni de service.

**Preuve de compréhension :** dessine le chemin d'une mise à jour de profil et démontre comment un cache peut ne pas afficher l'ancienne valeur indéfiniment, y compris après une suppression.

Source : [documentation officielle Redis](https://redis.io/docs/latest/).

<a id="sec-files-object-storage"></a>

### 6.5 : Fichiers et stockage objet

Un fichier reçu par une API est une entrée non fiable, même si son nom se termine par `.pdf`, `.png` ou `.csv`. Le nom, l'extension, le type MIME déclaré et le contenu peuvent se contredire.

**Chaîne de traitement prudente :**

```text
upload
  │
  ▼
limite de taille + authentification + autorisation
  │
  ▼
nom généré côté serveur + stockage temporaire/quarantaine
  │
  ▼
validation du contenu et analyse adaptée au risque
  │
  ▼
association à une ressource métier autorisée
  │
  ▼
accès privé ou URL signée de durée limitée
```

- Contrôle la taille, le nombre de fichiers, les quotas et le temps de transfert avant de charger tout le contenu en mémoire.
- Génère un identifiant de stockage côté serveur ; ne construis pas un chemin à partir d'un nom fourni par l'utilisateur.
- Vérifie le type réel selon le format et l'usage ; le MIME déclaré par le navigateur n'est pas une preuve.
- Privilégie le streaming pour les gros fichiers. Sépare le stockage objet de la métadonnée métier (propriétaire, tenant, état de validation, taille, empreinte, politique de rétention).
- Garde les objets privés par défaut. Une URL signée est un jeton d'accès : sa durée doit être limitée et sa portée étroite.
- Selon le risque, ajoute quarantaine, antivirus ou analyse spécialisée avant de rendre le fichier disponible. Un scan n'est pas une garantie absolue.

**Preuve de compréhension :** énumère les contrôles effectués avant qu'un fichier ne soit téléchargeable, et explique comment le système empêche un utilisateur de lire le fichier d'un autre tenant en devinant son identifiant.

Référence de sécurité : [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

<a id="sec-events-realtime"></a>

<a id="65-files-de-messages-et-workers"></a>
<a id="66-temps-réel-websocket-et-sse"></a>

### 6.6 : Files de messages, événements et temps réel

Une file découple le moment où un travail est demandé du moment où il est exécuté. Cela absorbe des pointes et permet de reprendre un travail ; cela introduit aussi des retards, des doublons possibles, de l'ordre non garanti et des erreurs à traiter.

**Cycle d'un message :**

```text
producteur ──► file ──► consommateur
                   │         │
                   │         ├─ succès ─► ACK
                   │         └─ erreur ─► retry borné / dead-letter
                   │
                   └─ message parfois livré plus d'une fois
```

- Conçois le consommateur pour être **idempotent** : traiter deux fois le même message ne doit pas produire deux paiements ou deux effets métier indésirables.
- Définis les tentatives, le backoff, le délai maximal, l'expiration et une file de quarantaine (dead-letter) avec un processus de reprise.
- Un accusé de réception (`ACK`) signifie que le consommateur a atteint le point de durabilité défini. Il ne doit pas être envoyé avant le commit métier si cela crée un risque de perte.
- Les garanties « au moins une fois », « au plus une fois » et « exactement une fois » sont des contrats différents. L'effet métier exactement une fois nécessite généralement une conception d'idempotence et de déduplication ; ne l'attribue pas magiquement à la file.
- Le **transactional outbox** aide à éviter la double écriture non atomique (enregistrer une donnée en base puis publier un événement) : l'événement est écrit dans la même transaction que la donnée, puis publié par un processus séparé.

**Temps réel :**

- **WebSocket** : canal bidirectionnel persistant, utile lorsque client et serveur doivent échanger des messages dans les deux sens.
- **Server-Sent Events (SSE)** : flux unidirectionnel serveur → client sur HTTP ; le client peut se reconnecter, et le serveur doit gérer l'identité, les autorisations et la reprise.

Dans les deux cas, prévois authentification, autorisation par canal/ressource, limites de débit, taille maximale des messages, reconnexion et gestion de la contre-pression (backpressure). Une connexion ouverte ne signifie pas qu'un droit d'accès reste valide indéfiniment : réévalue les droits selon le modèle de session.

**Preuve de compréhension :** explique ce qu'il arrive si un consommateur plante après avoir validé l'opération métier mais avant l'ACK, et pourquoi l'idempotence évite le doublon à la reprise.

Sources : [RabbitMQ : Reliability Guide](https://www.rabbitmq.com/docs/reliability), [Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html), [MDN : WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), [MDN : Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).

---

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

Dans [Kintana](../../77-FIL-ROUGE-KINTANA/README.md), **Niveau 3 : Backend (section 6)** se rattache à ce cas concret : Pour Kintana, une compétence comme l'idempotence n'est acquise que si tu sais l'expliquer, l'implémenter et vérifier le rejeu et les conflits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Référentiel de compétences par preuves

> **Arc DBZ / Capsule Corp. :** Bulma ne dit pas « je suis forte » parce qu'elle a lu le manuel. Elle vérifie ce que l'outil permet réellement.

**Mission liée à « Niveau 3 : Backend (section 6) » :** Établis ton état initial sur une tranche Kintana : sélectionne trois compétences, réalise une tâche de chacune sans suivre un corrigé, garde les tests et note ce que tu n'as pas pu démontrer.

**Livrable :** un registre de compétences avec preuves liées, statut honnête, date de révision et prochain test de transfert.

**Critères d’acceptation :** chaque statut pointe vers un artefact ; une compétence non testée reste `NON ÉVALUÉE` ; aucune preuve déclarative ne vaut une exécution ; les lacunes ont une action de remédiation.

**Transfert obligatoire :** Reprends une compétence dans un langage ou un composant différent et vérifie si le principe se transfère réellement.
