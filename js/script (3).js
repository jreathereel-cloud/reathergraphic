// Tout le code est dans une fonction pour éviter les conflits de noms
// avec script-responsive.js (qui déclare aussi "observer" et "observerOptions").
(function () {

// ========== FILTRAGE DES PROJETS ==========

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const gallery = document.getElementById('gallery');

    // Ajouter un écouteur d'événement à chaque bouton de filtre
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Affichage des informations
            if (filter === 'tous') {
                gallery.classList.remove('category-view');
            } else {
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

})();
