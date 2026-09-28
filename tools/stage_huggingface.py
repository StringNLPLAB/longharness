#!/usr/bin/env python3
"""Stage the complete LongHarness dataset for a Hugging Face upload."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil


RELEASE = Path(__file__).resolve().parents[1]


def copy(relative: str, destination: Path) -> None:
    source = RELEASE / relative
    if not source.is_file():
        raise FileNotFoundError(source)
    target = destination / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    destination = args.destination.resolve()
    if destination == RELEASE or RELEASE in destination.parents:
        raise ValueError("The staging directory must be outside the release directory")
    if destination.exists() and any(destination.iterdir()):
        raise FileExistsError(f"Staging directory is not empty: {destination}")
    destination.mkdir(parents=True, exist_ok=True)

    rows = [
        json.loads(line)
        for line in (RELEASE / "manifest.jsonl").read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    if len(rows) != 200:
        raise RuntimeError(f"Expected 200 release rows, found {len(rows)}")

    fixed = [
        "README.md",
        "RELEASE.json",
        "manifest.jsonl",
        "examples-manifest.jsonl",
        "DATA_CHECKSUMS.sha256",
        "score.py",
        "tools/verify_release.py",
    ]
    task_names = sorted({row["task"] for row in rows})
    fixed.extend(f"tasks/{task}/README.md" for task in task_names)
    fixed.extend(f"tasks/{task}/manifest.jsonl" for task in task_names)
    for relative in fixed:
        copy(relative, destination)
    for row in rows:
        copy(row["context_path"], destination)
        copy(row["answer_path"], destination)

    print(
        json.dumps(
            {
                "destination": str(destination),
                "instances": len(rows),
                "tasks": len(task_names),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
