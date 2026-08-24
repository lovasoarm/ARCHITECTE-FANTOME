## perishability_id: PER-0054

stability: perissable
last_reviewed: 2026-07
depends_on_vendor: false
acte: pratiquer
cognitive_level: L4
perturbation_modes: [preuve_partielle, decision_organisationnelle]
anti_recipe_key: preuve_partielle+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# 09 : Instrumenter TON projet (OpenTelemetry local, zéro compte externe)

Temps de lecture ~2 min

Temps ~4 h (une fois) + 30 min par projet supplémentaire

## POURQUOI

Tant que tu n'as pas vu ton propre code se plaindre dans un dashboard, l'observabilité
reste une leçon. Ce fichier impose le geste concret sur trois mini-projets déjà livrés.

## STACK IMPOSÉ (léger, local, durable)

- **OpenTelemetry SDK JS** : instrumentation applicative
- **OTLP Collector** : reçoit les données
- **Jaeger** : traces distribuées
- **Prometheus + Grafana** : métriques et dashboards

Tout tourne en `docker-compose` local. Aucun compte SaaS. Aucun secret externe.

## PROJETS OBLIGATOIRES À INSTRUMENTER

1. `02-CONSTRUCTION/02-MINI-PROJECTS/01_rasengan_engine`
2. `02-CONSTRUCTION/02-MINI-PROJECTS/11_scheduler`
3. `02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena`

## LIVRABLE PAR PROJET : `03-OBSERVABILITY.md`

<!-- AF-DIAGRAM:observability -->

```text
text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

- **3 traces réelles** capturées (screenshots ou export JSON Jaeger).
- **1 alerte déclenchée volontairement** (règle Prometheus + capture Grafana).
- **1 dashboard exporté** (JSON Grafana commité dans `observability/dashboard.json`).

## SETUP MINIMAL (`observability/docker-compose.yml`)

```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector:0.100.0
    command: ["--config=/etc/otel-collector.yaml"]
    volumes: ["./otel-collector.yaml:/etc/otel-collector.yaml"]
    ports: ["4317:4317", "4318:4318"]
  jaeger:
    image: jaegertracing/all-in-one:1.56
    ports: ["16686:16686"]
  prometheus:
    image: prom/prometheus:v2.52.0
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]
    ports: ["9090:9090"]
  grafana:
    image: grafana/grafana:11.0.0
    ports: ["3000:3000"]
```

## INSTRUMENTATION JS (extrait)

```js
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  }),
});
sdk.start();
```

## DRILL

`node learner-verifier.js` (auto-verif ecrite par toi) vérifie qu'un
endpoint OTLP répond pendant la démo apprenant.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
