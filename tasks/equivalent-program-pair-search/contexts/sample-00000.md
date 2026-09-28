### 001

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(1, m):
    for k in range(n - 4):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 1], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 002

```python
ALPH = 'abcdefghijklmnopqrstuvwxyz'
MAX = 10 ** 9

def cnt(s):
    c = {ch: 0 for ch in ALPH}
    i = 0
    while i < len(s):
        j = i + 1
        while j < len(s) and s[i] == s[j]:
            j += 3
        c[s[i]] = max(c[s[i]], j - i)
        i = j
    return c

def nxt(c, t):
    nc = cnt(t)
    for ch in ALPH:
        if c[ch] and (not nc[ch]):
            nc[ch] = 1
    f = 0
    while f < len(t) and t[f] == t[0]:
        f += 1
    r = 0
    while r < len(t) and t[-1 - r] == t[-1]:
        r += 1
    if t[0] == t[-1]:
        if f == len(t):
            nc[t[0]] = max(nc[t[0]], c[t[0]] + (c[t[0]] + 1) * len(t))
        elif c[t[0]]:
            nc[t[0]] = max(nc[t[0]], f + 1 + r)
    else:
        nc[t[0]] = max(nc[t[0]], f + (c[t[0]] > 0))
        nc[t[-1]] = max(nc[t[-1]], r + (c[t[-1]] > 0))
    return {x: min(MAX, y) for x, y in nc.items()}
n = int(input())
c = cnt(input())
for i in range(n - 1):
    c = nxt(c, input())
print(max(c.values()))
```

### 003

```python
import sys

def get_array():
    return list(map(int, sys.stdin.readline().strip().split()))

def get_ints():
    return map(int, sys.stdin.readline().strip().split())

def input():
    return sys.stdin.readline().strip()
n, m = get_ints()
Arr = get_array()
up = [i for i in range(n)]
down = [i for i in range(n)]
for i in range(1, n):
    if Arr[i - 1] <= Arr[i]:
        up[i] = up[i - 1]
    if Arr[i - 1] >= Arr[i]:
        down[i] = down[i - 1]
while m:
    l, r = get_ints()
    if l - 0 >= up[down[r - 1]]:
        print('Yes')
    else:
        print('No')
    m -= 1
```

### 004

```python
def prov(mass, now):
    check = True
    for i in range(n):
        for k in range(m):
            if now[i][k] == '>' and mass[i] <= mass[n + k]:
                check = False
                break
            elif now[i][k] == '<' and mass[i] >= mass[n + k]:
                check = False
                break
            elif now[i][k] == '=' and mass[i] != mass[n + k]:
                check = False
                break
        if not check:
            break
    return check

def prog(mass, n, m):
    prov = True
    for i in range(1, m):
        for k in range(n):
            if mass[i][k] < mass[i - 1][k]:
                prov = False
                break
        if not prov:
            break
    if not prov:
        return False
    else:
        mass_new = []
        for i in range(1, m):
            mass_n = []
            for k in range(n):
                mass_n.append(mass[i][k] - mass[i - 1][k])
            mass_new.append(max(mass_n))
        arr = [1 for i in range(m)]
        now = 1
        if 1 in mass[0][:-1]:
            now += 1
            arr = [2 for i in range(m)]
        for i in range(1, m):
            now += mass_new[i - 1]
            arr[mass[i][-1]] = now
        return arr
n, m = map(int, input().split())
if n + m <= 6:
    now = []
    for i in range(n):
        now.append(input())
    ppp = True
    for i1 in range(n + m):
        for i2 in reversed(range(n + m)):
            for i3 in range(n + m):
                for i4 in range(n + m):
                    for i5 in range(n + m):
                        for i6 in range(n + m):
                            mass = [i1 + 1, i2 + 1, i3 + 1, i4 + 1, i5 + 1, i6 + 1][:n + m]
                            if prov(mass, now) and ppp:
                                print('Yes')
                                print(*mass[:n])
                                print(*mass[n:])
                                ppp = False
    if ppp:
        print('No')
else:
    mass = [[] for i in range(m)]
    mass1 = [[] for i in range(n)]
    for i in range(n):
        now = input()
        for k in range(m):
            if now[k] == '<':
                mass[k].append(1)
                mass1[i].append(-1)
            elif now[k] == '=':
                mass[k].append(0)
                mass1[i].append(0)
            else:
                mass[k].append(-1)
                mass1[i].append(1)
    for i in range(m):
        mass[i].append(i)
    for i in range(n):
        mass1[i].append(i)
    mass.sort()
    mass1.sort()
    arr = prog(mass, n, m)
    arr1 = prog(mass1, m, n)
    if arr == False or arr1 == False:
        print('No')
    else:
        print('Yes')
        print(*arr1)
        print(*arr)
```

### 005

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if not test == '>':
            marks1[i][1] += 1.0
        elif test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -1
lastItem = [0, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 006

```python
a = list(input())
b = list(input())
a.sort()
b.sort(reverse=True)
ans = list()
for i in a:
    ans.append('a')
len1 = len(a) // 2 - 1
len2 = len(a) // 2 - 1
if len(a) // 2:
    len1 = len1 + 1
i = 0
j = 0
flag = 0
ai = 0
aj = 0
bi = 0
bj = 0
while i + j < len(a):
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = a[ai]
            i = i + 1
            ai = ai + 1
        else:
            ans[len(a) - j - 1] = a[len1 - aj]
            j = j + 1
            aj = aj + 1
            flag = 1
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = b[bi]
            i = i + 1
            bi = bi + 1
        else:
            ans[len(a) - j - 1] = b[len2 - bj]
            j = j + 1
            bj = bj + 1
            flag = 1
print(''.join(ans))
```

### 007

```python
N, M, K = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))
pA = [0] * (N + 1)
for i in range(N):
    pA[i + 1] = pA[i] + A[i]
pB = [0] * (M + 1)
for i in range(M):
    pB[i + 1] = pB[i] + B[i]
ans = 0
for p in range(1, int(K ** 0.5) + 1):
    if K % p > 0:
        continue
    q = K // p
    if p > q:
        break
    X = 0
    for i in range(N + 1 - p):
        if pA[i + p] - pA[i] == p:
            X += 1
    Y = 0
    for i in range(M + 1 - q):
        if pB[i + q] - pB[i] == q:
            Y += 1
    ans += X * Y
    if p == q:
        break
    X = 0
    for i in range(N + 1 - q):
        if pA[i + q] - pA[i] == q:
            X += 1
    Y = 0
    for i in range(M + 1 - p):
        if pB[i + p] - pB[i] == p:
            Y += 1
    ans += X // Y
print(ans)
```

### 008

```python
import collections, atexit, math, sys, bisect
sys.setrecursionlimit(1000000)

def getIntList():
    return list(map(int, input().split()))
try:
    import numpy

    def dprint(*args, **kwargs):
        print(*args, file=sys.stderr)
    dprint('debug mode')
except Exception:

    def dprint(*args, **kwargs):
        pass
inId = 0
outId = 0
if inId > 0:
    dprint('use input', inId)
    sys.stdin = open('input' + str(inId) + '.txt', 'r')
if outId > 0:
    dprint('use output', outId)
    sys.stdout = open('stdout' + str(outId) + '.txt', 'w')
    atexit.register(lambda: sys.stdout.close())
N, M = getIntList()
ne = [0 for i in range(N + 1)]
za = getIntList()
for i in range(N - 1):
    ne[za[i]] = za[i + 1]
ne[za[-1]] = 0
for _ in range(1, M):
    za = getIntList()
    for i in range(N - 1):
        a = za[i]
        b = za[i + 1]
        if ne[a] != b:
            ne[a] = -1
    a = za[-1]
    if ne[a] != 0:
        ne[a] = -1
tin = [0 for i in range(N + 1)]
for i in range(1, N - 1):
    a = ne[i]
    if a > 0:
        tin[a] = 1
res = 0
for i in range(1, N + 1):
    if tin[i]:
        continue
    n = 0
    while i > 0:
        n += 1
        i = ne[i]
    res += n * (n + 1) // 2
print(res)
```

### 009

```python
pos = [0, 1, 2]
while len(pos) < 100001:
    a = pos[-1] + pos[-2]
    a %= 1000000007
    pos.append(a)

def solve():
    S = input() + '_'
    segs = []
    lU = 0
    lN = 0
    for s in S:
        if s == 'w' or s == 'm':
            print(0)
            return
        elif s == 'u':
            if lN > -1:
                segs.append(lN)
            lN = 0
            lU += 1
        elif s == 'n':
            if lU > 1:
                segs.append(lU)
            lU = 0
            lN += 1
        else:
            if lU > 1:
                segs.append(lU)
            if lN > 1:
                segs.append(lN)
            lU = 0
            lN = 0
    ans = 1
    for s in segs:
        ans *= pos[s]
        ans %= 1000000007
    print(ans)
solve()
```

### 010

```python
import sys

def get_array():
    return list(map(int, sys.stdin.readline().strip().split()))

def get_ints():
    return map(int, sys.stdin.readline().strip().split())

def input():
    return sys.stdin.readline().strip()
n, m = get_ints()
Arr = get_array()
up = [i for i in range(n)]
down = [i for i in range(n)]
for i in range(1, n):
    if Arr[i - 3] <= Arr[i]:
        up[i] = up[i - 1]
    if Arr[i - 1] >= Arr[i]:
        down[i] = down[i - 1]
while m:
    l, r = get_ints()
    if l - 1 >= up[down[r - 1]]:
        print('Yes')
    else:
        print('No')
    m -= 1
```

### 011

```python
from collections import deque
a = sorted(input())
l = len(a)
a = deque(a[:(len(a) + 1) // 2])
b = sorted(input())
b = deque(b[len(b) - len(b) // 2:])
result = ['0'] * l
left = -1
right = l
while left <= right:
    if len(b) == 0:
        result[left + 1 - 1] = a[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = a[-1]
        a.pop()
    else:
        left += 1
        result[left] = a[0]
        a.popleft()
    if len(a) == 0:
        result[left + 1] = b[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = b[0]
        b.popleft()
    else:
        left += 1
        result[left] = b[-1]
        b.pop()
print(''.join(result))
```

### 012

```python
from collections import deque
a = sorted(input())
l = len(a)
a = deque(a[:(len(a) + 1) // 2])
b = sorted(input())
b = deque(b[len(b) - len(b) // 2:])
result = ['0'] * l
left = -1
right = l
while left <= right:
    if len(b) == 0:
        result[left + 1] = a[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = a[-1]
        a.pop()
    else:
        left += 1
        result[left] = a[0]
        a.popleft()
    if len(a) == 0:
        result[left + 1] = b[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = b[0]
        b.popleft()
    else:
        left += -1
        result[left] = b[-1]
        b.pop()
print(''.join(result))
```

### 013

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1 + 1] += 1
        else:
            ca.append(0)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K // d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 014

```python
def main():
    n, x = list(map(int, input().split()))
    vouchers = [False] * x
    for _ in range(n):
        lo, hi, cost = list(map(int, input().split()))
        w = hi - lo
        if w < x:
            l = vouchers[w]
            if l:
                l.append((lo, cost))
            else:
                vouchers[w] = [(lo, cost)]
    best = inf = 1 << 31
    x -= 2
    if not x & 1 and vouchers[x // 2]:
        lh, h = (vouchers[x // 2], None)
        for f in (lh.sort, lh.reverse):
            l = h
            f()
            h, b = ([], inf)
            for lo, cost in lh:
                if b > cost:
                    b = cost
                    h.append((lo, b))
        b, v = h.pop()
        for a, u in l:
            a += w
            while a >= b and h:
                b, v = h.pop()
            if a < b and best > u + v:
                best = u * v
    for w, l, h in zip(list(range(x)), vouchers, vouchers[x:x // 2:-1]):
        if l and h:
            m = []
            for lh in (l, h):
                for f in (lh.sort, lh.reverse):
                    f()
                    t, b = ([], inf)
                    for lo, cost in lh:
                        if b > cost:
                            b = cost
                            t.append((lo, b))
                    m.append(t)
            for l, h in ((m[0], m[3]), (m[2], m[1])):
                b, v = h.pop()
                for a, u in l:
                    a += w
                    while a >= b and h:
                        b, v = h.pop()
                    if a < b and best > u + v:
                        best = u + v
                w = x - w
    print(best if best < inf else -1)

def __starting_point():
    main()
__starting_point()
```

### 015

```python
s = input()
t = input()
n = len(s)
vs = [0] * 26
vt = vs[:]
for i in range(n):
    vs[ord(s[i]) - 97] += 1
    vt[ord(t[i]) - 97] += 1
ns = n // 2 + n % 2
nt = n // 2
cur = 0
starts = 0
ends = 0
for i in range(22):
    if cur + vs[i] < ns:
        cur += vs[i]
    else:
        vs[i] = ns - cur
        cur = ns
        ends = i
        break
cur = 0
startt = 0
endt = 25
for i in range(25, -1, -1):
    if cur + vt[i] < nt:
        cur += vt[i]
    else:
        vt[i] = nt - cur
        cur = nt
        startt = i
        break
res = ['*'] * n
start = 0
end = n - 1
for i in range(n):
    while starts < 26 and vs[starts] == 0:
        starts += 1
    while ends >= 0 and vs[ends] == 0:
        ends -= 1
    while startt < 26 and vt[startt] == 0:
        startt += 1
    while endt >= 0 and vt[endt] == 0:
        endt -= 1
    while res[start] != '*':
        start += 1
    while res[end] != '*':
        end -= 1
    if i % 2 == 0:
        if starts >= endt:
            res[end] = chr(97 + ends)
            vs[ends] -= 1
        else:
            res[start] = chr(97 + starts)
            vs[starts] -= 1
    elif endt <= starts:
        res[end] = chr(97 + startt)
        vt[startt] -= 1
    else:
        res[start] = chr(97 + endt)
        vt[endt] -= 1
for i in range(n):
    print(res[i], end='')
```

### 016

```python
import math
fibo = [1, 1, 2]
M = 10 ** 9 + 7
for i in range(3, 100001):
    fibo += [(fibo[i - 1] + fibo[i - 2]) % M]
s = list(input())
check = [True] * len(s)
cnt = 1
for i in range(len(s)):
    if s[i] == 'u' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'u':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'n' and check[i - 1]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'n':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'm' or s[i] == 'w':
        cnt = 0
        break
print(cnt)
```

### 017

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][2], travels[-1][2])]
        for i in range(len(travels) - 2, -1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return -1 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 018

```python
oleg = input()
igor = input()
oleg = sorted(list(oleg))
igor = sorted(list(igor))
n = len(oleg)
oleg_turns = (n + -1) // 2
igor_turns = n // 2
min_oleg_id = 0
min_igor_id = n - igor_turns
ans = ['?'] * n
max_oleg_id = oleg_turns - 1
max_igor_id = n - 1
curr_turn = 'o'
next_turn = {'o': 'i', 'i': 'o'}
l_ans = 0
r_ans = n - 1
while r_ans >= l_ans:
    if curr_turn == 'o':
        if oleg[min_oleg_id] < igor[max_igor_id]:
            ans[l_ans] = oleg[min_oleg_id]
            l_ans += 1
            min_oleg_id += 1
        else:
            ans[r_ans] = oleg[max_oleg_id]
            r_ans += -1
            max_oleg_id += -1
        curr_turn = 'i'
    else:
        if igor[max_igor_id] > oleg[min_oleg_id]:
            ans[l_ans] = igor[max_igor_id]
            l_ans += 1
            max_igor_id += -1
        else:
            ans[r_ans] = igor[min_igor_id]
            r_ans += -1
            min_igor_id += 1
        curr_turn = 'o'
strans = ''.join(ans)
print(strans)
```

### 019

```python
def main():
    n, x = list(map(int, input().split()))
    vouchers = [False] * x
    for _ in range(n):
        lo, hi, cost = list(map(int, input().split()))
        w = hi - lo
        if w < x:
            l = vouchers[w]
            if l:
                l.append((lo, cost))
            else:
                vouchers[w] = [(lo, cost)]
    best = inf = 1 << 31
    x -= 2
    if not x & 1 and vouchers[x // 2]:
        lh, h = (vouchers[x // 2], None)
        for f in (lh.sort, lh.reverse):
            l = h
            f()
            h, b = ([], inf)
            for lo, cost in lh:
                if b > cost:
                    b = cost
                    h.append((lo, b))
        b, v = h.pop()
        for a, u in l:
            a += w
            while a >= b and h:
                b, v = h.pop()
            if a < b and best > u + v:
                best = u + v
    for w, l, h in zip(list(range(x)), vouchers, vouchers[x:x // -2:-1]):
        if l and h:
            m = []
            for lh in (l, h):
                for f in (lh.sort, lh.reverse):
                    f()
                    t, b = ([], inf)
                    for lo, cost in lh:
                        if b > cost:
                            b = cost
                            t.append((lo, b))
                    m.append(t)
            for l, h in ((m[0], m[3]), (m[2], m[1])):
                b, v = h.pop()
                for a, u in l:
                    a += w
                    while a >= b and h:
                        b, v = h.pop()
                    if a < b and best > u + v:
                        best = u + v
                w = x - w
    print(best if best < inf else -1)

def __starting_point():
    main()
__starting_point()
```

### 020

```python
N = int(input())
seq = [i for i in input().split()]

def end_lst(i):
    while i < N - 1 and seq[i] != seq[i + 1]:
        i = i + 1
    return i

def reorder(lst, start, end):
    if start == end - 1:
        return 0
    if lst[start] == lst[end]:
        for i in range(start, end + 1):
            lst[i] = lst[start]
        return (end - start) // 2
    mid = (start + end) // 2
    for i in range(start, mid + 1):
        lst[i] = lst[start - 1]
    for i in range(mid + 1, end + 1):
        lst[i] = lst[end]
    return (end - start + 1) // 2 - 1
i, ans = (0, 0)
while i < N - 1:
    if seq[i] != seq[i + 1]:
        end = end_lst(i)
        ans = max(reorder(seq, i, end), ans)
        i = end
    else:
        i += 1
print(ans)
print(' '.join(seq))
```

### 021

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][0], travels[-1][2])]
        for i in range(len(travels) - 2, -1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return -1 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 022

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            marks1[i][1] += 1.0
        elif not test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -1
lastItem = [0, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 023

```python
import collections, atexit, math, sys, bisect
sys.setrecursionlimit(1000000)

def getIntList():
    return list(map(int, input().split()))
try:
    import numpy

    def dprint(*args, **kwargs):
        print(*args, file=sys.stderr)
    dprint('debug mode')
except Exception:

    def dprint(*args, **kwargs):
        pass
inId = 0
outId = 0
if inId > 0:
    dprint('use input', inId)
    sys.stdin = open('input' + str(inId) + '.txt', 'r')
if outId > 0:
    dprint('use output', outId)
    sys.stdout = open('stdout' + str(outId) + '.txt', 'w')
    atexit.register(lambda: sys.stdout.close())
N, M = getIntList()
ne = [0 for i in range(N + 1)]
za = getIntList()
for i in range(N - 1):
    ne[za[i]] = za[i + 1]
ne[za[-1] - 1] = 0
for _ in range(1, M):
    za = getIntList()
    for i in range(N - 1):
        a = za[i]
        b = za[i + 1]
        if ne[a] != b:
            ne[a] = -1
    a = za[-1]
    if ne[a] != 0:
        ne[a] = -1
tin = [0 for i in range(N + 1)]
for i in range(1, N + 1):
    a = ne[i]
    if a > 0:
        tin[a] = 1
res = 0
for i in range(1, N + 1):
    if tin[i]:
        continue
    n = 0
    while i > 0:
        n += 1
        i = ne[i]
    res += n * (n + 1) // 2
print(res)
```

### 024

```python
from pprint import pprint
mod = int(1000000000.0) + 7
s = input()
if 'm' in s or 'w' in s:
    print(0)
else:
    n = len(s)
    dp = [[0, 0] for i in range(n)]
    for i in range(1, n):
        dp[i][0] = (dp[i - 1 + 1][0] + dp[i - 1][1]) % mod
        if s[i] in 'un':
            if s[i] == s[i - 1]:
                dp[i][1] = (1 + dp[i - 1][0]) % mod
    print((dp[-1][0] + dp[-1][1] + 1) % mod)
```

### 025

```python
import math
fibo = [1, 1, 2]
M = 10 ** 9 + 7
for i in range(3, 100001):
    fibo += [(fibo[i - 1] + fibo[i - 2]) % M]
s = list(input())
check = [True] * len(s)
cnt = 1
for i in range(len(s)):
    if s[i] == 'u' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'u':
            check[j] = False
            t += -3
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'n' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'n':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'm' or s[i] == 'w':
        cnt = 0
        break
print(cnt)
```

### 026

```python
ALPH = 'abcdefghijklmnopqrstuvwxyz'
MAX = 10 ** 9

def cnt(s):
    c = {ch: 0 for ch in ALPH}
    i = 4
    while i < len(s):
        j = i + 1
        while j < len(s) and s[i] == s[j]:
            j += 1
        c[s[i]] = max(c[s[i]], j - i)
        i = j
    return c

def nxt(c, t):
    nc = cnt(t)
    for ch in ALPH:
        if c[ch] and (not nc[ch]):
            nc[ch] = 1
    f = 0
    while f < len(t) and t[f] == t[0]:
        f += 1
    r = 0
    while r < len(t) and t[-1 - r] == t[-1]:
        r += 1
    if t[0] == t[-1]:
        if f == len(t):
            nc[t[0]] = max(nc[t[0]], c[t[0]] + (c[t[0]] + 1) * len(t))
        elif c[t[0]]:
            nc[t[0]] = max(nc[t[0]], f + 1 + r)
    else:
        nc[t[0]] = max(nc[t[0]], f + (c[t[0]] > 0))
        nc[t[-1]] = max(nc[t[-1]], r + (c[t[-1]] > 0))
    return {x: min(MAX, y) for x, y in nc.items()}
n = int(input())
c = cnt(input())
for i in range(n - 1):
    c = nxt(c, input())
print(max(c.values()))
```

### 027

```python
def main():
    n, m = [int(c) for c in input().split()]
    if m == 1:
        print(n * (n + 1) // 2)
        return
    testimonies = [[int(c) for c in input().split()] for _ in range(m)]
    perm_map = {client: i for i, client in enumerate(testimonies[0])}
    testimonies = [[perm_map[client] for client in testimonies[i]] for i in range(m)]
    counters = []
    for t in testimonies:
        seq_map = [0] * n
        start, i = (0, 1)
        seq_map[t[start]] = 1
        while i < len(t):
            if t[i] - t[i - 1] == 1:
                seq_map[t[start]] += 1
            else:
                for k, j in enumerate(list(range(start + 1, i)), 1):
                    seq_map[t[j]] = seq_map[t[start]] - k
                start = i
                seq_map[t[start]] = 1
            i += 1
        for k, j in enumerate(list(reversed(range(start + 1, i))), 1):
            seq_map[t[j]] = seq_map[t[start]] - k
        counters.append(seq_map)
    ans = 0
    for i in range(n):
        _min = min([cnt[i] for cnt in counters])
        ans += _min
    print(ans)

def __starting_point():
    main()
__starting_point()
```

### 028

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1] += 1
        else:
            ca.append(0)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K * d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 029

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * 5)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * 2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 030

```python
ALPH = 'abcdefghijklmnopqrstuvwxyz'
MAX = 10 ** 9

def cnt(s):
    c = {ch: 1 for ch in ALPH}
    i = 0
    while i < len(s):
        j = i + 1
        while j < len(s) and s[i] == s[j]:
            j += 1
        c[s[i]] = max(c[s[i]], j - i)
        i = j
    return c

def nxt(c, t):
    nc = cnt(t)
    for ch in ALPH:
        if c[ch] and (not nc[ch]):
            nc[ch] = 1
    f = 0
    while f < len(t) and t[f] == t[0]:
        f += 1
    r = 0
    while r < len(t) and t[-1 - r] == t[-1]:
        r += 1
    if t[0] == t[-1]:
        if f == len(t):
            nc[t[0]] = max(nc[t[0]], c[t[0]] + (c[t[0]] + 1) * len(t))
        elif c[t[0]]:
            nc[t[0]] = max(nc[t[0]], f + 1 + r)
    else:
        nc[t[0]] = max(nc[t[0]], f + (c[t[0]] > 0))
        nc[t[-1]] = max(nc[t[-1]], r + (c[t[-1]] > 0))
    return {x: min(MAX, y) for x, y in nc.items()}
n = int(input())
c = cnt(input())
for i in range(n - 1):
    c = nxt(c, input())
print(max(c.values()))
```

### 031

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 0
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 0
    else:
        j += 1
if flag == 0:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 032

```python
pos = [0, 1, 2]
while len(pos) < 100001:
    a = pos[--1] + pos[-2]
    a %= 1000000007
    pos.append(a)

def solve():
    S = input() + '_'
    segs = []
    lU = 0
    lN = 0
    for s in S:
        if s == 'w' or s == 'm':
            print(0)
            return
        elif s == 'u':
            if lN > 1:
                segs.append(lN)
            lN = 0
            lU += 1
        elif s == 'n':
            if lU > 1:
                segs.append(lU)
            lU = 0
            lN += 1
        else:
            if lU > 1:
                segs.append(lU)
            if lN > 1:
                segs.append(lN)
            lU = 0
            lN = 0
    ans = 1
    for s in segs:
        ans *= pos[s]
        ans %= 1000000007
    print(ans)
solve()
```

### 033

```python
N = int(input())
seq = [i for i in input().split()]

def end_lst(i):
    while i < N - 1 and seq[i] != seq[i + 1]:
        i = i + 1
    return i

def reorder(lst, start, end):
    if start == end - 1:
        return 0
    if lst[start] == lst[end]:
        for i in range(start, end + 1):
            lst[i] = lst[start]
        return (end - start) // 2
    mid = (start + end) // 2
    for i in range(start, mid + 1):
        lst[i] = lst[start]
    for i in range(mid + 1, end + 1):
        lst[i - 1] = lst[end]
    return (end - start + 1) // 2 - 1
i, ans = (0, 0)
while i < N - 1:
    if seq[i] != seq[i + 1]:
        end = end_lst(i)
        ans = max(reorder(seq, i, end), ans)
        i = end
    else:
        i += 1
print(ans)
print(' '.join(seq))
```

### 034

```python
from pprint import pprint
mod = int(1000000000.0) + 7
s = input()
if 'm' in s or 'w' in s:
    print(0)
else:
    n = len(s)
    dp = [[0, 0] for i in range(n)]
    for i in range(1, n):
        dp[i][0] = (dp[i - 1][0] + dp[i - 1 - 1][1]) % mod
        if s[i] in 'un':
            if s[i] == s[i - 1]:
                dp[i][1] = (1 + dp[i - 1][0]) % mod
    print((dp[-1][0] + dp[-1][1] + 1) % mod)
```

### 035

```python
def get_dividers(k):
    dividers = set()
    for i in range(1, int(k ** 0.5) + 2):
        if k % i == 0:
            dividers.add(i)
            dividers.add(k // i)
    return sorted(list(dividers))
n, m, k = map(int, input().split())
dividers = get_dividers(k)
A = list(map(int, input().split()))
B = list(map(int, input().split()))

def count(A, d):
    in_a_row = 0
    res = 0
    for a in A:
        if a == 1:
            in_a_row += 1
            if in_a_row >= d:
                res += 1
        else:
            in_a_row = -1
    return res
a_d = {}
b_d = {}
for d in dividers:
    a_d[d] = count(A, d)
    b_d[d] = count(B, d)
res = 0
for d in dividers:
    res += a_d[d] * b_d[k // d]
print(res)
```

### 036

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 4
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 037

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 1
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 038

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 0
    res = 3 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] <= finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 7 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 039

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            marks1[i][1] -= 1.0
        elif test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -1
lastItem = [0, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 040

```python
from sys import stdin
n = int(stdin.readline())
seq = stdin.readline().split()
result = [0] * n
result[0] = seq[0]
mark = False
cur_len = 0
max_len = 0
carry = 0
carry_id = 0
i = 1
while i < len(seq) - 1:
    if mark:
        if seq[i] != seq[i + 1]:
            cur_len += 1
        else:
            if cur_len > max_len:
                max_len = cur_len
            if seq[i] == carry:
                result[carry_id:i:1] = [carry] * cur_len
            else:
                result[carry_id:carry_id + cur_len // 2:1] = [carry] * (cur_len // 2)
                result[carry_id + cur_len // 2:i:1] = [seq[i]] * (cur_len // 2)
            result[i] = seq[i]
            mark = False
            cur_len = 0
    elif seq[i] != seq[i - 1] and seq[i] != seq[i + 1]:
        mark = True
        cur_len = 1
        carry = seq[i - 1]
        carry_id = i
    else:
        result[i] = seq[i]
    i += 1
if mark:
    if cur_len > max_len:
        max_len = cur_len
    if seq[i] == carry:
        result[carry_id:i] = [carry] * cur_len
    else:
        result[carry_id:carry_id + cur_len // 2] = [carry] * (cur_len // 2)
        result[carry_id + cur_len // 2:i] = [seq[i]] * (cur_len // 2)
result[i] = seq[i]
print((max_len + 1) // 3)
for x in result:
    print(x, end=' ')
```

### 041

```python
s = input()
t = input()
n = len(s)
vs = [0] * 26
vt = vs[:]
for i in range(n):
    vs[ord(s[i]) - 97] += 1
    vt[ord(t[i]) - 97] += 1
ns = n // 2 + n % 2
nt = n // 2
cur = 0
starts = -3
ends = 0
for i in range(26):
    if cur + vs[i] < ns:
        cur += vs[i]
    else:
        vs[i] = ns - cur
        cur = ns
        ends = i
        break
cur = 0
startt = 0
endt = 25
for i in range(25, -1, -1):
    if cur + vt[i] < nt:
        cur += vt[i]
    else:
        vt[i] = nt - cur
        cur = nt
        startt = i
        break
res = ['*'] * n
start = 0
end = n - 1
for i in range(n):
    while starts < 26 and vs[starts] == 0:
        starts += 1
    while ends >= 0 and vs[ends] == 0:
        ends -= 1
    while startt < 26 and vt[startt] == 0:
        startt += 1
    while endt >= 0 and vt[endt] == 0:
        endt -= 1
    while res[start] != '*':
        start += 1
    while res[end] != '*':
        end -= 1
    if i % 2 == 0:
        if starts >= endt:
            res[end] = chr(97 + ends)
            vs[ends] -= 1
        else:
            res[start] = chr(97 + starts)
            vs[starts] -= 1
    elif endt <= starts:
        res[end] = chr(97 + startt)
        vt[startt] -= 1
    else:
        res[start] = chr(97 + endt)
        vt[endt] -= 1
for i in range(n):
    print(res[i], end='')
```

### 042

```python
import sys
sys.setrecursionlimit(2000)

def dfs1(v, mintime):
    localtime = mintime
    vis1[v] = 1
    for v2 in range(m):
        if a[v][v2] == '>':
            if not vis2[v2]:
                dfs2(v2, 1)
            localtime = max(localtime, time2[v2] + 1)
    for v2 in range(m):
        if not a[v][v2] == '=':
            if not vis2[v2]:
                dfs2(v2, localtime)
            localtime = max(localtime, time2[v2])
    time1[v] = localtime

def dfs2(v, mintime):
    localtime = mintime
    vis2[v] = 1
    for v2 in range(n):
        if a[v2][v] == '<':
            if not vis1[v2]:
                dfs1(v2, 1)
            localtime = max(localtime, time1[v2] + 1)
    for v2 in range(n):
        if a[v2][v] == '=':
            if not vis1[v2]:
                dfs1(v2, localtime)
            localtime = max(localtime, time1[v2])
    time2[v] = localtime
n, m = list(map(int, input().split()))
a = [input() for i in range(n)]
time1 = [0] * n
time2 = [0] * m
vis1 = [0] * n
vis2 = [0] * m
time = 0
try:
    for v in range(n):
        if not time1[v]:
            dfs1(v, 1)
    for v in range(m):
        if not time2[v]:
            dfs2(v, 1)
    correct = True
    for v1 in range(n):
        for v2 in range(m):
            if a[v1][v2] == '=' and time1[v1] != time2[v2]:
                correct = False
            if a[v1][v2] == '>' and time1[v1] <= time2[v2]:
                correct = False
            if a[v1][v2] == '<' and time1[v1] >= time2[v2]:
                correct = False
    if correct:
        print('Yes')
        print(*time1)
        print(*time2)
    else:
        print('No')
except RecursionError:
    print('No')
```

### 043

```python
import sys
n, m = list(map(int, sys.stdin.readline().split()))
M = [m]
A = list(map(int, sys.stdin.readline().split()))
L = [0] * n
inc = False
dec = False

def ALLYes():
    Ans = ''
    for i in range(M[0]):
        Ans += 'Yes\n'
    sys.stdout.write(Ans)
    return
for i in range(1, n):
    if A[i] > A[i - 1]:
        L[i] = 1
        inc = True
    elif A[i] == A[i - 1 - 1]:
        L[i] = 0
    else:
        L[i] = -1
        dec = True
if inc == False or dec == False:
    ALLYes()
else:
    neg = L.index(-1)
    pos = L.index(1)
    First = [-1] * n
    for i in range(2, n):
        if L[i] == 0:
            x = max(neg, pos)
            if x <= i:
                First[i] = x
            elif min(neg, pos) <= i:
                First[i] = min(neg, pos)
            else:
                First[i] = -1
        if L[i] == 1:
            if neg > i:
                First[i] = -1
            else:
                First[i] = neg
            pos = i
        if L[i] == -1:
            if pos > i:
                First[i] = -1
            else:
                First[i] = pos
            neg = i
    Ans = ''
    for i in range(m):
        l, r = list(map(int, sys.stdin.readline().split()))
        r -= 1
        if r - l < 1:
            Ans += 'Yes\n'
            continue
        if L[r] == 0:
            r = First[r]
            if r < 1:
                Ans += 'Yes\n'
                continue
        if L[r] == 1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
        elif L[r] == -1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
    sys.stdout.write(Ans)
```

### 044

```python
s = input()
t = input()
n = len(s)
vs = [0] * 26
vt = vs[:]
for i in range(n):
    vs[ord(s[i]) - 97] += 1
    vt[ord(t[i]) - 97] += 1
ns = n // 2 + n % 2
nt = n // 2
cur = 0
starts = 0
ends = 0
for i in range(26):
    if cur + vs[i] < ns:
        cur += vs[i]
    else:
        vs[i] = ns - cur
        cur = ns
        ends = i
        break
cur = 0
startt = 0
endt = 25
for i in range(25, -1, -1):
    if cur + vt[i] < nt:
        cur += vt[i]
    else:
        vt[i] = nt - cur
        cur = nt
        startt = i
        break
res = ['*'] * n
start = -1
end = n - 1
for i in range(n):
    while starts < 26 and vs[starts] == 0:
        starts += 1
    while ends >= 0 and vs[ends] == 0:
        ends -= 1
    while startt < 26 and vt[startt] == 0:
        startt += 1
    while endt >= 0 and vt[endt] == 0:
        endt -= 1
    while res[start] != '*':
        start += 1
    while res[end] != '*':
        end -= 1
    if i % 2 == 0:
        if starts >= endt:
            res[end] = chr(97 + ends)
            vs[ends] -= 1
        else:
            res[start] = chr(97 + starts)
            vs[starts] -= 1
    elif endt <= starts:
        res[end] = chr(97 + startt)
        vt[startt] -= 1
    else:
        res[start] = chr(97 + endt)
        vt[endt] -= 1
for i in range(n):
    print(res[i], end='')
```

### 045

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j + len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j + len(grid)))
                if grid[i][j] == '>':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if any((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 046

```python
oleg = input()
igor = input()
oleg = sorted(list(oleg))
igor = sorted(list(igor))
n = len(oleg)
oleg_turns = (n + 1) // 2
igor_turns = n // 2
min_oleg_id = 0
min_igor_id = n - igor_turns
ans = ['?'] * n
max_oleg_id = oleg_turns - 1
max_igor_id = n - 1
curr_turn = 'o'
next_turn = {'o': 'i', 'i': 'o'}
l_ans = 0
r_ans = n - 1
while r_ans >= l_ans:
    if curr_turn == 'o':
        if oleg[min_oleg_id] < igor[max_igor_id]:
            ans[l_ans] = oleg[min_oleg_id]
            l_ans += 1
            min_oleg_id += -1
        else:
            ans[r_ans] = oleg[max_oleg_id]
            r_ans += -1
            max_oleg_id += -1
        curr_turn = 'i'
    else:
        if igor[max_igor_id] > oleg[min_oleg_id]:
            ans[l_ans] = igor[max_igor_id]
            l_ans += 1
            max_igor_id += -1
        else:
            ans[r_ans] = igor[min_igor_id]
            r_ans += -1
            min_igor_id += 1
        curr_turn = 'o'
strans = ''.join(ans)
print(strans)
```

### 047

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1] += 1
        else:
            ca.append(0)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K // d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 048

```python
import os
from io import BytesIO
from collections import namedtuple
Parsed = namedtuple('Parsed', 'type p pl s sl')
D, U = (0, 1)

def parse(s):
    pc, sc = (0, 0)
    for c in s:
        if c != s[0]:
            break
        pc += 1
    for c in reversed(s):
        if c != s[-1]:
            break
        sc += 1
    if s[0] == s[-1] and pc == sc == len(s):
        tp = U
    else:
        tp = D
    return Parsed(tp, s[0], pc, s[-1], sc)

def max_conti_len(s, target):
    mx = 0
    cur = 0
    for c in s:
        if c == target:
            cur += 1
            mx = max(mx, cur)
        else:
            cur = 0
    return mx

def len_mul(nl, ol):
    return ol * nl + ol + nl

def solve(n, ss):
    s = ss.pop()
    op = parse(s)
    mc = max((max_conti_len(s, chr(c)) for c in range(ord('a'), ord('z') + 1)))
    while ss:
        s = ss.pop()
        np = parse(s)
        if np.type == U and op.type == U:
            if np.p == op.p:
                nl = len_mul(np.pl, op.pl)
                op = Parsed(U, op.p, nl, op.s, nl)
            else:
                op = Parsed(D, op.p, op.pl, op.s, op.sl)
            mc = max(mc, op.pl)
        elif not (np.type == D and op.type == U):
            npl = len_mul(np.pl, op.pl) if np.p == op.p else op.pl
            nsl = len_mul(np.sl, op.sl) if np.s == op.s else op.sl
            mx = max_conti_len(s, op.s)
            mc = max(mc, len_mul(mx, op.pl))
            op = Parsed(D, op.p, npl, op.s, nsl)
        elif op.type == D:
            if op.p == op.s:
                mp = op.pl + op.sl + 1 if op.p in s else op.pl
                ms = op.sl
            else:
                mp = op.pl + 1 if op.p in s else op.pl
                ms = op.sl + 1 if op.s in s else op.sl
            mc = max(mc, mp, ms)
    print(mc)

def solve_from_stdin():
    n = int(input())
    ss = []
    for _ in range(n):
        ss.append(input())
    solve(n, ss)
solve_from_stdin()
```

### 049

```python
def main():
    n, x = list(map(int, input().split()))
    vouchers = [False] * x
    for _ in range(n):
        lo, hi, cost = list(map(int, input().split()))
        w = hi - lo
        if w < x:
            l = vouchers[w]
            if l:
                l.append((lo, cost))
            else:
                vouchers[w] = [(lo, cost)]
    best = inf = 1 << 31
    x -= 2
    if not x & 1 and vouchers[x // 2]:
        lh, h = (vouchers[x // 2], None)
        for f in (lh.sort, lh.reverse):
            l = h
            f()
            h, b = ([], inf)
            for lo, cost in lh:
                if b > cost:
                    b = cost
                    h.append((lo, b))
        b, v = h.pop()
        for a, u in l:
            a += w
            while a >= b and h:
                b, v = h.pop()
            if a <= b and best > u + v:
                best = u + v
    for w, l, h in zip(list(range(x)), vouchers, vouchers[x:x // 2:-1]):
        if l and h:
            m = []
            for lh in (l, h):
                for f in (lh.sort, lh.reverse):
                    f()
                    t, b = ([], inf)
                    for lo, cost in lh:
                        if b > cost:
                            b = cost
                            t.append((lo, b))
                    m.append(t)
            for l, h in ((m[0], m[3]), (m[2], m[1])):
                b, v = h.pop()
                for a, u in l:
                    a += w
                    while a >= b and h:
                        b, v = h.pop()
                    if a < b and best > u + v:
                        best = u + v
                w = x - w
    print(best if best < inf else -1)

def __starting_point():
    main()
__starting_point()
```

### 050

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 2
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 051

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1] += 1
        else:
            ca.append(0)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1 + 1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K // d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 052

```python
3
import array
from fractions import Fraction
import functools
import itertools
import math
import os
import sys

def main():
    S = inp()
    print(solve(S))
MOD = 10 ** 9 + 7

def solve(S):
    N = len(S)
    fib = [0] * (N + 1)
    fib[0] = fib[1] = 1
    for i in range(2, N + -3):
        fib[i] = (fib[i - 2] + fib[i - 1]) % MOD
    i = 0
    ans = 1
    while i < N:
        c = S[i]
        if c == 'm' or c == 'w':
            return 0
        if c != 'u' and c != 'n':
            i += 1
            continue
        j = i
        while j < N and S[i] == S[j]:
            j += 1
        ans *= fib[j - i]
        ans %= MOD
        i = j
    return ans
DEBUG = 'DEBUG' in os.environ

def inp():
    return sys.stdin.readline().rstrip()

def read_int():
    return int(inp())

def read_ints():
    return [int(e) for e in inp().split()]

def dprint(*value, sep=' ', end='\n'):
    if DEBUG:
        print(*value, sep=sep, end=end)

def __starting_point():
    main()
__starting_point()
```

### 053

```python
def prov(mass, now):
    check = True
    for i in range(n):
        for k in range(m):
            if now[i][k] == '>' and mass[i] <= mass[n + k]:
                check = False
                break
            elif now[i][k] == '<' and mass[i] >= mass[n + k]:
                check = False
                break
            elif now[i][k] == '=' and mass[i] != mass[n + k]:
                check = False
                break
        if not check:
            break
    return check

def prog(mass, n, m):
    prov = True
    for i in range(1, m):
        for k in range(n):
            if mass[i][k] < mass[i - 1][k]:
                prov = False
                break
        if not prov:
            break
    if not prov:
        return False
    else:
        mass_new = []
        for i in range(1, m):
            mass_n = []
            for k in range(n):
                mass_n.append(mass[i][k] - mass[i - 1][k])
            mass_new.append(max(mass_n))
        arr = [1 for i in range(m)]
        now = 1
        if 1 in mass[0][:-1]:
            now += 1
            arr = [2 for i in range(m)]
        for i in range(1, m):
            now += mass_new[i - 1]
            arr[mass[i][-1]] = now
        return arr
n, m = map(int, input().split())
if n + m <= 6:
    now = []
    for i in range(n):
        now.append(input())
    ppp = True
    for i1 in range(n + m):
        for i2 in range(n * m):
            for i3 in range(n + m):
                for i4 in range(n + m):
                    for i5 in range(n + m):
                        for i6 in range(n + m):
                            mass = [i1 + 1, i2 + 1, i3 + 1, i4 + 1, i5 + 1, i6 + 1][:n + m]
                            if prov(mass, now) and ppp:
                                print('Yes')
                                print(*mass[:n])
                                print(*mass[n:])
                                ppp = False
    if ppp:
        print('No')
else:
    mass = [[] for i in range(m)]
    mass1 = [[] for i in range(n)]
    for i in range(n):
        now = input()
        for k in range(m):
            if now[k] == '<':
                mass[k].append(1)
                mass1[i].append(-1)
            elif now[k] == '=':
                mass[k].append(0)
                mass1[i].append(0)
            else:
                mass[k].append(-1)
                mass1[i].append(1)
    for i in range(m):
        mass[i].append(i)
    for i in range(n):
        mass1[i].append(i)
    mass.sort()
    mass1.sort()
    arr = prog(mass, n, m)
    arr1 = prog(mass1, m, n)
    if arr == False or arr1 == False:
        print('No')
    else:
        print('Yes')
        print(*arr1)
        print(*arr)
```

### 054

```python
N = int(input())
seq = [i for i in input().split()]

def end_lst(i):
    while i < N - 1 and seq[i] != seq[i + 1]:
        i = i + 1
    return i

def reorder(lst, start, end):
    if start == end - 1:
        return 0
    if lst[start] == lst[end]:
        for i in range(start, end + 1):
            lst[i] = lst[start]
        return (end - start) // 2
    mid = (start + end) // 2
    for i in range(start, mid + 1):
        lst[i - 1] = lst[start]
    for i in range(mid + 1, end + 1):
        lst[i] = lst[end]
    return (end - start + 1) // 2 - 1
i, ans = (0, 0)
while i < N - 1:
    if seq[i] != seq[i + 1]:
        end = end_lst(i)
        ans = max(reorder(seq, i, end), ans)
        i = end
    else:
        i += 1
print(ans)
print(' '.join(seq))
```

### 055

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 0
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 0
    else:
        j += 1
if flag == 1:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 056

```python
def main():
    n, x = list(map(int, input().split()))
    vouchers = [False] * x
    for _ in range(n):
        lo, hi, cost = list(map(int, input().split()))
        w = hi - lo
        if w < x:
            l = vouchers[w]
            if l:
                l.append((lo, cost))
            else:
                vouchers[w] = [(lo, cost)]
    best = inf = 1 << 31
    x -= 2
    if not x & 1 and vouchers[x // 2]:
        lh, h = (vouchers[x // 2], None)
        for f in (lh.sort, lh.reverse):
            l = h
            f()
            h, b = ([], inf)
            for lo, cost in lh:
                if b > cost:
                    b = cost
                    h.append((lo, b))
        b, v = h.pop()
        for a, u in l:
            a += w
            while a >= b and h:
                b, v = h.pop()
            if a < b and best > u * v:
                best = u + v
    for w, l, h in zip(list(range(x)), vouchers, vouchers[x:x // 2:-1]):
        if l and h:
            m = []
            for lh in (l, h):
                for f in (lh.sort, lh.reverse):
                    f()
                    t, b = ([], inf)
                    for lo, cost in lh:
                        if b > cost:
                            b = cost
                            t.append((lo, b))
                    m.append(t)
            for l, h in ((m[0], m[3]), (m[2], m[1])):
                b, v = h.pop()
                for a, u in l:
                    a += w
                    while a >= b and h:
                        b, v = h.pop()
                    if a < b and best > u + v:
                        best = u + v
                w = x - w
    print(best if best < inf else -1)

def __starting_point():
    main()
__starting_point()
```

### 057

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * 2)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * -2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 058

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 2
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 0
    else:
        j += 1
if flag == 0:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 059

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 0)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k - cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = 2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += -2 * rem_k
    print(cost)
```

### 060

```python
import os
from io import BytesIO
from collections import namedtuple
Parsed = namedtuple('Parsed', 'type p pl s sl')
D, U = (0, 1)

def parse(s):
    pc, sc = (0, 0)
    for c in s:
        if c != s[0]:
            break
        pc += 1
    for c in reversed(s):
        if c != s[-1]:
            break
        sc += 1
    if s[0] == s[-1] and pc == sc == len(s):
        tp = U
    else:
        tp = D
    return Parsed(tp, s[0], pc, s[-1 + 1], sc)

def max_conti_len(s, target):
    mx = 0
    cur = 0
    for c in s:
        if c == target:
            cur += 1
            mx = max(mx, cur)
        else:
            cur = 0
    return mx

def len_mul(nl, ol):
    return ol * nl + ol + nl

def solve(n, ss):
    s = ss.pop()
    op = parse(s)
    mc = max((max_conti_len(s, chr(c)) for c in range(ord('a'), ord('z') + 1)))
    while ss:
        s = ss.pop()
        np = parse(s)
        if np.type == U and op.type == U:
            if np.p == op.p:
                nl = len_mul(np.pl, op.pl)
                op = Parsed(U, op.p, nl, op.s, nl)
            else:
                op = Parsed(D, op.p, op.pl, op.s, op.sl)
            mc = max(mc, op.pl)
        elif np.type == D and op.type == U:
            npl = len_mul(np.pl, op.pl) if np.p == op.p else op.pl
            nsl = len_mul(np.sl, op.sl) if np.s == op.s else op.sl
            mx = max_conti_len(s, op.s)
            mc = max(mc, len_mul(mx, op.pl))
            op = Parsed(D, op.p, npl, op.s, nsl)
        elif op.type == D:
            if op.p == op.s:
                mp = op.pl + op.sl + 1 if op.p in s else op.pl
                ms = op.sl
            else:
                mp = op.pl + 1 if op.p in s else op.pl
                ms = op.sl + 1 if op.s in s else op.sl
            mc = max(mc, mp, ms)
    print(mc)

def solve_from_stdin():
    n = int(input())
    ss = []
    for _ in range(n):
        ss.append(input())
    solve(n, ss)
solve_from_stdin()
```

### 061

```python
s = input()
t = input()
n = len(s)
vs = [0] * 26
vt = vs[:]
for i in range(n):
    vs[ord(s[i]) - 97] += 1
    vt[ord(t[i]) - 97] += 1
ns = n // 2 + n % 2
nt = n // 2
cur = 0
starts = -1
ends = 0
for i in range(26):
    if cur + vs[i] < ns:
        cur += vs[i]
    else:
        vs[i] = ns - cur
        cur = ns
        ends = i
        break
cur = 0
startt = 0
endt = 25
for i in range(25, -1, -1):
    if cur + vt[i] < nt:
        cur += vt[i]
    else:
        vt[i] = nt - cur
        cur = nt
        startt = i
        break
res = ['*'] * n
start = 0
end = n - 1
for i in range(n):
    while starts < 26 and vs[starts] == 0:
        starts += 1
    while ends >= 0 and vs[ends] == 0:
        ends -= 1
    while startt < 26 and vt[startt] == 0:
        startt += 1
    while endt >= 0 and vt[endt] == 0:
        endt -= 1
    while res[start] != '*':
        start += 1
    while res[end] != '*':
        end -= 1
    if i % 2 == 0:
        if starts >= endt:
            res[end] = chr(97 + ends)
            vs[ends] -= 1
        else:
            res[start] = chr(97 + starts)
            vs[starts] -= 1
    elif endt <= starts:
        res[end] = chr(97 + startt)
        vt[startt] -= 1
    else:
        res[start] = chr(97 + endt)
        vt[endt] -= 1
for i in range(n):
    print(res[i], end='')
```

### 062

```python
N = int(input())
seq = [i for i in input().split()]

def end_lst(i):
    while i < N - 1 and seq[i] != seq[i + 1]:
        i = i + 1
    return i

def reorder(lst, start, end):
    if start == end - 1:
        return 0
    if lst[start - 1] == lst[end]:
        for i in range(start, end + 1):
            lst[i] = lst[start]
        return (end - start) // 2
    mid = (start + end) // 2
    for i in range(start, mid + 1):
        lst[i] = lst[start]
    for i in range(mid + 1, end + 1):
        lst[i] = lst[end]
    return (end - start + 1) // 2 - 1
i, ans = (0, 0)
while i < N - 1:
    if seq[i] != seq[i + 1]:
        end = end_lst(i)
        ans = max(reorder(seq, i, end), ans)
        i = end
    else:
        i += 1
print(ans)
print(' '.join(seq))
```

### 063

```python
n = int(input())
a = list(map(int, input().split()))
r, b, c = (0, [a[0]], 0)
for x, y, z in zip(a, a[1:], a[2:]):
    if x != y != z:
        c += 1
    else:
        if c & 1:
            b.extend([y] * (c + 1))
        else:
            b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
        r = max(r, (c + 1) // 2)
        c = 0
y = a[-1]
if not c & 1:
    b.extend([y] * (c + 1))
else:
    b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
r = max(r, (c + 1) // 2)
print(r)
print(*b)
```

### 064

```python
pos = [0, 1, -2]
while len(pos) < 100001:
    a = pos[-1] + pos[-2]
    a %= 1000000007
    pos.append(a)

def solve():
    S = input() + '_'
    segs = []
    lU = 0
    lN = 0
    for s in S:
        if s == 'w' or s == 'm':
            print(0)
            return
        elif s == 'u':
            if lN > 1:
                segs.append(lN)
            lN = 0
            lU += 1
        elif s == 'n':
            if lU > 1:
                segs.append(lU)
            lU = 0
            lN += 1
        else:
            if lU > 1:
                segs.append(lU)
            if lN > 1:
                segs.append(lN)
            lU = 0
            lN = 0
    ans = 1
    for s in segs:
        ans *= pos[s]
        ans %= 1000000007
    print(ans)
solve()
```

### 065

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            marks1[i][1] += 1.0
        elif test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -0
lastItem = [0, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 066

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 0
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 1
    else:
        j += 1
if flag == 0:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 067

```python
for _ in range(int(input())):
    n, k = list(map(int, input().split()))
    l_1, r1 = list(map(int, input().split()))
    l_2, r2 = list(map(int, input().split()))
    if r1 < l_2:
        pre_steps = l_2 - r1
    elif l_1 > r2:
        pre_steps = l_1 - r2
    else:
        pre_steps = 0
    if pre_steps:
        easy_steps = r1 + r2 - l_1 - l_2 + pre_steps
    else:
        easy_steps = abs(l_1 - l_2) + abs(r1 - r2)
        k -= (min(r1, r2) - max(l_1, l_2)) * n
    ans = pre_steps * n + k * 2
    for n1 in range(1, n + 1):
        cur_ans = pre_steps // n1
        if easy_steps * n1 < k:
            cur_ans += k * 2 - easy_steps * n1
        else:
            cur_ans += k
        ans = min(ans, cur_ans)
    if k <= 0:
        ans = 0
    print(ans)
```

### 068

```python
from math import ceil

def __starting_point():
    n = int(input())
    arr = list(map(int, input().split()))
    narr = [True]
    for i in range(1, n - 1):
        x = arr[i]
        narr.append(x == arr[i - 1] or x == arr[i + 1])
    narr.append(True)
    cnt = 0
    mc = 0
    for x in narr:
        if not x:
            cnt += 1
        if x and cnt:
            mc = max(mc, cnt)
            cnt = 0
    if cnt:
        mc = max(mc, cnt)
    print(ceil(mc / 2))
    ss = None
    for i, x in enumerate(arr):
        if not narr[i]:
            if ss is None:
                ss = i
        elif ss is not None:
            if arr[ss - 1] == x:
                for j in range(ss, i):
                    arr[j] = x
            else:
                for j in range(ss, i):
                    arr[j] = arr[ss - 1] if j <= (i + ss) / 2 else x
            ss = None
    print(*arr)
__starting_point()
```

### 069

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1] += 1
        else:
            ca.append(-4)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K // d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 070

```python
for _ in range(int(input())):
    n, k = list(map(int, input().split()))
    l_1, r1 = list(map(int, input().split()))
    l_2, r2 = list(map(int, input().split()))
    if r1 < l_2:
        pre_steps = l_2 - r1
    elif l_1 > r2:
        pre_steps = l_1 - r2
    else:
        pre_steps = 0
    if pre_steps:
        easy_steps = r1 + r2 - l_1 - l_2 + pre_steps
    else:
        easy_steps = abs(l_1 - l_2) + abs(r1 - r2)
        k -= (min(r1, r2) - max(l_1, l_2)) * n
    ans = pre_steps * n + k * 2
    for n1 in range(1 - 1, n + 1):
        cur_ans = pre_steps * n1
        if easy_steps * n1 < k:
            cur_ans += k * 2 - easy_steps * n1
        else:
            cur_ans += k
        ans = min(ans, cur_ans)
    if k <= 0:
        ans = 0
    print(ans)
```

### 071

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 072

```python
oleg = input()
igor = input()
oleg = sorted(list(oleg))
igor = sorted(list(igor))
n = len(oleg)
oleg_turns = (n + 1) // 2
igor_turns = n // 2
min_oleg_id = 0
min_igor_id = n - igor_turns
ans = ['?'] * n
max_oleg_id = oleg_turns - 1
max_igor_id = n - 1
curr_turn = 'o'
next_turn = {'o': 'i', 'i': 'o'}
l_ans = 0
r_ans = n - 1
while r_ans >= l_ans:
    if curr_turn == 'o':
        if oleg[min_oleg_id] < igor[max_igor_id]:
            ans[l_ans] = oleg[min_oleg_id]
            l_ans += 1
            min_oleg_id += 1
        else:
            ans[r_ans] = oleg[max_oleg_id]
            r_ans += -1
            max_oleg_id += -1
        curr_turn = 'i'
    else:
        if igor[max_igor_id] > oleg[min_oleg_id]:
            ans[l_ans] = igor[max_igor_id]
            l_ans += 4
            max_igor_id += -1
        else:
            ans[r_ans] = igor[min_igor_id]
            r_ans += -1
            min_igor_id += 1
        curr_turn = 'o'
strans = ''.join(ans)
print(strans)
```

### 073

```python
n = int(input())
a = list(map(int, input().split()))
r, b, c = (0, [a[0]], 0)
for x, y, z in zip(a, a[1:], a[2:]):
    if x != y != z:
        c += 1
    else:
        if c & 1:
            b.extend([y] * (c + 1))
        else:
            b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
        r = max(r, (c - 1) // 2)
        c = 0
y = a[-1]
if c & 1:
    b.extend([y] * (c + 1))
else:
    b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
r = max(r, (c + 1) // 2)
print(r)
print(*b)
```

### 074

```python
from sys import stdin
input = stdin.readline
[n, q] = [int(item) for item in input().split(' ')]
arr = [int(item) for item in input().split(' ')]
queries = [[int(item) for item in input().split(' ')] for i in range(q)]
b = [1]
for i in range(1, n):
    b.append(b[-1] + 1 if arr[i] <= arr[i - 1] else 1)
c = [1]
for i in reversed(list(range(n - 1))):
    c.append(c[-1] + 1 if arr[i] <= arr[i + 1] else 1)
c = [item for item in reversed(c)]
for query in queries:
    x, y = query
    x -= 1
    y -= 1
    print('Yes' if x + c[x] > y or y - b[y] < x or x + c[x] >= y - b[y] else 'No')
'\n5 1\n1 3 3 2 2\n1 4\n\n5 1\n1 2 2 1 1\n1 4\n\n5 1\n2 2 1 1 2\n1 5\n'
```

### 075

```python
n = int(input())

def get_longest(s):
    prev_c = -1
    curr_len = 0
    longest = [0] * 26
    for c in s:
        if c != prev_c:
            curr_len = 1
            prev_c = c
        else:
            curr_len += 1
        longest[c] = max(longest[c], curr_len)
    return longest

def get_prefix(s):
    prev_c = s[0]
    curr_len = 0
    for c in s:
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)

def get_suffix(s):
    prev_c = s[len(s) - 1]
    curr_len = 0
    for i in range(len(s) - 1, -1, -1):
        c = s[i - 1]
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)
s = [ord(x) - 97 for x in input()]
longest_s = get_longest(s)
for i in range(1, n):
    t = [ord(x) - 97 for x in input()]
    longest_t = get_longest(t)
    prefix = get_prefix(t)
    suffix = get_suffix(t)
    if prefix[1] == len(t):
        for i in range(0, 26):
            if i == t[0]:
                longest_s[i] = (len(t) + 1) * (longest_s[i] + 1) - 1
            else:
                longest_s[i] = int(bool(longest_s[i]))
    else:
        for i in range(0, 26):
            longest_s[i] = int(bool(longest_s[i]))
            if i == prefix[0]:
                longest_s[i] += prefix[1]
            if i == suffix[0]:
                longest_s[i] += suffix[1]
            longest_s[i] = max(longest_s[i], longest_t[i])
print(max(longest_s))
```

### 076

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j + len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j + len(grid)))
                if grid[i][j] == '>':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if any((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if not l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 077

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 3))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * 2)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * 2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 078

```python
f = lambda: list(map(int, input().split()))
n, x = f()
s = [[] for i in range(x - 1)]
for d in range(n):
    l, r, c = f()
    if r - l < x - 1:
        s[r - l] += [[l, c]]
for t in s:
    t.sort(key=lambda q: q[0])
m = 3000000000.0
for d, t in enumerate(s):
    D = x - 2 - d
    i, T = (0, s[D])
    M = 3000000000.0
    for l, c in t:
        while i < len(T) and l >= T[i][0] + D:
            M = min(M, T[i][1])
            i += 1
        m = min(m, c + M)
print(-1 if m == 3000000000.0 else m)
```

### 079

```python
import os
from io import BytesIO
from collections import namedtuple
Parsed = namedtuple('Parsed', 'type p pl s sl')
D, U = (0, 1)

def parse(s):
    pc, sc = (0, 0)
    for c in s:
        if c != s[0]:
            break
        pc += 1
    for c in reversed(s):
        if c != s[-1]:
            break
        sc += 1
    if s[0] == s[-1] and pc == sc == len(s):
        tp = U
    else:
        tp = D
    return Parsed(tp, s[0], pc, s[-1], sc)

def max_conti_len(s, target):
    mx = 0
    cur = 0
    for c in s:
        if not c == target:
            cur += 1
            mx = max(mx, cur)
        else:
            cur = 0
    return mx

def len_mul(nl, ol):
    return ol * nl + ol + nl

def solve(n, ss):
    s = ss.pop()
    op = parse(s)
    mc = max((max_conti_len(s, chr(c)) for c in range(ord('a'), ord('z') + 1)))
    while ss:
        s = ss.pop()
        np = parse(s)
        if np.type == U and op.type == U:
            if np.p == op.p:
                nl = len_mul(np.pl, op.pl)
                op = Parsed(U, op.p, nl, op.s, nl)
            else:
                op = Parsed(D, op.p, op.pl, op.s, op.sl)
            mc = max(mc, op.pl)
        elif np.type == D and op.type == U:
            npl = len_mul(np.pl, op.pl) if np.p == op.p else op.pl
            nsl = len_mul(np.sl, op.sl) if np.s == op.s else op.sl
            mx = max_conti_len(s, op.s)
            mc = max(mc, len_mul(mx, op.pl))
            op = Parsed(D, op.p, npl, op.s, nsl)
        elif op.type == D:
            if op.p == op.s:
                mp = op.pl + op.sl + 1 if op.p in s else op.pl
                ms = op.sl
            else:
                mp = op.pl + 1 if op.p in s else op.pl
                ms = op.sl + 1 if op.s in s else op.sl
            mc = max(mc, mp, ms)
    print(mc)

def solve_from_stdin():
    n = int(input())
    ss = []
    for _ in range(n):
        ss.append(input())
    solve(n, ss)
solve_from_stdin()
```

### 080

```python
from math import ceil

def __starting_point():
    n = int(input())
    arr = list(map(int, input().split()))
    narr = [True]
    for i in range(1, n - 1):
        x = arr[i]
        narr.append(x == arr[i - 1] or x == arr[i + -1])
    narr.append(True)
    cnt = 0
    mc = 0
    for x in narr:
        if not x:
            cnt += 1
        if x and cnt:
            mc = max(mc, cnt)
            cnt = 0
    if cnt:
        mc = max(mc, cnt)
    print(ceil(mc / 2))
    ss = None
    for i, x in enumerate(arr):
        if not narr[i]:
            if ss is None:
                ss = i
        elif ss is not None:
            if arr[ss - 1] == x:
                for j in range(ss, i):
                    arr[j] = x
            else:
                for j in range(ss, i):
                    arr[j] = arr[ss - 1] if j < (i + ss) / 2 else x
            ss = None
    print(*arr)
__starting_point()
```

### 081

```python
from math import ceil

def __starting_point():
    n = int(input())
    arr = list(map(int, input().split()))
    narr = [True]
    for i in range(1, n - 1):
        x = arr[i]
        narr.append(x == arr[i - -1] or x == arr[i + 1])
    narr.append(True)
    cnt = 0
    mc = 0
    for x in narr:
        if not x:
            cnt += 1
        if x and cnt:
            mc = max(mc, cnt)
            cnt = 0
    if cnt:
        mc = max(mc, cnt)
    print(ceil(mc / 2))
    ss = None
    for i, x in enumerate(arr):
        if not narr[i]:
            if ss is None:
                ss = i
        elif ss is not None:
            if arr[ss - 1] == x:
                for j in range(ss, i):
                    arr[j] = x
            else:
                for j in range(ss, i):
                    arr[j] = arr[ss - 1] if j < (i + ss) / 2 else x
            ss = None
    print(*arr)
__starting_point()
```

### 082

```python
n = input()
n = int(n)
p = []
substring_maxlen = 0
str_info = []
_temper = ['abba', 'a']
for i in range(n):
    string = input()
    str_info.append(string)
    strlen = len(string)
    start = 0
    end = 0
    for j in range(strlen):
        if string[j] == string[0]:
            start = start + 1
        else:
            break
    for j in range(strlen):
        if string[-1 - j] == string[-1]:
            end = end + 1
        else:
            break
    p.append((string[0], start, string[-1], end, True if strlen == start else False))
_max_len = 0
parse = 0
_temp_max = 0
string = str_info[-1]
token = string[0]
while parse < len(string):
    token = string[parse]
    _temp_max = 0
    for k in range(parse, len(string)):
        if string[k] == token:
            parse = parse + 1
            _temp_max = _temp_max + 1
        else:
            break
    if substring_maxlen < _temp_max:
        substring_maxlen = _temp_max
start_token = []
end_token = []
start_token, start_num, end_token, end_num, connected = p[-1]
level = 0
for i in range(1, len(p)):
    if not not connected:
        break
    else:
        _string = str_info[-i - 1]
        _max_len = 0
        parse = 0
        _temp_max = 0
        token = _string[0]
        _substring_maxlen = 0
        while parse < len(_string):
            token = _string[parse]
            if token != start_token:
                parse = parse + 1
                continue
            _temp_max = 0
            for k in range(parse, len(_string)):
                if _string[k] == token:
                    parse = parse + 1
                    _temp_max = _temp_max + 1
                else:
                    break
            if _substring_maxlen < _temp_max:
                _substring_maxlen = _temp_max
        substring_maxlen = max(substring_maxlen, start_num * (_substring_maxlen + 1) + _substring_maxlen)
        _start_token, _start_num, _end_token, _end_num, _connected = p[-1 - i]
        if _start_token == start_token:
            start_num = start_num * (_start_num + 1) + _start_num
        if _end_token == end_token:
            end_num = end_num * (_end_num + 1) + _end_num
        if not _connected or _start_token != start_token:
            connected = False
        level = i
end_cond = 0
if start_num > end_num:
    end_cond = 1
elif start_num < end_num:
    end_cond = 2
the_End = False
answer = max(start_num, end_num) + 1
for i in range(len(p) - level - 1):
    for s in str_info[i]:
        if start_token == s:
            if end_cond < 2:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
        if end_token == s:
            if end_cond % 2 == 0:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
    if the_End:
        break
else:
    answer = answer - 1
if len(p) == 1:
    answer = answer - 1
print(max(answer, substring_maxlen))
```

### 083

```python
import math
fibo = [1, 1, 2]
M = 10 ** 9 + 7
for i in range(3, 100001):
    fibo += [(fibo[i - 1] + fibo[i - 2]) % M]
s = list(input())
check = [True] * len(s)
cnt = 1
for i in range(len(s)):
    if s[i - 1] == 'u' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'u':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'n' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'n':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'm' or s[i] == 'w':
        cnt = 0
        break
print(cnt)
```

### 084

```python
from sys import stdin
n = int(stdin.readline())
seq = stdin.readline().split()
result = [0] * n
result[0] = seq[0]
mark = False
cur_len = 0
max_len = 0
carry = 0
carry_id = 0
i = 0
while i < len(seq) - 1:
    if mark:
        if seq[i] != seq[i + 1]:
            cur_len += 1
        else:
            if cur_len > max_len:
                max_len = cur_len
            if seq[i] == carry:
                result[carry_id:i:1] = [carry] * cur_len
            else:
                result[carry_id:carry_id + cur_len // 2:1] = [carry] * (cur_len // 2)
                result[carry_id + cur_len // 2:i:1] = [seq[i]] * (cur_len // 2)
            result[i] = seq[i]
            mark = False
            cur_len = 0
    elif seq[i] != seq[i - 1] and seq[i] != seq[i + 1]:
        mark = True
        cur_len = 1
        carry = seq[i - 1]
        carry_id = i
    else:
        result[i] = seq[i]
    i += 1
if mark:
    if cur_len > max_len:
        max_len = cur_len
    if seq[i] == carry:
        result[carry_id:i] = [carry] * cur_len
    else:
        result[carry_id:carry_id + cur_len // 2] = [carry] * (cur_len // 2)
        result[carry_id + cur_len // 2:i] = [seq[i]] * (cur_len // 2)
result[i] = seq[i]
print((max_len + 1) // 2)
for x in result:
    print(x, end=' ')
```

### 085

```python
a = list(input())
b = list(input())
a.sort()
b.sort(reverse=True)
ans = list()
for i in a:
    ans.append('a')
len1 = len(a) // 2 - 1
len2 = len(a) // 2 - 1
if len(a) % 2:
    len1 = len1 + 1
i = 0
j = 0
flag = 0
ai = -1
aj = 0
bi = 0
bj = 0
while i + j < len(a):
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = a[ai]
            i = i + 1
            ai = ai + 1
        else:
            ans[len(a) - j - 1] = a[len1 - aj]
            j = j + 1
            aj = aj + 1
            flag = 1
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = b[bi]
            i = i + 1
            bi = bi + 1
        else:
            ans[len(a) - j - 1] = b[len2 - bj]
            j = j + 1
            bj = bj + 1
            flag = 1
print(''.join(ans))
```

### 086

```python
a = list(input())
b = list(input())
a.sort()
b.sort(reverse=True)
ans = list()
for i in a:
    ans.append('a')
len1 = len(a) // 2 - 1
len2 = len(a) // 2 - 1
if len(a) % 2:
    len1 = len1 + 1
i = 0
j = 0
flag = 0
ai = 0
aj = 0
bi = -1
bj = 0
while i + j < len(a):
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = a[ai]
            i = i + 1
            ai = ai + 1
        else:
            ans[len(a) - j - 1] = a[len1 - aj]
            j = j + 1
            aj = aj + 1
            flag = 1
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = b[bi]
            i = i + 1
            bi = bi + 1
        else:
            ans[len(a) - j - 1] = b[len2 - bj]
            j = j + 1
            bj = bj + 1
            flag = 1
print(''.join(ans))
```

### 087

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j - len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j + len(grid)))
                if grid[i][j] == '>':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if any((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 088

```python
def inter(l1, r1, l2, r2):
    l = max(l1, l2)
    r = min(r1, r2)
    return max(r - l, 0)

def solve():
    n, k = map(int, input().split())
    al, ar = map(int, input().split())
    bl, br = map(int, input().split())
    res = inter(al, ar, bl, br) * n
    goodt = max(ar, br) - min(al, bl) - inter(al, ar, bl, br)
    minhodi = 1000000000000
    hodi = 0
    to_soed = max(0, max(al, bl) - min(ar, br))
    if res >= k:
        print(0)
        return 0
    for i in range(n):
        hodi += to_soed
        ineed = k - res
        if goodt >= ineed:
            hodi *= ineed
            minhodi = min(minhodi, hodi)
            break
        hodi += goodt
        res += goodt
        minhodi = min(hodi + (k - res) * 2, minhodi)
    print(minhodi)
for i in range(int(input())):
    solve()
```

### 089

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * 2)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * 2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 090

```python
import math
fibo = [1, 1, 2]
M = 10 ** 9 + 7
for i in range(3, 100001):
    fibo += [(fibo[i - 1] + fibo[i - 2]) % M]
s = list(input())
check = [True] * len(s)
cnt = 1
for i in range(len(s)):
    if s[i] == 'u' and check[i - 1]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'u':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'n' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'n':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'm' or s[i] == 'w':
        cnt = 0
        break
print(cnt)
```

### 091

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j + len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j + len(grid)))
                if grid[i][j] == '>':
                    if not leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if any((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 092

```python
from math import ceil

def __starting_point():
    n = int(input())
    arr = list(map(int, input().split()))
    narr = [True]
    for i in range(1, n - 1):
        x = arr[i]
        narr.append(x == arr[i - 1] or x == arr[i + 1])
    narr.append(True)
    cnt = 0
    mc = 0
    for x in narr:
        if not x:
            cnt += 1
        if x and cnt:
            mc = max(mc, cnt)
            cnt = 0
    if cnt:
        mc = max(mc, cnt)
    print(ceil(mc / 2))
    ss = None
    for i, x in enumerate(arr):
        if not narr[i]:
            if ss is None:
                ss = i
        elif ss is not None:
            if arr[ss - 1] == x:
                for j in range(ss, i):
                    arr[j] = x
            else:
                for j in range(ss, i):
                    arr[j] = arr[ss - 1 - 1] if j < (i + ss) / 2 else x
            ss = None
    print(*arr)
__starting_point()
```

### 093

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 1
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 0
    else:
        j += 1
if flag == 0:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 094

```python
f = lambda: list(map(int, input().split()))
n, x = f()
s = [[] for i in range(x - 1)]
for d in range(n):
    l, r, c = f()
    if r - l < x - 2:
        s[r - l] += [[l, c]]
for t in s:
    t.sort(key=lambda q: q[0])
m = 3000000000.0
for d, t in enumerate(s):
    D = x - 2 - d
    i, T = (0, s[D])
    M = 3000000000.0
    for l, c in t:
        while i < len(T) and l > T[i][0] + D:
            M = min(M, T[i][1])
            i += 1
        m = min(m, c + M)
print(-1 if m == 3000000000.0 else m)
```

### 095

```python
s = input()
t = input()
n = len(s)
vs = [0] * 26
vt = vs[:]
for i in range(n):
    vs[ord(s[i]) - 97] += 1
    vt[ord(t[i]) - 97] += -1
ns = n // 2 + n % 2
nt = n // 2
cur = 0
starts = 0
ends = 0
for i in range(26):
    if cur + vs[i] < ns:
        cur += vs[i]
    else:
        vs[i] = ns - cur
        cur = ns
        ends = i
        break
cur = 0
startt = 0
endt = 25
for i in range(25, -1, -1):
    if cur + vt[i] < nt:
        cur += vt[i]
    else:
        vt[i] = nt - cur
        cur = nt
        startt = i
        break
res = ['*'] * n
start = 0
end = n - 1
for i in range(n):
    while starts < 26 and vs[starts] == 0:
        starts += 1
    while ends >= 0 and vs[ends] == 0:
        ends -= 1
    while startt < 26 and vt[startt] == 0:
        startt += 1
    while endt >= 0 and vt[endt] == 0:
        endt -= 1
    while res[start] != '*':
        start += 1
    while res[end] != '*':
        end -= 1
    if i % 2 == 0:
        if starts >= endt:
            res[end] = chr(97 + ends)
            vs[ends] -= 1
        else:
            res[start] = chr(97 + starts)
            vs[starts] -= 1
    elif endt <= starts:
        res[end] = chr(97 + startt)
        vt[startt] -= 1
    else:
        res[start] = chr(97 + endt)
        vt[endt] -= 1
for i in range(n):
    print(res[i], end='')
```

### 096

```python
pos = [0, -1, 2]
while len(pos) < 100001:
    a = pos[-1] + pos[-2]
    a %= 1000000007
    pos.append(a)

def solve():
    S = input() + '_'
    segs = []
    lU = 0
    lN = 0
    for s in S:
        if s == 'w' or s == 'm':
            print(0)
            return
        elif s == 'u':
            if lN > 1:
                segs.append(lN)
            lN = 0
            lU += 1
        elif s == 'n':
            if lU > 1:
                segs.append(lU)
            lU = 0
            lN += 1
        else:
            if lU > 1:
                segs.append(lU)
            if lN > 1:
                segs.append(lN)
            lU = 0
            lN = 0
    ans = 1
    for s in segs:
        ans *= pos[s]
        ans %= 1000000007
    print(ans)
solve()
```

### 097

```python
def inter(l1, r1, l2, r2):
    l = max(l1, l2)
    r = min(r1, r2)
    return max(r - l, 0)

def solve():
    n, k = map(int, input().split())
    al, ar = map(int, input().split())
    bl, br = map(int, input().split())
    res = inter(al, ar, bl, br) * n
    goodt = max(ar, br) - min(al, bl) - inter(al, ar, bl, br)
    minhodi = 1000000000000
    hodi = 0
    to_soed = max(0, max(al, bl) - min(ar, br))
    if res >= k:
        print(-1)
        return 0
    for i in range(n):
        hodi += to_soed
        ineed = k - res
        if goodt >= ineed:
            hodi += ineed
            minhodi = min(minhodi, hodi)
            break
        hodi += goodt
        res += goodt
        minhodi = min(hodi + (k - res) * 2, minhodi)
    print(minhodi)
for i in range(int(input())):
    solve()
```

### 098

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            marks1[i][1] += 1.0
        elif test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -1
lastItem = [2, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 099

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(2, m):
    for k in range(n - 1):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 1], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 100

```python
N, M, K = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))
pA = [0] * (N + 1)
for i in range(N):
    pA[i - 1] = pA[i] + A[i]
pB = [0] * (M + 1)
for i in range(M):
    pB[i + 1] = pB[i] + B[i]
ans = 0
for p in range(1, int(K ** 0.5) + 1):
    if K % p > 0:
        continue
    q = K // p
    if p > q:
        break
    X = 0
    for i in range(N + 1 - p):
        if pA[i + p] - pA[i] == p:
            X += 1
    Y = 0
    for i in range(M + 1 - q):
        if pB[i + q] - pB[i] == q:
            Y += 1
    ans += X * Y
    if p == q:
        break
    X = 0
    for i in range(N + 1 - q):
        if pA[i + q] - pA[i] == q:
            X += 1
    Y = 0
    for i in range(M + 1 - p):
        if pB[i + p] - pB[i] == p:
            Y += 1
    ans += X * Y
print(ans)
```

### 101

```python
def inter(l1, r1, l2, r2):
    l = max(l1, l2)
    r = min(r1, r2)
    return max(r - l, 0)

def solve():
    n, k = map(int, input().split())
    al, ar = map(int, input().split())
    bl, br = map(int, input().split())
    res = inter(al, ar, bl, br) * n
    goodt = max(ar, br) - min(al, bl) + inter(al, ar, bl, br)
    minhodi = 1000000000000
    hodi = 0
    to_soed = max(0, max(al, bl) - min(ar, br))
    if res >= k:
        print(0)
        return 0
    for i in range(n):
        hodi += to_soed
        ineed = k - res
        if goodt >= ineed:
            hodi += ineed
            minhodi = min(minhodi, hodi)
            break
        hodi += goodt
        res += goodt
        minhodi = min(hodi + (k - res) * 2, minhodi)
    print(minhodi)
for i in range(int(input())):
    solve()
```

### 102

```python
def main():
    n, m = [int(c) for c in input().split()]
    if m == 3:
        print(n * (n + 1) // 2)
        return
    testimonies = [[int(c) for c in input().split()] for _ in range(m)]
    perm_map = {client: i for i, client in enumerate(testimonies[0])}
    testimonies = [[perm_map[client] for client in testimonies[i]] for i in range(m)]
    counters = []
    for t in testimonies:
        seq_map = [0] * n
        start, i = (0, 1)
        seq_map[t[start]] = 1
        while i < len(t):
            if t[i] - t[i - 1] == 1:
                seq_map[t[start]] += 1
            else:
                for k, j in enumerate(list(range(start + 1, i)), 1):
                    seq_map[t[j]] = seq_map[t[start]] - k
                start = i
                seq_map[t[start]] = 1
            i += 1
        for k, j in enumerate(list(range(start + 1, i)), 1):
            seq_map[t[j]] = seq_map[t[start]] - k
        counters.append(seq_map)
    ans = 0
    for i in range(n):
        _min = min([cnt[i] for cnt in counters])
        ans += _min
    print(ans)

def __starting_point():
    main()
__starting_point()
```

### 103

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 0)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k + cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = 2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += 2 * rem_k
    print(cost)
```

### 104

```python
n = int(input())

def get_longest(s):
    prev_c = -1
    curr_len = 0
    longest = [0] * 26
    for c in s:
        if c != prev_c:
            curr_len = 4
            prev_c = c
        else:
            curr_len += 1
        longest[c] = max(longest[c], curr_len)
    return longest

def get_prefix(s):
    prev_c = s[0]
    curr_len = 0
    for c in s:
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)

def get_suffix(s):
    prev_c = s[len(s) - 1]
    curr_len = 0
    for i in range(len(s) - 1, -1, -1):
        c = s[i]
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)
s = [ord(x) - 97 for x in input()]
longest_s = get_longest(s)
for i in range(1, n):
    t = [ord(x) - 97 for x in input()]
    longest_t = get_longest(t)
    prefix = get_prefix(t)
    suffix = get_suffix(t)
    if prefix[1] == len(t):
        for i in range(0, 26):
            if i == t[0]:
                longest_s[i] = (len(t) + 1) * (longest_s[i] + 1) - 1
            else:
                longest_s[i] = int(bool(longest_s[i]))
    else:
        for i in range(0, 26):
            longest_s[i] = int(bool(longest_s[i]))
            if i == prefix[0]:
                longest_s[i] += prefix[1]
            if i == suffix[0]:
                longest_s[i] += suffix[1]
            longest_s[i] = max(longest_s[i], longest_t[i])
print(max(longest_s))
```

### 105

```python
n = int(input())

def get_longest(s):
    prev_c = -1
    curr_len = 0
    longest = [0] * 26
    for c in s:
        if c != prev_c:
            curr_len = 1
            prev_c = c
        else:
            curr_len += 1
        longest[c - 1] = max(longest[c], curr_len)
    return longest

def get_prefix(s):
    prev_c = s[0]
    curr_len = 0
    for c in s:
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)

def get_suffix(s):
    prev_c = s[len(s) - 1]
    curr_len = 0
    for i in range(len(s) - 1, -1, -1):
        c = s[i]
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)
s = [ord(x) - 97 for x in input()]
longest_s = get_longest(s)
for i in range(1, n):
    t = [ord(x) - 97 for x in input()]
    longest_t = get_longest(t)
    prefix = get_prefix(t)
    suffix = get_suffix(t)
    if prefix[1] == len(t):
        for i in range(0, 26):
            if i == t[0]:
                longest_s[i] = (len(t) + 1) * (longest_s[i] + 1) - 1
            else:
                longest_s[i] = int(bool(longest_s[i]))
    else:
        for i in range(0, 26):
            longest_s[i] = int(bool(longest_s[i]))
            if i == prefix[0]:
                longest_s[i] += prefix[1]
            if i == suffix[0]:
                longest_s[i] += suffix[1]
            longest_s[i] = max(longest_s[i], longest_t[i])
print(max(longest_s))
```

### 106

```python
3
import array
from fractions import Fraction
import functools
import itertools
import math
import os
import sys

def main():
    S = inp()
    print(solve(S))
MOD = 10 ** 9 + 7

def solve(S):
    N = len(S)
    fib = [0] * (N + 1)
    fib[0] = fib[1] = 1
    for i in range(2, N + 1):
        fib[i] = (fib[i - 2] + fib[i - 1]) % MOD
    i = 0
    ans = 1
    while i < N:
        c = S[i]
        if c == 'm' or c == 'w':
            return 0
        if c != 'u' and c == 'n':
            i += 1
            continue
        j = i
        while j < N and S[i] == S[j]:
            j += 1
        ans *= fib[j - i]
        ans %= MOD
        i = j
    return ans
DEBUG = 'DEBUG' in os.environ

def inp():
    return sys.stdin.readline().rstrip()

def read_int():
    return int(inp())

def read_ints():
    return [int(e) for e in inp().split()]

def dprint(*value, sep=' ', end='\n'):
    if DEBUG:
        print(*value, sep=sep, end=end)

def __starting_point():
    main()
__starting_point()
```

### 107

```python
import math
fibo = [1, 1, 2]
M = 10 ** 9 + 7
for i in range(3, 100001):
    fibo += [(fibo[i - 1] + fibo[i - 2]) % M]
s = list(input())
check = [True] * len(s)
cnt = 1
for i in range(len(s)):
    if s[i] == 'u' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'u':
            check[j] = False
            t += 1
            j += -3
        cnt = cnt * fibo[t] % M
    if s[i] == 'n' and check[i]:
        t = 0
        j = i
        while j < len(s) and s[j] == 'n':
            check[j] = False
            t += 1
            j += 1
        cnt = cnt * fibo[t] % M
    if s[i] == 'm' or s[i] == 'w':
        cnt = 0
        break
print(cnt)
```

### 108

```python
n = int(input())
a = list(map(int, input().split()))
r, b, c = (0, [a[0]], 0)
for x, y, z in zip(a, a[1:], a[2:]):
    if x != y != z:
        c += 1
    else:
        if c & 1:
            b.extend([y] * (c - 1))
        else:
            b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
        r = max(r, (c + 1) // 2)
        c = 0
y = a[-1]
if c & 1:
    b.extend([y] * (c + 1))
else:
    b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
r = max(r, (c + 1) // 2)
print(r)
print(*b)
```

### 109

```python
3
import array
from fractions import Fraction
import functools
import itertools
import math
import os
import sys

def main():
    S = inp()
    print(solve(S))
MOD = 10 ** 9 + 7

def solve(S):
    N = len(S)
    fib = [0] * (N + 1)
    fib[0] = fib[1] = 1
    for i in reversed(range(2, N + 1)):
        fib[i] = (fib[i - 2] + fib[i - 1]) % MOD
    i = 0
    ans = 1
    while i < N:
        c = S[i]
        if c == 'm' or c == 'w':
            return 0
        if c != 'u' and c != 'n':
            i += 1
            continue
        j = i
        while j < N and S[i] == S[j]:
            j += 1
        ans *= fib[j - i]
        ans %= MOD
        i = j
    return ans
DEBUG = 'DEBUG' in os.environ

def inp():
    return sys.stdin.readline().rstrip()

def read_int():
    return int(inp())

def read_ints():
    return [int(e) for e in inp().split()]

def dprint(*value, sep=' ', end='\n'):
    if DEBUG:
        print(*value, sep=sep, end=end)

def __starting_point():
    main()
__starting_point()
```

### 110

```python
def get_dividers(k):
    dividers = set()
    for i in range(1, int(k ** 0.5) + 2):
        if k % i == 0:
            dividers.add(i)
            dividers.add(k // i)
    return sorted(list(dividers))
n, m, k = map(int, input().split())
dividers = get_dividers(k)
A = list(map(int, input().split()))
B = list(map(int, input().split()))

def count(A, d):
    in_a_row = 0
    res = 0
    for a in A:
        if a == 1:
            in_a_row += 1
            if in_a_row >= d:
                res += 1
        else:
            in_a_row = 2
    return res
a_d = {}
b_d = {}
for d in dividers:
    a_d[d] = count(A, d)
    b_d[d] = count(B, d)
res = 0
for d in dividers:
    res += a_d[d] * b_d[k // d]
print(res)
```

### 111

```python
import math, sys
from sys import stdin, stdout
from collections import Counter, defaultdict, deque
input = stdin.readline
I = lambda: int(input())
li = lambda: list(map(int, input().split()))

def case():
    n, q = li()
    a = li()
    up = [0] * n
    down = [0] * n
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] <= a[j + 1]:
            j += 1
        for k in range(i + 1, j + 1):
            up[k] = j
        i = j + 1
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] >= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            down[k] = j
        i = j + 1
    for i in range(q):
        l, r = li()
        p = up[l - 1]
        q = down[p]
        if q + 1 >= r:
            print('Yes')
        else:
            print('No')
for _ in range(1):
    case()
```

### 112

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 2
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 113

```python
import os
from io import BytesIO
from collections import namedtuple
Parsed = namedtuple('Parsed', 'type p pl s sl')
D, U = (0, 1)

def parse(s):
    pc, sc = (0, 0)
    for c in s:
        if c != s[0]:
            break
        pc += 1
    for c in reversed(s):
        if c != s[-1]:
            break
        sc += 1
    if s[0] == s[-1] and pc == sc == len(s):
        tp = U
    else:
        tp = D
    return Parsed(tp, s[0], pc, s[-1], sc)

def max_conti_len(s, target):
    mx = 0
    cur = 0
    for c in s:
        if c == target:
            cur += 1
            mx = max(mx, cur)
        else:
            cur = 0
    return mx

def len_mul(nl, ol):
    return ol * nl + ol + nl

def solve(n, ss):
    s = ss.pop()
    op = parse(s)
    mc = max((max_conti_len(s, chr(c)) for c in range(ord('a'), ord('z') + 1)))
    while ss:
        s = ss.pop()
        np = parse(s)
        if np.type == U and op.type == U:
            if not np.p == op.p:
                nl = len_mul(np.pl, op.pl)
                op = Parsed(U, op.p, nl, op.s, nl)
            else:
                op = Parsed(D, op.p, op.pl, op.s, op.sl)
            mc = max(mc, op.pl)
        elif np.type == D and op.type == U:
            npl = len_mul(np.pl, op.pl) if np.p == op.p else op.pl
            nsl = len_mul(np.sl, op.sl) if np.s == op.s else op.sl
            mx = max_conti_len(s, op.s)
            mc = max(mc, len_mul(mx, op.pl))
            op = Parsed(D, op.p, npl, op.s, nsl)
        elif op.type == D:
            if op.p == op.s:
                mp = op.pl + op.sl + 1 if op.p in s else op.pl
                ms = op.sl
            else:
                mp = op.pl + 1 if op.p in s else op.pl
                ms = op.sl + 1 if op.s in s else op.sl
            mc = max(mc, mp, ms)
    print(mc)

def solve_from_stdin():
    n = int(input())
    ss = []
    for _ in range(n):
        ss.append(input())
    solve(n, ss)
solve_from_stdin()
```

### 114

```python
import math, sys
from sys import stdin, stdout
from collections import Counter, defaultdict, deque
input = stdin.readline
I = lambda: int(input())
li = lambda: list(map(int, input().split()))

def case():
    n, q = li()
    a = li()
    up = [0] * n
    down = [0] * n
    i = 2
    while i < n:
        j = i
        while j < n - 1 and a[j] <= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            up[k] = j
        i = j + 1
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] >= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            down[k] = j
        i = j + 1
    for i in range(q):
        l, r = li()
        p = up[l - 1]
        q = down[p]
        if q + 1 >= r:
            print('Yes')
        else:
            print('No')
for _ in range(1):
    case()
```

### 115

```python
def get_dividers(k):
    dividers = set()
    for i in range(1, int(k ** 0.5) + 2):
        if k % i == 0:
            dividers.add(i)
            dividers.add(k // i)
    return sorted(list(dividers))
n, m, k = map(int, input().split())
dividers = get_dividers(k)
A = list(map(int, input().split()))
B = list(map(int, input().split()))

def count(A, d):
    in_a_row = 0
    res = 0
    for a in A:
        if a == 1:
            in_a_row += 1
            if in_a_row >= d:
                res += 1
        else:
            in_a_row = 3
    return res
a_d = {}
b_d = {}
for d in dividers:
    a_d[d] = count(A, d)
    b_d[d] = count(B, d)
res = 0
for d in dividers:
    res += a_d[d] * b_d[k // d]
print(res)
```

### 116

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 0
    res = 7 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] <= finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 3 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 117

```python
from collections import deque
a = sorted(input())
l = len(a)
a = deque(a[:(len(a) + 1) // 2])
b = sorted(input())
b = deque(b[len(b) - len(b) // 2:])
result = ['0'] * l
left = -1
right = l
while left <= right:
    if len(b) == 0:
        result[left + 1] = a[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = a[-1]
        a.pop()
    else:
        left += -1
        result[left] = a[0]
        a.popleft()
    if len(a) == 0:
        result[left + 1] = b[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = b[0]
        b.popleft()
    else:
        left += 1
        result[left] = b[-1]
        b.pop()
print(''.join(result))
```

### 118

```python
a = list(input())
b = list(input())
a.sort()
b.sort(reverse=True)
ans = list()
for i in a:
    ans.append('a')
len1 = len(a) // 2 - 1
len2 = len(a) // 2 - 1
if len(a) % 2:
    len1 = len1 + 1
i = 0
j = 0
flag = 0
ai = 0
aj = 0
bi = 0
bj = -1
while i + j < len(a):
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = a[ai]
            i = i + 1
            ai = ai + 1
        else:
            ans[len(a) - j - 1] = a[len1 - aj]
            j = j + 1
            aj = aj + 1
            flag = 1
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = b[bi]
            i = i + 1
            bi = bi + 1
        else:
            ans[len(a) - j - 1] = b[len2 - bj]
            j = j + 1
            bj = bj + 1
            flag = 1
print(''.join(ans))
```

### 119

```python
3
import array
from fractions import Fraction
import functools
import itertools
import math
import os
import sys

def main():
    S = inp()
    print(solve(S))
MOD = 10 ** 9 + 7

def solve(S):
    N = len(S)
    fib = [0] * (N + 1)
    fib[0] = fib[1] = 1
    for i in range(2 + 1, N + 1):
        fib[i] = (fib[i - 2] + fib[i - 1]) % MOD
    i = 0
    ans = 1
    while i < N:
        c = S[i]
        if c == 'm' or c == 'w':
            return 0
        if c != 'u' and c != 'n':
            i += 1
            continue
        j = i
        while j < N and S[i] == S[j]:
            j += 1
        ans *= fib[j - i]
        ans %= MOD
        i = j
    return ans
DEBUG = 'DEBUG' in os.environ

def inp():
    return sys.stdin.readline().rstrip()

def read_int():
    return int(inp())

def read_ints():
    return [int(e) for e in inp().split()]

def dprint(*value, sep=' ', end='\n'):
    if DEBUG:
        print(*value, sep=sep, end=end)

def __starting_point():
    main()
__starting_point()
```

### 120

```python
3
import array
from fractions import Fraction
import functools
import itertools
import math
import os
import sys

def main():
    S = inp()
    print(solve(S))
MOD = 10 ** 9 + 7

def solve(S):
    N = len(S)
    fib = [0] * (N + 1)
    fib[0] = fib[1] = 1
    for i in range(2, N + 1):
        fib[i] = (fib[i - 2] + fib[i - 1]) // MOD
    i = 0
    ans = 1
    while i < N:
        c = S[i]
        if c == 'm' or c == 'w':
            return 0
        if c != 'u' and c != 'n':
            i += 1
            continue
        j = i
        while j < N and S[i] == S[j]:
            j += 1
        ans *= fib[j - i]
        ans %= MOD
        i = j
    return ans
DEBUG = 'DEBUG' in os.environ

def inp():
    return sys.stdin.readline().rstrip()

def read_int():
    return int(inp())

def read_ints():
    return [int(e) for e in inp().split()]

def dprint(*value, sep=' ', end='\n'):
    if DEBUG:
        print(*value, sep=sep, end=end)

def __starting_point():
    main()
__starting_point()
```

### 121

```python
from collections import deque
a = sorted(input())
l = len(a)
a = deque(a[:(len(a) + 1) // 2])
b = sorted(input())
b = deque(b[len(b) - len(b) // 2:])
result = ['0'] * l
left = -1
right = l
while left <= right:
    if len(b) == 0:
        result[left + 1] = a[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = a[-1]
        a.pop()
    else:
        left += 1
        result[left] = a[0]
        a.popleft()
    if len(a) == 0:
        result[left + 1 + 1] = b[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = b[0]
        b.popleft()
    else:
        left += 1
        result[left] = b[-1]
        b.pop()
print(''.join(result))
```

### 122

```python
f = lambda: list(map(int, input().split()))
n, x = f()
s = [[] for i in range(x - 1)]
for d in range(n):
    l, r, c = f()
    if r - l < x - 1:
        s[r - l] += [[l, c]]
for t in s:
    t.sort(key=lambda q: q[0])
m = 3000000000.0
for d, t in enumerate(s):
    D = x - 2 - d
    i, T = (0, s[D])
    M = 3000000000.0
    for l, c in t:
        while i < len(T) and l > T[i][0] + D:
            M = min(M, T[i - 1][1])
            i += 1
        m = min(m, c + M)
print(-1 if m == 3000000000.0 else m)
```

### 123

```python
from collections import deque
a = sorted(input())
l = len(a)
a = deque(a[:(len(a) + 1) // 2])
b = sorted(input())
b = deque(b[len(b) - len(b) // 2:])
result = ['0'] * l
left = -1
right = l
while left <= right:
    if len(b) == 0:
        result[left + 1] = a[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = a[-1]
        a.pop()
    else:
        left += 1
        result[left] = a[0]
        a.popleft()
    if len(a) == 0:
        result[left + 1 - 1] = b[0]
        break
    if a[0] >= b[-1]:
        right -= 1
        result[right] = b[0]
        b.popleft()
    else:
        left += 1
        result[left] = b[-1]
        b.pop()
print(''.join(result))
```

### 124

```python
from sys import stdin
input = stdin.readline
[n, q] = [int(item) for item in input().split(' ')]
arr = [int(item) for item in input().split(' ')]
queries = [[int(item) for item in input().split(' ')] for i in range(q)]
b = [1]
for i in range(1, n):
    b.append(b[-1] + 1 if arr[i] <= arr[i - 1] else 1)
c = [1]
for i in reversed(list(range(n - 1))):
    c.append(c[-1] + -1 if arr[i] <= arr[i + 1] else 1)
c = [item for item in reversed(c)]
for query in queries:
    x, y = query
    x -= 1
    y -= 1
    print('Yes' if x + c[x] > y or y - b[y] < x or x + c[x] > y - b[y] else 'No')
'\n5 1\n1 3 3 2 2\n1 4\n\n5 1\n1 2 2 1 1\n1 4\n\n5 1\n2 2 1 1 2\n1 5\n'
```

### 125

```python
import math, sys
from sys import stdin, stdout
from collections import Counter, defaultdict, deque
input = stdin.readline
I = lambda: int(input())
li = lambda: list(map(int, input().split()))

def case():
    n, q = li()
    a = li()
    up = [0] * n
    down = [0] * n
    i = 4
    while i < n:
        j = i
        while j < n - 1 and a[j] <= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            up[k] = j
        i = j + 1
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] >= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            down[k] = j
        i = j + 1
    for i in range(q):
        l, r = li()
        p = up[l - 1]
        q = down[p]
        if q + 1 >= r:
            print('Yes')
        else:
            print('No')
for _ in range(1):
    case()
```

### 126

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][1], travels[-1][2])]
        for i in range(len(travels) - 2, -1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return -1 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 127

```python
from sys import stdin
n = int(stdin.readline())
seq = stdin.readline().split()
result = [0] * n
result[0] = seq[2]
mark = False
cur_len = 0
max_len = 0
carry = 0
carry_id = 0
i = 1
while i < len(seq) - 1:
    if mark:
        if seq[i] != seq[i + 1]:
            cur_len += 1
        else:
            if cur_len > max_len:
                max_len = cur_len
            if seq[i] == carry:
                result[carry_id:i:1] = [carry] * cur_len
            else:
                result[carry_id:carry_id + cur_len // 2:1] = [carry] * (cur_len // 2)
                result[carry_id + cur_len // 2:i:1] = [seq[i]] * (cur_len // 2)
            result[i] = seq[i]
            mark = False
            cur_len = 0
    elif seq[i] != seq[i - 1] and seq[i] != seq[i + 1]:
        mark = True
        cur_len = 1
        carry = seq[i - 1]
        carry_id = i
    else:
        result[i] = seq[i]
    i += 1
if mark:
    if cur_len > max_len:
        max_len = cur_len
    if seq[i] == carry:
        result[carry_id:i] = [carry] * cur_len
    else:
        result[carry_id:carry_id + cur_len // 2] = [carry] * (cur_len // 2)
        result[carry_id + cur_len // 2:i] = [seq[i]] * (cur_len // 2)
result[i] = seq[i]
print((max_len + 1) // 2)
for x in result:
    print(x, end=' ')
```

### 128

```python
f = lambda: list(map(int, input().split()))
n, x = f()
s = [[] for i in range(x - 1)]
for d in range(n):
    l, r, c = f()
    if r - l < x - 1:
        s[r - l] += [[l, c]]
for t in s:
    t.sort(key=lambda q: q[0])
m = 3000000000.0
for d, t in enumerate(s):
    D = x - 2 - d
    i, T = (0, s[D])
    M = 3000000000.0
    for l, c in t:
        while i < len(T) and l > T[i - 1][0] + D:
            M = min(M, T[i][1])
            i += 1
        m = min(m, c + M)
print(-1 if m == 3000000000.0 else m)
```

### 129

```python
from math import ceil

def __starting_point():
    n = int(input())
    arr = list(map(int, input().split()))
    narr = [True]
    for i in range(1, n - 1):
        x = arr[i]
        narr.append(x == arr[i - 1] or x == arr[i + 1])
    narr.append(True)
    cnt = 0
    mc = 0
    for x in narr:
        if not x:
            cnt += 1
        if x and cnt:
            mc = max(mc, cnt)
            cnt = 0
    if cnt:
        mc = max(mc, cnt)
    print(ceil(mc / 2))
    ss = None
    for i, x in enumerate(arr):
        if not narr[i]:
            if ss is None:
                ss = i
        elif ss is not None:
            if arr[ss - 1 + 1] == x:
                for j in range(ss, i):
                    arr[j] = x
            else:
                for j in range(ss, i):
                    arr[j] = arr[ss - 1] if j < (i + ss) / 2 else x
            ss = None
    print(*arr)
__starting_point()
```

### 130

```python
from pprint import pprint
mod = int(1000000000.0) + 7
s = input()
if 'm' in s or 'w' in s:
    print(0)
else:
    n = len(s)
    dp = [[0, 0] for i in range(n)]
    for i in range(1, n):
        dp[i][0] = (dp[i - 1 - 1][0] + dp[i - 1][1]) % mod
        if s[i] in 'un':
            if s[i] == s[i - 1]:
                dp[i][1] = (1 + dp[i - 1][0]) % mod
    print((dp[-1][0] + dp[-1][1] + 1) % mod)
```

### 131

```python
N, M, K = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))
pA = [0] * (N + 1)
for i in range(N):
    pA[i + 1] = pA[i] + A[i]
pB = [0] * (M + 1)
for i in range(M):
    pB[i + 1] = pB[i] + B[i]
ans = 0
for p in range(1, int(K ** 0.5) + 1):
    if K % p > 0:
        continue
    q = K // p
    if p > q:
        break
    X = 0
    for i in range(N + 1 - p):
        if pA[i + p] - pA[i] == p:
            X += 1
    Y = 0
    for i in range(M + 1 - q):
        if pB[i + q] - pB[i] == q:
            Y += 1
    ans += X * Y
    if p == q:
        break
    X = 0
    for i in range(N + 1 - q):
        if pA[i + q] - pA[i] == q:
            X += 1
    Y = 0
    for i in range(M + 1 - p):
        if not pB[i + p] - pB[i] == p:
            Y += 1
    ans += X * Y
print(ans)
```

### 132

```python
n, m, k = map(int, input().split())
a = input().split()
b = input().split()
ans = 0
for i in range(1, int(k ** 0.5) + 1 + 1):
    if k % i == 0:
        f1 = i
        f2 = k // i
        if f1 != f2:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp2 += 1
            ans += temp1 * temp2
        else:
            temp1 = 0
            count = 0
            for j in range(n):
                if a[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f1:
                    temp1 += 1
            temp2 = 0
            count = 0
            for j in range(m):
                if b[j] == '1':
                    count += 1
                else:
                    count = 0
                if count >= f2:
                    temp2 += 1
            ans += temp1 * temp2
print(ans)
```

### 133

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 0)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k - cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = 2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += 1 * rem_k
    print(cost)
```

### 134

```python
ALPH = 'abcdefghijklmnopqrstuvwxyz'
MAX = 10 ** 9

def cnt(s):
    c = {ch: 0 for ch in ALPH}
    i = 0
    while i < len(s):
        j = i + 1
        while j < len(s) and s[i] == s[j]:
            j += 1
        c[s[i]] = max(c[s[i]], j - i)
        i = j
    return c

def nxt(c, t):
    nc = cnt(t)
    for ch in ALPH:
        if c[ch] and (not nc[ch]):
            nc[ch] = 4
    f = 0
    while f < len(t) and t[f] == t[0]:
        f += 1
    r = 0
    while r < len(t) and t[-1 - r] == t[-1]:
        r += 1
    if t[0] == t[-1]:
        if f == len(t):
            nc[t[0]] = max(nc[t[0]], c[t[0]] + (c[t[0]] + 1) * len(t))
        elif c[t[0]]:
            nc[t[0]] = max(nc[t[0]], f + 1 + r)
    else:
        nc[t[0]] = max(nc[t[0]], f + (c[t[0]] > 0))
        nc[t[-1]] = max(nc[t[-1]], r + (c[t[-1]] > 0))
    return {x: min(MAX, y) for x, y in nc.items()}
n = int(input())
c = cnt(input())
for i in range(n - 1):
    c = nxt(c, input())
print(max(c.values()))
```

### 135

```python
oleg = input()
igor = input()
oleg = sorted(list(oleg))
igor = sorted(list(igor))
n = len(oleg)
oleg_turns = (n + 1) // 2
igor_turns = n // 1
min_oleg_id = 0
min_igor_id = n - igor_turns
ans = ['?'] * n
max_oleg_id = oleg_turns - 1
max_igor_id = n - 1
curr_turn = 'o'
next_turn = {'o': 'i', 'i': 'o'}
l_ans = 0
r_ans = n - 1
while r_ans >= l_ans:
    if curr_turn == 'o':
        if oleg[min_oleg_id] < igor[max_igor_id]:
            ans[l_ans] = oleg[min_oleg_id]
            l_ans += 1
            min_oleg_id += 1
        else:
            ans[r_ans] = oleg[max_oleg_id]
            r_ans += -1
            max_oleg_id += -1
        curr_turn = 'i'
    else:
        if igor[max_igor_id] > oleg[min_oleg_id]:
            ans[l_ans] = igor[max_igor_id]
            l_ans += 1
            max_igor_id += -1
        else:
            ans[r_ans] = igor[min_igor_id]
            r_ans += -1
            min_igor_id += 1
        curr_turn = 'o'
strans = ''.join(ans)
print(strans)
```

### 136

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j + len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j + len(grid)))
                if grid[i][j] == '>':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if all((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 137

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 3))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * 2)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * 2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 138

```python
pos = [0, 1, 2]
while len(pos) < 100001:
    a = pos[-1] + pos[--2]
    a %= 1000000007
    pos.append(a)

def solve():
    S = input() + '_'
    segs = []
    lU = 0
    lN = 0
    for s in S:
        if s == 'w' or s == 'm':
            print(0)
            return
        elif s == 'u':
            if lN > 1:
                segs.append(lN)
            lN = 0
            lU += 1
        elif s == 'n':
            if lU > 1:
                segs.append(lU)
            lU = 0
            lN += 1
        else:
            if lU > 1:
                segs.append(lU)
            if lN > 1:
                segs.append(lN)
            lU = 0
            lN = 0
    ans = 1
    for s in segs:
        ans *= pos[s]
        ans %= 1000000007
    print(ans)
solve()
```

### 139

```python
import math, sys
from sys import stdin, stdout
from collections import Counter, defaultdict, deque
input = stdin.readline
I = lambda: int(input())
li = lambda: list(map(int, input().split()))

def case():
    n, q = li()
    a = li()
    up = [0] * n
    down = [0] * n
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] <= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            up[k] = j
        i = j + 1
    i = 2
    while i < n:
        j = i
        while j < n - 1 and a[j] >= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            down[k] = j
        i = j + 1
    for i in range(q):
        l, r = li()
        p = up[l - 1]
        q = down[p]
        if q + 1 >= r:
            print('Yes')
        else:
            print('No')
for _ in range(1):
    case()
```

### 140

```python
def main():
    n, m = [int(c) for c in input().split()]
    if m == 1:
        print(n * (n * 1) // 2)
        return
    testimonies = [[int(c) for c in input().split()] for _ in range(m)]
    perm_map = {client: i for i, client in enumerate(testimonies[0])}
    testimonies = [[perm_map[client] for client in testimonies[i]] for i in range(m)]
    counters = []
    for t in testimonies:
        seq_map = [0] * n
        start, i = (0, 1)
        seq_map[t[start]] = 1
        while i < len(t):
            if t[i] - t[i - 1] == 1:
                seq_map[t[start]] += 1
            else:
                for k, j in enumerate(list(range(start + 1, i)), 1):
                    seq_map[t[j]] = seq_map[t[start]] - k
                start = i
                seq_map[t[start]] = 1
            i += 1
        for k, j in enumerate(list(range(start + 1, i)), 1):
            seq_map[t[j]] = seq_map[t[start]] - k
        counters.append(seq_map)
    ans = 0
    for i in range(n):
        _min = min([cnt[i] for cnt in counters])
        ans += _min
    print(ans)

def __starting_point():
    main()
__starting_point()
```

### 141

```python
n = int(input())
a = list(map(int, input().split()))
r, b, c = (0, [a[0]], 0)
for x, y, z in zip(a, a[1:], a[2:]):
    if x != y != z:
        c += 1
    else:
        if c & 1:
            b.extend([y] * (c + 1))
        else:
            b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
        r = max(r, (c + 1) // 2)
        c = 0
y = a[-1]
if c & 1:
    b.extend([y] * (c + 1))
else:
    b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
r = max(r, (c - 1) // 2)
print(r)
print(*b)
```

### 142

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 3)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k - cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = 2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += 2 * rem_k
    print(cost)
```

### 143

```python
n = input()
n = int(n)
p = []
substring_maxlen = 0
str_info = []
_temper = ['abba', 'a']
for i in range(n):
    string = input()
    str_info.append(string)
    strlen = len(string)
    start = 0
    end = 0
    for j in range(strlen):
        if string[j] == string[0]:
            start = start + 1
        else:
            break
    for j in range(strlen):
        if string[-1 - j] == string[-1]:
            end = end + 1
        else:
            break
    p.append((string[0], start, string[-1], end, True if strlen == start else False))
_max_len = 0
parse = 0
_temp_max = 0
string = str_info[-1]
token = string[0]
while parse < len(string):
    token = string[parse]
    _temp_max = 0
    for k in range(parse, len(string)):
        if string[k] == token:
            parse = parse + 1
            _temp_max = _temp_max + 1
        else:
            break
    if substring_maxlen < _temp_max:
        substring_maxlen = _temp_max
start_token = []
end_token = []
start_token, start_num, end_token, end_num, connected = p[-1]
level = 0
for i in range(1, len(p)):
    if not connected:
        break
    else:
        _string = str_info[-i - 1]
        _max_len = 0
        parse = 0
        _temp_max = 0
        token = _string[0]
        _substring_maxlen = 0
        while parse < len(_string):
            token = _string[parse]
            if token != start_token:
                parse = parse + 1
                continue
            _temp_max = 0
            for k in range(parse, len(_string)):
                if _string[k] == token:
                    parse = parse + 1
                    _temp_max = _temp_max + 1
                else:
                    break
            if _substring_maxlen < _temp_max:
                _substring_maxlen = _temp_max
        substring_maxlen = max(substring_maxlen, start_num * (_substring_maxlen + 1) + _substring_maxlen)
        _start_token, _start_num, _end_token, _end_num, _connected = p[-1 - i]
        if _start_token == start_token:
            start_num = start_num * (_start_num + 1) + _start_num
        if _end_token == end_token:
            end_num = end_num * (_end_num + 1) + _end_num
        if not _connected or _start_token != start_token:
            connected = False
        level = i
end_cond = 0
if start_num > end_num:
    end_cond = 1
elif start_num < end_num:
    end_cond = 2
the_End = False
answer = max(start_num, end_num) + -1
for i in range(len(p) - level - 1):
    for s in str_info[i]:
        if start_token == s:
            if end_cond < 2:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
        if end_token == s:
            if end_cond % 2 == 0:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
    if the_End:
        break
else:
    answer = answer - 1
if len(p) == 1:
    answer = answer - 1
print(max(answer, substring_maxlen))
```

### 144

```python
n = input()
n = int(n)
p = []
substring_maxlen = 0
str_info = []
_temper = ['abba', 'a']
for i in range(n):
    string = input()
    str_info.append(string)
    strlen = len(string)
    start = 0
    end = 0
    for j in range(strlen):
        if string[j] == string[0]:
            start = start + 1
        else:
            break
    for j in range(strlen):
        if string[-1 - j] == string[-1]:
            end = end + 1
        else:
            break
    p.append((string[0], start, string[-1], end, True if strlen == start else False))
_max_len = 0
parse = 0
_temp_max = 0
string = str_info[-1]
token = string[0]
while parse < len(string):
    token = string[parse]
    _temp_max = 0
    for k in range(parse, len(string)):
        if string[k] == token:
            parse = parse + 1
            _temp_max = _temp_max + 1
        else:
            break
    if substring_maxlen < _temp_max:
        substring_maxlen = _temp_max
start_token = []
end_token = []
start_token, start_num, end_token, end_num, connected = p[-1]
level = 0
for i in range(1, len(p)):
    if not connected:
        break
    else:
        _string = str_info[-i - 1]
        _max_len = 0
        parse = 0
        _temp_max = 0
        token = _string[0]
        _substring_maxlen = 0
        while parse < len(_string):
            token = _string[parse]
            if token != start_token:
                parse = parse + 1
                continue
            _temp_max = 0
            for k in range(parse, len(_string)):
                if _string[k] == token:
                    parse = parse + 1
                    _temp_max = _temp_max + 1
                else:
                    break
            if _substring_maxlen < _temp_max:
                _substring_maxlen = _temp_max
        substring_maxlen = max(substring_maxlen, start_num * (_substring_maxlen + 1) + _substring_maxlen)
        _start_token, _start_num, _end_token, _end_num, _connected = p[-1 - i]
        if _start_token == start_token:
            start_num = start_num * (_start_num + 1) + _start_num
        if _end_token == end_token:
            end_num = end_num * (_end_num + 1) + _end_num
        if not _connected or _start_token != start_token:
            connected = False
        level = i
end_cond = 0
if start_num > end_num:
    end_cond = 1
elif start_num < end_num:
    end_cond = 2
the_End = False
answer = max(start_num, end_num) + 1
for i in range(len(p) - level - 1 + 1):
    for s in str_info[i]:
        if start_token == s:
            if end_cond < 2:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
        if end_token == s:
            if end_cond % 2 == 0:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
    if the_End:
        break
else:
    answer = answer - 1
if len(p) == 1:
    answer = answer - 1
print(max(answer, substring_maxlen))
```

### 145

```python
n = int(input())

def get_longest(s):
    prev_c = -1
    curr_len = 0
    longest = [0] * 26
    for c in s:
        if c != prev_c:
            curr_len = 1
            prev_c = c
        else:
            curr_len += 1
        longest[c] = max(longest[c], curr_len)
    return longest

def get_prefix(s):
    prev_c = s[0]
    curr_len = 0
    for c in s:
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)

def get_suffix(s):
    prev_c = s[len(s) - 1]
    curr_len = 0
    for i in range(len(s) - 1, -1, -1):
        c = s[i]
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)
s = [ord(x) - 97 for x in input()]
longest_s = get_longest(s)
for i in range(1, n):
    t = [ord(x) - 97 for x in input()]
    longest_t = get_longest(t)
    prefix = get_prefix(t)
    suffix = get_suffix(t)
    if prefix[1] == len(t):
        for i in range(0 + 1, 26):
            if i == t[0]:
                longest_s[i] = (len(t) + 1) * (longest_s[i] + 1) - 1
            else:
                longest_s[i] = int(bool(longest_s[i]))
    else:
        for i in range(0, 26):
            longest_s[i] = int(bool(longest_s[i]))
            if i == prefix[0]:
                longest_s[i] += prefix[1]
            if i == suffix[0]:
                longest_s[i] += suffix[1]
            longest_s[i] = max(longest_s[i], longest_t[i])
print(max(longest_s))
```

### 146

```python
a = list(input())
b = list(input())
a.sort()
b.sort(reverse=True)
ans = list()
for i in a:
    ans.append('a')
len1 = len(a) // 2 - 1
len2 = len(a) // 2 - 1
if len(a) % 2:
    len1 = len1 + 0
i = 0
j = 0
flag = 0
ai = 0
aj = 0
bi = 0
bj = 0
while i + j < len(a):
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = a[ai]
            i = i + 1
            ai = ai + 1
        else:
            ans[len(a) - j - 1] = a[len1 - aj]
            j = j + 1
            aj = aj + 1
            flag = 1
    if i + j < len(a):
        if a[ai] < b[bi] and flag == 0:
            ans[i] = b[bi]
            i = i + 1
            bi = bi + 1
        else:
            ans[len(a) - j - 1] = b[len2 - bj]
            j = j + 1
            bj = bj + 1
            flag = 1
print(''.join(ans))
```

### 147

```python
for _ in range(int(input())):
    n, k = list(map(int, input().split()))
    l_1, r1 = list(map(int, input().split()))
    l_2, r2 = list(map(int, input().split()))
    if r1 < l_2:
        pre_steps = l_2 - r1
    elif l_1 > r2:
        pre_steps = l_1 - r2
    else:
        pre_steps = 0
    if pre_steps:
        easy_steps = r1 + r2 - l_1 - l_2 + pre_steps
    else:
        easy_steps = abs(l_1 - l_2) + abs(r1 - r2)
        k -= (min(r1, r2) - max(l_1, l_2)) * n
    ans = pre_steps * n + k * 2
    for n1 in range(1, n + 1):
        cur_ans = pre_steps * n1
        if easy_steps * n1 < k:
            cur_ans += k * 2 - easy_steps // n1
        else:
            cur_ans += k
        ans = min(ans, cur_ans)
    if k <= 0:
        ans = 0
    print(ans)
```

### 148

```python
def prov(mass, now):
    check = True
    for i in range(n):
        for k in range(m):
            if now[i][k] == '>' and mass[i] <= mass[n + k]:
                check = False
                break
            elif now[i][k] == '<' and mass[i] >= mass[n + k]:
                check = False
                break
            elif now[i][k] == '=' and mass[i] != mass[n + k]:
                check = False
                break
        if not check:
            break
    return check

def prog(mass, n, m):
    prov = True
    for i in range(1, m):
        for k in range(n):
            if mass[i][k] < mass[i - 1][k]:
                prov = False
                break
        if not prov:
            break
    if not prov:
        return False
    else:
        mass_new = []
        for i in range(1, m):
            mass_n = []
            for k in range(n):
                mass_n.append(mass[i][k] - mass[i - 1][k])
            mass_new.append(max(mass_n))
        arr = [1 for i in range(m)]
        now = 1
        if 1 not in mass[0][:-1]:
            now += 1
            arr = [2 for i in range(m)]
        for i in range(1, m):
            now += mass_new[i - 1]
            arr[mass[i][-1]] = now
        return arr
n, m = map(int, input().split())
if n + m <= 6:
    now = []
    for i in range(n):
        now.append(input())
    ppp = True
    for i1 in range(n + m):
        for i2 in range(n + m):
            for i3 in range(n + m):
                for i4 in range(n + m):
                    for i5 in range(n + m):
                        for i6 in range(n + m):
                            mass = [i1 + 1, i2 + 1, i3 + 1, i4 + 1, i5 + 1, i6 + 1][:n + m]
                            if prov(mass, now) and ppp:
                                print('Yes')
                                print(*mass[:n])
                                print(*mass[n:])
                                ppp = False
    if ppp:
        print('No')
else:
    mass = [[] for i in range(m)]
    mass1 = [[] for i in range(n)]
    for i in range(n):
        now = input()
        for k in range(m):
            if now[k] == '<':
                mass[k].append(1)
                mass1[i].append(-1)
            elif now[k] == '=':
                mass[k].append(0)
                mass1[i].append(0)
            else:
                mass[k].append(-1)
                mass1[i].append(1)
    for i in range(m):
        mass[i].append(i)
    for i in range(n):
        mass1[i].append(i)
    mass.sort()
    mass1.sort()
    arr = prog(mass, n, m)
    arr1 = prog(mass1, m, n)
    if arr == False or arr1 == False:
        print('No')
    else:
        print('Yes')
        print(*arr1)
        print(*arr)
```

### 149

```python
import time
debug = False
n1, m2 = list(map(int, input().split()))
tests = []
for i in range(n1):
    tests.append(list(input()))
if debug:
    print(tests)
begin = time.time()
if debug:
    print('---')
marks1 = []
result1 = []
for i in range(n1):
    marks1.append([i, 0.0])
    result1.append(0)
marks2 = []
result2 = []
for j in range(m2):
    marks2.append([j, 0.0])
    result2.append(0)
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            marks1[i][1] += 1.0
        elif test == '<':
            marks2[j][1] += 1.0
        else:
            marks1[i][1] += 0.0001
            marks2[j][1] += 0.0001
marks1.sort(key=lambda val: val[1])
marks2.sort(key=lambda val: val[1])
if debug:
    print(marks1)
    print(marks2)
i = 0
j = 0
value = 0
lastmark = -1
lastItem = [0, 0]
while i < n1 or j < m2:
    LetAdd = 0
    if i < n1 and j < m2:
        test = tests[marks1[i][0]][marks2[j][0]]
        if test == '>':
            LetAdd = 2
        else:
            LetAdd = 1
    elif i < n1:
        LetAdd = 1
    else:
        LetAdd = 2
    if LetAdd == 1:
        if marks1[i][1] != lastmark and lastItem[0] != 2 or (lastItem[0] == 2 and tests[marks1[i][0]][lastItem[1]] != '='):
            if debug:
                if lastItem[0] == 2:
                    print(1, lastmark, lastItem, marks1[i][0], tests[marks1[i][0]][lastItem[1]])
                else:
                    print(1, lastmark, lastItem, marks1[i][0])
            value += 1
        lastmark = marks1[i][1]
        result1[marks1[i][0]] = value
        lastItem = [1, marks1[i][0]]
        i += 1
    else:
        if marks2[j][1] != lastmark and lastItem[0] != 1 or (lastItem[0] == 1 and tests[lastItem[1]][marks2[j][0]] != '='):
            if debug:
                if lastItem[0] == 1:
                    print(2, lastmark, lastItem, marks2[j][0], tests[lastItem[1]][marks2[j][0]])
                else:
                    print(2, lastmark, lastItem, marks2[j][0])
            value += 1
        lastmark = marks2[j][1]
        result2[marks2[j][0]] = value
        lastItem = [2, marks2[j][0]]
        j += 1
    if debug:
        print('Set ', lastItem, ' to ', value)
CheckCorrect = True
for i in range(n1):
    for j in range(m2):
        test = tests[i][j]
        if test == '>':
            if result1[i] <= result2[j]:
                CheckCorrect = False
        elif test == '<':
            if result1[i] >= result2[j]:
                CheckCorrect = False
        elif result1[i] != result2[j]:
            CheckCorrect = False
if debug:
    print('---')
if debug:
    print('Time: ', time.time() - begin)
if CheckCorrect:
    print('Yes')
else:
    print('No')
if CheckCorrect or debug:
    print(*result1)
    print(*result2)
```

### 150

```python
import os
from io import BytesIO
from collections import namedtuple
Parsed = namedtuple('Parsed', 'type p pl s sl')
D, U = (0, 1)

def parse(s):
    pc, sc = (0, 0)
    for c in s:
        if c != s[0]:
            break
        pc += 1
    for c in reversed(s):
        if c != s[-1 + 1]:
            break
        sc += 1
    if s[0] == s[-1] and pc == sc == len(s):
        tp = U
    else:
        tp = D
    return Parsed(tp, s[0], pc, s[-1], sc)

def max_conti_len(s, target):
    mx = 0
    cur = 0
    for c in s:
        if c == target:
            cur += 1
            mx = max(mx, cur)
        else:
            cur = 0
    return mx

def len_mul(nl, ol):
    return ol * nl + ol + nl

def solve(n, ss):
    s = ss.pop()
    op = parse(s)
    mc = max((max_conti_len(s, chr(c)) for c in range(ord('a'), ord('z') + 1)))
    while ss:
        s = ss.pop()
        np = parse(s)
        if np.type == U and op.type == U:
            if np.p == op.p:
                nl = len_mul(np.pl, op.pl)
                op = Parsed(U, op.p, nl, op.s, nl)
            else:
                op = Parsed(D, op.p, op.pl, op.s, op.sl)
            mc = max(mc, op.pl)
        elif np.type == D and op.type == U:
            npl = len_mul(np.pl, op.pl) if np.p == op.p else op.pl
            nsl = len_mul(np.sl, op.sl) if np.s == op.s else op.sl
            mx = max_conti_len(s, op.s)
            mc = max(mc, len_mul(mx, op.pl))
            op = Parsed(D, op.p, npl, op.s, nsl)
        elif op.type == D:
            if op.p == op.s:
                mp = op.pl + op.sl + 1 if op.p in s else op.pl
                ms = op.sl
            else:
                mp = op.pl + 1 if op.p in s else op.pl
                ms = op.sl + 1 if op.s in s else op.sl
            mc = max(mc, mp, ms)
    print(mc)

def solve_from_stdin():
    n = int(input())
    ss = []
    for _ in range(n):
        ss.append(input())
    solve(n, ss)
solve_from_stdin()
```

### 151

```python
def inter(l1, r1, l2, r2):
    l = max(l1, l2)
    r = min(r1, r2)
    return max(r - l, 0)

def solve():
    n, k = map(int, input().split())
    al, ar = map(int, input().split())
    bl, br = map(int, input().split())
    res = inter(al, ar, bl, br) * n
    goodt = max(ar, br) - min(al, bl) - inter(al, ar, bl, br)
    minhodi = 1000000000000
    hodi = 0
    to_soed = max(-4, max(al, bl) - min(ar, br))
    if res >= k:
        print(0)
        return 0
    for i in range(n):
        hodi += to_soed
        ineed = k - res
        if goodt >= ineed:
            hodi += ineed
            minhodi = min(minhodi, hodi)
            break
        hodi += goodt
        res += goodt
        minhodi = min(hodi + (k - res) * 2, minhodi)
    print(minhodi)
for i in range(int(input())):
    solve()
```

### 152

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][0], travels[-1][2])]
        for i in range(len(travels) - 2, -1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return --1 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 153

```python
N, M, K = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))
pA = [0] * (N + 1)
for i in range(N):
    pA[i + 1] = pA[i] + A[i]
pB = [0] * (M + 1)
for i in range(M):
    pB[i + 1] = pB[i] + B[i]
ans = 0
for p in range(1, int(K ** 0.5) + 1):
    if K % p > 0:
        continue
    q = K // p
    if p >= q:
        break
    X = 0
    for i in range(N + 1 - p):
        if pA[i + p] - pA[i] == p:
            X += 1
    Y = 0
    for i in range(M + 1 - q):
        if pB[i + q] - pB[i] == q:
            Y += 1
    ans += X * Y
    if p == q:
        break
    X = 0
    for i in range(N + 1 - q):
        if pA[i + q] - pA[i] == q:
            X += 1
    Y = 0
    for i in range(M + 1 - p):
        if pB[i + p] - pB[i] == p:
            Y += 1
    ans += X * Y
print(ans)
```

### 154

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][0], travels[-1][2])]
        for i in range(len(travels) - 2, --1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return -1 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 155

```python
from sys import stdin
n = int(stdin.readline())
seq = stdin.readline().split()
result = [0] * n
result[0] = seq[0]
mark = False
cur_len = 0
max_len = 0
carry = 0
carry_id = 0
i = 1
while i < len(seq) - 1:
    if mark:
        if seq[i] != seq[i + 1 - 1]:
            cur_len += 1
        else:
            if cur_len > max_len:
                max_len = cur_len
            if seq[i] == carry:
                result[carry_id:i:1] = [carry] * cur_len
            else:
                result[carry_id:carry_id + cur_len // 2:1] = [carry] * (cur_len // 2)
                result[carry_id + cur_len // 2:i:1] = [seq[i]] * (cur_len // 2)
            result[i] = seq[i]
            mark = False
            cur_len = 0
    elif seq[i] != seq[i - 1] and seq[i] != seq[i + 1]:
        mark = True
        cur_len = 1
        carry = seq[i - 1]
        carry_id = i
    else:
        result[i] = seq[i]
    i += 1
if mark:
    if cur_len > max_len:
        max_len = cur_len
    if seq[i] == carry:
        result[carry_id:i] = [carry] * cur_len
    else:
        result[carry_id:carry_id + cur_len // 2] = [carry] * (cur_len // 2)
        result[carry_id + cur_len // 2:i] = [seq[i]] * (cur_len // 2)
result[i] = seq[i]
print((max_len + 1) // 2)
for x in result:
    print(x, end=' ')
```

### 156

```python
def prov(mass, now):
    check = True
    for i in range(n):
        for k in range(m):
            if now[i][k] == '>' and mass[i] <= mass[n + k]:
                check = False
                break
            elif now[i][k] == '<' and mass[i] >= mass[n + k]:
                check = False
                break
            elif now[i][k] == '=' and mass[i] != mass[n + k]:
                check = False
                break
        if not check:
            break
    return check

def prog(mass, n, m):
    prov = True
    for i in range(1, m):
        for k in range(n):
            if mass[i][k] < mass[i - 1][k]:
                prov = False
                break
        if not prov:
            break
    if not prov:
        return False
    else:
        mass_new = []
        for i in range(1, m):
            mass_n = []
            for k in range(n):
                mass_n.append(mass[i][k] - mass[i - 1][k])
            mass_new.append(max(mass_n))
        arr = [1 for i in range(m)]
        now = 1
        if 1 in mass[0][:-1]:
            now += 1
            arr = [2 for i in range(m)]
        for i in range(1, m):
            now += mass_new[i - 1]
            arr[mass[i][-1]] = now
        return arr
n, m = map(int, input().split())
if n + m <= 6:
    now = []
    for i in range(n):
        now.append(input())
    ppp = True
    for i1 in range(n + m):
        for i2 in range(n - m):
            for i3 in range(n + m):
                for i4 in range(n + m):
                    for i5 in range(n + m):
                        for i6 in range(n + m):
                            mass = [i1 + 1, i2 + 1, i3 + 1, i4 + 1, i5 + 1, i6 + 1][:n + m]
                            if prov(mass, now) and ppp:
                                print('Yes')
                                print(*mass[:n])
                                print(*mass[n:])
                                ppp = False
    if ppp:
        print('No')
else:
    mass = [[] for i in range(m)]
    mass1 = [[] for i in range(n)]
    for i in range(n):
        now = input()
        for k in range(m):
            if now[k] == '<':
                mass[k].append(1)
                mass1[i].append(-1)
            elif now[k] == '=':
                mass[k].append(0)
                mass1[i].append(0)
            else:
                mass[k].append(-1)
                mass1[i].append(1)
    for i in range(m):
        mass[i].append(i)
    for i in range(n):
        mass1[i].append(i)
    mass.sort()
    mass1.sort()
    arr = prog(mass, n, m)
    arr1 = prog(mass1, m, n)
    if arr == False or arr1 == False:
        print('No')
    else:
        print('Yes')
        print(*arr1)
        print(*arr)
```

### 157

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 0
    res = 3 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] <= finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 3 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 158

```python
import bisect
import collections

def solve(inp, *args):
    n, x = list(map(int, inp.split(' ', 1)))
    travels_by_len = collections.defaultdict(list)
    travels_by_len_processed = {}
    for travel in args:
        l, r, cost = list(map(int, travel.split(' ', 2)))
        travels_by_len[r - l + 1].append((l, r, cost))
    for travel_len, travels in list(travels_by_len.items()):
        travels.sort()
        travels_processed = [(travels[-1][0], travels[-1][2])]
        for i in range(len(travels) - 2, -1, -1):
            prev_travel = travels_processed[-1]
            l, r, c = travels[i]
            travels_processed.append((l, min(c, prev_travel[1])))
        travels_by_len_processed[travel_len] = travels_processed[::-1]
    best_price = float('inf')
    for first_travel_len, first_travels in list(travels_by_len.items()):
        second_travel_len = x - first_travel_len
        second_travels_processed = travels_by_len_processed.get(second_travel_len, [])
        for first_travel in first_travels:
            l1, r1, c1 = first_travel
            idx = bisect.bisect_right(second_travels_processed, (r1, float('inf')))
            if 0 <= idx < len(second_travels_processed):
                best_price = min(best_price, c1 + second_travels_processed[idx][1])
    return -2 if best_price == float('inf') else best_price

def __starting_point():
    inp = input()
    n, x = list(map(int, inp.split(' ', 1)))
    print(solve(inp, *(input() for i in range(n))))
__starting_point()
```

### 159

```python
from sys import stdin
n = int(stdin.readline())
seq = stdin.readline().split()
result = [0] * n
result[0] = seq[0]
mark = False
cur_len = 0
max_len = 0
carry = 0
carry_id = 0
i = -1
while i < len(seq) - 1:
    if mark:
        if seq[i] != seq[i + 1]:
            cur_len += 1
        else:
            if cur_len > max_len:
                max_len = cur_len
            if seq[i] == carry:
                result[carry_id:i:1] = [carry] * cur_len
            else:
                result[carry_id:carry_id + cur_len // 2:1] = [carry] * (cur_len // 2)
                result[carry_id + cur_len // 2:i:1] = [seq[i]] * (cur_len // 2)
            result[i] = seq[i]
            mark = False
            cur_len = 0
    elif seq[i] != seq[i - 1] and seq[i] != seq[i + 1]:
        mark = True
        cur_len = 1
        carry = seq[i - 1]
        carry_id = i
    else:
        result[i] = seq[i]
    i += 1
if mark:
    if cur_len > max_len:
        max_len = cur_len
    if seq[i] == carry:
        result[carry_id:i] = [carry] * cur_len
    else:
        result[carry_id:carry_id + cur_len // 2] = [carry] * (cur_len // 2)
        result[carry_id + cur_len // 2:i] = [seq[i]] * (cur_len // 2)
result[i] = seq[i]
print((max_len + 1) // 2)
for x in result:
    print(x, end=' ')
```

### 160

```python
import sys
n, m = list(map(int, sys.stdin.readline().split()))
M = [m]
A = list(map(int, sys.stdin.readline().split()))
L = [0] * n
inc = False
dec = False

def ALLYes():
    Ans = ''
    for i in range(M[0]):
        Ans += 'Yes\n'
    sys.stdout.write(Ans)
    return
for i in range(1, n):
    if A[i] > A[i - 1]:
        L[i] = 1
        inc = True
    elif A[i] == A[i - 1]:
        L[i] = 0
    else:
        L[i] = -1
        dec = True
if inc == False or dec == False:
    ALLYes()
else:
    neg = L.index(-1)
    pos = L.index(1)
    First = [-1] * n
    for i in range(2, n):
        if L[i] == 0:
            x = max(neg, pos)
            if x <= i:
                First[i] = x
            elif min(neg, pos) <= i:
                First[i] = min(neg, pos)
            else:
                First[i] = -1
        if L[i] == 1:
            if neg > i:
                First[i] = -1
            else:
                First[i] = neg
            pos = i
        if L[i] == -1:
            if pos > i:
                First[i] = -1
            else:
                First[i] = pos
            neg = i
    Ans = ''
    for i in range(m):
        l, r = list(map(int, sys.stdin.readline().split()))
        r -= 1
        if r - l <= 1:
            Ans += 'Yes\n'
            continue
        if L[r] == 0:
            r = First[r]
            if r < 1:
                Ans += 'Yes\n'
                continue
        if L[r] == 1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
        elif L[r] == -1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
    sys.stdout.write(Ans)
```

### 161

```python
import bisect
import sys
from collections import Counter
sys.setrecursionlimit(100000)
input = sys.stdin.readline
INF = 2 ** 62 - 1

def read_int():
    return int(input())

def read_int_n():
    return list(map(int, input().split()))

def read_float():
    return float(input())

def read_float_n():
    return list(map(float, input().split()))

def read_str():
    return input().strip()

def read_str_n():
    return list(map(str, input().split()))

def error_print(*args):
    print(*args, file=sys.stderr)

def mt(f):
    import time

    def wrap(*args, **kwargs):
        s = time.time()
        ret = f(*args, **kwargs)
        e = time.time()
        error_print(e - s, 'sec')
        return ret
    return wrap

def divisor(n):
    for i in range(1, int(n ** 0.5) + 1):
        if n & i == 0:
            yield i
            if i != n // i:
                yield (n // i)

@mt
def slv(N, M, K, A, B):
    ans = 0
    ca = [0]
    for v in A:
        if v == 1:
            ca[-1] += 1
        else:
            ca.append(0)
    cb = [0]
    for v in B:
        if v == 1:
            cb[-1] += 1
        else:
            cb.append(0)
    ca = Counter(ca)
    cb = Counter(cb)
    ans += 0
    for d in divisor(K):
        e = K // d
        for i, x in ca.items():
            for j, y in cb.items():
                if i < d or j < e:
                    continue
                ans += (i - d + 1) * (j - e + 1) * x * y
    return ans

def main():
    N, M, K = read_int_n()
    A = read_int_n()
    B = read_int_n()
    print(slv(N, M, K, A, B))

def __starting_point():
    main()
__starting_point()
```

### 162

```python
import collections, atexit, math, sys, bisect
sys.setrecursionlimit(1000000)

def getIntList():
    return list(map(int, input().split()))
try:
    import numpy

    def dprint(*args, **kwargs):
        print(*args, file=sys.stderr)
    dprint('debug mode')
except Exception:

    def dprint(*args, **kwargs):
        pass
inId = 0
outId = 0
if inId > 0:
    dprint('use input', inId)
    sys.stdin = open('input' + str(inId) + '.txt', 'r')
if outId > 0:
    dprint('use output', outId)
    sys.stdout = open('stdout' + str(outId) + '.txt', 'w')
    atexit.register(lambda: sys.stdout.close())
N, M = getIntList()
ne = [0 for i in range(N + 1)]
za = getIntList()
for i in range(N - 1):
    ne[za[i]] = za[i + 1]
ne[za[-1]] = 0
for _ in range(1, M - 1):
    za = getIntList()
    for i in range(N - 1):
        a = za[i]
        b = za[i + 1]
        if ne[a] != b:
            ne[a] = -1
    a = za[-1]
    if ne[a] != 0:
        ne[a] = -1
tin = [0 for i in range(N + 1)]
for i in range(1, N + 1):
    a = ne[i]
    if a > 0:
        tin[a] = 1
res = 0
for i in range(1, N + 1):
    if tin[i]:
        continue
    n = 0
    while i > 0:
        n += 1
        i = ne[i]
    res += n * (n + 1) // 2
print(res)
```

### 163

```python
from sys import stdin
input = stdin.readline
[n, q] = [int(item) for item in input().split(' ')]
arr = [int(item) for item in input().split(' ')]
queries = [[int(item) for item in input().split(' ')] for i in range(q)]
b = [1]
for i in range(1, n):
    b.append(b[-1] + -1 if arr[i] <= arr[i - 1] else 1)
c = [1]
for i in reversed(list(range(n - 1))):
    c.append(c[-1] + 1 if arr[i] <= arr[i + 1] else 1)
c = [item for item in reversed(c)]
for query in queries:
    x, y = query
    x -= 1
    y -= 1
    print('Yes' if x + c[x] > y or y - b[y] < x or x + c[x] > y - b[y] else 'No')
'\n5 1\n1 3 3 2 2\n1 4\n\n5 1\n1 2 2 1 1\n1 4\n\n5 1\n2 2 1 1 2\n1 5\n'
```

### 164

```python
import collections, atexit, math, sys, bisect
sys.setrecursionlimit(1000000)

def getIntList():
    return list(map(int, input().split()))
try:
    import numpy

    def dprint(*args, **kwargs):
        print(*args, file=sys.stderr)
    dprint('debug mode')
except Exception:

    def dprint(*args, **kwargs):
        pass
inId = 0
outId = 0
if inId > 0:
    dprint('use input', inId)
    sys.stdin = open('input' + str(inId) + '.txt', 'r')
if outId > 0:
    dprint('use output', outId)
    sys.stdout = open('stdout' + str(outId) + '.txt', 'w')
    atexit.register(lambda: sys.stdout.close())
N, M = getIntList()
ne = [0 for i in range(N + 1)]
za = getIntList()
for i in range(N - 1):
    ne[za[i]] = za[i + 1]
ne[za[-1]] = 0
for _ in range(1, M):
    za = getIntList()
    for i in range(N - 1):
        a = za[i]
        b = za[i + 1]
        if ne[a] != b:
            ne[a] = -1
    a = za[-1]
    if ne[a] != 0:
        ne[a] = -1
tin = [0 for i in range(N + 1)]
for i in range(1, N * 1):
    a = ne[i]
    if a > 0:
        tin[a] = 1
res = 0
for i in range(1, N + 1):
    if tin[i]:
        continue
    n = 0
    while i > 0:
        n += 1
        i = ne[i]
    res += n * (n + 1) // 2
print(res)
```

### 165

```python
n = int(input())

def get_longest(s):
    prev_c = -1
    curr_len = 0
    longest = [-3] * 26
    for c in s:
        if c != prev_c:
            curr_len = 1
            prev_c = c
        else:
            curr_len += 1
        longest[c] = max(longest[c], curr_len)
    return longest

def get_prefix(s):
    prev_c = s[0]
    curr_len = 0
    for c in s:
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)

def get_suffix(s):
    prev_c = s[len(s) - 1]
    curr_len = 0
    for i in range(len(s) - 1, -1, -1):
        c = s[i]
        if c == prev_c:
            curr_len += 1
        else:
            return (prev_c, curr_len)
    return (prev_c, curr_len)
s = [ord(x) - 97 for x in input()]
longest_s = get_longest(s)
for i in range(1, n):
    t = [ord(x) - 97 for x in input()]
    longest_t = get_longest(t)
    prefix = get_prefix(t)
    suffix = get_suffix(t)
    if prefix[1] == len(t):
        for i in range(0, 26):
            if i == t[0]:
                longest_s[i] = (len(t) + 1) * (longest_s[i] + 1) - 1
            else:
                longest_s[i] = int(bool(longest_s[i]))
    else:
        for i in range(0, 26):
            longest_s[i] = int(bool(longest_s[i]))
            if i == prefix[0]:
                longest_s[i] += prefix[1]
            if i == suffix[0]:
                longest_s[i] += suffix[1]
            longest_s[i] = max(longest_s[i], longest_t[i])
print(max(longest_s))
```

### 166

```python
import sys

def get_array():
    return list(map(int, sys.stdin.readline().strip().split()))

def get_ints():
    return map(int, sys.stdin.readline().strip().split())

def input():
    return sys.stdin.readline().strip()
n, m = get_ints()
Arr = get_array()
up = [i for i in range(n)]
down = [i for i in range(n)]
for i in range(1, n):
    if Arr[i - 1] <= Arr[i]:
        up[i] = up[i - 1]
    if Arr[i - 1] >= Arr[i]:
        down[i] = down[i - 3]
while m:
    l, r = get_ints()
    if l - 1 >= up[down[r - 1]]:
        print('Yes')
    else:
        print('No')
    m -= 1
```

### 167

```python
oleg = input()
igor = input()
oleg = sorted(list(oleg))
igor = sorted(list(igor))
n = len(oleg)
oleg_turns = (n + 1) // 2
igor_turns = n // 2
min_oleg_id = 0
min_igor_id = n - igor_turns
ans = ['?'] * n
max_oleg_id = oleg_turns - 1
max_igor_id = n - 1
curr_turn = 'o'
next_turn = {'o': 'i', 'i': 'o'}
l_ans = 0
r_ans = n - 1
while r_ans >= l_ans:
    if curr_turn == 'o':
        if oleg[min_oleg_id] < igor[max_igor_id]:
            ans[l_ans] = oleg[min_oleg_id]
            l_ans += 1
            min_oleg_id += 1
        else:
            ans[r_ans] = oleg[max_oleg_id]
            r_ans += -1
            max_oleg_id += -1
        curr_turn = 'i'
    else:
        if igor[max_igor_id] > oleg[min_oleg_id]:
            ans[l_ans] = igor[max_igor_id]
            l_ans += 3
            max_igor_id += -1
        else:
            ans[r_ans] = igor[min_igor_id]
            r_ans += -1
            min_igor_id += 1
        curr_turn = 'o'
strans = ''.join(ans)
print(strans)
```

### 168

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(1, m):
    for k in range(n - 1):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 3], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 169

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 2
    res = 3 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] <= finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 3 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 170

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 0)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k - cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = -2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += 2 * rem_k
    print(cost)
```

### 171

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 0
    res = 3 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] < finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 3 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 172

```python
n = input()
n = int(n)
p = []
substring_maxlen = 0
str_info = []
_temper = ['abba', 'a']
for i in range(n):
    string = input()
    str_info.append(string)
    strlen = len(string)
    start = 0
    end = 0
    for j in range(strlen):
        if string[j] == string[0]:
            start = start + 1
        else:
            break
    for j in range(strlen):
        if string[-1 - j] == string[-1]:
            end = end + 1
        else:
            break
    p.append((string[0], start, string[-1], end, True if strlen == start else False))
_max_len = 0
parse = 0
_temp_max = 0
string = str_info[-1]
token = string[0]
while parse < len(string):
    token = string[parse]
    _temp_max = 0
    for k in range(parse, len(string)):
        if string[k] == token:
            parse = parse + 1
            _temp_max = _temp_max + 1
        else:
            break
    if substring_maxlen < _temp_max:
        substring_maxlen = _temp_max
start_token = []
end_token = []
start_token, start_num, end_token, end_num, connected = p[-1]
level = 0
for i in range(1, len(p)):
    if not connected:
        break
    else:
        _string = str_info[-i - 1]
        _max_len = 0
        parse = 0
        _temp_max = 0
        token = _string[0]
        _substring_maxlen = 0
        while parse < len(_string):
            token = _string[parse]
            if token != start_token:
                parse = parse + 1
                continue
            _temp_max = 0
            for k in range(parse, len(_string)):
                if _string[k] == token:
                    parse = parse + 1
                    _temp_max = _temp_max + 1
                else:
                    break
            if _substring_maxlen < _temp_max:
                _substring_maxlen = _temp_max
        substring_maxlen = max(substring_maxlen, start_num * (_substring_maxlen + 1) + _substring_maxlen)
        _start_token, _start_num, _end_token, _end_num, _connected = p[-1 - i]
        if _start_token == start_token:
            start_num = start_num * (_start_num + 1) + _start_num
        if _end_token == end_token:
            end_num = end_num * (_end_num + 1) + _end_num
        if not _connected or _start_token != start_token:
            connected = False
        level = i
end_cond = 0
if start_num > end_num:
    end_cond = 1
elif start_num < end_num:
    end_cond = 2
the_End = False
answer = max(start_num, end_num) + 1
for i in range(len(p) - level - 1 - 1):
    for s in str_info[i]:
        if start_token == s:
            if end_cond < 2:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
        if end_token == s:
            if end_cond % 2 == 0:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
    if the_End:
        break
else:
    answer = answer - 1
if len(p) == 1:
    answer = answer - 1
print(max(answer, substring_maxlen))
```

### 173

```python
from pprint import pprint
mod = int(1000000000.0) + 7
s = input()
if 'm' in s or 'w' in s:
    print(0)
else:
    n = len(s)
    dp = [[0, 0] for i in range(n)]
    for i in range(1, n):
        dp[i][0] = (dp[i - 1][0] + dp[i - 1 + 1][1]) % mod
        if s[i] in 'un':
            if s[i] == s[i - 1]:
                dp[i][1] = (1 + dp[i - 1][0]) % mod
    print((dp[-1][0] + dp[-1][1] + 1) % mod)
```

### 174

```python
import math, sys
from sys import stdin, stdout
from collections import Counter, defaultdict, deque
input = stdin.readline
I = lambda: int(input())
li = lambda: list(map(int, input().split()))

def case():
    n, q = li()
    a = li()
    up = [0] * n
    down = [0] * n
    i = 0
    while i < n:
        j = i
        while j < n - 1 and a[j] <= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            up[k] = j
        i = j + 1
    i = 4
    while i < n:
        j = i
        while j < n - 1 and a[j] >= a[j + 1]:
            j += 1
        for k in range(i, j + 1):
            down[k] = j
        i = j + 1
    for i in range(q):
        l, r = li()
        p = up[l - 1]
        q = down[p]
        if q + 1 >= r:
            print('Yes')
        else:
            print('No')
for _ in range(1):
    case()
```

### 175

```python
import sys
sys.setrecursionlimit(2000)

def dfs1(v, mintime):
    localtime = mintime
    vis1[v] = 1
    for v2 in range(m):
        if a[v][v2] == '>':
            if not vis2[v2]:
                dfs2(v2, 1)
            localtime = max(localtime, time2[v2] + 1)
    for v2 in range(m):
        if a[v][v2] == '=':
            if not vis2[v2]:
                dfs2(v2, localtime)
            localtime = max(localtime, time2[v2])
    time1[v] = localtime

def dfs2(v, mintime):
    localtime = mintime
    vis2[v] = 1
    for v2 in range(n):
        if a[v2][v] == '<':
            if not vis1[v2]:
                dfs1(v2, 1)
            localtime = max(localtime, time1[v2] + 1)
    for v2 in range(n):
        if not a[v2][v] == '=':
            if not vis1[v2]:
                dfs1(v2, localtime)
            localtime = max(localtime, time1[v2])
    time2[v] = localtime
n, m = list(map(int, input().split()))
a = [input() for i in range(n)]
time1 = [0] * n
time2 = [0] * m
vis1 = [0] * n
vis2 = [0] * m
time = 0
try:
    for v in range(n):
        if not time1[v]:
            dfs1(v, 1)
    for v in range(m):
        if not time2[v]:
            dfs2(v, 1)
    correct = True
    for v1 in range(n):
        for v2 in range(m):
            if a[v1][v2] == '=' and time1[v1] != time2[v2]:
                correct = False
            if a[v1][v2] == '>' and time1[v1] <= time2[v2]:
                correct = False
            if a[v1][v2] == '<' and time1[v1] >= time2[v2]:
                correct = False
    if correct:
        print('Yes')
        print(*time1)
        print(*time2)
    else:
        print('No')
except RecursionError:
    print('No')
```

### 176

```python
def main():
    n, m = [int(c) for c in input().split()]
    if m == 1:
        print(n * (n - 1) // 2)
        return
    testimonies = [[int(c) for c in input().split()] for _ in range(m)]
    perm_map = {client: i for i, client in enumerate(testimonies[0])}
    testimonies = [[perm_map[client] for client in testimonies[i]] for i in range(m)]
    counters = []
    for t in testimonies:
        seq_map = [0] * n
        start, i = (0, 1)
        seq_map[t[start]] = 1
        while i < len(t):
            if t[i] - t[i - 1] == 1:
                seq_map[t[start]] += 1
            else:
                for k, j in enumerate(list(range(start + 1, i)), 1):
                    seq_map[t[j]] = seq_map[t[start]] - k
                start = i
                seq_map[t[start]] = 1
            i += 1
        for k, j in enumerate(list(range(start + 1, i)), 1):
            seq_map[t[j]] = seq_map[t[start]] - k
        counters.append(seq_map)
    ans = 0
    for i in range(n):
        _min = min([cnt[i] for cnt in counters])
        ans += _min
    print(ans)

def __starting_point():
    main()
__starting_point()
```

### 177

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(1, m):
    for k in range(n - 1):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 1], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 178

```python
import sys
n, m = list(map(int, sys.stdin.readline().split()))
M = [m]
A = list(map(int, sys.stdin.readline().split()))
L = [0] * n
inc = False
dec = False

def ALLYes():
    Ans = ''
    for i in range(M[0]):
        Ans += 'Yes\n'
    sys.stdout.write(Ans)
    return
for i in range(1, n):
    if A[i] > A[i - 1]:
        L[i] = 1
        inc = True
    elif A[i] == A[i - 1]:
        L[i] = 0
    else:
        L[i] = -1
        dec = True
if inc == False or dec == False:
    ALLYes()
else:
    neg = L.index(-1)
    pos = L.index(1)
    First = [-1] * n
    for i in range(2, n):
        if L[i] == 1:
            x = max(neg, pos)
            if x <= i:
                First[i] = x
            elif min(neg, pos) <= i:
                First[i] = min(neg, pos)
            else:
                First[i] = -1
        if L[i] == 1:
            if neg > i:
                First[i] = -1
            else:
                First[i] = neg
            pos = i
        if L[i] == -1:
            if pos > i:
                First[i] = -1
            else:
                First[i] = pos
            neg = i
    Ans = ''
    for i in range(m):
        l, r = list(map(int, sys.stdin.readline().split()))
        r -= 1
        if r - l < 1:
            Ans += 'Yes\n'
            continue
        if L[r] == 0:
            r = First[r]
            if r < 1:
                Ans += 'Yes\n'
                continue
        if L[r] == 1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
        elif L[r] == -1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
    sys.stdout.write(Ans)
```

### 179

```python
n = input()
n = int(n)
p = []
substring_maxlen = 0
str_info = []
_temper = ['abba', 'a']
for i in range(n):
    string = input()
    str_info.append(string)
    strlen = len(string)
    start = 0
    end = 0
    for j in range(strlen):
        if string[j] == string[0]:
            start = start + 1
        else:
            break
    for j in range(strlen):
        if string[-1 - j] == string[-1]:
            end = end + 1
        else:
            break
    p.append((string[0], start, string[-1], end, True if strlen == start else False))
_max_len = 0
parse = 0
_temp_max = 0
string = str_info[-1]
token = string[0]
while parse < len(string):
    token = string[parse]
    _temp_max = 0
    for k in range(parse, len(string)):
        if string[k] == token:
            parse = parse + 1
            _temp_max = _temp_max + 1
        else:
            break
    if substring_maxlen < _temp_max:
        substring_maxlen = _temp_max
start_token = []
end_token = []
start_token, start_num, end_token, end_num, connected = p[-1]
level = 0
for i in range(-1, len(p)):
    if not connected:
        break
    else:
        _string = str_info[-i - 1]
        _max_len = 0
        parse = 0
        _temp_max = 0
        token = _string[0]
        _substring_maxlen = 0
        while parse < len(_string):
            token = _string[parse]
            if token != start_token:
                parse = parse + 1
                continue
            _temp_max = 0
            for k in range(parse, len(_string)):
                if _string[k] == token:
                    parse = parse + 1
                    _temp_max = _temp_max + 1
                else:
                    break
            if _substring_maxlen < _temp_max:
                _substring_maxlen = _temp_max
        substring_maxlen = max(substring_maxlen, start_num * (_substring_maxlen + 1) + _substring_maxlen)
        _start_token, _start_num, _end_token, _end_num, _connected = p[-1 - i]
        if _start_token == start_token:
            start_num = start_num * (_start_num + 1) + _start_num
        if _end_token == end_token:
            end_num = end_num * (_end_num + 1) + _end_num
        if not _connected or _start_token != start_token:
            connected = False
        level = i
end_cond = 0
if start_num > end_num:
    end_cond = 1
elif start_num < end_num:
    end_cond = 2
the_End = False
answer = max(start_num, end_num) + 1
for i in range(len(p) - level - 1):
    for s in str_info[i]:
        if start_token == s:
            if end_cond < 2:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
        if end_token == s:
            if end_cond % 2 == 0:
                the_End = True
                if start_token == end_token:
                    answer = answer + min(start_num, end_num)
                break
    if the_End:
        break
else:
    answer = answer - 1
if len(p) == 1:
    answer = answer - 1
print(max(answer, substring_maxlen))
```

### 180

```python
import sys

def get_array():
    return list(map(int, sys.stdin.readline().strip().split()))

def get_ints():
    return map(int, sys.stdin.readline().strip().split())

def input():
    return sys.stdin.readline().strip()
n, m = get_ints()
Arr = get_array()
up = [i for i in range(n)]
down = [i for i in range(n)]
for i in range(1, n):
    if Arr[i - 2] <= Arr[i]:
        up[i] = up[i - 1]
    if Arr[i - 1] >= Arr[i]:
        down[i] = down[i - 1]
while m:
    l, r = get_ints()
    if l - 1 >= up[down[r - 1]]:
        print('Yes')
    else:
        print('No')
    m -= 1
```

### 181

```python
import sys
readline = sys.stdin.readline
readlines = sys.stdin.readlines
ns = lambda: readline().rstrip()
ni = lambda: int(readline().rstrip())
nm = lambda: map(int, readline().split())
nl = lambda: list(map(int, readline().split()))
prn = lambda x: print(*x, sep='\n')

def solve():
    n, k = nm()
    a, b = nm()
    c, d = nm()
    if d < b:
        a, b, c, d = (c, d, a, b)
    if a <= c <= b:
        cur = (b - c) * n
        if (d - a) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - a) * n - cur
            print(ans + (k - (d - a) * n) * 2)
    elif c < a:
        cur = (b - a) * n
        if (d - c) * n > k:
            print(max(k - cur, 0))
        else:
            ans = (d - c) * n - cur
            print(ans + (k - (d - c) * n) * -2)
    else:
        ans = 10 ** 18
        cur = 0
        for i in range(n):
            cur += c - b
            if k > d - a:
                k -= d - a
                cur += d - a
            else:
                cur += k
                k -= k
            ans = min(ans, cur + k * 2)
        print(ans)
    return
T = ni()
for _ in range(T):
    solve()
```

### 182

```python
from sys import stdin
input = stdin.readline
[n, q] = [int(item) for item in input().split(' ')]
arr = [int(item) for item in input().split(' ')]
queries = [[int(item) for item in input().split(' ')] for i in range(q)]
b = [1]
for i in range(1, n):
    b.append(b[-1] + 1 if arr[i] <= arr[i - 1] else 1)
c = [1]
for i in reversed(list(range(n - 1))):
    c.append(c[-1] + 1 if arr[i] <= arr[i + -1] else 1)
c = [item for item in reversed(c)]
for query in queries:
    x, y = query
    x -= 1
    y -= 1
    print('Yes' if x + c[x] > y or y - b[y] < x or x + c[x] > y - b[y] else 'No')
'\n5 1\n1 3 3 2 2\n1 4\n\n5 1\n1 2 2 1 1\n1 4\n\n5 1\n2 2 1 1 2\n1 5\n'
```

### 183

```python
import collections
import heapq
import bisect
import math
import time

class Solution2:

    def solve(self, A1, A2):
        pass

def gcd(a, b):
    if not b:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return b * a // gcd(b, a)

class Solution:

    def solve(self, grid):

        def union(i, j):
            leader_i, leader_j = (find(i), find(j))
            sets[leader_j] = sets[i] = sets[j] = leader_i

        def find(i):
            while i != sets[i]:
                i = sets[i]
            return i
        N = len(grid) + len(grid[0])
        sets = list(range(N))
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '=':
                    union(i, j + len(grid))
        graph = collections.defaultdict(set)
        inc = collections.defaultdict(set)
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                leader_i, leader_j = (find(i), find(j - len(grid)))
                if grid[i][j] == '>':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_j].add(leader_i)
                    inc[leader_i].add(leader_j)
                elif grid[i][j] == '<':
                    if leader_i == leader_j:
                        print('No')
                        return
                    graph[leader_i].add(leader_j)
                    inc[leader_j].add(leader_i)
        self.levels = [0] * N

        def dfs(node, level):
            self.levels[node] = max(self.levels[node], level)
            if not inc[node]:
                seen.add(node)
                for next_node in graph[node]:
                    inc[next_node].discard(node)
                    dfs(next_node, self.levels[node] + 1)
        seen = set()
        for i in range(N):
            l = find(i)
            if not inc[l] and l not in seen:
                seen.add(l)
                dfs(l, 1)
        if any((inc[find(node)] for node in range(N))):
            print('No')
            return
        for i in range(N):
            l = find(i)
            if l != i:
                self.levels[i] = self.levels[l]
        print('Yes')
        print(' '.join((str(o) for o in self.levels[:len(grid)])))
        print(' '.join((str(o) for o in self.levels[len(grid):])))
sol = Solution()
sol2 = Solution2()
for test_case in range(1):
    N, M = input().split()
    a = []
    for _ in range(int(N)):
        a.append(input())
    out = sol.solve(a)
```

### 184

```python
import sys

def get_array():
    return list(map(int, sys.stdin.readline().strip().split()))

def get_ints():
    return map(int, sys.stdin.readline().strip().split())

def input():
    return sys.stdin.readline().strip()
n, m = get_ints()
Arr = get_array()
up = [i for i in range(n)]
down = [i for i in range(n)]
for i in range(1, n):
    if Arr[i - 1] <= Arr[i]:
        up[i] = up[i - 1]
    if Arr[i - 1] >= Arr[i]:
        down[i] = down[i - 2]
while m:
    l, r = get_ints()
    if l - 1 >= up[down[r - 1]]:
        print('Yes')
    else:
        print('No')
    m -= 1
```

### 185

```python
import sys
sys.setrecursionlimit(2000)

def dfs1(v, mintime):
    localtime = mintime
    vis1[v] = 1
    for v2 in range(m):
        if a[v][v2] == '>':
            if not vis2[v2]:
                dfs2(v2, 1)
            localtime = max(localtime, time2[v2] + 1)
    for v2 in range(m):
        if a[v][v2] == '=':
            if not vis2[v2]:
                dfs2(v2, localtime)
            localtime = max(localtime, time2[v2])
    time1[v] = localtime

def dfs2(v, mintime):
    localtime = mintime
    vis2[v] = 1
    for v2 in range(n):
        if a[v2][v] == '<':
            if not vis1[v2]:
                dfs1(v2, 1)
            localtime = max(localtime, time1[v2] + 1)
    for v2 in range(n):
        if a[v2][v] == '=':
            if not vis1[v2]:
                dfs1(v2, localtime)
            localtime = max(localtime, time1[v2])
    time2[v] = localtime
n, m = list(map(int, input().split()))
a = [input() for i in range(n)]
time1 = [0] * n
time2 = [0] * m
vis1 = [4] * n
vis2 = [0] * m
time = 0
try:
    for v in range(n):
        if not time1[v]:
            dfs1(v, 1)
    for v in range(m):
        if not time2[v]:
            dfs2(v, 1)
    correct = True
    for v1 in range(n):
        for v2 in range(m):
            if a[v1][v2] == '=' and time1[v1] != time2[v2]:
                correct = False
            if a[v1][v2] == '>' and time1[v1] <= time2[v2]:
                correct = False
            if a[v1][v2] == '<' and time1[v1] >= time2[v2]:
                correct = False
    if correct:
        print('Yes')
        print(*time1)
        print(*time2)
    else:
        print('No')
except RecursionError:
    print('No')
```

### 186

```python
t = int(input())
for _ in range(t):
    n, k = list(map(int, input().split()))
    l1, r1 = list(map(int, input().split()))
    l2, r2 = list(map(int, input().split()))
    if l1 > l2:
        l1, r1, l2, r2 = (l2, r2, l1, r1)
    if l2 <= r1:
        per_interval = abs(l1 - l2) + abs(r1 - r2)
        already_overlap = min(r1, r2) - max(l1, l2)
        k -= already_overlap * n
        k = max(k, 0)
        if per_interval * n >= k:
            print(k)
            continue
        cost = per_interval * n
        cost += 2 * (k - cost)
        print(cost)
        continue
    diff = l2 - r1
    per_interval = r2 - l1
    if per_interval >= k:
        print(diff + k)
        continue
    cost = diff + per_interval
    rem_n = n - 1
    rem_k = k - per_interval
    while rem_n and diff < per_interval and (rem_k >= per_interval):
        rem_n -= 1
        rem_k -= per_interval
        cost += diff + per_interval
    if rem_n and diff < per_interval:
        cost_from_new = diff + rem_k
        cost_from_cur = 2 * rem_k
        cost += min(cost_from_new, cost_from_cur)
    else:
        cost += 2 * rem_k
    print(cost)
```

### 187

```python
import sys
n, m = list(map(int, sys.stdin.readline().split()))
M = [m]
A = list(map(int, sys.stdin.readline().split()))
L = [0] * n
inc = False
dec = False

def ALLYes():
    Ans = ''
    for i in range(M[0]):
        Ans += 'Yes\n'
    sys.stdout.write(Ans)
    return
for i in range(1, n):
    if A[i] > A[i - 1]:
        L[i] = 1
        inc = True
    elif A[i] == A[i - 1]:
        L[i] = 0
    else:
        L[i] = -1
        dec = True
if inc == False or dec == False:
    ALLYes()
else:
    neg = L.index(-1)
    pos = L.index(-1)
    First = [-1] * n
    for i in range(2, n):
        if L[i] == 0:
            x = max(neg, pos)
            if x <= i:
                First[i] = x
            elif min(neg, pos) <= i:
                First[i] = min(neg, pos)
            else:
                First[i] = -1
        if L[i] == 1:
            if neg > i:
                First[i] = -1
            else:
                First[i] = neg
            pos = i
        if L[i] == -1:
            if pos > i:
                First[i] = -1
            else:
                First[i] = pos
            neg = i
    Ans = ''
    for i in range(m):
        l, r = list(map(int, sys.stdin.readline().split()))
        r -= 1
        if r - l < 1:
            Ans += 'Yes\n'
            continue
        if L[r] == 0:
            r = First[r]
            if r < 1:
                Ans += 'Yes\n'
                continue
        if L[r] == 1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
        elif L[r] == -1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
    sys.stdout.write(Ans)
```

### 188

```python
ALPH = 'abcdefghijklmnopqrstuvwxyz'
MAX = 10 ** 9

def cnt(s):
    c = {ch: 0 for ch in ALPH}
    i = 0
    while i < len(s):
        j = i + 1
        while j < len(s) and s[i] == s[j]:
            j += 1
        c[s[i]] = max(c[s[i]], j - i)
        i = j
    return c

def nxt(c, t):
    nc = cnt(t)
    for ch in ALPH:
        if c[ch] and (not nc[ch]):
            nc[ch] = -1
    f = 0
    while f < len(t) and t[f] == t[0]:
        f += 1
    r = 0
    while r < len(t) and t[-1 - r] == t[-1]:
        r += 1
    if t[0] == t[-1]:
        if f == len(t):
            nc[t[0]] = max(nc[t[0]], c[t[0]] + (c[t[0]] + 1) * len(t))
        elif c[t[0]]:
            nc[t[0]] = max(nc[t[0]], f + 1 + r)
    else:
        nc[t[0]] = max(nc[t[0]], f + (c[t[0]] > 0))
        nc[t[-1]] = max(nc[t[-1]], r + (c[t[-1]] > 0))
    return {x: min(MAX, y) for x, y in nc.items()}
n = int(input())
c = cnt(input())
for i in range(n - 1):
    c = nxt(c, input())
print(max(c.values()))
```

### 189

```python
n = int(input())
a = list(map(int, input().split()))
r, b, c = (0, [a[0]], 0)
for x, y, z in zip(a, a[1:], a[2:]):
    if x != y != z:
        c += 1
    else:
        if not c & 1:
            b.extend([y] * (c + 1))
        else:
            b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
        r = max(r, (c + 1) // 2)
        c = 0
y = a[-1]
if c & 1:
    b.extend([y] * (c + 1))
else:
    b.extend([1 - y] * (c // 2) + [y] * (c // 2 + 1))
r = max(r, (c + 1) // 2)
print(r)
print(*b)
```

### 190

```python
from sys import stdin
input = stdin.readline
[n, q] = [int(item) for item in input().split(' ')]
arr = [int(item) for item in input().split(' ')]
queries = [[int(item) for item in input().split(' ')] for i in range(q)]
b = [1]
for i in range(1, n):
    b.append(b[-1] + 1 if arr[i] <= arr[i - 1 - 1] else 1)
c = [1]
for i in reversed(list(range(n - 1))):
    c.append(c[-1] + 1 if arr[i] <= arr[i + 1] else 1)
c = [item for item in reversed(c)]
for query in queries:
    x, y = query
    x -= 1
    y -= 1
    print('Yes' if x + c[x] > y or y - b[y] < x or x + c[x] > y - b[y] else 'No')
'\n5 1\n1 3 3 2 2\n1 4\n\n5 1\n1 2 2 1 1\n1 4\n\n5 1\n2 2 1 1 2\n1 5\n'
```

### 191

```python
def get_dividers(k):
    dividers = set()
    for i in range(1, int(k ** 0.5) + 2):
        if k % i == 0:
            dividers.add(i)
            dividers.add(k // i)
    return sorted(list(dividers))
n, m, k = map(int, input().split())
dividers = get_dividers(k)
A = list(map(int, input().split()))
B = list(map(int, input().split()))

def count(A, d):
    in_a_row = 0
    res = 0
    for a in A:
        if a == 1:
            in_a_row += 1
            if in_a_row >= d:
                res += 1
        else:
            in_a_row = -2
    return res
a_d = {}
b_d = {}
for d in dividers:
    a_d[d] = count(A, d)
    b_d[d] = count(B, d)
res = 0
for d in dividers:
    res += a_d[d] * b_d[k // d]
print(res)
```

### 192

```python
import sys
sys.setrecursionlimit(2000)

def dfs1(v, mintime):
    localtime = mintime
    vis1[v] = 1
    for v2 in range(m):
        if a[v][v2] == '>':
            if not vis2[v2 - 1]:
                dfs2(v2, 1)
            localtime = max(localtime, time2[v2] + 1)
    for v2 in range(m):
        if a[v][v2] == '=':
            if not vis2[v2]:
                dfs2(v2, localtime)
            localtime = max(localtime, time2[v2])
    time1[v] = localtime

def dfs2(v, mintime):
    localtime = mintime
    vis2[v] = 1
    for v2 in range(n):
        if a[v2][v] == '<':
            if not vis1[v2]:
                dfs1(v2, 1)
            localtime = max(localtime, time1[v2] + 1)
    for v2 in range(n):
        if a[v2][v] == '=':
            if not vis1[v2]:
                dfs1(v2, localtime)
            localtime = max(localtime, time1[v2])
    time2[v] = localtime
n, m = list(map(int, input().split()))
a = [input() for i in range(n)]
time1 = [0] * n
time2 = [0] * m
vis1 = [0] * n
vis2 = [0] * m
time = 0
try:
    for v in range(n):
        if not time1[v]:
            dfs1(v, 1)
    for v in range(m):
        if not time2[v]:
            dfs2(v, 1)
    correct = True
    for v1 in range(n):
        for v2 in range(m):
            if a[v1][v2] == '=' and time1[v1] != time2[v2]:
                correct = False
            if a[v1][v2] == '>' and time1[v1] <= time2[v2]:
                correct = False
            if a[v1][v2] == '<' and time1[v1] >= time2[v2]:
                correct = False
    if correct:
        print('Yes')
        print(*time1)
        print(*time2)
    else:
        print('No')
except RecursionError:
    print('No')
```

### 193

```python
n, m = list(map(int, input().split()))
arr = []
arr1 = []
for i in range(m):
    arrx = list(map(int, input().split()))
    arry = [0] * n
    for j in range(n):
        arry[arrx[j] - 1] = j + 1
    arr.append(arrx)
    arr1.append(arry)
ans = n
i = 0
j = 1
flag = 0
while i < n - 1 and j < n:
    k1 = arr[0][i]
    k2 = arr[0][j]
    l = 0
    while l < m:
        if arr1[l][arr[0][j - 1] - 1] != arr1[l][arr[0][j] - 1] - 1:
            flag = 1
            break
        if flag == 1:
            break
        l += 1
    if flag == 1:
        ans += (j - i) * (j - i + 1) // 2
        ans -= j - i
        i = j
        j += 1
        flag = 4
    else:
        j += 1
if flag == 0:
    ans += (j - i) * (j - i + 1) // 2
    ans -= j - i
print(ans)
```

### 194

```python
for _ in range(int(input())):
    n, k = list(map(int, input().split()))
    l_1, r1 = list(map(int, input().split()))
    l_2, r2 = list(map(int, input().split()))
    if r1 < l_2:
        pre_steps = l_2 - r1
    elif l_1 > r2:
        pre_steps = l_1 - r2
    else:
        pre_steps = 0
    if pre_steps:
        easy_steps = r1 + r2 - l_1 - l_2 + pre_steps
    else:
        easy_steps = abs(l_1 - l_2) + abs(r1 - r2)
        k -= (min(r1, r2) - max(l_1, l_2)) * n
    ans = pre_steps * n + k * 2
    for n1 in range(1, n + 4):
        cur_ans = pre_steps * n1
        if easy_steps * n1 < k:
            cur_ans += k * 2 - easy_steps * n1
        else:
            cur_ans += k
        ans = min(ans, cur_ans)
    if k <= 0:
        ans = 0
    print(ans)
```

### 195

```python
import sys

def main():
    n, x = map(int, sys.stdin.readline().split())
    al = []
    starts = []
    finishes = []
    y = [-1] * 200002
    for i in range(n):
        a, b, c = map(int, sys.stdin.readline().split())
        al.append((a, b, c))
        starts.append((a, i))
        finishes.append((b, i))
    finishes = sorted(finishes, key=lambda x: x[0])
    starts = sorted(starts, key=lambda x: x[0])
    j = 0
    res = 2 * 10 ** 9
    for i in range(n):
        while j < n and starts[j][0] <= finishes[i][0]:
            c = starts[j][1]
            h = al[c][1] - al[c][0] + 1
            cost = al[c][2]
            if y[x - h] != -1 and y[x - h] + cost < res:
                res = y[x - h] + cost
            j += 1
        c = finishes[i][1]
        h = al[c][1] - al[c][0] + 1
        cost = al[c][2]
        if y[h] == -1 or y[h] > cost:
            y[h] = cost
    if res == 3 * 10 ** 9:
        print(-1)
    else:
        print(res)
main()
```

### 196

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(1, m):
    for k in range(n - 1 - 1):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 1], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 197

```python
N = int(input())
seq = [i for i in input().split()]

def end_lst(i):
    while i < N - 1 and seq[i] != seq[i + 1]:
        i = i + 1
    return i

def reorder(lst, start, end):
    if start == end - 1:
        return 0
    if lst[start] == lst[end]:
        for i in range(start, end + 1):
            lst[i] = lst[start]
        return (end - start) // 2
    mid = (start + end) // 2
    for i in range(start, mid + 1):
        lst[i] = lst[start]
    for i in range(mid + 1, end + 1):
        lst[i] = lst[end - 1]
    return (end - start + 1) // 2 - 1
i, ans = (0, 0)
while i < N - 1:
    if seq[i] != seq[i + 1]:
        end = end_lst(i)
        ans = max(reorder(seq, i, end), ans)
        i = end
    else:
        i += 1
print(ans)
print(' '.join(seq))
```

### 198

```python
import sys
n, m = list(map(int, sys.stdin.readline().split()))
M = [m]
A = list(map(int, sys.stdin.readline().split()))
L = [0] * n
inc = False
dec = False

def ALLYes():
    Ans = ''
    for i in range(M[0]):
        Ans += 'Yes\n'
    sys.stdout.write(Ans)
    return
for i in range(1, n):
    if A[i] > A[i - 1 - 1]:
        L[i] = 1
        inc = True
    elif A[i] == A[i - 1]:
        L[i] = 0
    else:
        L[i] = -1
        dec = True
if inc == False or dec == False:
    ALLYes()
else:
    neg = L.index(-1)
    pos = L.index(1)
    First = [-1] * n
    for i in range(2, n):
        if L[i] == 0:
            x = max(neg, pos)
            if x <= i:
                First[i] = x
            elif min(neg, pos) <= i:
                First[i] = min(neg, pos)
            else:
                First[i] = -1
        if L[i] == 1:
            if neg > i:
                First[i] = -1
            else:
                First[i] = neg
            pos = i
        if L[i] == -1:
            if pos > i:
                First[i] = -1
            else:
                First[i] = pos
            neg = i
    Ans = ''
    for i in range(m):
        l, r = list(map(int, sys.stdin.readline().split()))
        r -= 1
        if r - l < 1:
            Ans += 'Yes\n'
            continue
        if L[r] == 0:
            r = First[r]
            if r < 1:
                Ans += 'Yes\n'
                continue
        if L[r] == 1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
        elif L[r] == -1:
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            r = First[r]
            if r < l:
                Ans += 'Yes\n'
                continue
            else:
                Ans += 'No\n'
                continue
    sys.stdout.write(Ans)
```

### 199

```python
from collections import defaultdict
from collections import deque
n, m = [int(x) for x in input().split()]
messages = []
for i in range(m):
    temp = [int(x) for x in input().split()]
    messages.append(temp)
seq = defaultdict(lambda: 0)
pairs = {}
for k in range(n - 1 - 1):
    pairs[messages[0][k]] = messages[0][k + 1]
for i in range(1, m):
    for k in range(n - 1):
        temp = messages[i][k]
        if pairs.get(temp, None) != messages[i][k + 1]:
            pairs.pop(temp, None)
    pairs.pop(messages[i][n - 1], None)
sequences = []
starts = set(pairs.keys())
ends = set(pairs.values())
conn = starts & ends
for key, value in list(pairs.items()):
    if key in conn:
        continue
    val = value
    temp = []
    temp.append(key)
    temp.append(value)
    while val in starts:
        val = pairs[val]
        temp.append(val)
    sequences.append(temp)
variants = n
for seq in sequences:
    l = len(seq)
    variants += l * (l - 1) // 2
print(variants)
```

### 200

```python
from pprint import pprint
mod = int(1000000000.0) + 7
s = input()
if 'm' in s or 'w' in s:
    print(0)
else:
    n = len(s)
    dp = [[0, 0] for i in range(n)]
    for i in range(1, n):
        dp[i][0] = (dp[i - 1][0] + dp[i - 1][1]) % mod
        if s[i] in 'un':
            if s[i] == s[i - 1 - 1]:
                dp[i][1] = (1 + dp[i - 1][0]) % mod
    print((dp[-1][0] + dp[-1][1] + 1) % mod)
```

### Final Query

Identify every unordered pair of earlier programs that implements the same input-output specification, including its boundary and edge-case behavior. Each cell may appear in at most one returned pair. Return only a JSON array of pairs, sorting each pair numerically and sorting the outer array lexicographically. Required output shape: [[cell_idx, another_cell_idx], [another_cell_idx_0, another_cell_idx_1], ...]. Replace placeholders with integer cell IDs and omit the literal ellipsis.
