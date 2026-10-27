// Tout le code est dans une fonction pour éviter les conflits de noms
// avec script-responsive.js (qui déclare aussi "observer" et "observerOptions").
(function () {

// ========== LIGHTBOX FUNCTIONALITY ==========
function initLightbox() {
    // Créer l'overlay de la lightbox
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightboxOverlay';
    
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const img = document.createElement('img');
    img.id = 'lightboxImage';
    
    content.appendChild(img);
    overlay.appendChild(closeBtn);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    return { overlay, img, closeBtn };
}

const { overlay: lightboxOverlay, img: lightboxImg, closeBtn: lightboxClose } = initLightbox();

// Ouvrir la lightbox
function openLightbox(imageSrc) {
    lightboxImg.src = imageSrc;
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

// Fermer la lightbox
function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurer le scroll
}

// Évenements pour fermer la lightbox
lightboxClose.addEventListener('click', closeLightbox);

// Fermer en cliquant en dehors de l'image
lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) {
        closeLightbox();
    }
});

// Fermer avec ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ========== FILTRAGE DES PROJETS ==========

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const gallery = document.getElementById('gallery');
    const projectImages = document.querySelectorAll('.project-image img');

    // Ajouter des écouteurs d'événement au clic sur les images
    projectImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation du clic
            const imageSrc = this.src;
            openLightbox(imageSrc);
        });
    });

    // Ajouter un écouteur d'événement à chaque bouton de filtre
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Gestion de l'affichage des descriptions
            if (filter === 'tous') {
                // Afficher les descriptions quand "Tous" est sélectionné
                gallery.classList.remove('category-view');
            } else {
                // Masquer les descriptions pour les autres catégories
                gallery.classList.add('category-view');
            }

            // Filtrer les cartes de projets
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Afficher ou masquer les cartes selon le filtre
                if (filter === 'tous' || category === filter) {
                    // Afficher la carte avec animation
                    card.classList.remove('hidden');
                    card.classList.add('show');

                    // Forcer le reflow pour relancer l'animation
                    void card.offsetWidth;
                } else {
                    // Masquer la carte
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });

            console.log('Filtre appliqué:', filter);
        });
    });

    // Animation des cartes au chargement de la page
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ========== SCROLL SMOOTH ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== INTERSECTION OBSERVER POUR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les cartes de projets
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== STATS ANIMATION ==========
const animateStats = () => {
    const statsSection = document.querySelector('.stats-section');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Stats section visible');
                statsObserver.unobserve(entry.target);
            }
        });
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
};

animateStats();

// ========== CONSOLE LOG POUR DEBUG ==========
console.log('Page Travaux chargée avec succès!');
console.log('Filtres disponibles: Tous, Graphisme, Web Design, Branding, Événementiel');
console.log('Lightbox activée - cliquez sur les images pour les agrandir');

})();
