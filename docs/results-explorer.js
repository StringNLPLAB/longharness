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
    document.dispatchEvent(new Event('resultsviewchange'));
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

/* Models use the paper's palette, stored with the results for both renderers. */
(async function initializeResultsFigures() {
  const response = await fetch('assets/results.json?v=2');
  if (!response.ok) throw new Error('Results data unavailable');
  const models = await response.json();
  const harnesses = ['Direct', 'RLM', 'OpenCode', 'mini-swe-agent', 'ReAct'];
  const suites = {
    macro: 'Macro average',
    'program-execution-tracing': 'Program Execution Tracing',
    'outlier-memo-detection': 'Outlier Memo Detection',
    'constraint-solving-search': 'Constraint Solving Search',
    'equivalent-program-pair-search': 'Equivalent Program Pair Search',
  };
  const validMetric = (r) => r && Number.isFinite(r.accuracy) && r.accuracy >= 0 &&
    r.accuracy <= 100 && Number.isFinite(r.cost) && r.cost > 0;
  if (!Array.isArray(models) || models.length !== 5 || models.some((model) =>
    typeof model.model !== 'string' || !/^#[0-9a-f]{6}$/i.test(model.color) ||
    !Array.isArray(model.results) || model.results.length !== harnesses.length ||
    model.results.some((r, i) => r.harness !== harnesses[i] || !validMetric(r)))) {
    throw new Error('Invalid results data');
  }
  const harnessName = (name) => name === 'Direct' ? 'Direct reading' : name;
  const costText = (cost) => `$${cost.toFixed(cost < 1 ? 3 : 2)}`;
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

  function initializeFigure(figureId, fallbackId, perDataset) {
    const figure = document.getElementById(figureId);
    if (!figure) return;
    const allPoints = [];
    const legendEntries = [];
    const charts = [];
    const resetButton = figure.querySelector('.legend-reset');
    const selectionStatus = figure.querySelector('.legend-selection-status');
    const selections = { modelIndex: new Set(), harnessIndex: new Set() };
    const hasSelection = () => selections.modelIndex.size > 0 || selections.harnessIndex.size > 0;
    let activePoint = null;
    function hideTooltip() {
      if (activePoint) {
        activePoint.node.classList.remove('inspected');
        activePoint.tooltip.hidden = true;
      }
      activePoint = null;
    }
    function showTooltip(point) {
      hideTooltip();
      activePoint = point;
      point.node.classList.add('inspected');
      const model = document.createElement('strong');
      model.textContent = point.model;
      const harness = document.createElement('span');
      harness.textContent = `${harnessName(point.harness)} · ${suites[point.suite]}`;
      const values = document.createElement('span');
      values.className = 'tooltip-values';
      values.textContent = `${point.accuracy.toFixed(1)}% accuracy · ${costText(point.cost)} / instance`;
      const { tooltip, stage } = point;
      tooltip.replaceChildren(model, harness, values);
      tooltip.hidden = false;
      const bounds = stage.getBoundingClientRect();
      const markerBounds = point.node.getBoundingClientRect();
      const x = markerBounds.x - bounds.x + markerBounds.width / 2;
      const y = markerBounds.y - bounds.y + markerBounds.height / 2;
      tooltip.style.left = `${Math.max(4, Math.min(bounds.width - tooltip.offsetWidth - 4, x + 14))}px`;
      tooltip.style.top = `${Math.max(4, y > tooltip.offsetHeight + 14 ? y - tooltip.offsetHeight - 14 : y + 14)}px`;
    }
    figure.querySelectorAll('.chart-stage').forEach((stage) => {
      const suite = stage.dataset.suite || 'macro';
      const points = models.flatMap((model, modelIndex) => model.results.map((result, harnessIndex) => {
        const metrics = suite === 'macro' ? result : result.datasets?.[suite];
        if (!validMetric(metrics)) throw new Error(`Missing results for ${suite}`);
        return { accuracy: metrics.accuracy, cost: metrics.cost, harness: result.harness,
          model: model.model, color: model.color, modelIndex, harnessIndex, suite, stage };
      }));
      const plot = stage.querySelector('svg') || svgElement('svg', {
        role: 'group', 'aria-label': `${suites[suite]}: accuracy versus cost for all 25 configurations`,
      });
      plot.classList.add('results-plot');
      if (!plot.parentNode) {
        plot.append(svgElement('desc', {}, 'Accuracy increases upward; cost increases to the right on a logarithmic scale. Color identifies the model; shape identifies the harness. Focus a point for exact values.'));
        stage.append(plot);
      }
      const tooltip = stage.querySelector('.chart-tooltip') || document.createElement('div');
      tooltip.className = 'chart-tooltip';
      tooltip.setAttribute('aria-hidden', 'true');
      tooltip.hidden = true;
      stage.append(tooltip);
      const axes = svgElement('g', { class: 'plot-axes', 'aria-hidden': true });
      const pointLayer = svgElement('g');
      plot.append(axes, pointLayer);
      points.forEach((point) => {
        const node = svgElement('g', {
          class: 'plot-point', tabindex: 0, role: 'button',
          'aria-label': `${suites[suite]}, ${point.model}, ${harnessName(point.harness)}: ${point.accuracy.toFixed(1)}% accuracy, ${costText(point.cost)} per instance`,
        });
        node.style.color = point.color;
        const symbol = marker(point.harnessIndex);
        symbol.setAttribute('class', 'plot-marker');
        node.append(svgElement('circle', { r: 10, fill: 'transparent', class: 'plot-hit-area' }), symbol);
        pointLayer.append(node);
        Object.assign(point, { node, tooltip });
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
      function draw() {
        if (!stage.clientWidth) return;
        const width = stage.clientWidth;
        const height = perDataset ? 300 : Math.max(330, Math.min(460, width * .47));
        const left = width < 500 ? 42 : 58;
        const right = width - 24;
        const top = 34;
        const bottom = height - 52;
        const minCost = perDataset ? .1 : .12;
        const maxCost = perDataset ? 20 : 10;
        const x = (cost) => left + Math.log(cost / minCost) / Math.log(maxCost / minCost) * (right - left);
        const y = (accuracy) => bottom - (accuracy + (perDataset ? 5 : 4)) / (perDataset ? 110 : 79) * (bottom - top);
        plot.setAttribute('viewBox', `0 0 ${width} ${height}`);
        plot.setAttribute('height', height);
        axes.replaceChildren();
        axes.append(svgElement('text', { x: left, y: 17, class: 'plot-axis-title' }, 'Accuracy (%) ↑'));
        (perDataset ? [0, 25, 50, 75, 100] : [0, 20, 40, 60]).forEach((value) => {
          axes.append(svgElement('line', { x1: left, x2: right, y1: y(value), y2: y(value), class: 'plot-gridline' }));
          axes.append(svgElement('text', { x: left - 12, y: y(value) + 4, 'text-anchor': 'end' }, value));
        });
        const ticks = perDataset ? (width < 500 ? [.1, .5, 2, 10, 20] : [.1, .2, .5, 1, 2, 5, 10, 20]) : [.2, .5, 1, 2, 5, 10];
        ticks.forEach((value) => {
          axes.append(svgElement('line', { x1: x(value), x2: x(value), y1: top, y2: bottom, class: 'plot-gridline' }));
          axes.append(svgElement('text', { x: x(value), y: bottom + 22, 'text-anchor': 'middle' }, `$${value}`));
        });
        axes.append(svgElement('line', { x1: left, x2: right, y1: bottom, y2: bottom, class: 'plot-axis-line' }));
        axes.append(svgElement('text', { x: (left + right) / 2, y: height - 5, 'text-anchor': 'middle', class: 'plot-axis-title' }, 'Cost per instance (USD · log scale)'));
        points.forEach((point) => point.node.setAttribute('transform', `translate(${x(point.cost)},${y(point.accuracy)})`));
      }
      allPoints.push(...points);
      charts.push({ draw, stage });
    });
    function highlight(type, index) {
      hideTooltip();
      const filters = type ? {
        modelIndex: new Set(type === 'modelIndex' ? [index] : []),
        harnessIndex: new Set(type === 'harnessIndex' ? [index] : []),
      } : selections;
      const filtered = filters.modelIndex.size > 0 || filters.harnessIndex.size > 0;
      allPoints.forEach((point) => {
        const matches = (!filters.modelIndex.size || filters.modelIndex.has(point.modelIndex)) &&
          (!filters.harnessIndex.size || filters.harnessIndex.has(point.harnessIndex));
        point.node.classList.toggle('dimmed', !matches);
        point.node.classList.toggle('highlighted', filtered && matches);
        if (filtered && matches) point.node.parentNode.append(point.node);
      });
      legendEntries.forEach((entry) => {
        const selected = filters[entry.type].has(entry.index);
        entry.button.classList.toggle('active', selected);
        entry.button.classList.toggle('dimmed', filters[entry.type].size > 0 && !selected);
      });
    }
    function restoreHighlight() {
      highlight();
    }
    function updateSelection() {
      legendEntries.forEach((entry) => {
        entry.button.setAttribute('aria-pressed', String(selections[entry.type].has(entry.index)));
      });
      const labels = (type) => legendEntries
        .filter((entry) => entry.type === type && selections[type].has(entry.index))
        .map((entry) => entry.label).join(', ') || 'All';
      resetButton.disabled = !hasSelection();
      selectionStatus.textContent = `Models: ${labels('modelIndex')} · Harnesses: ${labels('harnessIndex')}`;
      restoreHighlight();
    }
    function resetSelection() {
      selections.modelIndex.clear();
      selections.harnessIndex.clear();
      updateSelection();
    }
    function addLegend(container, label, type, index, visual) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'legend-item';
      button.setAttribute('aria-label', `Highlight ${label}`);
      if (perDataset) button.setAttribute('aria-pressed', 'false');
      visual.setAttribute('aria-hidden', 'true');
      button.append(visual, document.createTextNode(label));
      const preview = () => { if (!hasSelection()) highlight(type, index); };
      button.addEventListener('pointerenter', preview);
      button.addEventListener('pointerleave', restoreHighlight);
      button.addEventListener('focus', preview);
      button.addEventListener('blur', restoreHighlight);
      button.addEventListener('click', () => {
        if (!perDataset) { highlight(type, index); return; }
        if (selections[type].has(index)) selections[type].delete(index);
        else selections[type].add(index);
        updateSelection();
      });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          if (perDataset) resetSelection();
          button.blur();
          restoreHighlight();
        }
      });
      container.append(button);
      legendEntries.push({ button, type, index, label });
    }
    models.forEach((model, index) => {
      const swatch = document.createElement('span');
      swatch.className = 'legend-swatch';
      swatch.style.backgroundColor = model.color;
      addLegend(figure.querySelector('[id$="model-legend"]'), model.model, 'modelIndex', index, swatch);
    });
    harnesses.forEach((harness, index) => {
      const icon = svgElement('svg', { viewBox: '-10 -10 20 20', width: 16, height: 16 });
      icon.append(marker(index));
      addLegend(figure.querySelector('[id$="harness-legend"]'), harnessName(harness), 'harnessIndex', index, icon);
    });
    if (perDataset) resetButton.addEventListener('click', resetSelection);
    document.addEventListener('pointerdown', (event) => {
      if (!event.target.closest('.legend-item')) restoreHighlight();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        hideTooltip();
        if (perDataset && figure.contains(document.activeElement)) resetSelection();
      }
    });
    document.addEventListener('resultsviewchange', () => {
      restoreHighlight();
      charts.forEach((chart) => chart.draw());
    });
    figure.hidden = false;
    document.getElementById(fallbackId).hidden = true;
    const observer = new ResizeObserver(() => {
      hideTooltip();
      charts.forEach((chart) => chart.draw());
    });
    charts.forEach((chart) => { chart.draw(); observer.observe(chart.stage); });
  }
  // A failed interactive view keeps its matching static figure available.
  [ ['results-explorer', 'results-static-figure', false],
    ['datasets-explorer', 'datasets-static-figure', true] ].forEach(([figure, fallback, perDataset]) => {
    try { initializeFigure(figure, fallback, perDataset); }
    catch { document.getElementById(figure).hidden = true; document.getElementById(fallback).hidden = false; }
  });
})().catch(() => { /* Static figures remain visible if results cannot be loaded. */ });
