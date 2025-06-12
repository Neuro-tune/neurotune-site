// 0) GSAP ScrollTrigger
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// 1) Scroll animation
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

// 2) Scroll to section + Active link
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.target;
    scrollToSection(target);
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    if (document.body.classList.contains('menu-open')) toggleMenu();
  });
});

// 3) Burger menu
function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
