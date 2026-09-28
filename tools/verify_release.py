#!/usr/bin/env python3
"""Verify the standalone LongHarness release structure and hashes."""

from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path


RELEASE = Path(__file__).resolve().parents[1]
TASKS = {
    "constraint-solving-search",
    "equivalent-program-pair-search",
    "program-execution-tracing",
    "outlier-memo-detection",
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify_rows(rows: list[dict], expected_per_task: int) -> Counter:
    counts = Counter(row["task"] for row in rows)
    assert set(counts) == TASKS, counts
    assert set(counts.values()) == {expected_per_task}, counts
    seen = set()
    for row in rows:
        key = (row["task"], int(row["index"]))
        assert key not in seen, key
        seen.add(key)
        context = RELEASE / row["context_path"]
        answer = RELEASE / row["answer_path"]
        assert context.is_file(), context
        assert answer.is_file(), answer
        assert sha256(context) == row["context_sha256"], context
        if "answer_sha256" in row:
            assert sha256(answer) == row["answer_sha256"], answer
        value = json.loads(answer.read_text(encoding="utf-8"))
        assert value["task"] == row["task"], answer
    return counts


def verify_examples(release_metadata: dict) -> None:
    manifest = RELEASE / "examples-manifest.jsonl"
    assert manifest.is_file(), manifest
    assert release_metadata["examples_manifest_sha256"] == sha256(manifest)
    rows = [json.loads(line) for line in manifest.read_text(encoding="utf-8").splitlines() if line.strip()]
    assert len(rows) == 8, len(rows)
    counts = verify_rows(rows, expected_per_task=2)
    print(
        json.dumps(
            {
                "benchmark": "LongHarness",
                "edition": "github-examples",
                "instances": len(rows),
                "tasks": dict(sorted(counts.items())),
            },
            indent=2,
        )
    )


def verify_full(release_metadata: dict) -> None:
    manifest = RELEASE / "manifest.jsonl"
    assert release_metadata["manifest_sha256"] == sha256(manifest)
    rows = [json.loads(line) for line in manifest.read_text(encoding="utf-8").splitlines() if line.strip()]
    assert len(rows) == 200, len(rows)
    counts = verify_rows(rows, expected_per_task=50)
    for task in TASKS:
        task_manifest = RELEASE / "tasks" / task / "manifest.jsonl"
        assert release_metadata["task_manifest_sha256"][task] == sha256(task_manifest)
        task_rows = [json.loads(line) for line in task_manifest.read_text(encoding="utf-8").splitlines() if line.strip()]
        assert task_rows == [row for row in rows if row["task"] == task]
    for line in (RELEASE / "DATA_CHECKSUMS.sha256").read_text(encoding="utf-8").splitlines():
        expected, relative = line.split("  ", 1)
        assert sha256(RELEASE / relative) == expected, relative
    print(json.dumps({"benchmark": "LongHarness", "instances": 200, "tasks": dict(sorted(counts.items()))}, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--examples", action="store_true", help="Verify only the examples tracked by GitHub.")
    args = parser.parse_args()
    release_metadata = json.loads((RELEASE / "RELEASE.json").read_text(encoding="utf-8"))
    assert release_metadata["benchmark"] == "LongHarness"
    if args.examples or not (RELEASE / "manifest.jsonl").is_file():
        verify_examples(release_metadata)
    else:
        verify_full(release_metadata)


if __name__ == "__main__":
    main()
