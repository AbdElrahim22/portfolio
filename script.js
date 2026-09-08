// ═══════════════════════════════════════════
//  Abd El-Rahim Yousef — Portfolio JS
// ═══════════════════════════════════════════

// ── NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightActiveNav();
});

// ── HAMBURGER ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── ACTIVE NAV ─────────────────────────────
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(sec => {
    const id   = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ── TYPEWRITER ─────────────────────────────
const roles = [
  'Full Stack Developer',
  'ASP.NET Core Expert',
  'Angular & React Dev',
  'Clean Architecture Advocate',
  'Backend API Engineer',
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const current = roles[ri];
  if (!deleting) {
    tw.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    tw.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

// ── SCROLL REVEAL ──────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-card, .skill-category, .project-card, .contact-card, .contact-form'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ── CONTACT FORM ───────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  btn.disabled  = true;
  btn.innerHTML = '<span>Sending...</span>';
  setTimeout(() => {
    success.classList.add('show');
    btn.innerHTML = '<span>Sent! ✓</span>';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    e.target.reset();
  }, 1000);
}

// ── STAT COUNTER ───────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.textContent);
    let count = 0;
    const inc = Math.ceil(target / 40);
    const plus = el.textContent.includes('+') ? '+' : '';
    const timer = setInterval(() => {
      count = Math.min(count + inc, target);
      el.textContent = count + plus;
      if (count >= target) clearInterval(timer);
    }, 40);
  });
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);

// ── SMOOTH LOGO CLICK ──────────────────────
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
