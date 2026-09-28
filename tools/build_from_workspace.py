#!/usr/bin/env python3
"""Build the standalone LongHarness release from the frozen workspace suites."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
import shutil
from typing import Any, Iterable, Iterator


RELEASE = Path(__file__).resolve().parents[1]
PROJECT = RELEASE.parent
TASKS = RELEASE / "tasks"
EXAMPLE_INDICES = {0, 1}
CONSTRAINT_OUTPUT_WITH_EVIDENCE = """Return only one JSON object. Sort person IDs and passage IDs lexicographically.
The object must contain exactly two keys: `matches` and `evidence`.
`matches` must be a JSON array of person-ID strings.
`evidence` must map each returned person ID to an object whose keys are the displayed c-numbers and whose values are arrays of supporting passage-ID strings.
Use the displayed c-numbers, whose order is the order above."""
CONSTRAINT_OUTPUT_MATCHES_ONLY = """Return only one JSON object with exactly one key: `matches`.
`matches` must be a JSON array containing every qualifying person-ID string.
Sort the person IDs lexicographically."""


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise TypeError(f"Expected object in {path}")
    return value


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def stream_jsonl(path: Path) -> Iterator[dict[str, Any]]:
    with path.open(encoding="utf-8") as handle:
        for line in handle:
            if line.strip():
                yield json.loads(line)


def reset_task(slug: str) -> tuple[Path, Path, Path]:
    root = TASKS / slug
    contexts = root / "contexts"
    answers = root / "answers"
    for path in (contexts, answers):
        if path.exists():
            shutil.rmtree(path)
        path.mkdir(parents=True)
    manifest = root / "manifest.jsonl"
    if manifest.exists():
        manifest.unlink()
    return root, contexts, answers


def write_answer(path: Path, value: dict[str, Any]) -> None:
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def write_manifest(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    path.write_text(
        "".join(json.dumps(row, sort_keys=True) + "\n" for row in rows),
        encoding="utf-8",
    )


def write_constraint_context(source: Path, destination: Path) -> None:
    text = source.read_text(encoding="utf-8")
    if text.count(CONSTRAINT_OUTPUT_WITH_EVIDENCE) != 1:
        raise ValueError(f"Unexpected constraint output instructions in {source}")
    destination.write_text(
        text.replace(CONSTRAINT_OUTPUT_WITH_EVIDENCE, CONSTRAINT_OUTPUT_MATCHES_ONLY),
        encoding="utf-8",
    )


def release_row(
    slug: str,
    index: int,
    source_context: Path,
    destination_context: Path,
    destination_answer: Path,
    **metadata: Any,
) -> dict[str, Any]:
    if source_context.resolve() != destination_context.resolve():
        shutil.copy2(source_context, destination_context)
    return {
        "answer_path": str(destination_answer.relative_to(RELEASE)),
        "context_bytes": destination_context.stat().st_size,
        "context_path": str(destination_context.relative_to(RELEASE)),
        "context_sha256": sha256(destination_context),
        "index": index,
        "task": slug,
        **metadata,
    }


def build_constraints() -> list[dict[str, Any]]:
    slug = "constraint-solving-search"
    _, contexts, answers = reset_task(slug)
    source = PROJECT / "commonsense_constraints/data/commonsense-constraints-v1-50"
    source_manifest = read_jsonl(source / "manifest.jsonl")
    rows = []
    for item in source_manifest:
        index = int(item["index"])
        sample = f"sample-{index:05d}"
        context = source / item["context_path"]
        key = read_json(source / item["answer_key_path"])
        answer = answers / f"{sample}.json"
        write_answer(
            answer,
            {
                "matches": key["matches"],
                "schema_version": 1,
                "task": slug,
            },
        )
        destination_context = contexts / f"{sample}.md"
        write_constraint_context(context, destination_context)
        rows.append(
            release_row(
                slug,
                index,
                destination_context,
                destination_context,
                answer,
            )
        )
    write_manifest(TASKS / slug / "manifest.jsonl", rows)
    return rows


def build_pairs() -> list[dict[str, Any]]:
    slug = "equivalent-program-pair-search"
    _, contexts, answers = reset_task(slug)
    source = PROJECT / "apps_semantic_pairs/data/code-only-v3-screened-clarified-query-50"
    source_manifest = read_jsonl(source / "manifest.jsonl")
    rows = []
    for item in source_manifest:
        index = int(item["index"])
        sample = f"sample-{index:05d}"
        context = source / item["context_path"]
        key = read_json(source / item["answer_key_path"])
        answer = answers / f"{sample}.json"
        write_answer(
            answer,
            {
                "expected_pairs": key["expected_pairs"],
                "schema_version": 1,
                "task": slug,
            },
        )
        rows.append(
            release_row(
                slug,
                index,
                context,
                contexts / f"{sample}.md",
                answer,
                program_count=item.get("program_count"),
                qwen_token_count=item.get("qwen_token_count"),
            )
        )
    write_manifest(TASKS / slug / "manifest.jsonl", rows)
    return rows


def build_programs() -> list[dict[str, Any]]:
    slug = "program-execution-tracing"
    _, contexts, answers = reset_task(slug)
    source = PROJECT / "notebook_export_v18_search/data/notebook-export-v18-128k-python-50"
    source_manifest = read_jsonl(source / "manifest.jsonl")
    rows = []
    for item in source_manifest:
        index = int(item["index"])
        sample = f"sample-{index:05d}"
        context = source / item["context_path"]
        key = read_json(source / item["answer_key_path"])
        evidence = sorted({cell for value in key["citation_equivalence"].values() for cell in value["valid_cells"]})
        answer = answers / f"{sample}.json"
        write_answer(
            answer,
            {
                "answer": key["answer"],
                "evidence": evidence,
                "schema_version": 1,
                "task": slug,
            },
        )
        rows.append(
            release_row(
                slug,
                index,
                context,
                contexts / f"{sample}.md",
                answer,
                qwen_token_count=item.get("qwen_token_count"),
                transformations=len(evidence),
            )
        )
    write_manifest(TASKS / slug / "manifest.jsonl", rows)
    return rows


def build_memos() -> list[dict[str, Any]]:
    slug = "outlier-memo-detection"
    _, contexts, answers = reset_task(slug)
    sources = [
        (
            PROJECT / "company_memos/v5.9.1/data/v591_worldschema_neutrallabel_clearrels_mixed_700m_2500s_450f_i15_seed0_25ex.jsonl",
            "base",
        ),
        (
            PROJECT / "company_memos/v5.9.1.cont/v592_heldout5world_neutrallabel_clearrels_mixed_700m_2500s_450f_i15_seed0_25ex.jsonl",
            "continuation",
        ),
    ]
    rows = []
    index = 0
    for source, split in sources:
        for source_row, record in enumerate(stream_jsonl(source)):
            sample = f"sample-{index:05d}"
            context = contexts / f"{sample}.md"
            context.write_text(record["prompt"].rstrip() + "\n", encoding="utf-8")
            answer = answers / f"{sample}.json"
            expected = sorted(record.get("impostor_ids", record["answer_nodes"]))
            write_answer(
                answer,
                {
                    "memo_ids": expected,
                    "schema_version": 1,
                    "task": slug,
                },
            )
            rows.append(
                {
                    "answer_path": str(answer.relative_to(RELEASE)),
                    "context_bytes": context.stat().st_size,
                    "context_path": str(context.relative_to(RELEASE)),
                    "context_sha256": sha256(context),
                    "index": index,
                    "memo_count": int(record["memo_count"]),
                    "source_row": source_row,
                    "source_split": split,
                    "statement_count": int(record["statement_count"]),
                    "task": slug,
                }
            )
            index += 1
    write_manifest(TASKS / slug / "manifest.jsonl", rows)
    return rows


def main() -> None:
    all_rows = build_constraints() + build_pairs() + build_programs() + build_memos()
    if len(all_rows) != 200:
        raise RuntimeError(f"Expected 200 release rows, found {len(all_rows)}")
    write_manifest(RELEASE / "manifest.jsonl", all_rows)
    example_rows = []
    for row in all_rows:
        if int(row["index"]) not in EXAMPLE_INDICES:
            continue
        example = dict(row)
        example["answer_sha256"] = sha256(RELEASE / row["answer_path"])
        example_rows.append(example)
    if len(example_rows) != 8:
        raise RuntimeError(f"Expected 8 GitHub examples, found {len(example_rows)}")
    write_manifest(RELEASE / "examples-manifest.jsonl", example_rows)
    release = {
        "benchmark": "LongHarness",
        "examples": len(example_rows),
        "examples_manifest_sha256": sha256(RELEASE / "examples-manifest.jsonl"),
        "instances": len(all_rows),
        "manifest_sha256": sha256(RELEASE / "manifest.jsonl"),
        "paper_task_names": {
            "constraint-solving-search": "Constraint Solving Search",
            "equivalent-program-pair-search": "Equivalent Program Pair Search",
            "outlier-memo-detection": "Outlier Memo Detection",
            "program-execution-tracing": "Program Execution Tracing",
        },
        "schema_version": 1,
        "sources": {
            "constraint-solving-search": "commonsense-constraints-v1-50",
            "equivalent-program-pair-search": "code-only-v3-screened-clarified-query-50",
            "outlier-memo-detection": ["v5.9.1", "v5.9.1.cont"],
            "program-execution-tracing": "notebook-export-v18-128k-python-50",
        },
        "tasks": 4,
        "task_manifest_sha256": {
            task: sha256(TASKS / task / "manifest.jsonl")
            for task in (
                "constraint-solving-search",
                "equivalent-program-pair-search",
                "outlier-memo-detection",
                "program-execution-tracing",
            )
        },
    }
    (RELEASE / "RELEASE.json").write_text(
        json.dumps(release, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    checksum_paths = [
        RELEASE / "manifest.jsonl",
        RELEASE / "examples-manifest.jsonl",
        RELEASE / "RELEASE.json",
    ]
    for task in sorted(release["paper_task_names"]):
        checksum_paths.append(TASKS / task / "manifest.jsonl")
        checksum_paths.extend(sorted((TASKS / task / "contexts").glob("*.md")))
        checksum_paths.extend(sorted((TASKS / task / "answers").glob("*.json")))
    (RELEASE / "DATA_CHECKSUMS.sha256").write_text(
        "".join(f"{sha256(path)}  {path.relative_to(RELEASE)}\n" for path in checksum_paths),
        encoding="utf-8",
    )
    print(json.dumps({"benchmark": "LongHarness", "instances": len(all_rows), "tasks": 4}))


if __name__ == "__main__":
    main()
