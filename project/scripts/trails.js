import { initPage } from './main.js';
import { getTrails } from './data.js';
import { trailCard, detailMarkup } from './render.js';
import { getFavorites, isFavorite, toggleFavorite } from './storage.js';

initPage();

const form = document.querySelector('#filters');
const grid = document.querySelector('#trail-grid');
const count = document.querySelector('#result-count');
const dialog = document.querySelector('#trail-dialog');
const dialogContent = document.querySelector('#dialog-content');

let trails = [];
let lastMarkup = '';

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  nearest: (a, b) => a.driveFromNairobiHours - b.driveFromNairobiHours || a.name.localeCompare(b.name),
  shortest: (a, b) => a.distanceKm - b.distanceKm,
  longest: (a, b) => b.distanceKm - a.distanceKm,
  quickest: (a, b) => a.durationHours - b.durationHours,
  climb: (a, b) => b.elevationGainM - a.elevationGainM
};

function readFilters() {
  const data = new FormData(form);
  return {
    query: String(data.get('query') || '').trim().toLowerCase(),
    difficulty: data.get('difficulty'),
    type: data.get('type'),
    sort: data.get('sort'),
    near: data.get('near') === 'on',
    savedOnly: data.get('saved') === 'on'
  };
}

function filterTrails() {
  const filters = readFilters();
  const saved = getFavorites();

  return trails
    .filter((trail) => {
      const haystack = `${trail.name} ${trail.region} ${trail.county} ${trail.summary}`.toLowerCase();
      if (filters.query && !haystack.includes(filters.query)) return false;
      if (filters.difficulty !== 'all' && trail.difficulty !== filters.difficulty) return false;
      if (filters.type !== 'all' && trail.type !== filters.type) return false;
      if (filters.near && trail.driveFromNairobiHours > 2) return false;
      if (filters.savedOnly && !saved.includes(trail.id)) return false;
      return true;
    })
    .sort(sorters[filters.sort] || sorters.name);
}

function render() {
  const results = filterTrails();
  const saved = getFavorites();

  const markup =
    results.length === 0
      ? `<li class="empty-state">
      <p><strong>No trails match these filters.</strong> Try a different difficulty, clear the search box, or show all trails.</p>
      <button type="button" class="btn btn--primary" data-action="reset">Show all trails</button>
    </li>`
      : results
          .map((trail) => trailCard(trail, { saved: saved.includes(trail.id), mode: 'dialog' }))
          .join('');

  // Skip the DOM update when nothing changed so focus and clicks are not disturbed.
  if (markup !== lastMarkup) {
    grid.innerHTML = markup;
    lastMarkup = markup;
  }

  count.textContent = `Showing ${results.length} of ${trails.length} trails`;
}

function syncSaveButtons(id, nowSaved) {
  document.querySelectorAll(`[data-action="save"][data-id="${id}"]`).forEach((button) => {
    button.classList.toggle('is-saved', nowSaved);
    button.setAttribute('aria-pressed', String(nowSaved));
    const star = button.querySelector('span[aria-hidden]');
    if (star) star.textContent = nowSaved ? '\u2605' : '\u2606';
  });
}

function openTrail(id) {
  const trail = trails.find((item) => item.id === id);
  if (!trail) return;
  dialogContent.innerHTML = detailMarkup(trail, isFavorite(id));
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  history.replaceState(null, '', `?trail=${encodeURIComponent(id)}`);
}

function handleClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;

  if (action === 'details') openTrail(id);
  if (action === 'close') dialog.close();

  if (action === 'reset') {
    form.reset();
    render();
  }

  if (action === 'save') {
    const nowSaved = toggleFavorite(id);
    syncSaveButtons(id, nowSaved);
    // The saved-only list is refreshed when the dialog closes, so focus is not lost.
    if (!dialog.open && readFilters().savedOnly) render();
  }
}

async function init() {
  try {
    trails = await getTrails();
  } catch (error) {
    grid.innerHTML = `<li><p class="notice is-error" role="alert">The trail list could not be loaded. Check your connection and refresh the page. If you are running the site from a file, use a local server such as the VS Code Live Server extension.</p></li>`;
    count.textContent = 'Trails unavailable';
    return;
  }

  render();

  const requested = new URLSearchParams(window.location.search).get('trail');
  if (requested) openTrail(requested);
}

// Selects and checkboxes also fire "input", so one listener covers every control.
// Listening to "change" as well would re-render on blur and swallow clicks on result buttons.
form.addEventListener('input', render);
form.addEventListener('submit', (event) => event.preventDefault());
form.addEventListener('reset', () => {
  // Wait for the form controls to return to their defaults before filtering.
  setTimeout(render, 0);
});

document.addEventListener('click', handleClick);

dialog.addEventListener('click', (event) => {
  // A click on the backdrop lands on the dialog element itself.
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener('close', () => {
  history.replaceState(null, '', window.location.pathname);
  if (readFilters().savedOnly) render();
});

init();
