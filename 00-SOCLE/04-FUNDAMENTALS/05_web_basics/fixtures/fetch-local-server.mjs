// Serveur de fixture local pour la leçon Fetch AF.
// Aucun package tiers, aucune écriture sur disque, aucune exposition réseau.
import { createServer } from "node:http";

const HOST = "127.0.0.1";
const PORT = 4173;
const MAX_BODY_BYTES = 16 * 1024;

const users = [
  { id: 1, name: "Ana", city: "Antananarivo" },
  { id: 2, name: "Bako", city: "Toamasina" },
  { id: 3, name: "Miora", city: "Fianarantsoa" },
];

const page = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AF  : terrain local Fetch</title>
</head>
<body>
  <main>
    <h1>Terrain local Fetch</h1>
    <p>Cette page et son API sont servies par ton ordinateur. Aucun accès Internet n'est requis.</p>
    <ul>
      <li><code>GET /api/users</code>  : trois utilisateurs fictifs</li>
      <li><code>POST /api/posts</code>  : réponse de création simulée, non persistée</li>
      <li><code>GET /api/missing</code>  : réponse HTTP 404</li>
    </ul>
    <p>Ouvre les outils développeur puis Console pour essayer <code>fetch("/api/users")</code>.</p>
    <p>La fixture ne contient aucune donnée personnelle et ne doit pas être utilisée comme service réel.</p>
  </main>
</body>
</html>`;

function sendJson(response, status, data) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(JSON.stringify(data));
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${HOST}:${PORT}`);

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    response.end(page);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/users") {
    sendJson(response, 200, users);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/missing") {
    sendJson(response, 404, {
      error: "Ressource de démonstration introuvable",
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/posts") {
    const chunks = [];
    let bodyBytes = 0;
    let tooLarge = false;

    request.on("data", (chunk) => {
      bodyBytes += chunk.length;
      if (bodyBytes > MAX_BODY_BYTES) {
        tooLarge = true;
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      if (tooLarge) {
        sendJson(response, 413, {
          error: "Corps trop volumineux pour la fixture",
        });
        return;
      }
      const contentType = String(request.headers["content-type"] ?? "");
      if (!contentType.toLowerCase().includes("application/json")) {
        sendJson(response, 415, {
          error: "Content-Type application/json requis",
        });
        return;
      }
      try {
        const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        if (
          payload === null ||
          typeof payload !== "object" ||
          Array.isArray(payload)
        ) {
          sendJson(response, 400, { error: "Un objet JSON est attendu" });
          return;
        }
        // Réponse volontairement simulée : rien n'est conservé entre les requêtes.
        sendJson(response, 201, {
          ...payload,
          id: "demo-101",
          persisted: false,
          note: "Réponse de démonstration uniquement ; aucune sauvegarde durable.",
        });
      } catch {
        sendJson(response, 400, { error: "JSON invalide" });
      }
    });
    return;
  }

  sendJson(response, 404, { error: "Route inconnue" });
});

server.listen(PORT, HOST, () => {
  console.log(`Fixture Fetch disponible sur http://${HOST}:${PORT}/`);
  console.log(
    "Arrêt : Ctrl+C. Le serveur reste limité à cette machine (loopback).",
  );
});
