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
