import csv
import unittest
from pathlib import Path

from ml_core import (
    apply_standardizer, brier_score, choose_threshold_by_cost, classification_metrics,
    chronological_split, chronological_train_validation_test_split, dot, fit_standardizer,
    predict_labels, predict_probabilities,
    sigmoid, train_logistic_regression,
)

ROOT = Path(__file__).resolve().parents[1]


class MathAndMLTests(unittest.TestCase):
    def test_dot_product_checks_dimensions(self):
        self.assertEqual(dot([1, 2, 3], [4, 5, 6]), 32)
        with self.assertRaises(ValueError):
            dot([1], [1, 2])

    def test_sigmoid_is_stable_at_large_magnitudes(self):
        self.assertGreater(sigmoid(1000), 0.999)
        self.assertLess(sigmoid(-1000), 0.001)

    def test_standardizer_handles_constant_feature(self):
        means, scales = fit_standardizer([[1, 7], [3, 7], [5, 7]])
        transformed = apply_standardizer([[3, 7]], means, scales)
        self.assertAlmostEqual(transformed[0][0], 0.0)
        self.assertEqual(transformed[0][1], 0.0)

    def test_split_preserves_time_order(self):
        rows = [{"observed_at": str(i)} for i in range(10)]
        train, test = chronological_split(rows, 0.7)
        self.assertEqual([r["observed_at"] for r in train], [str(i) for i in range(7)])
        self.assertEqual([r["observed_at"] for r in test], [str(i) for i in range(7, 10)])

    def test_training_reduces_loss_on_small_separable_data(self):
        features = [[-2.0], [-1.0], [-0.5], [0.5], [1.0], [2.0]]
        labels = [0, 0, 0, 1, 1, 1]
        model = train_logistic_regression(features, labels, epochs=500, learning_rate=0.1)
        self.assertLess(model["losses"][-1], model["losses"][0])
        probabilities = predict_probabilities(model, features)
        self.assertEqual(predict_labels(probabilities), labels)

    def test_metrics_count_each_error_type(self):
        result = classification_metrics([1, 1, 0, 0], [1, 0, 1, 0])
        self.assertEqual((result["tp"], result["tn"], result["fp"], result["fn"]), (1, 1, 1, 1))
        self.assertAlmostEqual(result["precision"], 0.5)
        self.assertAlmostEqual(result["recall"], 0.5)

    def test_dataset_has_both_classes_before_and_after_split(self):
        with (ROOT / "data" / "maintenance.csv").open(encoding="utf-8", newline="") as stream:
            rows = list(csv.DictReader(stream))
        train, test = chronological_split(rows)
        self.assertEqual({int(row["overheat"]) for row in train}, {0, 1})
        self.assertEqual({int(row["overheat"]) for row in test}, {0, 1})

    def test_threshold_bounds_are_enforced(self):
        with self.assertRaises(ValueError):
            predict_labels([0.3, 0.8], 1.5)

    def test_three_way_chronological_split_has_no_overlap(self):
        rows = [{"observed_at": str(i)} for i in range(100)]
        train, validation, test = chronological_train_validation_test_split(rows)
        self.assertEqual((len(train), len(validation), len(test)), (60, 20, 20))
        self.assertLess(train[-1]["observed_at"], validation[0]["observed_at"])
        self.assertLess(validation[-1]["observed_at"], test[0]["observed_at"])

    def test_three_way_split_rejects_invalid_fractions(self):
        with self.assertRaises(ValueError):
            chronological_train_validation_test_split([{"t": str(i)} for i in range(10)], 0.8, 0.2)

    def test_brier_score_checks_bounds_and_labels(self):
        self.assertAlmostEqual(brier_score([0.9, 0.2], [1, 0]), 0.025)
        with self.assertRaises(ValueError):
            brier_score([1.2], [1])

    def test_threshold_is_chosen_from_validation_cost(self):
        result = choose_threshold_by_cost([1, 1, 0, 0], [0.4, 0.6, 0.3, 0.8],
                                          false_positive_cost=1, false_negative_cost=4)
        self.assertGreaterEqual(result["threshold"], 0.05)
        self.assertLessEqual(result["threshold"], 0.95)
        self.assertGreaterEqual(result["validation_error_cost"], 0)

    def test_regenerated_dataset_has_sufficient_chronological_rows(self):
        with (ROOT / "data" / "maintenance.csv").open(encoding="utf-8", newline="") as stream:
            rows = list(csv.DictReader(stream))
        self.assertEqual(len(rows), 480)
        train, validation, test = chronological_train_validation_test_split(rows)
        for partition in (train, validation, test):
            self.assertEqual({int(row["overheat"]) for row in partition}, {0, 1})


if __name__ == "__main__":
    unittest.main()
