/**
 * JavaScript personnalisé pour la gestion des sliders
 */
$(document).ready(function() {
    // Configuration pour tous les sliders de solutions
    $('.solutions-slider').each(function(index) {
        var $slider = $(this);
        var $container = $slider.closest('.slider-container');
        var $prevBtn = $container.find('.slider-prev');
        var $nextBtn = $container.find('.slider-next');
        var $dotsContainer = $container.find('.slider-dots');
        
        // Nombre total d'éléments
        var totalItems = $slider.children().length;
        // Éléments visibles à la fois
        var visibleItems = 4;
        // Nombre de groupes (1 dot = 4 cartes)
        var totalGroups = Math.ceil(totalItems / visibleItems);
        
        // Création des dots
        for (var i = 0; i < totalGroups; i++) {
            var dotClass = i === 0 ? 'dot active' : 'dot';
            $dotsContainer.append('<span class="' + dotClass + '" data-index="' + i + '"></span>');
        }
        
               // État actuel du slider
        var currentGroup = 0;
        
        // Fonction pour déplacer le slider
        function moveSlider(groupIndex) {
            // Vérifier les limites
            if (groupIndex < 0) {
                groupIndex = 0;
            } else if (groupIndex >= totalGroups) {
                groupIndex = totalGroups - 1;
            }
            
            currentGroup = groupIndex;
            
            // Calculer le déplacement
            var translateValue = -(groupIndex * visibleItems * 25) + '%';
            
            // Animer le slider
            $slider.css({
                'transform': 'translateX(' + translateValue + ')',
                'transition': 'transform 0.5s ease'
            });
            
            // Mise à jour des dots
            $dotsContainer.find('.dot').removeClass('active');
            $dotsContainer.find('.dot[data-index="' + groupIndex + '"]').addClass('active');
            
            // Désactiver/activer les boutons selon la position
            if (groupIndex === 0) {
                $prevBtn.addClass('disabled').css('opacity', '0.5');
            } else {
                $prevBtn.removeClass('disabled').css('opacity', '0.8');
            }
            
            if (groupIndex === totalGroups - 1) {
                $nextBtn.addClass('disabled').css('opacity', '0.5');
            } else {
                $nextBtn.removeClass('disabled').css('opacity', '0.8');
            }
        }
        
        // Initialisation
        moveSlider(0);
        
        // Événements pour les boutons de navigation
        $prevBtn.on('click', function() {
            if (!$(this).hasClass('disabled')) {
                moveSlider(currentGroup - 1);
            }
        });
        
        $nextBtn.on('click', function() {
            if (!$(this).hasClass('disabled')) {
                moveSlider(currentGroup + 1);
            }
        });
        
        // Événements pour les dots
        $dotsContainer.on('click', '.dot', function() {
            var groupIndex = parseInt($(this).data('index'));
            moveSlider(groupIndex);
        });
        
        // Support tactile pour mobile
        var startX, endX;
        $container.on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
        });
        
        $container.on('touchmove', function(e) {
            endX = e.originalEvent.touches[0].clientX;
        });
        
        $container.on('touchend', function() {
            var threshold = 100; // Seuil de glissement en pixels
            if (startX - endX > threshold) {
                // Glissement vers la gauche (suivant)
                moveSlider(currentGroup + 1);
            } else if (endX - startX > threshold) {
                // Glissement vers la droite (précédent)
                moveSlider(currentGroup - 1);
            }
        });
    });

    // Défilement fluide pour les liens d'ancrage
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
    
    // Ajustement de la hauteur des cartes pour qu'elles aient la même hauteur
    function equalizeCardHeights() {
        $('.solutions-slider').each(function() {
            var maxHeight = 0;
            var $cards = $(this).find('.card-link');
            
            // Réinitialiser les hauteurs
            $cards.css('height', 'auto');
            
            // Trouver la hauteur maximale
            $cards.each(function() {
                var cardHeight = $(this).outerHeight();
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });
            
            // Appliquer la hauteur maximale à toutes les cartes
            if (maxHeight > 0) {
                $cards.css('height', maxHeight + 'px');
            }
        });
    }
    
    // Exécuter lors du chargement et du redimensionnement
    equalizeCardHeights();
    $(window).on('resize', function() {
        equalizeCardHeights();
    });

    // Récupérer l'élément de l'icône
    var backToTopButton = document.getElementById('backtotop');

    // Afficher ou cacher l'icône en fonction du défilement de la page
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    // Ajouter un événement au clic pour revenir en haut
    backToTopButton.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

});