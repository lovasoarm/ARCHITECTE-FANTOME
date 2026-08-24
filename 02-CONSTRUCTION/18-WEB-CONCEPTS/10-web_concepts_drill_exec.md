---
stability: evolutif
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Web concepts : Drill exécutable

Temps de lecture ~2 min

> Ce module reste conceptuel. Sans drill, tu retiens des mots ; tu ne sais pas les recréer. Ce drill te force à recréer un mécanisme du module en code exécutable.

## Objectif

Écris un script Node qui **simule** une politique de cache HTTP côté client :

1. Fait une première requête `GET` (via `fetch`) vers une URL publique et lit les headers `Cache-Control`, `ETag`, `Last-Modified`.
2. **Stocke** localement (en mémoire ou fichier JSON) la réponse + les headers de validation.
3. Refait la même requête en envoyant `If-None-Match` et/ou `If-Modified-Since`. Vérifie que le serveur répond `304 Not Modified` (ou détecte la revalidation).
4. **Mesure** octets économisés entre appel 1 et appel 2.

## Contraintes

- Node 22.23.2, zéro dépendance externe (utilise `fetch` global et `node:fs`).
- Sortie JSON stdout :

  ```json
  {
    "first_status": 200,
    "second_status": 304,
    "bytes_first": 12873,
    "bytes_second": 0,
    "revalidation_ok": true
  }
  ```

- Exit code `0` si `revalidation_ok === true`.

## Squelette

```js
// drill_web_cache.js
const URL_CIBLE = "https://httpbin.org/cache";

async function get(headers = {}) {
  const res = await fetch(URL_CIBLE, { headers });
  const buf = await res.arrayBuffer();
  return {
    status: res.status,
    etag: res.headers.get("etag"),
    lastMod: res.headers.get("last-modified"),
    bytes: buf.byteLength,
  };
}

const first = await get();
const second = await get({
  ...(first.etag ? { "If-None-Match": first.etag } : {}),
  ...(first.lastMod ? { "If-Modified-Since": first.lastMod } : {}),
});

const revalidation_ok = second.status === 304 || second.bytes < first.bytes;

console.log(
  JSON.stringify(
    {
      first_status: first.status,
      second_status: second.status,
      bytes_first: first.bytes,
      bytes_second: second.bytes,
      revalidation_ok,
    },
    null,
    2,
  ),
);
process.exit(revalidation_ok ? 0 : 1);
```

## Critère de passage

Le script sort le JSON, exit code `0`. Si l'URL cible n'expose pas de validation, choisis-en une autre (CDN d'assets publics) : comprendre pourquoi tel serveur ne renvoie pas 304 fait partie du drill.

## Limite de l'exercice

Simuler côté client ne reproduit ni le comportement des proxies (Vary, cache-partitioning), ni l'invalidation multi-tenant, ni le stale-while-revalidate SW-side. Ce drill prouve seulement que tu manipules **conditional GET**.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
