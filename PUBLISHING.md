# Publishing LongHarness

This file tracks release operations. Replace placeholders only after the lab
has created the corresponding repositories.

## 1. GitHub Repository

Create a public repository named `longharness` under the `stringnlplab`
organization. Push the tracked contents of this directory there. The GitHub
repository should contain code, documentation, and the two examples per task;
the `.gitignore` intentionally excludes the remaining benchmark payload.

Do not initialize a nested Git repository here while this directory is still
managed by the ScaffoldingEval repository. Connect the new remote later using a
subtree split or export the tracked tree into a fresh clone.

## 2. Hugging Face Dataset

The dataset repository is
[`StringNLP/longharness`](https://huggingface.co/datasets/StringNLP/longharness).
It should contain the complete 200-instance release, including the full
manifests and `DATA_CHECKSUMS.sha256`.

Do not rely on Git staging from this directory for the Hugging Face upload:
the GitHub `.gitignore` deliberately excludes the full payload. Upload from a
clean staging directory created with:

```bash
python tools/stage_huggingface.py /tmp/longharness-hf
```

After creating the remote dataset repository, upload that staged directory:

```bash
hf upload StringNLP/longharness \
  --repo-type dataset \
  /tmp/longharness-hf
```

## 3. Project Website

The desired URL is:

```text
https://stringnlplab.github.io/longharness
```

This is a GitHub Pages project-site URL. It can be served directly from the
future `stringnlplab/longharness` repository; a separate
`stringnlplab.github.io` repository is not required. The static site source is
already under `docs/`. After the repository exists, configure GitHub Pages to
deploy from the `main` branch and `/docs` folder.

The draft website includes:

- benchmark and task overview;
- one visual example per task;
- paper and citation links;
- headline evaluation results;
- links to GitHub and Hugging Face.

## 4. Final Public-Release Checklist

- Select and add a license.
- Add `CITATION.cff` and the paper's BibTeX entry.
- Review the website and replace the paper placeholders in `README.md`.
- Enable GitHub Pages from the `main` branch and `/docs` folder.
- Verify the eight GitHub examples with `python tools/verify_release.py --examples`.
- Verify the staged Hugging Face snapshot with `python tools/verify_release.py`.
- Confirm that answer keys are not exposed to agents by the evaluation runner.
- Tag the same version on GitHub and Hugging Face.
