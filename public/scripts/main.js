// GSAP + ScrollSnap fade
if(gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
const panels = document.querySelectorAll('.section');
panels.forEach(sec => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top', end: 'bottom top',
    onEnter:    () => gsap.to(sec, {autoAlpha:1, y:0, duration:0.7}),
    onLeave:    () => gsap.to(sec, {autoAlpha:0, y:-50, duration:0.5}),
    onEnterBack:() => gsap.to(sec, {autoAlpha:1, y:0, duration:0.7}),
    onLeaveBack:() => gsap.to(sec, {autoAlpha:0, y:50, duration:0.5})
  });
});

// Progress bar
document.addEventListener('scroll', () => {
  const s=window.scrollY, d=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('progressBar').style.width = (s/d*100)+'%';
});

// WaveSurfer
const wavesurfer = WaveSurfer.create({container:'#waveform',waveColor:'rgba(255,255,255,0.2)',progressColor:'#0ff',height:80,barWidth:2});
wavesurfer.load('assets/sample.mp3');

// Burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav__links');
burger?.addEventListener('click', () => navLinks.classList.toggle('show'));

// Smooth links
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
}));
