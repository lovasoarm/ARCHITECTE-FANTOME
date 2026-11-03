"""Transparent, dependency-free ML primitives for the AF math/ML lab."""
from __future__ import annotations

from math import exp, log, sqrt
from typing import Sequence


def dot(left: Sequence[float], right: Sequence[float]) -> float:
    if len(left) != len(right):
        raise ValueError("vector_dimensions_must_match")
    return sum(a * b for a, b in zip(left, right))


def mean(values: Sequence[float]) -> float:
    if not values:
        raise ValueError("empty_sequence")
    return sum(values) / len(values)


def variance(values: Sequence[float]) -> float:
    average = mean(values)
    return sum((value - average) ** 2 for value in values) / len(values)


def fit_standardizer(rows: Sequence[Sequence[float]]) -> tuple[list[float], list[float]]:
    if not rows:
        raise ValueError("empty_dataset")
    width = len(rows[0])
    if width == 0 or any(len(row) != width for row in rows):
        raise ValueError("inconsistent_feature_dimensions")
    columns = [[row[index] for row in rows] for index in range(width)]
    means = [mean(column) for column in columns]
    scales = [sqrt(variance(column)) or 1.0 for column in columns]
    return means, scales


def apply_standardizer(
    rows: Sequence[Sequence[float]], means: Sequence[float], scales: Sequence[float]
) -> list[list[float]]:
    if len(means) != len(scales):
        raise ValueError("standardizer_dimensions_must_match")
    result: list[list[float]] = []
    for row in rows:
        if len(row) != len(means):
            raise ValueError("feature_dimensions_must_match_standardizer")
        result.append([(value - means[i]) / scales[i] for i, value in enumerate(row)])
    return result


def chronological_split(rows: Sequence[dict[str, str]], train_fraction: float = 0.7):
    if not 0.0 < train_fraction < 1.0:
        raise ValueError("train_fraction_must_be_between_zero_and_one")
    if len(rows) < 3:
        raise ValueError("at_least_three_rows_required")
    cut = int(len(rows) * train_fraction)
    cut = max(1, min(cut, len(rows) - 1))
    return list(rows[:cut]), list(rows[cut:])


def chronological_train_validation_test_split(
    rows: Sequence[dict[str, str]],
    train_fraction: float = 0.6,
    validation_fraction: float = 0.2,
):
    """Split ordered observations without shuffling or reusing future rows."""
    if train_fraction <= 0 or validation_fraction <= 0:
        raise ValueError("split_fractions_must_be_positive")
    if train_fraction + validation_fraction >= 1:
        raise ValueError("train_and_validation_must_leave_test_rows")
    if len(rows) < 5:
        raise ValueError("at_least_five_rows_required")
    train_end = int(len(rows) * train_fraction)
    validation_end = train_end + int(len(rows) * validation_fraction)
    train_end = max(1, min(train_end, len(rows) - 2))
    validation_end = max(train_end + 1, min(validation_end, len(rows) - 1))
    return list(rows[:train_end]), list(rows[train_end:validation_end]), list(rows[validation_end:])


def sigmoid(value: float) -> float:
    # Numerically stable form avoids overflow for large negative inputs.
    if value >= 0:
        z = exp(-value)
        return 1.0 / (1.0 + z)
    z = exp(value)
    return z / (1.0 + z)


def binary_cross_entropy(probabilities: Sequence[float], labels: Sequence[int]) -> float:
    if not probabilities or len(probabilities) != len(labels):
        raise ValueError("probabilities_and_labels_must_have_same_nonzero_length")
    epsilon = 1e-12
    total = 0.0
    for probability, label in zip(probabilities, labels):
        if label not in (0, 1):
            raise ValueError("labels_must_be_binary")
        clipped = min(1.0 - epsilon, max(epsilon, probability))
        total += -(label * log(clipped) + (1 - label) * log(1.0 - clipped))
    return total / len(labels)


def train_logistic_regression(
    features: Sequence[Sequence[float]],
    labels: Sequence[int],
    *,
    epochs: int = 1200,
    learning_rate: float = 0.08,
    l2: float = 0.001,
) -> dict[str, object]:
    if not features or len(features) != len(labels):
        raise ValueError("features_and_labels_must_have_same_nonzero_length")
    width = len(features[0])
    if width == 0 or any(len(row) != width for row in features):
        raise ValueError("inconsistent_feature_dimensions")
    if any(label not in (0, 1) for label in labels):
        raise ValueError("labels_must_be_binary")
    if epochs <= 0 or learning_rate <= 0 or l2 < 0:
        raise ValueError("invalid_training_parameters")

    weights = [0.0] * width
    bias = 0.0
    losses: list[float] = []
    size = len(features)

    for _ in range(epochs):
        probabilities = [sigmoid(dot(weights, row) + bias) for row in features]
        loss = binary_cross_entropy(probabilities, labels)
        loss += (l2 / (2 * size)) * sum(weight * weight for weight in weights)
        losses.append(loss)

        grad_weights = [0.0] * width
        grad_bias = 0.0
        for row, label, probability in zip(features, labels, probabilities):
            error = probability - label
            for index, value in enumerate(row):
                grad_weights[index] += error * value
            grad_bias += error
        weights = [
            weight - learning_rate * (grad_weights[i] / size + (l2 / size) * weight)
            for i, weight in enumerate(weights)
        ]
        bias -= learning_rate * grad_bias / size

    final_probabilities = [sigmoid(dot(weights, row) + bias) for row in features]
    final_loss = binary_cross_entropy(final_probabilities, labels)
    final_loss += (l2 / (2 * size)) * sum(weight * weight for weight in weights)
    losses.append(final_loss)
    return {"weights": weights, "bias": bias, "losses": losses}


def predict_probabilities(model: dict[str, object], features: Sequence[Sequence[float]]) -> list[float]:
    weights = model["weights"]
    bias = model["bias"]
    if not isinstance(weights, list) or not isinstance(bias, (int, float)):
        raise ValueError("invalid_model")
    return [sigmoid(dot(weights, row) + float(bias)) for row in features]


def predict_labels(probabilities: Sequence[float], threshold: float = 0.5) -> list[int]:
    if not 0.0 <= threshold <= 1.0:
        raise ValueError("threshold_must_be_between_zero_and_one")
    return [1 if probability >= threshold else 0 for probability in probabilities]


def classification_metrics(labels: Sequence[int], predictions: Sequence[int]) -> dict[str, float | int]:
    if not labels or len(labels) != len(predictions):
        raise ValueError("labels_and_predictions_must_have_same_nonzero_length")
    if any(value not in (0, 1) for value in list(labels) + list(predictions)):
        raise ValueError("labels_must_be_binary")
    tp = sum(1 for y, p in zip(labels, predictions) if y == 1 and p == 1)
    tn = sum(1 for y, p in zip(labels, predictions) if y == 0 and p == 0)
    fp = sum(1 for y, p in zip(labels, predictions) if y == 0 and p == 1)
    fn = sum(1 for y, p in zip(labels, predictions) if y == 1 and p == 0)
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    accuracy = (tp + tn) / len(labels)
    return {"tp": tp, "tn": tn, "fp": fp, "fn": fn,
            "precision": precision, "recall": recall, "f1": f1, "accuracy": accuracy}


def brier_score(probabilities: Sequence[float], labels: Sequence[int]) -> float:
    """Mean squared error of probabilistic predictions; lower is better."""
    if not probabilities or len(probabilities) != len(labels):
        raise ValueError("probabilities_and_labels_must_have_same_nonzero_length")
    if any(label not in (0, 1) for label in labels):
        raise ValueError("labels_must_be_binary")
    if any(not 0.0 <= probability <= 1.0 for probability in probabilities):
        raise ValueError("probabilities_must_be_between_zero_and_one")
    return sum((probability - label) ** 2 for probability, label in zip(probabilities, labels)) / len(labels)


def choose_threshold_by_cost(
    labels: Sequence[int],
    probabilities: Sequence[float],
    *,
    false_positive_cost: float = 1.0,
    false_negative_cost: float = 5.0,
) -> dict[str, float]:
    """Choose a decision threshold on validation data using an explicit error cost."""
    if not labels or len(labels) != len(probabilities):
        raise ValueError("probabilities_and_labels_must_have_same_nonzero_length")
    if false_positive_cost < 0 or false_negative_cost < 0:
        raise ValueError("error_costs_must_be_non_negative")
    if any(label not in (0, 1) for label in labels):
        raise ValueError("labels_must_be_binary")
    if any(not 0.0 <= probability <= 1.0 for probability in probabilities):
        raise ValueError("probabilities_must_be_between_zero_and_one")

    candidates = [i / 100 for i in range(5, 100, 5)] + [0.5]
    evaluated = []
    for threshold in sorted(set(candidates)):
        predictions = predict_labels(probabilities, threshold)
        metrics = classification_metrics(labels, predictions)
        cost = (metrics["fp"] * false_positive_cost) + (metrics["fn"] * false_negative_cost)
        evaluated.append((float(cost), threshold))
    cost, threshold = min(evaluated, key=lambda item: (item[0], item[1]))
    return {"threshold": threshold, "validation_error_cost": cost}
