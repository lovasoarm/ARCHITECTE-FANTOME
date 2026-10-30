const baseUrl = process.env.LOAD_TEST_URL || "http://127.0.0.1:8080";
const token = process.env.API_TOKEN;
const requests = boundedInt(process.env.LOAD_REQUESTS, 100, 1, 10_000);
const concurrency = boundedInt(process.env.LOAD_CONCURRENCY, 10, 1, 250);
if (!token || token.length < 32) {
  console.error("API_TOKEN requis (secret de test d’au moins 32 caractères) ; ciblez uniquement un service de test autorisé.");
  process.exit(2);
}
const latencies = [];
const statuses = new Map();
let cursor = 0;
let failed = false;
async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= requests) return;
    const started = performance.now();
    try {
      const response = await fetch(`${baseUrl}/v1/query`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ question: index % 2 ? "Quel est le SLO du service ?" : "Comment suivre le coût IA ?" }),
      });
      statuses.set(response.status, (statuses.get(response.status) || 0) + 1);
      await response.arrayBuffer();
      if (!response.ok) failed = true;
    } catch {
      statuses.set("network-error", (statuses.get("network-error") || 0) + 1);
      failed = true;
    } finally {
      latencies.push(performance.now() - started);
    }
  }
}
const started = new Date().toISOString();
await Promise.all(Array.from({ length: Math.min(concurrency, requests) }, () => worker()));
latencies.sort((a, b) => a - b);
const percentile = (p) => Number((latencies[Math.max(0, Math.ceil(p * latencies.length) - 1)] || 0).toFixed(2));
const report = {
  target: baseUrl,
  startedAt: started,
  runtime: process.version,
  requests,
  concurrency: Math.min(concurrency, requests),
  statusCounts: Object.fromEntries(statuses),
  latencyMs: { p50: percentile(0.5), p95: percentile(0.95), max: Number((latencies.at(-1) || 0).toFixed(2)) },
  result: failed ? "FAIL" : "PASS",
  limitations: "Micro-test borné sur un corpus local ; ne prouve ni capacité de production, ni saturation réseau/LLM, ni résilience multi-instance. Fixer une cible, une durée, des données et des seuils avant tout benchmark de décision.",
};
console.log(JSON.stringify(report, null, 2));
if (failed || statuses.get(200) !== requests) process.exit(1);

function boundedInt(value, fallback, min, max) {
  if (value == null || value === "") return fallback;
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : fallback;
}
