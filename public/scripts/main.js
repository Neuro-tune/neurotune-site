// Intersection Observer для плавного fade-in/out секций
const panels = document.querySelectorAll('.panel');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
}, { threshold: 0.5 });

panels.forEach(p => io.observe(p));

// Плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({behavior: 'smooth'});
    // Активная ссылка
    document.querySelectorAll('.nav__links a')
      .forEach(link => link.classList.remove('active'));
    a.classList.add('active');
  });
});

// Бургер-меню для мобилок
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
burger?.addEventListener('click', () => navLinks.classList.toggle('show'));

// Простая волна-заглушка (или WaveSurfer)
if (window.WaveSurfer) {
  const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'rgba(255,255,255,0.2)',
    progressColor: '#4ca1af',
    height: 80, barWidth: 2, responsive: true
  });
  wavesurfer.load('/assets/sample.mp3');
}
