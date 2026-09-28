# Program Execution Tracing

Each instance contains 320 shuffled records of earlier Python computations and
one final eight-step query. For every query step, the solver must find the
semantically equivalent earlier function whose recorded call uses the required
input. Earlier outputs route later steps.

The structured prediction contains the final output under `answer` and the
eight supporting cell IDs under `evidence`. Primary exact accuracy requires both
the output and the exact supporting-cell set.
