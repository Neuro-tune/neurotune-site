// 0) GSAP ScrollTrigger
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// 1) Section scroll animations
['home','features','commands','faq'].forEach(id => {
  gsap.from(`#${id}`, {
    opacity:0, y:50, duration:1,
    scrollTrigger:{
      trigger:`#${id}`,
      start:'top 80%',
      toggleActions:'play none none reverse'
    }
  });
});

// Hero animations
gsap.from('header h1',{opacity:0,y:-40,duration:1,scrollTrigger:{trigger:'#home',start:'top center'}});
gsap.from('header p',{opacity:0,y:40,duration:1,delay:0.3,scrollTrigger:{trigger:'#home',start:'top center'}});
gsap.from('#waveform',{opacity:0,scale:0.8,duration:1,scrollTrigger:{trigger:'#home',start:'top center'}});

// 2) Progress-bar + parallax
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  const d=document.documentElement.scrollHeight-window.innerHeight;
  const w=(s/d)*100;
  document.getElementById('progressBar').style.width=w+'%';
  document.querySelectorAll('.parallax-layer').forEach(layer=>{
    layer.style.transform=`translateY(${s * parseFloat(layer.dataset.speed)}px)`;
  });
});

// 3) Wavesurfer
const wavesurfer=WaveSurfer.create({
  container:'#waveform',
  waveColor:'rgba(255,255,255,0.2)',
  progressColor:'cyan',
  height:80,
  barWidth:2,
  responsive:true
});
wavesurfer.load('/sample.mp3');

// 4) Smooth scroll & section toggle
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.style.display = sec.id === id ? 'block' : 'none';
  });
}
document.querySelectorAll('.nav-link, .buttons a, .logo').forEach(el=>{
  el.addEventListener('click', e => {
    e.preventDefault();
    const target = el.dataset.target;
    if (target) showSection(target);
  });
});

// 5) Tabs Commands filter
const tabs = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.command-card');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const filter = tab.dataset.filter;
  cards.forEach(c => {
    c.style.display = (filter === 'all' || c.dataset.category === filter) ? 'inline-block' : 'none';
  });
}));

// init: show only home
showSection('home');
