const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const wideScreen = window.matchMedia('(min-width: 701px)');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('is-open', open);
}

if (header && toggle && nav) {
  // The menu is only collapsed once this script has run, so the links stay visible without JavaScript
  header.classList.add('nav-ready');

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  wideScreen.addEventListener('change', (event) => {
    if (event.matches) {
      setMenu(false);
    }
  });
}
