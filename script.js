const languageToggle = document.querySelector('#languageToggle');
const translatableElements = document.querySelectorAll('[data-es][data-en]');
const cvLinks = document.querySelectorAll('.cv-link');
let language = localStorage.getItem('portfolio-language') ||
  ((navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en');

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;

  translatableElements.forEach((element) => {
    element.innerHTML = element.dataset[language];
  });

  cvLinks.forEach((link) => {
    link.href = language === 'es'
      ? 'Román Flores Esp.pdf'
      : 'Román Flores Eng (2).pdf';
  });

  languageToggle.querySelectorAll('span').forEach((label) => {
    label.classList.toggle('active', label.textContent.toLowerCase() === language);
  });

  languageToggle.setAttribute(
    'aria-label',
    language === 'es' ? 'Switch to English' : 'Cambiar a español'
  );
  document.title = language === 'es'
    ? 'Román Flores — Ingeniero de Software'
    : 'Román Flores — Software Engineer';
  localStorage.setItem('portfolio-language', language);
}

languageToggle.addEventListener('click', () => {
  setLanguage(language === 'es' ? 'en' : 'es');
});

setLanguage(language);
document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const navigationLinks = document.querySelectorAll('.nav-center a');
const observedSections = [...navigationLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navigationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.25 });

observedSections.forEach((section) => navigationObserver.observe(section));
