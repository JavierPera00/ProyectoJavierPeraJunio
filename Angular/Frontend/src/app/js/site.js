
function initSite() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => {
    io.observe(el);
  });
  const main = document.querySelector('main');

  if (main) {
    main.addEventListener('mouseenter', () => {
      main.style.animationPlayState = 'paused';
    });
    main.addEventListener('mouseleave', () => {
      main.style.animationPlayState = 'running';
    });

    main.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = main.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xp = Math.max(10, Math.min(90, (x / rect.width) * 100));
      const yp = Math.max(20, Math.min(80, (y / rect.height) * 100));
      main.style.backgroundPosition = `${xp}% ${yp}%`;
    });
  }
  const sections = document.querySelectorAll('#main-content section');
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.classList.add('hidden');
    } else {
      section.classList.add('active');
    }
  });

  const searchForms = document.querySelectorAll('form[role="search"]');
  searchForms.forEach(f => f.addEventListener('submit', (ev) => ev.preventDefault()));

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-page]');
    if (target) {
      e.preventDefault();
      const page = target.getAttribute('data-page');
      showPage(page);
      const navbarCollapseEl = document.getElementById('navbarNavDropdown');
      if (navbarCollapseEl && window.bootstrap) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl) || new bootstrap.Collapse(navbarCollapseEl, {toggle:false});
        bsCollapse.hide();
      }
    }
  });
}
const waitForMain = setInterval(() => {
  if (document.querySelector('#main-content')) {
    clearInterval(waitForMain);
    initSite();
  }
}, 100);

function showPage(pageId) {
  const activeSection = document.getElementById(pageId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('active');
  }
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
}
