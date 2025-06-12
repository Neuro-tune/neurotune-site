// 0) GSAP ScrollTrigger (анимация при прокрутке)
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// 1) Анимации появления секций при скролле
['home', 'features', 'commands', 'faq'].forEach(id => {
  gsap.from(`#${id}`, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: `#${id}`,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Анимации в hero-секции
gsap.from('header h1', { opacity: 0, y: -40, duration: 1 });
gsap.from('header p', { opacity: 0, y: 40, duration: 1, delay: 0.3 });
gsap.from('#waveform', { opacity: 0, scale: 0.8, duration: 1 });

// 2) Прогресс-бар и параллакс
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const d = document.documentElement.scrollHeight - window.innerHeight;
  const w = (s / d) * 100;
  document.getElementById('progressBar').style.width = w + '%';

  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.dataset.speed);
    layer.style.transform = `translateY(${s * speed}px)`;
  });
});

// 3) WaveSurfer.js — аудиоволна
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgba(255,255,255,0.2)',
  progressColor: 'cyan',
  height: 80,
  barWidth: 2,
  responsive: true
});
wavesurfer.load('/sample.mp3');

// 4) Плавный скролл при нажатии на ссылки
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 5) Tabs-фильтрация команд
const tabs = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.command-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter)
        ? 'inline-block'
        : 'none';
    });
  });
});
// 6) Бургер-меню
document.querySelector('.burger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('show');
});

