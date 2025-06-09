// scripts/main.js

// 0) Регистрация GSAP ScrollTrigger
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// 1) Анимации секций
['home', 'features', 'commands', 'faq'].forEach(id => {
  gsap.from(`#${id}`, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: `#${id}`,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

// 2) Hero-анимации
gsap.from('header h1', {
  opacity: 0, y: -40, duration: 1,
  scrollTrigger: { trigger: '#home', start: 'top center' }
});
gsap.from('header p', {
  opacity: 0, y: 40, duration: 1, delay: 0.3,
  scrollTrigger: { trigger: '#home', start: 'top center' }
});
gsap.from('#waveform', {
  opacity: 0, scale: 0.8, duration: 1,
  scrollTrigger: { trigger: '#home', start: 'top center' }
});

// 3) Progress-bar + Parallax
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

// 4) Wavesurfer.js
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgba(255,255,255,0.2)',
  progressColor: 'var(--highlight)',
  height: 120,
  barWidth: 2,
  responsive: true
});
wavesurfer.load('/sample.mp3');

// 5) Smooth scroll навигации
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

// 6) Tabs Commands
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

// 7) FAQ toggle
function toggleFAQ(card) {
  document.querySelectorAll('.faq-card').forEach(c => {
    if (c !== card) c.classList.remove('open');
  });
  card.classList.toggle('open');
}
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const card = q.parentElement;
    if (card && card.classList.contains('faq-card')) {
      toggleFAQ(card);
    }
  });
});
