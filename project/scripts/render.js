// Markup builders shared by the Home and Trails pages.

import { MONTHS } from './data.js';

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const PEAKS = { Easy: 1, Moderate: 2, Challenging: 3 };

export function difficultyBadge(difficulty) {
  const count = PEAKS[difficulty] || 1;
  const peaks = '\u25B2'.repeat(count);
  return `<span class="badge badge--${difficulty.toLowerCase()}"><span class="peaks" aria-hidden="true">${peaks}</span>${esc(difficulty)}</span>`;
}

export function formatDrive(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  return `${hours} hr`;
}

export function formatKm(km) {
  return `${km} km`;
}

export function formatClimb(meters) {
  return `${meters.toLocaleString('en-KE')} m`;
}

export function saveButton(trail, saved, extraClass = '') {
  return `<button type="button" class="btn ${extraClass} ${saved ? 'is-saved' : ''}" data-action="save" data-id="${esc(trail.id)}" aria-pressed="${saved}">
    <span aria-hidden="true">${saved ? '\u2605' : '\u2606'}</span> Save<span class="visually-hidden"> ${esc(trail.name)}</span>
  </button>`;
}

// mode "dialog" opens the details dialog, mode "link" goes to the Trails page.
export function trailCard(trail, { saved = false, mode = 'dialog' } = {}) {
  const details =
    mode === 'link'
      ? `<a class="btn btn--primary" href="trails.html?trail=${encodeURIComponent(trail.id)}">View details<span class="visually-hidden"> for ${esc(trail.name)}</span></a>`
      : `<button type="button" class="btn btn--primary" data-action="details" data-id="${esc(trail.id)}">View details<span class="visually-hidden"> for ${esc(trail.name)}</span></button>`;

  return `<li><article class="trail-card" data-id="${esc(trail.id)}">
    <img src="${esc(trail.image)}" alt="${esc(trail.imageAlt)}" width="800" height="500" loading="lazy">
    <div class="trail-card-body">
      <p class="badges">${difficultyBadge(trail.difficulty)}<span class="badge">${esc(trail.type)}</span></p>
      <h3>${esc(trail.name)}</h3>
      <p class="trail-region">${esc(trail.region)}, about ${formatDrive(trail.driveFromNairobiHours)} from Nairobi</p>
      <dl class="stats">
        <div><dt>Distance</dt><dd>${formatKm(trail.distanceKm)}</dd></div>
        <div><dt>Climb</dt><dd>${formatClimb(trail.elevationGainM)}</dd></div>
        <div><dt>Time</dt><dd>${esc(trail.duration)}</dd></div>
      </dl>
      <div class="card-actions">
        ${details}
        ${saveButton(trail, saved)}
      </div>
    </div>
  </article></li>`;
}

export function trailRow(trail, { removable = false } = {}) {
  const action = removable
    ? `<button type="button" class="btn" data-action="remove" data-id="${esc(trail.id)}">Remove<span class="visually-hidden"> ${esc(trail.name)} from saved trails</span></button>`
    : '';
  return `<li class="trail-row">
    <div>
      <h3><a href="trails.html?trail=${encodeURIComponent(trail.id)}">${esc(trail.name)}</a></h3>
      <p>${esc(trail.region)}, ${formatKm(trail.distanceKm)}, ${esc(trail.duration)}</p>
    </div>
    <div class="row-actions">
      <p class="badges">${difficultyBadge(trail.difficulty)}</p>
      ${action}
    </div>
  </li>`;
}

export function monthChips(bestMonths) {
  return MONTHS.map((name, index) => {
    const best = bestMonths.includes(index + 1);
    return `<li class="${best ? 'is-best' : ''}">${name.slice(0, 3)}${best ? '<span class="visually-hidden"> (good time to go)</span>' : ''}</li>`;
  }).join('');
}

export function detailMarkup(trail, saved) {
  return `<div class="dialog-close-wrap"><button type="button" class="dialog-close" data-action="close" aria-label="Close trail details">&times;</button></div>
  <img class="dialog-image" src="${esc(trail.image)}" alt="${esc(trail.imageAlt)}" width="800" height="500">
  <div class="dialog-body">
    <p class="badges">${difficultyBadge(trail.difficulty)}<span class="badge">${esc(trail.type)}</span></p>
    <h2 id="dialog-title">${esc(trail.name)}</h2>
    <p>${esc(trail.region)}, ${esc(trail.county)}. About ${formatDrive(trail.driveFromNairobiHours)} by road from Nairobi.</p>
    <dl class="stats">
      <div><dt>Distance</dt><dd>${formatKm(trail.distanceKm)}</dd></div>
      <div><dt>Climb</dt><dd>${formatClimb(trail.elevationGainM)}</dd></div>
      <div><dt>Time</dt><dd>${esc(trail.duration)}</dd></div>
      <div><dt>Type</dt><dd>${esc(trail.type)}</dd></div>
    </dl>
    <p>${esc(trail.summary)}</p>
    <h3>Highlights</h3>
    <ul>${trail.highlights.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
    <h3>Best time to go</h3>
    <p>${esc(trail.bestSeason)}</p>
    <ul class="chips" aria-label="Months of the year">${monthChips(trail.bestMonths)}</ul>
    <h3>What to bring</h3>
    <ul>${trail.bring.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
    <h3>Safety and access</h3>
    <p>${esc(trail.tips)}</p>
    <div class="dialog-actions">
      ${saveButton(trail, saved)}
      <a class="btn btn--primary" href="join.html">Hike with the club</a>
    </div>
  </div>`;
}
