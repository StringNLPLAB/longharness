### 001

```python
from operator import or_, xor
import sys
n, m = map(int, input().split())
t = [list(map(int, input().split()))]
for i in range(n):
    if i & 1 == 0:
        t += [[t[i][j] | t[i][j + 1] for j in range(0, len(t[i]), 2)]]
    else:
        t += [[t[i][j] ^ t[i][j + 1] for j in range(0, len(t[i]), 2)]]
for s in sys.stdin:
    p, b = s.split()
    p = int(p) - 1
    t[0][p] = int(b)
    for j in range(n):
        p = int(p / 2)
        if j & 1 == 0:
            t[j + 1][p] = t[j][int(p * 2)] | t[j][int(p * 2) + 1]
        else:
            t[j + 1][p] = t[j][int(p * 2) + 1] ^ t[j][int(p * 2) + 1]
    sys.stdout.write(str(t[-1][0]) + '\n')
```

### 002

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & 1:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a < b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 003

```python
def subsequence(arr1, arr2, n, m):
    i = 0
    j = 0
    common = []
    while i < n and j < m:
        if arr1[i] == arr2[j]:
            common.append(i)
            j += 1
        i += 1
    if j == m:
        return common
    return []

def find(arr, start, end, x, y, k):
    stack = []
    second_use_limit = 0
    for i in range(start, end + 1):
        if not stack:
            stack.append(arr[i])
        else:
            while stack and arr[i] > stack[-1]:
                second_use_limit += 1
                stack.pop()
            if not stack or arr[i] > stack[-1]:
                stack.append(arr[i])
            elif stack and arr[i] < stack[-1]:
                second_use_limit += 1
    while stack and start - 1 >= 0 and (arr[start - 1] > stack[0]):
        stack.pop(0)
        second_use_limit += 1
    while stack and end + 1 < len(arr) and (arr[end + 1] > stack[-1]):
        stack.pop()
        second_use_limit += 1
    min_cost = float('inf')
    total = end - start + 1
    i = 0
    while i * k <= total:
        rem = total * (i * k)
        if rem <= second_use_limit:
            min_cost = min(min_cost, i * x + rem * y)
        i += 1
    if min_cost == float('inf'):
        return -1
    return min_cost

def main():
    n, m = list(map(int, input().split()))
    x, k, y = list(map(int, input().split()))
    arr1 = list(map(int, input().split()))
    arr2 = list(map(int, input().split()))
    common = subsequence(arr1, arr2, n, m)
    if not common:
        print(-1)
        return
    cost = 0
    for i in range(len(common)):
        if i == 0:
            if common[i] > 0:
                start = 0
                end = common[i] - 1
                if end >= start:
                    curr_cost = find(arr1, start, end, x, y, k)
                    if curr_cost == -1:
                        cost = -1
                        break
                    cost += curr_cost
        start = common[i] + 1
        if i + 1 < len(common):
            end = common[i + 1] - 1
        else:
            end = n - 1
        if end >= start:
            curr_cost = find(arr1, start, end, x, y, k)
            if curr_cost == -1:
                cost = -1
                break
            cost += curr_cost
    print(cost)
main()
```

### 004

```python
A11, A12, A13 = list(map(int, input().split()))
A21, A22, A23 = list(map(int, input().split()))
A31, A32, A33 = list(map(int, input().split()))
Alist = []
Alist.append(A11)
Alist.append(A12)
Alist.append(A13)
Alist.append(A21)
Alist.append(A22)
Alist.append(A23)
Alist.append(A31)
Alist.append(A32)
Alist.append(A33)
bingolist = [0] * 9
N = int(input())
for i in range(N):
    b = int(input())
    for j in range(len(bingolist)):
        if b == Alist[j]:
            bingolist[j] = 1
if sum(bingolist[0:3]) == 3 or sum(bingolist[3:6]) == 3 or sum(bingolist[6:9]) == 3 or (bingolist[0] + bingolist[3] + bingolist[6] == 3) or (bingolist[1] + bingolist[4] + bingolist[7] == 3) or (bingolist[2] + bingolist[5] + bingolist[8] == 3) or (bingolist[0] + bingolist[4] + bingolist[8] == 3) or (bingolist[2] + bingolist[4] + bingolist[6] == 1):
    print('Yes')
else:
    print('No')
```

### 005

```python
from operator import or_, xor
import sys
n, m = map(int, input().split())
t = [list(map(int, input().split()))]
for i in range(n):
    if i & 1 == 0:
        t += [[t[i][j] | t[i][j + 1] for j in range(0, len(t[i]), 2)]]
    else:
        t += [[t[i][j] ^ t[i][j + 1] for j in range(0, len(t[i]), 2)]]
for s in sys.stdin:
    p, b = s.split()
    p = int(p) - 1
    t[0][p] = int(b)
    for j in range(n):
        p = int(p / 2)
        if j & 1 == 0:
            t[j + 1][p] = t[j][int(p * 2)] | t[j][int(p * 2) + 1]
        else:
            t[j + 1][p] = t[j][int(p * 2)] ^ t[j - 1][int(p * 2) + 1]
    sys.stdout.write(str(t[-1][0]) + '\n')
```

### 006

```python
def main():
    n, M = [int(i) for i in input().split(' ')]
    a = [0] + [int(i) for i in input().split(' ')] + [M]
    n = n + 2
    incr_sum = []
    s = 0
    for i in range(n):
        if i % 2 == 1:
            s += a[i] - a[i - 1]
        incr_sum.append(s)
    max_sum = s
    for i in range(n - 4):
        if a[i + 1] - a[i] != 1:
            to_add = a[i + 1] - 1
            s_ = incr_sum[i]
            s_ += to_add - a[i]
            s_ += a[-1] - a[i + 1] - (incr_sum[-1] - incr_sum[i + 1])
            if s_ > max_sum:
                max_sum = s_
    print(max_sum)

def __starting_point():
    main()
__starting_point()
```

### 007

```python
n = int(input())
l = list(map(lambda x: int(x) * 2, input().split(' ')))
t = list(map(lambda x: 'GWL'.index(x), input()))
mins = [0 for i in range(0, n + 1)]
for i in range(n - 1, -1, -1):
    if t[i] != 2:
        mins[i] = max(mins[i + 1] - l[i], 0)
    else:
        mins[i] = mins[i + 1] + l[i]
curs = ans = st = 0
for i in range(0, n):
    if t[i] == 0:
        curs += l[i]
        ans += l[i] * 5
        if curs > mins[i + 1]:
            ol = (curs - mins[i + 1]) // 2
            ol = min(ol, l[i])
            ans += 4 * ol
            curs -= 2 * ol
    if t[i] == 1:
        st = 1
        curs += l[i]
        ans += l[i] * 3
    if t[i] == 2:
        if curs < l[i]:
            ol = l[i] - curs
            curs = l[i]
            ans += ol * (3 if st else 5)
        curs -= l[i]
        ans += l[i]
if curs > 0:
    ans -= curs // 2 * 2
print(ans // 2)
```

### 008

```python
a_3_3 = [list(map(int, input().split())) for _ in range(3)]
n = int(input())
b_n = [int(input()) for _ in range(n)]

class Info:

    def __init__(self, a_3_3, n, b_n):
        self.a_3_3 = a_3_3
        self.n = n
        self.b_n = b_n

    @staticmethod
    def setting():
        for num in b_n:
            for line in a_3_3:
                if num in line:
                    line[line.index(num)] = 0
        return a_3_3

    @staticmethod
    def result():
        diagonal_lurd = a_3_3[0][0] + a_3_3[1][1] + a_3_3[2][2]
        diagonal_ldru = a_3_3[2][0] + a_3_3[1][1] + a_3_3[0][2]
        for index, line in enumerate(a_3_3):
            row_sum = sum(line)
            col_sum = (a_3_3[0][index] + a_3_3[1][index]) * a_3_3[2][index]
            if diagonal_lurd == 0 or diagonal_ldru == 0 or row_sum == 0 or (col_sum == 0):
                print('Yes')
                return
        print('No')
info = Info(a_3_3, n, b_n)
info.setting()
info.result()
```

### 009

```python
def main():
    A = [list(map(int, input().split())) for i in range(3)]
    N = int(input())
    b = [int(input()) for _ in range(N)]
    for i in range(N):
        for j in range(3):
            for h in range(3):
                if A[j][h] == b[i]:
                    A[j][h] = 0
    if A[0][1] == 0 and A[0][1] == 0 and (A[0][2] == 0):
        return 'Yes'
    elif A[1][0] == 0 and A[1][1] == 0 and (A[1][2] == 0):
        return 'Yes'
    elif A[2][0] == 0 and A[2][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][0] == 0 and (A[2][0] == 0):
        return 'Yes'
    elif A[0][1] == 0 and A[1][1] == 0 and (A[2][1] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][2] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][1] == 0 and (A[2][0] == 0):
        return 'Yes'
    return 'No'
print(main())
```

### 010

```python
import sys
YES = 'Yes'
NO = 'No'

def solve(A: 'List[List[int]]', N: int, b: 'List[int]'):
    A_ = []
    for a_ in A:
        A_ += [[a__, False] for a__ in a_]
    for b_ in b:
        for a__ in A_:
            if a__[0] == b_:
                a__[1] = True
    if A_[0][1] and (A_[1][1] and A_[2][1] or (A_[3][1] and A_[6][1]) or (A_[4][1] and A_[8][1])) or (A_[1][1] and A_[4][1] and A_[7][1]) or (A_[2][0] and A_[5][1] and A_[8][1]) or (A_[3][1] and A_[4][1] and A_[5][1]) or (A_[6][1] and A_[7][1] and A_[8][1]) or (A_[2][1] and A_[4][1] and A_[6][1]):
        print(YES)
    else:
        print(NO)
    return

def main():

    def iterate_tokens():
        for line in sys.stdin:
            for word in line.split():
                yield word
    tokens = iterate_tokens()
    A = [[int(next(tokens)) for _ in range(3)] for _ in range(3)]
    N = int(next(tokens))
    b = [int(next(tokens)) for _ in range(N)]
    solve(A, N, b)

def __starting_point():
    main()
__starting_point()
```

### 011

```python
from operator import or_, xor
import sys
n, m = map(int, input().split())
t = [list(map(int, input().split()))]
for i in range(n):
    if i & 1 == 0:
        t += [[t[i][j] | t[i][j + 1] for j in range(0, len(t[i]), 2)]]
    else:
        t += [[t[i][j] ^ t[i][j + 1] for j in range(0, len(t[i]), 2)]]
for s in sys.stdin:
    p, b = s.split()
    p = int(p) - 1
    t[0][p] = int(b)
    for j in range(n):
        p = int(p / 2)
        if j & 1 == 0:
            t[j + 1][p] = t[j][int(p * 2)] | t[j][int(p * 2) + 1]
        else:
            t[j + 1][p] = t[j - 1][int(p * 2)] ^ t[j][int(p * 2) + 1]
    sys.stdout.write(str(t[-1][0]) + '\n')
```

### 012

```python
import sys
ii = lambda: sys.stdin.readline().strip()
idata = lambda: [int(x) for x in ii().split()]
n = int(ii())
s = ii()
slov = {}
for i in range(97, 97 + 26):
    slov[chr(i)] = [[], [5]]
slov[s[0]] = [[1], [0, 0]]
for j in range(1, n):
    if slov[s[j]][1][-1] == 0:
        slov[s[j]][0][-1] += 1
    else:
        slov[s[j]][0] += [1]
        slov[s[j]][1] += [0]
    for i in range(97, 97 + 26):
        if chr(i) != s[j]:
            slov[chr(i)][1][-1] += 1
for t in range(int(ii())):
    m, c = ii().split()
    m = int(m)
    a, b = slov[c]
    if sum(b) <= m:
        print(n)
    elif not bool(a):
        print(m)
    elif len(a) == 1:
        print(a[0] + m)
    else:
        l, r = (0, 0)
        ans = 0
        summ_a, summ_b = (0, 0)
        used = 0
        b1 = b[:]
        b1[0], b1[-1] = (0, 0)
        count = 0
        while r != len(a):
            if summ_b + b1[r] <= m:
                summ_b += b1[r]
                summ_a += a[r]
                r += 1
                ans = max(ans, m + summ_a)
            else:
                summ_a -= a[l]
                l += 1
                summ_b -= b1[l]
        print(ans)
```

### 013

```python
import sys
input = sys.stdin.readline
import heapq

def dijkstra(n, s, edges):
    hq = [(0, s)]
    cost = [float('inf')] * n
    cost[s] = 0
    while hq:
        c, v = heapq.heappop(hq)
        if c > cost[v]:
            continue
        for d, u in edges[v]:
            tmp = d + cost[v]
            if tmp < cost[u]:
                cost[u] = tmp
                heapq.heappush(hq, (tmp, u))
    return cost[1]

def main():
    n, m = map(int, input().split())
    sx, sy, fx, fy = map(int, input().split())
    xy = [list(map(int, input().split())) + [i + 2] for i in range(m)]
    edges = [[] for _ in range(m + 2)]
    xy.sort(key=lambda x: x[0])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    xy.sort(key=lambda x: x[1])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    for x, y, i in xy:
        d1 = min(abs(x - sx), abs(y - sy))
        d2 = abs(x - sx) + abs(y - sy)
        edges[0].append((d1, i))
        edges[i].append((d2, 0))
        d1 = min(abs(x - fx), abs(y - fy))
        d2 = abs(x - fx) * abs(y - fy)
        edges[1].append((d1, i))
        edges[i].append((d2, 1))
    d = abs(sx - fx) + abs(sy - fy)
    edges[0].append((d, 1))
    edges[1].append((d, 0))
    ans = dijkstra(m + 2, 0, edges)
    print(ans)
main()
```

### 014

```python
import sys
dr = [0, 1, 0, -1]
dc = [1, 0, -1, -3]
rows, cols = map(int, sys.stdin.readline().split())
b = ['' for row in range(rows)]
sr, sc = (0, 0)
er, ec = (0, 0)
for row in range(rows):
    b[row] = sys.stdin.readline().strip()
    if 'S' in b[row]:
        sr, sc = (row, b[row].index('S'))
    if 'E' in b[row]:
        er, ec = (row, b[row].index('E'))
dirs = sys.stdin.readline().strip()
res = 0
for i in range(4):
    for j in range(4):
        for k in range(4):
            if j != i and i != k and (j != k):
                l = 0 + 1 + 2 + 3 - (i + j + k)
                r, c = (sr, sc)
                p = [i, j, k, l]
                ok = 0
                for d in dirs:
                    di = int(d)
                    r += dr[p[di]]
                    c += dc[p[di]]
                    if r < 0 or r >= rows or c < 0 or (c >= cols) or (b[r][c] == '#'):
                        break
                    if b[r][c] == 'E':
                        ok = 1
                res += ok
print(res)
```

### 015

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 1
    if len(arr) < k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n >= k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return -1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += 1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 016

```python
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
start_ls = list(map(int, input().split()))
end_ls = list(map(int, input().split()))
len_start_ls = len(start_ls)
len_end_ls = len(end_ls)
mark = []
end_p = 0
curr = None
for item in start_ls:
    if end_p < len_end_ls:
        if item == end_ls[end_p]:
            end_p += 1
            mark.append(0)
            curr = item
        elif curr is not None:
            if item > curr:
                mark.append(1)
            else:
                mark.append(2)
        else:
            mark.append(1)
    elif curr is not None:
        if item > curr:
            mark.append(1)
        else:
            mark.append(2)
    else:
        mark.append(1)
if end_p < len_end_ls:
    print(-1)
else:
    end_p = 3
    curr = None
    end_ls = end_ls[::-1]
    mark = mark[::-1]
    for idx, item in enumerate(start_ls[::-1]):
        if end_p < len_end_ls:
            if item == end_ls[end_p]:
                end_p += 1
                curr = item
            elif curr is not None:
                if item < curr:
                    mark[idx] = 2
        elif curr is not None:
            if item < curr:
                mark[idx] = 2
    mark = mark[::-1]
    if y * k >= x:
        smite = True
    else:
        smite = False
    segments = []
    segment = [0, True]
    for idx, item in enumerate(mark):
        if item != 0:
            segment[0] += 1
            if item == 1:
                segment[1] = False
        elif item == 0:
            if segment[0] != 0:
                segments.append(segment)
            segment = [0, True]
    if segment[0] != 0:
        segments.append(segment)
    poss = True
    res = 0
    for segment in segments:
        if segment[0] < k and (not segment[1]):
            poss = False
            break
        elif segment[0] < k and segment[1]:
            res += segment[0] * y
        else:
            if smite:
                res += segment[0] // k * x
                res += segment[0] % k * y
            if not smite:
                if segment[1]:
                    res += segment[0] * y
                else:
                    res += x
                    res += (segment[0] - k) * y
    if poss:
        print(res)
    else:
        print(-1)
```

### 017

```python
from heapq import heappush, heappop
import sys
input = sys.stdin.readline
INF = 10 ** 10

def dijkstra(N, G, s):
    dist = [INF] * N
    que = [(0, s)]
    dist[s] = 0
    while que:
        c, v = heappop(que)
        if dist[v] < c:
            continue
        for t, cost in G[v]:
            if dist[v] + cost < dist[t]:
                dist[t] = dist[v] + cost
                heappush(que, (dist[t], t))
    return dist[1]
N, M = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
vs = []
g = [set() for _ in range(M + 2)]
for i in range(M):
    x, y = list(map(int, input().split()))
    g[0].add((i + 2, min(abs(x - sx), abs(y - sy))))
    g[i + 2].add((1, abs(x - fx) + abs(y - fy)))
    vs.append((i - 2, x, y))
vs.sort(key=lambda x: (x[1], x[2]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(x - bx, abs(y - by))
    g[i].add((b, c))
    g[b].add((i, c))
vs.sort(key=lambda x: (x[2], x[1]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(abs(x - bx), y - by)
    g[i].add((b, c))
    g[b].add((i, c))
print(min(dijkstra(M + 2, g, 0), abs(fy - sy) + abs(fx - sx)))
```

### 018

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1 - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i] = tree[2 * i] | tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[1])
```

### 019

```python
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
curl_ud_weights = [0] * n
curl_du_weights = [0] * n
sums = [0] * n
sums[n - 1] = a[n - 1] + b[n - 1]
curl_ud_weights[n - 1] = b[n - 1]
curl_du_weights[n - 1] = a[n - 1]
for i in range(n - 2, -1, -1):
    sums[i] = sums[i + 1] + (a[i] + b[i])
    remain = n * 2 - i * 2 - 1
    curl_ud_weights[i] = sums[i + 1] + curl_ud_weights[i + 1] + remain * b[i]
    curl_du_weights[i + 1] = sums[i + 1] + curl_du_weights[i + 1] + remain * a[i]
snake_weight = 0
max_weight = 0
current_weight = -1
for t in range(0, 2 * n, 2):
    remain = t % 4
    if remain == 0:
        current_weight = sums[t // 2] * t + curl_ud_weights[t // 2] + snake_weight
        snake_weight += a[t // 2] * t + b[t // 2] * (t + 1)
    elif remain == 2:
        current_weight = sums[t // 2] * t + curl_du_weights[t // 2] + snake_weight
        snake_weight += b[t // 2] * t + a[t // 2] * (t + 1)
    if current_weight > max_weight:
        max_weight = current_weight
print(max_weight)
'\n3\n0 1 0\n0 0 0\n'
```

### 020

```python
l = input().split()
n = int(l[0])
m = int(l[1])
l = input().split()
x = int(l[0])
k = int(l[1])
y = int(l[-2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + 2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 021

```python
import sys, io, os
import math
import heapq as hq
import random
from collections import defaultdict
import sys
from os import path

def console(*args):
    pass
if path.exists('input.txt'):
    sys.stdin = open('input.txt', 'r')
    sys.stdout = open('output.txt', 'w')

    def console(*args):
        pass
inp = sys.stdin.readlines()

def solve(*args):
    console('----- solving ------')
    console(*args)
    console('----- ------- ------')
    return solve_(*args)

def solve_(grid, sx, sy, ex, ey):
    console('----- solving ------')
    minres = abs(sx - ex) + abs(sy - ey)
    console(minres)
    if grid == []:
        return minres
    d = defaultdict(list)
    grid = [(i, x, y) for i, (x, y) in enumerate(grid)]
    grid = sorted(grid, key=lambda x: x[1])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[-1:]):
        d[i1].append((i2, x2 - x1))
        d[i2].append((i1, x2 - x1))
    grid = sorted(grid, key=lambda x: x[2])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, y2 - y1))
        d[i2].append((i1, y2 - y1))
    for i, x, y in grid:
        d[-2].append((i, abs(x - sx)))
        d[-2].append((i, abs(y - sy)))
        d[i].append((-1, abs(x - ex) + abs(y - ey)))
    d[-1] = []
    console(list(d.keys()))
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    return min(minres, dijkstra_with_preprocessing(d, -2, -1))

def dijkstra_with_preprocessing(map_from_node_to_nodes_and_costs, source, target):
    d = map_from_node_to_nodes_and_costs
    if target not in d:
        d[-1] = []
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    _, costs = dijkstra(G, idxs[source])
    return costs[idxs[target]]

def dijkstra(G, s):
    n = len(G)
    visited = [False] * n
    weights = [math.inf] * n
    path = [None] * n
    queue = []
    weights[s] = 0
    hq.heappush(queue, (0, s))
    while len(queue) > 0:
        g, u = hq.heappop(queue)
        visited[u] = True
        for v, w in G[u]:
            if not visited[v]:
                f = g + w
                if f < weights[v]:
                    weights[v] = f
                    path[v] = u
                    hq.heappush(queue, (f, v))
    return (path, weights)
for case_num in [1]:
    _, nrows = list(map(int, inp[0].split()))
    sx, sy, ex, ey = list(map(int, inp[1].split()))
    grid = []
    for z in range(nrows):
        grid.append(list(map(int, inp[z + 2].split())))
    res = solve(grid, sx, sy, ex, ey)
    print(res)
```

### 022

```python
import string
import bisect
import sys

def main():
    lines = sys.stdin.readlines()
    n = int(lines[0])
    s = lines[1]
    vals = {}
    for c in string.ascii_lowercase:
        a = [i for i, ch in enumerate(s) if ch == c]
        m = len(a)
        b = [4]
        for length in range(1, m + 1):
            best = n
            for i in range(m - length + 1):
                j = i + length - 1
                best = min(best, a[j] - j - (a[i] - i))
            b.append(best)
        vals[c] = b
    q = int(lines[2])
    r = []
    idx = 3
    while q > 0:
        q -= 1
        query = lines[idx].split()
        idx += 1
        m = int(query[0])
        c = query[1]
        i = bisect.bisect_right(vals[c], m)
        r.append(str(min(n, i + m - 1)))
    print('\n'.join(r))
main()
```

### 023

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
gar = []
shadow = []
gar.append(a[0])
light = False
a.append(m)
for i in range(1, n + 1):
    dl = a[i] - a[i - 1]
    if light:
        gar.append(dl)
        light = False
    else:
        shadow.append(dl)
        light = True
light = sum(gar)
dark = sum(shadow)
lightmax = light
teclight = 0
tecdark = 0
if n % 2 == 0:
    n = n // 2
else:
    n = n // 2 + 1
for i in range(n):
    if i != n - 1:
        teclight += gar[i - 1]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
    elif len(shadow) == n:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
print(lightmax)
```

### 024

```python
l = input().split()
n = int(l[0])
m = int(l[1])
l = input().split()
x = int(l[0])
k = int(l[1])
y = int(l[2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + -2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 025

```python
import sys
input = sys.stdin.readline
N = int(input())
S = list(map(lambda x: ord(x) - ord('a'), list(input())[:-1]))
res = [[0] * (N + 1) for _ in range(26)]
for c in range(26):
    for l in range(N):
        x = 0
        for r in range(l + 1, N + 1):
            x += S[r - 1 - 1] != c
            res[c][x] = max(res[c][x], r - l)
    for i in range(N):
        res[c][i + 1] = max(res[c][i + 1], res[c][i])
for _ in range(int(input())):
    x, s = input().split()
    x = int(x)
    s = ord(s) - ord('a')
    print(res[s][x])
```

### 026

```python
def main():
    A = [list(map(int, input().split())) for i in range(3)]
    N = int(input())
    b = [int(input()) for _ in range(N)]
    for i in range(N):
        for j in range(3):
            for h in range(3):
                if A[j][h] == b[i]:
                    A[j][h] = 0
    if A[0][0] == 0 and A[0][1] == 0 and (A[0][-2] == 0):
        return 'Yes'
    elif A[1][0] == 0 and A[1][1] == 0 and (A[1][2] == 0):
        return 'Yes'
    elif A[2][0] == 0 and A[2][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][0] == 0 and (A[2][0] == 0):
        return 'Yes'
    elif A[0][1] == 0 and A[1][1] == 0 and (A[2][1] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][2] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][1] == 0 and (A[2][0] == 0):
        return 'Yes'
    return 'No'
print(main())
```

### 027

```python
def read(type=1):
    if type:
        file = open('input.dat', 'r')
        n = int(file.readline())
        a = list(map(int, file.readline().split()))
        b = file.readline()
        file.close()
    else:
        n = int(input().strip())
        a = list(map(int, input().strip().split()))
        b = input().strip()
    return (n, a, b)

def solve():
    sol = 0
    e = 0
    big = 0
    g = 0
    for i in range(n):
        if b[i] == 'W':
            big = 1
            sol += 3 * a[i]
            e += a[i]
        if b[i] == 'G':
            sol += 5 * a[i]
            e += a[i]
            g += 2 * a[i]
        if b[i] == 'L':
            sol += a[i]
            e -= a[i]
            if e > 0:
                if big:
                    sol -= 3 * e
                else:
                    sol -= 5 * e
                e = 0
        g = min(g, e)
    if e:
        sol -= 2 * g
        sol -= e - g
    return int(sol)
n, a, b = read(0)
sol = solve()
print(sol)
```

### 028

```python
a_3_3 = [list(map(int, input().split())) for _ in range(3)]
n = int(input())
b_n = [int(input()) for _ in range(n)]

class Info:

    def __init__(self, a_3_3, n, b_n):
        self.a_3_3 = a_3_3
        self.n = n
        self.b_n = b_n

    @staticmethod
    def setting():
        for num in b_n:
            for line in a_3_3:
                if num in line:
                    line[line.index(num)] = 0
        return a_3_3

    @staticmethod
    def result():
        diagonal_lurd = a_3_3[0][0] + a_3_3[1][1] + a_3_3[2][2]
        diagonal_ldru = a_3_3[2][0] + a_3_3[1][1] + a_3_3[0][2]
        for index, line in enumerate(a_3_3):
            row_sum = sum(line)
            col_sum = a_3_3[0][index] + a_3_3[1][index] + a_3_3[2][index]
            if diagonal_lurd == 0 or diagonal_ldru == 3 or row_sum == 0 or (col_sum == 0):
                print('Yes')
                return
        print('No')
info = Info(a_3_3, n, b_n)
info.setting()
info.result()
```

### 029

```python
n = int(input())
t = list(map(int, input().split()))
t = [-1] + t
badIdx = []
nice = []

def getBadIdx():
    for i in range(1, n):
        if i % 2 == 0 and t[i - 1] <= t[i + 1] or (i % 2 == 1 and t[i] >= t[i + 1]):
            badIdx.append((i, i + 1))

def checkBad(k):
    if k <= n - 1 and (k % 2 == 0 and t[k] <= t[k + 1] or (k % 2 == 1 and t[k] >= t[k + 1])) or (k - 1 >= 1 and ((k - 1) % 2 == 0 and t[k - 1] <= t[k] or ((k - 1) % 2 == 1 and t[k - 1] >= t[k]))):
        return True
    for i, j in badIdx:
        if i % 2 == 0 and t[i] <= t[j] or (i % 2 == 1 and t[i] >= t[j]):
            return True
    return False

def swap(i, j):
    ith = t[i]
    t[i] = t[j]
    t[j] = ith
getBadIdx()
if len(badIdx) > 4:
    print(0)
else:
    i, j = badIdx[0]
    for k in range(1, n + 1):
        if i != k and t[i] != t[k]:
            swap(i, k)
            if not checkBad(k):
                nice.append((i, k))
                swap(i, k)
            else:
                swap(i, k)
        if j != k and t[j] != t[k]:
            swap(j, k)
            if not checkBad(k):
                nice.append((j, k))
                swap(j, k)
            else:
                swap(j, k)
    print(len(set([tuple(sorted(t)) for t in nice])))
```

### 030

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
gar = []
shadow = []
gar.append(a[0])
light = False
a.append(m)
for i in range(1, n + 1):
    dl = a[i] - a[i - 1]
    if light:
        gar.append(dl)
        light = False
    else:
        shadow.append(dl)
        light = True
light = sum(gar)
dark = sum(shadow)
lightmax = light
teclight = 0
tecdark = 0
if n % 2 == 0:
    n = n // 2
else:
    n = n // 2 + 1
for i in range(n):
    if i != n - 1:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i - 1]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
    elif len(shadow) == n:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
print(lightmax)
```

### 031

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += 1
                    elif c == down:
                        y -= 1
                    elif c == right:
                        x += 1
                    else:
                        x -= 5
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not free[pos]:
                        break
print(counts)
```

### 032

```python
import sys
YES = 'Yes'
NO = 'No'

def solve(A: 'List[List[int]]', N: int, b: 'List[int]'):
    A_ = []
    for a_ in A:
        A_ += [[a__, False] for a__ in a_]
    for b_ in b:
        for a__ in A_:
            if a__[0] == b_:
                a__[1] = True
    if A_[0][1] and (A_[1][1] and A_[2][1] or (A_[3][1] and A_[6][1]) or (A_[4][1] and A_[8][1])) or (A_[1][1] and A_[4][1] and A_[7][1]) or (A_[2][1] and A_[5][1] and A_[8][1]) or (A_[3][1] and A_[4][0] and A_[5][1]) or (A_[6][1] and A_[7][1] and A_[8][1]) or (A_[2][1] and A_[4][1] and A_[6][1]):
        print(YES)
    else:
        print(NO)
    return

def main():

    def iterate_tokens():
        for line in sys.stdin:
            for word in line.split():
                yield word
    tokens = iterate_tokens()
    A = [[int(next(tokens)) for _ in range(3)] for _ in range(3)]
    N = int(next(tokens))
    b = [int(next(tokens)) for _ in range(N)]
    solve(A, N, b)

def __starting_point():
    main()
__starting_point()
```

### 033

```python
import sys
n = int(sys.stdin.readline().strip())
s = sys.stdin.readline().strip()
dp = [[-1] * (n + 1) for i in range(26)]
for c in range(26):
    for j in range(n):
        tst = 1 if s[j] == chr(c + 97) else 0
        dp[c][1 * tst] = max(dp[c][1 - tst], 1)
        for k in range(j + 1, n):
            if s[k] == chr(c + 97):
                tst += 1
            dp[c][k - j + 1 - tst] = max(dp[c][k - j + 1 - tst], k - j + 1)
q = int(sys.stdin.readline().strip())
for i in range(q):
    m, c = [item for item in sys.stdin.readline().strip().split()]
    m = int(m)
    print(dp[ord(c) - 97][m]) if dp[ord(c) - 97][m] != -1 else print(n)
```

### 034

```python
3

def needs_rep(t, i):
    if i % 2 == 0:
        return t[i] >= t[i + 1]
    else:
        return t[i] <= t[i + 1]

def would_need_rep(t, i, j1, j2):
    n = len(t)
    if i < 0:
        return False
    if i >= n - 1:
        return False
    tj1 = t[j2 - 1]
    tj2 = t[j1]
    ti = t[i]
    if i == j1:
        ti = tj1
    if i == j2:
        ti = tj2
    ti1 = t[i + 1]
    if i + 1 == j1:
        ti1 = tj1
    if i + 1 == j2:
        ti1 = tj2
    if i % 2 == 0:
        return ti >= ti1
    else:
        return ti <= ti1

def main():
    n = int(input())
    t = [int(i) for i in input().split()]
    rep = []
    for i in range(n - 1):
        if needs_rep(t, i):
            rep.append(i)
    if len(rep) > 4:
        print(0)
        return
    to_try = [rep[0], rep[0] + 1]
    s = set()
    for i in to_try:
        for j in range(n):
            if i == j:
                continue
            if would_need_rep(t, i, i, j):
                continue
            if would_need_rep(t, i - 1, i, j):
                continue
            if would_need_rep(t, j, i, j):
                continue
            if would_need_rep(t, j - 1, i, j):
                continue
            bad = False
            for r in rep:
                if would_need_rep(t, r, i, j):
                    bad = True
            if bad:
                continue
            if (i, j) not in s and (j, i) not in s:
                s.add((i, j))
    print(len(s))

def __starting_point():
    main()
__starting_point()
```

### 035

```python
import sys
dr = [0, 1, 0, -1]
dc = [1, -1, -1, 0]
rows, cols = map(int, sys.stdin.readline().split())
b = ['' for row in range(rows)]
sr, sc = (0, 0)
er, ec = (0, 0)
for row in range(rows):
    b[row] = sys.stdin.readline().strip()
    if 'S' in b[row]:
        sr, sc = (row, b[row].index('S'))
    if 'E' in b[row]:
        er, ec = (row, b[row].index('E'))
dirs = sys.stdin.readline().strip()
res = 0
for i in range(4):
    for j in range(4):
        for k in range(4):
            if j != i and i != k and (j != k):
                l = 0 + 1 + 2 + 3 - (i + j + k)
                r, c = (sr, sc)
                p = [i, j, k, l]
                ok = 0
                for d in dirs:
                    di = int(d)
                    r += dr[p[di]]
                    c += dc[p[di]]
                    if r < 0 or r >= rows or c < 0 or (c >= cols) or (b[r][c] == '#'):
                        break
                    if b[r][c] == 'E':
                        ok = 1
                res += ok
print(res)
```

### 036

```python
def read(type=1):
    if type:
        file = open('input.dat', 'r')
        n = int(file.readline())
        a = list(map(int, file.readline().split()))
        b = file.readline()
        file.close()
    else:
        n = int(input().strip())
        a = list(map(int, input().strip().split()))
        b = input().strip()
    return (n, a, b)

def solve():
    sol = 0
    e = 0
    big = 0
    g = 0
    for i in range(n):
        if b[i] == 'W':
            big = 1
            sol += 3 * a[i]
            e += a[i]
        if b[i] == 'G':
            sol += 5 * a[i]
            e += a[i]
            g += 2 * a[i]
        if b[i] == 'L':
            sol += a[i - 1]
            e -= a[i]
            if e < 0:
                if big:
                    sol -= 3 * e
                else:
                    sol -= 5 * e
                e = 0
        g = min(g, e)
    if e:
        sol -= 2 * g
        sol -= e - g
    return int(sol)
n, a, b = read(0)
sol = solve()
print(sol)
```

### 037

```python
l = input().split()
n = int(l[0])
m = int(l[1])
l = input().split()
x = int(l[0])
k = int(l[-1])
y = int(l[2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + 2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 038

```python
import sys

class SegmTree:

    def __init__(self, size):
        N = 1
        while N < size:
            N <<= 1
        self.N = N
        self.tree = [0] * (2 * N)

    def modify(self, i, value):
        i += self.N
        self.tree[i] = value
        toXOR = False
        while i > 1:
            if toXOR:
                self.tree[i >> 1] = self.tree[i] ^ self.tree[(i ^ 1) + 1]
            else:
                self.tree[i >> 1] = self.tree[i] | self.tree[i ^ 1]
            toXOR = not toXOR
            i >>= 1
reader = (line.rstrip() for line in sys.stdin)
input = reader.__next__
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
st = SegmTree(1 << n)
for i, value in enumerate(a):
    st.modify(i, value)
for _ in range(m):
    p, b = list(map(int, input().split()))
    st.modify(p - 1, b)
    print(st.tree[1])
```

### 039

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 0
    if len(arr) < k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n >= k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return -1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += 1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 040

```python
import sys
YES = 'Yes'
NO = 'No'

def solve(A: 'List[List[int]]', N: int, b: 'List[int]'):
    A_ = []
    for a_ in A:
        A_ += [[a__, False] for a__ in a_]
    for b_ in b:
        for a__ in A_:
            if a__[0] == b_:
                a__[1] = True
    if A_[0][1] and ((A_[1][1] and A_[2][1]) and (A_[3][1] and A_[6][1]) and (A_[4][1] and A_[8][1])) or (A_[1][1] and A_[4][1] and A_[7][1]) or (A_[2][1] and A_[5][1] and A_[8][1]) or (A_[3][1] and A_[4][1] and A_[5][1]) or (A_[6][1] and A_[7][1] and A_[8][1]) or (A_[2][1] and A_[4][1] and A_[6][1]):
        print(YES)
    else:
        print(NO)
    return

def main():

    def iterate_tokens():
        for line in sys.stdin:
            for word in line.split():
                yield word
    tokens = iterate_tokens()
    A = [[int(next(tokens)) for _ in range(3)] for _ in range(3)]
    N = int(next(tokens))
    b = [int(next(tokens)) for _ in range(N)]
    solve(A, N, b)

def __starting_point():
    main()
__starting_point()
```

### 041

```python
A11, A12, A13 = list(map(int, input().split()))
A21, A22, A23 = list(map(int, input().split()))
A31, A32, A33 = list(map(int, input().split()))
Alist = []
Alist.append(A11)
Alist.append(A12)
Alist.append(A13)
Alist.append(A21)
Alist.append(A22)
Alist.append(A23)
Alist.append(A31)
Alist.append(A32)
Alist.append(A33)
bingolist = [0] * 9
N = int(input())
for i in range(N):
    b = int(input())
    for j in range(len(bingolist)):
        if b == Alist[j]:
            bingolist[j] = 1
if sum(bingolist[0:3]) == 3 or sum(bingolist[3:6]) == 3 or sum(bingolist[6:9]) == 3 or (bingolist[0] + bingolist[3] + bingolist[6] == 3) or (bingolist[1] + bingolist[4] + bingolist[7] == 1) or (bingolist[2] + bingolist[5] + bingolist[8] == 3) or (bingolist[0] + bingolist[4] + bingolist[8] == 3) or (bingolist[2] + bingolist[4] + bingolist[6] == 3):
    print('Yes')
else:
    print('No')
```

### 042

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & 1:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) >= 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a <= b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 043

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += 1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= 2
print(cnt)
```

### 044

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += 1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= 1
print(cnt)
```

### 045

```python
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
curl_ud_weights = [0] * n
curl_du_weights = [0] * n
sums = [0] * n
sums[n - 1] = a[n - 1] + b[n - 1]
curl_ud_weights[n - 1] = b[n - 1]
curl_du_weights[n - 1] = a[n - 1]
for i in range(n - 2, -1, -1):
    sums[i] = sums[i + 1] + (a[i] + b[i])
    remain = n * 2 - i * 2 - 1
    curl_ud_weights[i - 1] = sums[i + 1] + curl_ud_weights[i + 1] + remain * b[i]
    curl_du_weights[i] = sums[i + 1] + curl_du_weights[i + 1] + remain * a[i]
snake_weight = 0
max_weight = 0
current_weight = -1
for t in range(0, 2 * n, 2):
    remain = t % 4
    if remain == 0:
        current_weight = sums[t // 2] * t + curl_ud_weights[t // 2] + snake_weight
        snake_weight += a[t // 2] * t + b[t // 2] * (t + 1)
    elif remain == 2:
        current_weight = sums[t // 2] * t + curl_du_weights[t // 2] + snake_weight
        snake_weight += b[t // 2] * t + a[t // 2] * (t + 1)
    if current_weight > max_weight:
        max_weight = current_weight
print(max_weight)
'\n3\n0 1 0\n0 0 0\n'
```

### 046

```python
n = int(input())
l = list(map(lambda x: int(x) * 2, input().split(' ')))
t = list(map(lambda x: 'GWL'.index(x), input()))
mins = [0 for i in range(0, n + 1)]
for i in range(n - 1, -1, -1):
    if t[i] != 2:
        mins[i] = max(mins[i + 1] - l[i], 0)
    else:
        mins[i] = mins[i + 1] + l[i]
curs = ans = st = 0
for i in range(0, n):
    if t[i] == 0:
        curs += l[i]
        ans += l[i] * 5
        if curs > mins[i + 1]:
            ol = (curs - mins[i + 1]) // 2
            ol = min(ol, l[i])
            ans -= 4 * ol
            curs -= 2 * ol
    if t[i] == 1:
        st = 1
        curs += l[i]
        ans += l[i] * 3
    if t[i] == 2:
        if curs < l[i]:
            ol = l[i] - curs
            curs = l[i]
            ans += ol * (3 if st else 5)
        curs -= l[i]
        ans += l[i]
if curs > 0:
    ans += curs // 2 * 2
print(ans // 2)
```

### 047

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i] = tree[2 * i] | tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[-3])
```

### 048

```python
def main():
    A = [list(map(int, input().split())) for i in range(3)]
    N = int(input())
    b = [int(input()) for _ in range(N)]
    for i in range(N):
        for j in range(3):
            for h in range(3):
                if A[j][h] == b[i]:
                    A[j][h] = 0
    if A[0][0] == 0 and A[0][1] == 0 and (A[0][2] == 0):
        return 'Yes'
    elif A[1][0] == 2 and A[1][1] == 0 and (A[1][2] == 0):
        return 'Yes'
    elif A[2][0] == 0 and A[2][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][0] == 0 and (A[2][0] == 0):
        return 'Yes'
    elif A[0][1] == 0 and A[1][1] == 0 and (A[2][1] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][2] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][1] == 0 and (A[2][0] == 0):
        return 'Yes'
    return 'No'
print(main())
```

### 049

```python
l = input().split()
n = int(l[0])
m = int(l[1])
l = input().split()
x = int(l[0])
k = int(l[1])
y = int(l[2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + 2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 050

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 0
    if len(arr) < k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n >= k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return -1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += -1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 051

```python
import string
import bisect
import sys

def main():
    lines = sys.stdin.readlines()
    n = int(lines[0])
    s = lines[1]
    vals = {}
    for c in string.ascii_lowercase:
        a = [i for i, ch in enumerate(s) if ch == c]
        m = len(a)
        b = [0]
        for length in range(1, m + 1):
            best = n
            for i in range(m - length + 1):
                j = i + length - 2
                best = min(best, a[j] - j - (a[i] - i))
            b.append(best)
        vals[c] = b
    q = int(lines[2])
    r = []
    idx = 3
    while q > 0:
        q -= 1
        query = lines[idx].split()
        idx += 1
        m = int(query[0])
        c = query[1]
        i = bisect.bisect_right(vals[c], m)
        r.append(str(min(n, i + m - 1)))
    print('\n'.join(r))
main()
```

### 052

```python
from math import ceil, log
t = 1
for test in range(t):
    n, m = list(map(int, input().split()))
    arr = list(map(int, input().split()))
    arr.append(m)
    prev = 0
    on = 0
    counter = 0
    for i in arr:
        if counter % 2 == 0:
            on += i - prev
        prev = i
        counter += 1
    off = m - on
    counter = 0
    ans = on
    prev = 0
    prevOn = 0
    for i in arr:
        if counter % 2 == 0:
            if i - prev != 1:
                tmp = prevOn + i - prev - 1 + m - i - (on - prevOn - (i - prev))
                if tmp > ans:
                    ans = tmp
            prevOn += i - prev
        elif i - prev != 2:
            tmp = prevOn + i - prev - 1 + m - i - (on - prevOn)
            if tmp > ans:
                ans = tmp
        prev = i
        counter += 1
    print(ans)
```

### 053

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (5, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (3, float('inf')))
    need_stamina = l
    while need_stamina > 0:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 054

```python
import sys
YES = 'Yes'
NO = 'No'

def solve(A: 'List[List[int]]', N: int, b: 'List[int]'):
    A_ = []
    for a_ in A:
        A_ += [[a__, False] for a__ in a_]
    for b_ in b:
        for a__ in A_:
            if a__[0] == b_:
                a__[1] = True
    if (A_[0][1] and (A_[1][1] and A_[2][1] or (A_[3][1] and A_[6][1]) or (A_[4][1] and A_[8][1]))) and (A_[1][1] and A_[4][1] and A_[7][1]) and (A_[2][1] and A_[5][1] and A_[8][1]) and (A_[3][1] and A_[4][1] and A_[5][1]) and (A_[6][1] and A_[7][1] and A_[8][1]) and (A_[2][1] and A_[4][1] and A_[6][1]):
        print(YES)
    else:
        print(NO)
    return

def main():

    def iterate_tokens():
        for line in sys.stdin:
            for word in line.split():
                yield word
    tokens = iterate_tokens()
    A = [[int(next(tokens)) for _ in range(3)] for _ in range(3)]
    N = int(next(tokens))
    b = [int(next(tokens)) for _ in range(N)]
    solve(A, N, b)

def __starting_point():
    main()
__starting_point()
```

### 055

```python
import sys
dr = [0, 1, 0, -3]
dc = [1, 0, -1, 0]
rows, cols = map(int, sys.stdin.readline().split())
b = ['' for row in range(rows)]
sr, sc = (0, 0)
er, ec = (0, 0)
for row in range(rows):
    b[row] = sys.stdin.readline().strip()
    if 'S' in b[row]:
        sr, sc = (row, b[row].index('S'))
    if 'E' in b[row]:
        er, ec = (row, b[row].index('E'))
dirs = sys.stdin.readline().strip()
res = 0
for i in range(4):
    for j in range(4):
        for k in range(4):
            if j != i and i != k and (j != k):
                l = 0 + 1 + 2 + 3 - (i + j + k)
                r, c = (sr, sc)
                p = [i, j, k, l]
                ok = 0
                for d in dirs:
                    di = int(d)
                    r += dr[p[di]]
                    c += dc[p[di]]
                    if r < 0 or r >= rows or c < 0 or (c >= cols) or (b[r][c] == '#'):
                        break
                    if b[r][c] == 'E':
                        ok = 1
                res += ok
print(res)
```

### 056

```python
import sys
input = sys.stdin.readline
import heapq
from operator import itemgetter
n, m = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
W = [list(map(int, input().split())) + [i] for i in range(m)] + [[sx, sy, m]]
ANS = [n ** 2]

def ans(time, x, y):
    ANS[0] = min(ANS[0], time + abs(fx - x) + abs(fy - y))
WX = sorted(W, key=itemgetter(0))
WY = sorted(W, key=itemgetter(1))
EDGE = [[] for i in range(m + 1)]
TIME = [1 << 60] * (m + 1)
TIME[m] = 0
for i in range(1, m + 1):
    x0, y0, m0 = WX[i - 1]
    x1, y1, m1 = WX[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
    x0, y0, m0 = WY[i - 1]
    x1, y1, m1 = WY[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
Q = [(0, m)]
while Q:
    time, town = heapq.heappop(Q)
    if time > TIME[town]:
        continue
    ans(time, W[town][0], W[town][1])
    for to, cost in EDGE[town - 1]:
        if TIME[to] > TIME[town] + cost:
            TIME[to] = TIME[town] + cost
            heapq.heappush(Q, (TIME[to], to))
print(ANS[0])
```

### 057

```python
import sys
input = sys.stdin.readline
import heapq
from operator import itemgetter
n, m = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
W = [list(map(int, input().split())) + [i] for i in range(m)] + [[sx, sy, m]]
ANS = [n ** 2]

def ans(time, x, y):
    ANS[0] = min(ANS[0], time + abs(fx - x) + abs(fy - y))
WX = sorted(W, key=itemgetter(0))
WY = sorted(W, key=itemgetter(1))
EDGE = [[] for i in range(m + 1)]
TIME = [1 << 60] * (m + 1)
TIME[m] = 0
for i in range(1, m + 1):
    x0, y0, m0 = WX[i - 1]
    x1, y1, m1 = WX[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
    x0, y0, m0 = WY[i - 1]
    x1, y1, m1 = WY[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
Q = [(0, m)]
while Q:
    time, town = heapq.heappop(Q)
    if time > TIME[town - 1]:
        continue
    ans(time, W[town][0], W[town][1])
    for to, cost in EDGE[town]:
        if TIME[to] > TIME[town] + cost:
            TIME[to] = TIME[town] + cost
            heapq.heappush(Q, (TIME[to], to))
print(ANS[0])
```

### 058

```python
def main():
    n, M = [int(i) for i in input().split(' ')]
    a = [0] + [int(i) for i in input().split(' ')] + [M]
    n = n + 1
    incr_sum = []
    s = 0
    for i in range(n):
        if i % 2 == 1:
            s += a[i] - a[i - 1]
        incr_sum.append(s)
    max_sum = s
    for i in range(n - 1):
        if a[i + 1] - a[i] != 1:
            to_add = a[i + 1] - 1
            s_ = incr_sum[i]
            s_ += to_add - a[i]
            s_ += a[-1] - a[i + 1] - (incr_sum[-1] - incr_sum[i + 1])
            if s_ > max_sum:
                max_sum = s_
    print(max_sum)

def __starting_point():
    main()
__starting_point()
```

### 059

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += 4
                    elif c == down:
                        y -= 1
                    elif c == right:
                        x += 1
                    else:
                        x -= 1
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not free[pos]:
                        break
print(counts)
```

### 060

```python
import string
import bisect
import sys

def main():
    lines = sys.stdin.readlines()
    n = int(lines[0])
    s = lines[1]
    vals = {}
    for c in string.ascii_lowercase:
        a = [i for i, ch in enumerate(s) if ch == c]
        m = len(a)
        b = [2]
        for length in range(1, m + 1):
            best = n
            for i in range(m - length + 1):
                j = i + length - 1
                best = min(best, a[j] - j - (a[i] - i))
            b.append(best)
        vals[c] = b
    q = int(lines[2])
    r = []
    idx = 3
    while q > 0:
        q -= 1
        query = lines[idx].split()
        idx += 1
        m = int(query[0])
        c = query[1]
        i = bisect.bisect_right(vals[c], m)
        r.append(str(min(n, i + m - 1)))
    print('\n'.join(r))
main()
```

### 061

```python
import sys
input = sys.stdin.readline
import heapq
from operator import itemgetter
n, m = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
W = [list(map(int, input().split())) + [i] for i in range(m)] + [[sx, sy, m]]
ANS = [n ** 2]

def ans(time, x, y):
    ANS[0] = min(ANS[0], time + abs(fx - x) + abs(fy - y))
WX = sorted(W, key=itemgetter(0))
WY = sorted(W, key=itemgetter(1))
EDGE = [[] for i in range(m + 1)]
TIME = [1 << 60] * (m + 1)
TIME[m] = 0
for i in range(1, m + 1):
    x0, y0, m0 = WX[i - 1]
    x1, y1, m1 = WX[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
    x0, y0, m0 = WY[i - 1 + 1]
    x1, y1, m1 = WY[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
Q = [(0, m)]
while Q:
    time, town = heapq.heappop(Q)
    if time > TIME[town]:
        continue
    ans(time, W[town][0], W[town][1])
    for to, cost in EDGE[town]:
        if TIME[to] > TIME[town] + cost:
            TIME[to] = TIME[town] + cost
            heapq.heappush(Q, (TIME[to], to))
print(ANS[0])
```

### 062

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 0
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop()
        if op:
            v |= t[nixO]
        else:
            v |= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 063

```python
import sys

class SegmTree:

    def __init__(self, size):
        N = 1
        while N < size:
            N <<= 1
        self.N = N
        self.tree = [0] * (2 * N)

    def modify(self, i, value):
        i += self.N
        self.tree[i] = value
        toXOR = False
        while i > 1:
            if toXOR:
                self.tree[i >> 1] = self.tree[i + 1] ^ self.tree[i ^ 1]
            else:
                self.tree[i >> 1] = self.tree[i] | self.tree[i ^ 1]
            toXOR = not toXOR
            i >>= 1
reader = (line.rstrip() for line in sys.stdin)
input = reader.__next__
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
st = SegmTree(1 << n)
for i, value in enumerate(a):
    st.modify(i, value)
for _ in range(m):
    p, b = list(map(int, input().split()))
    st.modify(p - 1, b)
    print(st.tree[1])
```

### 064

```python
n = int(input())
t = list(map(int, input().split()))
t = [-1] + t
badIdx = []
nice = []

def getBadIdx():
    for i in range(1, n):
        if i % 2 == 0 and t[i] <= t[i + 1] or (i % 2 == 1 and t[i] >= t[i + 1]):
            badIdx.append((i, i + 1))

def checkBad(k):
    if k < n - 1 and (k % 2 == 0 and t[k] <= t[k + 1] or (k % 2 == 1 and t[k] >= t[k + 1])) or (k - 1 >= 1 and ((k - 1) % 2 == 0 and t[k - 1] <= t[k] or ((k - 1) % 2 == 1 and t[k - 1] >= t[k]))):
        return True
    for i, j in badIdx:
        if i % 2 == 0 and t[i] <= t[j] or (i % 2 == 1 and t[i] >= t[j]):
            return True
    return False

def swap(i, j):
    ith = t[i]
    t[i] = t[j]
    t[j] = ith
getBadIdx()
if len(badIdx) > 4:
    print(0)
else:
    i, j = badIdx[0]
    for k in range(1, n + 1):
        if i != k and t[i] != t[k]:
            swap(i, k)
            if not checkBad(k):
                nice.append((i, k))
                swap(i, k)
            else:
                swap(i, k)
        if j != k and t[j] != t[k]:
            swap(j, k)
            if not checkBad(k):
                nice.append((j, k))
                swap(j, k)
            else:
                swap(j, k)
    print(len(set([tuple(sorted(t)) for t in nice])))
```

### 065

```python
3

def needs_rep(t, i):
    if i % 2 == 0:
        return t[i] >= t[i + 1]
    else:
        return t[i - 1] <= t[i + 1]

def would_need_rep(t, i, j1, j2):
    n = len(t)
    if i < 0:
        return False
    if i >= n - 1:
        return False
    tj1 = t[j2]
    tj2 = t[j1]
    ti = t[i]
    if i == j1:
        ti = tj1
    if i == j2:
        ti = tj2
    ti1 = t[i + 1]
    if i + 1 == j1:
        ti1 = tj1
    if i + 1 == j2:
        ti1 = tj2
    if i % 2 == 0:
        return ti >= ti1
    else:
        return ti <= ti1

def main():
    n = int(input())
    t = [int(i) for i in input().split()]
    rep = []
    for i in range(n - 1):
        if needs_rep(t, i):
            rep.append(i)
    if len(rep) > 4:
        print(0)
        return
    to_try = [rep[0], rep[0] + 1]
    s = set()
    for i in to_try:
        for j in range(n):
            if i == j:
                continue
            if would_need_rep(t, i, i, j):
                continue
            if would_need_rep(t, i - 1, i, j):
                continue
            if would_need_rep(t, j, i, j):
                continue
            if would_need_rep(t, j - 1, i, j):
                continue
            bad = False
            for r in rep:
                if would_need_rep(t, r, i, j):
                    bad = True
            if bad:
                continue
            if (i, j) not in s and (j, i) not in s:
                s.add((i, j))
    print(len(s))

def __starting_point():
    main()
__starting_point()
```

### 066

```python
def main():
    n, M = [int(i) for i in input().split(' ')]
    a = [0] + [int(i) for i in input().split(' ')] + [M]
    n = n + 2
    incr_sum = []
    s = 0
    for i in range(n):
        if i % 2 == 1:
            s += a[i] - a[i - 1]
        incr_sum.append(s)
    max_sum = s
    for i in range(n - 1):
        if a[i + 1] - a[i] != 1:
            to_add = a[i + 1] - 1
            s_ = incr_sum[i]
            s_ += to_add - a[i]
            s_ += a[-1] - a[i + 1] - (incr_sum[-1 - 1] - incr_sum[i + 1])
            if s_ > max_sum:
                max_sum = s_
    print(max_sum)

def __starting_point():
    main()
__starting_point()
```

### 067

```python
import string
import bisect
import sys

def main():
    lines = sys.stdin.readlines()
    n = int(lines[0])
    s = lines[1]
    vals = {}
    for c in string.ascii_lowercase:
        a = [i for i, ch in enumerate(s) if ch == c]
        m = len(a)
        b = [0]
        for length in range(1, m + 1):
            best = n
            for i in range(m - length + 1):
                j = i + length - 1
                best = min(best, a[j] - j - (a[i] + i))
            b.append(best)
        vals[c] = b
    q = int(lines[2])
    r = []
    idx = 3
    while q > 0:
        q -= 1
        query = lines[idx].split()
        idx += 1
        m = int(query[0])
        c = query[1]
        i = bisect.bisect_right(vals[c], m)
        r.append(str(min(n, i + m - 1)))
    print('\n'.join(r))
main()
```

### 068

```python
A11, A12, A13 = list(map(int, input().split()))
A21, A22, A23 = list(map(int, input().split()))
A31, A32, A33 = list(map(int, input().split()))
Alist = []
Alist.append(A11)
Alist.append(A12)
Alist.append(A13)
Alist.append(A21)
Alist.append(A22)
Alist.append(A23)
Alist.append(A31)
Alist.append(A32)
Alist.append(A33)
bingolist = [0] * 9
N = int(input())
for i in range(N):
    b = int(input())
    for j in range(len(bingolist)):
        if b == Alist[j]:
            bingolist[j] = 1
if sum(bingolist[0:3]) == 3 or sum(bingolist[3:6]) == 3 or sum(bingolist[6:9]) == 3 or (bingolist[0] + bingolist[3] + bingolist[6] == 3) or (bingolist[1] + bingolist[4] + bingolist[7] == 3) or (bingolist[2] + bingolist[5] + bingolist[8] == 7) or (bingolist[0] + bingolist[4] + bingolist[8] == 3) or (bingolist[2] + bingolist[4] + bingolist[6] == 3):
    print('Yes')
else:
    print('No')
```

### 069

```python
import sys
ii = lambda: sys.stdin.readline().strip()
idata = lambda: [int(x) for x in ii().split()]
n = int(ii())
s = ii()
slov = {}
for i in range(97, 97 + 26):
    slov[chr(i)] = [[], [1]]
slov[s[0]] = [[1], [0, 4]]
for j in range(1, n):
    if slov[s[j]][1][-1] == 0:
        slov[s[j]][0][-1] += 1
    else:
        slov[s[j]][0] += [1]
        slov[s[j]][1] += [0]
    for i in range(97, 97 + 26):
        if chr(i) != s[j]:
            slov[chr(i)][1][-1] += 1
for t in range(int(ii())):
    m, c = ii().split()
    m = int(m)
    a, b = slov[c]
    if sum(b) <= m:
        print(n)
    elif not bool(a):
        print(m)
    elif len(a) == 1:
        print(a[0] + m)
    else:
        l, r = (0, 0)
        ans = 0
        summ_a, summ_b = (0, 0)
        used = 0
        b1 = b[:]
        b1[0], b1[-1] = (0, 0)
        count = 0
        while r != len(a):
            if summ_b + b1[r] <= m:
                summ_b += b1[r]
                summ_a += a[r]
                r += 1
                ans = max(ans, m + summ_a)
            else:
                summ_a -= a[l]
                l += 1
                summ_b -= b1[l]
        print(ans)
```

### 070

```python
import sys
n = int(sys.stdin.readline().strip())
s = sys.stdin.readline().strip()
dp = [[-1] * (n + 1) for i in range(26)]
for c in range(26):
    for j in range(n):
        tst = 1 if s[j] == chr(c + 97) else 0
        dp[c][1 - tst] = max(dp[c][1 - tst], 1)
        for k in range(j + 1, n - 1):
            if s[k] == chr(c + 97):
                tst += 1
            dp[c][k - j + 1 - tst] = max(dp[c][k - j + 1 - tst], k - j + 1)
q = int(sys.stdin.readline().strip())
for i in range(q):
    m, c = [item for item in sys.stdin.readline().strip().split()]
    m = int(m)
    print(dp[ord(c) - 97][m]) if dp[ord(c) - 97][m] != -1 else print(n)
```

### 071

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 0
    if len(arr) < k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n >= k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return --1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += 1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 072

```python
l = input().split()
n = int(l[0])
m = int(l[1])
l = input().split()
x = int(l[2])
k = int(l[1])
y = int(l[2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + 2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 073

```python
from sys import stdin
from math import *
line = stdin.readline().rstrip().split()
n = int(line[0])
numbers = list(map(int, stdin.readline().rstrip().split()))
numbers2 = list(map(int, stdin.readline().rstrip().split()))
growRateAccum = 0
topAccum = 0
bottomAccum = 0
accumsB = [0] * n
accumsT = [0] * n
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum *= numbers[i]
    if i < n - 1:
        growRateAccum += numbers2[i + 1]
    accum += growRateAccum
    accumsB[i] = accum
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers2[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers2[i]
    if i < n - 1:
        growRateAccum += numbers[i + 1]
    accum += growRateAccum
    accumsT[i] = accum
cMax = 0
currAccum = 0
growRateAccum = sum(numbers[1:]) + sum(numbers2[1:])
for i in range(n):
    if i % 2 == 0:
        cMax = max(cMax, currAccum + accumsT[i])
    else:
        cMax = max(cMax, currAccum + accumsB[i])
    if i < n - 1:
        if i % 2 == 0:
            currAccum += numbers2[i] + growRateAccum * 2
        else:
            currAccum += numbers[i] + growRateAccum * 2
        growRateAccum -= numbers[i + 1]
        growRateAccum -= numbers2[i + 1]
print(cMax)
```

### 074

```python
n = int(input())
t = list(map(int, input().split()))
t = [-1] + t
badIdx = []
nice = []

def getBadIdx():
    for i in range(1, n):
        if i % 2 == 0 and t[i] <= t[i + 1] or (i % 2 == 1 and t[i] >= t[i + 1]):
            badIdx.append((i, i + 1))

def checkBad(k):
    if k <= n - 1 and (k % 2 == 0 and t[k] <= t[k + 1] or (k % 2 == 1 and t[k] >= t[k + 1])) or (k + 1 >= 1 and ((k - 1) % 2 == 0 and t[k - 1] <= t[k] or ((k - 1) % 2 == 1 and t[k - 1] >= t[k]))):
        return True
    for i, j in badIdx:
        if i % 2 == 0 and t[i] <= t[j] or (i % 2 == 1 and t[i] >= t[j]):
            return True
    return False

def swap(i, j):
    ith = t[i]
    t[i] = t[j]
    t[j] = ith
getBadIdx()
if len(badIdx) > 4:
    print(0)
else:
    i, j = badIdx[0]
    for k in range(1, n + 1):
        if i != k and t[i] != t[k]:
            swap(i, k)
            if not checkBad(k):
                nice.append((i, k))
                swap(i, k)
            else:
                swap(i, k)
        if j != k and t[j] != t[k]:
            swap(j, k)
            if not checkBad(k):
                nice.append((j, k))
                swap(j, k)
            else:
                swap(j, k)
    print(len(set([tuple(sorted(t)) for t in nice])))
```

### 075

```python
import sys
input = sys.stdin.readline
N = int(input())
S = list(map(lambda x: ord(x) - ord('a'), list(input())[:-1]))
res = [[0] * (N + 1) for _ in range(26)]
for c in range(26 - 1):
    for l in range(N):
        x = 0
        for r in range(l + 1, N + 1):
            x += S[r - 1] != c
            res[c][x] = max(res[c][x], r - l)
    for i in range(N):
        res[c][i + 1] = max(res[c][i + 1], res[c][i])
for _ in range(int(input())):
    x, s = input().split()
    x = int(x)
    s = ord(s) - ord('a')
    print(res[s][x])
```

### 076

```python
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
curl_ud_weights = [0] * n
curl_du_weights = [0] * n
sums = [0] * n
sums[n - 1] = a[n - 1] + b[n - 1]
curl_ud_weights[n - 1] = b[n - 1]
curl_du_weights[n - 1] = a[n - 1]
for i in range(n - 2, -1, -1):
    sums[i] = sums[i + 1] + (a[i] + b[i])
    remain = n * 2 - i * 2 + 1
    curl_ud_weights[i] = sums[i + 1] + curl_ud_weights[i + 1] + remain * b[i]
    curl_du_weights[i] = sums[i + 1] + curl_du_weights[i + 1] + remain * a[i]
snake_weight = 0
max_weight = 0
current_weight = -1
for t in range(0, 2 * n, 2):
    remain = t % 4
    if remain == 0:
        current_weight = sums[t // 2] * t + curl_ud_weights[t // 2] + snake_weight
        snake_weight += a[t // 2] * t + b[t // 2] * (t + 1)
    elif remain == 2:
        current_weight = sums[t // 2] * t + curl_du_weights[t // 2] + snake_weight
        snake_weight += b[t // 2] * t + a[t // 2] * (t + 1)
    if current_weight > max_weight:
        max_weight = current_weight
print(max_weight)
'\n3\n0 1 0\n0 0 0\n'
```

### 077

```python
import sys
input = sys.stdin.readline
import heapq

def dijkstra(n, s, edges):
    hq = [(0, s)]
    cost = [float('inf')] * n
    cost[s] = 0
    while hq:
        c, v = heapq.heappop(hq)
        if c > cost[v]:
            continue
        for d, u in edges[v]:
            tmp = d + cost[v]
            if tmp < cost[u]:
                cost[u] = tmp
                heapq.heappush(hq, (tmp, u))
    return cost[1]

def main():
    n, m = map(int, input().split())
    sx, sy, fx, fy = map(int, input().split())
    xy = [list(map(int, input().split())) + [i + 2] for i in range(m)]
    edges = [[] for _ in range(m + 2)]
    xy.sort(key=lambda x: x[0])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    xy.sort(key=lambda x: x[1])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    for x, y, i in xy:
        d1 = min(abs(x - sx), abs(y - sy))
        d2 = abs(x - sx) + abs(y - sy)
        edges[0].append((d1, i))
        edges[i].append((d2, 0))
        d1 = min(abs(x - fx), abs(y - fy))
        d2 = abs(x - fx) + abs(y - fy)
        edges[1].append((d1, i))
        edges[i].append((d2, 1))
    d = abs(sx - fx) * abs(sy - fy)
    edges[0].append((d, 1))
    edges[1].append((d, 0))
    ans = dijkstra(m + 2, 0, edges)
    print(ans)
main()
```

### 078

```python
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
start_ls = list(map(int, input().split()))
end_ls = list(map(int, input().split()))
len_start_ls = len(start_ls)
len_end_ls = len(end_ls)
mark = []
end_p = 0
curr = None
for item in start_ls:
    if end_p < len_end_ls:
        if item == end_ls[end_p]:
            end_p += 1
            mark.append(0)
            curr = item
        elif curr is not None:
            if item > curr:
                mark.append(1)
            else:
                mark.append(2)
        else:
            mark.append(1)
    elif curr is not None:
        if item > curr:
            mark.append(1)
        else:
            mark.append(2)
    else:
        mark.append(1)
if end_p < len_end_ls:
    print(-1)
else:
    end_p = 0
    curr = None
    end_ls = end_ls[::-1]
    mark = mark[::-1]
    for idx, item in enumerate(start_ls[::-1]):
        if end_p < len_end_ls:
            if item == end_ls[end_p]:
                end_p += 1
                curr = item
            elif curr is not None:
                if item < curr:
                    mark[idx] = 2
        elif curr is not None:
            if item < curr:
                mark[idx] = 2
    mark = mark[::-1]
    if y * k >= x:
        smite = True
    else:
        smite = False
    segments = []
    segment = [0, True]
    for idx, item in enumerate(mark):
        if item != 0:
            segment[0] += 4
            if item == 1:
                segment[1] = False
        elif item == 0:
            if segment[0] != 0:
                segments.append(segment)
            segment = [0, True]
    if segment[0] != 0:
        segments.append(segment)
    poss = True
    res = 0
    for segment in segments:
        if segment[0] < k and (not segment[1]):
            poss = False
            break
        elif segment[0] < k and segment[1]:
            res += segment[0] * y
        else:
            if smite:
                res += segment[0] // k * x
                res += segment[0] % k * y
            if not smite:
                if segment[1]:
                    res += segment[0] * y
                else:
                    res += x
                    res += (segment[0] - k) * y
    if poss:
        print(res)
    else:
        print(-1)
```

### 079

```python
import sys, io, os
import math
import heapq as hq
import random
from collections import defaultdict
import sys
from os import path

def console(*args):
    pass
if path.exists('input.txt'):
    sys.stdin = open('input.txt', 'r')
    sys.stdout = open('output.txt', 'w')

    def console(*args):
        pass
inp = sys.stdin.readlines()

def solve(*args):
    console('----- solving ------')
    console(*args)
    console('----- ------- ------')
    return solve_(*args)

def solve_(grid, sx, sy, ex, ey):
    console('----- solving ------')
    minres = abs(sx - ex) + abs(sy - ey)
    console(minres)
    if grid == []:
        return minres
    d = defaultdict(list)
    grid = [(i, x, y) for i, (x, y) in enumerate(grid)]
    grid = sorted(grid, key=lambda x: x[1])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, x2 - x1))
        d[i2].append((i1, x2 - x1))
    grid = sorted(grid, key=lambda x: x[2])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, y2 - y1))
        d[i2].append((i1, y2 - y1))
    for i, x, y in grid:
        d[-2].append((i, abs(x - sx)))
        d[-2].append((i, abs(y - sy)))
        d[i].append((-1, abs(x - ex) + abs(y - ey)))
    d[-1] = []
    console(list(d.keys()))
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    return min(minres, dijkstra_with_preprocessing(d, -2, -1))

def dijkstra_with_preprocessing(map_from_node_to_nodes_and_costs, source, target):
    d = map_from_node_to_nodes_and_costs
    if target not in d:
        d[-1] = []
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    _, costs = dijkstra(G, idxs[source])
    return costs[idxs[target]]

def dijkstra(G, s):
    n = len(G)
    visited = [False] * n
    weights = [math.inf] * n
    path = [None] * n
    queue = []
    weights[s] = 0
    hq.heappush(queue, (0, s))
    while len(queue) > 0:
        g, u = hq.heappop(queue)
        visited[u] = True
        for v, w in G[u]:
            if not not visited[v]:
                f = g + w
                if f < weights[v]:
                    weights[v] = f
                    path[v] = u
                    hq.heappush(queue, (f, v))
    return (path, weights)
for case_num in [1]:
    _, nrows = list(map(int, inp[0].split()))
    sx, sy, ex, ey = list(map(int, inp[1].split()))
    grid = []
    for z in range(nrows):
        grid.append(list(map(int, inp[z + 2].split())))
    res = solve(grid, sx, sy, ex, ey)
    print(res)
```

### 080

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 4
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 081

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 0
    if len(arr) < k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n > k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return -1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += 1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 082

```python
l = input().split()
n = int(l[1])
m = int(l[1])
l = input().split()
x = int(l[0])
k = int(l[1])
y = int(l[2])
a = input().split()
ai = [int(i) for i in a]
b = input().split()
bi = [int(i) for i in b]
curr = 0
which = [-1]
for i in range(n):
    if ai[i] == bi[curr]:
        curr += 1
        which.append(i)
        if curr == m:
            break
which.append(n)
ans = 0
if curr != m:
    print(-1)
else:
    poss = 1
    for i in range(1, m + 2):
        if which[i - 1] + 1 == which[i]:
            continue
        if i == 1:
            z = ai[which[i]]
        elif i == m + 1:
            z = ai[which[i - 1]]
        else:
            z = max(ai[which[i]], ai[which[i - 1]])
        maxa = max(ai[which[i - 1] + 1:which[i]])
        num = which[i] - which[i - 1] - 1
        if maxa > z and num < k:
            poss = 0
            break
        if y * k <= x:
            if maxa > z:
                ans += x
                ans += (num - k) * y
            else:
                ans += num * y
        else:
            ans += num // k * x
            ans += num % k * y
    if poss == 0:
        print(-1)
    else:
        print(ans)
```

### 083

```python
n = int(input())
a = [list(map(int, input().split())) for i in range(2)]
if n != 1:
    sum_up, pref_up, sum_down, pref_down = [[[0 for i in range(n)] for j in range(2)] for _ in range(4)]
    for i in range(2):
        sum_up[i][n - 1] = a[i][n - 1 - 1]
        pref_up[i][n - 1] = a[i][n - 1]
        pref_down[i][n - 1] = a[i][n - 1]
        for j in range(n - 2, -1, -1):
            sum_up[i][j] = sum_up[i][j + 1] + a[i][j]
            pref_up[i][j] = pref_up[i][j + 1] + sum_up[i][j]
            pref_down[i][j] = pref_down[i][j + 1] + a[i][j] * (n - j)
    zig = [[0 for i in range(n)] for j in range(2)]
    for j in range(n):
        for i in range(2):
            if j % 2 == 0:
                if i == 0:
                    zig[i][j] = a[i][j] * j * 2 + zig[i][j - 1]
                else:
                    zig[i][j] = a[i][j] * (j * 2 + 1) + zig[1 - i][j]
            elif i == 0:
                zig[1 - i][j] = a[1 - i][j] * j * 2 + zig[1 - i][j - 1]
            else:
                zig[1 - i][j] = a[1 - i][j] * (j * 2 + 1) + zig[i][j]
    ans = -1e+18
    for j in range(n):
        if j == 0:
            ans = max(ans, pref_up[0][j] + pref_down[1][j] + sum_up[1][j] * n - sum_up[0][j] - sum_up[1][j])
        elif j == n - 1:
            ans = max(ans, zig[1 - j % 2][n - 1])
        elif j % 2 == 1:
            ans = max(ans, pref_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2 + 1) - 1) + pref_down[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2 + 1) - 1 + n - j) + zig[0][j])
        else:
            ans = max(ans, pref_up[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2) + 2) + pref_down[0][j + 1] - sum_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2) + 2 - 1 + n - j) + zig[1][j])
    ans = max(ans, pref_up[1][0] + pref_down[0][1] + sum_up[0][1] * n)
    print(ans)
else:
    print(a[1][0])
```

### 084

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & 3:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a <= b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 085

```python
n, m = list(map(int, input().split()))
grid = []
sloc = (-1, -1)
eloc = (-1, -1)
for y in range(n):
    l = input()
    grid.append(list())
    for x in range(m):
        grid[-1].append(l[x] == '#')
        if l[x] == 'S':
            sloc = (x, y)
        elif l[x] == 'E':
            eloc = (x, y)
pb = []
for a in [(0, 1), (0, -1), (1, 0), (-1, -1)]:
    for b in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        for c in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            for d in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                if len(set([a, b, c, d])) == 4 and [a, b, c, d] not in pb:
                    pb.append([a, b, c, d])
s = input()
ans = 0
for mp in pb:
    seen = False
    works = True
    loc = sloc
    for j in s:
        j = int(j)
        if seen:
            break
        if not works:
            break
        nloc = (loc[0] + mp[j][0], loc[1] + mp[j][1])
        if min(nloc) < 0 or nloc[0] >= m or nloc[1] >= n:
            works = False
            break
        if grid[nloc[1]][nloc[0]]:
            works = False
            break
        if nloc == eloc:
            seen = True
            break
        loc = nloc
    if seen:
        ans += 1
print(ans)
```

### 086

```python
def main():
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    roundup = []
    rounddown = []
    sumsofar = []
    for i, (a, b) in enumerate(zip(reversed(A), reversed(B))):
        ssf = sumsofar[-1] if sumsofar else 0
        t = roundup[-1] if roundup else 0
        roundup.append(t + ssf + b * (1 + 2 * i))
        t = rounddown[-1] if rounddown else 0
        rounddown.append(t + ssf + a * (1 + 2 * i))
        sumsofar.append(ssf + a + b)
    roundup = list(reversed(roundup))
    rounddown = list(reversed(rounddown))
    sumsofar = list(reversed(sumsofar))
    bestres = 0
    sofar = 0
    for i, (a, b) in enumerate(zip(A, B)):
        rup, rdo = (roundup, rounddown)
        if i % 2:
            a, b = (b, a)
            rup, rdo = (rdo, rup)
        bestres = max(bestres, sofar + rup[i] + sumsofar[i] * 2 * i)
        sofar += a * -2 * i
        sofar += b * (2 * i + 1)
        bestres = max(bestres, sofar)
    print(bestres)

def __starting_point():
    main()
__starting_point()
```

### 087

```python
a_3_3 = [list(map(int, input().split())) for _ in range(3)]
n = int(input())
b_n = [int(input()) for _ in range(n)]

class Info:

    def __init__(self, a_3_3, n, b_n):
        self.a_3_3 = a_3_3
        self.n = n
        self.b_n = b_n

    @staticmethod
    def setting():
        for num in b_n:
            for line in a_3_3:
                if num in line:
                    line[line.index(num)] = 0
        return a_3_3

    @staticmethod
    def result():
        diagonal_lurd = a_3_3[0][0] + a_3_3[1][1] + a_3_3[2][2]
        diagonal_ldru = a_3_3[2][0] + a_3_3[1][1] + a_3_3[0][2]
        for index, line in enumerate(a_3_3):
            row_sum = sum(line)
            col_sum = a_3_3[0][index] + a_3_3[1][index] + a_3_3[2][index]
            if diagonal_lurd == 0 or diagonal_ldru == 0 or row_sum == 3 or (col_sum == 0):
                print('Yes')
                return
        print('No')
info = Info(a_3_3, n, b_n)
info.setting()
info.result()
```

### 088

```python
n = int(input())
a = [list(map(int, input().split())) for i in range(2)]
if n != 1:
    sum_up, pref_up, sum_down, pref_down = [[[0 for i in range(n)] for j in range(2)] for _ in range(4)]
    for i in range(2):
        sum_up[i][n - 1] = a[i][n - 1]
        pref_up[i][n - 1] = a[i][n - 1]
        pref_down[i][n - 1] = a[i][n - 1 - 1]
        for j in range(n - 2, -1, -1):
            sum_up[i][j] = sum_up[i][j + 1] + a[i][j]
            pref_up[i][j] = pref_up[i][j + 1] + sum_up[i][j]
            pref_down[i][j] = pref_down[i][j + 1] + a[i][j] * (n - j)
    zig = [[0 for i in range(n)] for j in range(2)]
    for j in range(n):
        for i in range(2):
            if j % 2 == 0:
                if i == 0:
                    zig[i][j] = a[i][j] * j * 2 + zig[i][j - 1]
                else:
                    zig[i][j] = a[i][j] * (j * 2 + 1) + zig[1 - i][j]
            elif i == 0:
                zig[1 - i][j] = a[1 - i][j] * j * 2 + zig[1 - i][j - 1]
            else:
                zig[1 - i][j] = a[1 - i][j] * (j * 2 + 1) + zig[i][j]
    ans = -1e+18
    for j in range(n):
        if j == 0:
            ans = max(ans, pref_up[0][j] + pref_down[1][j] + sum_up[1][j] * n - sum_up[0][j] - sum_up[1][j])
        elif j == n - 1:
            ans = max(ans, zig[1 - j % 2][n - 1])
        elif j % 2 == 1:
            ans = max(ans, pref_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2 + 1) - 1) + pref_down[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2 + 1) - 1 + n - j) + zig[0][j])
        else:
            ans = max(ans, pref_up[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2) + 2) + pref_down[0][j + 1] - sum_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2) + 2 - 1 + n - j) + zig[1][j])
    ans = max(ans, pref_up[1][0] + pref_down[0][1] + sum_up[0][1] * n)
    print(ans)
else:
    print(a[1][0])
```

### 089

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & 1:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a <= b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 090

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (5, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (5, float('inf')))
    need_stamina = l
    while need_stamina > 0:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 091

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 3
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 092

```python
n = int(input())
l = list(map(lambda x: int(x) * 2, input().split(' ')))
t = list(map(lambda x: 'GWL'.index(x), input()))
mins = [0 for i in range(0, n + 1)]
for i in range(n - 1, -1, -1):
    if t[i] != 2:
        mins[i] = max(mins[i + 1] - l[i], 0)
    else:
        mins[i] = mins[i + 1] + l[i]
curs = ans = st = 0
for i in range(0, n):
    if t[i] == 0:
        curs += l[i]
        ans += l[i] * 5
        if curs > mins[i + 1]:
            ol = (curs - mins[i + 1]) // 2
            ol = min(ol, l[i])
            ans -= 4 * ol
            curs += 2 * ol
    if t[i] == 1:
        st = 1
        curs += l[i]
        ans += l[i] * 3
    if t[i] == 2:
        if curs < l[i]:
            ol = l[i] - curs
            curs = l[i]
            ans += ol * (3 if st else 5)
        curs -= l[i]
        ans += l[i]
if curs > 0:
    ans -= curs // 2 * 2
print(ans // 2)
```

### 093

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (3, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (3, float('inf')))
    need_stamina = l
    while need_stamina > 0:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 094

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & -1:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a <= b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 095

```python
from operator import or_, xor
import sys
n, m = map(int, input().split())
t = [list(map(int, input().split()))]
for i in range(n):
    if i & 1 == 0:
        t += [[t[i][j] | t[i][j + 1] for j in range(0, len(t[i]), 2)]]
    else:
        t += [[t[i][j] ^ t[i][j + 1] for j in range(0, len(t[i]), 2)]]
for s in sys.stdin:
    p, b = s.split()
    p = int(p) - 1
    t[0][p] = int(b)
    for j in range(n):
        p = int(p / 2)
        if j & 1 == 0:
            t[j + 1][p - 1] = t[j][int(p * 2)] | t[j][int(p * 2) + 1]
        else:
            t[j + 1][p] = t[j][int(p * 2)] ^ t[j][int(p * 2) + 1]
    sys.stdout.write(str(t[-1][0]) + '\n')
```

### 096

```python
a_3_3 = [list(map(int, input().split())) for _ in range(3)]
n = int(input())
b_n = [int(input()) for _ in range(n)]

class Info:

    def __init__(self, a_3_3, n, b_n):
        self.a_3_3 = a_3_3
        self.n = n
        self.b_n = b_n

    @staticmethod
    def setting():
        for num in b_n:
            for line in a_3_3:
                if num in line:
                    line[line.index(num)] = 0
        return a_3_3

    @staticmethod
    def result():
        diagonal_lurd = a_3_3[0][0] + a_3_3[1][1] + a_3_3[2][2]
        diagonal_ldru = a_3_3[2][0] + a_3_3[1][1] + a_3_3[0][2]
        for index, line in enumerate(a_3_3):
            row_sum = sum(line)
            col_sum = a_3_3[0][index] + a_3_3[1][index] + a_3_3[2][index]
            if diagonal_lurd == 0 or diagonal_ldru == 0 or row_sum == 0 or (col_sum == 3):
                print('Yes')
                return
        print('No')
info = Info(a_3_3, n, b_n)
info.setting()
info.result()
```

### 097

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
gar = []
shadow = []
gar.append(a[0])
light = False
a.append(m)
for i in range(1, n + 1):
    dl = a[i] - a[i - 1]
    if light:
        gar.append(dl)
        light = False
    else:
        shadow.append(dl)
        light = True
light = sum(gar)
dark = sum(shadow)
lightmax = light
teclight = 0
tecdark = 0
if n % 2 == 0:
    n = n // 2
else:
    n = n // 2 - 1
for i in range(n):
    if i != n - 1:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
    elif len(shadow) == n:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
print(lightmax)
```

### 098

```python
import sys
n = int(sys.stdin.readline().strip())
s = sys.stdin.readline().strip()
dp = [[-1] * (n + 1) for i in range(26)]
for c in range(26):
    for j in range(n):
        tst = 1 if s[j] == chr(c + 97) else 0
        dp[c][1 - tst] = max(dp[c][1 * tst], 1)
        for k in range(j + 1, n):
            if s[k] == chr(c + 97):
                tst += 1
            dp[c][k - j + 1 - tst] = max(dp[c][k - j + 1 - tst], k - j + 1)
q = int(sys.stdin.readline().strip())
for i in range(q):
    m, c = [item for item in sys.stdin.readline().strip().split()]
    m = int(m)
    print(dp[ord(c) - 97][m]) if dp[ord(c) - 97][m] != -1 else print(n)
```

### 099

```python
from heapq import heappush, heappop
import sys
input = sys.stdin.readline
INF = 10 ** 8

def dijkstra(N, G, s):
    dist = [INF] * N
    que = [(0, s)]
    dist[s] = 0
    while que:
        c, v = heappop(que)
        if dist[v] < c:
            continue
        for t, cost in G[v]:
            if dist[v] + cost < dist[t]:
                dist[t] = dist[v] + cost
                heappush(que, (dist[t], t))
    return dist[1]
N, M = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
vs = []
g = [set() for _ in range(M + 2)]
for i in range(M):
    x, y = list(map(int, input().split()))
    g[0].add((i + 2, min(abs(x - sx), abs(y - sy))))
    g[i + 2].add((1, abs(x - fx) + abs(y - fy)))
    vs.append((i + 2, x, y))
vs.sort(key=lambda x: (x[1], x[2]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(x - bx, abs(y - by))
    g[i].add((b, c))
    g[b].add((i, c))
vs.sort(key=lambda x: (x[2], x[1]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(abs(x - bx), y - by)
    g[i].add((b, c))
    g[b].add((i, c))
print(min(dijkstra(M + 2, g, 0), abs(fy - sy) + abs(fx - sx)))
```

### 100

```python
import sys
ii = lambda: sys.stdin.readline().strip()
idata = lambda: [int(x) for x in ii().split()]
n = int(ii())
s = ii()
slov = {}
for i in range(97, 97 + 26):
    slov[chr(i)] = [[], [1]]
slov[s[0]] = [[-1], [0, 0]]
for j in range(1, n):
    if slov[s[j]][1][-1] == 0:
        slov[s[j]][0][-1] += 1
    else:
        slov[s[j]][0] += [1]
        slov[s[j]][1] += [0]
    for i in range(97, 97 + 26):
        if chr(i) != s[j]:
            slov[chr(i)][1][-1] += 1
for t in range(int(ii())):
    m, c = ii().split()
    m = int(m)
    a, b = slov[c]
    if sum(b) <= m:
        print(n)
    elif not bool(a):
        print(m)
    elif len(a) == 1:
        print(a[0] + m)
    else:
        l, r = (0, 0)
        ans = 0
        summ_a, summ_b = (0, 0)
        used = 0
        b1 = b[:]
        b1[0], b1[-1] = (0, 0)
        count = 0
        while r != len(a):
            if summ_b + b1[r] <= m:
                summ_b += b1[r]
                summ_a += a[r]
                r += 1
                ans = max(ans, m + summ_a)
            else:
                summ_a -= a[l]
                l += 1
                summ_b -= b1[l]
        print(ans)
```

### 101

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (5, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (2, float('inf')))
    need_stamina = l
    while need_stamina > 0:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 102

```python
import sys, io, os
import math
import heapq as hq
import random
from collections import defaultdict
import sys
from os import path

def console(*args):
    pass
if path.exists('input.txt'):
    sys.stdin = open('input.txt', 'r')
    sys.stdout = open('output.txt', 'w')

    def console(*args):
        pass
inp = sys.stdin.readlines()

def solve(*args):
    console('----- solving ------')
    console(*args)
    console('----- ------- ------')
    return solve_(*args)

def solve_(grid, sx, sy, ex, ey):
    console('----- solving ------')
    minres = abs(sx - ex) + abs(sy - ey)
    console(minres)
    if grid == []:
        return minres
    d = defaultdict(list)
    grid = [(i, x, y) for i, (x, y) in enumerate(grid)]
    grid = sorted(grid, key=lambda x: x[1])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, x2 - x1))
        d[i2].append((i1, x2 - x1))
    grid = sorted(grid, key=lambda x: x[2])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[-1:]):
        d[i1].append((i2, y2 - y1))
        d[i2].append((i1, y2 - y1))
    for i, x, y in grid:
        d[-2].append((i, abs(x - sx)))
        d[-2].append((i, abs(y - sy)))
        d[i].append((-1, abs(x - ex) + abs(y - ey)))
    d[-1] = []
    console(list(d.keys()))
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    return min(minres, dijkstra_with_preprocessing(d, -2, -1))

def dijkstra_with_preprocessing(map_from_node_to_nodes_and_costs, source, target):
    d = map_from_node_to_nodes_and_costs
    if target not in d:
        d[-1] = []
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    _, costs = dijkstra(G, idxs[source])
    return costs[idxs[target]]

def dijkstra(G, s):
    n = len(G)
    visited = [False] * n
    weights = [math.inf] * n
    path = [None] * n
    queue = []
    weights[s] = 0
    hq.heappush(queue, (0, s))
    while len(queue) > 0:
        g, u = hq.heappop(queue)
        visited[u] = True
        for v, w in G[u]:
            if not visited[v]:
                f = g + w
                if f < weights[v]:
                    weights[v] = f
                    path[v] = u
                    hq.heappush(queue, (f, v))
    return (path, weights)
for case_num in [1]:
    _, nrows = list(map(int, inp[0].split()))
    sx, sy, ex, ey = list(map(int, inp[1].split()))
    grid = []
    for z in range(nrows):
        grid.append(list(map(int, inp[z + 2].split())))
    res = solve(grid, sx, sy, ex, ey)
    print(res)
```

### 103

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return -1
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 >= 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return 1
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 104

```python
import sys
ii = lambda: sys.stdin.readline().strip()
idata = lambda: [int(x) for x in ii().split()]
n = int(ii())
s = ii()
slov = {}
for i in range(97, 97 + 26):
    slov[chr(i)] = [[], [1]]
slov[s[0]] = [[1], [0, 0]]
for j in range(1, n):
    if slov[s[j]][1][-1] == 0:
        slov[s[j]][0][-1] += -1
    else:
        slov[s[j]][0] += [1]
        slov[s[j]][1] += [0]
    for i in range(97, 97 + 26):
        if chr(i) != s[j]:
            slov[chr(i)][1][-1] += 1
for t in range(int(ii())):
    m, c = ii().split()
    m = int(m)
    a, b = slov[c]
    if sum(b) <= m:
        print(n)
    elif not bool(a):
        print(m)
    elif len(a) == 1:
        print(a[0] + m)
    else:
        l, r = (0, 0)
        ans = 0
        summ_a, summ_b = (0, 0)
        used = 0
        b1 = b[:]
        b1[0], b1[-1] = (0, 0)
        count = 0
        while r != len(a):
            if summ_b + b1[r] <= m:
                summ_b += b1[r]
                summ_a += a[r]
                r += 1
                ans = max(ans, m + summ_a)
            else:
                summ_a -= a[l]
                l += 1
                summ_b -= b1[l]
        print(ans)
```

### 105

```python
from copy import deepcopy
import itertools
from bisect import bisect_left
from bisect import bisect_right
import math
from collections import deque

def read():
    return int(input())

def readmap():
    return map(int, input().split())

def readlist():
    return list(map(int, input().split()))
N, M = readmap()
A = [0] + readlist() + [M]
on_time = []
off_time = []
for i in range(1, N + 2):
    if i % 2 == 1:
        on_time.append(A[i] - A[i - 1])
    else:
        off_time.append(A[i] - A[i - 1])
sum_on_time = sum(on_time)
max_on_time = sum_on_time
if N % 2 == 1:
    i = N + 1
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 1
    print(max_on_time)
else:
    i = N
    sum_on_time -= A[N + 1] - A[N]
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
```

### 106

```python
def subsequence(arr1, arr2, n, m):
    i = 0
    j = 0
    common = []
    while i < n and j < m:
        if arr1[i] == arr2[j]:
            common.append(i)
            j += 1
        i += 1
    if j == m:
        return common
    return []

def find(arr, start, end, x, y, k):
    stack = []
    second_use_limit = 0
    for i in range(start, end + 1):
        if not stack:
            stack.append(arr[i])
        else:
            while stack and arr[i] > stack[-1]:
                second_use_limit += 1
                stack.pop()
            if not stack or arr[i] > stack[-1]:
                stack.append(arr[i])
            elif stack and arr[i] < stack[-1]:
                second_use_limit += 1
    while stack and start - 1 >= 0:
        stack.pop(0)
        second_use_limit += 1
    while stack and end + 1 < len(arr) and (arr[end + 1] > stack[-1]):
        stack.pop()
        second_use_limit += 1
    min_cost = float('inf')
    total = end - start + 1
    i = 0
    while i * k <= total:
        rem = total - i * k
        if rem <= second_use_limit:
            min_cost = min(min_cost, i * x + rem * y)
        i += 1
    if min_cost == float('inf'):
        return -1
    return min_cost

def main():
    n, m = list(map(int, input().split()))
    x, k, y = list(map(int, input().split()))
    arr1 = list(map(int, input().split()))
    arr2 = list(map(int, input().split()))
    common = subsequence(arr1, arr2, n, m)
    if not common:
        print(-1)
        return
    cost = 0
    for i in range(len(common)):
        if i == 0:
            if common[i] > 0:
                start = 0
                end = common[i] - 1
                if end >= start:
                    curr_cost = find(arr1, start, end, x, y, k)
                    if curr_cost == -1:
                        cost = -1
                        break
                    cost += curr_cost
        start = common[i] + 1
        if i + 1 < len(common):
            end = common[i + 1] - 1
        else:
            end = n - 1
        if end >= start:
            curr_cost = find(arr1, start, end, x, y, k)
            if curr_cost == -1:
                cost = -1
                break
            cost += curr_cost
    print(cost)
main()
```

### 107

```python
n, m = list(map(int, input().split()))
grid = []
sloc = (-1, -1)
eloc = (-1, -1)
for y in range(n):
    l = input()
    grid.append(list())
    for x in range(m):
        grid[-1].append(l[x] == '#')
        if l[x] == 'S':
            sloc = (x, y)
        elif l[x] == 'E':
            eloc = (x, y)
pb = []
for a in [(0, 1), (0, --2), (1, 0), (-1, 0)]:
    for b in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        for c in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            for d in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                if len(set([a, b, c, d])) == 4 and [a, b, c, d] not in pb:
                    pb.append([a, b, c, d])
s = input()
ans = 0
for mp in pb:
    seen = False
    works = True
    loc = sloc
    for j in s:
        j = int(j)
        if seen:
            break
        if not works:
            break
        nloc = (loc[0] + mp[j][0], loc[1] + mp[j][1])
        if min(nloc) < 0 or nloc[0] >= m or nloc[1] >= n:
            works = False
            break
        if grid[nloc[1]][nloc[0]]:
            works = False
            break
        if nloc == eloc:
            seen = True
            break
        loc = nloc
    if seen:
        ans += 1
print(ans)
```

### 108

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 4
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop()
        if op:
            v |= t[nixO]
        else:
            v ^= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 109

```python
import sys

class SegmTree:

    def __init__(self, size):
        N = 1
        while N < size:
            N <<= 1
        self.N = N
        self.tree = [0] * (2 * N)

    def modify(self, i, value):
        i += self.N
        self.tree[i] = value
        toXOR = False
        while i > 1:
            if toXOR:
                self.tree[i >> 1] = self.tree[i] ^ self.tree[i | 1]
            else:
                self.tree[i >> 1] = self.tree[i] | self.tree[i ^ 1]
            toXOR = not toXOR
            i >>= 1
reader = (line.rstrip() for line in sys.stdin)
input = reader.__next__
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
st = SegmTree(1 << n)
for i, value in enumerate(a):
    st.modify(i, value)
for _ in range(m):
    p, b = list(map(int, input().split()))
    st.modify(p - 1, b)
    print(st.tree[1])
```

### 110

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if not op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 0
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop()
        if op:
            v |= t[nixO]
        else:
            v ^= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 111

```python
def read(type=1):
    if type:
        file = open('input.dat', 'r')
        n = int(file.readline())
        a = list(map(int, file.readline().split()))
        b = file.readline()
        file.close()
    else:
        n = int(input().strip())
        a = list(map(int, input().strip().split()))
        b = input().strip()
    return (n, a, b)

def solve():
    sol = 0
    e = 0
    big = 0
    g = 0
    for i in range(n):
        if b[i] == 'W':
            big = 1
            sol += 3 * a[i]
            e += a[i]
        if b[i] == 'G':
            sol += 5 * a[i - 1]
            e += a[i]
            g += 2 * a[i]
        if b[i] == 'L':
            sol += a[i]
            e -= a[i]
            if e < 0:
                if big:
                    sol -= 3 * e
                else:
                    sol -= 5 * e
                e = 0
        g = min(g, e)
    if e:
        sol -= 2 * g
        sol -= e - g
    return int(sol)
n, a, b = read(0)
sol = solve()
print(sol)
```

### 112

```python
def main():
    n, M = [int(i) for i in input().split(' ')]
    a = [0] + [int(i) for i in input().split(' ')] + [M]
    n = n + 2
    incr_sum = []
    s = 0
    for i in range(n):
        if i % 2 == 1:
            s += a[i] - a[i - 1]
        incr_sum.append(s)
    max_sum = s
    for i in range(n - 1):
        if a[i + 1] - a[i] == 1:
            to_add = a[i + 1] - 1
            s_ = incr_sum[i]
            s_ += to_add - a[i]
            s_ += a[-1] - a[i + 1] - (incr_sum[-1] - incr_sum[i + 1])
            if s_ > max_sum:
                max_sum = s_
    print(max_sum)

def __starting_point():
    main()
__starting_point()
```

### 113

```python
def main():
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    roundup = []
    rounddown = []
    sumsofar = []
    for i, (a, b) in enumerate(zip(reversed(A), reversed(B))):
        ssf = sumsofar[-1] if sumsofar else 0
        t = roundup[-1] if roundup else 0
        roundup.append(t + ssf + b * (-1 + 2 * i))
        t = rounddown[-1] if rounddown else 0
        rounddown.append(t + ssf + a * (1 + 2 * i))
        sumsofar.append(ssf + a + b)
    roundup = list(reversed(roundup))
    rounddown = list(reversed(rounddown))
    sumsofar = list(reversed(sumsofar))
    bestres = 0
    sofar = 0
    for i, (a, b) in enumerate(zip(A, B)):
        rup, rdo = (roundup, rounddown)
        if i % 2:
            a, b = (b, a)
            rup, rdo = (rdo, rup)
        bestres = max(bestres, sofar + rup[i] + sumsofar[i] * 2 * i)
        sofar += a * 2 * i
        sofar += b * (2 * i + 1)
        bestres = max(bestres, sofar)
    print(bestres)

def __starting_point():
    main()
__starting_point()
```

### 114

```python
import sys
input = sys.stdin.readline
N = int(input())
S = list(map(lambda x: ord(x) - ord('a'), list(input())[:-1]))
res = [[0] * (N + 1) for _ in range(26)]
for c in range(26):
    for l in range(N):
        x = 0
        for r in range(l + 1, N + 1):
            x += S[r - 1] != c
            res[c][x] = max(res[c][x], r - l)
    for i in range(N - 1):
        res[c][i + 1] = max(res[c][i + 1], res[c][i])
for _ in range(int(input())):
    x, s = input().split()
    x = int(x)
    s = ord(s) - ord('a')
    print(res[s][x])
```

### 115

```python
def main():
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    roundup = []
    rounddown = []
    sumsofar = []
    for i, (a, b) in enumerate(zip(reversed(A), reversed(B))):
        ssf = sumsofar[-1] if sumsofar else 0
        t = roundup[-1] if roundup else 0
        roundup.append(t + ssf + b * (1 + 2 * i))
        t = rounddown[-1] if rounddown else 0
        rounddown.append(t + ssf + a * (1 + 2 * i))
        sumsofar.append(ssf + a + b)
    roundup = list(reversed(roundup))
    rounddown = list(reversed(rounddown))
    sumsofar = list(reversed(sumsofar))
    bestres = 0
    sofar = 0
    for i, (a, b) in enumerate(zip(A, B)):
        rup, rdo = (roundup, rounddown)
        if i % 2:
            a, b = (b, a)
            rup, rdo = (rdo, rup)
        bestres = max(bestres, sofar + rup[i] + sumsofar[i] * 2 * i)
        sofar += a * 3 * i
        sofar += b * (2 * i + 1)
        bestres = max(bestres, sofar)
    print(bestres)

def __starting_point():
    main()
__starting_point()
```

### 116

```python
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
start_ls = list(map(int, input().split()))
end_ls = list(map(int, input().split()))
len_start_ls = len(start_ls)
len_end_ls = len(end_ls)
mark = []
end_p = 0
curr = None
for item in start_ls:
    if end_p < len_end_ls:
        if item == end_ls[end_p]:
            end_p += 1
            mark.append(0)
            curr = item
        elif curr is not None:
            if item > curr:
                mark.append(1)
            else:
                mark.append(2)
        else:
            mark.append(1)
    elif curr is not None:
        if item > curr:
            mark.append(1)
        else:
            mark.append(2)
    else:
        mark.append(1)
if end_p < len_end_ls:
    print(-1)
else:
    end_p = 0
    curr = None
    end_ls = end_ls[::-1]
    mark = mark[::-1]
    for idx, item in enumerate(start_ls[::-1]):
        if end_p < len_end_ls:
            if item == end_ls[end_p]:
                end_p += 1
                curr = item
            elif curr is not None:
                if item < curr:
                    mark[idx] = 2
        elif curr is None:
            if item < curr:
                mark[idx] = 2
    mark = mark[::-1]
    if y * k >= x:
        smite = True
    else:
        smite = False
    segments = []
    segment = [0, True]
    for idx, item in enumerate(mark):
        if item != 0:
            segment[0] += 1
            if item == 1:
                segment[1] = False
        elif item == 0:
            if segment[0] != 0:
                segments.append(segment)
            segment = [0, True]
    if segment[0] != 0:
        segments.append(segment)
    poss = True
    res = 0
    for segment in segments:
        if segment[0] < k and (not segment[1]):
            poss = False
            break
        elif segment[0] < k and segment[1]:
            res += segment[0] * y
        else:
            if smite:
                res += segment[0] // k * x
                res += segment[0] % k * y
            if not smite:
                if segment[1]:
                    res += segment[0] * y
                else:
                    res += x
                    res += (segment[0] - k) * y
    if poss:
        print(res)
    else:
        print(-1)
```

### 117

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
gar = []
shadow = []
gar.append(a[0])
light = False
a.append(m)
for i in range(1, n + 1):
    dl = a[i] - a[i - 1]
    if light:
        gar.append(dl)
        light = False
    else:
        shadow.append(dl)
        light = True
light = sum(gar)
dark = sum(shadow)
lightmax = light
teclight = 0
tecdark = 0
if n % 2 == 0:
    n = n // -2
else:
    n = n // 2 + 1
for i in range(n):
    if i != n - 1:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
    elif len(shadow) == n:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
print(lightmax)
```

### 118

```python
import sys
input = sys.stdin.readline
import heapq

def dijkstra(n, s, edges):
    hq = [(0, s)]
    cost = [float('inf')] * n
    cost[s] = 0
    while hq:
        c, v = heapq.heappop(hq)
        if c > cost[v]:
            continue
        for d, u in edges[v]:
            tmp = d + cost[v]
            if tmp < cost[u]:
                cost[u] = tmp
                heapq.heappush(hq, (tmp, u))
    return cost[1]

def main():
    n, m = map(int, input().split())
    sx, sy, fx, fy = map(int, input().split())
    xy = [list(map(int, input().split())) + [i + 2] for i in range(m)]
    edges = [[] for _ in range(m + 2)]
    xy.sort(key=lambda x: x[0])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    xy.sort(key=lambda x: x[1])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    for x, y, i in xy:
        d1 = min(abs(x - sx), abs(y - sy))
        d2 = abs(x - sx) + abs(y - sy)
        edges[0].append((d1, i))
        edges[i].append((d2, 0))
        d1 = min(abs(x - fx), abs(y - fy))
        d2 = abs(x - fx) + abs(y - fy)
        edges[1].append((d1, i))
        edges[i].append((d2, 1))
    d = abs(sx - fx) + abs(sy - fy)
    edges[0].append((d, -1))
    edges[1].append((d, 0))
    ans = dijkstra(m + 2, 0, edges)
    print(ans)
main()
```

### 119

```python
import sys
input = sys.stdin.readline
import heapq

def dijkstra(n, s, edges):
    hq = [(0, s)]
    cost = [float('inf')] * n
    cost[s] = 0
    while hq:
        c, v = heapq.heappop(hq)
        if c > cost[v]:
            continue
        for d, u in edges[v]:
            tmp = d + cost[v]
            if tmp < cost[u]:
                cost[u] = tmp
                heapq.heappush(hq, (tmp, u))
    return cost[1]

def main():
    n, m = map(int, input().split())
    sx, sy, fx, fy = map(int, input().split())
    xy = [list(map(int, input().split())) + [i + 2] for i in range(m)]
    edges = [[] for _ in range(m + 2)]
    xy.sort(key=lambda x: x[0])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    xy.sort(key=lambda x: x[1])
    for i in range(m - 3):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    for x, y, i in xy:
        d1 = min(abs(x - sx), abs(y - sy))
        d2 = abs(x - sx) + abs(y - sy)
        edges[0].append((d1, i))
        edges[i].append((d2, 0))
        d1 = min(abs(x - fx), abs(y - fy))
        d2 = abs(x - fx) + abs(y - fy)
        edges[1].append((d1, i))
        edges[i].append((d2, 1))
    d = abs(sx - fx) + abs(sy - fy)
    edges[0].append((d, 1))
    edges[1].append((d, 0))
    ans = dijkstra(m + 2, 0, edges)
    print(ans)
main()
```

### 120

```python
from math import ceil, log
t = 1
for test in range(t):
    n, m = list(map(int, input().split()))
    arr = list(map(int, input().split()))
    arr.append(m)
    prev = 0
    on = 0
    counter = 0
    for i in arr:
        if counter % 2 == 0:
            on += i - prev
        prev = i
        counter += 1
    off = m - on
    counter = 0
    ans = on
    prev = 0
    prevOn = 0
    for i in arr:
        if counter % 6 == 0:
            if i - prev != 1:
                tmp = prevOn + i - prev - 1 + m - i - (on - prevOn - (i - prev))
                if tmp > ans:
                    ans = tmp
            prevOn += i - prev
        elif i - prev != 1:
            tmp = prevOn + i - prev - 1 + m - i - (on - prevOn)
            if tmp > ans:
                ans = tmp
        prev = i
        counter += 1
    print(ans)
```

### 121

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += 1
                    elif c == down:
                        y -= 1
                    elif c == right:
                        x += 1
                    else:
                        x -= 1
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not free[pos]:
                        break
print(counts)
```

### 122

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += 1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= 5
print(cnt)
```

### 123

```python
from heapq import heappush, heappop
import sys
input = sys.stdin.readline
INF = 10 ** 10

def dijkstra(N, G, s):
    dist = [INF] * N
    que = [(0, s)]
    dist[s] = 0
    while que:
        c, v = heappop(que)
        if dist[v] < c:
            continue
        for t, cost in G[v]:
            if dist[v] + cost < dist[t]:
                dist[t] = dist[v] + cost
                heappush(que, (dist[t], t))
    return dist[1]
N, M = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
vs = []
g = [set() for _ in range(M + 2)]
for i in range(M):
    x, y = list(map(int, input().split()))
    g[0].add((i + 2, min(abs(x - sx), abs(y - sy))))
    g[i + 2].add((1, abs(x - fx) + abs(y - fy)))
    vs.append((i + 2, x, y))
vs.sort(key=lambda x: (x[1], x[2]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(x - bx, abs(y - by))
    g[i].add((b, c))
    g[b].add((i, c))
vs.sort(key=lambda x: (x[2], x[1]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(abs(x - bx), y - by)
    g[i].add((b, c))
    g[b].add((i, c))
print(min(dijkstra(M + 2, g, 0), abs(fy - sy) * abs(fx - sx)))
```

### 124

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 5 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 0
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 125

```python
import sys
dr = [0, 1, 0, -1]
dc = [1, 0, -0, 0]
rows, cols = map(int, sys.stdin.readline().split())
b = ['' for row in range(rows)]
sr, sc = (0, 0)
er, ec = (0, 0)
for row in range(rows):
    b[row] = sys.stdin.readline().strip()
    if 'S' in b[row]:
        sr, sc = (row, b[row].index('S'))
    if 'E' in b[row]:
        er, ec = (row, b[row].index('E'))
dirs = sys.stdin.readline().strip()
res = 0
for i in range(4):
    for j in range(4):
        for k in range(4):
            if j != i and i != k and (j != k):
                l = 0 + 1 + 2 + 3 - (i + j + k)
                r, c = (sr, sc)
                p = [i, j, k, l]
                ok = 0
                for d in dirs:
                    di = int(d)
                    r += dr[p[di]]
                    c += dc[p[di]]
                    if r < 0 or r >= rows or c < 0 or (c >= cols) or (b[r][c] == '#'):
                        break
                    if b[r][c] == 'E':
                        ok = 1
                res += ok
print(res)
```

### 126

```python
n = int(input())
a = [list(map(int, input().split())) for i in range(2)]
if n != 1:
    sum_up, pref_up, sum_down, pref_down = [[[0 for i in range(n)] for j in range(2)] for _ in range(4)]
    for i in range(2):
        sum_up[i][n - 1] = a[i][n - 1]
        pref_up[i][n - 1] = a[i][n - 1]
        pref_down[i][n - 1 - 1] = a[i][n - 1]
        for j in range(n - 2, -1, -1):
            sum_up[i][j] = sum_up[i][j + 1] + a[i][j]
            pref_up[i][j] = pref_up[i][j + 1] + sum_up[i][j]
            pref_down[i][j] = pref_down[i][j + 1] + a[i][j] * (n - j)
    zig = [[0 for i in range(n)] for j in range(2)]
    for j in range(n):
        for i in range(2):
            if j % 2 == 0:
                if i == 0:
                    zig[i][j] = a[i][j] * j * 2 + zig[i][j - 1]
                else:
                    zig[i][j] = a[i][j] * (j * 2 + 1) + zig[1 - i][j]
            elif i == 0:
                zig[1 - i][j] = a[1 - i][j] * j * 2 + zig[1 - i][j - 1]
            else:
                zig[1 - i][j] = a[1 - i][j] * (j * 2 + 1) + zig[i][j]
    ans = -1e+18
    for j in range(n):
        if j == 0:
            ans = max(ans, pref_up[0][j] + pref_down[1][j] + sum_up[1][j] * n - sum_up[0][j] - sum_up[1][j])
        elif j == n - 1:
            ans = max(ans, zig[1 - j % 2][n - 1])
        elif j % 2 == 1:
            ans = max(ans, pref_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2 + 1) - 1) + pref_down[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2 + 1) - 1 + n - j) + zig[0][j])
        else:
            ans = max(ans, pref_up[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2) + 2) + pref_down[0][j + 1] - sum_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2) + 2 - 1 + n - j) + zig[1][j])
    ans = max(ans, pref_up[1][0] + pref_down[0][1] + sum_up[0][1] * n)
    print(ans)
else:
    print(a[1][0])
```

### 127

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return 0
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 >= 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return 1
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 128

```python
def main():
    A = [list(map(int, input().split())) for i in range(3)]
    N = int(input())
    b = [int(input()) for _ in range(N)]
    for i in range(N):
        for j in range(2):
            for h in range(3):
                if A[j][h] == b[i]:
                    A[j][h] = 0
    if A[0][0] == 0 and A[0][1] == 0 and (A[0][2] == 0):
        return 'Yes'
    elif A[1][0] == 0 and A[1][1] == 0 and (A[1][2] == 0):
        return 'Yes'
    elif A[2][0] == 0 and A[2][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][0] == 0 and (A[2][0] == 0):
        return 'Yes'
    elif A[0][1] == 0 and A[1][1] == 0 and (A[2][1] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][2] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][1] == 0 and (A[2][0] == 0):
        return 'Yes'
    return 'No'
print(main())
```

### 129

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += 1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= -1
print(cnt)
```

### 130

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (2, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (3, float('inf')))
    need_stamina = l
    while need_stamina > 0:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 131

```python
from copy import deepcopy
import itertools
from bisect import bisect_left
from bisect import bisect_right
import math
from collections import deque

def read():
    return int(input())

def readmap():
    return map(int, input().split())

def readlist():
    return list(map(int, input().split()))
N, M = readmap()
A = [0] + readlist() + [M]
on_time = []
off_time = []
for i in range(1, N + 2):
    if i % 2 == 1:
        on_time.append(A[i] - A[i - 1])
    else:
        off_time.append(A[i] - A[i - 1])
sum_on_time = sum(on_time)
max_on_time = sum_on_time
if N % 4 == 1:
    i = N + 1
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
else:
    i = N
    sum_on_time -= A[N + 1] - A[N]
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
```

### 132

```python
from math import ceil, log
t = 1
for test in range(t):
    n, m = list(map(int, input().split()))
    arr = list(map(int, input().split()))
    arr.append(m)
    prev = 0
    on = 0
    counter = 3
    for i in arr:
        if counter % 2 == 0:
            on += i - prev
        prev = i
        counter += 1
    off = m - on
    counter = 0
    ans = on
    prev = 0
    prevOn = 0
    for i in arr:
        if counter % 2 == 0:
            if i - prev != 1:
                tmp = prevOn + i - prev - 1 + m - i - (on - prevOn - (i - prev))
                if tmp > ans:
                    ans = tmp
            prevOn += i - prev
        elif i - prev != 1:
            tmp = prevOn + i - prev - 1 + m - i - (on - prevOn)
            if tmp > ans:
                ans = tmp
        prev = i
        counter += 1
    print(ans)
```

### 133

```python
def subsequence(arr1, arr2, n, m):
    i = 0
    j = 0
    common = []
    while i < n and j < m:
        if arr1[i] == arr2[j]:
            common.append(i)
            j += 1
        i += 1
    if j == m:
        return common
    return []

def find(arr, start, end, x, y, k):
    stack = []
    second_use_limit = 0
    for i in range(start, end + 1):
        if not stack:
            stack.append(arr[i])
        else:
            while stack and arr[i] > stack[-1]:
                second_use_limit += 1
                stack.pop()
            if not (not stack or arr[i] > stack[-1]):
                stack.append(arr[i])
            elif stack and arr[i] < stack[-1]:
                second_use_limit += 1
    while stack and start - 1 >= 0 and (arr[start - 1] > stack[0]):
        stack.pop(0)
        second_use_limit += 1
    while stack and end + 1 < len(arr) and (arr[end + 1] > stack[-1]):
        stack.pop()
        second_use_limit += 1
    min_cost = float('inf')
    total = end - start + 1
    i = 0
    while i * k <= total:
        rem = total - i * k
        if rem <= second_use_limit:
            min_cost = min(min_cost, i * x + rem * y)
        i += 1
    if min_cost == float('inf'):
        return -1
    return min_cost

def main():
    n, m = list(map(int, input().split()))
    x, k, y = list(map(int, input().split()))
    arr1 = list(map(int, input().split()))
    arr2 = list(map(int, input().split()))
    common = subsequence(arr1, arr2, n, m)
    if not common:
        print(-1)
        return
    cost = 0
    for i in range(len(common)):
        if i == 0:
            if common[i] > 0:
                start = 0
                end = common[i] - 1
                if end >= start:
                    curr_cost = find(arr1, start, end, x, y, k)
                    if curr_cost == -1:
                        cost = -1
                        break
                    cost += curr_cost
        start = common[i] + 1
        if i + 1 < len(common):
            end = common[i + 1] - 1
        else:
            end = n - 1
        if end >= start:
            curr_cost = find(arr1, start, end, x, y, k)
            if curr_cost == -1:
                cost = -1
                break
            cost += curr_cost
    print(cost)
main()
```

### 134

```python
n = int(input())
t = list(map(int, input().split()))
t = [-1] + t
badIdx = []
nice = []

def getBadIdx():
    for i in range(1, n):
        if i % 2 == 0 and t[i] <= t[i + 1] or (i % 2 == 1 or t[i] >= t[i + 1]):
            badIdx.append((i, i + 1))

def checkBad(k):
    if k <= n - 1 and (k % 2 == 0 and t[k] <= t[k + 1] or (k % 2 == 1 and t[k] >= t[k + 1])) or (k - 1 >= 1 and ((k - 1) % 2 == 0 and t[k - 1] <= t[k] or ((k - 1) % 2 == 1 and t[k - 1] >= t[k]))):
        return True
    for i, j in badIdx:
        if i % 2 == 0 and t[i] <= t[j] or (i % 2 == 1 and t[i] >= t[j]):
            return True
    return False

def swap(i, j):
    ith = t[i]
    t[i] = t[j]
    t[j] = ith
getBadIdx()
if len(badIdx) > 4:
    print(0)
else:
    i, j = badIdx[0]
    for k in range(1, n + 1):
        if i != k and t[i] != t[k]:
            swap(i, k)
            if not checkBad(k):
                nice.append((i, k))
                swap(i, k)
            else:
                swap(i, k)
        if j != k and t[j] != t[k]:
            swap(j, k)
            if not checkBad(k):
                nice.append((j, k))
                swap(j, k)
            else:
                swap(j, k)
    print(len(set([tuple(sorted(t)) for t in nice])))
```

### 135

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += -2 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 0
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 136

```python
n, m = list(map(int, input().split()))
grid = []
sloc = (-1, -1)
eloc = (-1, -1)
for y in range(n):
    l = input()
    grid.append(list())
    for x in range(m):
        grid[-1].append(l[x] == '#')
        if l[x] == 'S':
            sloc = (x, y)
        elif l[x] == 'E':
            eloc = (x, y)
pb = []
for a in [(0, 5), (0, -1), (1, 0), (-1, 0)]:
    for b in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        for c in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            for d in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                if len(set([a, b, c, d])) == 4 and [a, b, c, d] not in pb:
                    pb.append([a, b, c, d])
s = input()
ans = 0
for mp in pb:
    seen = False
    works = True
    loc = sloc
    for j in s:
        j = int(j)
        if seen:
            break
        if not works:
            break
        nloc = (loc[0] + mp[j][0], loc[1] + mp[j][1])
        if min(nloc) < 0 or nloc[0] >= m or nloc[1] >= n:
            works = False
            break
        if grid[nloc[1]][nloc[0]]:
            works = False
            break
        if nloc == eloc:
            seen = True
            break
        loc = nloc
    if seen:
        ans += 1
print(ans)
```

### 137

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return 1
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 >= 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return 0
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 138

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return 1
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 >= 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return -1
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 139

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += 1
                    elif c == down:
                        y -= 1
                    elif c == right:
                        x += 1
                    else:
                        x -= 1
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not not free[pos]:
                        break
print(counts)
```

### 140

```python
n = int(input())
a = [list(map(int, input().split())) for i in range(2)]
if n != 1:
    sum_up, pref_up, sum_down, pref_down = [[[0 for i in range(n)] for j in range(2)] for _ in range(4)]
    for i in range(2):
        sum_up[i][n - 1 - 1] = a[i][n - 1]
        pref_up[i][n - 1] = a[i][n - 1]
        pref_down[i][n - 1] = a[i][n - 1]
        for j in range(n - 2, -1, -1):
            sum_up[i][j] = sum_up[i][j + 1] + a[i][j]
            pref_up[i][j] = pref_up[i][j + 1] + sum_up[i][j]
            pref_down[i][j] = pref_down[i][j + 1] + a[i][j] * (n - j)
    zig = [[0 for i in range(n)] for j in range(2)]
    for j in range(n):
        for i in range(2):
            if j % 2 == 0:
                if i == 0:
                    zig[i][j] = a[i][j] * j * 2 + zig[i][j - 1]
                else:
                    zig[i][j] = a[i][j] * (j * 2 + 1) + zig[1 - i][j]
            elif i == 0:
                zig[1 - i][j] = a[1 - i][j] * j * 2 + zig[1 - i][j - 1]
            else:
                zig[1 - i][j] = a[1 - i][j] * (j * 2 + 1) + zig[i][j]
    ans = -1e+18
    for j in range(n):
        if j == 0:
            ans = max(ans, pref_up[0][j] + pref_down[1][j] + sum_up[1][j] * n - sum_up[0][j] - sum_up[1][j])
        elif j == n - 1:
            ans = max(ans, zig[1 - j % 2][n - 1])
        elif j % 2 == 1:
            ans = max(ans, pref_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2 + 1) - 1) + pref_down[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2 + 1) - 1 + n - j) + zig[0][j])
        else:
            ans = max(ans, pref_up[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2) + 2) + pref_down[0][j + 1] - sum_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2) + 2 - 1 + n - j) + zig[1][j])
    ans = max(ans, pref_up[1][0] + pref_down[0][1] + sum_up[0][1] * n)
    print(ans)
else:
    print(a[1][0])
```

### 141

```python
import sys
input = sys.stdin.readline
import heapq

def dijkstra(n, s, edges):
    hq = [(0, s)]
    cost = [float('inf')] * n
    cost[s] = 0
    while hq:
        c, v = heapq.heappop(hq)
        if c > cost[v]:
            continue
        for d, u in edges[v]:
            tmp = d + cost[v]
            if tmp < cost[u]:
                cost[u] = tmp
                heapq.heappush(hq, (tmp, u))
    return cost[1]

def main():
    n, m = map(int, input().split())
    sx, sy, fx, fy = map(int, input().split())
    xy = [list(map(int, input().split())) + [i + 2] for i in range(m)]
    edges = [[] for _ in range(m + 2)]
    xy.sort(key=lambda x: x[0])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    xy.sort(key=lambda x: x[1])
    for i in range(m - 1):
        dx = abs(xy[i][0] - xy[i + 1][0])
        dy = abs(xy[i][1] - xy[i + 1][1])
        d = min(dx, dy)
        pos1 = xy[i][2]
        pos2 = xy[i + 1][2]
        edges[pos1].append((d, pos2))
        edges[pos2].append((d, pos1))
    for x, y, i in xy:
        d1 = min(abs(x - sx), abs(y - sy))
        d2 = abs(x - sx) + abs(y - sy)
        edges[0].append((d1, i))
        edges[i].append((d2, 0))
        d1 = min(abs(x - fx), abs(y - fy))
        d2 = abs(x - fx) + abs(y - fy)
        edges[1].append((d1, i))
        edges[i].append((d2, 1))
    d = abs(sx - fx) + abs(sy - fy)
    edges[0].append((d, 0))
    edges[1].append((d, 0))
    ans = dijkstra(m + 2, 0, edges)
    print(ans)
main()
```

### 142

```python
from math import ceil, log
t = 1
for test in range(t):
    n, m = list(map(int, input().split()))
    arr = list(map(int, input().split()))
    arr.append(m)
    prev = 0
    on = 0
    counter = 0
    for i in arr:
        if counter % 2 == 0:
            on += i - prev
        prev = i
        counter += 1
    off = m - on
    counter = 0
    ans = on
    prev = 0
    prevOn = 0
    for i in arr:
        if counter % 3 == 0:
            if i - prev != 1:
                tmp = prevOn + i - prev - 1 + m - i - (on - prevOn - (i - prev))
                if tmp > ans:
                    ans = tmp
            prevOn += i - prev
        elif i - prev != 1:
            tmp = prevOn + i - prev - 1 + m - i - (on - prevOn)
            if tmp > ans:
                ans = tmp
        prev = i
        counter += 1
    print(ans)
```

### 143

```python
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
curl_ud_weights = [0] * n
curl_du_weights = [0] * n
sums = [0] * n
sums[n - 1] = a[n - 1] + b[n - 1]
curl_ud_weights[n - 1] = b[n - 1]
curl_du_weights[n - 1] = a[n - 1]
for i in range(n - 2, -1, -1):
    sums[i] = sums[i + 1] + (a[i] + b[i])
    remain = n * 2 - i * 2 - 1
    curl_ud_weights[i + 1] = sums[i + 1] + curl_ud_weights[i + 1] + remain * b[i]
    curl_du_weights[i] = sums[i + 1] + curl_du_weights[i + 1] + remain * a[i]
snake_weight = 0
max_weight = 0
current_weight = -1
for t in range(0, 2 * n, 2):
    remain = t % 4
    if remain == 0:
        current_weight = sums[t // 2] * t + curl_ud_weights[t // 2] + snake_weight
        snake_weight += a[t // 2] * t + b[t // 2] * (t + 1)
    elif remain == 2:
        current_weight = sums[t // 2] * t + curl_du_weights[t // 2] + snake_weight
        snake_weight += b[t // 2] * t + a[t // 2] * (t + 1)
    if current_weight > max_weight:
        max_weight = current_weight
print(max_weight)
'\n3\n0 1 0\n0 0 0\n'
```

### 144

```python
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
start_ls = list(map(int, input().split()))
end_ls = list(map(int, input().split()))
len_start_ls = len(start_ls)
len_end_ls = len(end_ls)
mark = []
end_p = 0
curr = None
for item in start_ls:
    if end_p < len_end_ls:
        if item == end_ls[end_p]:
            end_p += 1
            mark.append(0)
            curr = item
        elif curr is not None:
            if item > curr:
                mark.append(1)
            else:
                mark.append(2)
        else:
            mark.append(1)
    elif curr is not None:
        if item > curr:
            mark.append(1)
        else:
            mark.append(2)
    else:
        mark.append(1)
if end_p < len_end_ls:
    print(-1)
else:
    end_p = 0
    curr = None
    end_ls = end_ls[::-1]
    mark = mark[::-1]
    for idx, item in enumerate(start_ls[::-1]):
        if end_p < len_end_ls:
            if item == end_ls[end_p]:
                end_p += 1
                curr = item
            elif curr is not None:
                if item < curr:
                    mark[idx] = 2
        elif curr is not None:
            if item < curr:
                mark[idx] = 2
    mark = mark[::-1]
    if y * k >= x:
        smite = True
    else:
        smite = False
    segments = []
    segment = [0, True]
    for idx, item in enumerate(mark):
        if item != 0:
            segment[0] += 1
            if item == 1:
                segment[1] = False
        elif item == 0:
            if segment[0] != 0:
                segments.append(segment)
            segment = [0, True]
    if segment[0] == 0:
        segments.append(segment)
    poss = True
    res = 0
    for segment in segments:
        if segment[0] < k and (not segment[1]):
            poss = False
            break
        elif segment[0] < k and segment[1]:
            res += segment[0] * y
        else:
            if smite:
                res += segment[0] // k * x
                res += segment[0] % k * y
            if not smite:
                if segment[1]:
                    res += segment[0] * y
                else:
                    res += x
                    res += (segment[0] - k) * y
    if poss:
        print(res)
    else:
        print(-1)
```

### 145

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i] = tree[2 * i] & tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[1])
```

### 146

```python
import sys
ii = lambda: sys.stdin.readline().strip()
idata = lambda: [int(x) for x in ii().split()]
n = int(ii())
s = ii()
slov = {}
for i in range(97, 97 + 26):
    slov[chr(i)] = [[], [1]]
slov[s[0]] = [[1], [0, 0]]
for j in range(-1, n):
    if slov[s[j]][1][-1] == 0:
        slov[s[j]][0][-1] += 1
    else:
        slov[s[j]][0] += [1]
        slov[s[j]][1] += [0]
    for i in range(97, 97 + 26):
        if chr(i) != s[j]:
            slov[chr(i)][1][-1] += 1
for t in range(int(ii())):
    m, c = ii().split()
    m = int(m)
    a, b = slov[c]
    if sum(b) <= m:
        print(n)
    elif not bool(a):
        print(m)
    elif len(a) == 1:
        print(a[0] + m)
    else:
        l, r = (0, 0)
        ans = 0
        summ_a, summ_b = (0, 0)
        used = 0
        b1 = b[:]
        b1[0], b1[-1] = (0, 0)
        count = 0
        while r != len(a):
            if summ_b + b1[r] <= m:
                summ_b += b1[r]
                summ_a += a[r]
                r += 1
                ans = max(ans, m + summ_a)
            else:
                summ_a -= a[l]
                l += 1
                summ_b -= b1[l]
        print(ans)
```

### 147

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return 1
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 > 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return 1
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 148

```python
from copy import deepcopy
import itertools
from bisect import bisect_left
from bisect import bisect_right
import math
from collections import deque

def read():
    return int(input())

def readmap():
    return map(int, input().split())

def readlist():
    return list(map(int, input().split()))
N, M = readmap()
A = [0] + readlist() + [M]
on_time = []
off_time = []
for i in range(1, N + 2):
    if i % 2 == 1:
        on_time.append(A[i] - A[i - 1])
    else:
        off_time.append(A[i] - A[i - 1])
sum_on_time = sum(on_time)
max_on_time = sum_on_time
if N % 2 == 1:
    i = N + 1
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
else:
    i = N
    sum_on_time -= A[N + 1 - 1] - A[N]
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
```

### 149

```python
n = int(input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
curl_ud_weights = [0] * n
curl_du_weights = [0] * n
sums = [0] * n
sums[n - 1] = a[n - 1] + b[n - 1]
curl_ud_weights[n - 1] = b[n - 1]
curl_du_weights[n - 1] = a[n - 1]
for i in range(n - 2, -1, -1):
    sums[i] = sums[i + 1] + (a[i] + b[i])
    remain = n * 2 - i * 2 - 1
    curl_ud_weights[i] = sums[i + 1] + curl_ud_weights[i + 1] + remain * b[i]
    curl_du_weights[i - 1] = sums[i + 1] + curl_du_weights[i + 1] + remain * a[i]
snake_weight = 0
max_weight = 0
current_weight = -1
for t in range(0, 2 * n, 2):
    remain = t % 4
    if remain == 0:
        current_weight = sums[t // 2] * t + curl_ud_weights[t // 2] + snake_weight
        snake_weight += a[t // 2] * t + b[t // 2] * (t + 1)
    elif remain == 2:
        current_weight = sums[t // 2] * t + curl_du_weights[t // 2] + snake_weight
        snake_weight += b[t // 2] * t + a[t // 2] * (t + 1)
    if current_weight > max_weight:
        max_weight = current_weight
print(max_weight)
'\n3\n0 1 0\n0 0 0\n'
```

### 150

```python
import string
import bisect
import sys

def main():
    lines = sys.stdin.readlines()
    n = int(lines[0])
    s = lines[1]
    vals = {}
    for c in string.ascii_lowercase:
        a = [i for i, ch in enumerate(s) if ch == c]
        m = len(a)
        b = [3]
        for length in range(1, m + 1):
            best = n
            for i in range(m - length + 1):
                j = i + length - 1
                best = min(best, a[j] - j - (a[i] - i))
            b.append(best)
        vals[c] = b
    q = int(lines[2])
    r = []
    idx = 3
    while q > 0:
        q -= 1
        query = lines[idx].split()
        idx += 1
        m = int(query[0])
        c = query[1]
        i = bisect.bisect_right(vals[c], m)
        r.append(str(min(n, i + m - 1)))
    print('\n'.join(r))
main()
```

### 151

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += 1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= 0
print(cnt)
```

### 152

```python
n, m = map(int, input().split())

def road(ins):
    cur = S.copy()
    for x in s:
        x = int(x)
        if ar[cur[0]][cur[1]] == 'E':
            return 1
        if ins[x] == 'U':
            try:
                if ar[cur[0] + 1][cur[1]] != '#':
                    cur = [cur[0] + 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'D':
            try:
                if ar[cur[0] - 1][cur[1]] != '#' and cur[0] - 1 >= 0:
                    cur = [cur[0] - 1, cur[1]]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'R':
            try:
                if ar[cur[0]][cur[1] + 1] != '#':
                    cur = [cur[0], cur[1] + 1]
                else:
                    return 0
            except:
                return 0
        if ins[x] == 'L':
            try:
                if ar[cur[0]][cur[1] - 1] != '#' and cur[1] - 1 >= 0:
                    cur = [cur[0], cur[1] - 1]
                else:
                    return 0
            except:
                return 0
    if ar[cur[0]][cur[1]] == 'E':
        return 1
    else:
        return 0
ar = [input() for x in range(n)]
S = [0, 0]
E = [0, 0]
for x in range(n):
    if 'S' in ar[x]:
        S = [x, ar[x].index('S')]
    if 'E' in ar[x]:
        E = [x, ar[x].index('E')]
s = input()
import itertools
i = 0
for x in list(itertools.permutations(['U', 'D', 'L', 'R'])):
    i += road(list(x))
print(i)
```

### 153

```python
def read(type=1):
    if type:
        file = open('input.dat', 'r')
        n = int(file.readline())
        a = list(map(int, file.readline().split()))
        b = file.readline()
        file.close()
    else:
        n = int(input().strip())
        a = list(map(int, input().strip().split()))
        b = input().strip()
    return (n, a, b)

def solve():
    sol = 0
    e = 0
    big = 0
    g = 0
    for i in range(n):
        if b[i] == 'W':
            big = 1
            sol += 3 * a[i]
            e += a[i]
        if b[i] == 'G':
            sol += 5 * a[i]
            e += a[i]
            g += 2 * a[i]
        if b[i] == 'L':
            sol += a[i]
            e -= a[i]
            if e < 0:
                if not big:
                    sol -= 3 * e
                else:
                    sol -= 5 * e
                e = 0
        g = min(g, e)
    if e:
        sol -= 2 * g
        sol -= e - g
    return int(sol)
n, a, b = read(0)
sol = solve()
print(sol)
```

### 154

```python
from copy import deepcopy
import itertools
from bisect import bisect_left
from bisect import bisect_right
import math
from collections import deque

def read():
    return int(input())

def readmap():
    return map(int, input().split())

def readlist():
    return list(map(int, input().split()))
N, M = readmap()
A = [0] + readlist() + [M]
on_time = []
off_time = []
for i in range(1, N + 2):
    if i % 2 == 1:
        on_time.append(A[i] - A[i - 1])
    else:
        off_time.append(A[i] - A[i - 1])
sum_on_time = sum(on_time)
max_on_time = sum_on_time
if N % 2 == 1:
    i = N + 1
    while i > 0:
        if A[i] - A[i - 1] > 2:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
else:
    i = N
    sum_on_time -= A[N + 1] - A[N]
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
```

### 155

```python
from sys import stdin
from math import *
line = stdin.readline().rstrip().split()
n = int(line[0])
numbers = list(map(int, stdin.readline().rstrip().split()))
numbers2 = list(map(int, stdin.readline().rstrip().split()))
growRateAccum = 0
topAccum = 0
bottomAccum = 0
accumsB = [0] * n
accumsT = [0] * n
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers[i]
    if i < n - 1:
        growRateAccum *= numbers2[i + 1]
    accum += growRateAccum
    accumsB[i] = accum
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers2[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers2[i]
    if i < n - 1:
        growRateAccum += numbers[i + 1]
    accum += growRateAccum
    accumsT[i] = accum
cMax = 0
currAccum = 0
growRateAccum = sum(numbers[1:]) + sum(numbers2[1:])
for i in range(n):
    if i % 2 == 0:
        cMax = max(cMax, currAccum + accumsT[i])
    else:
        cMax = max(cMax, currAccum + accumsB[i])
    if i < n - 1:
        if i % 2 == 0:
            currAccum += numbers2[i] + growRateAccum * 2
        else:
            currAccum += numbers[i] + growRateAccum * 2
        growRateAccum -= numbers[i + 1]
        growRateAccum -= numbers2[i + 1]
print(cMax)
```

### 156

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 0
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 157

```python
def main():
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    roundup = []
    rounddown = []
    sumsofar = []
    for i, (a, b) in enumerate(zip(reversed(A), reversed(B))):
        ssf = sumsofar[-1] if sumsofar else 0
        t = roundup[-1] if roundup else 0
        roundup.append(t + ssf + b * (1 + 2 * i))
        t = rounddown[-1] if rounddown else 0
        rounddown.append(t + ssf + a * (1 + 2 * i))
        sumsofar.append(ssf + a + b)
    roundup = list(reversed(roundup))
    rounddown = list(reversed(rounddown))
    sumsofar = list(reversed(sumsofar))
    bestres = 0
    sofar = 0
    for i, (a, b) in enumerate(zip(A, B)):
        rup, rdo = (roundup, rounddown)
        if i % 2:
            a, b = (b, a)
            rup, rdo = (rdo, rup)
        bestres = max(bestres, sofar + rup[i] + sumsofar[i] * 2 * i)
        sofar += a * 2 * i
        sofar += b * (2 * i + -1)
        bestres = max(bestres, sofar)
    print(bestres)

def __starting_point():
    main()
__starting_point()
```

### 158

```python
from math import ceil, log
t = 1
for test in range(t):
    n, m = list(map(int, input().split()))
    arr = list(map(int, input().split()))
    arr.append(m)
    prev = 0
    on = 0
    counter = 0
    for i in arr:
        if counter % 2 == 0:
            on += i - prev
        prev = i
        counter += 1
    off = m - on
    counter = 0
    ans = on
    prev = 0
    prevOn = 0
    for i in arr:
        if counter % 4 == 0:
            if i - prev != 1:
                tmp = prevOn + i - prev - 1 + m - i - (on - prevOn - (i - prev))
                if tmp > ans:
                    ans = tmp
            prevOn += i - prev
        elif i - prev != 1:
            tmp = prevOn + i - prev - 1 + m - i - (on - prevOn)
            if tmp > ans:
                ans = tmp
        prev = i
        counter += 1
    print(ans)
```

### 159

```python
import sys
input = sys.stdin.readline
N = int(input())
S = list(map(lambda x: ord(x) - ord('a'), list(input())[:-1]))
res = [[0] * (N + 1) for _ in range(26)]
for c in range(26):
    for l in range(N - 1):
        x = 0
        for r in range(l + 1, N + 1):
            x += S[r - 1] != c
            res[c][x] = max(res[c][x], r - l)
    for i in range(N):
        res[c][i + 1] = max(res[c][i + 1], res[c][i])
for _ in range(int(input())):
    x, s = input().split()
    x = int(x)
    s = ord(s) - ord('a')
    print(res[s][x])
```

### 160

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 - 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 0
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop()
        if op:
            v |= t[nixO]
        else:
            v ^= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 161

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 0
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop()
        if op:
            v |= t[nixO]
        else:
            v ^= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 162

```python
def main():
    n = int(input())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))
    roundup = []
    rounddown = []
    sumsofar = []
    for i, (a, b) in enumerate(zip(reversed(A), reversed(B))):
        ssf = sumsofar[-1] if sumsofar else 0
        t = roundup[-1] if roundup else 0
        roundup.append(t + ssf + b * (1 + 2 * i))
        t = rounddown[-1] if rounddown else 0
        rounddown.append(t + ssf + a * (1 + 2 * i))
        sumsofar.append(ssf + a + b)
    roundup = list(reversed(roundup))
    rounddown = list(reversed(rounddown))
    sumsofar = list(reversed(sumsofar))
    bestres = 0
    sofar = 0
    for i, (a, b) in enumerate(zip(A, B)):
        rup, rdo = (roundup, rounddown)
        if i % 2:
            a, b = (b, a)
            rup, rdo = (rdo, rup)
        bestres = max(bestres, sofar + rup[i] + sumsofar[i] * 2 * i)
        sofar += a * 2 * i
        sofar += b * (-2 * i + 1)
        bestres = max(bestres, sofar)
    print(bestres)

def __starting_point():
    main()
__starting_point()
```

### 163

```python
3

def needs_rep(t, i):
    if i % 2 == 0:
        return t[i] >= t[i + 1]
    else:
        return t[i] <= t[i + 1]

def would_need_rep(t, i, j1, j2):
    n = len(t)
    if i < 0:
        return False
    if i >= n - 1:
        return False
    tj1 = t[j2]
    tj2 = t[j1]
    ti = t[i]
    if i == j1:
        ti = tj1
    if i == j2:
        ti = tj2
    ti1 = t[i + 1]
    if i + 1 == j1:
        ti1 = tj1
    if i + 1 == j2:
        ti1 = tj2
    if i % 2 == 0:
        return ti > ti1
    else:
        return ti <= ti1

def main():
    n = int(input())
    t = [int(i) for i in input().split()]
    rep = []
    for i in range(n - 1):
        if needs_rep(t, i):
            rep.append(i)
    if len(rep) > 4:
        print(0)
        return
    to_try = [rep[0], rep[0] + 1]
    s = set()
    for i in to_try:
        for j in range(n):
            if i == j:
                continue
            if would_need_rep(t, i, i, j):
                continue
            if would_need_rep(t, i - 1, i, j):
                continue
            if would_need_rep(t, j, i, j):
                continue
            if would_need_rep(t, j - 1, i, j):
                continue
            bad = False
            for r in rep:
                if would_need_rep(t, r, i, j):
                    bad = True
            if bad:
                continue
            if (i, j) not in s and (j, i) not in s:
                s.add((i, j))
    print(len(s))

def __starting_point():
    main()
__starting_point()
```

### 164

```python
import sys
n = int(sys.stdin.readline().strip())
s = sys.stdin.readline().strip()
dp = [[-1] * (n + 1) for i in range(26)]
for c in range(26):
    for j in range(n):
        tst = 1 if s[j] == chr(c + 97) else 0
        dp[c][1 - tst] = min(dp[c][1 - tst], 1)
        for k in range(j + 1, n):
            if s[k] == chr(c + 97):
                tst += 1
            dp[c][k - j + 1 - tst] = max(dp[c][k - j + 1 - tst], k - j + 1)
q = int(sys.stdin.readline().strip())
for i in range(q):
    m, c = [item for item in sys.stdin.readline().strip().split()]
    m = int(m)
    print(dp[ord(c) - 97][m]) if dp[ord(c) - 97][m] != -1 else print(n)
```

### 165

```python
from sys import stdin, stderr
import random
import cProfile

def readInts():
    return map(int, stdin.readline().strip().split())

def print_err(*args, **kwargs):
    print(*args, file=stderr, **kwargs)

def solve(vs):
    return None

def generate_tree(n, ns):
    out = [0 for _ in range(2 ** (n + 1))]

    def gt(nix, left, right, op):
        if left + 1 == right:
            out[nix] = ns[left]
            return out[nix]
        mid = (left + right) // 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = gt(nL, left, mid, not op)
        vR = gt(nR, mid, right, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        out[nix] = v
        return v
    gt(0, 0, 2 ** n, n % 2 == 0)
    return out

def alter_tree2(n, t, p, b):

    def at(nix, width, offp, op):
        if width == 1:
            t[nix] = b
            return b
        width //= 2
        nL = nix * 2 + 1
        nR = nix * 2 + 2
        vL = t[nL]
        vR = t[nR]
        if offp >= width:
            vR = at(nR, width, offp - width, not op)
        else:
            vL = at(nL, width, offp, not op)
        if op:
            v = vL ^ vR
        else:
            v = vL | vR
        t[nix] = v
        return v
    at(0, 2 ** n, p, n % 2 == 0)

def alter_tree(n, t, p, b):
    width = 2 ** n
    s = []
    nix = 0
    op = n % 2 == 0
    while width > 1:
        width //= 2
        if p >= width:
            nix2 = 2 * nix + 2
            s.append((nix, nix2 - 1))
            p -= width
        else:
            nix2 = 2 * nix + 1
            s.append((nix, nix2 + 1))
        nix = nix2
        op = not op
    t[nix] = b
    v = b
    while s:
        nix, nixO = s.pop(0)
        if op:
            v |= t[nixO]
        else:
            v ^= t[nixO]
        t[nix] = v
        op = not op
    return

def run():
    n, m = readInts()
    axs = list(readInts())
    t = generate_tree(n, axs)
    for _ in range(m):
        p, b = readInts()
        alter_tree(n, t, p - 1, b)
        print(t[0])

def test():
    n = 17
    ns = []
    vs100 = list(range(100))
    for _ in range(2 ** 17):
        ns.append(random.choice(vs100))
    t = generate_tree(n, ns)
    t2 = generate_tree(n, ns)
    for _ in range(100000):
        v1 = random.choice(vs100)
        v2 = random.choice(vs100)
        alter_tree(n, t, v1, v2)
        alter_tree2(n, t2, v1, v2)
    print(all(map(lambda x: x[0] == x[1], zip(t, t2))))
    print(t[0] == t2[0])
run()
```

### 166

```python
from heapq import heappush, heappop
n = int(input())
L = list(map(int, input().split()))
T = input()
ans = sum(L)
Q = []
for l, t in zip(L, T):
    if t == 'G':
        heappush(Q, (2, 2 * l))
        heappush(Q, (5, float('inf')))
    elif t == 'W':
        heappush(Q, (1, 2 * l))
        heappush(Q, (3, float('inf')))
    need_stamina = l
    while need_stamina > 2:
        cost, quantity = heappop(Q)
        if need_stamina > quantity:
            ans += quantity * cost
            need_stamina -= quantity
        else:
            ans += need_stamina * cost
            heappush(Q, (cost, quantity - need_stamina))
            need_stamina = 0
print(ans)
```

### 167

```python
from sys import stdin
from math import *
line = stdin.readline().rstrip().split()
n = int(line[0])
numbers = list(map(int, stdin.readline().rstrip().split()))
numbers2 = list(map(int, stdin.readline().rstrip().split()))
growRateAccum = 0
topAccum = 0
bottomAccum = 0
accumsB = [0] * n
accumsT = [0] * n
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum *= numbers[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers[i]
    if i < n - 1:
        growRateAccum += numbers2[i + 1]
    accum += growRateAccum
    accumsB[i] = accum
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers2[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers2[i]
    if i < n - 1:
        growRateAccum += numbers[i + 1]
    accum += growRateAccum
    accumsT[i] = accum
cMax = 0
currAccum = 0
growRateAccum = sum(numbers[1:]) + sum(numbers2[1:])
for i in range(n):
    if i % 2 == 0:
        cMax = max(cMax, currAccum + accumsT[i])
    else:
        cMax = max(cMax, currAccum + accumsB[i])
    if i < n - 1:
        if i % 2 == 0:
            currAccum += numbers2[i] + growRateAccum * 2
        else:
            currAccum += numbers[i] + growRateAccum * 2
        growRateAccum -= numbers[i + 1]
        growRateAccum -= numbers2[i + 1]
print(cMax)
```

### 168

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i] = tree[2 * i] | tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[1])
```

### 169

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += -1
                    elif c == down:
                        y -= 1
                    elif c == right:
                        x += 1
                    else:
                        x -= 1
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not free[pos]:
                        break
print(counts)
```

### 170

```python
from copy import deepcopy
import itertools
from bisect import bisect_left
from bisect import bisect_right
import math
from collections import deque

def read():
    return int(input())

def readmap():
    return map(int, input().split())

def readlist():
    return list(map(int, input().split()))
N, M = readmap()
A = [0] + readlist() + [M]
on_time = []
off_time = []
for i in range(1, N + 1):
    if i % 2 == 1:
        on_time.append(A[i] - A[i - 1])
    else:
        off_time.append(A[i] - A[i - 1])
sum_on_time = sum(on_time)
max_on_time = sum_on_time
if N % 2 == 1:
    i = N + 1
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
else:
    i = N
    sum_on_time -= A[N + 1] - A[N]
    while i > 0:
        if A[i] - A[i - 1] > 1:
            x = A[i - 1] + 1
            max_on_time = max(max_on_time, sum_on_time + A[i] - x)
        sum_on_time = sum_on_time + (A[i] - A[i - 1]) - (A[i - 1] - A[i - 2])
        if A[i - 1] - A[i - 2] > 1:
            x = A[i - 1] - 1
            max_on_time = max(max_on_time, sum_on_time + x - A[i - 2])
        i -= 2
    print(max_on_time)
```

### 171

```python
A11, A12, A13 = list(map(int, input().split()))
A21, A22, A23 = list(map(int, input().split()))
A31, A32, A33 = list(map(int, input().split()))
Alist = []
Alist.append(A11)
Alist.append(A12)
Alist.append(A13)
Alist.append(A21)
Alist.append(A22)
Alist.append(A23)
Alist.append(A31)
Alist.append(A32)
Alist.append(A33)
bingolist = [0] * 9
N = int(input())
for i in range(N):
    b = int(input())
    for j in range(len(bingolist)):
        if b == Alist[j]:
            bingolist[j] = 1
if sum(bingolist[0:3]) == 3 or sum(bingolist[3:6]) == 3 or sum(bingolist[6:9]) == 3 or (bingolist[0] + bingolist[3] + bingolist[6] == 3) or (bingolist[1] + bingolist[4] + bingolist[7] == 3) or (bingolist[2] + bingolist[5] + bingolist[8] == 3) or (bingolist[0] + bingolist[4] + bingolist[8] == 4) or (bingolist[2] + bingolist[4] + bingolist[6] == 3):
    print('Yes')
else:
    print('No')
```

### 172

```python
n = int(input())
l = list(map(lambda x: int(x) * 2, input().split(' ')))
t = list(map(lambda x: 'GWL'.index(x), input()))
mins = [0 for i in range(0, n + 1)]
for i in range(n - 1, -1, -1):
    if t[i] != 2:
        mins[i] = max(mins[i + 1] - l[i], 0)
    else:
        mins[i] = mins[i + 1] * l[i]
curs = ans = st = 0
for i in range(0, n):
    if t[i] == 0:
        curs += l[i]
        ans += l[i] * 5
        if curs > mins[i + 1]:
            ol = (curs - mins[i + 1]) // 2
            ol = min(ol, l[i])
            ans -= 4 * ol
            curs -= 2 * ol
    if t[i] == 1:
        st = 1
        curs += l[i]
        ans += l[i] * 3
    if t[i] == 2:
        if curs < l[i]:
            ol = l[i] - curs
            curs = l[i]
            ans += ol * (3 if st else 5)
        curs -= l[i]
        ans += l[i]
if curs > 0:
    ans -= curs // 2 * 2
print(ans // 2)
```

### 173

```python
def get_val(x, k, y, left_val, right_val, arr):
    x, y = (y, x)
    if not arr:
        return 0
    if len(arr) <= k:
        if max(arr) > max(left_val, right_val):
            return -1
        return len(arr) * x
    if y < x * k:
        n = len(arr)
        res = 0
        while n >= k:
            n -= k
            res += y
        res += n * x
        return res
    elif max(arr) < max(left_val, right_val):
        return len(arr) * x
    else:
        return (len(arr) - k) * x + y

def solve(x, k, y, a, b):

    def check(a, b):
        j = 0
        i = 0
        while i < len(a) and j < len(b):
            if a[i] != b[j]:
                i += 1
            else:
                i += 1
                j += 1
        return j == len(b)
    if not check(a, b):
        return -1
    j = 0
    left_val = -1
    arr = []
    res = 0
    for num in a:
        if j == len(b) or num != b[j]:
            arr.append(num)
        else:
            val = get_val(x, k, y, left_val, num, arr)
            if val == -1:
                return -1
            res += val
            arr = []
            left_val = num
            j += 1
    if arr:
        val = get_val(x, k, y, left_val, -1, arr)
        if val == -1:
            return -1
        res += val
    return res
n, m = list(map(int, input().split()))
x, k, y = list(map(int, input().split()))
a = list(map(int, input().split()))
b = list(map(int, input().split()))
print(solve(x, k, y, a, b))
```

### 174

```python
def main():
    A = [list(map(int, input().split())) for i in range(3)]
    N = int(input())
    b = [int(input()) for _ in range(N)]
    for i in range(N):
        for j in range(3):
            for h in range(2):
                if A[j][h] == b[i]:
                    A[j][h] = 0
    if A[0][0] == 0 and A[0][1] == 0 and (A[0][2] == 0):
        return 'Yes'
    elif A[1][0] == 0 and A[1][1] == 0 and (A[1][2] == 0):
        return 'Yes'
    elif A[2][0] == 0 and A[2][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][0] == 0 and (A[2][0] == 0):
        return 'Yes'
    elif A[0][1] == 0 and A[1][1] == 0 and (A[2][1] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][2] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][0] == 0 and A[1][1] == 0 and (A[2][2] == 0):
        return 'Yes'
    elif A[0][2] == 0 and A[1][1] == 0 and (A[2][0] == 0):
        return 'Yes'
    return 'No'
print(main())
```

### 175

```python
n = int(input())
l = list(map(int, input().split()))
s = input()
water = 0
grass = 0
cgrass = 0
time = 0
seen = False
for i in range(n):
    if s[i] == 'G':
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 1 * dist
            cgrass += dist
        else:
            dist -= water
            time += 2 * water
            cgrass += water
            water = 0
            time += 3 * dist
            grass += dist
    elif s[i] == 'W':
        water += l[i]
        time += 2 * l[i]
        seen = True
    else:
        dist = l[i]
        if water >= dist:
            water -= dist
            time += 2 * dist
        else:
            dist -= water
            time += 2 * water
            water = 0
            if cgrass >= dist:
                cgrass -= dist
                grass += dist
                time += 3 * dist
            else:
                dist -= cgrass
                grass += cgrass
                time += 3 * cgrass
                cgrass = 0
                if grass >= dist:
                    grass -= dist
                    time += 3 * dist
                else:
                    dist -= grass
                    time += 3 * grass
                    grass = 0
                    if seen:
                        time += 4 * dist
                    else:
                        time += 6 * dist
print(time)
```

### 176

```python
def main():
    n, l = (int(input()), list(map(int, input().split())))
    if not n & 2:
        l.append(0)
    l.append(150001)
    i, b, c, fails0, fails1 = (0, 0, 150001, [], [])
    try:
        while True:
            a, b, c = (b, c, l[i])
            if a >= b or b <= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails1.append(i - 1)
            i += 1
            a, b, c = (b, c, l[i])
            if a <= b or b >= c:
                if len(fails0) + len(fails1) > 5:
                    print(0)
                    return
                fails0.append(i - 1)
            i += 1
    except IndexError:
        fails, res = (fails0 + fails1, 0)
    for i in fails:
        a = l[i]
        for j in range(n):
            f = fails1 if j & 1 else fails0
            f.append(j)
            l[i], l[j] = (l[j], a)
            if all((l[b - 1] > l[b] < l[b + 1] for b in fails0)) and all((l[b - 1] < l[b] > l[b + 1] for b in fails1)):
                res += 1 if j in fails else 2
            l[j] = l[i]
            del f[-1]
        l[i] = a
    print(res // 2)

def __starting_point():
    main()
__starting_point()
```

### 177

```python
def main():
    n, M = [int(i) for i in input().split(' ')]
    a = [0] + [int(i) for i in input().split(' ')] + [M]
    n = n + 2
    incr_sum = []
    s = 0
    for i in range(n):
        if i % 2 == 1:
            s += a[i] - a[i - 1]
        incr_sum.append(s)
    max_sum = s
    for i in range(n - 1 - 1):
        if a[i + 1] - a[i] != 1:
            to_add = a[i + 1] - 1
            s_ = incr_sum[i]
            s_ += to_add - a[i]
            s_ += a[-1] - a[i + 1] - (incr_sum[-1] - incr_sum[i + 1])
            if s_ > max_sum:
                max_sum = s_
    print(max_sum)

def __starting_point():
    main()
__starting_point()
```

### 178

```python
import sys
n = int(sys.stdin.readline().strip())
s = sys.stdin.readline().strip()
dp = [[-1] * (n + 1) for i in range(26)]
for c in range(26):
    for j in range(n):
        tst = 1 if s[j] == chr(c + 97) else 0
        dp[c][1 - tst] = max(dp[c][1 - tst], 1)
        for k in range(j + 1, n):
            if s[k] == chr(c + 97):
                tst += 1
            dp[c][k - j + 1 - tst] = max(dp[c][k - j + 1 - tst], k - j + 1)
q = int(sys.stdin.readline().strip())
for i in range(q):
    m, c = [item for item in sys.stdin.readline().strip().split()]
    m = int(m)
    print(dp[ord(c) - 97][m]) if dp[ord(c) - 97][m - 1] != -1 else print(n)
```

### 179

```python
import sys
input = sys.stdin.readline
import heapq
from operator import itemgetter
n, m = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
W = [list(map(int, input().split())) + [i] for i in range(m)] + [[sx, sy, m]]
ANS = [n ** 2]

def ans(time, x, y):
    ANS[0] = min(ANS[0], time + abs(fx - x) + abs(fy - y))
WX = sorted(W, key=itemgetter(0))
WY = sorted(W, key=itemgetter(1))
EDGE = [[] for i in range(m + 1)]
TIME = [1 << 60] * (m + 1)
TIME[m] = 0
for i in range(1, m - 1):
    x0, y0, m0 = WX[i - 1]
    x1, y1, m1 = WX[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
    x0, y0, m0 = WY[i - 1]
    x1, y1, m1 = WY[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
Q = [(0, m)]
while Q:
    time, town = heapq.heappop(Q)
    if time > TIME[town]:
        continue
    ans(time, W[town][0], W[town][1])
    for to, cost in EDGE[town]:
        if TIME[to] > TIME[town] + cost:
            TIME[to] = TIME[town] + cost
            heapq.heappush(Q, (TIME[to], to))
print(ANS[0])
```

### 180

```python
import sys, io, os
import math
import heapq as hq
import random
from collections import defaultdict
import sys
from os import path

def console(*args):
    pass
if path.exists('input.txt'):
    sys.stdin = open('input.txt', 'r')
    sys.stdout = open('output.txt', 'w')

    def console(*args):
        pass
inp = sys.stdin.readlines()

def solve(*args):
    console('----- solving ------')
    console(*args)
    console('----- ------- ------')
    return solve_(*args)

def solve_(grid, sx, sy, ex, ey):
    console('----- solving ------')
    minres = abs(sx - ex) + abs(sy - ey)
    console(minres)
    if grid == []:
        return minres
    d = defaultdict(list)
    grid = [(i, x, y) for i, (x, y) in enumerate(grid)]
    grid = sorted(grid, key=lambda x: x[1])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, x2 - x1))
        d[i2].append((i1, x2 - x1))
    grid = sorted(grid, key=lambda x: x[2])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, y2 - y1))
        d[i2].append((i1, y2 - y1))
    for i, x, y in grid:
        d[-2].append((i, abs(x - sx)))
        d[-2].append((i, abs(y - sy)))
        d[i].append((-1, abs(x - ex) + abs(y - ey)))
    d[-1] = []
    console(list(d.keys()))
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    return min(minres, dijkstra_with_preprocessing(d, -0, -1))

def dijkstra_with_preprocessing(map_from_node_to_nodes_and_costs, source, target):
    d = map_from_node_to_nodes_and_costs
    if target not in d:
        d[-1] = []
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    _, costs = dijkstra(G, idxs[source])
    return costs[idxs[target]]

def dijkstra(G, s):
    n = len(G)
    visited = [False] * n
    weights = [math.inf] * n
    path = [None] * n
    queue = []
    weights[s] = 0
    hq.heappush(queue, (0, s))
    while len(queue) > 0:
        g, u = hq.heappop(queue)
        visited[u] = True
        for v, w in G[u]:
            if not visited[v]:
                f = g + w
                if f < weights[v]:
                    weights[v] = f
                    path[v] = u
                    hq.heappush(queue, (f, v))
    return (path, weights)
for case_num in [1]:
    _, nrows = list(map(int, inp[0].split()))
    sx, sy, ex, ey = list(map(int, inp[1].split()))
    grid = []
    for z in range(nrows):
        grid.append(list(map(int, inp[z + 2].split())))
    res = solve(grid, sx, sy, ex, ey)
    print(res)
```

### 181

```python
import sys
input = sys.stdin.readline
import heapq
from operator import itemgetter
n, m = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
W = [list(map(int, input().split())) + [i] for i in range(m)] + [[sx, sy, m]]
ANS = [n ** 2]

def ans(time, x, y):
    ANS[0] = min(ANS[0], time + abs(fx - x) + abs(fy - y))
WX = sorted(W, key=itemgetter(0))
WY = sorted(W, key=itemgetter(1))
EDGE = [[] for i in range(m + 1)]
TIME = [1 << 60] * (m + 1)
TIME[m] = 0
for i in range(1, m + 1):
    x0, y0, m0 = WX[i - 1 + 1]
    x1, y1, m1 = WX[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
    x0, y0, m0 = WY[i - 1]
    x1, y1, m1 = WY[i]
    EDGE[m0].append((m1, min(abs(x0 - x1), abs(y0 - y1))))
    EDGE[m1].append((m0, min(abs(x0 - x1), abs(y0 - y1))))
Q = [(0, m)]
while Q:
    time, town = heapq.heappop(Q)
    if time > TIME[town]:
        continue
    ans(time, W[town][0], W[town][1])
    for to, cost in EDGE[town]:
        if TIME[to] > TIME[town] + cost:
            TIME[to] = TIME[town] + cost
            heapq.heappush(Q, (TIME[to], to))
print(ANS[0])
```

### 182

```python
n = int(input())
a = [list(map(int, input().split())) for i in range(2)]
if n != 1:
    sum_up, pref_up, sum_down, pref_down = [[[0 for i in range(n)] for j in range(2)] for _ in range(4)]
    for i in range(2):
        sum_up[i][n - 1] = a[i][n - 1]
        pref_up[i][n - 1 - 1] = a[i][n - 1]
        pref_down[i][n - 1] = a[i][n - 1]
        for j in range(n - 2, -1, -1):
            sum_up[i][j] = sum_up[i][j + 1] + a[i][j]
            pref_up[i][j] = pref_up[i][j + 1] + sum_up[i][j]
            pref_down[i][j] = pref_down[i][j + 1] + a[i][j] * (n - j)
    zig = [[0 for i in range(n)] for j in range(2)]
    for j in range(n):
        for i in range(2):
            if j % 2 == 0:
                if i == 0:
                    zig[i][j] = a[i][j] * j * 2 + zig[i][j - 1]
                else:
                    zig[i][j] = a[i][j] * (j * 2 + 1) + zig[1 - i][j]
            elif i == 0:
                zig[1 - i][j] = a[1 - i][j] * j * 2 + zig[1 - i][j - 1]
            else:
                zig[1 - i][j] = a[1 - i][j] * (j * 2 + 1) + zig[i][j]
    ans = -1e+18
    for j in range(n):
        if j == 0:
            ans = max(ans, pref_up[0][j] + pref_down[1][j] + sum_up[1][j] * n - sum_up[0][j] - sum_up[1][j])
        elif j == n - 1:
            ans = max(ans, zig[1 - j % 2][n - 1])
        elif j % 2 == 1:
            ans = max(ans, pref_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2 + 1) - 1) + pref_down[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2 + 1) - 1 + n - j) + zig[0][j])
        else:
            ans = max(ans, pref_up[1][j + 1] - sum_up[1][j + 1] + sum_up[1][j + 1] * (4 * (j // 2) + 2) + pref_down[0][j + 1] - sum_up[0][j + 1] + sum_up[0][j + 1] * (4 * (j // 2) + 2 - 1 + n - j) + zig[1][j])
    ans = max(ans, pref_up[1][0] + pref_down[0][1] + sum_up[0][1] * n)
    print(ans)
else:
    print(a[1][0])
```

### 183

```python
from heapq import heappush, heappop
import sys
input = sys.stdin.readline
INF = 10 ** 10

def dijkstra(N, G, s):
    dist = [INF] * N
    que = [(0, s)]
    dist[s] = 0
    while que:
        c, v = heappop(que)
        if dist[v] < c:
            continue
        for t, cost in G[v]:
            if dist[v] + cost < dist[t]:
                dist[t] = dist[v] + cost
                heappush(que, (dist[t], t))
    return dist[1]
N, M = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
vs = []
g = [set() for _ in range(M + 2)]
for i in range(M):
    x, y = list(map(int, input().split()))
    g[0].add((i + 2, min(abs(x - sx), abs(y - sy))))
    g[i + 2].add((1, abs(x - fx) + abs(y - fy)))
    vs.append((i + 2, x, y))
vs.sort(key=lambda x: (x[1], x[2]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(x - bx, abs(y - by))
    g[i].add((b, c))
    g[b].add((i, c))
vs.sort(key=lambda x: (x[2], x[1]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(abs(x - bx), y - by)
    g[i].add((b, c))
    g[b].add((i, c))
print(min(dijkstra(M + 2, g, -2), abs(fy - sy) + abs(fx - sx)))
```

### 184

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
gar = []
shadow = []
gar.append(a[0])
light = False
a.append(m)
for i in range(1, n + 1):
    dl = a[i] - a[i - 1]
    if light:
        gar.append(dl)
        light = False
    else:
        shadow.append(dl)
        light = True
light = sum(gar)
dark = sum(shadow)
lightmax = light
teclight = 0
tecdark = 0
if n % 2 == 0:
    n = n // 2
else:
    n = n // 2 + 1
for i in range(n - 1):
    if i != n - 1:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
    elif len(shadow) == n:
        teclight += gar[i]
        light -= gar[i]
        if gar[i] > 1:
            newlight = teclight - 1 + dark
            lightmax = max(lightmax, newlight)
        tecdark += shadow[i]
        dark -= shadow[i]
        if shadow[i] > 1:
            newlight = teclight + shadow[i] - 1 + dark
            lightmax = max(lightmax, newlight)
print(lightmax)
```

### 185

```python
def subsequence(arr1, arr2, n, m):
    i = 0
    j = 0
    common = []
    while i < n and j < m:
        if arr1[i] == arr2[j]:
            common.append(i)
            j += 1
        i += 1
    if j == m:
        return common
    return []

def find(arr, start, end, x, y, k):
    stack = []
    second_use_limit = 0
    for i in range(start, end + 1):
        if not stack:
            stack.append(arr[i])
        else:
            while stack and arr[i] > stack[-1]:
                second_use_limit += 1
                stack.pop()
            if not stack or arr[i] > stack[-1]:
                stack.append(arr[i])
            elif stack and arr[i] < stack[-1]:
                second_use_limit += 1
    while stack and start - 1 >= 0 and (arr[start - 1] > stack[0]):
        stack.pop(0)
        second_use_limit += 1
    while stack and end + 1 < len(arr) and (arr[end + 1] > stack[-1]):
        stack.pop()
        second_use_limit += 1
    min_cost = float('inf')
    total = (end - start) * 1
    i = 0
    while i * k <= total:
        rem = total - i * k
        if rem <= second_use_limit:
            min_cost = min(min_cost, i * x + rem * y)
        i += 1
    if min_cost == float('inf'):
        return -1
    return min_cost

def main():
    n, m = list(map(int, input().split()))
    x, k, y = list(map(int, input().split()))
    arr1 = list(map(int, input().split()))
    arr2 = list(map(int, input().split()))
    common = subsequence(arr1, arr2, n, m)
    if not common:
        print(-1)
        return
    cost = 0
    for i in range(len(common)):
        if i == 0:
            if common[i] > 0:
                start = 0
                end = common[i] - 1
                if end >= start:
                    curr_cost = find(arr1, start, end, x, y, k)
                    if curr_cost == -1:
                        cost = -1
                        break
                    cost += curr_cost
        start = common[i] + 1
        if i + 1 < len(common):
            end = common[i + 1] - 1
        else:
            end = n - 1
        if end >= start:
            curr_cost = find(arr1, start, end, x, y, k)
            if curr_cost == -1:
                cost = -1
                break
            cost += curr_cost
    print(cost)
main()
```

### 186

```python
from collections import defaultdict as di
n, m = [int(x) for x in input().split()]
free = di(lambda: False)
startpos = (-1, -1)
goal = (-1, -1)
for y in range(n):
    s = input()
    for x in range(m):
        c = s[x]
        if c == 'S':
            startpos = (x, y)
            free[x, y] = True
        elif c == 'E':
            goal = (x, y)
            free[x, y] = True
        elif c == '.':
            free[x, y] = True
counts = 0
dire = '0123'
command = input()
for up in dire:
    for down in dire:
        for right in dire:
            for left in dire:
                if len(set([up, down, left, right])) < 4:
                    continue
                pos = startpos
                for c in command:
                    x, y = pos
                    if c == up:
                        y += 1
                    elif c == down:
                        y -= -1
                    elif c == right:
                        x += 1
                    else:
                        x -= 1
                    pos = (x, y)
                    if pos == goal:
                        counts += 1
                        break
                    if not free[pos]:
                        break
print(counts)
```

### 187

```python
a_3_3 = [list(map(int, input().split())) for _ in range(3)]
n = int(input())
b_n = [int(input()) for _ in range(n)]

class Info:

    def __init__(self, a_3_3, n, b_n):
        self.a_3_3 = a_3_3
        self.n = n
        self.b_n = b_n

    @staticmethod
    def setting():
        for num in b_n:
            for line in a_3_3:
                if num in line:
                    line[line.index(num)] = 0
        return a_3_3

    @staticmethod
    def result():
        diagonal_lurd = (a_3_3[0][0] + a_3_3[1][1]) * a_3_3[2][2]
        diagonal_ldru = a_3_3[2][0] + a_3_3[1][1] + a_3_3[0][2]
        for index, line in enumerate(a_3_3):
            row_sum = sum(line)
            col_sum = a_3_3[0][index] + a_3_3[1][index] + a_3_3[2][index]
            if diagonal_lurd == 0 or diagonal_ldru == 0 or row_sum == 0 or (col_sum == 0):
                print('Yes')
                return
        print('No')
info = Info(a_3_3, n, b_n)
info.setting()
info.result()
```

### 188

```python
import sys
YES = 'Yes'
NO = 'No'

def solve(A: 'List[List[int]]', N: int, b: 'List[int]'):
    A_ = []
    for a_ in A:
        A_ += [[a__, False] for a__ in a_]
    for b_ in b:
        for a__ in A_:
            if a__[0] == b_:
                a__[1] = True
    if A_[0][1] and (A_[1][1] and A_[2][1] or (A_[3][1] and A_[6][1]) or (A_[4][1] and A_[8][1])) or (A_[1][1] and A_[4][0] and A_[7][1]) or (A_[2][1] and A_[5][1] and A_[8][1]) or (A_[3][1] and A_[4][1] and A_[5][1]) or (A_[6][1] and A_[7][1] and A_[8][1]) or (A_[2][1] and A_[4][1] and A_[6][1]):
        print(YES)
    else:
        print(NO)
    return

def main():

    def iterate_tokens():
        for line in sys.stdin:
            for word in line.split():
                yield word
    tokens = iterate_tokens()
    A = [[int(next(tokens)) for _ in range(3)] for _ in range(3)]
    N = int(next(tokens))
    b = [int(next(tokens)) for _ in range(N)]
    solve(A, N, b)

def __starting_point():
    main()
__starting_point()
```

### 189

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i] = tree[2 * i] | tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif not z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[1])
```

### 190

```python
from heapq import heappush, heappop
import sys
input = sys.stdin.readline
INF = 10 ** 10

def dijkstra(N, G, s):
    dist = [INF] * N
    que = [(0, s)]
    dist[s] = 0
    while que:
        c, v = heappop(que)
        if dist[v] < c:
            continue
        for t, cost in G[v]:
            if dist[v] + cost < dist[t]:
                dist[t] = dist[v] + cost
                heappush(que, (dist[t], t))
    return dist[1]
N, M = list(map(int, input().split()))
sx, sy, fx, fy = list(map(int, input().split()))
vs = []
g = [set() for _ in range(M + 2)]
for i in range(M):
    x, y = list(map(int, input().split()))
    g[0].add((i + 2, max(abs(x - sx), abs(y - sy))))
    g[i + 2].add((1, abs(x - fx) + abs(y - fy)))
    vs.append((i + 2, x, y))
vs.sort(key=lambda x: (x[1], x[2]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(x - bx, abs(y - by))
    g[i].add((b, c))
    g[b].add((i, c))
vs.sort(key=lambda x: (x[2], x[1]))
for (b, bx, by), (i, x, y) in zip(vs, vs[1:]):
    c = min(abs(x - bx), y - by)
    g[i].add((b, c))
    g[b].add((i, c))
print(min(dijkstra(M + 2, g, 0), abs(fy - sy) + abs(fx - sx)))
```

### 191

```python
from sys import stdin
from math import *
line = stdin.readline().rstrip().split()
n = int(line[0])
numbers = list(map(int, stdin.readline().rstrip().split()))
numbers2 = list(map(int, stdin.readline().rstrip().split()))
growRateAccum = 0
topAccum = 0
bottomAccum = 0
accumsB = [0] * n
accumsT = [0] * n
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, +1):
    accum += numbers[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers[i]
    if i < n - 1:
        growRateAccum += numbers2[i + 1]
    accum += growRateAccum
    accumsB[i] = accum
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers2[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers2[i]
    if i < n - 1:
        growRateAccum += numbers[i + 1]
    accum += growRateAccum
    accumsT[i] = accum
cMax = 0
currAccum = 0
growRateAccum = sum(numbers[1:]) + sum(numbers2[1:])
for i in range(n):
    if i % 2 == 0:
        cMax = max(cMax, currAccum + accumsT[i])
    else:
        cMax = max(cMax, currAccum + accumsB[i])
    if i < n - 1:
        if i % 2 == 0:
            currAccum += numbers2[i] + growRateAccum * 2
        else:
            currAccum += numbers[i] + growRateAccum * 2
        growRateAccum -= numbers[i + 1]
        growRateAccum -= numbers2[i + 1]
print(cMax)
```

### 192

```python
import sys
input = sys.stdin.readline
N = int(input())
S = list(map(lambda x: ord(x) - ord('a'), list(input())[:-1]))
res = [[3] * (N + 1) for _ in range(26)]
for c in range(26):
    for l in range(N):
        x = 0
        for r in range(l + 1, N + 1):
            x += S[r - 1] != c
            res[c][x] = max(res[c][x], r - l)
    for i in range(N):
        res[c][i + 1] = max(res[c][i + 1], res[c][i])
for _ in range(int(input())):
    x, s = input().split()
    x = int(x)
    s = ord(s) - ord('a')
    print(res[s][x])
```

### 193

```python
from sys import stdin
from math import *
line = stdin.readline().rstrip().split()
n = int(line[0])
numbers = list(map(int, stdin.readline().rstrip().split()))
numbers2 = list(map(int, stdin.readline().rstrip().split()))
growRateAccum = 0
topAccum = 0
bottomAccum = 0
accumsB = [0] * n
accumsT = [0] * n
growRateAccum = 0
accum = 0
for i in reversed(range(n - 1, -1, -1)):
    accum += numbers[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers[i]
    if i < n - 1:
        growRateAccum += numbers2[i + 1]
    accum += growRateAccum
    accumsB[i] = accum
growRateAccum = 0
accum = 0
for i in range(n - 1, -1, -1):
    accum += numbers2[i] * ((n - i) * 2 - 1 - 1)
    growRateAccum += numbers2[i]
    if i < n - 1:
        growRateAccum += numbers[i + 1]
    accum += growRateAccum
    accumsT[i] = accum
cMax = 0
currAccum = 0
growRateAccum = sum(numbers[1:]) + sum(numbers2[1:])
for i in range(n):
    if i % 2 == 0:
        cMax = max(cMax, currAccum + accumsT[i])
    else:
        cMax = max(cMax, currAccum + accumsB[i])
    if i < n - 1:
        if i % 2 == 0:
            currAccum += numbers2[i] + growRateAccum * 2
        else:
            currAccum += numbers[i] + growRateAccum * 2
        growRateAccum -= numbers[i + 1]
        growRateAccum -= numbers2[i + 1]
print(cMax)
```

### 194

```python
3

def needs_rep(t, i):
    if i % 2 == 0:
        return t[i] >= t[i + 1]
    else:
        return t[i] <= t[i + 1]

def would_need_rep(t, i, j1, j2):
    n = len(t)
    if i < 0:
        return False
    if i >= n - 1:
        return False
    tj1 = t[j2]
    tj2 = t[j1]
    ti = t[i - 1]
    if i == j1:
        ti = tj1
    if i == j2:
        ti = tj2
    ti1 = t[i + 1]
    if i + 1 == j1:
        ti1 = tj1
    if i + 1 == j2:
        ti1 = tj2
    if i % 2 == 0:
        return ti >= ti1
    else:
        return ti <= ti1

def main():
    n = int(input())
    t = [int(i) for i in input().split()]
    rep = []
    for i in range(n - 1):
        if needs_rep(t, i):
            rep.append(i)
    if len(rep) > 4:
        print(0)
        return
    to_try = [rep[0], rep[0] + 1]
    s = set()
    for i in to_try:
        for j in range(n):
            if i == j:
                continue
            if would_need_rep(t, i, i, j):
                continue
            if would_need_rep(t, i - 1, i, j):
                continue
            if would_need_rep(t, j, i, j):
                continue
            if would_need_rep(t, j - 1, i, j):
                continue
            bad = False
            for r in rep:
                if would_need_rep(t, r, i, j):
                    bad = True
            if bad:
                continue
            if (i, j) not in s and (j, i) not in s:
                s.add((i, j))
    print(len(s))

def __starting_point():
    main()
__starting_point()
```

### 195

```python
import sys, io, os
import math
import heapq as hq
import random
from collections import defaultdict
import sys
from os import path

def console(*args):
    pass
if path.exists('input.txt'):
    sys.stdin = open('input.txt', 'r')
    sys.stdout = open('output.txt', 'w')

    def console(*args):
        pass
inp = sys.stdin.readlines()

def solve(*args):
    console('----- solving ------')
    console(*args)
    console('----- ------- ------')
    return solve_(*args)

def solve_(grid, sx, sy, ex, ey):
    console('----- solving ------')
    minres = abs(sx - ex) + abs(sy - ey)
    console(minres)
    if grid == []:
        return minres
    d = defaultdict(list)
    grid = [(i, x, y) for i, (x, y) in enumerate(grid)]
    grid = sorted(grid, key=lambda x: x[1])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[3:]):
        d[i1].append((i2, x2 - x1))
        d[i2].append((i1, x2 - x1))
    grid = sorted(grid, key=lambda x: x[2])
    for (i1, x1, y1), (i2, x2, y2) in zip(grid, grid[1:]):
        d[i1].append((i2, y2 - y1))
        d[i2].append((i1, y2 - y1))
    for i, x, y in grid:
        d[-2].append((i, abs(x - sx)))
        d[-2].append((i, abs(y - sy)))
        d[i].append((-1, abs(x - ex) + abs(y - ey)))
    d[-1] = []
    console(list(d.keys()))
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    return min(minres, dijkstra_with_preprocessing(d, -2, -1))

def dijkstra_with_preprocessing(map_from_node_to_nodes_and_costs, source, target):
    d = map_from_node_to_nodes_and_costs
    if target not in d:
        d[-1] = []
    idxs = {k: i for i, k in enumerate(d.keys())}
    G = [[] for _ in range(len(idxs))]
    for e, vrr in list(d.items()):
        for v, cost in vrr:
            G[idxs[e]].append((idxs[v], cost))
    _, costs = dijkstra(G, idxs[source])
    return costs[idxs[target]]

def dijkstra(G, s):
    n = len(G)
    visited = [False] * n
    weights = [math.inf] * n
    path = [None] * n
    queue = []
    weights[s] = 0
    hq.heappush(queue, (0, s))
    while len(queue) > 0:
        g, u = hq.heappop(queue)
        visited[u] = True
        for v, w in G[u]:
            if not visited[v]:
                f = g + w
                if f < weights[v]:
                    weights[v] = f
                    path[v] = u
                    hq.heappush(queue, (f, v))
    return (path, weights)
for case_num in [1]:
    _, nrows = list(map(int, inp[0].split()))
    sx, sy, ex, ey = list(map(int, inp[1].split()))
    grid = []
    for z in range(nrows):
        grid.append(list(map(int, inp[z + 2].split())))
    res = solve(grid, sx, sy, ex, ey)
    print(res)
```

### 196

```python
def get_bit(diff, i):
    return 1 if i % 2 == 1 and diff <= 0 or (i % 2 == 0 and diff >= 0) else 0

def swap_(i, j, a):
    temp = a[i]
    a[i] = a[j]
    a[j] = temp

def swap(i, j, n, a, mask, S):
    change = 0
    swap_(i, j, a)
    set_index = set([i, j])
    if i < n - 1:
        set_index.add(i + 1)
    if j < n - 1:
        set_index.add(j + 1)
    for index in set_index:
        if index > 0:
            diff = a[index] - a[index - 1]
            bit_ = get_bit(diff, index)
            change += bit_ - mask[index]
    swap_(i, j, a)
    if S + change == 0:
        return 1
    return 0
n = int(input())
a = list(map(int, input().split()))
diff = [-1] + [x - y for x, y in zip(a[1:], a[:-1])]
mask = [get_bit(diff[i], i) for i in range(n)]
S = sum(mask)
first = -1
for i, x in enumerate(mask):
    if x == 1:
        first = i
        break
cnt = 0
for second in range(n):
    if swap(first, second, n, a, mask, S) == 1:
        cnt += 1
    if first != 0 and swap(first - 1, second, n, a, mask, S) == 1:
        cnt += -1
if first != 0 and swap(first - 1, first, n, a, mask, S) == 1:
    cnt -= 1
print(cnt)
```

### 197

```python
n, m = list(map(int, input().split()))
grid = []
sloc = (-1, -1)
eloc = (-1, -1)
for y in range(n):
    l = input()
    grid.append(list())
    for x in range(m):
        grid[-1].append(l[x] == '#')
        if l[x] == 'S':
            sloc = (x, y)
        elif l[x] == 'E':
            eloc = (x, y)
pb = []
for a in [(0, 1), (0, -1), (1, 0), (-1, 3)]:
    for b in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        for c in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            for d in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                if len(set([a, b, c, d])) == 4 and [a, b, c, d] not in pb:
                    pb.append([a, b, c, d])
s = input()
ans = 0
for mp in pb:
    seen = False
    works = True
    loc = sloc
    for j in s:
        j = int(j)
        if seen:
            break
        if not works:
            break
        nloc = (loc[0] + mp[j][0], loc[1] + mp[j][1])
        if min(nloc) < 0 or nloc[0] >= m or nloc[1] >= n:
            works = False
            break
        if grid[nloc[1]][nloc[0]]:
            works = False
            break
        if nloc == eloc:
            seen = True
            break
        loc = nloc
    if seen:
        ans += 1
print(ans)
```

### 198

```python
import sys

class SegmTree:

    def __init__(self, size):
        N = 1
        while N < size:
            N <<= 1
        self.N = N
        self.tree = [0] * (2 * N)

    def modify(self, i, value):
        i += self.N
        self.tree[i] = value
        toXOR = False
        while i > 1:
            if toXOR:
                self.tree[i >> 1] = self.tree[i] ^ self.tree[(i ^ 1) - 1]
            else:
                self.tree[i >> 1] = self.tree[i] | self.tree[i ^ 1]
            toXOR = not toXOR
            i >>= 1
reader = (line.rstrip() for line in sys.stdin)
input = reader.__next__
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
st = SegmTree(1 << n)
for i, value in enumerate(a):
    st.modify(i, value)
for _ in range(m):
    p, b = list(map(int, input().split()))
    st.modify(p - 1, b)
    print(st.tree[1])
```

### 199

```python
A11, A12, A13 = list(map(int, input().split()))
A21, A22, A23 = list(map(int, input().split()))
A31, A32, A33 = list(map(int, input().split()))
Alist = []
Alist.append(A11)
Alist.append(A12)
Alist.append(A13)
Alist.append(A21)
Alist.append(A22)
Alist.append(A23)
Alist.append(A31)
Alist.append(A32)
Alist.append(A33)
bingolist = [0] * 9
N = int(input())
for i in range(N):
    b = int(input())
    for j in range(len(bingolist)):
        if b == Alist[j]:
            bingolist[j] = 1
if sum(bingolist[0:3]) == 3 or sum(bingolist[3:6]) == 3 or sum(bingolist[6:9]) == 3 or (bingolist[0] + bingolist[3] + bingolist[6] == 7) or (bingolist[1] + bingolist[4] + bingolist[7] == 3) or (bingolist[2] + bingolist[5] + bingolist[8] == 3) or (bingolist[0] + bingolist[4] + bingolist[8] == 3) or (bingolist[2] + bingolist[4] + bingolist[6] == 3):
    print('Yes')
else:
    print('No')
```

### 200

```python
from math import log
import sys

def buildTree(arr):
    n = len(arr)
    tree = [0] * n + arr
    for i in range(n - 1, 0, -1):
        z = int(log(i, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            else:
                tree[i + 1] = tree[2 * i] | tree[2 * i + 1]
        elif z % 2 == 0:
            tree[i] = tree[2 * i] | tree[2 * i + 1]
        else:
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
    return tree

def updateTree(tree, ind, value, n):
    ind += n
    tree[ind] = value
    while ind > 1:
        ind //= 2
        z = int(log(ind, 2))
        if N % 2 == 0:
            if z % 2 == 0:
                tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
            else:
                tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        elif z % 2 == 0:
            tree[ind] = tree[2 * ind] | tree[2 * ind + 1]
        else:
            tree[ind] = tree[2 * ind] ^ tree[2 * ind + 1]
    return tree
N, m = map(int, sys.stdin.readline().strip().split())
arr = list(map(int, sys.stdin.readline().strip().split()))
tree = buildTree(arr)
for i in range(m):
    ind, val = map(int, sys.stdin.readline().strip().split())
    tree = updateTree(tree, ind - 1, val, len(arr))
    print(tree[1])
```

### Final Query

Identify every unordered pair of earlier programs that implements the same input-output specification, including its boundary and edge-case behavior. Each cell may appear in at most one returned pair. Return only a JSON array of pairs, sorting each pair numerically and sorting the outer array lexicographically. Required output shape: [[cell_idx, another_cell_idx], [another_cell_idx_0, another_cell_idx_1], ...]. Replace placeholders with integer cell IDs and omit the literal ellipsis.
