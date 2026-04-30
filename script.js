// ─── NAV SCROLL ──────────────────────────────────────
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 60);
  lastScroll = y;
}, { passive: true });

// ─── MOBILE MENU ─────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// ─── COUNTER ANIMATION ──────────────────────────────
const counters = document.querySelectorAll('.stat__number[data-count]');
const animateCounter = (el) => {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * ease);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => statsObserver.observe(c));

// ─── SCROLL REVEAL ───────────────────────────────────
const reveals = document.querySelectorAll(
  '.feature-card, .how__step, .audience__content, .audience__visual, .download__content'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = `opacity 0.7s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1)`;
  revealObserver.observe(el);
});

// ─── SMOOTH ANCHOR LINKS ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
