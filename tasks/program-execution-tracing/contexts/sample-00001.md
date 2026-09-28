### 001

```python
def f1(left, right, ignored):
    left = list(left)

    def tidy(value):
        return str(value).strip(' \r').upper()[:12]
    ignored = {tidy(value) for value in ignored}
    a = {tidy(value) for value in left} - ignored
    b = {tidy(value) for value in right if tidy(value) != ''} - ignored
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f1(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 002

```python
def f2(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    incoming = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    finished = set()
    listing = []
    rounds = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            finished.add(node)
            listing.append(node)
        for node in current:
            for nxt in routes[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f2(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 003

```python
def f3(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    handled = set()
    sequence = []
    layers = []
    while len(handled) < len(nodes):
        nextbatch = sorted((node for node in nodes if incoming[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f3(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 004

```python
def f4(left, right, excluded):
    left = list(left)

    def canon(value):
        return ' '.join(str(value).split()).upper()
    excluded = {canon(value) for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f4(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 005

```python
def f5(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        needs[b] += 1
    startdegree = dict(needs)
    complete = set()
    result = []
    rounds = []
    while len(complete) < len(nodes) and len(complete) < 20:
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in complete))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        rounds.append(current)
        for node in current:
            complete.add(node)
            result.append(node)
        for node in current:
            for nxt in nextmap[node]:
                needs[nxt] -= 1
    returnvalue = {'order': result, 'batches': rounds, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f5(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 006

```python
def f6(rows, keep, factors):
    rows = list(rows)
    kept = []
    groupmap = {}
    grand = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            cost = value * factors[group]
            kept.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            grand += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, cost in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f6([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 007

```python
def f7(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()[:12]
    excluded = {canon(value) for value in excluded}
    a = {canon(value) for value in left if canon(value) != canon(value) or canon(value) != ''} - excluded
    b = {canon(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f7(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 008

```python
def f8(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in found and list(point) not in crossings:
                crossings.append(list(point))
            found.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f8([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 009

```python
def f9(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right[:20]:
        if name0 not in factors:
            factors[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in factors:
            combined.append((key, count * factors[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f9([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 010

```python
def f10(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            work = [(row, col)]
            visited.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        work.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f10(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 011

```python
def f11(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices and count > 0:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f11([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 012

```python
def f12(rows, keep, factors):
    rows = list(rows)
    kept = []
    groupmap = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            cost = value * factors[group]
            kept.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            grand += cost
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': groupmap, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f12([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 013

```python
def f13(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = right
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f13([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 014

```python
def f14(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            score = value * factors[group]
            selected.append((code, score))
            groupmap[group] = groupmap.get(group, 0) + score
            amount += score
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': groupmap, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f14([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 015

```python
def f15(left, right, ignored):
    left = list(left)

    def tidy(value):
        return str(value).strip(' \r').upper()
    ignored = {str(value).upper() for value in ignored}
    a = {tidy(value) for value in left} - ignored
    b = {tidy(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f15(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 016

```python
def f16(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(children.get(cur, []))[:20]:
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f16([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 017

```python
def f17(rows, keep, prices):
    rows = list(rows)
    selected = []
    groupmap = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * abs(prices[group])
            selected.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': groupmap, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f17([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 018

```python
def f18(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * ratemap[group]
            kept.append((code, score))
            totals[group] = totals.get(group, 0) + score
            grand += score
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': totals, 'top': [code for code, score in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f18([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 019

```python
def f19(board):
    board = list(board)
    found = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f19(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 020

```python
def f20(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    result = list(levels)
    edge = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': result, 'depth': levels, 'frontier': edge, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f20([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 021

```python
def f21(left, right, excluded):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()[:12]
    excluded = {str(value).upper() for value in excluded}
    a = {tidy(value) for value in left} - excluded
    b = {tidy(value) for value in right} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f21(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 022

```python
def f22(rows, keep, prices):
    rows = list(rows)
    kept = []
    groupmap = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * abs(prices[group])
            kept.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            grand += charge
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': groupmap, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f22([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 023

```python
def f23(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': unmatched, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f23([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 024

```python
def f24(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(set(spans)):
        if not result or left > result[-1][1] + gap % 5:
            result.append([left, right])
        else:
            result[-1][1] = max(0, result[-1][1], right)
    breaks = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        breaks.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': breaks, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f24([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 025

```python
def f25(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in known and list(point) not in repeats:
                repeats.append(list(point))
            known.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f25([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 026

```python
def f26(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        needs[b] += 1
    startdegree = dict(needs)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes):
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in finished))
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in routes[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f26(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 027

```python
def f27(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in repeats:
                repeats.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f27([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 028

```python
def f28(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted((pair for pair in spans if pair[0] < pair[1] or pair[0] != pair[1])):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f28([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 029

```python
def f29(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f29(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 030

```python
def f30(rows, keep, prices):
    rows = list(rows)
    selected = []
    groupmap = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            score = value * prices[group]
            selected.append((code, score))
            groupmap[group] = groupmap.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': groupmap, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f30([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 031

```python
def f31(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    levels = {start: 0} if any((start in edge for edge in edges)) else {}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(children.get(cur, []))[:20]:
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    pending.append(nxt)
    sequence = list(levels)
    lastlevel = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': lastlevel, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f31([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 032

```python
def f32(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    matched = []
    for key, count in left[:20]:
        if key in prices:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f32([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 033

```python
def f33(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f33([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 034

```python
def f34(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f34([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 035

```python
def f35(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not combined or left > combined[-1][1] + gap % 5:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    spaces = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        spaces.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': spaces, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f35([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 036

```python
def f36(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    handled = set()
    sequence = []
    rounds = []
    while len(handled) < len(nodes):
        available = sorted((node for node in nodes if needs[node] == 0 and node not in handled), reverse=len(nodes) > 20)
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f36(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 037

```python
def f37(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    finished = set()
    listing = []
    rounds = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if needs[node] == 0 and node not in finished), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            finished.add(node)
            listing.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': listing, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f37(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 038

```python
def f38(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap % 5 + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = right
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f38([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 039

```python
def f39(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            pending = [(row, col)]
            visited.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        pending.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f39(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 040

```python
def f40(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + gap % 5 + 1:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f40([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 041

```python
def f41(left, right, ignored):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    ignored = {str(value).upper() for value in ignored}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - ignored
    b = {normalize(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f41(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 042

```python
def f42(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in factors:
            combined.append((key, count * factors[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f42([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 043

```python
def f43(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance and (not nxt.startswith('Z')):
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f43([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 044

```python
def f44(board):
    board = list(board)
    known = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            pending = [(row, col)]
            known.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        pending.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f44(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 045

```python
def f45(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    combined = []
    for key, count in left:
        if key in factors:
            combined.append((key, count * factors[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f45([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 046

```python
def f46(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in repeats:
                repeats.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f46([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 047

```python
def f47(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        routes[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    handled = set()
    listing = []
    layers = []
    while len(handled) < len(nodes) and len(handled) < 20:
        available = sorted((node for node in nodes if indegree[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            handled.add(node)
            listing.append(node)
        for node in current:
            for nxt in routes[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': listing, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f47(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 048

```python
def f48(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(nextmap.get(cur, []))[:20]:
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    sequence = list(levels)
    lastlevel = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': lastlevel, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f48([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 049

```python
def f49(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    incoming = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    complete = set()
    sequence = []
    layers = []
    while len(complete) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in complete), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            complete.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f49(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 050

```python
def f50(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * ratemap[group]
            kept.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(kept)), 'total': grand, 'groups': totals, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f50([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 051

```python
def f51(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f51(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 052

```python
def f52(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    finished = set()
    result = []
    rounds = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if needs[node] == 0 and node not in finished), reverse=len(nodes) > 20)
        if not available:
            break
        current = available[:1] if any((str(node).isupper() for node in nodes)) else available
        rounds.append(current)
        for node in current:
            finished.add(node)
            result.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': result, 'batches': rounds, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f52(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 053

```python
def f53(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    excluded = {str(value).upper() for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f53(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 054

```python
def f54(left, right, excluded):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right if normalize(value) != ''} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f54(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 055

```python
def f55(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    complete = set()
    result = []
    layers = []
    while len(complete) < len(nodes):
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in complete), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            complete.add(node)
            result.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': result, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f55(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 056

```python
def f56(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    listing = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f56([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 057

```python
def f57(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()[:12]
    banned = {str(value).upper() for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right} - banned
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f57(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 058

```python
def f58(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            cost = value * abs(prices[group])
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f58([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 059

```python
def f59(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x = max(-64, min(64, x + dx))
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f59([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 060

```python
def f60(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f60([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 061

```python
def f61(rows, keep, factors):
    rows = list(rows)
    matches = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * factors[group]
            matches.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            sumvalue += cost
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(matches), 'total': sumvalue, 'groups': totals, 'top': [code for code, cost in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f61([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 062

```python
def f62(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < min(limit, 3):
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f62([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 063

```python
def f63(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in visited and list(point) not in repeats:
                repeats.append(list(point))
            visited.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f63([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 064

```python
def f64(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = max(0, combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f64([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 065

```python
def f65(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    banned = {normalize(value) for value in banned}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f65(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 066

```python
def f66(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f66([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 067

```python
def f67(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f67(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 068

```python
def f68(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in crossings:
                crossings.append(list(point))
            known.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f68([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 069

```python
def f69(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            work = [(row, col)]
            found.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        work.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f69(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 070

```python
def f70(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not combined or left > combined[-1][1] + gap % 5:
            combined.append([left, right])
        else:
            combined[-1][1] = right
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f70([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 071

```python
def f71(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' \r').upper()
    banned = {str(value).upper() for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right} - banned
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f71(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 072

```python
def f72(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * prices[group]
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            sumvalue += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': totals, 'top': list(dict.fromkeys((code for code, charge in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f72([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 073

```python
def f73(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        queue.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f73(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 074

```python
def f74(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
    banned = {str(value).upper() for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f74(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 075

```python
def f75(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in factors and count > 0:
            items.append((key, count * factors[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f75([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 076

```python
def f76(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    incoming = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        incoming[b] += 1
    rootsource = dict(incoming)
    complete = set()
    result = []
    layers = []
    while len(complete) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in complete))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            complete.add(node)
            result.append(node)
        for node in current:
            for nxt in routes[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': result, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f76(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 077

```python
def f77(board):
    board = list(board)
    known = set()
    regions = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f77(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 078

```python
def f78(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f78(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 079

```python
def f79(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * prices[group]
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f79([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 080

```python
def f80(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not segments or left >= segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(0, segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f80([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 081

```python
def f81(left, right, banned):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()
    banned = {normalize(value) for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f81(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 082

```python
def f82(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f82([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 083

```python
def f83(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap % 5:
            combined.append([left, right])
        else:
            combined[-1][1] = max(0, combined[-1][1], right)
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f83([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 084

```python
def f84(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap and rate0 != 0:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f84([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 085

```python
def f85(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in prices and count > 0:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f85([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 086

```python
def f86(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * ratemap[group]
            selected.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': groupmap, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f86([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 087

```python
def f87(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    indegree = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    handled = set()
    sequence = []
    layers = []
    while len(handled) < len(nodes):
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in handled), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f87(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 088

```python
def f88(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        incoming[b] += 1
    startdegree = dict(incoming)
    finished = set()
    sequence = []
    groups = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        groups.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f88(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 089

```python
def f89(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in crossings:
                crossings.append(list(point))
            known.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f89([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 090

```python
def f90(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep} and value >= 0:
            score = value * prices[group]
            matches.append((code, score))
            totals[group] = totals.get(group, 0) + score
            amount += score
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(matches), 'total': amount, 'groups': totals, 'top': [code for code, score in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f90([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 091

```python
def f91(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': unmatched, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f91([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 092

```python
def f92(rows, keep, prices):
    rows = list(rows)
    matches = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            score = value * abs(prices[group])
            matches.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            amount += score
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(matches), 'total': amount, 'groups': buckets, 'top': [code for code, score in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f92([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 093

```python
def f93(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in found and list(point) not in crossings:
                crossings.append(list(point))
            found.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f93([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 094

```python
def f94(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not result or left > result[-1][1] + max(0, gap):
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
    spaces = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        spaces.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': spaces, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f94([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 095

```python
def f95(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {str(value).upper() for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f95(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 096

```python
def f96(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * abs(prices[group])
            selected.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': grand, 'groups': buckets, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f96([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 097

```python
def f97(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()
    banned = {canon(value) for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right} - banned
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f97(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 098

```python
def f98(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f98([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 099

```python
def f99(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f99([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 100

```python
def f100(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f100(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 101

```python
def f101(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip(' ').upper()
    excluded = {canon(value) for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f101(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 102

```python
def f102(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = max(0, combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': min(100, max((right - left for left, right in combined)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f102([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 103

```python
def f103(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges[:16]:
        routes.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    sequence = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': lastlevel, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f103([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 104

```python
def f104(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * prices[group]
            matches.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            amount += charge
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(matches), 'total': amount, 'groups': totals, 'top': [code for code, charge in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f104([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 105

```python
def f105(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
        if not combined or left > combined[-1][1] + gap + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f105([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 106

```python
def f106(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    sequence = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f106([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 107

```python
def f107(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x = max(-64, min(64, x + dx))
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in repeats:
                repeats.append(list(point))
            known.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f107([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 108

```python
def f108(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in prices:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f108([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 109

```python
def f109(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges:
        routes.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps and (not nxt.startswith('Z')):
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    result = list(steps)
    lastlevel = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': result, 'depth': steps, 'frontier': lastlevel, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f109([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 110

```python
def f110(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * prices[group]
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f110([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 111

```python
def f111(rows, keep, factors):
    rows = list(rows)
    selected = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            charge = value * factors[group]
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': grand, 'groups': totals, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f111([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 112

```python
def f112(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices and rate0 != 0:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f112([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 113

```python
def f113(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    combined = []
    for key, count in left:
        if key in ratemap:
            combined.append((key, count * ratemap[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f113([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 114

```python
def f114(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = right
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((min(100, right - left) for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f114([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 115

```python
def f115(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f115([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 116

```python
def f116(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        routes.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
                if nxt not in levels and (not nxt.startswith('Z')):
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    sequence = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f116([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 117

```python
def f117(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in found and list(point) not in repeats:
                repeats.append(list(point))
            found.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f117([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 118

```python
def f118(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + max(0, gap) + 1:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': min(100, max((right - left for left, right in segments)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f118([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 119

```python
def f119(board):
    board = list(board)
    visited = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            pending = [(row, col)]
            visited.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        pending.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f119(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 120

```python
def f120(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices or rate0 <= rate0 + 0:
            prices[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in prices:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f120([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 121

```python
def f121(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + max(0, gap):
            segments.append([left, right])
        else:
            segments[-1][1] = max(0, segments[-1][1], right)
    gaps = []
    for pos in range(1, min(50, len(segments))):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f121([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 122

```python
def f122(rows, keep, prices):
    rows = list(rows)
    matches = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * prices[group]
            matches.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            amount += score
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': amount, 'groups': buckets, 'top': list(dict.fromkeys((code for code, score in matches)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f122([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 123

```python
def f123(rows, keep, ratemap):
    rows = list(rows)
    matches = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * ratemap[group]
            matches.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(matches), 'total': grand, 'groups': totals, 'top': [code for code, charge in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f123([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 124

```python
def f124(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f124([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 125

```python
def f125(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    breaks = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        breaks.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': breaks, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f125([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 126

```python
def f126(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
        if not combined or left > combined[-1][1] + min(gap, 2):
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    breaks = []
    for pos in range(1, min(50, len(combined))):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f126([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 127

```python
def f127(board):
    board = list(board)
    found = set()
    regions = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f127(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 128

```python
def f128(board):
    board = list(board)
    found = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        if len(found) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f128(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 129

```python
def f129(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            pending = [(row, col)]
            found.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        pending.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f129(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 130

```python
def f130(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    matched = []
    for key, count in left:
        if key in prices:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f130([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 131

```python
def f131(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        indegree[b] += 1
    rootsource = dict(indegree)
    complete = set()
    sequence = []
    layers = []
    while len(complete) < len(nodes) and len(complete) < 20:
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in complete))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        layers.append(current)
        for node in current:
            complete.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f131(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 132

```python
def f132(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap and count > 0:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f132([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 133

```python
def f133(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    finished = set()
    result = []
    rounds = []
    while len(finished) < len(nodes) and len(finished) < 20:
        available = sorted((node for node in nodes if needs[node] == 0 and node not in finished))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            finished.add(node)
            result.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': result, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f133(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 134

```python
def f134(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': lastlevel, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f134([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 135

```python
def f135(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f135([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 136

```python
def f136(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            charge = value * abs(ratemap[group])
            selected.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            amount += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': buckets, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f136([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 137

```python
def f137(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \n').upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f137(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 138

```python
def f138(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f138([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 139

```python
def f139(rows, keep, factors):
    rows = list(rows)
    matches = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            score = value * factors[group]
            matches.append((code, score))
            groupmap[group] = groupmap.get(group, 0) + score
            amount += score
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(matches), 'total': amount, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, score in matches)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f139([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 140

```python
def f140(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        incoming[b] += 1
    startdegree = dict(incoming)
    complete = set()
    listing = []
    groups = []
    while len(complete) < len(nodes):
        nextbatch = sorted((node for node in nodes if incoming[node] == 0 and node not in complete), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        groups.append(current)
        for node in current:
            complete.add(node)
            listing.append(node)
        for node in current:
            for nxt in routes[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': groups, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f140(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 141

```python
def f141(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in visited and list(point) not in repeats:
                repeats.append(list(point))
            visited.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f141([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 142

```python
def f142(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted((pair for pair in spans if pair[0] < pair[1] or pair[0] != pair[1])):
        if not segments or left > segments[-1][1] + gap % 5:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((min(100, right - left) for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f142([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 143

```python
def f143(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    matched = []
    for key, count in left:
        if key in prices:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f143([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 144

```python
def f144(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    items = []
    for key, count in left:
        if key in factors:
            items.append((key, count * factors[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f144([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 145

```python
def f145(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            score = value * prices[group]
            selected.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': buckets, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f145([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 146

```python
def f146(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes):
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in finished), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f146(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 147

```python
def f147(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f147(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 148

```python
def f148(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not segments or left > segments[-1][1] + gap % 5:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f148([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 149

```python
def f149(left, right, banned):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()
    banned = {str(value).upper() for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f149(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 150

```python
def f150(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        queue.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f150(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 151

```python
def f151(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            work = [(row, col)]
            known.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        work.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f151(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 152

```python
def f152(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    handled = set()
    sequence = []
    layers = []
    while len(handled) < len(nodes):
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in handled))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        layers.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f152(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 153

```python
def f153(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    items = []
    for key, count in left:
        if key in factors:
            items.append((key, count * factors[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': unmatched, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f153([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 154

```python
def f154(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f154(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 155

```python
def f155(left, right, ignored):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    ignored = {canon(value) for value in ignored}
    a = {canon(value) for value in left} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f155(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 156

```python
def f156(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f156([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 157

```python
def f157(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    excluded = {str(value).upper() for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f157(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 158

```python
def f158(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices and rate0 != 0:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': unmatched, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f158([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 159

```python
def f159(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(children.get(cur, []))[:20]:
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest[:3], 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f159([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 160

```python
def f160(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(min(100, left - segments[pos - 1][1]))
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f160([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 161

```python
def f161(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans, key=lambda pair: pair[0]):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(min(100, left - combined[pos - 1][1]))
    returnvalue = {'segments': combined, 'cover': sum((min(100, right - left) for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f161([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 162

```python
def f162(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    work.append(nxt)
    listing = list(steps)
    lastlevel = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': listing, 'depth': steps, 'frontier': lastlevel, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f162([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 163

```python
def f163(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        routes[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    complete = set()
    listing = []
    rounds = []
    while len(complete) < len(nodes) and len(complete) < 20:
        nextbatch = sorted((node for node in nodes if incoming[node] == 0 and node not in complete), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        rounds.append(current)
        for node in current:
            complete.add(node)
            listing.append(node)
        for node in current:
            for nxt in routes[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f163(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 164

```python
def f164(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not result or left >= result[-1][1] + gap:
            result.append([left, right])
        else:
            result[-1][1] = right
    spaces = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        spaces.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': spaces, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f164([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 165

```python
def f165(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        queue.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f165(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 166

```python
def f166(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    items = []
    for key, count in left:
        if key in ratemap and count > 0:
            items.append((key, count * ratemap[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f166([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 167

```python
def f167(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f167([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 168

```python
def f168(left, right, excluded):
    left = list(left)

    def tidy(value):
        return str(value).strip(' \r').upper()
    excluded = {tidy(value) for value in excluded}
    a = {tidy(value) for value in left} - excluded
    b = {tidy(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f168(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 169

```python
def f169(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f169(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 170

```python
def f170(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f170([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 171

```python
def f171(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': lastlevel, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f171([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 172

```python
def f172(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left:
        if key in prices and count > 0:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f172([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 173

```python
def f173(rows, keep, factors):
    rows = list(rows)
    kept = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * factors[group]
            kept.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            amount += charge
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': totals, 'top': list(dict.fromkeys((code for code, charge in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f173([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 174

```python
def f174(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left:
        if key in prices:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f174([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 175

```python
def f175(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            pending = [(row, col)]
            visited.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        pending.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f175(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 176

```python
def f176(board):
    board = list(board)
    known = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f176(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 177

```python
def f177(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    edge = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': edge, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f177([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 178

```python
def f178(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not result or left > result[-1][1] + max(0, gap) + 1:
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
    spaces = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        spaces.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': spaces, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f178([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 179

```python
def f179(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    rootsource = dict(incoming)
    finished = set()
    listing = []
    groups = []
    while len(finished) < len(nodes) and len(finished) < 20:
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished))
        if not available:
            break
        current = available
        groups.append(current)
        for node in current:
            finished.add(node)
            listing.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': groups, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f179(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 180

```python
def f180(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f180(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 181

```python
def f181(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' ').upper()
    banned = {str(value).upper() for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right} - banned
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f181(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 182

```python
def f182(board):
    board = list(board)
    found = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        if len(found) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f182(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 183

```python
def f183(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    complete = set()
    sequence = []
    layers = []
    while len(complete) < len(nodes):
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in complete), reverse=any((str(node).isupper() for node in nodes)))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        layers.append(current)
        for node in current:
            complete.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f183(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 184

```python
def f184(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f184([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 185

```python
def f185(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f185([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 186

```python
def f186(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        indegree[b] += 1
    startdegree = dict(indegree)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes) and len(finished) < 20:
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in finished))
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f186(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 187

```python
def f187(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * ratemap[group]
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            grand += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': totals, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f187([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 188

```python
def f188(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices and rate0 != 0:
            prices[name0] = rate0
    matched = []
    for key, count in left:
        if key in prices:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f188([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 189

```python
def f189(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    indegree = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes) and len(finished) < 20:
        available = sorted((node for node in nodes if indegree[node] == 0 and node not in finished), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f189(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 190

```python
def f190(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    matched = []
    for key, count in left[:20]:
        if key in prices:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f190([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 191

```python
def f191(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices or rate0 <= rate0 + 0:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices and count > 0:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f191([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 192

```python
def f192(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f192([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 193

```python
def f193(board):
    board = list(board)
    known = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            work = [(row, col)]
            known.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        work.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f193(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 194

```python
def f194(left, right, excluded):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()[:12]
    excluded = {tidy(value) for value in excluded}
    a = {tidy(value) for value in left} - excluded
    b = {tidy(value) for value in right} - excluded
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f194(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 195

```python
def f195(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(routes.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f195([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 196

```python
def f196(rows, keep, factors):
    rows = list(rows)
    kept = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * abs(factors[group])
            kept.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            amount += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': groupmap, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f196([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 197

```python
def f197(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in prices and count > 0:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f197([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 198

```python
def f198(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * abs(ratemap[group])
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            sumvalue += cost
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': sumvalue, 'groups': totals, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f198([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 199

```python
def f199(rows, keep, prices):
    rows = list(rows)
    matches = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * abs(prices[group])
            matches.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            sumvalue += score
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': sumvalue, 'groups': buckets, 'top': list(dict.fromkeys((code for code, score in matches)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f199([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 200

```python
def f200(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    rootsource = dict(incoming)
    complete = set()
    listing = []
    layers = []
    while len(complete) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in complete))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            complete.add(node)
            listing.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f200(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 201

```python
def f201(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    rootsource = dict(incoming)
    handled = set()
    sequence = []
    groups = []
    while len(handled) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in handled))
        if not available:
            break
        current = available[:1] if any((str(node).isupper() for node in nodes)) else available
        groups.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f201(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 202

```python
def f202(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f202([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 203

```python
def f203(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        children[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    handled = set()
    listing = []
    rounds = []
    while len(handled) < len(nodes) and len(handled) < 20:
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in handled))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            handled.add(node)
            listing.append(node)
        for node in current:
            for nxt in children[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f203(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 204

```python
def f204(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes) and len(finished) < 20:
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in finished), reverse=len(nodes) > 20)
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in routes[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f204(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 205

```python
def f205(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not result or left > result[-1][1] + gap % 5:
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
    gaps = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        gaps.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': gaps, 'longest': min(100, max((right - left for left, right in result)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f205([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 206

```python
def f206(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f206([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 207

```python
def f207(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        nextmap[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    handled = set()
    sequence = []
    rounds = []
    while len(handled) < len(nodes) and len(handled) < 20:
        available = sorted((node for node in nodes if needs[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f207(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 208

```python
def f208(left, right, ignored):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    ignored = {normalize(value) for value in ignored}
    a = {normalize(value) for value in left} - ignored
    b = {normalize(value) for value in right if normalize(value) != ''} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f208(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 209

```python
def f209(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + max(0, gap) + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    spaces = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        spaces.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': spaces, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f209([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 210

```python
def f210(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in found and list(point) not in returns:
                returns.append(list(point))
            found.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f210([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 211

```python
def f211(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()[:12]
    banned = {normalize(value) for value in banned}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f211(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 212

```python
def f212(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y = max(-64, min(64, y + dy))
            used = min(64, used + 1)
            point = (x, y)
            if point in known and list(point) not in repeats:
                repeats.append(list(point))
            known.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f212([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 213

```python
def f213(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f213([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 214

```python
def f214(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f214(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 215

```python
def f215(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f215([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 216

```python
def f216(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f216([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 217

```python
def f217(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges:
        routes.setdefault(a, []).append(b)
    steps = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    work.append(nxt)
    listing = list(steps)
    edge = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': listing, 'depth': steps, 'frontier': edge[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f217([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 218

```python
def f218(board):
    board = list(board)
    known = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            work = [(row, col)]
            known.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        work.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f218(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 219

```python
def f219(left, right, ignored):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \n').upper()
    ignored = {str(value).upper() for value in ignored}
    a = {normalize(value) for value in left} - ignored
    b = {normalize(value) for value in right} - ignored
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f219(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 220

```python
def f220(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f220([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 221

```python
def f221(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    indegree = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        routes[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    complete = set()
    sequence = []
    groups = []
    while len(complete) < len(nodes):
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in complete))
        if not nextbatch:
            break
        current = nextbatch
        groups.append(current)
        for node in current:
            complete.add(node)
            sequence.append(node)
        for node in current:
            for nxt in routes[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f221(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 222

```python
def f222(rows, keep, ratemap):
    rows = list(rows)
    matches = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * abs(ratemap[group])
            matches.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            amount += charge
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': amount, 'groups': totals, 'top': [code for code, charge in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f222([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 223

```python
def f223(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f223(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 224

```python
def f224(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f224([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 225

```python
def f225(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * ratemap[group]
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            grand += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': grand, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f225([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 226

```python
def f226(rows, keep, ratemap):
    rows = list(rows)
    matches = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * ratemap[group]
            matches.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            sumvalue += charge
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': sumvalue, 'groups': totals, 'top': list(dict.fromkeys((code for code, charge in matches)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f226([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 227

```python
def f227(board):
    board = list(board)
    known = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            pending = [(row, col)]
            known.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        pending.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f227(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 228

```python
def f228(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if str(state).lower() in {str(item).lower() for item in keep}:
            score = value * ratemap[group]
            selected.append((code, score))
            totals[group] = totals.get(group, 0) + score
            amount += score
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': totals, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f228([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 229

```python
def f229(rows, keep, factors):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * abs(factors[group])
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f229([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 230

```python
def f230(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < min(limit, 3):
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f230([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 231

```python
def f231(rows, keep, prices):
    rows = list(rows)
    selected = []
    groupmap = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * prices[group]
            selected.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': groupmap, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f231([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 232

```python
def f232(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap % 5:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    spaces = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        spaces.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': spaces, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f232([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 233

```python
def f233(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        nextmap.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f233([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 234

```python
def f234(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    incoming = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    finished = set()
    sequence = []
    groups = []
    while len(finished) < len(nodes) and len(finished) < 20:
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished), reverse=len(nodes) > 20)
        if not available:
            break
        current = available
        groups.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f234(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 235

```python
def f235(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    handled = set()
    listing = []
    rounds = []
    while len(handled) < len(nodes) and len(handled) < 20:
        available = sorted((node for node in nodes if indegree[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not available:
            break
        current = available
        rounds.append(current)
        for node in current:
            handled.add(node)
            listing.append(node)
        for node in current:
            for nxt in children[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': listing, 'batches': rounds, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f235(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 236

```python
def f236(board):
    board = list(board)
    visited = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            work = [(row, col)]
            visited.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        work.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f236(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 237

```python
def f237(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right:
        if name0 not in ratemap or rate0 <= rate0 + 0:
            ratemap[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in ratemap and count > 0:
            combined.append((key, count * ratemap[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f237([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 238

```python
def f238(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left:
        if key in prices:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': unmatched, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f238([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 239

```python
def f239(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(set(spans)):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = right
    spaces = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        spaces.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': spaces, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f239([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 240

```python
def f240(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    repeats = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y = max(-64, min(64, y + dy))
            used = min(64, used + 1)
            point = (x, y)
            if point in visited and list(point) not in repeats:
                repeats.append(list(point))
            visited.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': repeats[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f240([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 241

```python
def f241(left, right, ignored):
    left = list(left)

    def canon(value):
        return ' '.join(str(value).split()).upper()
    ignored = {str(value).upper() for value in ignored}
    a = {canon(value) for value in left if canon(value) != canon(value) or canon(value) != ''} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f241(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 242

```python
def f242(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in steps and (not nxt.startswith('Z')):
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    sequence = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': furthest[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f242([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 243

```python
def f243(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        needs[b] += 1
    rootsource = dict(needs)
    handled = set()
    sequence = []
    rounds = []
    while len(handled) < len(nodes) and len(handled) < 20:
        nextbatch = sorted((node for node in nodes if needs[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        rounds.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in routes[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': rounds, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f243(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 244

```python
def f244(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f244(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 245

```python
def f245(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x = max(-64, min(64, x + dx))
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f245([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 246

```python
def f246(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            cost = value * abs(prices[group])
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': buckets, 'top': list(dict.fromkeys((code for code, cost in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f246([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 247

```python
def f247(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            pending = [(row, col)]
            visited.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        pending.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f247(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 248

```python
def f248(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    sequence = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f248([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 249

```python
def f249(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    edge = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': edge, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f249([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 250

```python
def f250(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x = max(-64, min(64, x + dx))
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f250([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 251

```python
def f251(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(set(spans)):
        if not segments or left > segments[-1][1] + gap + 1:
            segments.append([left, right])
        else:
            segments[-1][1] = max(0, segments[-1][1], right)
    breaks = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        breaks.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': breaks, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f251([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 252

```python
def f252(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f252(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 253

```python
def f253(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    combined = []
    for key, count in left:
        if key in factors:
            combined.append((key, count * factors[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f253([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 254

```python
def f254(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in found and list(point) not in returns:
                returns.append(list(point))
            found.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f254([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 255

```python
def f255(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap % 5:
            result.append([left, right])
        else:
            result[-1][1] = right
    gaps = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        gaps.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': gaps, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f255([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 256

```python
def f256(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f256([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 257

```python
def f257(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in found and list(point) not in crossings:
                crossings.append(list(point))
            found.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f257([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 258

```python
def f258(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x = max(-64, min(64, x + dx))
            y = max(-64, min(64, y + dy))
            used = min(64, used + 1)
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f258([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 259

```python
def f259(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': lastlevel[:3], 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f259([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 260

```python
def f260(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f260([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 261

```python
def f261(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap or rate0 <= rate0 + 0:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f261([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 262

```python
def f262(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f262([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 263

```python
def f263(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count % 100):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in returns:
                returns.append(list(point))
            visited.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f263([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 264

```python
def f264(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in prices and count > 0:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f264([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 265

```python
def f265(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    finished = set()
    result = []
    layers = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if needs[node] == 0 and node not in finished))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            finished.add(node)
            result.append(node)
        for node in current:
            for nxt in nextmap[node]:
                needs[nxt] -= 1
    returnvalue = {'order': result, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f265(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 266

```python
def f266(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    known = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(count):
            x = max(-64, min(64, x + dx))
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f266([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 267

```python
def f267(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges[:16]:
        children.setdefault(a, []).append(b)
    levels = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(children.get(cur, [])):
                if nxt not in levels and (not nxt.startswith('Z')):
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    sequence = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f267([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 268

```python
def f268(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        queue.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f268(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 269

```python
def f269(left, right, ignored):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()
    ignored = {str(value).upper() for value in ignored}
    a = {tidy(value) for value in left} - ignored
    b = {tidy(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f269(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 270

```python
def f270(left, right, excluded):
    left = list(left)

    def tidy(value):
        return str(value).strip().upper()[:12]
    excluded = {str(value).upper() for value in excluded}
    a = {tidy(value) for value in left} - excluded
    b = {tidy(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f270(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 271

```python
def f271(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in prices:
            items.append((key, count * prices[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f271([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 272

```python
def f272(left, right, banned):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()
    banned = {normalize(value) for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f272(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 273

```python
def f273(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f273([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 274

```python
def f274(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges:
        routes.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(routes.get(cur, [])):
                if nxt not in distance and (not nxt.startswith('Z')):
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': lastlevel, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f274([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 275

```python
def f275(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not result or left > result[-1][1] + gap:
            result.append([left, right])
        else:
            result[-1][1] = right
    breaks = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        breaks.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': breaks, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f275([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 276

```python
def f276(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        routes[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    handled = set()
    sequence = []
    layers = []
    while len(handled) < len(nodes) and len(handled) < 20:
        nextbatch = sorted((node for node in nodes if incoming[node] == 0 and node not in handled))
        if not nextbatch:
            break
        current = nextbatch[:1] if any((str(node).isupper() for node in nodes)) else nextbatch
        layers.append(current)
        for node in current:
            handled.add(node)
            sequence.append(node)
        for node in current:
            for nxt in routes[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f276(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 277

```python
def f277(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f277(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 278

```python
def f278(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        routes.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < min(limit, 3):
            for nxt in sorted(routes.get(cur, [])):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    result = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': result, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f278([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 279

```python
def f279(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f279(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 280

```python
def f280(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices and rate0 != 0:
            prices[name0] = rate0
    matched = []
    for key, count in left:
        if key in prices and count > 0:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f280([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 281

```python
def f281(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right[:20]:
        if name0 not in factors and rate0 != 0:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f281([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 282

```python
def f282(nodes, edges):
    nodes = list(nodes)
    indegree = {node: 0 for node in nodes}
    routes = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        routes[a].append(b)
        indegree[b] += 1
    initial = dict(indegree)
    handled = set()
    result = []
    layers = []
    while len(handled) < len(nodes):
        nextbatch = sorted((node for node in nodes if indegree[node] == 0 and node not in handled), reverse=any((str(node).isupper() for node in nodes)))
        if not nextbatch:
            break
        current = nextbatch
        layers.append(current)
        for node in current:
            handled.add(node)
            result.append(node)
        for node in current:
            for nxt in routes[node]:
                indegree[nxt] -= 1
    returnvalue = {'order': result, 'batches': layers, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f282(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 283

```python
def f283(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + max(0, gap):
            segments.append([left, right])
        else:
            segments[-1][1] = right
    breaks = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        breaks.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': breaks, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f283([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 284

```python
def f284(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            pending = [(row, col)]
            found.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        pending.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f284(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 285

```python
def f285(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap % 5:
            result.append([left, right])
        else:
            result[-1][1] = right
    gaps = []
    for pos in range(1, min(50, len(result))):
        left = result[pos][0]
        gaps.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': gaps, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f285([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 286

```python
def f286(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
            far = max(far, abs(x) + abs(y))
            lowx, highx = (min(lowx, x), max(highx, x))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f286([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3)])
```

Output example:

```
{"bounds":[-5,-4,3,3],"end":[0,3],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":33}
```

### 287

```python
def f287(nodes, edges):
    nodes = list(nodes)
    nodes = [node for node in nodes if node not in nodes or any((node in edge for edge in edges))]
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    initial = dict(needs)
    complete = set()
    sequence = []
    groups = []
    while len(complete) < len(nodes) and len(complete) < 20:
        available = sorted((node for node in nodes if needs[node] == 0 and node not in complete), reverse=len(nodes) > 20)
        if not available:
            break
        current = available
        groups.append(current)
        for node in current:
            complete.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f287(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 288

```python
def f288(left, right, ignored):
    left = list(left)

    def tidy(value):
        return str(value).strip(' ').upper()
    ignored = {tidy(value) for value in ignored}
    a = {tidy(value) for value in left} - ignored
    b = {tidy(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f288(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 289

```python
def f289(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges[:16]:
        nextmap.setdefault(a, []).append(b)
    levels = {start: 0} if any((start in edge for edge in edges)) else {} if limit > 0 or limit < 0 else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    sequence = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f289([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 290

```python
def f290(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    startdegree = dict(incoming)
    finished = set()
    sequence = []
    groups = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished))
        if not available:
            break
        current = available[:1] if any((str(node).isupper() for node in nodes)) else available
        groups.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': groups, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f290(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 291

```python
def f291(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    nextmap = {node: [] for node in nodes}
    for before, after in edges:
        if before == after:
            continue
        a, b = (before, after)
        nextmap[a].append(b)
        incoming[b] += 1
    rootsource = dict(incoming)
    finished = set()
    result = []
    layers = []
    while len(finished) < len(nodes) and len(finished) < 20:
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in finished), reverse=len(nodes) > 20)
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            finished.add(node)
            result.append(node)
        for node in current:
            for nxt in nextmap[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': result, 'batches': layers, 'roots': sorted((node for node in nodes if rootsource[node] == 0)), 'count': len(result)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f291(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 292

```python
def f292(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges[:16]:
        routes.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    result = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': result, 'depth': steps, 'frontier': furthest[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f292([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 293

```python
def f293(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap + 1:
            result.append([left, right])
        else:
            result[-1][1] = max(0, result[-1][1], right)
    gaps = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        gaps.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': gaps, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f293([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 294

```python
def f294(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges[:16]:
        routes.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(routes.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f294([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 295

```python
def f295(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right:
        if name0 not in ratemap and rate0 != 0:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap and count > 0:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f295([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9), ('FP', 3), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["CX",38],["EV",38]],"missing":[],"total":457}
```

### 296

```python
def f296(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap + 1:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f296([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 297

```python
def f297(board):
    board = list(board)
    known = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            queue = [(row, col)]
            known.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        queue.append(nxt)
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f297(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 298

```python
def f298(board):
    board = list(board)
    found = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            pending = [(row, col)]
            found.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        if len(found) >= 100:
                            continue
                        pending.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f298(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 299

```python
def f299(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': furthest[:3], 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f299([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 300

```python
def f300(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \n').upper()
    banned = {str(value).upper() for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right} - banned
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f300(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 301

```python
def f301(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        nextmap.setdefault(a, []).append(b)
    steps = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(nextmap.get(cur, []))[:20]:
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    pending.append(nxt)
    result = list(steps)
    furthest = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': result, 'depth': steps, 'frontier': furthest[:3], 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f301([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 302

```python
def f302(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices or rate0 <= rate0 + 0:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in prices:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f302([('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4), ('FP', 10), ('GQ', 12), ('HR', 4)], [('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9), ('FP', 6), ('GQ', 10), ('HR', 8)], 2)
```

Output example:

```
{"count":8,"items":[["GQ",122],["DL",90],["AN",66],["FP",62],["EV",38]],"missing":[],"total":467}
```

### 303

```python
def f303(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not segments or left > segments[-1][1] + gap % 5:
            segments.append([left, right])
        else:
            segments[-1][1] = right
    spaces = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        spaces.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': spaces, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f303([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 3)
```

Output example:

```
{"cover":44,"holes":[5,5,9],"longest":21,"segments":[[2,23],[28,38],[43,50],[59,65]]}
```

### 304

```python
def f304(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    gaps = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        gaps.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': gaps, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f304([(2, 9), (5, 11), (14, 19), (18, 23), (28, 31), (33, 38), (43, 50), (48, 50), (59, 65)], 0)
```

Output example:

```
{"cover":39,"holes":[3,5,2,5,9],"longest":9,"segments":[[2,11],[14,23],[28,31],[33,38],[43,50],[59,65]]}
```

### 305

```python
def f305(nodes, edges):
    nodes = list(nodes)
    needs = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        needs[b] += 1
    startdegree = dict(needs)
    finished = set()
    sequence = []
    layers = []
    while len(finished) < len(nodes):
        available = sorted((node for node in nodes if needs[node] == 0 and node not in finished))
        if not available:
            break
        current = available
        layers.append(current)
        for node in current:
            finished.add(node)
            sequence.append(node)
        for node in current:
            for nxt in children[node]:
                needs[nxt] -= 1
    returnvalue = {'order': sequence, 'batches': layers, 'roots': sorted((node for node in nodes if startdegree[node] == 0)), 'count': len(sequence)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f305(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache')])
```

Output example:

```
{"batches":[["auth","db"],["cache","jobs","proxy"],["api","worker"],["ui"]],"count":8,"order":["auth","db","cache","jobs","proxy","api","worker","ui"],"roots":["auth","db"]}
```

### 306

```python
def f306(board):
    board = list(board)
    found = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f306(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 307

```python
def f307(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    crossings = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves:
        dx, dy = step[direction]
        for turn in range(min(count, 64)):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in found and list(point) not in crossings:
                crossings.append(list(point))
            found.add(point)
            far = max(far, min(20, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': crossings[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f307([('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1), ('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1)])
```

Output example:

```
{"bounds":[-5,-4,3,4],"end":[3,4],"far":8,"revisits":[[-2,0],[-1,0],[-4,-3],[-3,-3],[-2,-3]],"steps":31}
```

### 308

```python
def f308(board):
    board = list(board)
    found = set()
    regions = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
            if col >= 12 or board[row][col] != '#' or (row, col) in found:
                continue
            cells = []
            queue = [(row, col)]
            found.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in found):
                        found.add(nxt)
                        queue.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f308(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 309

```python
def f309(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    grand = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            charge = value * abs(prices[group])
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': grand, 'groups': totals, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f309([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 310

```python
def f310(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()[:12]
    excluded = {canon(value) for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right if canon(value) != ''} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f310(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['Ember'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","FROST","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","FROST","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 311

```python
def f311(rows, keep, factors):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            cost = value * factors[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            sumvalue += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f311([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 312

```python
def f312(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    result = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f312([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 313

```python
def f313(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f313(['##....', '..##.#', '....#.', '.###..', '#.....', '...#..'])
```

Output example:

```
{"anchors":[[3,1],[0,0],[1,2],[1,5],[2,4],[4,0],[5,3]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 314

```python
def f314(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < min(limit, 3):
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    queue.append(nxt)
    result = list(levels)
    edge = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': result, 'depth': levels, 'frontier': edge, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f314([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 315

```python
def f315(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep and value != 0:
            cost = value * prices[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f315([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":319,"edge":45,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1118}
```

### 316

```python
def f316(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in visited:
                continue
            cells = []
            queue = [(row, col)]
            visited.add((row, col))
            while queue:
                cur = queue.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in visited):
                        visited.add(nxt)
                        if len(visited) >= 100:
                            continue
                        queue.append(nxt)
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f316(['...#..', '#.....', '.###..', '....#.', '..##.#', '#.....'])
```

Output example:

```
{"anchors":[[2,1],[4,2],[0,3],[1,0],[3,4],[4,5],[5,0]],"count":7,"filled":10,"sizes":[3,2,1,1,1,1,1]}
```

### 317

```python
def f317(rows, keep, prices):
    rows = list(rows)
    kept = []
    buckets = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            charge = value * prices[group]
            kept.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            grand += charge
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': grand, 'groups': buckets, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f317([('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19), ('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3)], ['ready', 'checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":11,"groups":{"core":286,"edge":51,"north":469,"south":285},"top":["AN69","AN21","DL47"],"total":1091}
```

### 318

```python
def f318(nodes, edges):
    nodes = list(nodes)
    incoming = {node: 0 for node in nodes}
    children = {node: [] for node in nodes}
    for before, after in edges:
        a, b = (before, after)
        children[a].append(b)
        incoming[b] += 1
    initial = dict(incoming)
    handled = set()
    listing = []
    groups = []
    while len(handled) < len(nodes):
        available = sorted((node for node in nodes if incoming[node] == 0 and node not in handled), reverse=len(nodes) > 20)
        if not available:
            break
        current = available[:1] if any((str(node).isupper() for node in nodes)) else available
        groups.append(current)
        for node in current:
            handled.add(node)
            listing.append(node)
        for node in current:
            for nxt in children[node]:
                incoming[nxt] -= 1
    returnvalue = {'order': listing, 'batches': groups, 'roots': sorted((node for node in nodes if initial[node] == 0)), 'count': len(listing)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f318(['proxy', 'api', 'ui', 'worker', 'auth', 'db', 'jobs', 'cache'], [('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui'), ('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db')])
```

Output example:

```
{"batches":[["auth","cache"],["db","proxy"],["api","jobs"],["ui","worker"]],"count":8,"order":["auth","cache","db","proxy","api","jobs","ui","worker"],"roots":["auth","cache"]}
```

### 319

```python
def f319(left, right, excluded):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()
    excluded = {str(value).upper() for value in excluded}
    a = {tidy(value) for value in left} - excluded
    b = {tidy(value) for value in right} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f319(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### 320

```python
def f320(left, right, ignored):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    ignored = {str(value).upper() for value in ignored}
    a = {canon(value) for value in left} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f320(['delta', 'BLUE', 'helium', 'frost', ' Amber', 'Ember', 'Ember'], ['helium', ' Amber', 'frost', 'BLUE', 'delta', 'GARNET', 'Ember'], ['frost'])
```

Output example:

```
{"all":["AMBER","BLUE","DELTA","EMBER","GARNET","HELIUM"],"both":["AMBER","BLUE","DELTA","EMBER","HELIUM"],"left":[],"right":["GARNET"],"score":25}
```

### Final Query

Give me the output of the final query without executing it!

```python
import json, re
from collections import deque
out = {}
board = list(('...#..', '#.....', '.###..') + ('....#.', '..##.#', '#.....'))
cells = [(row, col) for row in range(len(board)) for col in range(len(board[row])) if board[row][col] == '#']
parent = {cell: cell for cell in cells}

def root(cell):
    while parent[cell] != cell:
        parent[cell] = parent[parent[cell]]
        cell = parent[cell]
    return cell

def merge(a, b):
    a = root(a)
    b = root(b)
    if a != b:
        parent[b] = a
for row, col in cells:
    for other in ((row - 1, col), (row, col - 1)):
        if other in parent:
            merge((row, col), other)
groups = {}
for cell in cells:
    groups.setdefault(root(cell), []).append(cell)
parts = [(len(group), min(group)) for group in groups.values()]
parts.sort(key=lambda item: (-item[0], item[1]))
record = {'aa': [part[0] for part in parts], 'bb': [list(part[1]) for part in parts], 'cc': len(cells), 'dd': len(parts)}
keep = list(('ready',) + ('checked',))
rates = dict((('north', 7), ('south', 5), ('core', 11)) + (('edge', 3),))
route = record['cc']
cases = {
    11: list((('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 15), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 22)) + (('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3))),
    10: list((('AN10', 'south', 'ready', 15), ('DL47', 'north', 'ready', 20), ('AN84', 'edge', 'ready', 17), ('AN21', 'north', 'ready', 23), ('AN58', 'south', 'checked', 20), ('AN95', 'north', 'ready', 11), ('CX32', 'edge', 'void', 20), ('AN69', 'core', 'ready', 19)) + (('CX06', 'south', 'hold', 7), ('BR43', 'core', 'void', 14), ('CX80', 'south', 'ready', 22), ('CX17', 'core', 'ready', 7), ('BR54', 'north', 'checked', 10), ('DL91', 'north', 'ready', 3))),
}
rows = cases[route]
chosen = [(code, group, value) for code, group, state, value in rows if state in keep]
priced = [(code, group, value * rates[group]) for code, group, value in chosen]
groups = {}
for code, group, price in priced:
    groups[group] = groups.get(group, 0) + price
ranked = sorted(priced, key=lambda row: (-row[2], row[0]))
record = {'aa': [row[0] for row in ranked[:3]], 'bb': sum((row[2] for row in priced)), 'cc': len(priced), 'dd': groups}
left = list(('delta', 'BLUE') + ('helium', 'frost', ' Amber', 'Ember', 'Ember'))
right = list(('helium', ' Amber') + ('frost', 'BLUE', 'delta', 'GARNET', 'Ember'))
route = record['bb']
cases = {
    1091: ['frost'],
    1118: ['Ember'],
}
blocked = cases[route]
a = set()
b = set()
ban = set()
for value in blocked:
    ban.add(value.strip().upper())
for value in left:
    value = value.strip().upper()
    if value not in ban:
        a.add(value)
for value in right:
    value = value.strip().upper()
    if value not in ban:
        b.add(value)
both = a.intersection(b)
record = {'aa': sorted(both), 'bb': sorted(a.difference(b)), 'cc': sorted(b.difference(a)), 'dd': sorted(a.union(b)), 'ee': sum(map(len, both))}
spans = list(((2, 9), (5, 11), (14, 19), (18, 23)) + ((28, 31), (33, 38), (43, 50), (48, 50), (59, 65)))
route = record['aa'][3]
cases = {
    'FROST': 0,
    'EMBER': 3,
}
gap = cases[route]
spans.sort(key=lambda pair: (pair[0], pair[1]))
parts = []
pos = 0
while pos < len(spans):
    left, right = spans[pos]
    pos += 1
    while pos < len(spans) and spans[pos][0] <= right + gap:
        right = max(right, spans[pos][1])
        pos += 1
    parts.append([left, right])
holes = [parts[pos][0] - parts[pos - 1][1] for pos in range(1, len(parts))]
record = {'aa': parts, 'bb': holes, 'cc': sum((part[1] - part[0] for part in parts)), 'dd': max((part[1] - part[0] for part in parts))}
route = record['cc']
cases = {
    39: list((('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1)) + (('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('N', 1))),
    44: list((('W', 3), ('E', 2), ('S', 2), ('W', 1), ('S', 1), ('W', 3), ('E', 3), ('E', 2), ('S', 1)) + (('W', 1), ('E', 2), ('N', 2), ('E', 2), ('N', 3), ('N', 2), ('W', 3))),
}
moves = cases[route]
delta = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
points = [[0, 0]]
for direction, count in moves:
    dx, dy = delta[direction]
    for turn in range(count):
        points.append([points[-1][0] + dx, points[-1][1] + dy])
seen = set()
revisits = []
for point in points:
    key = tuple(point)
    if key in seen and point not in revisits:
        revisits.append(point)
    seen.add(key)
record = {'aa': points[-1], 'bb': max((abs(point[0]) + abs(point[1]) for point in points)), 'cc': revisits[:5], 'dd': [min((point[0] for point in points)), min((point[1] for point in points)), max((point[0] for point in points)), max((point[1] for point in points))], 'ee': len(points) - 1}
left = list((('AN', 8), ('BR', 7), ('CX', 4), ('DL', 11), ('EV', 4)) + (('FP', 10), ('GQ', 12), ('HR', 4)))
fee = 2
route = record['ee']
cases = {
    31: list((('AN', 8), ('BR', 5), ('CX', 9), ('DL', 8), ('EV', 9)) + (('FP', 3), ('GQ', 10), ('HR', 8))),
    33: list((('AN', 8), ('BR', 5), ('CX', 4), ('DL', 8), ('EV', 9)) + (('FP', 6), ('GQ', 10), ('HR', 8))),
}
right = cases[route]
joined = []
for key, count in left:
    matches = [rate for name, rate in right if name == key]
    if matches:
        joined.append([key, count * matches[0] + fee])
joined.sort(key=lambda item: (-item[1], item[0]))
rightkeys = {key for key, rate in right}
record = {'aa': joined[:5], 'bb': sum((item[1] for item in joined)), 'cc': sorted((key for key, count in left if key not in rightkeys)), 'dd': len(joined)}
edges = list((('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G')) + (('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')))
start = 'A'
route = record['bb']
cases = {
    467: 3,
    457: 0,
}
limit = cases[route]
links = {}
for edge in edges:
    links.setdefault(edge[0], []).append(edge[1])
distance = {start: 0}
queue = deque([start])
while queue:
    node = queue.popleft()
    if distance[node] == limit:
        continue
    for child in sorted(links.get(node, [])):
        if child in distance:
            continue
        distance[child] = distance[node] + 1
        queue.append(child)
furthest = max(distance.values())
record = {'aa': list(distance), 'bb': distance, 'cc': sorted((node for node in distance if distance[node] == furthest)), 'dd': len(distance)}
nodes = list(('proxy', 'api', 'ui', 'worker') + ('auth', 'db', 'jobs', 'cache'))
route = record['dd']
cases = {
    8: list((('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui')) + (('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'cache'))),
    1: list((('auth', 'api'), ('db', 'api'), ('cache', 'api'), ('api', 'ui')) + (('db', 'jobs'), ('jobs', 'worker'), ('auth', 'proxy'), ('auth', 'db'))),
}
edges = cases[route]
remaining = set(nodes)
done = set()
order = []
batches = []
while remaining:
    ready = sorted((node for node in remaining if all((before in done for before, after in edges if after == node))))
    if not ready:
        break
    batches.append(ready)
    order.extend(ready)
    done.update(ready)
    remaining.difference_update(ready)
roots = sorted((node for node in nodes if all((after != node for before, after in edges))))
record = {'aa': order, 'bb': batches, 'cc': roots, 'dd': len(order)}
out['aa'] = record['aa']
out['cc'] = record['cc']
out['bb'] = record['bb']
out['dd'] = record['dd']
print(json.dumps(out, separators=(",", ":"), sort_keys=True))
```
