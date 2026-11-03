---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [panne_reseau, statut_http]
anti_recipe_key: panne_reseau+statut_http
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Pratique Fetch native : lire une petite API locale

**Étape canonique :** Web Basics, après la leçon [Fetch](03-fetch_adventure.md).

**Prérequis :** Node.js installé, navigateur moderne et notion de fonction. La fixture AF utilise seulement les modules natifs de Node : aucun compte ni accès Internet n'est nécessaire.

## 1. Démarrer la fixture locale

Depuis la racine du dépôt, lance :

```bash
node 00-SOCLE/04-FUNDAMENTALS/05_web_basics/fixtures/fetch-local-server.mjs
```

Garde le terminal ouvert et ouvre `http://127.0.0.1:4173/`. Cette fixture ne stocke aucune donnée durable et n'écoute que sur ta machine.

## 2. Lire les utilisateurs

Dans la console développeur du navigateur, exécute :

```js
async function chargerUtilisateurs() {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const users = await response.json();
    console.log("Nombre d'utilisateurs :", users.length);
    users.forEach((user) => console.log(user.name, "—", user.city));
  } catch (error) {
    console.log("Chargement impossible :", error.message);
  }
}

chargerUtilisateurs();
```

Les trois utilisateurs sont entièrement fictifs. La fixture est un support d'apprentissage, pas un service réel.

## 3. Observer deux formes d'échec

- Remplace l'URL par `/api/missing`. Observe le statut `404` et explique pourquoi `fetch` ne passe pas automatiquement dans `catch` pour ce statut.
- Arrête le serveur avec `Ctrl+C`, puis relance la fonction. Observe l'erreur de connexion, qui est différente d'une réponse HTTP `404`.
- Redémarre le serveur avant de continuer.

## Critères de réussite

- [ ] Tu récupères et affiches les trois utilisateurs.
- [ ] Tu vérifies `response.ok` avant de décoder la réponse.
- [ ] Tu distingues une réponse HTTP non-2xx d'une panne de connexion.
- [ ] Tu peux expliquer que le `POST` de la fixture, s'il est essayé, renvoie une réponse simulée non persistée.

## Limites

La fixture tourne localement et ne teste ni CORS entre domaines, ni authentification, ni performance, ni persistance métier. Ne présente pas ses données fictives comme des observations terrain.

## Preuve à conserver

Consigne les deux erreurs provoquées, le statut observé et la différence de traitement.
