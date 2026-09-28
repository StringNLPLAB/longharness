# Constraint Solving Search

Each instance contains documents about 160 people and a query with three to
five conditions. Exactly five people satisfy every condition. Relevant facts
are scattered across documents and mixed with close counterexamples.

The prediction is a JSON object containing the sorted qualifying person IDs:
`{"matches": [...]}`. Exact accuracy compares the complete person-ID set. No
passage citations are requested or scored.
