//Current year and date and time modified
document.getElementById("currentyear").textContent =
    new Date().getFullYear();

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

//Change hamburger Icon between viewports
const toggle = document.getElementById('menuToggle');
const panel = document.querySelector('.navigation');

toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('show');
    panel.classList.toggle('show');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';

});
// Close menu when a link is clicked (mobile UX)
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('show');
      panel.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  // Reset state if window is resized back to desktop while menu is open
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700 && toggle.classList.contains('show')) {
      toggle.classList.remove('show');
      panel.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }
  });