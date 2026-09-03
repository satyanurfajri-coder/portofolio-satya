const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalDetail = document.querySelector('#modal-detail');
const modalMeta = document.querySelector('#modal-meta');
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

function updateActiveNav() {
  let current = 'top';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 220) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}` || (current === 'top' && link.getAttribute('href') === '#top'));
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.hidden = !visible;
      if (visible) card.classList.add('reveal');
    });
  });
});

function openModal(card) {
  modalTitle.textContent = card.dataset.title;
  modalDetail.textContent = card.dataset.detail;
  modalMeta.textContent = card.dataset.meta;
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('.modal-close').focus();
}

cards.forEach((card) => {
  card.querySelectorAll('.project-image, .detail-link').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(card));
  });
});

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});