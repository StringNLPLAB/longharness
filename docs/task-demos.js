/* Complete illustrative contexts, with a guided reasoning path for each task. */
(function () {
  const code = (text) => `<pre><code>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  const record = (id, body) => ({ id, body });
  const route = (items) => `<ol class="walk-route">${items.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join('')}</ol>`;
  const examples = [
    {
      task: 'constraints', query: 'Find every person who satisfies all three conditions.',
      detail: '<ol class="walk-conditions"><li>Currently works nights</li><li>Usually uses public transit</li><li>Enjoys eating fruit</li></ol>',
      context: 'Six documents from the illustrative context',
      cards: [
        record('D-041', '<p><strong>Maya Chen</strong> still <mark>covers the night shift</mark>.</p>'),
        record('D-688', '<p>Iris’s night shifts ended last spring. <strong>Leo</strong> still <mark>covers nights</mark>.</p>'),
        record('D-218', '<p><strong>Maya Chen</strong> <mark>rides the city bus home most mornings</mark>.</p>'),
        record('D-454', '<p><strong>Leo</strong> <mark>plans to take the bus next month</mark>.</p>'),
        record('D-341', '<p><strong>Maya Chen</strong> finishes <mark>a bowl of watermelon after lunch</mark>.</p>'),
        record('D-099', '<p><strong>Leo</strong> keeps <mark>a watermelon-scented candle</mark> at his desk.</p>'),
      ],
      steps: [
        { title: 'Read the query', text: 'Every condition must be supported for the same person. The documents contain close matches, so finding the right words is only the start.', result: '<span class="walk-result-label">Required</span><strong>Nights ∩ transit ∩ fruit</strong>' },
        { title: 'Check current night work', good: ['D-041', 'D-688'], text: '<strong>D-041</strong> supports Maya; <strong>D-688</strong> supports Leo. Iris’s past night work does not qualify her. Keep Maya and Leo as candidates.', result: route([['Maya Chen', '✓ Nights'], ['Leo', '✓ Nights']]) },
        { title: 'Verify the transit habit', good: ['D-218'], bad: ['D-454'], text: '<strong>D-218</strong> describes Maya’s usual bus commute. <strong>D-454</strong> only describes a future plan: it does not establish that Leo currently uses public transit.', result: route([['Maya Chen', '✓ Transit'], ['Leo', 'Not established']]) },
        { title: 'Verify the fruit evidence', good: ['D-341'], bad: ['D-099'], text: '<strong>D-341</strong> describes Maya eating fruit. The watermelon in <strong>D-099</strong> is a candle scent, so the document does not establish Leo’s eating habits.', result: route([['Maya Chen', '✓ Fruit'], ['Leo', 'Not established']]) },
        { title: 'Combine the evidence', good: ['D-041', 'D-218', 'D-341'], bad: ['D-454', 'D-099'], text: '<strong>Maya Chen</strong> satisfies all three conditions in this example. Selecting Leo from the words “nights,” “bus,” and “watermelon” would ignore what the documents actually say.', result: '<span class="walk-result-label">Illustrative answer</span><strong>Maya Chen</strong><span>D-041 + D-218 + D-341</span>' },
      ],
    },
    {
      task: 'pairs', query: 'Which pair of programs is functionally equivalent?',
      detail: '<p>Compare behavior across inputs, including boundary cases. Similar-looking code may compute different functions.</p>',
      context: 'All five programs from the illustrative context',
      cards: [
        record('Cell 173', code('chosen = []\nfor x in numbers:\n    if x >= target:\n        chosen.append(x)\nprint(len(chosen))')),
        record('Cell 088', code('count = 0\nfor x in numbers:\n    if x >= target:\n        count += 1\nprint(count)')),
        record('Cell 026', code('count = 0\nfor x in numbers:\n    if x > target:\n        count += 1\nprint(count)')),
        record('Cell 041', code('kept = []\nfor x in numbers:\n    if x not in kept:\n        kept.append(x)\nprint(kept)')),
        record('Cell 188', code('kept = []\nfor x in numbers:\n    if numbers.count(x) == 1:\n        kept.append(x)\nprint(kept)')),
      ],
      steps: [
        { title: 'Group by behavior', text: 'Cells 173, 088, and 026 count values relative to a target. Cells 041 and 188 both remove some repeated values. Compare within these candidate groups.', result: '<span class="walk-result-label">Candidate groups</span><strong>173 · 088 · 026</strong><strong>041 · 188</strong>' },
        { title: 'Test the equality boundary', good: ['Cell 173', 'Cell 088'], bad: ['Cell 026'], text: 'For <code>numbers = [1, 3, 3, 5]</code> and <code>target = 3</code>, Cells 173 and 088 include both 3s. Cell 026 uses a strict comparison and excludes them.', result: route([['Cell 173', '3'], ['Cell 088', '3'], ['Cell 026', '1']]) },
        { title: 'Test repeated values', good: ['Cell 041'], bad: ['Cell 188'], goodLabel: 'Keeps one copy', badLabel: 'Keeps only singletons', text: 'With <code>numbers = [2, 2, 5]</code>, Cell 041 keeps the first occurrence of each value. Cell 188 removes every occurrence of a repeated value. These functions differ.', result: route([['Cell 041', '[2, 5]'], ['Cell 188', '[5]']]) },
        { title: 'Establish the equivalent pair', good: ['Cell 173', 'Cell 088'], text: 'Both programs count every element satisfying <code>x >= target</code>. One builds a list and takes its length; the other increments a counter. This argument covers all inputs, beyond the test cases.', result: '<span class="walk-result-label">Illustrative answer</span><strong>Cell 088 + Cell 173</strong><span>Same function, different implementations</span>' },
      ],
    },
    {
      task: 'tracing', query: 'What is the final result, and which records support it?',
      detail: code('values = [3, 8, 11, 14]\nkey = sum(x % 2 == 0 for x in values)\nxs = {2: [1, 2], 3: [1, 2, 3]}[key]\nresult = [x + 1 for x in xs]'),
      context: 'Six recorded computations · inputs and outputs shown',
      cards: [
        record('Cell 17', code('def f(xs):\n    return [x + 1 for x in xs]') + '<p class="walk-io">Input: <code>[1, 2]</code><br>Output: <code>[2, 3]</code></p>'),
        record('Cell 78', code('def h(xs):\n    return [x + 1 for x in xs[:2]]') + '<p class="walk-io">Input: <code>[1, 2, 99]</code><br>Output: <code>[2, 3]</code></p>'),
        record('Cell 89', code('def f(xs):\n    return sum(x % 2 == 0 for x in xs)') + '<p class="walk-io">Input: <code>[3, 8, 11, 14]</code><br>Output: <code>2</code></p>'),
        record('Cell 52', code('def g(xs):\n    return sum(x >= 8 for x in xs)') + '<p class="walk-io">Input: <code>[3, 8, 11, 14]</code><br>Output: <code>3</code></p>'),
        record('Cell 104', code('def w(xs):\n    return [1 + x for x in xs]') + '<p class="walk-io">Input: <code>[1, 2, 3]</code><br>Output: <code>[2, 3, 4]</code></p>'),
        record('Cell 21', code('def v(xs):\n    return [x + 1 for x in xs[:3]]') + '<p class="walk-io">Input: <code>[1, 2, 3, 99]</code><br>Output: <code>[2, 3, 4]</code></p>'),
      ],
      steps: [
        { title: 'Read the dependency', text: 'The first recovered value becomes a dictionary key. That key determines the input for the next retrieval. Both the computation and its recorded input must match.', result: route([['Recover', 'key'], ['Route', 'xs'], ['Recover', 'result']]) },
        { title: 'Recover the first value', good: ['Cell 89'], bad: ['Cell 52'], text: '<strong>Cell 89</strong> counts even numbers on the required input, yielding 2. Cell 52 uses the same input but counts values at least 8, so it is not a valid match.', result: '<span class="walk-result-label">First supporting record: Cell 89</span><strong>key = 2</strong>' },
        { title: 'Route the next retrieval', good: ['Cell 89', 'Cell 17'], text: 'Substitute the recovered key into the dictionary. Now search for an add-one computation recorded on <code>[1, 2]</code>. The required input was only known after the first step.', result: route([['key', '2'], ['xs', '[1, 2]'], ['Next record', 'Cell 17']]) },
        { title: 'Verify the final record', good: ['Cell 17'], bad: ['Cell 78', 'Cell 104', 'Cell 21'], text: '<strong>Cell 17</strong> has the right function and input. Cell 78 happens to return the same output but truncates its input. Cell 104 has the right function on a different input; Cell 21 also truncates.', result: '<span class="walk-result-label">Illustrative answer</span><strong>result = [2, 3]</strong><span>Evidence: Cell 89 → Cell 17</span>' },
        { title: 'See how an error propagates', bad: ['Cell 52', 'Cell 104'], text: 'Using Cell 52 incorrectly gives <code>key = 3</code>. That routes the search to <code>[1, 2, 3]</code> and Cell 104. The second retrieval is consistent with the wrong branch, but the final answer is wrong.', result: route([['Wrong key', '3'], ['Wrong branch', '[1, 2, 3]'], ['Wrong result', '[2, 3, 4]']]) },
      ],
    },
    {
      task: 'memos', query: 'One memo conflicts with the established relationships. Which one?',
      detail: '<p>Read the packet together. A memo can look plausible on its own while contradicting information distributed across other memos.</p>',
      context: 'All four memos from the illustrative context',
      cards: [
        record('M-660', '<ul><li><mark>Ms. Lee teaches Algebra 101.</mark></li><li>Ms. Diaz handles transcripts for Art 101.</li><li>Biology 201 uses the Yellow Course Form.</li></ul>'),
        record('M-346', '<ul><li><mark>Ms. Lee’s assigned teaching slot is Monday at 9:00 a.m.</mark></li><li>Physics 101 uses Class Chat A.</li><li>The Math Office approves Dr. Patel’s course changes.</li></ul>'),
        record('M-502', '<ul><li>Ms. Brown approves changes for English 201.</li><li>Mr. Carter’s archive is in Cabinet B.</li><li><mark>The assigned teaching slot for the teacher of Algebra 101 is Friday at 2:00 p.m.</mark></li></ul>'),
        record('M-059', '<ul><li>The art class meets on Tuesday morning.</li><li>Chemistry 101 uses the Green Course Form.</li><li><mark>The assigned teaching slot for the teacher of Biology 101 is Friday at 2:00 p.m.</mark></li></ul>'),
      ],
      steps: [
        { title: 'Read the claims together', text: 'M-502 and M-059 both mention a teacher assigned Friday at 2:00 p.m. A shared time does not identify a contradiction: first resolve which teacher each claim refers to.', result: '<span class="walk-result-label">Question to resolve</span><strong>Whose teaching slot?</strong>' },
        { title: 'Resolve the teacher', good: ['M-660'], text: '<strong>M-660</strong> identifies the teacher of Algebra 101 as Ms. Lee. Use this relationship to resolve the indirect reference in M-502.', result: route([['Course', 'Algebra 101'], ['Teacher', 'Ms. Lee']]) },
        { title: 'Recover the assigned slot', good: ['M-660', 'M-346'], text: '<strong>M-346</strong> assigns Ms. Lee to Monday at 9:00 a.m. Combining the two memos establishes the expected slot for Algebra 101’s teacher.', result: route([['Course', 'Algebra 101'], ['Teacher', 'Ms. Lee'], ['Slot', 'Monday · 9 a.m.']]) },
        { title: 'Find the conflict', good: ['M-660', 'M-346'], bad: ['M-502'], badLabel: 'Conflicting claim', text: '<strong>M-502</strong> assigns the same teacher to Friday at 2:00 p.m. Its claim conflicts with the relationship established by M-660 and M-346.', result: '<span class="walk-result-label">Illustrative answer</span><strong>M-502 is the outlier</strong><span>Monday, 9 a.m. ≠ Friday, 2 p.m.</span>' },
        { title: 'Rule out the distractor', good: ['M-660', 'M-346'], bad: ['M-059'], badLabel: 'Different course', text: '<strong>M-059</strong> concerns Biology 101, not Algebra 101. Its Friday slot does not conflict with Ms. Lee’s assignment. Matching the time without resolving the course would flag the wrong memo.', result: '<span class="walk-result-label">Final distinction</span><strong>M-502: conflicting</strong><span>M-059: no conflict established</span>' },
      ],
    },
  ];

  examples.forEach((example) => {
    const panel = document.getElementById(`panel-${example.task}`);
    if (!panel) return;
    const fallback = panel.querySelector('.task-figure');
    const demo = document.createElement('div');
    demo.className = 'task-walkthrough';
    demo.innerHTML = `
      <div class="walk-query"><span class="walk-label">The query · illustrative example</span><h4>${example.query}</h4>${example.detail}</div>
      <div class="walk-layout">
        <div class="walk-context"><h5>${example.context}</h5><div class="walk-cards${example.task === 'pairs' ? ' walk-cards-programs' : ''}">${example.cards.map((card) => `<article class="walk-card" data-record="${card.id}"><div class="walk-card-heading"><h6>${card.id}</h6><span class="walk-badge"></span></div>${card.body}</article>`).join('')}</div></div>
        <aside class="walk-reasoning" aria-label="${example.task} reasoning walkthrough">
          <span class="walk-label">Follow the reasoning</span>
          <div class="walk-step-dots" role="group" aria-label="Walkthrough steps">${example.steps.map((step, index) => `<button type="button" data-step="${index}" aria-label="Step ${index + 1}: ${step.title}" aria-pressed="false">${index + 1}</button>`).join('')}</div>
          <div class="walk-explanation" aria-live="polite" aria-atomic="true"><span class="walk-step-count"></span><h5></h5><p></p><div class="walk-result"></div></div>
          <div class="walk-navigation"><button type="button" data-direction="-1">← Back</button><button type="button" data-direction="1">Next step →</button></div>
        </aside>
      </div>`;
    let current = 0;
    const stepButtons = [...demo.querySelectorAll('[data-step]')];
    function showStep(index) {
      current = Math.max(0, Math.min(example.steps.length - 1, index));
      const step = example.steps[current];
      stepButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(current === i)));
      demo.querySelector('.walk-step-count').textContent = `Step ${current + 1} of ${example.steps.length}`;
      demo.querySelector('.walk-explanation h5').textContent = step.title;
      demo.querySelector('.walk-explanation p').innerHTML = step.text;
      demo.querySelector('.walk-result').innerHTML = step.result;
      demo.querySelectorAll('[data-record]').forEach((card) => {
        const good = (step.good || []).includes(card.dataset.record);
        const bad = (step.bad || []).includes(card.dataset.record);
        card.classList.toggle('walk-support', good);
        card.classList.toggle('walk-caution', bad);
        card.querySelector('.walk-badge').textContent = good ? (step.goodLabel || 'Supporting evidence') : bad ? (step.badLabel || 'Near-match') : '';
      });
      demo.querySelector('[data-direction="-1"]').disabled = current === 0;
      demo.querySelector('[data-direction="1"]').textContent = current === example.steps.length - 1 ? 'Start again ↺' : 'Next step →';
    }
    stepButtons.forEach((button, index) => button.addEventListener('click', () => showStep(index)));
    demo.querySelectorAll('[data-direction]').forEach((button) => button.addEventListener('click', () => {
      showStep(button.dataset.direction === '1' && current === example.steps.length - 1 ? 0 : current + Number(button.dataset.direction));
    }));
    try {
      showStep(0);
      panel.insertBefore(demo, fallback);
      fallback.hidden = true;
    } catch (error) { demo.remove(); }
  });
})();
