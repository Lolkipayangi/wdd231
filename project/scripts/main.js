// Shared behaviour for every page: responsive menu and footer details.

function initNav() {
  const toggle = document.querySelector('#menuToggle');
  const nav = document.querySelector('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset the menu state when the layout switches to the wide navigation.
  window.matchMedia('(min-width: 48rem)').addEventListener('change', () => setOpen(false));
}

function initFooter() {
  const year = document.querySelector('#currentyear');
  const modified = document.querySelector('#lastModified');
  if (year) year.textContent = new Date().getFullYear();
  if (modified) modified.textContent = `Last modified: ${document.lastModified}`;
}

export function initPage() {
  initNav();
  initFooter();
}
