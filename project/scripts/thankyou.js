import { initPage } from './main.js';

initPage();

const params = new URLSearchParams(window.location.search);
const summary = document.querySelector('#summary');
const heading = document.querySelector('#thanks-heading');
const intro = document.querySelector('#thanks-intro');
const empty = document.querySelector('#no-data');
const next = document.querySelector('#next-steps');

const levelLabels = {
  updates: 'Trail updates',
  groups: 'Group hikes',
  both: 'Updates and group hikes'
};

const experienceLabels = {
  new: 'New to hiking',
  beginner: 'A few easy hikes',
  regular: 'Regular day hiker',
  experienced: 'Experienced, including multi-day treks'
};

const interestLabels = {
  'near-nairobi': 'Day hikes near Nairobi',
  mountains: 'Mountain treks',
  birding: 'Bird watching walks',
  forests: 'Forest and nature walks'
};

function addRow(label, value) {
  if (!value) return;
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  row.append(term, detail);
  summary.append(row);
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-KE', { dateStyle: 'long', timeStyle: 'short' });
}

const email = params.get('email');

if (!email) {
  // Someone opened this page directly, so there is nothing to show.
  heading.textContent = 'No sign-up found';
  intro.hidden = true;
  summary.hidden = true;
  next.hidden = true;
  empty.hidden = false;
} else {
  const first = params.get('first_name') || '';
  const last = params.get('last_name') || '';
  heading.textContent = first ? `Thanks, ${first}` : 'Thanks for signing up';

  const interests = params
    .getAll('interests')
    .map((value) => interestLabels[value] || value)
    .join(', ');

  addRow('Name', `${first} ${last}`.trim());
  addRow('Email', email);
  addRow('Phone', params.get('phone'));
  addRow('Hiking experience', experienceLabels[params.get('experience')] || params.get('experience'));
  addRow('How you want to take part', levelLabels[params.get('level')] || params.get('level'));
  addRow('Interests', interests);
  addRow('Trail you most want to hike', params.get('trail'));
  addRow('Your message', params.get('message'));
  addRow('Submitted', formatTime(params.get('timestamp')));
}
