// Gallery Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) rotate(2deg)';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) rotate(0deg)';
                    }, 100);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) rotate(-2deg)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Enhanced modal functionality for gallery page
    const modal = document.getElementById('artworkModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalArtist = modal.querySelector('.modal-artist');
    const modalMedium = modal.querySelector('.modal-medium');
    const modalDimensions = modal.querySelector('.modal-dimensions');
    const modalYear = modal.querySelector('.modal-year');
    const modalPrice = modal.querySelector('.modal-price');
    const closeBtn = modal.querySelector('.close');

    // Add click event to all artwork cards
    document.querySelectorAll('.artwork-card').forEach(card => {
        card.addEventListener('click', function() {
            const artworkImage = this.querySelector('.artwork-image');
            const artworkInfo = this.querySelector('.artwork-info');
            
            // Get artwork details
            const title = artworkInfo.querySelector('h3').textContent;
            const artist = artworkInfo.querySelector('.artist').textContent;
            const medium = artworkInfo.querySelector('.medium').textContent;
            const dimensions = artworkInfo.querySelector('.dimensions')?.textContent || 'Size varies';
            const year = artworkInfo.querySelector('.year')?.textContent || '2024';
            const price = artworkInfo.querySelector('.price').textContent;
            
            // Get background image from the artwork image element
            const backgroundImage = window.getComputedStyle(artworkImage).backgroundImage;
            
            // Populate modal
            modalImage.style.backgroundImage = backgroundImage;
            modalTitle.textContent = title;
            modalArtist.textContent = `Artist: ${artist}`;
            modalMedium.textContent = `Medium: ${medium}`;
            modalDimensions.textContent = `Dimensions: ${dimensions}`;
            modalYear.textContent = `Year: ${year}`;
            modalPrice.textContent = price;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Scroll animations for gallery items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';
            }
        });
    }, observerOptions);

    // Initialize scroll animations
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) rotate(2deg)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-item h3');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.stats-section')) {
        statsObserver.observe(document.querySelector('.stats-section'));
    }

    function animateStats() {
        statsNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPlus = finalValue.includes('+');
            const isPercent = finalValue.includes('%');
            const numValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            
            let currentValue = 0;
            const increment = Math.ceil(numValue / 50);
            
            const updateStat = () => {
                currentValue += increment;
                if (currentValue >= numValue) {
                    currentValue = numValue;
                    stat.textContent = numValue + (isPlus ? '+' : '') + (isPercent ? '%' : '');
                } else {
                    stat.textContent = currentValue + (isPlus ? '+' : '') + (isPercent ? '%' : '');
                    requestAnimationFrame(updateStat);
                }
            };
            
            updateStat();
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Remove any existing event listeners first
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('.hamburger');
        
        newHamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            newHamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            // Remove existing listeners and add new ones
            link.addEventListener('click', (e) => {
                // Allow navigation to proceed
                newHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!newHamburger.contains(event.target) && !navMenu.contains(event.target)) {
                newHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                newHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Add loading effect for images
    const paintingImages = document.querySelectorAll('.artwork-image');
    paintingImages.forEach(image => {
        const backgroundImage = window.getComputedStyle(image).backgroundImage;
        if (backgroundImage !== 'none') {
            const imgUrl = backgroundImage.slice(4, -1).replace(/"/g, "").split(',')[0];
            const img = new Image();
            img.onload = function() {
                image.classList.add('loaded');
            };
            img.src = imgUrl;
        }
    });
});
