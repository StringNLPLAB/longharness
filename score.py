#!/usr/bin/env python3
"""Score structured LongHarness predictions with exact task metrics."""

from __future__ import annotations

import argparse
from collections import defaultdict
import json
from pathlib import Path
from typing import Any


RELEASE = Path(__file__).resolve().parent


def canonical_pairs(value: Any) -> list[list[int]] | None:
    if not isinstance(value, list):
        return None
    pairs = []
    for pair in value:
        if not isinstance(pair, list) or len(pair) != 2 or not all(isinstance(item, int) for item in pair):
            return None
        a, b = sorted(pair)
        if a == b:
            return None
        pairs.append([a, b])
    return sorted(pairs)


def score_one(task: str, prediction: Any, gold: dict[str, Any]) -> dict[str, Any]:
    if task == "constraint-solving-search":
        submitted = prediction if isinstance(prediction, dict) else {}
        answer_exact = set(submitted.get("matches", [])) == set(gold["matches"])
        return {"answer_exact": answer_exact, "exact": answer_exact}
    if task == "equivalent-program-pair-search":
        predicted = canonical_pairs(prediction)
        expected = canonical_pairs(gold["expected_pairs"])
        return {"answer_exact": predicted == expected, "exact": predicted == expected, "format_valid": predicted is not None}
    if task == "program-execution-tracing":
        submitted = prediction if isinstance(prediction, dict) else {}
        answer_exact = submitted.get("answer") == gold["answer"]
        evidence = submitted.get("evidence")
        evidence_exact = isinstance(evidence, list) and set(evidence) == set(gold["evidence"]) and len(evidence) == len(set(evidence))
        return {"answer_exact": answer_exact, "evidence_exact": evidence_exact, "exact": answer_exact and evidence_exact}
    if task == "outlier-memo-detection":
        predicted = prediction if isinstance(prediction, list) else []
        exact = set(predicted) == set(gold["memo_ids"]) and len(predicted) == len(set(predicted))
        return {"answer_exact": exact, "exact": exact}
    raise ValueError(f"Unknown task: {task}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("predictions", type=Path)
    parser.add_argument(
        "--manifest",
        type=Path,
        help="Manifest to score; defaults to the full manifest or the tracked examples manifest.",
    )
    parser.add_argument("--output", type=Path, default=Path("scores.json"))
    args = parser.parse_args()
    manifest_path = args.manifest
    if manifest_path is None:
        manifest_path = RELEASE / "manifest.jsonl"
        if not manifest_path.is_file():
            manifest_path = RELEASE / "examples-manifest.jsonl"
    elif not manifest_path.is_absolute():
        manifest_path = RELEASE / manifest_path
    manifest = {
        (row["task"], int(row["index"])): row
        for row in (
            json.loads(line)
            for line in manifest_path.read_text(encoding="utf-8").splitlines()
            if line.strip()
        )
    }
    predictions = {}
    for line_number, line in enumerate(args.predictions.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        row = json.loads(line)
        key = (row["task"], int(row["index"]))
        if key in predictions:
            raise ValueError(f"Duplicate prediction for {key} at line {line_number}")
        predictions[key] = row.get("prediction")
    details = []
    totals: dict[str, dict[str, int]] = defaultdict(lambda: {"correct": 0, "total": 0, "answer_only": 0})
    for key, item in sorted(manifest.items()):
        gold = json.loads((RELEASE / item["answer_path"]).read_text(encoding="utf-8"))
        result = score_one(key[0], predictions.get(key), gold)
        details.append({"task": key[0], "index": key[1], "submitted": key in predictions, **result})
        totals[key[0]]["total"] += 1
        totals[key[0]]["correct"] += int(result["exact"])
        totals[key[0]]["answer_only"] += int(result["answer_exact"])
    summary = {
        task: {
            **values,
            "accuracy": values["correct"] / values["total"],
            "answer_only_accuracy": values["answer_only"] / values["total"],
        }
        for task, values in sorted(totals.items())
    }
    report = {
        "benchmark": "LongHarness",
        "details": details,
        "manifest": str(manifest_path),
        "macro_accuracy": sum(value["accuracy"] for value in summary.values()) / len(summary),
        "summary": summary,
    }
    args.output.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"macro_accuracy": report["macro_accuracy"], "summary": summary}, indent=2))


if __name__ == "__main__":
    main()
