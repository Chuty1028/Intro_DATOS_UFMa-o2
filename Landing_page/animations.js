// ─────────────────────────────────────────────
//  animations.js — Landing page animations
// ─────────────────────────────────────────────

// ── Custom cursor ──────────────────────────────
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left  = mouseX - 4  + 'px';
  dot.style.top   = mouseY - 4  + 'px';
});

// Ring follows with lerp for smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX - 18 + 'px';
  ring.style.top  = ringY - 18 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale ring on hover over interactive elements
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(232,255,71,0.9)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(232,255,71,0.5)';
  });
});


// ── Hero title character-by-character reveal ───
const heroTitle = document.getElementById('hero-title');
const titleText = 'My GitHub Page';

titleText.split('').forEach((char, i) => {
  const span = document.createElement('span');
  span.className = 'char';
  span.textContent = char === ' ' ? '\u00A0' : char;
  span.style.transitionDelay = (i * 40 + 200) + 'ms';
  heroTitle.appendChild(span);
});

// Trigger after a short delay
setTimeout(() => {
  document.querySelectorAll('#hero-title .char').forEach(c => c.classList.add('show'));
}, 100);


// ── Hero sub & CTA fade in ──────────────────────
const sub = document.getElementById('hero-sub');
const cta = document.getElementById('hero-cta');

setTimeout(() => {
  sub.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  sub.style.transform  = 'translateY(0)';
  sub.style.opacity    = '1';
}, 900);

setTimeout(() => {
  cta.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  cta.style.opacity    = '1';
}, 1150);


// ── Card reveals con IntersectionObserver ──────
const cards = document.querySelectorAll('.project-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.index) || 0;
      // Las primeras 3 cards (en pantalla al cargar) no necesitan delay extra
      const delay = idx < 3 ? 300 + idx * 150 : 100 + (idx - 3) * 150;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => revealObserver.observe(card));


// ── Parallax on hero number ─────────────────────
const heroNum = document.querySelector('.hero-number');

document.addEventListener('mousemove', (e) => {
  if (!heroNum) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  heroNum.style.transform = `translate(${x}px, ${y}px)`;
});


// ── Smooth scroll for anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});