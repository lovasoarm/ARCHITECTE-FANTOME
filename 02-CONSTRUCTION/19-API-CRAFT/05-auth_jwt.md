---
perishability_id: PER-0039

stability: perissable
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, decision_inversee]
anti_recipe_key: regression+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://www.rfc-editor.org/rfc/rfc8725.html
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « JWT de bout en bout ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : Prison Break :** une API est un pacte avec les autres équipes. Une modification « minuscule » peut fermer une porte qu’un autre service traverse tous les jours.

> **CrazyDevs : Konoha sous siège :** chaque frontière doit avoir un propriétaire, une règle de passage et une raison d’exister. Sinon tu as juste construit des murs dans le village.

# JWT de bout en bout

<!-- AF-DIAGRAM:jwt -->

```text
Login ─► Issue token ─► Request + token ─► Verify ─► Allow / Reject
                                      │
                                      └────► Expired / Invalid
```

Le token traverse un cycle de création, transport, validation et expiration.

Temps de lecture ~10 min

JWT c'est pas de l'auth. JWT c'est un format de token.
L'auth, c'est le mécanisme autour : connexion, sign, vérification, refresh, révocation.
Ce fichier couvre tout le cycle. Pas juste le happy path, aussi ce qui foire.

---

## 1) CE QUE JWT EST VRAIMENT

JWT (JSON Web Token) = trois parties encodées en base64, séparées par des points.

```text
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwibmluamph.aXpfaWQiOiJuYXJ1dG8ifQ.abc123xyz
   ^             ^                   ^
 HEADER           PAYLOAD               SIGNATURE
```

**Header** : algorithme utilisé (`HS256` = HMAC-SHA256)
**Payload** : les données (claims) : `sub`, `iat`, `exp`, et tout ce qu'on ajoute
**Signature** : calculée selon l’algorithme indiqué dans le header et la configuration du serveur. HS256 (HMAC-SHA-256) est un exemple symétrique ; les JWT peuvent aussi utiliser une signature asymétrique. Le serveur doit imposer une liste d’algorithmes autorisés, pas faire confiance au header reçu.

```js
// ce que contient un payload décodé
{
 sub: "7",          // subject : l'id de l'utilisateur
 ninja_id: "naruto-konoha",
 role: "hokage",
 iat: 1710000000,      // issued at : timestamp de création
 exp: 1710003600       // expiration : iat + 1h
}
```

JWT n'est PAS chiffré : le payload est lisible par n'importe qui.
JWT est SIGNÉ : le payload ne peut pas être modifié sans invalider la signature.
Ne jamais mettre de données sensibles dans le payload (mot de passe, numéro de carte).

```text
COMMENT LE SERVEUR SIGNE ET VÉRIFIE

SIGN (à la création du token) :
header_b64 + "." + payload_b64
  |
  v
HMAC-SHA256(header_b64 + "." + payload_b64, SECRET_KEY)  // exemple HS256 uniquement
  |
  v
signature_b64
  |
  v
token = header_b64 + "." + payload_b64 + "." + signature_b64

VERIFY (à chaque requête protégée) :
token reçu --> split sur "."
  |
  v
recalcule HMAC-SHA256(header + "." + payload, SECRET_KEY)
  |
  v
compare avec la signature reçue
  |
  +---> match  --> token valide, check exp --> lire le payload
  +---> no match --> token falsifié, rejeter (401)
  +---> exp < now --> token expiré, rejeter (401) --> client doit refresh
```

---

## 2) LE CYCLE COMPLET : CHAKRA_GATE → ACCESS → REFRESH

```text
CLIENT                  SERVER
 |                     |
 | POST /clan/entree { ninja_id, sceau_secret }  |
 |----------------------------------------> |
 |                     | vérifie email + Argon2id(password)
 | { accessToken, refreshToken }      | génère les deux tokens
 |<---------------------------------------- |
 |                     |
 | GET /ninjas (Authorization: Bearer accessToken)
 |----------------------------------------> |
 |                     | vérifie signature + expiration
 | { ninjas: [...] }           |
 |<---------------------------------------- |
 |                     |
 | POST /clan/renouveler-sceau { refreshToken } | accessToken expiré
 |----------------------------------------> |
 |                     | vérifie refreshToken
 | { accessToken (nouveau) }        | génère un nouveau accessToken
 |<---------------------------------------- |
```

---

## 3) IMPLÉMENTATION COMPLÈTE

> **Politique de cet exemple :** nouveau service = Argon2id pour les mots de passe (`npm install argon2`). bcrypt n’est montré que dans le module de sécurité pour la compatibilité avec un système hérité. Le hash fictif de configuration doit être réellement généré avec la même politique ; le placeholder du tableau ci-dessous n’est pas une valeur utilisable.

```js
// auth/auth.service.js
import jwt from "jsonwebtoken";
import argon2 from "argon2";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET; // secret aléatoire et distinct
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET; // secret aléatoire et distinct
const JWT_ISSUER = process.env.JWT_ISSUER;
const ACCESS_AUDIENCE = process.env.ACCESS_TOKEN_AUDIENCE;
const REFRESH_AUDIENCE = process.env.REFRESH_TOKEN_AUDIENCE;
const DUMMY_ARGON2_HASH = process.env.DUMMY_ARGON2_HASH; // hash Argon2id valide, produit avec la politique du service

if (
  !ACCESS_SECRET ||
  !REFRESH_SECRET ||
  ACCESS_SECRET === REFRESH_SECRET ||
  !JWT_ISSUER ||
  !ACCESS_AUDIENCE ||
  !REFRESH_AUDIENCE ||
  !DUMMY_ARGON2_HASH
) {
  throw new Error("Configuration JWT et DUMMY_ARGON2_HASH obligatoires");
}

// génère un access token : durée courte (15min à 1h)
export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: JWT_ISSUER,
    audience: ACCESS_AUDIENCE,
  });
}

// génère un refresh token : durée longue (7 à 30 jours)
export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: JWT_ISSUER,
    audience: REFRESH_AUDIENCE,
  });
}

// vérifie et décode un access token
// jwt.verify throw si : signature invalide, token expiré, token malformé
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET, {
    algorithms: ["HS256"],
    issuer: JWT_ISSUER,
    audience: ACCESS_AUDIENCE,
  }); // liste et claims autorisés explicites
}

// vérifie et décode un refresh token
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET, {
    algorithms: ["HS256"],
    issuer: JWT_ISSUER,
    audience: REFRESH_AUDIENCE,
  });
}
```

```js
// auth/auth.router.js
import { Router } from "express";
import argon2 from "argon2";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getRoleForUser } from "../users/user.repository.js"; // exemple : lecture des droits depuis la base

const router = Router();

// simuler une base d'utilisateurs (en prod : table users en DB)
const ninjas = [
  {
    id: 7,
    ninja_id: "naruto-konoha",
    // Hash Argon2id valide produit à l'inscription ; ne stocke jamais le sceau en clair.
    passwordHash: "<hash Argon2id valide généré à l'inscription>",
  },
];

// POST /clan/entree
router.post(
  "/entree",
  asyncHandler(async (req, res) => {
    const { ninja_id, sceau_secret } = req.body;
    if (typeof ninja_id !== "string" || typeof sceau_secret !== "string") {
      return res.status(400).json({ error: "Requête invalide" });
    }

    const user = ninjas.find((u) => u.ninja_id === ninja_id);

    // Toujours vérifier avec Argon2id, jamais comparer les chaînes de hash directement.
    // Le hash fictif valide rapproche les chemins si le compte n'existe pas,
    // sans garantir une durée strictement identique.
    const valid = await argon2.verify(
      user ? user.passwordHash : DUMMY_ARGON2_HASH,
      sceau_secret,
    );

    if (!user || !valid) {
      // 401 et pas 404 : ne révèle pas si le compte existe
      return res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "ninja_id ou sceau_secret incorrect",
        },
      });
    }

    const payload = { sub: String(user.id), ninja_id: user.ninja_id };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // refresh token en cookie httpOnly : JavaScript ne peut pas lire sa valeur.
    // Cela limite son exfiltration, mais ne neutralise pas une XSS active :
    // le script injecté pourrait encore déclencher des requêtes authentifiées.
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // inaccessible via document.cookie
      secure: true, // HTTPS uniquement
      sameSite: "strict", // à adapter au flux ; ne remplace pas une défense CSRF complète
      path: "/clan",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en ms
    });

    // access token dans le body : le client le stocke en mémoire (pas localStorage)
    res.json({ accessToken });
  }),
);

// POST /clan/renouveler-sceau
router.post(
  "/renouveler-sceau",
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: { code: "NO_REFRESH_TOKEN" } });
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      // Ce mini-exemple n’implémente PAS la rotation ni la révocation des refresh tokens.
      // En production, conserve une session/token-family côté serveur, vérifie son état,
      // fais tourner le refresh token à chaque usage et détecte la réutilisation d’un ancien token.
      const newAccessToken = signAccessToken({
        sub: payload.sub,
        ninja_id: payload.ninja_id,
      });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      // refresh token expiré ou invalide : l'user doit se reconnecter
      res.status(401).json({ error: { code: "INVALID_REFRESH_TOKEN" } });
    }
  }),
);

// POST /clan/sortie
router.post("/sortie", (req, res) => {
  // Le vrai logout révoque aussi la famille de refresh tokens côté serveur.
  // Effacer le cookie seul n’invalide pas un JWT déjà copié.
  res.clearCookie("refreshToken", {
    path: "/clan",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(204).send();
});

export default router;
```

```js
// middleware/authenticate.js
import { verifyAccessToken } from "../auth/auth.service.js";

// middleware d'authentification : à monter sur les routes protégées
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // format attendu : "Bearer <token>"
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        code: "MISSING_TOKEN",
        message: "Authorization: Bearer <token> requis",
      },
    });
  }

  const token = authHeader.split(" ")[1]; // extrait le token après "Bearer "

  try {
    const payload = verifyAccessToken(token);
    req.ninja = payload; // attache le payload au req pour les handlers suivants
    next();
  } catch (err) {
    // TokenExpiredError : le token est valide mais expiré
    // JsonWebTokenError : le token est malformé ou la signature ne match pas
    const code =
      err.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN";
    res.status(401).json({ error: { code } });
  }
}
```

Usage sur les routes protégées :

```js
import { authenticate } from "./middleware/authenticate.js";

// toutes les routes /players nécessitent un token valide
app.use("/ninjas", authenticate, ninjasRouter);

// ou sur une route spécifique
router.delete("/:id", authenticate, async (req, res) => {
  // req.ninja est disponible ici : { sub: '7', ninja_id: '...' }
  // Le rôle n’est pas inclus dans le payload minimal ci-dessus.
  // Vérifie les permissions depuis la source d’autorité côté serveur, à chaque action.
  const role = await getRoleForUser(req.ninja.sub); // fonction illustrative fournie par le dépôt
  if (role !== "hokage") {
    return res.status(403).json({ error: { code: "FORBIDDEN" } });
  }
  // ...
});
```

---

## 4) CE QUI CASSE

**Secrets hardcodés dans le code**

```js
// DANGEREUX : poussé sur GitHub, tout le monde peut signer des tokens
const secret = "supersecret123";
// CORRECT : variable d'environnement, jamais dans le code
const secret = process.env.ACCESS_TOKEN_SECRET;
```

**Même secret pour access et refresh tokens**
Si le secret leak, les deux types de tokens sont compromis.
Secrets différents = révocation indépendante.

**Access token stocké dans localStorage**
localStorage est accessible via XSS. Un script injecté vole le token.
En mémoire (variable JS) ou cookie httpOnly : les deux options valides.

**Ne pas vérifier l'expiration**
`jwt.decode()` décode sans vérifier la signature ni l'expiration.
`jwt.verify()` fait tout. Toujours `verify()`, jamais `decode()` sur du code de prod.

**Refresh token sans révocation**
Un access JWT déjà émis reste généralement valide jusqu’à son expiration, sauf contrôle supplémentaire côté serveur. Pour les refresh tokens, conserve une session ou une famille de tokens en base, fais une rotation à chaque utilisation et révoque la famille en cas de réutilisation suspecte. Une simple blacklist n’est pas le seul modèle possible.

---

## EXERCICES

**EXO 1 : Rotation d'identités à Fox River**

Michael Scofield a 47 minutes pour faire passer 6 identités falsifiées à travers
un checkpoint qui invalide tout token vu deux fois en moins de 30 s.
Conçois la stratégie de rotation qui garantit que chaque identité passe une fois
exactement, sans jamais réutiliser un secret dans la fenêtre d'invalidation.

**Livrable : `STRATEGIE.md`** justifiant le choix de rotation :
JWT court + refresh, PASETO, tokens à usage unique, ou hybride. Pas
d'implémentation demandée avant que la stratégie tienne à l'écrit sous 3
objections d'un pair.

Contraintes à trancher explicitement : granularité du secret (par identité vs
partagé), fenêtre d'invalidation côté serveur (mémoire vs Redis), et gestion
de la perte réseau au milieu du checkpoint.

**EXO 2 : L'armure de Léo (Garo)**
Les chevaliers d'or ont un accès limité à 99.9 secondes.
Implémente un access token avec expiration à 99 secondes.
Si le token est expiré : l'API renvoie `{ code: "ARMOR_COLLAPSED" }`.
Implémente le refresh qui génère un nouveau token : "l'armure se reconstruit".

**EXO 3 : L'audit de sécurité**
Voici un exemple volontairement vulnérable à auditer. Trouve **au moins cinq problèmes** et classe-les par gravité :

```js
const secret = "naruto123";
router.post("/portal-hidden-village", (req, res) => {
  const user = users.find((u) => u.password === req.body.password);
  if (!user) return res.status(404).json({ error: "not found" });
  const token = jwt.sign({ userId: user.id }, secret); // aucun algorithme, issuer ou audience imposé
  res.json({ token }); // le navigateur recevra le token
});

// Côté navigateur : ce stockage est lui aussi à critiquer.
localStorage.setItem("token", token);

router.get("/protected", (req, res) => {
  const payload = jwt.decode(req.headers.token); // décode sans vérifier la signature ni l’expiration
  res.json(payload);
});
```

---

## 5) CE QUE CE FICHIER NE COUVRE PAS (volontairement)

Le flow JWT ci-dessus marche : connexion, access, refresh, middleware. Ça ne veut pas dire que ton API est prête pour la prod. Trois angles morts sont couverts ailleurs dans le curriculum, et tu dois les traiter avant de considérer l'auth comme finie.

- **CSRF (Cross-Site Request Forgery)** : ton cookie httpOnly est envoyé automatiquement par le navigateur, y compris depuis un site attaquant. Sans protection dédiée, un formulaire malveillant peut déclencher des actions au nom de l'acteur connecté. --> `03-PILOTAGE/04-SECURITY/03-csrf_cors.md`
- **Vol de session / token hijacking** : un access token en mémoire reste volable via XSS avancé, un refresh token peut fuiter via un backup ou un log mal filtré. Détection, rotation forcée, révocation immédiate --> `03-PILOTAGE/04-SECURITY/05-auth_flows.md`
- **Rotation des secrets (`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`)** : un secret ne se renouvelle pas tout seul. Sans plan de rotation, un leak d'aujourd'hui compromet les tokens émis dans 6 mois. --> `03-PILOTAGE/04-SECURITY/05-auth_flows.md` + procédures de secrets management.

Un JWT qui marche n'est pas une API sécurisée. Le "reste" est le sujet des trois pointeurs ci-dessus.

---

## RÉSUMÉ

JWT = header + payload + signature. Signé, pas chiffré. Ne jamais mettre de données sensibles dedans.
Access token : durée courte, choix de stockage adapté au modèle de menace.
Refresh token : durée plus longue, avec rotation et révocation côté serveur.
`jwt.verify()` vérifie la signature et les claims temporels ; impose explicitement l’algorithme autorisé, l’émetteur (`iss`) et l’audience (`aud`) quand ils sont utilisés. `jwt.decode()` ne vérifie rien.
Secrets dans les variables d'environnement, jamais hardcodés.
Secrets différents pour access et refresh tokens.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-LESSON-PROFILE: api -->

## Repères de décision

- **Pourquoi :** Une API stable permet à plusieurs clients d'utiliser un système sans connaître son implémentation interne. Les erreurs et les droits font partie du contrat.
- **Quand l’utiliser / quand l’éviter :** Expose une API quand un autre composant a besoin d'une capacité. Documente version, validation, erreurs, autorisation et idempotence pour les opérations d'écriture.
- **Limites :** Un schéma valide ne garantit pas que l'utilisateur est autorisé. Une réponse HTTP 200 ne signifie pas toujours que le traitement métier est terminé ; le retry doit respecter le contrat.

## Mécanisme : la version sans magie

Définis requête, réponse, erreurs et effets ; valide côté serveur ; authentifie et autorise par ressource ; rends les écritures idempotentes quand le client peut réessayer.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **JWT de bout en bout** se rattache à ce cas concret : Les clients web/mobile et la console agent Kintana peuvent évoluer à des rythmes différents et subir des délais réseau.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'API robuste pour les demandes

> **Arc One Piece / Grand Line :** l'API est le contrat entre navires. Si tu changes le format sans prévenir, tout le monde perd sa cargaison.

**Mission liée à « JWT de bout en bout » :** Expose ou révise l'opération Kintana concernée. Définis payload, codes d'erreur, règles d'accès par ressource, versionnement et clé d'idempotence si elle écrit. Ajoute les tests de client ancien et d'acteur non autorisé.

**Livrable :** spécification API, implémentation ou contrat, tests positifs/négatifs et exemple d'évolution compatible.

**Critères d’acceptation :** les entrées sont validées côté serveur ; les droits sont vérifiés pour chaque ressource ; le retry ne crée pas de double effet ; les erreurs sont stables et sans fuite d'information.

**Transfert obligatoire :** Le client mobile reste sur l'ancienne version pendant un déploiement serveur. Démontre la compatibilité et le plan de retrait.

## Référence de sécurité JWT

Le [RFC 8725 : JSON Web Token Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725.html) recommande notamment de contrôler explicitement les algorithmes acceptés et les claims pertinents. Le code ci-dessus reste un exemple pédagogique : `DUMMY_ARGON2_HASH` doit être un hash Argon2id valide généré à l’avance avec les paramètres retenus, `getRoleForUser` doit être implémentée, et les contrôles CSRF, rotation/révocation, `iss`/`aud` et la gestion de session doivent être terminés avant toute utilisation en production. Vérification documentaire : 2 novembre 2026.
