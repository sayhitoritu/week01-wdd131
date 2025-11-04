// temples.js - dynamic footer + hamburger behavior

// Wait until DOM is parsed
document.addEventListener('DOMContentLoaded', () => {
  // Footer: show current year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Footer: show last modified
  const lastMod = document.getElementById('lastModified');
  if (lastMod) {
    lastMod.textContent = 'Last Modification: ' + document.lastModified;
  }

  // Hamburger menu toggle
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('primaryNav') || document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      // update button icon and aria attributes
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuButton.textContent = isOpen ? '✖' : '☰';
    });
  }
});
