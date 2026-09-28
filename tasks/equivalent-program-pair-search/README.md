# Equivalent Program Pair Search

Each instance contains 200 anonymous Python programs. The task is to identify
every disjoint pair implementing the same input-output specification, including
boundary and edge-case behavior. Similar-looking mutants create hard negative
candidates, while true pairs may use different implementation styles.

The prediction is a JSON array of integer pairs. Pair members and the outer list
must be sorted numerically. Primary exact accuracy requires the complete pair
set with no extras.
