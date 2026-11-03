import csv
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
                "read": 8, "accepted": 3, "duplicates": 1,
                "identical_duplicates": 0, "conflicting_duplicates": 1, "quarantined": 4
            })
            clean = (Path(temporary) / "clean" / "events.jsonl").read_text()
            rejected = (Path(temporary) / "quarantine" / "events.jsonl").read_text()
            self.assertEqual(len(clean.strip().splitlines()), 3)
            self.assertEqual(len(rejected.strip().splitlines()), 4)
            self.assertIn("invalid_timestamp", rejected)
            conflicts = (Path(temporary) / "duplicate_conflicts" / "events.jsonl").read_text()
            self.assertIn("conflicting_duplicate_event_id", conflicts)
            self.assertIn("\"value\": \"22\"", conflicts)

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

    def test_identical_duplicate_is_counted_separately_from_conflict(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "events.csv"
            source.write_text(
                "event_id,station_id,occurred_at,metric,value\n"
                "E1,S1,2026-10-30T08:00:00Z,temperature_c,20\n"
                "E1,S1,2026-10-30T08:00:00Z,temperature_c,20.0\n",
                encoding="utf-8",
            )
            result = run_pipeline(source, root / "out")
            self.assertEqual(result["counts"]["accepted"], 1)
            self.assertEqual(result["counts"]["duplicates"], 1)
            self.assertEqual(result["counts"]["identical_duplicates"], 1)
            self.assertEqual(result["counts"]["conflicting_duplicates"], 0)

    def test_malformed_row_width_is_quarantined(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "events.csv"
            source.write_text(
                "event_id,station_id,occurred_at,metric,value\n"
                "E1,S1,2026-10-30T08:00:00Z,temperature_c,20,unexpected\n",
                encoding="utf-8",
            )
            result = run_pipeline(source, root / "out")
            self.assertEqual(result["counts"]["accepted"], 0)
            self.assertEqual(result["counts"]["quarantined"], 1)
            quarantine = (root / "out" / "quarantine" / "events.jsonl").read_text()
            self.assertIn("row_width_does_not_match_header", quarantine)

    def test_input_output_reconciliation_on_3000_rows(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "events.csv"
            with source.open("w", encoding="utf-8", newline="") as stream:
                writer = csv.writer(stream)
                writer.writerow(["event_id", "station_id", "occurred_at", "metric", "value"])
                for index in range(3000):
                    writer.writerow([f"E{index:05d}", "S1", "2026-10-30T08:00:00Z", "temperature_c", 20 + (index % 10)])
                for index in range(100):
                    writer.writerow([f"E{index:05d}", "S1", "2026-10-30T08:00:00Z", "temperature_c", 20 + (index % 10)])
                for index in range(10):
                    writer.writerow([f"BAD{index}", "S1", "invalid-time", "temperature_c", 20])
            result = run_pipeline(source, root / "out")
            counts = result["counts"]
            self.assertEqual(counts["read"], 3110)
            self.assertEqual(counts["accepted"], 3000)
            self.assertEqual(counts["identical_duplicates"], 100)
            self.assertEqual(counts["quarantined"], 10)
            self.assertEqual(counts["read"], counts["accepted"] + counts["duplicates"] + counts["quarantined"])


if __name__ == "__main__":
    unittest.main()
