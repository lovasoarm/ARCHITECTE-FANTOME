import json
import tempfile
import unittest
from pathlib import Path

from run_pipeline import DataContractError, normalize_event, run_pipeline

ROOT = Path(__file__).resolve().parents[1]


class PipelineTests(unittest.TestCase):
    def test_expected_counts_and_quarantine(self):
        with tempfile.TemporaryDirectory() as temporary:
            result = run_pipeline(ROOT / "data" / "events.csv", Path(temporary))
            self.assertEqual(result["counts"], {
                "read": 8, "accepted": 3, "duplicates": 1, "quarantined": 4
            })
            clean = (Path(temporary) / "clean" / "events.jsonl").read_text()
            rejected = (Path(temporary) / "quarantine" / "events.jsonl").read_text()
            self.assertEqual(len(clean.strip().splitlines()), 3)
            self.assertEqual(len(rejected.strip().splitlines()), 4)
            self.assertIn("invalid_timestamp", rejected)

    def test_idempotent_replay_produces_identical_bytes(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            run_pipeline(ROOT / "data" / "events.csv", output)
            first = {
                path.relative_to(output).as_posix(): path.read_bytes()
                for path in output.rglob("*") if path.is_file()
            }
            run_pipeline(ROOT / "data" / "events.csv", output)
            second = {
                path.relative_to(output).as_posix(): path.read_bytes()
                for path in output.rglob("*") if path.is_file()
            }
            self.assertEqual(first, second)

    def test_duplicate_is_not_allowed_to_overwrite_first_valid_event(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            run_pipeline(ROOT / "data" / "events.csv", output)
            events = [json.loads(line) for line in (output / "clean" / "events.jsonl").read_text().splitlines()]
            event = next(item for item in events if item["event_id"] == "EVT-001")
            self.assertEqual(event["value"], "21.4")

    def test_timezone_is_required(self):
        with self.assertRaises(DataContractError) as context:
            normalize_event({
                "event_id": "E1", "station_id": "s1", "occurred_at": "2026-10-30T08:00:00",
                "metric": "temperature_c", "value": "20"
            })
        self.assertEqual(str(context.exception), "timezone_required")

    def test_non_finite_values_are_rejected(self):
        with self.assertRaises(DataContractError) as context:
            normalize_event({
                "event_id": "E1", "station_id": "s1", "occurred_at": "2026-10-30T08:00:00Z",
                "metric": "temperature_c", "value": "NaN"
            })
        self.assertEqual(str(context.exception), "non_finite_value")

    def test_manifest_contains_source_and_output_hashes(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            result = run_pipeline(ROOT / "data" / "events.csv", output)
            self.assertEqual(len(result["source_sha256"]), 64)
            self.assertEqual(len(result["outputs"]["clean/events.jsonl"]), 64)
            self.assertTrue((output / "manifest.json").is_file())


if __name__ == "__main__":
    unittest.main()
