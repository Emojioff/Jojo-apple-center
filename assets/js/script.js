'use strict';

/* ==================== TOAST (protégé) ==================== */
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

if (toastCloseBtn && notificationToast) {
  toastCloseBtn.addEventListener('click', () => {
    notificationToast.classList.add('closed');
  });
}

/* ==================== MENU MOBILE (version forcée) ==================== */
const mobileMenu = document.querySelector('.mobile-navigation-menu');
const overlay = document.querySelector('[data-overlay]');
const openBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
const closeBtns = document.querySelectorAll('[data-mobile-menu-close-btn]');

function openMenu() {
  if (mobileMenu) mobileMenu.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // empêche le scroll derrière
}

function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Tous les boutons qui doivent ouvrir le menu
openBtns.forEach(btn => {
  btn.addEventListener('click', openMenu);
});

// Tous les boutons de fermeture
closeBtns.forEach(btn => {
  btn.addEventListener('click', closeMenu);
});

// Clic sur l’overlay
if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

/* ==================== ACCORDION ==================== */
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let j = 0; j < accordion.length; j++) {
      if (clickedBtn) break;
      if (accordion[j].classList.contains('active')) {
        accordion[j].classList.remove('active');
        accordionBtn[j].classList.remove('active');
      }
    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
  });
}
/* ==================== RECHERCHE PRODUITS ==================== */
const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('.search-btn');
const allShowcases = document.querySelectorAll('.showcase');

function filterProducts() {
  const searchText = searchField.value.toLowerCase().trim();

  allShowcases.forEach(showcase => {
    const title = showcase.querySelector('.showcase-title');
    if (!title) return;

    const productName = title.textContent.toLowerCase();

    if (productName.includes(searchText) || searchText === '') {
      showcase.style.display = 'flex';   // ou 'block' selon ton CSS
    } else {
      showcase.style.display = 'none';
    }
  });
}

// Recherche en direct pendant qu'on tape
if (searchField) {
  searchField.addEventListener('input', filterProducts);
}

// Aussi quand on clique sur le bouton loupe
if (searchBtn) {
  searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    filterProducts();
  });
}
