#!/usr/bin/env python3
"""Regenerate the deterministic, synthetic maintenance dataset for the AF lab."""
from __future__ import annotations

import csv
import random
from datetime import datetime, timedelta, timezone
from math import exp
from pathlib import Path

SEED = 20261030
ROWS = 480
OUTPUT = Path(__file__).resolve().parent / "data" / "maintenance.csv"


def sigmoid(value: float) -> float:
    if value >= 0:
        z = exp(-value)
        return 1 / (1 + z)
    z = exp(value)
    return z / (1 + z)


def build_rows():
    rng = random.Random(SEED)
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    rows = []
    for index in range(ROWS):
        load = 15 + rng.random() * 85
        ambient = max(10.0, min(45.0, 12 + 0.19 * load + rng.gauss(0, 4.8)))
        vibration = max(0.02, 0.04 + load * 0.005 + rng.gauss(0, 0.12))
        latent = -5.2 + 0.052 * load + 0.055 * ambient + 2.2 * vibration + rng.gauss(0, 0.9)
        # A regime change in the final quarter is deliberate and must be discussed.
        if index >= int(ROWS * 0.75):
            latent += 0.45
        probability = sigmoid(latent)
        label = 1 if rng.random() < probability else 0
        timestamp = start + timedelta(hours=index)
        rows.append({
            "observed_at": timestamp.isoformat(timespec="seconds").replace("+00:00", "Z"),
            "load_pct": f"{load:.3f}",
            "ambient_c": f"{ambient:.3f}",
            "vibration_mm_s": f"{vibration:.4f}",
            "overheat": str(label),
        })
    return rows


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=["observed_at", "load_pct", "ambient_c", "vibration_mm_s", "overheat"])
        writer.writeheader()
        writer.writerows(build_rows())
    print(f"generated_rows={ROWS} seed={SEED} output={OUTPUT}")


if __name__ == "__main__":
    main()
