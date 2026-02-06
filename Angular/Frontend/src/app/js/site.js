// Inicializa la lógica de la UI cuando el contenido de la app está disponible
function initSite() {
  // Configuración del IntersectionObserver para animaciones de fade-in
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

  // Observar elementos con clase fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    io.observe(el);
  });

  // Efecto parallax en el elemento main al mover el ratón
  const main = document.querySelector('main');

  if (main) {
    // Pausar animación al entrar con el ratón
    main.addEventListener('mouseenter', () => {
      main.style.animationPlayState = 'paused';
    });

    // Reanudar animación al salir
    main.addEventListener('mouseleave', () => {
      main.style.animationPlayState = 'running';
    });

    // Mover el fondo con el ratón (solo en pantallas grandes)
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

  // Inicializar secciones y navegación
  const sections = document.querySelectorAll('#main-content section');
  sections.forEach(section => {
    if (section.id !== 'home') {
      section.classList.add('hidden');
    } else {
      section.classList.add('active');
    }
  });

  // Evitar que el formulario de búsqueda recargue la página
  const searchForms = document.querySelectorAll('form[role="search"]');
  searchForms.forEach(f => f.addEventListener('submit', (ev) => ev.preventDefault()));

  // Manejar clics en enlaces con data-page y cerrar menú en móviles
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-page]');
    if (target) {
      e.preventDefault();
      const page = target.getAttribute('data-page');
      showPage(page);

      // Cerrar collapse si está abierto (bootstrap 5)
      const navbarCollapseEl = document.getElementById('navbarNavDropdown');
      if (navbarCollapseEl && window.bootstrap) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl) || new bootstrap.Collapse(navbarCollapseEl, {toggle:false});
        bsCollapse.hide();
      }
    }
  });
}

// Esperar a que Angular inserte el contenido (polling)
const waitForMain = setInterval(() => {
  if (document.querySelector('#main-content')) {
    clearInterval(waitForMain);
    initSite();
  }
}, 100);

function showPage(pageId) {
 

  // Mostrar la sección seleccionada
  const activeSection = document.getElementById(pageId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('active');
  }

  // Actualizar navbar active
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
}
