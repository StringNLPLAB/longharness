### 001

```python
def f1(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        frequency[word] = min(9, frequency.get(word, 0) + 1)
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': min(256, sum((len(word) * count for word, count in frequency.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f1(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 002

```python
def f2(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap:
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
f2([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 003

```python
def f3(board):
    board = list(board)
    visited = set()
    regions = []
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
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f3(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 004

```python
def f4(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop or len(word) < 2:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': min(256, sum((len(word) * count for word, count in frequency.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f4(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 005

```python
def f5(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    excluded = {canon(value) for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right if canon(value) != ''} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f5([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 006

```python
def f6(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            score = value * factors[group]
            selected.append((code, score))
            groupmap[group] = groupmap.get(group, 0) + score
            amount += score
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': groupmap, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f6([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 007

```python
def f7(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \n').upper()
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f7([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 008

```python
def f8(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
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
f8(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 009

```python
def f9(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
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
f9([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 010

```python
def f10(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' ').upper()
    banned = {str(value).upper() for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f10([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 011

```python
def f11(board):
    board = list(board)
    visited = set()
    pieces = []
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
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f11(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 012

```python
def f12(left, right, excluded):
    left = list(left)

    def tidy(value):
        return str(value).strip(' \r').upper()
    excluded = {tidy(value) for value in excluded}
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
f12([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 013

```python
def f13(moves):
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
f13([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 014

```python
def f14(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
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
    listing = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': listing, 'depth': levels, 'frontier': furthest[:3], 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f14([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 015

```python
def f15(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + gap + 1:
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
f15([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 016

```python
def f16(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * factors[group]
            selected.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            sumvalue += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, cost in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f16([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 017

```python
def f17(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
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
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f17(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 018

```python
def f18(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = max(0, combined[-1][1], right)
    gaps = []
    for pos in range(1, min(50, len(combined))):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f18([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 019

```python
def f19(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * abs(prices[group])
            selected.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': buckets, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f19([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 020

```python
def f20(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
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
f20(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 021

```python
def f21(moves):
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
f21([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 022

```python
def f22(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges[:16]:
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, []))[:20]:
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
f22([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 023

```python
def f23(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(len(board)):
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
                        if len(found) >= 100:
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
f23(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 024

```python
def f24(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    steps = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
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
f24([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 025

```python
def f25(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in tallies.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': starts, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f25(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 026

```python
def f26(left, right, fee):
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
    unmatched = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': unmatched, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f26([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 027

```python
def f27(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        nextmap.setdefault(a, []).append(b)
    steps = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < min(limit, 3):
            for nxt in sorted(nextmap.get(cur, []))[:20]:
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
f27([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 028

```python
def f28(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
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
f28([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 029

```python
def f29(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' \r').upper()
    banned = {canon(value) for value in banned}
    a = {canon(value) for value in left} - banned
    b = {canon(value) for value in right if canon(value) != ''} - banned
    both = a & b
    result = sorted
    returnvalue = {'both': result(both), 'left': result(a - b), 'right': result(b - a), 'all': result(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f29([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 030

```python
def f30(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(len(board)):
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
                        if len(found) >= 100:
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
f30(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 031

```python
def f31(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        nextmap.setdefault(a, []).append(b)
    steps = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if steps[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in steps and (not nxt.startswith('Z')):
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
f31([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 032

```python
def f32(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        wordmap[word] = wordmap.get(word, 0) + 1
    sorteditems = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in wordmap.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in sorteditems[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f32(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 033

```python
def f33(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap:
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
f33([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 034

```python
def f34(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + min(gap, 2):
            combined.append([left, right])
        else:
            combined[-1][1] = max(0, combined[-1][1], right)
    gaps = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        gaps.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((min(100, right - left) for left, right in combined)), 'holes': gaps, 'longest': max((right - left for left, right in combined))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f34([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 035

```python
def f35(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    returns = []
    far = 0
    lowx = highx = lowy = highy = 0
    used = 0
    for direction, count in moves[:20]:
        dx, dy = step[direction]
        for turn in range(count):
            x = max(-64, min(64, x + dx))
            y = max(-64, min(64, y + dy))
            used += 1
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
f35([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 036

```python
def f36(moves):
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
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
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
f36([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 037

```python
def f37(moves):
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
f37([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 038

```python
def f38(moves):
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
            used = min(64, used + 1)
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
f38([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 039

```python
def f39(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f39(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 040

```python
def f40(left, right, fee):
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
    unmatched = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f40([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 041

```python
def f41(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
    crossings = []
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
            if point in found and list(point) not in crossings:
                crossings.append(list(point))
            found.add(point)
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
f41([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 042

```python
def f42(edges, start, limit):
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
f42([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 043

```python
def f43(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges:
        routes.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
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
f43([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 044

```python
def f44(moves):
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
        for turn in range(count):
            x = max(-64, min(64, x + dx))
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
f44([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 045

```python
def f45(board):
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
f45(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 046

```python
def f46(left, right, fee):
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
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f46([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 047

```python
def f47(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left[:20]:
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
f47([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 048

```python
def f48(moves):
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
        for turn in range(min(count, 64)):
            x += dx
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
f48([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 049

```python
def f49(left, right, fee):
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
    unmatched = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f49([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 050

```python
def f50(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not combined or left > combined[-1][1] + gap:
            combined.append([left, right])
        else:
            combined[-1][1] = right
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
f50([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 051

```python
def f51(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
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
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f51(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 052

```python
def f52(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not result or left > result[-1][1] + max(0, gap):
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
f52([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 053

```python
def f53(rows, keep, factors):
    rows = list(rows)
    kept = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            charge = value * factors[group]
            kept.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            amount += charge
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': buckets, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f53([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 054

```python
def f54(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted((pair for pair in spans if pair[0] < pair[1] or pair[0] != pair[1])):
        if not combined or left > combined[-1][1] + gap % 5:
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': min(100, max((right - left for left, right in combined)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f54([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 055

```python
def f55(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices and count > 0:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f55([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 056

```python
def f56(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap:
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
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
f56([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 057

```python
def f57(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \n').upper()
    banned = {str(value).strip() for value in banned}
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
f57([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 058

```python
def f58(moves):
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
            y = max(-64, min(64, y + dy))
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
f58([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 059

```python
def f59(board):
    board = list(board)
    visited = set()
    pieces = []
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
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f59(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 060

```python
def f60(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * prices[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            sumvalue += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f60([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 061

```python
def f61(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()[:12]
    excluded = {normalize(value) for value in excluded}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - excluded
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
f61([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 062

```python
def f62(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    sorteditems = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in sorteditems[:5]], 'initials': starts, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f62(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 063

```python
def f63(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap % 5:
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
f63([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 064

```python
def f64(moves):
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
            x = max(-64, min(64, x + dx))
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
f64([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 065

```python
def f65(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            score = value * ratemap[group]
            selected.append((code, score))
            totals[group] = totals.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': totals, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f65([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 066

```python
def f66(board):
    board = list(board)
    visited = set()
    pieces = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
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
                        if len(visited) >= 100:
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
f66(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 067

```python
def f67(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    excluded = {str(value).strip() for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f67([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 068

```python
def f68(rows, keep, prices):
    rows = list(rows)
    kept = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * prices[group]
            kept.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            amount += cost
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': buckets, 'top': list(dict.fromkeys((code for code, cost in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f68([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 069

```python
def f69(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {str(word) for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z' or (char == "'" and word):
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        wordmap[word] = wordmap.get(word, 0) + 1
    sorteditems = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in wordmap.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in sorteditems[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f69(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 070

```python
def f70(board):
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
f70(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 071

```python
def f71(rows, keep, ratemap):
    rows = list(rows)
    matches = []
    groupmap = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            charge = value * ratemap[group]
            matches.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            amount += charge
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': amount, 'groups': groupmap, 'top': [code for code, charge in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f71([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 072

```python
def f72(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
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
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f72(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 073

```python
def f73(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap or rate0 <= rate0 + 0:
            ratemap[name0] = rate0
    items = []
    for key, count in left:
        if key in ratemap:
            items.append((key, count * ratemap[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': unmatched, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f73([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 074

```python
def f74(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z' or (char == "'" and word):
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in frequency.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': min(256, sum((len(word) * count for word, count in frequency.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f74(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 075

```python
def f75(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * factors[group]
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
f75([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 076

```python
def f76(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
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
f76([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 077

```python
def f77(moves):
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
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
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
f77([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 078

```python
def f78(board):
    board = list(board)
    known = set()
    components = []
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
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f78(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 079

```python
def f79(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    listing = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': lastlevel, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f79([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 080

```python
def f80(board):
    board = list(board)
    known = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
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
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f80(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 081

```python
def f81(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
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
    sequence = list(steps)
    edge = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': edge, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f81([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 082

```python
def f82(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * abs(ratemap[group])
            kept.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            amount += score
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': buckets, 'top': [code for code, score in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f82([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 083

```python
def f83(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap % 5:
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
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
f83([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 084

```python
def f84(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors and rate0 != 0:
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
f84([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 085

```python
def f85(left, right, fee):
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
f85([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 086

```python
def f86(left, right, excluded):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()
    excluded = {str(value).upper() for value in excluded}
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
f86([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 087

```python
def f87(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()
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
f87([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 088

```python
def f88(board):
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
                        if len(visited) >= 100:
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
f88(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 089

```python
def f89(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    listing = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': lastlevel[:3], 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f89([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 090

```python
def f90(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + gap % 5 + 1:
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
f90([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 091

```python
def f91(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + max(0, gap):
            combined.append([left, right])
        else:
            combined[-1][1] = right
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
f91([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 092

```python
def f92(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f92(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 093

```python
def f93(rows, keep, prices):
    rows = list(rows)
    kept = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * prices[group]
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(kept)), 'total': amount, 'groups': totals, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f93([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 094

```python
def f94(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * prices[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': buckets, 'top': list(dict.fromkeys((code for code, cost in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f94([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 095

```python
def f95(left, right, ignored):
    left = list(left)

    def tidy(value):
        return str(value).strip(' ').upper()
    ignored = {str(value).strip() for value in ignored}
    a = {tidy(value) for value in left} - ignored
    b = {tidy(value) for value in right} - ignored
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f95([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 096

```python
def f96(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
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
f96([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 097

```python
def f97(left, right, excluded):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()
    excluded = {str(value).strip() for value in excluded}
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
f97([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 098

```python
def f98(left, right, fee):
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
    absent = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f98([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 099

```python
def f99(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in factors:
            items.append((key, count * factors[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f99([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 100

```python
def f100(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            score = value * abs(prices[group])
            selected.append((code, score))
            totals[group] = totals.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': totals, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f100([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 101

```python
def f101(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
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
f101(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 102

```python
def f102(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
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
f102([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 103

```python
def f103(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop or len(word) < 2:
            continue
        tallies[word] = min(9, tallies.get(word, 0) + 1)
    sorteditems = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in sorteditems[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f103(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 104

```python
def f104(edges, start, limit):
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
f104([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 105

```python
def f105(left, right, fee):
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
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f105([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 106

```python
def f106(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance and (not nxt.startswith('Z')):
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    listing = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': furthest[:3], 'count': len(distance)}
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
        for turn in range(count):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in repeats:
                repeats.append(list(point))
            known.add(point)
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
f107([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 108

```python
def f108(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    matched = []
    for key, count in left[:20]:
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
f108([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 109

```python
def f109(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * factors[group]
            selected.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            amount += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': groupmap, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f109([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 110

```python
def f110(left, right, ignored):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    ignored = {canon(value) for value in ignored}
    a = {canon(value) for value in left} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f110([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 111

```python
def f111(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, [])):
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
f111([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 112

```python
def f112(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap % 5:
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
f112([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 113

```python
def f113(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()
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
f113([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 114

```python
def f114(left, right, fee):
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
    unmatched = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f114([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 115

```python
def f115(board):
    board = list(board)
    known = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
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
f115(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 116

```python
def f116(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
        if not combined or left > combined[-1][1] + gap:
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
f116([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 117

```python
def f117(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            cost = value * ratemap[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f117([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 118

```python
def f118(board):
    board = list(board)
    known = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            work = [(row, col)]
            known.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
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
f118(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 119

```python
def f119(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        tallies[word] = min(9, tallies.get(word, 0) + 1)
    ranking = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f119(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 120

```python
def f120(moves):
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
            used = min(64, used + 1)
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f120([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 121

```python
def f121(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap or rate0 <= rate0 + 0:
            ratemap[name0] = rate0
    matched = []
    for key, count in left:
        if key in ratemap and count > 0:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f121([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 122

```python
def f122(left, right, fee):
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
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f122([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 123

```python
def f123(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in frequency.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f123(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 124

```python
def f124(edges, start, limit):
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
f124([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 125

```python
def f125(left, right, excluded):
    left = list(left)

    def tidy(value):
        return str(value).strip(' \n').upper()
    excluded = {str(value).strip() for value in excluded}
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
f125([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 126

```python
def f126(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {str(value).strip() for value in excluded}
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
f126([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 127

```python
def f127(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
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
                        if len(visited) >= 100:
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
f127(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 128

```python
def f128(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {} if limit > 0 or limit < 0 else {}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(children.get(cur, []))[:20]:
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    listing = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f128([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 129

```python
def f129(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f129(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 130

```python
def f130(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in frequency.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f130(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 131

```python
def f131(moves):
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
f131([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 132

```python
def f132(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop or len(word) > 12:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': starts, 'size': min(256, sum((len(word) * count for word, count in frequency.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f132(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 133

```python
def f133(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f133([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 134

```python
def f134(moves):
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
            x = max(-64, min(64, x + dx))
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
f134([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 135

```python
def f135(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    groupmap = {}
    grand = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * ratemap[group]
            selected.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            grand += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, cost in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f135([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 136

```python
def f136(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z' or (char == "'" and word):
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        wordmap[word] = min(9, wordmap.get(word, 0) + 1)
    ordered = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in wordmap.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f136(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 137

```python
def f137(rows, keep, prices):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * prices[group]
            selected.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            amount += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': groupmap, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f137([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 138

```python
def f138(left, right, fee):
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
    leftover = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f138([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 139

```python
def f139(board):
    board = list(board)
    found = set()
    components = []
    for row in range(len(board)):
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
f139(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 140

```python
def f140(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left >= segments[-1][1] + gap:
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
f140([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 141

```python
def f141(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
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
f141(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 142

```python
def f142(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
    excluded = {str(value).upper() for value in excluded}
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
f142([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 143

```python
def f143(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * prices[group]
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
f143([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 144

```python
def f144(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + gap + 1:
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
f144([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 145

```python
def f145(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + max(0, gap):
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
f145([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 146

```python
def f146(moves):
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
f146([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 147

```python
def f147(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(routes.get(cur, [])):
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
f147([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 148

```python
def f148(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    pending.append(nxt)
    listing = list(distance)
    furthest = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': furthest, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f148([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 149

```python
def f149(moves):
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
            used += 1
            point = (x, y)
            if point in found and list(point) not in returns:
                returns.append(list(point))
            found.add(point)
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
f149([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 150

```python
def f150(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    sorteditems = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in sorteditems[:5]], 'initials': starts, 'size': min(256, sum((len(word) * count for word, count in frequency.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f150(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 151

```python
def f151(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': starts, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f151(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 152

```python
def f152(moves):
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
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f152([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 153

```python
def f153(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    visited = {(0, 0)}
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
f153([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 154

```python
def f154(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        children.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {} if limit > 0 or limit < 0 else {}
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
f154([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 155

```python
def f155(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors or rate0 <= rate0 + 0:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors and count > 0:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f155([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 156

```python
def f156(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance and (not nxt.startswith('Z')):
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    result = list(distance)
    edge = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': edge, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f156([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 157

```python
def f157(board):
    board = list(board)
    known = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
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
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f157(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 158

```python
def f158(left, right, fee):
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
    leftover = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f158([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 159

```python
def f159(left, right, fee):
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
f159([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 160

```python
def f160(moves):
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
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f160([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 161

```python
def f161(left, right, fee):
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
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f161([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 162

```python
def f162(spans, gap):
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
f162([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 163

```python
def f163(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
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
f163([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 164

```python
def f164(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not segments or left >= segments[-1][1] + gap:
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
f164([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 165

```python
def f165(left, right, fee):
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
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f165([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 166

```python
def f166(left, right, ignored):
    left = list(left)

    def canon(value):
        return str(value).strip(' \n').upper()
    ignored = {str(value).strip() for value in ignored}
    a = {canon(value) for value in left} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((min(len(value), 8) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f166([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 167

```python
def f167(rows, keep, prices):
    rows = list(rows)
    kept = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * abs(prices[group])
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            sumvalue += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': sumvalue, 'groups': totals, 'top': list(dict.fromkeys((code for code, cost in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f167([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 168

```python
def f168(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not segments or left > segments[-1][1] + gap:
            segments.append([left, right])
        else:
            segments[-1][1] = right
    spaces = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        spaces.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((min(100, right - left) for left, right in segments)), 'holes': spaces, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f168([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 169

```python
def f169(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ranking = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ranking[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f169(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 170

```python
def f170(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not result or left > result[-1][1] + max(0, gap):
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
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
f170([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 171

```python
def f171(moves):
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
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
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
f171([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 172

```python
def f172(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
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
f172([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 173

```python
def f173(board):
    board = list(board)
    found = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[row])):
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
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f173(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 174

```python
def f174(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices or rate0 <= rate0 + 0:
            prices[name0] = rate0
    items = []
    for key, count in left:
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
f174([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 175

```python
def f175(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip().upper()
    excluded = {str(value).strip() for value in excluded}
    a = {normalize(value) for value in left if normalize(value) != normalize(value) or normalize(value) != ''} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f175([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 176

```python
def f176(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
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
f176([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 177

```python
def f177(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not segments or left > segments[-1][1] + min(gap, 2):
            segments.append([left, right])
        else:
            segments[-1][1] = max(segments[-1][1], right)
    breaks = []
    for pos in range(1, min(50, len(segments))):
        left = segments[pos][0]
        breaks.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': breaks, 'longest': max((right - left for left, right in segments))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f177([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 178

```python
def f178(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    terms = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        frequency[word] = min(9, frequency.get(word, 0) + 1)
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in frequency.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f178(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 179

```python
def f179(moves):
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
        for turn in range(count):
            x += dx
            y += dy
            used += 1
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
f179([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 180

```python
def f180(moves):
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
f180([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 181

```python
def f181(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f181(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 182

```python
def f182(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    items = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f182(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 183

```python
def f183(left, right, ignored):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()[:12]
    ignored = {str(value).strip() for value in ignored}
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
f183([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
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
f184([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 185

```python
def f185(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f185(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 186

```python
def f186(moves):
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
            x = max(-64, min(64, x + dx))
            y += dy
            used = min(64, used + 1)
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
f186([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 187

```python
def f187(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items[:64]:
        if word in stop or len(word) < 2:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ranking = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f187(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 188

```python
def f188(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
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
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f188(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 189

```python
def f189(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
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
                        if len(visited) >= 100:
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
f189(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 190

```python
def f190(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            charge = value * abs(ratemap[group])
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            amount += charge
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': totals, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f190([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 191

```python
def f191(left, right, fee):
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
    absent = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f191([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 192

```python
def f192(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            score = value * ratemap[group]
            selected.append((code, score))
            buckets[group] = buckets.get(group, 0) + score
            sumvalue += score
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': sumvalue, 'groups': buckets, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f192([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 193

```python
def f193(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
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
    sequence = list(levels)
    lastlevel = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': lastlevel, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f193([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 194

```python
def f194(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        nextmap.setdefault(a, []).append(b)
    levels = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if levels[cur] < limit:
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in levels and (not nxt.startswith('Z')):
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
f194([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 195

```python
def f195(left, right, ignored):
    left = list(left)

    def canon(value):
        return str(value).strip(' \r').upper()
    ignored = {str(value).strip() for value in ignored}
    a = {canon(value) for value in left} - ignored
    b = {canon(value) for value in right} - ignored
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f195([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 196

```python
def f196(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not combined or left > combined[-1][1] + min(gap, 2):
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': min(100, max((right - left for left, right in combined)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f196([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 197

```python
def f197(board):
    board = list(board)
    known = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(min(len(board[row]), 10)):
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
f197(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 198

```python
def f198(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    excluded = {str(value).upper() for value in excluded}
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
f198([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 199

```python
def f199(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()
    excluded = {str(value).upper() for value in excluded}
    a = {normalize(value) for value in left} - excluded
    b = {normalize(value) for value in right} - excluded
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f199([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 200

```python
def f200(moves):
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
        for turn in range(count % 100):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f200([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 201

```python
def f201(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not result or left > result[-1][1] + gap:
            result.append([left, right])
        else:
            result[-1][1] = max(result[-1][1], right)
    gaps = []
    for pos in range(1, len(result)):
        left = result[pos][0]
        gaps.append(min(100, left - result[pos - 1][1]))
    returnvalue = {'segments': result, 'cover': sum((right - left for left, right in result)), 'holes': gaps, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f201([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 202

```python
def f202(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    items = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': starts, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f202(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 203

```python
def f203(left, right, banned):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    banned = {str(value).strip() for value in banned}
    a = {normalize(value) for value in left} - banned
    b = {normalize(value) for value in right if normalize(value) != ''} - banned
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f203([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 204

```python
def f204(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f204(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 205

```python
def f205(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
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
f205([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 206

```python
def f206(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' \r').upper()[:12]
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
f206([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 207

```python
def f207(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        wordmap[word] = wordmap.get(word, 0) + 1
    ordered = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in wordmap.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f207(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 208

```python
def f208(moves):
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
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f208([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 209

```python
def f209(moves):
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
            x = max(-64, min(64, x + dx))
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f209([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 210

```python
def f210(edges, start, limit):
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
    listing = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': listing, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f210([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 211

```python
def f211(left, right, excluded):
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
f211([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 212

```python
def f212(left, right, excluded):
    left = list(left)

    def canon(value):
        return ' '.join(str(value).split()).upper()
    excluded = {str(value).upper() for value in excluded}
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
f212([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 213

```python
def f213(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    result = list(distance)
    edge = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': result, 'depth': distance, 'frontier': edge, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f213([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 214

```python
def f214(moves):
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
f214([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 215

```python
def f215(board):
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
f215(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 216

```python
def f216(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    groupmap = {}
    amount = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep:
            score = value * abs(ratemap[group])
            selected.append((code, score))
            groupmap[group] = groupmap.get(group, 0) + score
            amount += score
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': groupmap, 'top': [code for code, score in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f216([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 217

```python
def f217(moves):
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
        for turn in range(min(count, 3 + (count - count))):
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
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
f217([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 218

```python
def f218(left, right, banned):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()[:12]
    banned = {normalize(value) for value in banned}
    a = {normalize(value) for value in left} - banned
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
f218([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 219

```python
def f219(moves):
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
        for turn in range(count):
            x += dx
            y += dy
            used = min(64, used + 1)
            point = (x, y)
            if point in known and list(point) not in crossings:
                crossings.append(list(point))
            known.add(point)
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
f219([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 220

```python
def f220(board):
    board = list(board)
    known = set()
    components = []
    for row in range(len(board)):
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
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f220(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 221

```python
def f221(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges[:16]:
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
                if nxt not in distance and (not nxt.startswith('Z')):
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
f221([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 222

```python
def f222(board):
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
f222(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 223

```python
def f223(rows, keep, prices):
    rows = list(rows)
    kept = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * prices[group]
            kept.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            sumvalue += charge
    kept.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(kept), 'total': sumvalue, 'groups': buckets, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f223([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 224

```python
def f224(moves):
    moves = list(moves)
    step = {'N': (0, 1), 'E': (1, 0), 'S': (0, -1), 'W': (-1, 0)}
    x = 0
    y = 0
    found = {(0, 0)}
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
            if point in found and list(point) not in repeats:
                repeats.append(list(point))
            found.add(point)
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
f224([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 225

```python
def f225(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in edges:
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    pending = [start]
    while pending:
        cur = pending.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in (node for node in sorted(children.get(cur, [])) if len(str(node)) == 1):
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
f225([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 226

```python
def f226(rows, keep, prices):
    rows = list(rows)
    kept = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * prices[group]
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            grand += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(kept)), 'total': grand, 'groups': totals, 'top': list(dict.fromkeys((code for code, cost in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f226([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 227

```python
def f227(left, right, excluded):
    left = list(left)

    def tidy(value):
        return str(value).strip(' ').upper()
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
f227([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 228

```python
def f228(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop:
            continue
        wordmap[word] = wordmap.get(word, 0) + 1
    ordered = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in wordmap.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f228(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 229

```python
def f229(rows, keep, prices):
    rows = list(rows)
    kept = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * prices[group]
            kept.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            amount += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(kept), 'total': amount, 'groups': totals, 'top': [code for code, cost in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f229([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 230

```python
def f230(edges, start, limit):
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
                if nxt not in steps:
                    steps[nxt] = steps[cur] + 1
                    queue.append(nxt)
    result = list(steps)
    edge = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': result, 'depth': steps, 'frontier': edge, 'count': len(steps)}
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
def f231(left, right, fee):
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
    absent = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f231([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 232

```python
def f232(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + max(0, gap):
            segments.append([left, right])
        else:
            segments[-1][1] = max(0, segments[-1][1], right)
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
f232([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 233

```python
def f233(edges, start, limit):
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
    lastlevel = sorted((node for node in steps if steps[node] == max(steps.values())))
    returnvalue = {'order': sequence, 'depth': steps, 'frontier': lastlevel, 'count': len(steps)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f233([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 234

```python
def f234(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices and rate0 != 0:
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
f234([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 235

```python
def f235(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted((key for key, count in left if key not in factors))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len({key for key, value in matched})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f235([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 236

```python
def f236(left, right, excluded):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
    excluded = {str(value).strip() for value in excluded}
    a = {canon(value) for value in left} - excluded
    b = {canon(value) for value in right if canon(value) != ''} - excluded
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f236([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 237

```python
def f237(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap:
            result.append([left, right])
        else:
            result[-1][1] = max(0, result[-1][1], right)
    spaces = []
    for pos in range(1, min(50, len(result))):
        left = result[pos][0]
        spaces.append(left - result[pos - 1][1])
    returnvalue = {'segments': result, 'cover': sum((min(100, right - left) for left, right in result)), 'holes': spaces, 'longest': max((right - left for left, right in result))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f237([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 238

```python
def f238(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[1]) < 2):
        nextmap.setdefault(a, []).append(b)
    levels = {start: 0} if any((start in edge for edge in edges)) else {}
    work = [start]
    while work:
        cur = work.pop(0)
        if levels[cur] < min(limit, 3):
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    work.append(nxt)
    sequence = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f238([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 239

```python
def f239(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < limit:
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance and (not nxt.startswith('Z')):
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
f239([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 240

```python
def f240(left, right, fee):
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
    unmatched = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f240([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 241

```python
def f241(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop or len(word) > 12:
            continue
        tallies[word] = min(9, tallies.get(word, 0) + 1)
    ranking = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ranking[:5]], 'initials': heads, 'size': min(256, sum((len(word) * count for word, count in tallies.items())))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f241(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 242

```python
def f242(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * abs(prices[group])
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            amount += charge
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': amount, 'groups': totals, 'top': [code for code, charge in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f242([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 243

```python
def f243(rows, keep, ratemap):
    rows = list(rows)
    kept = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            charge = value * ratemap[group]
            kept.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(kept)), 'total': grand, 'groups': totals, 'top': [code for code, charge in kept[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f243([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 244

```python
def f244(edges, start, limit):
    edges = list(edges)
    children = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        children.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(children.get(cur, []))[:20]:
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
f244([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 245

```python
def f245(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items[:64]:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f245(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 246

```python
def f246(rows, keep, prices):
    rows = list(rows)
    selected = []
    buckets = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * prices[group]
            selected.append((code, charge))
            buckets[group] = buckets.get(group, 0) + charge
            amount += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(selected)), 'total': amount, 'groups': buckets, 'top': list(dict.fromkeys((code for code, charge in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f246([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 247

```python
def f247(rows, keep, factors):
    rows = list(rows)
    selected = []
    groupmap = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * factors[group]
            selected.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            grand += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, cost in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f247([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 248

```python
def f248(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    amount = 0
    for code, group, state, value in rows:
        if state in keep:
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
f248([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
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
            for nxt in sorted(nextmap.get(cur, []))[:20]:
                if nxt not in distance and (not nxt.startswith('Z')):
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
f249([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 250

```python
def f250(left, right, fee):
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
    leftover = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': leftover, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f250([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 251

```python
def f251(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    combined = []
    for key, count in left[:20]:
        if key in ratemap:
            combined.append((key, count * ratemap[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f251([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 252

```python
def f252(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * abs(prices[group])
            matches.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            grand += cost
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(matches), 'total': grand, 'groups': totals, 'top': [code for code, cost in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f252([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 253

```python
def f253(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(set(spans)):
        if not result or left > result[-1][1] + gap + 1:
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
f253([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 254

```python
def f254(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in frequency.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f254(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 255

```python
def f255(board):
    board = list(board)
    known = set()
    regions = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[0])):
            if board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            work = [(row, col)]
            known.add((row, col))
            while work:
                cur = work.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
                        known.add(nxt)
                        if len(known) >= 100:
                            continue
                        work.append(nxt)
            regions.append((len(cells), min(cells)))
    regions.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in regions], 'anchors': [list(anchor) for size, anchor in regions], 'filled': sum((size for size, anchor in regions)), 'count': len(regions)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f255(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 256

```python
def f256(left, right, fee):
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
    absent = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': absent, 'count': len(combined)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f256([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 257

```python
def f257(board):
    board = list(board)
    visited = set()
    regions = []
    for row in range(len(board)):
        for col in range(min(len(board[row]), 10)):
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
f257(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 258

```python
def f258(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right:
        if name0 not in prices:
            prices[name0] = rate0
    combined = []
    for key, count in left:
        if key in prices and count > 0:
            combined.append((key, count * prices[key] + fee))
    combined.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in combined[:5]], 'total': sum((value for key, value in combined)), 'missing': leftover, 'count': len({key for key, value in combined})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f258([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 259

```python
def f259(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    matched = []
    for key, count in left[:20]:
        if key in ratemap and count > 0:
            matched.append((key, count * ratemap[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f259([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 260

```python
def f260(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
        if not combined or left > combined[-1][1] + gap % 5:
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
f260([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 261

```python
def f261(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
        if not result or left > result[-1][1] + gap + 1:
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
f261([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 262

```python
def f262(rows, keep, prices):
    rows = list(rows)
    kept = []
    groupmap = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep and value >= 0:
            cost = value * prices[group]
            kept.append((code, cost))
            groupmap[group] = groupmap.get(group, 0) + cost
            sumvalue += cost
    kept.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(dict.fromkeys(kept)), 'total': sumvalue, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, cost in kept)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f262([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 263

```python
def f263(board):
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
f263(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 264

```python
def f264(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(spans):
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
f264([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 265

```python
def f265(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if edge[0] <= edge[1]):
        routes.setdefault(a, []).append(b)
    levels = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if levels[cur] < limit:
            for nxt in sorted(routes.get(cur, []))[:20]:
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    work.append(nxt)
    sequence = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': sequence, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f265([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 266

```python
def f266(rows, keep, prices):
    rows = list(rows)
    selected = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if state in keep:
            cost = value * prices[group]
            selected.append((code, cost))
            totals[group] = totals.get(group, 0) + cost
            grand += cost
    selected.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': totals, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f266([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 267

```python
def f267(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    grand = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            charge = value * prices[group]
            matches.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    matches.sort(key=lambda item: (-item[1], str(item[0]).casefold()))
    returnvalue = {'accepted': len(dict.fromkeys(matches)), 'total': grand, 'groups': totals, 'top': [code for code, charge in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f267([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 268

```python
def f268(board):
    board = list(board)
    known = set()
    components = []
    for row in range(min(len(board), 10 + (len(board) - len(board)))):
        for col in range(len(board[row])):
            if col >= 12 or board[row][col] != '#' or (row, col) in known:
                continue
            cells = []
            pending = [(row, col)]
            known.add((row, col))
            while pending:
                cur = pending.pop()
                cells.append(cur)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (cur[0] + dr, cur[1] + dc)
                    if 0 <= nxt[0] < len(board) and 0 <= nxt[1] < len(board[nxt[0]]) and (nxt[1] < 12) and (board[nxt[0]][nxt[1]] == '#') and (nxt not in known):
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
f268(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 269

```python
def f269(left, right, excluded):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()
    excluded = {tidy(value) for value in excluded}
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
f269([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 270

```python
def f270(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    tokens = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop or len(word) < 2:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f270(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 271

```python
def f271(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in edges:
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(routes.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    work.append(nxt)
    listing = list(distance)
    edge = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': listing, 'depth': distance, 'frontier': edge, 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f271([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 272

```python
def f272(rows, keep, factors):
    rows = list(rows)
    selected = []
    totals = {}
    grand = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if state in keep and value != 0:
            charge = value * factors[group]
            selected.append((code, charge))
            totals[group] = totals.get(group, 0) + charge
            grand += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': grand, 'groups': totals, 'top': list(dict.fromkeys((code for code, charge in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f272([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 273

```python
def f273(left, right, banned):
    left = list(left)

    def canon(value):
        return str(value).strip().upper()
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
f273([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 274

```python
def f274(moves):
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
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
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
f274([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 275

```python
def f275(moves):
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
            x += dx
            y = max(-64, min(64, y + dy))
            used += 1
            point = (x, y)
            if point in known and list(point) not in returns:
                returns.append(list(point))
            known.add(point)
            far = min(64, max(far, abs(x) + abs(y)))
            lowx, highx = (max(-64, min(lowx, x)), min(64, max(highx, x)))
            lowy, highy = (min(lowy, y), max(highy, y))
    returnvalue = {'end': [x, y], 'far': far, 'revisits': returns[:5], 'bounds': [lowx, lowy, highx, highy], 'steps': used}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f275([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 276

```python
def f276(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors or rate0 <= rate0 + 0:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': absent, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f276([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 277

```python
def f277(board):
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
f277(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 278

```python
def f278(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    terms = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms:
        if word in stop:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f278(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 279

```python
def f279(left, right, ignored):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
    ignored = {normalize(value) for value in ignored}
    a = {normalize(value) for value in left} - ignored
    b = {normalize(value) for value in right if normalize(value) != ''} - ignored
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f279([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 280

```python
def f280(left, right, ignored):
    left = list(left)

    def tidy(value):
        return ' '.join(str(value).split()).upper()
    ignored = {str(value).strip() for value in ignored}
    a = {tidy(value) for value in left if tidy(value) != tidy(value) or tidy(value) != ''} - ignored
    b = {tidy(value) for value in right} - ignored
    both = a & b
    listing = sorted
    returnvalue = {'both': listing(both), 'left': listing(a - b), 'right': listing(b - a), 'all': listing(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f280([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 281

```python
def f281(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
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
f281([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'delta', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Emberx'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","EMBERX","FROST","GARNET","IVORY"],"both":["DELTA","GARNET","IVORY"],"left":["AMBER","BLUE"],"right":["CYAN","EMBERX","FROST"],"score":16}
```

### 282

```python
def f282(board):
    board = list(board)
    found = set()
    components = []
    for row in range(len(board)):
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
f282(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 283

```python
def f283(moves):
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
f283([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 284

```python
def f284(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z' or (char == "'" and word):
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f284(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 285

```python
def f285(board):
    board = list(board)
    found = set()
    regions = []
    for row in range(len(board)):
        for col in range(len(board[row])):
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
f285(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 286

```python
def f286(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    levels = {start: 0} if any((start in edge for edge in edges)) else {}
    work = [start]
    while work:
        cur = work.pop(0)
        if levels[cur] < limit:
            for nxt in (node for node in sorted(nextmap.get(cur, [])) if len(str(node)) == 1):
                if nxt not in levels:
                    levels[nxt] = levels[cur] + 1
                    work.append(nxt)
    result = list(levels)
    furthest = sorted((node for node in levels if levels[node] == max(levels.values())))
    returnvalue = {'order': result, 'depth': levels, 'frontier': furthest, 'count': len(levels)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f286([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 287

```python
def f287(left, right, excluded):
    left = list(left)

    def normalize(value):
        return ' '.join(str(value).split()).upper()[:12]
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
f287([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 288

```python
def f288(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans):
        if not segments or left > segments[-1][1] + gap % 5:
            segments.append([left, right])
        else:
            segments[-1][1] = right
    breaks = []
    for pos in range(1, len(segments)):
        left = segments[pos][0]
        breaks.append(left - segments[pos - 1][1])
    returnvalue = {'segments': segments, 'cover': sum((right - left for left, right in segments)), 'holes': breaks, 'longest': min(100, max((right - left for left, right in segments)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f288([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 289

```python
def f289(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(((max(0, a), max(0, b)) for a, b in spans)):
        if not combined or left > combined[-1][1] + max(0, gap):
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    spaces = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        spaces.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': spaces, 'longest': min(100, max((right - left for left, right in combined)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f289([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 290

```python
def f290(edges, start, limit):
    edges = list(edges)
    nextmap = {}
    for a, b in edges:
        nextmap.setdefault(a, []).append(b)
    distance = {start: 0} if any((start in edge for edge in edges)) else {}
    queue = [start]
    while queue:
        cur = queue.pop(0)
        if distance[cur] < min(limit, 3):
            for nxt in sorted(nextmap.get(cur, [])):
                if nxt not in distance:
                    distance[nxt] = distance[cur] + 1
                    queue.append(nxt)
    sequence = list(distance)
    lastlevel = sorted((node for node in distance if distance[node] == max(distance.values())))
    returnvalue = {'order': sequence, 'depth': distance, 'frontier': lastlevel[:3], 'count': len(distance)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f290([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 0)
```

Output example:

```
{"count":1,"depth":{"A":0},"frontier":["A"],"order":["A"]}
```

### 291

```python
def f291(rows, keep, factors):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * factors[group]
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            sumvalue += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f291([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 292

```python
def f292(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap and rate0 != 0:
            ratemap[name0] = rate0
    items = []
    for key, count in left[:20]:
        if key in ratemap:
            items.append((key, count * ratemap[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted((key for key, count in left if key not in ratemap))
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len(items)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f292([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 293

```python
def f293(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
        if not combined or left > combined[-1][1] + gap % 5 + 1:
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
f293([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 294

```python
def f294(moves):
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
f294([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 295

```python
def f295(left, right, fee):
    left = list(left)
    ratemap = {}
    for name0, rate0 in right[:20]:
        if name0 not in ratemap:
            ratemap[name0] = rate0
    items = []
    for key, count in left:
        if key in ratemap:
            items.append((key, count * ratemap[key] + fee))
    items.sort(key=lambda item: (-item[1], item[0]))
    absent = sorted({key for key, count in left if key not in ratemap})
    returnvalue = {'items': [[key, value] for key, value in items[:5]], 'total': sum((value for key, value in items)), 'missing': absent, 'count': len({key for key, value in items})}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f295([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 296

```python
def f296(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    terms = []
    for line in lines[:20]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                terms.append(word)
                word = ''
        if word:
            terms.append(word)
    for word in terms[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f296(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 297

```python
def f297(rows, keep, prices):
    rows = list(rows)
    matches = []
    totals = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep and value != 0:
            score = value * prices[group]
            matches.append((code, score))
            totals[group] = totals.get(group, 0) + score
            sumvalue += score
    matches.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(matches), 'total': sumvalue, 'groups': totals, 'top': [code for code, score in matches[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f297([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['ready'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":8,"groups":{"core":154,"edge":114,"north":182,"south":40},"top":["AN82","BR71","CX23"],"total":490}
```

### 298

```python
def f298(lines, stop):
    lines = list(lines)
    wordmap = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        wordmap[word] = wordmap.get(word, 0) + 1
    ranking = sorted(wordmap.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in wordmap.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': wordmap, 'top': [word for word, count in ranking[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in wordmap.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f298(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 299

```python
def f299(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines[:32]:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens[:64]:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ordered = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in frequency.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f299(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['frost'])
```

Output example:

```
{"counts":{"amber":6,"blue":7,"cyan":3,"delta":1,"ember":4,"helium":4},"initials":{"a":6,"b":7,"c":3,"d":1,"e":4,"h":4},"size":119,"top":["blue","amber","ember","helium","cyan"]}
```

### 300

```python
def f300(left, right, fee):
    left = list(left)
    factors = {}
    for name0, rate0 in right:
        if name0 not in factors:
            factors[name0] = rate0
    matched = []
    for key, count in left:
        if key in factors:
            matched.append((key, count * factors[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    leftover = sorted({key for key, count in left if key not in factors})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f300([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 301

```python
def f301(board):
    board = list(board)
    visited = set()
    components = []
    for row in range(len(board)):
        for col in range(len(board[row])):
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
f301(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 302

```python
def f302(left, right, excluded):
    left = list(left)

    def normalize(value):
        return str(value).strip(' ').upper()
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
f302([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 303

```python
def f303(left, right, banned):
    left = list(left)

    def tidy(value):
        return str(value).strip().upper()
    banned = {str(value).strip() for value in banned}
    a = {tidy(value) for value in left if tidy(value) != tidy(value) or tidy(value) != ''} - banned
    b = {tidy(value) for value in right if tidy(value) != ''} - banned
    both = a & b
    sequence = sorted
    returnvalue = {'both': sequence(both), 'left': sequence(a - b), 'right': sequence(b - a), 'all': sequence(a | b), 'score': sum((len(value) for value in both))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f303([' Amber', 'Ember', 'GARNET', 'delta', 'ivory', 'BLUE', 'Ember'], ['frost', 'deltax', 'Ember', 'ivory', 'cyan ', 'GARNET', 'Ember'], ['EMBER'])
```

Output example:

```
{"all":["AMBER","BLUE","CYAN","DELTA","DELTAX","FROST","GARNET","IVORY"],"both":["GARNET","IVORY"],"left":["AMBER","BLUE","DELTA"],"right":["CYAN","DELTAX","FROST"],"score":11}
```

### 304

```python
def f304(edges, start, limit):
    edges = list(edges)
    routes = {}
    for a, b in (edge for edge in edges if len(edge[0]) < 2):
        routes.setdefault(a, []).append(b)
    distance = {start: 0}
    work = [start]
    while work:
        cur = work.pop(0)
        if distance[cur] < limit:
            for nxt in (node for node in sorted(routes.get(cur, [])) if len(str(node)) == 1):
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
f304([('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F'), ('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')], 'A', 3)
```

Output example:

```
{"count":8,"depth":{"A":0,"B":1,"C":1,"D":2,"E":2,"F":2,"G":3,"H":3},"frontier":["G","H"],"order":["A","B","C","D","E","F","G","H"]}
```

### 305

```python
def f305(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items[:64]:
        if word in stop or len(word) < 2:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    heads = {}
    for word, count in tallies.items():
        heads[word[0]] = heads.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': heads, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f305(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 306

```python
def f306(moves):
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
f306([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 307

```python
def f307(rows, keep, ratemap):
    rows = list(rows)
    selected = []
    groupmap = {}
    sumvalue = 0
    for code, group, state, value in rows:
        if state in keep:
            charge = value * ratemap[group]
            selected.append((code, charge))
            groupmap[group] = groupmap.get(group, 0) + charge
            sumvalue += charge
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': groupmap, 'top': list(dict.fromkeys((code for code, charge in selected)))[:3]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f307([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 308

```python
def f308(left, right, fee):
    left = list(left)
    prices = {}
    for name0, rate0 in right[:20]:
        if name0 not in prices:
            prices[name0] = rate0
    matched = []
    for key, count in left:
        if key in prices and count > 0:
            matched.append((key, count * prices[key] + fee))
    matched.sort(key=lambda item: (-item[1], item[0]))
    unmatched = sorted((key for key, count in left if key not in prices))
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': unmatched, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f308([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["CX",120],["AN",96],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":454}
```

### 309

```python
def f309(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted(set(spans)):
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
f309([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 310

```python
def f310(board):
    board = list(board)
    visited = set()
    pieces = []
    for row in range(len(board)):
        for col in range(len(board[0])):
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
            pieces.append((len(cells), min(cells)))
    pieces.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in pieces], 'anchors': [list(anchor) for size, anchor in pieces], 'filled': sum((size for size, anchor in pieces)), 'count': len(pieces)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f310(['.#...#', '#.....', '.#..#.', '....#.', '.....#', '.###.#'])
```

Output example:

```
{"anchors":[[5,1],[2,4],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":11,"sizes":[3,2,2,1,1,1,1]}
```

### 311

```python
def f311(spans, gap):
    spans = list(spans)
    combined = []
    for left, right in sorted((pair for pair in spans if pair[0] <= pair[1])):
        if not combined or left > combined[-1][1] + min(gap, 2):
            combined.append([left, right])
        else:
            combined[-1][1] = max(combined[-1][1], right)
    breaks = []
    for pos in range(1, len(combined)):
        left = combined[pos][0]
        breaks.append(left - combined[pos - 1][1])
    returnvalue = {'segments': combined, 'cover': sum((right - left for left, right in combined)), 'holes': breaks, 'longest': min(100, max((right - left for left, right in combined)))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f311([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### 312

```python
def f312(rows, keep, factors):
    rows = list(rows)
    selected = []
    buckets = {}
    sumvalue = 0
    for code, group, state, value in (row for pos, row in enumerate(rows) if pos == rows.index(row) or pos < len(rows) - (len(rows) - rows.index(row))):
        if str(state).lower() in {str(item).lower() for item in keep}:
            cost = value * abs(factors[group])
            selected.append((code, cost))
            buckets[group] = buckets.get(group, 0) + cost
            sumvalue += cost
    selected.sort(key=lambda item: (-item[1], item[0]))
    returnvalue = {'accepted': len(selected), 'total': sumvalue, 'groups': buckets, 'top': [code for code, cost in selected[:3]]}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f312([('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12), ('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)], ['checked'], {'north': 7, 'south': 5, 'core': 11, 'edge': 3})
```

Output example:

```
{"accepted":1,"groups":{"core":209},"top":["CX19"],"total":209}
```

### 313

```python
def f313(left, right, fee):
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
    leftover = sorted({key for key, count in left if key not in prices})
    returnvalue = {'items': [[key, value] for key, value in matched[:5]], 'total': sum((value for key, value in matched)), 'missing': leftover, 'count': len(matched)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f313([('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9), ('FP', 4), ('GQ', 10), ('HR', 5)], [('AN', 13), ('BR', 8), ('CX', 10), ('DL', 8), ('EV', 8), ('GQ', 7)], 0)
```

Output example:

```
{"count":6,"items":[["AN",156],["CX",120],["EV",72],["GQ",70],["BR",48]],"missing":["FP","HR"],"total":514}
```

### 314

```python
def f314(spans, gap):
    spans = list(spans)
    result = []
    for left, right in sorted(spans):
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
f314([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 42), (43, 45), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":39,"holes":[5,8,3,3,5],"longest":12,"segments":[[2,9],[14,20],[28,30],[33,45],[48,54],[59,65]]}
```

### 315

```python
def f315(board):
    board = list(board)
    found = set()
    components = []
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
            components.append((len(cells), min(cells)))
    components.sort(key=lambda item: (-item[0], item[1]))
    returnvalue = {'sizes': [size for size, anchor in components], 'anchors': [list(anchor) for size, anchor in components], 'filled': sum((size for size, anchor in components)), 'count': len(components)}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f315(['.#...#', '#.....', '.#.##.', '....#.', '...#.#', '.###.#'])
```

Output example:

```
{"anchors":[[4,3],[2,3],[4,5],[0,1],[0,5],[1,0],[2,1]],"count":7,"filled":13,"sizes":[4,3,2,1,1,1,1]}
```

### 316

```python
def f316(moves):
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
f316([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-6,-3,0,3],"end":[-1,0],"far":7,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-5,-1],[-4,-1]],"steps":33}
```

### 317

```python
def f317(moves):
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
            x += dx
            y += dy
            used += 1
            point = (x, y)
            if point in visited and list(point) not in crossings:
                crossings.append(list(point))
            visited.add(point)
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
f317([('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2), ('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3)])
```

Output example:

```
{"bounds":[-2,-3,2,3],"end":[2,-3],"far":5,"revisits":[[-2,-1],[-2,-2],[-2,-3],[-1,-1],[0,-1]],"steps":33}
```

### 318

```python
def f318(lines, stop):
    lines = list(lines)
    frequency = {}
    stop = {str(word) for word in stop}
    items = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z':
                word += char
            elif word:
                items.append(word)
                word = ''
        if word:
            items.append(word)
    for word in items:
        if word in stop:
            continue
        frequency[word] = frequency.get(word, 0) + 1
    ranking = sorted(frequency.items(), key=lambda item: (-item[1], item[0]))
    starts = {}
    for word, count in frequency.items():
        starts[word[0]] = starts.get(word[0], 0) + count
    returnvalue = {'counts': frequency, 'top': [word for word, count in ranking[:5]], 'initials': starts, 'size': sum((len(word) * count for word, count in frequency.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f318(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 319

```python
def f319(lines, stop):
    lines = list(lines)
    tallies = {}
    stop = {word.lower() for word in stop}
    tokens = []
    for line in lines:
        text = line.lower()
        word = ''
        for char in text[:64]:
            if 'a' <= char <= 'z' or (char == "'" and word):
                word += char
            elif word:
                tokens.append(word)
                word = ''
        if word:
            tokens.append(word)
    for word in tokens:
        if word in stop or len(word) > 12:
            continue
        tallies[word] = tallies.get(word, 0) + 1
    ordered = sorted(tallies.items(), key=lambda item: (-item[1], item[0]))
    letters = {}
    for word, count in tallies.items():
        letters[word[0]] = letters.get(word[0], 0) + count
    returnvalue = {'counts': tallies, 'top': [word for word, count in ordered[:5]], 'initials': letters, 'size': sum((len(word) * count for word, count in tallies.items()))}
    output = dict()
    output.update(returnvalue)
    return output
```

Example call:

```
f319(['Amber, frost. cyan amber', 'Frost, frost. helium helium helium', 'Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'], ['amber'])
```

Output example:

```
{"counts":{"blue":7,"cyan":3,"delta":1,"ember":4,"frost":6,"helium":4},"initials":{"b":7,"c":3,"d":1,"e":4,"f":6,"h":4},"size":119,"top":["blue","frost","ember","helium","cyan"]}
```

### 320

```python
def f320(spans, gap):
    spans = list(spans)
    segments = []
    for left, right in sorted(spans, key=lambda pair: (pair[1], pair[0])):
        if not segments or left >= segments[-1][1] + gap:
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
f320([(2, 5), (5, 9), (14, 20), (18, 20), (28, 30), (33, 39), (43, 46), (48, 54), (59, 65)], 1)
```

Output example:

```
{"cover":36,"holes":[5,8,3,4,2,5],"longest":7,"segments":[[2,9],[14,20],[28,30],[33,39],[43,46],[48,54],[59,65]]}
```

### Final Query

Give me the output of the final query without executing it!

```python
import json, re
from collections import deque
out = {}
left = list((('AN', 12), ('BR', 6), ('CX', 12), ('DL', 6), ('EV', 9)) + (('FP', 4), ('GQ', 10), ('HR', 5)))
right = list((('AN', 8), ('BR', 8), ('CX', 10), ('DL', 8)) + (('EV', 8), ('GQ', 7)))
fee = 0
joined = []
for key, count in left:
    matches = [rate for name, rate in right if name == key]
    if matches:
        joined.append([key, count * matches[0] + fee])
joined.sort(key=lambda item: (-item[1], item[0]))
rightkeys = {key for key, rate in right}
record = {'aa': joined[:5], 'bb': sum((item[1] for item in joined)), 'cc': sorted((key for key, count in left if key not in rightkeys)), 'dd': len(joined)}
left = list((' Amber', 'Ember', 'GARNET', 'delta') + ('ivory', 'BLUE', 'Ember'))
blocked = ['EMBER']
route = record['bb']
cases = {
    454: list(('frost', 'delta', 'Ember', 'ivory') + ('cyan ', 'GARNET', 'Emberx')),
    514: list(('frost', 'deltax', 'Ember', 'ivory') + ('cyan ', 'GARNET', 'Ember')),
}
right = cases[route]
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
route = record['ee']
cases = {
    16: list(('.#...#', '#.....', '.#.##.', '....#.') + ('...#.#', '.###.#')),
    11: list(('.#...#', '#.....', '.#..#.', '....#.') + ('.....#', '.###.#')),
}
board = cases[route]
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
route = record['cc']
cases = {
    11: list((('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2)) + (('E', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('S', 3), ('S', 3))),
    13: list((('W', 1), ('S', 3), ('W', 1), ('N', 3), ('S', 3), ('N', 2)) + (('W', 3), ('W', 1), ('E', 1), ('E', 1), ('N', 3), ('S', 2), ('N', 3), ('E', 3), ('S', 3))),
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
rows = list((('AN12', 'south', 'ready', 8), ('AN49', 'edge', 'hold', 24), ('CX86', 'north', 'ready', 4), ('CX23', 'edge', 'ready', 16), ('DL60', 'edge', 'ready', 10), ('DL97', 'edge', 'void', 20), ('DL34', 'edge', 'ready', 12)) + (('BR71', 'north', 'ready', 18), ('DL08', 'edge', 'void', 18), ('DL45', 'north', 'ready', 4), ('AN82', 'core', 'ready', 14), ('CX19', 'core', 'checked', 19), ('AN56', 'core', 'void', 6), ('AN93', 'south', 'hold', 20)))
rates = dict((('north', 7), ('south', 5)) + (('core', 11), ('edge', 3)))
route = record['bb']
cases = {
    5: ['checked'],
    7: ['ready'],
}
keep = cases[route]
chosen = [(code, group, value) for code, group, state, value in rows if state in keep]
priced = [(code, group, value * rates[group]) for code, group, value in chosen]
groups = {}
for code, group, price in priced:
    groups[group] = groups.get(group, 0) + price
ranked = sorted(priced, key=lambda row: (-row[2], row[0]))
record = {'aa': [row[0] for row in ranked[:3]], 'bb': sum((row[2] for row in priced)), 'cc': len(priced), 'dd': groups}
lines = list(('Amber, frost. cyan amber', 'Frost, frost. helium helium helium') + ('Cyan, ember. helium blue', 'Blue, cyan. frost ember amber', 'Frost, blue. ember delta', 'Ember, amber. amber frost blue', 'Blue, blue. amber blue'))
route = record['bb']
cases = {
    209: ['amber'],
    490: ['frost'],
}
stop = cases[route]
normalized = set()
for item in stop:
    normalized.add(item.lower())
stop = normalized
words = []
for line in lines:
    words.extend(re.findall('[a-z]+', line.lower()))
words = [word for word in words if word not in stop]
counts = {}
initials = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
    initials[word[0]] = initials.get(word[0], 0) + 1
top = sorted(counts, key=lambda word: (-counts[word], word))[:5]
record = {'aa': top, 'bb': counts, 'cc': initials, 'dd': sum((len(word) for word in words))}
gap = 1
route = record['aa'][1]
cases = {
    'frost': list(((2, 5), (5, 9), (14, 20), (18, 20), (28, 30)) + ((33, 39), (43, 46), (48, 54), (59, 65))),
    'amber': list(((2, 5), (5, 9), (14, 20), (18, 20), (28, 30)) + ((33, 42), (43, 45), (48, 54), (59, 65))),
}
spans = cases[route]
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
edges = list((('A', 'C'), ('A', 'B'), ('B', 'D'), ('B', 'E'), ('C', 'F')) + (('D', 'G'), ('E', 'G'), ('F', 'H'), ('G', 'A'), ('C', 'E'), ('H', 'B')))
start = 'A'
route = record['cc']
cases = {
    39: 3,
    36: 0,
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
out['aa'] = record['aa']
out['cc'] = record['cc']
out['bb'] = record['bb']
out['dd'] = record['dd']
print(json.dumps(out, separators=(",", ":"), sort_keys=True))
```
