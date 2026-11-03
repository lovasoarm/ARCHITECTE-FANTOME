#!/usr/bin/env python3
"""Run a chronological ML experiment with validation-only threshold selection."""
import csv
import json
from pathlib import Path

from ml_core import (
    apply_standardizer, brier_score, choose_threshold_by_cost, classification_metrics,
    chronological_train_validation_test_split, fit_standardizer, predict_labels,
    predict_probabilities, train_logistic_regression,
)

BASE = Path(__file__).resolve().parent
FEATURES = ("load_pct", "ambient_c", "vibration_mm_s")


def load_rows():
    with (BASE / "data" / "maintenance.csv").open(encoding="utf-8", newline="") as stream:
        rows = list(csv.DictReader(stream))
    rows.sort(key=lambda row: row["observed_at"])
    return rows


def to_xy(rows):
    features = [[float(row[name]) for name in FEATURES] for row in rows]
    labels = [int(row["overheat"]) for row in rows]
    return features, labels


def class_rate(labels):
    return sum(labels) / len(labels) if labels else None


def main():
    rows = load_rows()
    train_rows, validation_rows, test_rows = chronological_train_validation_test_split(rows)
    train_x, train_y = to_xy(train_rows)
    validation_x, validation_y = to_xy(validation_rows)
    test_x, test_y = to_xy(test_rows)

    # Fit preprocessing only on train. Validation chooses the threshold; test stays closed.
    means, scales = fit_standardizer(train_x)
    train_scaled = apply_standardizer(train_x, means, scales)
    validation_scaled = apply_standardizer(validation_x, means, scales)
    test_scaled = apply_standardizer(test_x, means, scales)
    model = train_logistic_regression(train_scaled, train_y, epochs=1600, learning_rate=0.06, l2=0.01)

    validation_probabilities = predict_probabilities(model, validation_scaled)
    threshold_choice = choose_threshold_by_cost(
        validation_y, validation_probabilities, false_positive_cost=1.0, false_negative_cost=4.0
    )
    test_probabilities = predict_probabilities(model, test_scaled)
    majority = 1 if sum(train_y) > len(train_y) / 2 else 0
    baseline_predictions = [majority] * len(test_y)
    default_predictions = predict_labels(test_probabilities, 0.5)
    selected_predictions = predict_labels(test_probabilities, threshold_choice["threshold"])

    output = {
        "dataset": {
            "kind": "synthetic_deterministic",
            "rows": len(rows),
            "seed": 20261030,
            "time_range": [rows[0]["observed_at"], rows[-1]["observed_at"]],
            "known_regime_change_at_row": 360,
        },
        "split": {
            "train": len(train_rows), "validation": len(validation_rows), "test": len(test_rows),
            "class_rate": {
                "train": class_rate(train_y),
                "validation": class_rate(validation_y),
                "test": class_rate(test_y),
            },
            "chronological": True,
            "standardizer_fit_on_train_only": True,
            "threshold_selected_on_validation_only": True,
        },
        "baseline_majority_class": {"class": majority, **classification_metrics(test_y, baseline_predictions)},
        "model_threshold_0_5": {
            **classification_metrics(test_y, default_predictions),
            "brier_score": brier_score(test_probabilities, test_y),
        },
        "model_validation_cost_threshold": {
            **classification_metrics(test_y, selected_predictions),
            "threshold": threshold_choice["threshold"],
            "validation_error_cost": threshold_choice["validation_error_cost"],
            "test_brier_score": brier_score(test_probabilities, test_y),
        },
        "loss": {"first_train": model["losses"][0], "last_train": model["losses"][-1]},
        "warning": "Synthetic pedagogical data with a deliberate regime change; no operational validity claim.",
    }
    print(json.dumps(output, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
