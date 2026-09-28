---
pretty_name: LongHarness
language:
  - en
tags:
  - long-context
  - benchmark
  - language-model-agents
---

# LongHarness

LongHarness evaluates language-model harnesses on long-context tasks that
require retrieval, verification, and multi-step reasoning. It contains four
task suites and 200 evaluation instances.

## Links

- Project website: `https://stringnlplab.github.io/longharness` (planned)
- Full dataset: [StringNLP/longharness](https://huggingface.co/datasets/StringNLP/longharness) (private during preparation)
- Paper: forthcoming

The GitHub repository contains evaluation code, documentation, and two complete
examples from each task. The full benchmark, including all contexts, manifests,
and answer keys, will be distributed through Hugging Face.

## Tasks

| Task ID | Paper name | Full instances | GitHub examples |
|---|---|---:|---:|
| `constraint-solving-search` | Constraint Solving Search | 50 | 2 |
| `equivalent-program-pair-search` | Equivalent Program Pair Search | 50 | 2 |
| `program-execution-tracing` | Program Execution Tracing | 50 | 2 |
| `outlier-memo-detection` | Outlier Memo Detection | 50 | 2 |

Task-specific descriptions and response formats are under `tasks/<task>/`.

## Repository Contents

```text
README.md
RELEASE.json
examples-manifest.jsonl        # eight examples tracked by GitHub
score.py
docs/                          # GitHub Pages project site
tasks/
  <task>/
    README.md
    contexts/
      sample-00000.md          # tracked example
      sample-00001.md          # tracked example
    answers/
      sample-00000.json
      sample-00001.json
tools/
  stage_huggingface.py
  verify_release.py
```

The full Hugging Face snapshot additionally contains:

```text
manifest.jsonl                 # all 200 instances
DATA_CHECKSUMS.sha256
tasks/<task>/manifest.jsonl
tasks/<task>/contexts/         # 50 contexts per task
tasks/<task>/answers/          # 50 answer keys per task
```

Contexts are model-visible. Answer files must remain outside the agent's
workspace during evaluation.

## Getting the Data

The complete release is currently hosted in a private Hugging Face repository.
Authorized users can download it with:

```bash
hf download StringNLP/longharness \
  --repo-type dataset \
  --local-dir longharness
```

Users without access will receive a repository-not-found response until the
dataset is made public. The examples tracked in this repository remain
available for inspecting task formats and testing integrations.

### Dataset Viewer

The native Hugging Face Dataset Viewer is unavailable while the repository is
private under the current organization plan. Before public release, we plan to
add viewer-compatible Parquet tables with one configuration per task and a
`test` split, while retaining the raw benchmark files as the canonical
evaluation format.

## Verify the Data

The verifier automatically checks the full 200-instance release when
`manifest.jsonl` is available. In a GitHub-only checkout, it checks the eight
tracked examples instead.

```bash
python tools/verify_release.py
```

To explicitly check only the tracked examples:

```bash
python tools/verify_release.py --examples
```

## Submission Format

`score.py` accepts one JSON object per line with `task`, `index`, and
`prediction`. Predictions use these schemas:

- Constraint Solving Search: `{"matches": [...]}`
- Equivalent Program Pair Search: `[[cell_a, cell_b], ...]`
- Program Execution Tracing: `{"answer": {...}, "evidence": [...]}`
- Outlier Memo Detection: `["M-001", "M-002", ...]`

Score a full release with:

```bash
python score.py predictions.jsonl --output scores.json
```

Score only the GitHub examples with:

```bash
python score.py predictions.jsonl \
  --manifest examples-manifest.jsonl \
  --output scores.json
```

The primary metric is exact instance accuracy. The scorer also reports
answer-only accuracy for tasks whose required response includes provenance.

## Distribution

The repositories serve distinct roles:

- **GitHub:** code, documentation, issue tracking, and two examples per task.
- **Hugging Face:** the complete versioned dataset and answer keys.
- **Project website:** task overview, results, paper, and links to both repos.

The planned website URL does not require a separate organization homepage
repository. A repository named `longharness` under the `stringnlplab` GitHub
organization can publish a project site directly at
`https://stringnlplab.github.io/longharness` through GitHub Pages.

Maintainer instructions for creating the GitHub repository, staging the full
Hugging Face snapshot, and enabling the website are in `PUBLISHING.md`.

## Release Status

The data snapshot, scoring code, and static website source are prepared. Before
public release, review the website, add the final paper link, and add the
license, citation metadata, and viewer tables.
