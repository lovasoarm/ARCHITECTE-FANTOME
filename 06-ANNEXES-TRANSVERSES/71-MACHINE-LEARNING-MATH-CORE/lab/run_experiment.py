#!/usr/bin/env python3
"""Train and evaluate a small logistic classifier on the AF synthetic dataset."""
import csv
import json
from pathlib import Path

from ml_core import (
    apply_standardizer, classification_metrics, chronological_split,
    fit_standardizer, predict_labels, predict_probabilities,
    train_logistic_regression,
)

BASE = Path(__file__).resolve().parent
FEATURES = ("load_pct", "ambient_c", "vibration_mm_s")


def load_rows():
    with (BASE / "data" / "maintenance.csv").open(encoding="utf-8", newline="") as stream:
        return list(csv.DictReader(stream))


def main():
    rows = load_rows()
    train_rows, test_rows = chronological_split(rows, 0.7)
    train_x = [[float(row[name]) for name in FEATURES] for row in train_rows]
    train_y = [int(row["overheat"]) for row in train_rows]
    test_x = [[float(row[name]) for name in FEATURES] for row in test_rows]
    test_y = [int(row["overheat"]) for row in test_rows]

    means, scales = fit_standardizer(train_x)
    train_scaled = apply_standardizer(train_x, means, scales)
    test_scaled = apply_standardizer(test_x, means, scales)
    model = train_logistic_regression(train_scaled, train_y)
    probabilities = predict_probabilities(model, test_scaled)

    # A deliberately simple baseline: predict the majority class in train.
    majority = 1 if sum(train_y) > len(train_y) / 2 else 0
    baseline_predictions = [majority] * len(test_y)
    model_predictions = predict_labels(probabilities, 0.5)

    print(json.dumps({
        "rows": {"train": len(train_rows), "test": len(test_rows)},
        "train_class_counts": {"overheat": sum(train_y), "normal": len(train_y) - sum(train_y)},
        "baseline": classification_metrics(test_y, baseline_predictions),
        "model_threshold_0_5": classification_metrics(test_y, model_predictions),
        "loss_first": model["losses"][0],
        "loss_last": model["losses"][-1],
        "standardizer_fit_on_train_only": True,
        "warning": "Synthetic educational data; not a validated maintenance model.",
    }, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
