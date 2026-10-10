import { initPage } from './main.js';
import { getTrails, MONTHS } from './data.js';
import { trailCard, trailRow } from './render.js';
import { getFavorites, toggleFavorite, recordVisit } from './storage.js';

initPage();

const featuredEl = document.querySelector('#featured-trails');
const seasonEl = document.querySelector('#season-trails');
const seasonIntro = document.querySelector('#season-intro');
const seasonTitle = document.querySelector('#season-title');
const savedSection = document.querySelector('#saved-section');
const savedEl = document.querySelector('#saved-trails');
const visitMessage = document.querySelector('#visit-message');

let trails = [];

function describeLastVisit(previous) {
  if (!previous) {
    return 'Welcome to Rift Trails Kenya. Save the trails you like and they will be waiting here next time.';
  }
  const days = Math.floor((Date.now() - previous.getTime()) / 86400000);
  if (days < 1) return 'Welcome back. You last visited earlier today.';
  if (days === 1) return 'Welcome back. You last visited yesterday.';
  return `Welcome back. You last visited ${days} days ago.`;
}

function showVisitMessage() {
  visitMessage.textContent = describeLastVisit(recordVisit());
  visitMessage.hidden = false;
}

function renderFeatured() {
  const picks = trails.filter((trail) => trail.featured);
  const saved = getFavorites();
  featuredEl.innerHTML = picks
    .map((trail) => trailCard(trail, { saved: saved.includes(trail.id), mode: 'link' }))
    .join('');
}

function renderSeason() {
  const month = new Date().getMonth() + 1;
  const monthName = MONTHS[month - 1];
  seasonTitle.textContent = `In season in ${monthName}`;

  const inSeason = trails
    .filter((trail) => trail.bestMonths.includes(month))
    .sort((a, b) => a.driveFromNairobiHours - b.driveFromNairobiHours);

  if (inSeason.length === 0) {
    seasonIntro.textContent =
      `No trail on the site is at its best in ${monthName}, because the rains make most paths muddy and slippery. ` +
      'Browse the full list to plan ahead for the next dry season.';
    seasonEl.innerHTML = '';
    return;
  }

  seasonIntro.textContent =
    `${inSeason.length} of ${trails.length} trails are in their best window in ${monthName}. ` +
    'Here are the ones closest to Nairobi.';
  seasonEl.innerHTML = inSeason.slice(0, 5).map((trail) => trailRow(trail)).join('');
}

function renderSaved() {
  const ids = getFavorites();
  const saved = ids.map((id) => trails.find((trail) => trail.id === id)).filter(Boolean);
  savedSection.hidden = saved.length === 0;
  savedEl.innerHTML = saved.map((trail) => trailRow(trail, { removable: true })).join('');
}

function handleClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;

  if (action === 'save') {
    const nowSaved = toggleFavorite(id);
    button.classList.toggle('is-saved', nowSaved);
    button.setAttribute('aria-pressed', String(nowSaved));
    button.querySelector('span[aria-hidden]').textContent = nowSaved ? '\u2605' : '\u2606';
    renderSaved();
  }

  if (action === 'remove') {
    toggleFavorite(id);
    renderSaved();
    const card = featuredEl.querySelector(`[data-action="save"][data-id="${id}"]`);
    if (card) {
      card.classList.remove('is-saved');
      card.setAttribute('aria-pressed', 'false');
      card.querySelector('span[aria-hidden]').textContent = '\u2606';
    }
  }
}

async function init() {
  showVisitMessage();
  try {
    trails = await getTrails();
    renderFeatured();
    renderSeason();
    renderSaved();
  } catch (error) {
    const message =
      '<p class="notice is-error" role="alert">The trail list could not be loaded. Check your connection and refresh the page, or open the <a href="trails.html">Trails page</a>.</p>';
    featuredEl.innerHTML = `<li>${message}</li>`;
    seasonIntro.textContent = 'Seasonal suggestions are unavailable right now.';
  }
}

document.addEventListener('click', handleClick);
init();
