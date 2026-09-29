const tabs = Array.from(document.querySelectorAll('.task-tab'));

function activateTab(tab) {
  tabs.forEach((candidate) => {
    const selected = candidate === tab;
    candidate.classList.toggle('active', selected);
    candidate.setAttribute('aria-selected', String(selected));
    candidate.setAttribute('tabindex', selected ? '0' : '-1');
    const panel = document.getElementById(`panel-${candidate.dataset.panel}`);
    panel.hidden = !selected;
    panel.classList.toggle('active', selected);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    activateTab(tabs[next]);
    tabs[next].focus();
  });
});

async function copyText(value, button, restoredLabel) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (_) {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  button.textContent = 'Copied';
  window.setTimeout(() => {
    button.textContent = restoredLabel;
  }, 1400);
}

document.querySelectorAll('.copy-command').forEach((button) => {
  button.addEventListener('click', () => copyText(button.dataset.copy, button, 'Copy'));
});

const citationButton = document.querySelector('.copy-citation');
citationButton.addEventListener('click', () => {
  copyText(document.getElementById('bibtex').textContent.trim(), citationButton, 'Copy BibTeX');
});

// Three discrete views preserve the same result values and cell dimensions.
const matrix = document.getElementById('results-matrix');
const viewControl = document.getElementById('heatmap-view');
if (matrix && viewControl) {
  const controls = document.querySelector('.view-controls');
  const presets = Array.from(controls.querySelectorAll('[data-view]'));
  const views = [
    { mode: 'accuracy', description: 'Accuracy · higher is better', caption: 'Macro-average exact accuracy (%) by model and harness' },
    { mode: 'both', description: 'Darker = better · accuracy above, cost below', caption: 'Macro-average exact accuracy (%) and estimated cost per instance (USD) by model and harness' },
    { mode: 'cost', description: 'Cost · lower is better', caption: 'Estimated mean cost per instance (USD) by model and harness' },
  ];
  function updateHeatmapView() {
    const position = Number(viewControl.value);
    const view = views[position];
    matrix.dataset.metric = view.mode;
    matrix.querySelectorAll('.matrix-accuracy').forEach((value) => { value.hidden = view.mode === 'cost'; });
    matrix.querySelectorAll('.matrix-cost').forEach((value) => { value.hidden = view.mode === 'accuracy'; });
    presets.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.view) === position)));
    document.getElementById('view-help').textContent = view.description;
    viewControl.setAttribute('aria-valuetext', view.description);
    document.getElementById('matrix-table-caption').textContent = view.caption;
  }
  controls.hidden = false;
  viewControl.addEventListener('input', updateHeatmapView);
  presets.forEach((button) => button.addEventListener('click', () => {
    viewControl.value = button.dataset.view;
    updateHeatmapView();
  }));
  updateHeatmapView();
}
