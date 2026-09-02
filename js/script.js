const header = document.querySelector('.site-header');
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 160;
    if (window.scrollY >= top) current = section.id;
  });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  toggle.setAttribute('aria-expanded', open);
});

links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});

const cvLink = document.querySelector('.cv-float');
if (cvLink) {
  const cvHref = cvLink.getAttribute('href');
  cvLink.removeAttribute('download');

  cvLink.addEventListener('click', event => {
    event.preventDefault();
    fetch(cvHref, { method: 'HEAD' })
      .then(res => { res.ok ? downloadCv(cvHref) : showCvTooltip(); })
      .catch(() => showCvTooltip());
  });
}

function downloadCv(href) {
  const a = document.createElement('a');
  a.href = href;
  a.download = 'Nyaniso-Khoza-CV.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function showCvTooltip() {
  if (!cvLink.querySelector('.cv-float-tooltip')) {
    const tip = document.createElement('span');
    tip.className = 'cv-float-tooltip';
    tip.textContent = 'CV coming soon';
    cvLink.appendChild(tip);
  }
  cvLink.classList.add('cv-tooltip-visible');
  setTimeout(() => cvLink.classList.remove('cv-tooltip-visible'), 2000);
}
