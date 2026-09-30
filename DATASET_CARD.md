---
pretty_name: LongHarness
language:
  - en
multilinguality:
  - monolingual
size_categories:
  - n<1K
task_categories:
  - question-answering
  - text-classification
tags:
  - long-context
  - benchmark
  - language-model-agents
  - agent-evaluation
  - retrieval
  - reasoning
  - code
  - arxiv:2609.38137
---

# LongHarness Bench: Stress-Testing Language Model Harnesses for Long-Context Reasoning

LongHarness evaluates how language-model harnesses access and reason over long
contexts. It is designed to distinguish context-access strategies, including
direct reading, lexical and semantic retrieval, iterative agents, and recursive
language-model harnesses. The benchmark contains 200 evaluation instances
across four task suites.

- [Project website](https://stringnlplab.github.io/longharness/)
- [Paper](https://arxiv.org/abs/2609.38137)
- [GitHub repository](https://github.com/StringNLPLAB/longharness)

## Benchmark Tasks

| Task | Context | Required output | Instances |
|---|---|---|---:|
| Constraint Solving Search | Documents about 160 people and a query containing three to five conditions | The five person IDs satisfying every condition | 50 |
| Equivalent Program Pair Search | 200 anonymous Python programs with semantically confusable mutants | Every semantically equivalent program pair | 50 |
| Program Execution Tracing | 320 shuffled computation cells and an eight-step final query | The final structured result and eight supporting cell IDs | 50 |
| Outlier Memo Detection | 700 memos containing 2,500 statements | The 15 memo IDs containing conflicting claims | 50 |

Every task uses exact instance accuracy. Partial outputs, missing items, and
extra items are incorrect under the primary metric. Program Execution Tracing
also reports answer-only accuracy as an auxiliary metric.

## Download

LongHarness is distributed as raw Markdown contexts, JSON answer keys, and
JSONL manifests. Download the complete repository snapshot with:

```bash
hf download StringNLP/longharness \
  --repo-type dataset \
  --local-dir longharness
```

This release is not packaged as a row-oriented `datasets.Dataset`. Preserving
the original context documents and keeping answer keys outside the agent's
workspace are part of the evaluation protocol.

## Repository Structure

```text
README.md
RELEASE.json
DATA_CHECKSUMS.sha256
manifest.jsonl
score.py
tools/verify_release.py
tasks/
  <task-id>/
    README.md
    manifest.jsonl
    contexts/sample-00000.md
    answers/sample-00000.json
```

The root manifest contains all 200 instances. Each row identifies the task,
instance index, context path, answer path, context byte count, and SHA-256
digest. Task manifests may include additional task-specific statistics.

## Evaluation Protocol

Expose only the selected context and task instruction to the evaluated system.
Do not expose `answers/`, manifests containing answer paths, the scorer, or
other instances from the repository. Answer files are public for reproducible
scoring, so results should be treated as benchmark evaluation rather than
closed-test assessment.

Predictions are JSON Lines records with `task`, `index`, and `prediction`:

```json
{"task":"constraint-solving-search","index":0,"prediction":{"matches":["P-018","P-076","P-096","P-101","P-155"]}}
```

The prediction value has a task-specific schema:

- Constraint Solving Search: `{"matches": [...]}`
- Equivalent Program Pair Search: `[[cell_a, cell_b], ...]`
- Program Execution Tracing: `{"answer": {...}, "evidence": [...]}`
- Outlier Memo Detection: `["M-001", "M-002", ...]`

Run the official scorer from the downloaded snapshot:

```bash
cd longharness
python score.py predictions.jsonl --output scores.json
```

The scorer reports exact and answer-only accuracy per task, plus macro-average
exact accuracy across the four task suites.

## Integrity Check

Validate all manifests, files, checksums, and task counts before evaluation:

```bash
cd longharness
python tools/verify_release.py
```

`DATA_CHECKSUMS.sha256` and the digests in `RELEASE.json` provide additional
snapshot-level integrity information.

## Construction

Each instance is generated from a hidden structured specification before its
public context is rendered. The specification is a predicate world, relation
graph, computation graph, or executable program family, depending on the task.
A task-specific solver computes the gold answer, controlled mutations create
hard distractors, and deterministic validators recompute the answer and verify
the intended role of every required item.

Equivalent Program Pair Search is adapted from standard-input APPS problems.
Its answer keys represent agreement over the retained valid-input test suites
and additional checks; they are not formal proofs of equivalence over arbitrary
Python inputs.

## Intended Use

LongHarness is intended for evaluating the accuracy and efficiency of systems
that process long contexts, especially agent harnesses and retrieval-augmented
reasoning systems. It is not intended as a training corpus, a measure of general
intelligence, or a substitute for evaluation on natural user workloads.

When reporting results, include the model, harness, task-level exact accuracy,
macro-average exact accuracy, token accounting method, and execution-cost
assumptions. Harness configurations and tool access can materially affect both
accuracy and cost.

## Limitations

- The benchmark contains constructed evaluation environments rather than
  naturally occurring user sessions.
- It covers English documents and Python programs only.
- Exact-set scoring can understate progress on partially correct responses.
- Public answer keys make contamination possible; do not use this release for
  training or expose answer-bearing files during inference.
- Program equivalence is validated behaviorally over explicit input contracts
  and tests, not proven for every possible Python object.
- Performance on these 200 instances should not be interpreted as a complete
  measure of long-context capability.

## Citation

Please cite the LongHarness Bench paper:

```bibtex
@misc{pham2026longharness,
  title  = {{LongHarness Bench}: Stress-Testing Language Model Harnesses for Long-Context Reasoning},
  author = {Pham, Quang Hieu and Nguyen, Thuy Duong and Chen, Jocelyn Qiaochu and Ye, Xi},
  year   = {2026},
  eprint = {2609.38137},
  archivePrefix = {arXiv},
  primaryClass = {cs.CL},
  url    = {https://arxiv.org/abs/2609.38137}
}
```
