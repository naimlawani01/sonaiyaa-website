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

// ─── HERO MAP — Livreurs animés ──────────────────────
// Coordonnées de la zone "land" dans le viewBox 1000x700 (en SVG units).
// On veut que les markers restent dans la péninsule stylisée.
const MAP_BOUNDS = [
  { xMin: 130, xMax: 230, yMin: 360, yMax: 430 }, // Kaloum
  { xMin: 300, xMax: 400, yMin: 360, yMax: 420 }, // Dixinn
  { xMin: 460, xMax: 560, yMin: 360, yMax: 430 }, // Matam
  { xMin: 620, xMax: 720, yMin: 360, yMax: 420 }, // Hamdallaye
  { xMin: 760, xMax: 860, yMin: 360, yMax: 430 }, // Ratoma
];
const NS = 'http://www.w3.org/2000/svg';

function randomInZone(zone) {
  return {
    x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
    y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
  };
}

function createLivreurMarker(initial) {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'livreur-marker');
  g.setAttribute('transform', `translate(${initial.x} ${initial.y})`);

  const pulse = document.createElementNS(NS, 'circle');
  pulse.setAttribute('class', 'lm-pulse');
  pulse.setAttribute('r', '10');
  g.appendChild(pulse);

  const core = document.createElementNS(NS, 'circle');
  core.setAttribute('class', 'lm-core');
  core.setAttribute('r', '8');
  g.appendChild(core);

  return g;
}

const mapContainer = document.getElementById('mapLivreurs');
const liveCountEl = document.getElementById('liveCount');

if (mapContainer) {
  const NB_LIVREURS = 4;
  const markers = [];

  // Initialisation — un livreur par zone, position aléatoire
  for (let i = 0; i < NB_LIVREURS; i++) {
    const zone = MAP_BOUNDS[i % MAP_BOUNDS.length];
    const pos = randomInZone(zone);
    const marker = createLivreurMarker(pos);
    // Décale le pulse de chaque marker pour que ça ne pulse pas en sync
    const pulse = marker.querySelector('.lm-pulse');
    pulse.style.animationDelay = `${i * 0.4}s`;
    mapContainer.appendChild(marker);
    markers.push({ el: marker, currentZone: i % MAP_BOUNDS.length });
  }

  // Boucle d'animation : chaque livreur change de position toutes les 3-5 secondes
  function moveOneLivreur() {
    if (document.hidden) return; // pas d'animation onglet caché
    const m = markers[Math.floor(Math.random() * markers.length)];
    // Choisir une nouvelle zone, plutôt voisine (réaliste : ils ne téléportent pas)
    let newZone = (m.currentZone + (Math.random() < 0.5 ? -1 : 1) + MAP_BOUNDS.length) % MAP_BOUNDS.length;
    // Sinon une position dans la zone actuelle
    if (Math.random() < 0.4) newZone = m.currentZone;
    const pos = randomInZone(MAP_BOUNDS[newZone]);
    m.el.setAttribute('transform', `translate(${pos.x} ${pos.y})`);
    m.currentZone = newZone;
  }

  setInterval(moveOneLivreur, 1800);

  // Compteur live qui varie légèrement (3 à 5)
  if (liveCountEl) {
    setInterval(() => {
      const n = 3 + Math.floor(Math.random() * 3); // 3 à 5
      liveCountEl.textContent = `${n} livreurs`;
    }, 8000);
  }
}
