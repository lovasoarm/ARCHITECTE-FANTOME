#!/usr/bin/env python3
"""Small, deterministic batch pipeline used by the AF Data Engineering lab."""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import tempfile
from datetime import datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Any

REQUIRED = ("event_id", "station_id", "occurred_at", "metric", "value")
RANGES = {
    "temperature_c": (Decimal("-80"), Decimal("150")),
    "pressure_kpa": (Decimal("0"), Decimal("1000")),
    "vibration_mm_s": (Decimal("0"), Decimal("100")),
}


class DataContractError(ValueError):
    """Raised when an event cannot satisfy the declared data contract."""


def parse_timestamp(raw: str) -> str:
    value = raw.strip()
    if value.endswith("Z"):
        value = value[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError as exc:
        raise DataContractError("invalid_timestamp") from exc
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise DataContractError("timezone_required")
    return parsed.isoformat(timespec="seconds")


def normalize_event(row: dict[str, str | None]) -> dict[str, Any]:
    missing = [field for field in REQUIRED if not (row.get(field) or "").strip()]
    if missing:
        raise DataContractError("missing:" + ",".join(missing))

    event_id = str(row["event_id"]).strip()
    station_id = str(row["station_id"]).strip().upper()
    metric = str(row["metric"]).strip().lower()
    if metric not in RANGES:
        raise DataContractError("unknown_metric")

    try:
        numeric = Decimal(str(row["value"]).strip())
    except (InvalidOperation, ValueError) as exc:
        raise DataContractError("invalid_numeric_value") from exc
    if not numeric.is_finite():
        raise DataContractError("non_finite_value")
    low, high = RANGES[metric]
    if numeric < low or numeric > high:
        raise DataContractError("value_out_of_range")

    return {
        "event_id": event_id,
        "station_id": station_id,
        "occurred_at": parse_timestamp(str(row["occurred_at"])),
        "metric": metric,
        "value": format(numeric.normalize(), "f"),
    }


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def atomic_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    except Exception:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def jsonl(records: list[dict[str, Any]]) -> str:
    return "".join(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n" for record in records)


def run_pipeline(input_path: Path, output_dir: Path) -> dict[str, Any]:
    accepted: list[dict[str, Any]] = []
    quarantined: list[dict[str, Any]] = []
    seen: dict[str, dict[str, Any]] = {}
    duplicate_conflicts: list[dict[str, Any]] = []
    raw_count = duplicate_count = identical_duplicate_count = 0

    with input_path.open("r", encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        if (reader.fieldnames is None
                or len(reader.fieldnames) != len(set(reader.fieldnames))
                or not set(REQUIRED).issubset(reader.fieldnames)):
            raise DataContractError("input_header_does_not_match_contract")
        for line_number, row in enumerate(reader, start=2):
            raw_count += 1
            try:
                if None in row or any(value is None for value in row.values()):
                    raise DataContractError("row_width_does_not_match_header")
                event = normalize_event(row)
            except DataContractError as exc:
                quarantined.append({
                    "line_number": line_number,
                    "reason": str(exc),
                    "raw": {("<extra_columns>" if key is None else str(key)): value for key, value in row.items()},
                })
                continue
            previous = seen.get(event["event_id"])
            if previous is not None:
                duplicate_count += 1
                if previous == event:
                    identical_duplicate_count += 1
                else:
                    duplicate_conflicts.append({
                        "line_number": line_number,
                        "event_id": event["event_id"],
                        "reason": "conflicting_duplicate_event_id",
                        "first_payload": previous,
                        "incoming_payload": event,
                    })
                continue
            seen[event["event_id"]] = event
            accepted.append(event)

    accepted.sort(key=lambda item: (item["occurred_at"], item["event_id"]))
    clean_path = output_dir / "clean" / "events.jsonl"
    quarantine_path = output_dir / "quarantine" / "events.jsonl"
    conflict_path = output_dir / "duplicate_conflicts" / "events.jsonl"
    atomic_write(clean_path, jsonl(accepted))
    atomic_write(quarantine_path, jsonl(quarantined))
    atomic_write(conflict_path, jsonl(duplicate_conflicts))

    # Each input row must end in exactly one bucket: accepted, duplicate, or quarantine.
    if raw_count != len(accepted) + duplicate_count + len(quarantined):
        raise RuntimeError("input_output_reconciliation_failed")

    manifest = {
        "contract_version": "1.0.0",
        "source_file": input_path.name,
        "source_sha256": sha256(input_path),
        "counts": {
            "read": raw_count,
            "accepted": len(accepted),
            "duplicates": duplicate_count,
            "identical_duplicates": identical_duplicate_count,
            "conflicting_duplicates": len(duplicate_conflicts),
            "quarantined": len(quarantined),
        },
        "outputs": {
            "clean/events.jsonl": sha256(clean_path),
            "quarantine/events.jsonl": sha256(quarantine_path),
            "duplicate_conflicts/events.jsonl": sha256(conflict_path),
        },
    }
    manifest_path = output_dir / "manifest.json"
    atomic_write(manifest_path, json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description="Run the deterministic AF batch pipeline")
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        result = run_pipeline(args.input, args.output)
    except (OSError, DataContractError) as exc:
        parser.error(str(exc))
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
