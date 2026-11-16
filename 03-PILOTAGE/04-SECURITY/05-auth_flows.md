---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_inversee, constraints_injectees]
anti_recipe_key: decision_inversee+constraints_injectees
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# OAUTH, sessions, JWT

<!-- AF-DIAGRAM:jwt -->

```text
Login ─► Issue token ─► Request + token ─► Verify ─► Allow / Reject
                                      │
                                      └────► Expired / Invalid
```

Le token traverse un cycle de création, transport, validation et expiration.

Temps de lecture ~11 min

Trois modèles d'auth. Trois cas d'usage différents. Choisir le mauvais en prod c'est soit une faille de sécurité, soit une complexité inutile que tu vas payer en maintenance.

---

## 1) SESSIONS : L'ÉTAT CÔTÉ SERVEUR

### Le quoi

Sessions : le serveur garde l'état de connexion. Il génère un identifiant de session (session ID) aléatoire, le stocke côté serveur (en mémoire, Redis, DB), et envoie uniquement l'identifiant au navigateur via un cookie. À chaque requête, le navigateur renvoie le cookie, le serveur récupère la session associée.

```text
Connexion  --> serveur crée une session { userId: 42, role: 'user' }
      --> stocke en Redis sous la clé "sess:abc123"
      --> envoie le cookie : sessionId=abc123
Requête   --> navigateur envoie cookie sessionId=abc123
      --> serveur cherche "sess:abc123" dans Redis
      --> trouve { userId: 42 } --> utilisateur authentifié
Déconnexion --> serveur supprime "sess:abc123" de Redis
      --> session invalide immédiatement
```

### Avantages / inconvénients

```text
Avantages :
- révocation immédiate (supprimer la session = déconnexion instantanée)
- l'état est côté serveur : le client ne sait rien sur sa session
- compatible avec les navigateurs sans config supplémentaire

Inconvénients :
- nécessite du stockage serveur (Redis ou DB pour les apps distribuées)
- scalabilité : plusieurs instances serveur doivent partager le même store de sessions
- pas adapté aux clients non-navigateur (apps mobiles, APIs tierces)
```

### Implémentation

```js
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

app.use(
  session({
    store: new RedisStore({ client: redisClient }), // persiste les sessions dans Redis
    secret: process.env.SESSION_SECRET, // clé de signature du cookie : jamais en dur dans le code
    resave: false, // ne re-sauvegarde pas si la session n'a pas changé
    saveUninitialized: false, // ne crée pas de session pour les visiteurs non connectés
    cookie: {
      httpOnly: true, // JS ne peut pas lire le cookie
      secure: true, // HTTPS uniquement
      sameSite: "Lax", // nécessaire au callback OAuth en navigation GET de premier niveau; protéger les mutations par un contrôle CSRF dédié
      maxAge: 1000 * 60 * 60 * 24, // 24h en millisecondes
    },
  }),
);

app.post("/quarry-gate", async (req, res) => {
  const user = await verifyCredentials(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Identifiants incorrects" });

  req.session.userId = user.id; // stocker uniquement l'ID dans la session, pas le mot de passe
  req.session.role = user.role;
  res.json({ message: "Connecté" });
});

app.post("/logout", (req, res) => {
  req.session.destroy(); // supprime la session côté serveur --> déconnexion immédiate
  res.clearCookie("connect.sid");
  res.json({ message: "Déconnecté" });
});
```

---

## 2) JWT : L'ÉTAT CÔTÉ CLIENT

### Le quoi

JWT (JSON Web Token : jeton web JSON) : le serveur encode l'état dans un token signé, l'envoie au client. Le client renvoie ce token à chaque requête. Le serveur vérifie la signature, extrait les données. Aucun stockage côté serveur.

```text
JWT = header.payload.signature

header  --> { "alg": "HS256", "typ": "JWT" } (encodé en base64)
payload  --> { "userId": 42, "role": "user", "exp": 1700000000 } (encodé en base64)
signature --> HMAC-SHA256(header + "." + payload, SECRET_KEY)

La signature garantit que le payload n'a pas été modifié.
Si quelqu'un change "role": "user" en "role": "admin", la signature ne correspond plus.
```

### Avantages / inconvénients

```text
Avantages :
- stateless (sans état) : aucun stockage serveur nécessaire
- parfait pour les microservices et APIs multi-services
- compatible avec les apps mobiles et les clients non-navigateur
- scalable horizontalement sans partager un store

Inconvénients :
- révocation difficile : tu ne peux pas "invalider" un token avant son expiration
- si le token est volé, il est valide jusqu'à expiration (sauf si tu implémentes une blacklist)
- le payload est lisible (base64, pas chiffré) : ne jamais y mettre de données sensibles
```

### Implémentation

```js
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_ISSUER = "kintana-auth";
if (
  !ACCESS_TOKEN_SECRET ||
  !REFRESH_TOKEN_SECRET ||
  ACCESS_TOKEN_SECRET === REFRESH_TOKEN_SECRET
) {
  throw new Error("Deux secrets JWT distincts doivent être configurés");
}
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

function signAccessToken(user) {
  return jwt.sign(
    { role: user.role, tokenUse: "access" },
    ACCESS_TOKEN_SECRET,
    {
      subject: String(user.id),
      issuer: JWT_ISSUER,
      audience: "kintana-api",
      expiresIn: ACCESS_TOKEN_EXPIRY,
    },
  );
}

function signRefreshToken(user) {
  return jwt.sign({ tokenUse: "refresh" }, REFRESH_TOKEN_SECRET, {
    subject: String(user.id),
    issuer: JWT_ISSUER,
    audience: "kintana-refresh",
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

// Génération au login
app.post("/quarry-gate", async (req, res) => {
  const user = await verifyCredentials(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Identifiants incorrects" });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  // Lax permet le retour OAuth via une navigation de premier niveau (callback GET).
  // Conserve une protection CSRF explicite sur les endpoints mutateurs.
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken }); // access token en mémoire côté client
});

// Middleware access-token uniquement : un refresh token ne peut pas être accepté ici.
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = authHeader.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, {
      issuer: JWT_ISSUER,
      audience: "kintana-api",
    });
    if (decoded.tokenUse !== "access" || !decoded.sub || !decoded.role) {
      return res.status(401).json({ error: "Type de token incorrect" });
    }
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expiré", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ error: "Token invalide" });
  }
};

// userRepository.findById(id) est le port du dépôt de données à brancher à la base réelle.
// Le rôle est relu depuis la source courante : un rôle révoqué ne survit pas au refresh.
app.post("/refresh", verifyCsrf, async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token manquant" });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
      issuer: JWT_ISSUER,
      audience: "kintana-refresh",
    });
    if (decoded.tokenUse !== "refresh" || !decoded.sub) {
      return res.status(401).json({ error: "Type de token incorrect" });
    }

    const user = await userRepository.findById(decoded.sub);
    if (!user || user.disabled) {
      return res.status(401).json({ error: "Compte indisponible" });
    }
    return res.json({ accessToken: signAccessToken(user) });
  } catch {
    return res.status(401).json({ error: "Refresh token invalide ou expiré" });
  }
});
```

<!-- AF-JWT-TOKEN-SEPARATION -->

> **Dépendances du snippet :** `userRepository.findById(id)` doit être implémenté par l'accès aux données de l'application ; `verifyCsrf` est le middleware CSRF défini dans la leçon précédente. Les deux secrets doivent être générés séparément et conservés dans un gestionnaire de secrets. Les audiences, l'émetteur et `tokenUse` empêchent la confusion de destination ; le secret séparé ajoute une frontière cryptographique. En production, prévoir aussi rotation/révocation des refresh tokens, limites de renouvellement et gestion des sessions.

### Où stocker le JWT côté client

```text
localStorage  --> persistant, accessible via JS --> vulnérable aux XSS : à éviter pour les tokens sensibles
sessionStorage --> disparaît à la fermeture de l'onglet, accessible via JS --> même problème
memory (variable JS) --> disparaît au refresh, non-accessible depuis d'autres onglets --> le mieux pour l'access token
cookie httpOnly   --> pas accessible via JS --> protégé contre XSS --> utilisé pour le refresh token
```

La stratégie recommandée : access token en mémoire (short-lived), refresh token en cookie httpOnly.

---

## 3) OAUTH 2.0 : DÉLÉGUER L'AUTHENTIFICATION

### Le quoi

OAuth 2.0 (Open Authorization : autorisation ouverte) : protocole qui permet à un utilisateur d'autoriser ton app à accéder à ses ressources chez un autre service (Google, GitHub, Twitter), sans partager son mot de passe avec toi.

Ce n'est pas un protocole d'authentification (qui es-tu ?) mais d'autorisation (à quoi autorises-tu l'accès ?). OpenID Connect (OIDC) est la couche qui ajoute l'identité au-dessus d'OAuth 2.0.

### Le flow Authorization Code (le plus sécurisé)

```text
1. Utilisateur clique "Se connecter avec Google"
2. Ton app redirige vers Google avec : client_id, redirect_uri, scope, state (nonce anti-CSRF)
3. L'utilisateur s'authentifie sur Google et accepte les permissions
4. Google redirige vers ton redirect_uri avec un "code" d'autorisation
5. Ton SERVEUR (pas le client) échange ce code contre un access_token + id_token
  (appel serveur à serveur : le code n'est jamais exposé au client)
6. Ton serveur vérifie l'id_token (JWT signé par Google) et extrait l'identité
7. Ton app crée ou retrouve l'utilisateur dans ta DB, génère sa session/JWT
```

```text
Client --> [1] Redirige vers Google
Google --> [2] Authentification + consentement
Google --> [3] Redirige vers ton app avec un code
Serveur --> [4] Échange le code contre les tokens (appel privé)
Serveur --> [5] Vérifie l'id_token, crée la session utilisateur
Client --> [6] Connecté
```

### Le paramètre state, PKCE et nonce : protections complémentaires

- `state` lie la réponse au démarrage de connexion et protège contre la substitution de réponse (CSRF).
- PKCE avec `S256` lie l'échange du code au client qui a démarré le flux. Il est requis pour les clients publics et recommandé aussi pour les clients confidentiels.
- `nonce` lie l'ID Token OIDC à la demande d'authentification. Il ne remplace ni `state` ni PKCE.

Le cookie de session doit être `SameSite: "Lax"` pour être renvoyé lors du callback GET de premier niveau. Les opérations mutatrices de l'application conservent leur contrôle CSRF propre.

```js
// Exemple pédagogique côté serveur : crypto vient du module Node.js.
const crypto = require("node:crypto");

app.get("/auth/google", (req, res) => {
  const state = crypto.randomBytes(32).toString("base64url");
  const nonce = crypto.randomBytes(32).toString("base64url");
  const codeVerifier = crypto.randomBytes(32).toString("base64url");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  req.session.oauthState = state;
  req.session.oidcNonce = nonce;
  req.session.pkceCodeVerifier = codeVerifier; // reste côté serveur, jamais dans l'URL

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: "https://app.com/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/auth/google/callback", async (req, res, next) => {
  try {
    const { code, state, error } = req.query;
    if (error)
      return res
        .status(401)
        .send("Authentification refusée par le fournisseur");

    const expectedState = req.session.oauthState;
    const expectedNonce = req.session.oidcNonce;
    const codeVerifier = req.session.pkceCodeVerifier;
    if (
      typeof state !== "string" ||
      typeof expectedState !== "string" ||
      !expectedState ||
      !expectedNonce ||
      !codeVerifier
    ) {
      return res.status(403).send("Session OAuth absente ou incomplète");
    }

    const received = Buffer.from(state);
    const expected = Buffer.from(expectedState);
    if (
      received.length !== expected.length ||
      !crypto.timingSafeEqual(received, expected)
    ) {
      return res.status(403).send("State invalide : possible attaque CSRF");
    }
    if (typeof code !== "string" || !code) {
      return res.status(400).send("Code d'autorisation manquant");
    }

    // Consommer les valeurs à usage unique avant l'échange.
    delete req.session.oauthState;
    delete req.session.oidcNonce;
    delete req.session.pkceCodeVerifier;

    // Le serveur envoie le code_verifier au token endpoint, jamais au navigateur.
    const tokens = await exchangeCodeForTokens(code, { codeVerifier });
    // Le validateur OIDC doit contrôler signature, issuer, audience, exp ET nonce.
    const userInfo = await verifyIdToken(tokens.id_token, { expectedNonce });

    const user = await upsertUser(userInfo);
    req.session.userId = user.id;
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});
```

`exchangeCodeForTokens` et `verifyIdToken` représentent ici des fonctions serveur à implémenter avec une bibliothèque/procédure vérifiée : ne pas accepter un ID Token sans vérifier sa signature, son issuer, son audience, son expiration et le `nonce` attendu. Le `code_verifier` doit être fourni au token endpoint, et le fournisseur doit vérifier qu'il correspond au `code_challenge` S256 initial.

---

## 4) QUAND CHOISIR QUOI

```text
Sessions  --> app web classique avec navigateur, tu veux la révocation immédiate
JWT    --> API publique, microservices, apps mobiles, clients multiples
OAuth   --> "connecte-toi avec Google/GitHub", accès à des resources tierces

Ne pas utiliser JWT comme remplacement des sessions si :
- tu as besoin de déconnexion immédiate (ex : sécurité, compromission de compte)
- ton app est uniquement web avec navigateur (les sessions sont plus simples)
- tu n'as pas de microservices qui doivent vérifier l'identité indépendamment
```

---

## EXERCICES

**EXO 1 : Prison Break Auth**
L'API Prison Break a besoin de deux types d'auth : sessions pour l'interface web des gardiens (déconnexion immédiate requise si un gardien est compromis), JWT pour l'API mobile des autorités externes. Implémenter les deux middlewares d'auth et la logique de login/logout pour chaque cas.
Contrainte : le middleware JWT doit gérer `TokenExpiredError` et renvoyer un code d'erreur distinct (`TOKEN_EXPIRED`) que le client peut utiliser pour déclencher un refresh automatique.

**EXO 2 : La rotation des tokens**
TrapSoul Radio a des tokens d'accès de 15 minutes. Un utilisateur écoute de la musique pendant 3 heures. Implémenter le mécanisme de refresh automatique côté client (sans framework, vanilla JS) : intercepter les 401 avec `TOKEN_EXPIRED`, appeler `/refresh`, retenter la requête originale avec le nouveau token.
Contrainte : si plusieurs requêtes échouent simultanément, n'appeler `/refresh` qu'une seule fois (pas de race condition).

**EXO 3 : OAuth sans bibliothèque**
Implémenter le flow Authorization Code OAuth avec GitHub (pas Google, pour changer) sans utiliser passport.js ou d'autre bibliothèque OAuth. Uniquement `fetch` pour les appels API et `crypto` pour le state.
Contrainte : valider le state au retour du callback, et gérer le cas où GitHub renvoie une erreur dans les query params.

---

## RÉSUMÉ

Sessions, JWT et OAuth ne sont pas interchangeables : chacun résout un problème précis. Sessions pour la révocation immédiate sur des apps web. JWT pour les APIs distribuées et les clients mobiles. OAuth pour déléguer l'authentification à un tiers. La règle qui s'applique aux trois : les secrets (SESSION_SECRET, JWT_SECRET, CLIENT_SECRET) ne sont jamais dans le code, toujours dans les variables d'environnement. Et les tokens sensibles ne vont jamais dans localStorage.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **OAUTH, sessions, JWT** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « OAUTH, sessions, JWT » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.
