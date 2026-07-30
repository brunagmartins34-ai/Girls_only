/* ===================================================================
   GIRLS ONLY — SCRIPT.JS
   JavaScript puro, sem bibliotecas externas.
   Responsável por:
   1. Header com efeito ao rolar a página
   2. Menu responsivo (abrir/fechar)
   3. Scroll suave ao clicar nos links do menu
   4. Destacar o item ativo do menu durante a rolagem
   5. Revelar elementos (.reveal) conforme aparecem na tela
   6. Botão "voltar ao topo"
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. HEADER: efeito ao rolar ---------- */
  const header = document.getElementById('siteHeader');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);


  /* ---------- 2. MENU RESPONSIVO ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil no mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ---------- 3. SCROLL SUAVE ---------- */
  // (o CSS já define scroll-behavior: smooth, mas garantimos
  // compatibilidade e o cálculo do offset do header fixo)
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });


  /* ---------- 4. DESTACAR ITEM ATIVO DO MENU ---------- */
  const sections = document.querySelectorAll('main section[id], header.site-header');
  const navItems = document.querySelectorAll('.nav-link');

  const highlightActiveLink = () => {
    let currentId = 'inicio';
    const scrollPos = window.scrollY + header.offsetHeight + 60;

    document.querySelectorAll('section[id]').forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink();


  /* ---------- 5. REVELAR ELEMENTOS AO APARECER NA TELA ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // pequeno atraso escalonado para um efeito mais elegante
        const delay = (index % 3) * 90;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---------- 6. MODAL DA GALERIA ---------- */
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImage = document.getElementById('galleryModalImage');
  const galleryModalClose = document.getElementById('galleryModalClose');
  const galleryModalBackdrop = galleryModal.querySelector('.gallery-modal-backdrop');

  const openGalleryModal = (image) => {
    galleryModalImage.src = image.src;
    galleryModalImage.alt = image.alt;
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeGalleryModal = () => {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', () => openGalleryModal(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGalleryModal(image);
      }
    });
  });

  galleryModalClose.addEventListener('click', closeGalleryModal);
  galleryModalBackdrop.addEventListener('click', closeGalleryModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) {
      closeGalleryModal();
    }
  });

  /* ---------- 7. BOTÃO VOLTAR AO TOPO ---------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  };

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
