// Keep tabs independent of chart loading so the table and static figure remain usable.
(function initializeResultsTabs() {
  const tablist = document.querySelector('.results-tabs');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  function activate(tab) {
    tabs.forEach((candidate) => {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
      document.getElementById(candidate.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activate(tabs[next]);
      tabs[next].focus();
    });
  });
  activate(tabs[0]);
  tablist.hidden = false;
})();

/* Legend hover highlights subsets of the same 25 reported configurations. */
(async function initializeResultsFigure() {
  const figure = document.getElementById('results-explorer');
  if (!figure) return;
  const response = await fetch('assets/results.json');
  if (!response.ok) throw new Error('Results data unavailable');
  const models = await response.json();
  const harnesses = ['Direct', 'RLM', 'OpenCode', 'mini-swe-agent', 'ReAct'];
  const colors = ['#35557c', '#477cab', '#618d91', '#91aac8', '#69778f'];
  if (!Array.isArray(models) || models.length !== colors.length || models.some((model) =>
    typeof model.model !== 'string' || !Array.isArray(model.results) || model.results.length !== harnesses.length ||
    model.results.some((r, i) => r.harness !== harnesses[i] || !Number.isFinite(r.accuracy) ||
      r.accuracy < 0 || r.accuracy > 100 || !Number.isFinite(r.cost) || r.cost <= 0))) {
    throw new Error('Invalid results data');
  }
  const points = models.flatMap((model, modelIndex) => model.results.map((result, harnessIndex) => ({
    ...result, model: model.model, color: colors[modelIndex], modelIndex, harnessIndex,
  })));
  const plot = document.getElementById('interactive-results-plot');
  const stage = document.getElementById('chart-stage');
  const tooltip = document.getElementById('chart-tooltip');
  let activePoint = null;
  const harnessName = (name) => name === 'Direct' ? 'Direct reading' : name;
  const costText = (cost) => `$${cost.toFixed(cost < 1 ? 3 : 2)}`;
  function hideTooltip() {
    tooltip.hidden = true;
    if (activePoint) activePoint.node.classList.remove('inspected');
    activePoint = null;
  }
  function showTooltip(point) {
    hideTooltip();
    activePoint = point;
    point.node.classList.add('inspected');
    const model = document.createElement('strong');
    model.textContent = point.model;
    const harness = document.createElement('span');
    harness.textContent = harnessName(point.harness);
    const values = document.createElement('span');
    values.className = 'tooltip-values';
    values.textContent = `${point.accuracy.toFixed(1)}% accuracy · ${costText(point.cost)} / instance`;
    tooltip.replaceChildren(model, harness, values);
    tooltip.hidden = false;
    const bounds = stage.getBoundingClientRect();
    const markerBounds = point.node.getBoundingClientRect();
    const x = markerBounds.x - bounds.x + markerBounds.width / 2;
    const y = markerBounds.y - bounds.y + markerBounds.height / 2;
    tooltip.style.left = `${Math.max(4, Math.min(bounds.width - tooltip.offsetWidth - 4, x + 14))}px`;
    tooltip.style.top = `${Math.max(4, y > tooltip.offsetHeight + 14 ? y - tooltip.offsetHeight - 14 : y + 14)}px`;
  }
  const svgElement = (tag, attributes = {}, text) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, String(value)));
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const marker = (index) => {
    if (index === 0) return svgElement('circle', { r: 6 });
    if (index === 1) return svgElement('rect', { x: -6, y: -6, width: 12, height: 12 });
    if (index === 2) return svgElement('path', { d: 'M 0 -7 L 7 6 L -7 6 Z' });
    if (index === 3) return svgElement('path', { d: 'M 0 -8 L 7 0 L 0 8 L -7 0 Z' });
    return svgElement('path', { d: 'M -3 -7 H 3 V -3 H 7 V 3 H 3 V 7 H -3 V 3 H -7 V -3 H -3 Z' });
  };
  const axes = svgElement('g', { class: 'plot-axes', 'aria-hidden': true });
  const pointLayer = svgElement('g');
  plot.append(axes, pointLayer);
  points.forEach((point) => {
    const node = svgElement('g', {
      class: 'plot-point', tabindex: 0, role: 'button',
      'aria-label': `${point.model}, ${harnessName(point.harness)}: ${point.accuracy.toFixed(1)}% accuracy, ${costText(point.cost)} per instance`,
    });
    node.style.color = point.color;
    const symbol = marker(point.harnessIndex);
    symbol.setAttribute('class', 'plot-marker');
    node.append(svgElement('circle', { r: 10, fill: 'transparent', class: 'plot-hit-area' }), symbol);
    pointLayer.append(node);
    point.node = node;
    node.addEventListener('pointerenter', () => showTooltip(point));
    node.addEventListener('pointerleave', () => {
      if (document.activeElement !== node) hideTooltip();
    });
    node.addEventListener('focus', () => showTooltip(point));
    node.addEventListener('blur', hideTooltip);
    node.addEventListener('click', () => showTooltip(point));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showTooltip(point); }
    });
  });
  const legendEntries = [];
  function highlight(type, index) {
    hideTooltip();
    points.forEach((point) => {
      const matches = !type || point[type] === index;
      point.node.classList.toggle('dimmed', !matches);
      point.node.classList.toggle('highlighted', Boolean(type) && matches);
      if (type && matches) pointLayer.append(point.node);
    });
    legendEntries.forEach((entry) => {
      entry.button.classList.toggle('active', entry.type === type && entry.index === index);
      entry.button.classList.toggle('dimmed', entry.type === type && entry.index !== index);
    });
  }
  function addLegend(container, label, type, index, visual) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'legend-item';
    button.setAttribute('aria-label', `Highlight ${label}`);
    visual.setAttribute('aria-hidden', 'true');
    button.append(visual, document.createTextNode(label));
    button.addEventListener('pointerenter', () => highlight(type, index));
    button.addEventListener('pointerleave', () => highlight());
    button.addEventListener('focus', () => highlight(type, index));
    button.addEventListener('blur', () => highlight());
    button.addEventListener('click', () => highlight(type, index));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { button.blur(); highlight(); }
    });
    container.append(button);
    legendEntries.push({ button, type, index });
  }
  models.forEach((model, index) => {
    const swatch = document.createElement('span');
    swatch.className = 'legend-swatch';
    swatch.style.backgroundColor = colors[index];
    addLegend(document.getElementById('chart-model-legend'), model.model, 'modelIndex', index, swatch);
  });
  harnesses.forEach((harness, index) => {
    const icon = svgElement('svg', { viewBox: '-10 -10 20 20', width: 16, height: 16 });
    icon.append(marker(index));
    addLegend(document.getElementById('chart-harness-legend'), harnessName(harness), 'harnessIndex', index, icon);
  });
  // Tapping outside the legend restores the full figure on touch screens.
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.legend-item')) highlight();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideTooltip();
  });
  function draw() {
    hideTooltip();
    if (!stage.clientWidth) return;
    const width = Math.max(260, stage.clientWidth);
    const height = Math.max(330, Math.min(460, width * .47));
    const left = width < 500 ? 42 : 58;
    const right = width - 22;
    const top = 34;
    const bottom = height - 52;
    const x = (cost) => left + (Math.log10(cost) - Math.log10(.12)) / (Math.log10(10) - Math.log10(.12)) * (right - left);
    const y = (accuracy) => bottom - (accuracy + 4) / 79 * (bottom - top);
    plot.setAttribute('viewBox', `0 0 ${width} ${height}`);
    plot.setAttribute('height', height);
    axes.replaceChildren();
    axes.append(svgElement('text', { x: left, y: 17, class: 'plot-axis-title' }, 'Accuracy (%) ↑'));
    [0, 20, 40, 60].forEach((value) => {
      axes.append(svgElement('line', { x1: left, x2: right, y1: y(value), y2: y(value), class: 'plot-gridline' }));
      axes.append(svgElement('text', { x: left - 12, y: y(value) + 4, 'text-anchor': 'end' }, value));
    });
    [.2, .5, 1, 2, 5, 10].forEach((value) => {
      axes.append(svgElement('line', { x1: x(value), x2: x(value), y1: top, y2: bottom, class: 'plot-gridline' }));
      axes.append(svgElement('text', { x: x(value), y: bottom + 22, 'text-anchor': 'middle' }, `$${value}`));
    });
    axes.append(svgElement('line', { x1: left, x2: right, y1: bottom, y2: bottom, class: 'plot-axis-line' }));
    axes.append(svgElement('text', { x: (left + right) / 2, y: height - 5, 'text-anchor': 'middle', class: 'plot-axis-title' }, 'Cost per instance (USD · log scale)'));
    points.forEach((point) => point.node.setAttribute('transform', `translate(${x(point.cost)},${y(point.accuracy)})`));
  }
  figure.hidden = false;
  document.getElementById('results-static-figure').hidden = true;
  draw();
  new ResizeObserver(draw).observe(stage);
})().catch(() => {
  const figure = document.getElementById('results-explorer');
  if (figure) figure.hidden = true;
  const fallback = document.getElementById('results-static-figure');
  if (fallback) fallback.hidden = false;
});
