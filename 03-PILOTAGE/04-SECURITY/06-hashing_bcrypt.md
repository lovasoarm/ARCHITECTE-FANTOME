---
perishability_id: PER-0042

stability: perissable
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, changement_contexte]
anti_recipe_key: decision_inversee+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Stocker un mot de passe : Argon2id, paramètres et compatibilité bcrypt ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# Stocker un mot de passe : Argon2id, paramètres et compatibilité bcrypt

Temps de lecture ~10 min

Ta DB se fait dump (extraire de force). L'attaquant a maintenant tous les comptes détenus. La seule chose qui protège tes détenus à ce moment-là, c'est la façon dont tu as stocké leurs mots de passe.

Si tu as stocké les mots de passe en clair : catastrophe totale. MD5, SHA-1 et SHA-256 sont des fonctions rapides : ne les utilise pas seules pour stocker des mots de passe. Le succès d’une attaque dépend du mot de passe, du sel, des données de fuite, du matériel et du coût ; ne donne pas de délai universel. Pour une nouvelle application, utilise Argon2id avec des paramètres adaptés à la machine cible. scrypt constitue une alternative lorsque Argon2id n'est pas disponible. bcrypt reste réservé aux systèmes hérités ou aux contraintes de compatibilité ; sa limite habituelle de 72 octets doit alors être prise en compte.

---

## 1) POURQUOI PAS MD5 / SHA256 ?

### Le problème des hashes rapides

MD5, SHA1, SHA256 sont des hashes cryptographiques conçus pour être rapides. Très rapides. Un matériel moderne peut calculer bien plus rapidement un hash généraliste rapide qu’une fonction de dérivation dédiée. Le débit exact dépend du matériel, du code et des paramètres : aucun chiffre générique ne doit être présenté comme une mesure universelle.

```text
Exemple de raisonnement, sans benchmark matériel :
- l’espace théorique dépend du jeu de caractères et de la longueur ;
- le débit d’essai dépend du matériel et de l’algorithme ;
- un dictionnaire ou une fuite de mots de passe peut réduire fortement le travail.
Ne transforme pas ce calcul théorique en estimation de temps sans mesurer le matériel et le scénario d’attaque.
```

Même si le mot de passe semble « complexe », les listes de mots de passe courants et les mots de passe déjà compromis peuvent réduire fortement le travail nécessaire. Ne donne aucun délai universel : le résultat dépend du mot de passe, du hash, des paramètres et du matériel.

### Le problème sans salt

Un salt (sel : valeur aléatoire ajoutée au mot de passe avant le hash) est essentiel. Sans salt, deux détenus avec le même mot de passe ont le même hash. Un attaquant avec une rainbow table (table précalculée de hash --> mot de passe) peut retrouver tous les mots de passe identiques en une seule lookup.

```js
// Sans salt : problème
const hash1 = crypto.createHash("sha256").update("password123").digest("hex");
const hash2 = crypto.createHash("sha256").update("password123").digest("hex");
hash1 === hash2; // true --> l'attaquant voit que deux users ont le même mot de passe

// Avec salt : chaque hash est unique même pour des mots de passe identiques
const salt1 = crypto.randomBytes(16).toString("hex");
const salt2 = crypto.randomBytes(16).toString("hex");
// salt1 !== salt2, donc les hashes sont différents même pour 'password123'
```

---

## 2) CHOISIR UNE FONCTION DE STOCKAGE DE MOT DE PASSE

### La règle de décision

- **Nouveau système : Argon2id** (choix recommandé par OWASP pour le stockage de mots de passe).
- **Alternative : scrypt** si Argon2id n'est pas disponible.
- **Système hérité : bcrypt** uniquement lorsqu'une contrainte de compatibilité l'impose. Respecte sa limite habituelle de 72 octets et ne le choisis pas par réflexe pour un nouveau service.
- **Environnement exigeant FIPS :** suis la politique de conformité applicable, par exemple PBKDF2 selon les recommandations OWASP en vigueur.

Un sel unique est généré et incorporé dans le format de hash par la bibliothèque. Ne le fabrique pas à la main et ne le réutilise pas.

### Implémentation de référence : Argon2id avec Node.js

Installe la dépendance maintenue `argon2` dans le projet qui réalise cet exercice (`npm install argon2`). L'exemple utilise `node-argon2` et son API `hash` / `verify`.

OWASP publie une configuration minimale de référence pour Argon2id (19 MiB de mémoire, 2 itérations, parallélisme 1). Elle constitue un plancher de départ, pas une garantie adaptée à toutes les machines : mesure la latence et la concurrence sur la cible avant publication.

```js
const argon2 = require("argon2");

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19 * 1024, // KiB : 19 MiB minimum de référence OWASP
  timeCost: 2,
  parallelism: 1,
};

// Hash fictif Argon2id valide, généré à l'avance avec la politique du service.
// Ne colle jamais une chaîne tronquée ou un hash fictif non valide ici.
const DUMMY_ARGON2_HASH = process.env.DUMMY_ARGON2_HASH;
if (!DUMMY_ARGON2_HASH) throw new Error("DUMMY_ARGON2_HASH manquant");

async function hashPassword(plainPassword) {
  // La bibliothèque génère un sel unique et l'intègre au hash encodé.
  return argon2.hash(plainPassword, ARGON2_OPTIONS);
}

async function verifyPassword(plainPassword, storedHash) {
  return argon2.verify(storedHash, plainPassword);
}

// Exemple de flux : l'identifiant est recherché avec une requête paramétrée.
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // La validation complète (type, politique de mot de passe et taille acceptée)
  // a lieu avant le hachage. Ne transforme pas un minimum de caractères en règle universelle.
  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof password !== "string" ||
    password.length < 12
  ) {
    return res
      .status(400)
      .json({ error: "Données d'inscription non conformes" });
  }

  const passwordHash = await hashPassword(password);
  await db.query(
    "INSERT INTO users (email, password_hash, hash_type) VALUES ($1, $2, $3)",
    [email, passwordHash, "argon2id"],
  );
  return res.status(201).json({ message: "Compte créé" });
});

app.post("/pack-check-in", async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Requête invalide" });
  }
  const result = await db.query(
    "SELECT id, password_hash FROM users WHERE email = $1",
    [email],
  );
  const user = result.rows[0];
  const hashToVerify = user ? user.password_hash : DUMMY_ARGON2_HASH;
  const valid = await argon2.verify(hashToVerify, password);

  if (!user || !valid) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }

  req.session.userId = user.id;
  return res.json({ message: "Connecté" });
});
```

La comparaison avec un hash fictif valide rapproche les chemins de connexion, sans garantir une durée identique. Ajoute limitation de débit, surveillance et tests ; ne présente jamais ce mécanisme comme une défense complète contre les attaques temporelles.

### Compatibilité héritée : bcrypt uniquement si nécessaire

```js
const bcrypt = require("bcrypt");

// Pour vérifier un compte existant qui possède déjà un hash bcrypt :
const validLegacyPassword = await bcrypt.compare(
  plainPassword,
  storedBcryptHash,
);
// Si la connexion réussit et que la politique prévoit une migration :
// re-hashe immédiatement avec Argon2id, puis remplace le hash et son type en base.
```

Pour une base bcrypt héritée, calibre le work factor sur la machine cible et respecte la limite habituelle de 72 octets. Ne copie pas un coût d'un tutoriel et n'utilise pas bcrypt comme nouveau choix par défaut.

---

## 3) CE QU'ON NE STOCKE JAMAIS

```text
Jamais en DB :
- mot de passe en clair
- MD5 / SHA1 / SHA256 du mot de passe (trop rapide)
- mot de passe chiffré (AES, etc.) : le chiffrement est réversible, le hash ne l'est pas

Jamais dans les logs :
- mot de passe, même "pour débugger"
- le hash du mot de passe (ça permet des attaques offline)

Jamais dans le code :
- salt fixe (le salt doit être différent pour chaque détenu)
- coût non mesuré ou en dessous du minimum recommandé par la politique de sécurité choisie
```

---

## 4) MIGRATION D'UNE DB AVEC DES MOTS DE PASSE MAL HASHÉS

Pour l'exercice Prison Break, l'ancien système est précisément `SHA256(password + "foxriver")` : il utilise un sel fixe et connu, donc il reste vulnérable aux essais hors ligne. La fonction ci-dessous reproduit exactement cet ancien format afin de vérifier un compte avant de le migrer. Elle n'est pas une recommandation de stockage. Le nouveau hash utilise Argon2id.

```js
const crypto = require("node:crypto");
const argon2 = require("argon2");

async function verifyAndUpgradeLegacyPassword(user, plainPassword) {
  if (user.hash_type !== "sha256_foxriver_fixed_salt") {
    throw new Error("Exemple limité au format SHA256(password + foxriver)");
  }
  if (
    typeof user.password_hash !== "string" ||
    !/^[0-9a-f]{64}$/i.test(user.password_hash)
  ) {
    return false; // format hexadécimal attendu : exactement 32 octets
  }

  // Reproduit l'ancien format connu. Le sel fixe et public n'est pas une protection suffisante.
  const candidate = crypto
    .createHash("sha256")
    .update(plainPassword + "foxriver", "utf8")
    .digest();
  const stored = Buffer.from(user.password_hash, "hex");
  const legacyValid = crypto.timingSafeEqual(candidate, stored);

  if (!legacyValid) return false;

  const upgradedHash = await argon2.hash(plainPassword, {
    type: argon2.argon2id,
    memoryCost: 19 * 1024,
    timeCost: 2,
    parallelism: 1,
  });
  await db.query(
    "UPDATE users SET password_hash = $1, hash_type = $2 WHERE id = $3",
    [upgradedHash, "argon2id", user.id],
  );
  return true;
}
```

Ce schéma ne couvre que le format hexadécimal `SHA256(password + "foxriver")` décrit dans l'exercice. Pour tout format historique différent (ordre de concaténation, encodage, pepper, autre sel), identifie précisément l'ancien format avant de coder la migration. Ne supprime pas l'ancien chemin tant qu'il reste des comptes non migrés ; prévois aussi un parcours de réinitialisation si un compte ne peut plus être vérifié.

---

## EXERCICES

**EXO 1 : Le registre des prisonniers**
L'API Prison Break stocke actuellement les mots de passe en `SHA256(password + 'foxriver')` (sel fixe et connu, méthode vulnérable). Propose une migration progressive qui reproduit exactement cet ancien format lors de la vérification ; après authentification réussie, remplace-le par Argon2id. Les nouveaux comptes utilisent Argon2id. Garde bcrypt uniquement pour illustrer une compatibilité héritée.
Contrainte : aucune interruption de service, aucun détenu forcé à changer son mot de passe.

**EXO 2 : La calibration d'Argon2id**
Écris un benchmark qui mesure plusieurs couples mémoire/itérations sur la machine cible et explique le choix retenu au regard de la latence, de la mémoire disponible et du risque d'abus. Pars au minimum des recommandations OWASP actuelles ; ne présente pas une durée d'exécution universelle.
Contrainte : afficher les résultats dans un tableau ASCII clair avec les colonnes `mémoire (MiB) | itérations | parallélisme | temps (ms) | décision`.

**EXO 3 : Le vote sécurisé du Ballon d'Or**
Le système de vote du Ballon d'Or CLI a un endpoint de login. Réduis l’énumération de comptes : même message d’erreur pour un compte absent et un mauvais mot de passe ; comparaison fictive avec un hash valide pour rapprocher les chemins ; limitation de débit et journalisation de sécurité. Explique pourquoi cela ne garantit pas un temps strictement identique.
Contrainte : utiliser le dummy compare pour les emails inexistants, tester avec `performance.now()` que les deux cas prennent le même ordre de grandeur de temps.

---

## RÉSUMÉ

MD5 et SHA-256 seuls sont trop rapides pour protéger les mots de passe. Pour une nouvelle application, choisis Argon2id avec un sel unique et des paramètres adaptés à la machine ; scrypt est une alternative. bcrypt est réservé à la compatibilité avec des systèmes hérités et sa limite d'entrée habituelle de 72 octets doit être prise en compte. La bibliothèque génère et incorpore le sel. On ne stocke que le hash, jamais le mot de passe. Renvoie le même message d'erreur ; une comparaison fictive avec un hash valide rapproche les chemins sans garantir une durée strictement identique.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Stocker un mot de passe : Argon2id, paramètres et compatibilité bcrypt** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « Stocker un mot de passe : Argon2id, paramètres et compatibilité bcrypt » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.

## Référence de sécurité

Consulte la [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) : Argon2id est recommandé pour les nouveaux systèmes ; scrypt est une alternative si Argon2id n’est pas disponible ; bcrypt reste une option pour les systèmes hérités et sa limite habituelle de 72 octets doit être prise en compte. Référence consultée le 3 novembre 2026.
