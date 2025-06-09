// scripts/main.js

// 1) Прогресс-бар + параллакс
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / docHeight) * 100;
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = progress + '%';

  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.dataset.speed) || 0;
    layer.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// 2) Инициализация Wavesurfer.js
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgba(255,255,255,0.2)',
  progressColor: 'var(--highlight)',
  height: 120,
  barWidth: 2,
  responsive: true
});
// замените путь на реальный демо-трек
wavesurfer.load('/sample.mp3');

// 3) GSAP ScrollTrigger-анимации
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.feature').forEach(el => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// 4) Smooth scroll для навигации
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('nav a, .logo').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});

// 5) Логика табов в секции Commands
const tabs = document.querySelectorAll('.tabs button');
const cards = document.querySelectorAll('.command-card');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const filter = tab.dataset.filter;
  cards.forEach(card => {
    const cat = card.dataset.category;
    card.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
  });
}));

// 6) FAQ: только одна открыта
function toggleFAQ(card) {
  document.querySelectorAll('.faq-card').forEach(c => {
    if (c !== card) c.classList.remove('open');
  });
  card.classList.toggle('open');
}
document.querySelectorAll('.faq-card').forEach(card => {
  card.addEventListener('click', () => toggleFAQ(card));
});
