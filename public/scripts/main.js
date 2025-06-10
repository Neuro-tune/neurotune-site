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
const wavesurfer=WaveSurfer.create({container:'#waveform',waveColor:'rgba(255,255,255,0.2)',
progressColor:'var(--neon)',height:120,barWidth:2,responsive:true});
wavesurfer.load('/sample.mp3');

// 4) Smooth scroll
function scrollToSection(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'});
}
document.querySelectorAll('nav a, .logo').forEach(link=>{
  link.addEventListener('click',e=>{
    const h=link.getAttribute('href');
    if(h&&h.startsWith('#')){e.preventDefault();scrollToSection(h.substring(1));}
  });
});

// 5) Tabs (All/Music/Profile/Info)
const tabs=document.querySelectorAll('.tabs button');
const cards=document.querySelectorAll('.command-card');
tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const f=t.textContent.toLowerCase();
    cards.forEach(c=>{
      c.style.display = (f==='all' || c.textContent.toLowerCase().includes(f)) ? 'block':'none';
    });
  });
});
