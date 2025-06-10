// scripts/main.js

// 0) GSAP ScrollTrigger registration
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// 1) Section entrance animations
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

// 2) Hero animations
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

// 3) Progress bar + Parallax
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

// 4) Wavesurfer initialization
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgba(255,255,255,0.2)',
  progressColor: 'var(--highlight)',
  height: 120,
  barWidth: 2,
  responsive: true
});
wavesurfer.load('/sample.mp3');

// 5) Smooth scroll navigation
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

// 6) Commands tabs filtering
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

// 7) FAQ toggle behavior
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

// 8) Live music‑reactive canvas background

// Audio analyser setup
const audioCtx = wavesurfer.backend.getAudioContext 
  ? wavesurfer.backend.getAudioContext() 
  : wavesurfer.backend.ac;
const analyser = audioCtx.createAnalyser();
audioCtx.destination.connect(analyser); // или wavesurfer.backend.sourceNode.connect(analyser)
analyser.fftSize = 128;

// Correct load path
wavesurfer.load('sample.mp3');

// Canvas setup
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle system
const particles = [];
const MAX = 120;
function spawnNote(mag) {
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: 8 + mag / 10,
    speed: 1 + mag / 20,
    opacity: 0.8
  });
}

// Animation loop
function animateBg() {
  requestAnimationFrame(animateBg);
  const freq = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freq);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particles.length < MAX && freq[1] > 120 && Math.random() < 0.4) {
    spawnNote(freq[1]);
  }

  particles.forEach((p, i) => {
    ctx.font = `${p.size}px serif`;
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.fillText('♪', p.x, p.y);
    p.y -= p.speed;
    p.opacity -= 0.005;
    if (p.opacity <= 0) particles.splice(i, 1);
  });
}

// Start background when audio is ready
wavesurfer.on('ready', () => {
  animateBg();
});
