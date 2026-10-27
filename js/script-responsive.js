// ===== MENU TOGGLE MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const navBar = document.querySelector('.nav_bar');

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    navBar.classList.toggle('active');
    
    // Animation des lignes du hamburger
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (navBar.classList.contains('active')) {
        if (index === 0) {
          span.style.transform = 'rotate(45deg) translate(8px, 8px)';
        } else if (index === 1) {
          span.style.opacity = '0';
        } else if (index === 2) {
          span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
      } else {
        span.style.transform = 'none';
        span.style.opacity = '1';
      }
    });
  });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav_bar a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navBar.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transform = 'none';
      span.style.opacity = '1';
    });
  });
});

// ===== SMOOTH SCROLL & HIGHLIGHT ACTIVE NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer les éléments de la grille
const gridItems = document.querySelectorAll('.choix_card, .description');
gridItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scroll down
    navbar.style.top = '-100px';
  } else {
    // Scroll up
    navbar.style.top = '0';
  }
  
  // Ajouter une ombre en scrollant
  if (scrollTop > 50) {
    navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  navbar.style.transition = 'top 0.3s ease, box-shadow 0.3s ease';
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== ACTIVE LINK HIGHLIGHTING =====
function highlightActiveLink() {
  const sections = document.querySelectorAll('section, [id]');
  const navLinks = document.querySelectorAll('.nav_bar a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

highlightActiveLink();

// ===== DARK MODE TOGGLE (OPTIONAL) =====
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
      );
    });
    
    // Appliquer le thème sauvegardé
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }
  }
}

initDarkMode();

// ===== FORM VALIDATION (si vous avez un formulaire de contact) =====
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('Veuillez remplir tous les champs obligatoires');
    }
  });
}

// ===== CONSOLE LOG (Pour développement) =====
console.log('✓ Scripts chargés avec succès - Portfolio Responsive');
