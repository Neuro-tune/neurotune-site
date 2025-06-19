// Fade-in panels with Intersection Observer
const panels = document.querySelectorAll('.panel');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('visible', e.isIntersecting);
  });
}, { threshold: 0.5 });

panels.forEach(p => observer.observe(p));

// Smooth scroll & active nav link
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.nav__links a').forEach(l => l.classList.remove('active'));
    a.classList.add('active');
    // mobile menu close
    document.querySelector('.nav__links').classList.remove('show');
  });
});

// Burger menu toggle
document.querySelector('.nav__burger')?.addEventListener('click', () => {
  document.querySelector('.nav__links').classList.toggle('show');
});

// WaveSurfer audio waveform
if (window.WaveSurfer) {
  const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'rgba(255,255,255,0.2)',
    progressColor: '#4ca1af',
    height: 80, barWidth: 2, responsive: true
  });
  wavesurfer.load('/public/sample.mp3');
}
