-- PostgreSQL 15+; run in a disposable database and review the tenant policy first.
BEGIN;

CREATE SCHEMA IF NOT EXISTS telemetry;

CREATE TABLE IF NOT EXISTS telemetry.station (
    tenant_id      text NOT NULL,
    station_id     text NOT NULL,
    display_name   text NOT NULL,
    PRIMARY KEY (tenant_id, station_id)
);

CREATE TABLE IF NOT EXISTS telemetry.fact_measurement (
    tenant_id      text NOT NULL,
    event_id       text NOT NULL,
    station_id     text NOT NULL,
    occurred_at    timestamptz NOT NULL,
    metric         text NOT NULL CHECK (metric IN ('temperature_c', 'pressure_kpa', 'vibration_mm_s')),
    value          numeric NOT NULL CHECK (value NOT IN ('NaN'::numeric, 'Infinity'::numeric, '-Infinity'::numeric)),
    ingested_at    timestamptz NOT NULL DEFAULT now(),
    contract_version text NOT NULL DEFAULT '1.0.0',
    PRIMARY KEY (tenant_id, event_id),
    FOREIGN KEY (tenant_id, station_id)
      REFERENCES telemetry.station (tenant_id, station_id)
);

-- Donnée de référence requise par la clé étrangère de fact_measurement.
INSERT INTO telemetry.station (tenant_id, station_id, display_name)
VALUES ('tenant-demo', 'ST-01', 'Station pédagogique')
ON CONFLICT (tenant_id, station_id) DO NOTHING;

CREATE INDEX IF NOT EXISTS fact_measurement_station_time_idx
    ON telemetry.fact_measurement (tenant_id, station_id, occurred_at DESC);

-- Rejouer le même événement ne doit pas créer une seconde ligne.
-- En production, comparer aussi le payload existant : un conflit d'ID avec contenu
-- différent doit être mis en quarantaine et investigué, pas ignoré silencieusement.
INSERT INTO telemetry.fact_measurement
    (tenant_id, event_id, station_id, occurred_at, metric, value, contract_version)
VALUES
    ('tenant-demo', 'EVT-001', 'ST-01', '2026-10-30T08:00:00+03:00', 'temperature_c', 21.4, '1.0.0')
ON CONFLICT (tenant_id, event_id) DO NOTHING;

-- Vérifications attendues avant commit :
-- 1. la station ST-01 existe pour tenant-demo ;
-- 2. une seconde insertion EVT-001 ne crée pas une autre ligne ;
-- 3. deux tenants peuvent avoir des station_id identiques sans collision ;
-- 4. un event_id identique dans deux tenants reste isolé.

COMMIT;
