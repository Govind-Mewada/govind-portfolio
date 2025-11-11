/* ========== MAIN JS FOR GOVIND'S PORTFOLIO ========== */

/* -- Helper selector -- */
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

/* ========== NAV: hamburger toggle & link close ========== */
const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  // close on clicking nav link
  $$('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

/* ========== SMOOTH SCROLL & ACTIVE LINK ON SCROLL ========== */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
const sections = $$('section[id]');
const navLinks = $$('.nav-menu a[href^="#"]');

function onScrollActive() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (window.scrollY >= (top - 200)) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}
window.addEventListener('scroll', onScrollActive);

/* ========== NAVBAR SCROLL EFFECT ========== */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.style.boxShadow = '0 8px 30px rgba(2,6,23,0.08)';
    nav.style.background = 'rgba(255,255,255,0.98)';
  } else {
    nav.style.boxShadow = 'none';
    nav.style.background = '';
  }
});

/* ========== TYPING CYCLE: Software -> AI -> DevOps ========== */
const roles = ["Software Engineer", "AI Engineer", "DevOps Engineer"];
let roleIndex = 0, charIndex = 0;
const typingSpeed = 90, eraseSpeed = 50, delayBetween = 1400;
const roleElement = document.querySelector('.dynamic-role');

if (roleElement) {
  function typeRole() {
    if (charIndex < roles[roleIndex].length) {
      roleElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(eraseRole, delayBetween);
    }
  }
  function eraseRole() {
    if (charIndex > 0) {
      roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, eraseSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    }
  }
  // start with small delay so layout settles
  setTimeout(typeRole, 600);
}

/* ========== THEME TOGGLE (dark/light) ========== */
const themeToggleBtn = document.querySelector('.theme-toggle');
function setTheme(mode){
  if(mode === 'dark') document.body.classList.add('dark-theme');
  else document.body.classList.remove('dark-theme');
  localStorage.setItem('theme', mode);
}
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  // load saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    setTheme('dark'); themeToggleBtn.textContent = '☀️ Light';
  } else { setTheme('light'); themeToggleBtn.textContent = '🌙 Dark'; }
}

/* ========== RIPPLE EFFECT FOR BUTTONS ========== */
function addRipple(e){
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  circle.classList.add('ripple');
  btn.appendChild(circle);
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  circle.style.width = circle.style.height = d + 'px';
  const rect = btn.getBoundingClientRect();
  circle.style.left = (e.clientX - rect.left - d/2) + 'px';
  circle.style.top = (e.clientY - rect.top - d/2) + 'px';
  setTimeout(()=> circle.remove(), 650);
}
$$('.btn').forEach(b => b.addEventListener('click', addRipple));

/* ========== INTERSECTION OBSERVER: reveal sections & stagger items ========== */
const ioOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // stagger children like skill-category / project-card
      const gridItems = entry.target.querySelectorAll('.skill-category, .project-card, .achievement-card, .certification-card');
      gridItems.forEach((item, idx) => {
        item.style.transitionDelay = `${idx * 80}ms`;
        item.classList.add('show');
      });
      io.unobserve(entry.target);
    }
  });
}, ioOptions);
sections.forEach(s => io.observe(s));

/* ========== CONTACT FORM: open mail client & simple validation ========== */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(this);
    const name = fd.get('name') || 'No name';
    const email = fd.get('email') || 'No email';
    const subject = fd.get('subject') || 'No subject';
    const message = fd.get('message') || '';
    const mailto = `mailto:mewadagovind564@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setTimeout(()=> this.reset(), 400);
  });
}

/* ========== SMALL INTERACTIONS ========== */
// Contact items subtle reveal
const contactSection = document.querySelector('#contact');
if (contactSection) {
  const cItems = contactSection.querySelectorAll('.contact-item');
  cItems.forEach((it, i) => {
    setTimeout(()=> it.classList.add('show'), 200 + i * 160);
  });
}

/* ========== ENSURE NAV ACTIVE ON LOAD ========== */
window.addEventListener('load', onScrollActive);
