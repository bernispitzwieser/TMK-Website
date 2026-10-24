// Die mobile Navigation bleibt unabhängig von Kalender- und E-Mail-Funktionen.
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenu) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (mobileMenu.open && (!mobileMenu.contains(event.target) || event.target.classList.contains('mobile-menu-panel'))) {
      mobileMenu.open = false;
    }
  });
}
