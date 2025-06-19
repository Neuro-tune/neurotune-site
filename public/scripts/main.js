// GSAP ScrollTrigger
if (window.gsap && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

// section fade-in/out
gsap.utils.toArray('.section').forEach(sec => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    end: 'bottom top',
    onEnter:    () => gsap.to(sec, {opacity:1, y:0, duration:0.6}),
    onLeave:    () => gsap.to(sec, {opacity:0, y:-50, duration:0.4}),
    onEnterBack:() => gsap.to(sec, {opacity:1, y:0, duration:0.6}),
    onLeaveBack:() => gsap.to(sec, {opacity:0, y:50, duration:0.4})
  });
});

// progress bar + parallax (если есть слои)
window.addEventListener('scroll', () => {
  const s = window.scrollY, d = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progressBar').style.width = `${(s/d)*100}%`;
  document.querySelectorAll('.parallax-layer').forEach(l => {
    l.style.transform = `translateY(${s * parseFloat(l.dataset.speed)}px)`;
  });
});

// WaveSurfer.js audio wave
const wavesurfer = WaveSurfer.create({
  container:'#waveform', waveColor:'rgba(255,255,255,0.2)',
  progressColor:'cyan', height:80, barWidth:2, responsive:true
});
wavesurfer.load('/sample.mp3');

// smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    const tgt = document.querySelector(a.getAttribute('href'));
    if (tgt) { e.preventDefault(); tgt.scrollIntoView({behavior:'smooth'}); }
  })
);

// burger menu
document.querySelector('.burger')?.addEventListener('click', () =>
  document.querySelector('.nav-links').classList.toggle('show')
);
