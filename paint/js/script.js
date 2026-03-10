function customGalleryIMG() {
    const galleryItems = document.querySelectorAll('.gallery-item');

}


// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Professional Scroll Animations
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, animationObserverOptions);

    // Add animation classes to elements
    const animatedGalleryItems = document.querySelectorAll('.gallery-item');
    const animatedContactItems = document.querySelectorAll('.contact-item');
    const animatedFooterSections = document.querySelectorAll('.footer-section');
    const animatedSectionTitles = document.querySelectorAll('.section-title');

    // Apply scroll animations
    animatedGalleryItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            item.classList.add('slide-left');
        } else {
            item.classList.add('slide-right');
        }
        animationScrollObserver.observe(item);
    });

    animatedContactItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        animationScrollObserver.observe(item);
    });

    animatedFooterSections.forEach(section => {
        section.classList.add('animate-on-scroll');
        animationScrollObserver.observe(section);
    });

    animatedSectionTitles.forEach(title => {
        title.classList.add('animate-on-scroll');
        animationScrollObserver.observe(title);
    });

    // Form Security and Validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission for security
            
            // Basic input sanitization and validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            // Validate inputs
            if (!name || name.length < 2 || name.length > 100) {
                showSecurityPopup('error', 'Invalid Name', 'Please enter a valid name (2-100 characters)');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showSecurityPopup('error', 'Invalid Email', 'Please enter a valid email address');
                return;
            }
            
            if (!message || message.length < 10 || message.length > 1000) {
                showSecurityPopup('error', 'Invalid Message', 'Please enter a message (10-1000 characters)');
                return;
            }
            
            // Send data to PHP backend
            const formData = {
                name: name,
                email: email,
                message: message
            };
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send to backend
            fetch('backend/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showSecurityPopup('success', 'Message Sent!', data.message);
                    this.reset();
                } else {
                    showSecurityPopup('error', 'Error', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showSecurityPopup('error', 'Connection Error', 'Failed to send message. Please check your internet connection and try again.');
            })
            .finally(() => {
                // Restore button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 100;
    }

    // Security popup close functionality
    const securityPopupCloseBtn = document.getElementById('securityPopupCloseBtn');
    if (securityPopupCloseBtn) {
        securityPopupCloseBtn.addEventListener('click', closeSecurityPopup);
    }

    // View My Paintings button functionality
    const viewPaintingsBtn = document.getElementById('viewPaintingsBtn');
    if (viewPaintingsBtn) {
        viewPaintingsBtn.addEventListener('click', function() {
            window.location.href = 'gallery.html';
        });
    }

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

    // Smooth scrolling for navigation links
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

    // Gallery Filter Functionality - Simplified for paintings only
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Since we only have paintings now, no filtering needed
    // All items will always be visible

    // Modal functionality for artwork details
    const modal = document.getElementById('artworkModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalArtist = modal.querySelector('.modal-artist');
    const modalMedium = modal.querySelector('.modal-medium');
    const modalPrice = modal.querySelector('.modal-price');
    const modalDescription = modal.querySelector('.modal-description');
    const closeModal = modal.querySelector('.close');

    // Artwork data - Your paintings only
    const artworkData = {
        'paintings-1': {
            title: 'Your First Painting Title',
            artist: 'Your Name',
            medium: 'Oil on Canvas, 24" x 36"',
            price: '$2,500',
            description: 'Describe your first painting here. What inspired you to create this piece? What techniques did you use?'
        },
        'paintings-2': {
            title: 'Your Second Painting Title',
            artist: 'Your Name',
            medium: 'Acrylic on Canvas, 30" x 40"',
            price: '$3,200',
            description: 'Tell the story behind your second painting. What emotions or experiences does it represent?'
        },
        'paintings-3': {
            title: 'Your Third Painting Title',
            artist: 'Your Name',
            medium: 'Watercolor on Paper, 18" x 24"',
            price: '$1,800',
            description: 'Describe the inspiration and process behind this watercolor piece.'
        },
        'paintings-4': {
            title: 'Your Fourth Painting Title',
            artist: 'Your Name',
            medium: 'Mixed Media on Canvas, 36" x 48"',
            price: '$2,800',
            description: 'Explain the mixed media techniques and materials you used in this artwork.'
        },
        'paintings-5': {
            title: 'Your Fifth Painting Title',
            artist: 'Your Name',
            medium: 'Oil on Canvas, 30" x 24"',
            price: '$3,500',
            description: 'Share the creative journey and meaning behind this oil painting.'
        },
        'paintings-6': {
            title: 'Your Sixth Painting Title',
            artist: 'Your Name',
            medium: 'Acrylic on Canvas, 32" x 26"',
            price: '$2,600',
            description: 'Describe what makes this painting special and unique in your collection.'
        }
    };

    // Add click events to artwork cards
    document.querySelectorAll('.artwork-card').forEach(card => {
        card.addEventListener('click', function() {
            const artworkImage = this.querySelector('.artwork-image');
            const imageClass = Array.from(artworkImage.classList).find(cls => 
                cls.includes('-') && artworkData[cls]
            );


            if (imageClass && artworkData[imageClass]) {
                const data = artworkData[imageClass];
                
                modalImage.className = 'modal-image ' + imageClass;
                modalTitle.textContent = data.title;
                modalArtist.textContent = 'by ' + data.artist;
                modalMedium.textContent = data.medium;
                modalPrice.textContent = data.price;
                modalDescription.textContent = data.description;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal events
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Inquire button functionality
    document.querySelector('.inquire-btn').addEventListener('click', function() {
        const artworkTitle = modalTitle.textContent;
        const artist = modalArtist.textContent;
        
        // Create mailto link with pre-filled subject and body
        const subject = encodeURIComponent(`Inquiry about ${artworkTitle}`);
        const body = encodeURIComponent(`Hello,\n\nI am interested in learning more about "${artworkTitle}" ${artist}. Could you please provide more information about purchasing this artwork?\n\nThank you,`);
        
        window.location.href = `mailto:info@artisangallery.com?subject=${subject}&body=${body}`;
    });

    // Navbar always dark
    const navbar = document.querySelector('.navbar');
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';

    // CTA Button scroll to gallery
    document.querySelector('.cta-button').addEventListener('click', function() {
        document.querySelector('#gallery').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Form submission handling
    document.querySelector('.contact-form form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe gallery items for animation
    document.querySelectorAll('.gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroArtwork = document.querySelector('.hero-artwork');
        
        if (heroArtwork) {
            heroArtwork.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Apply styling to all painting images
    document.querySelectorAll('.artwork-image').forEach(img => {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add hover effects to cards
    function addHoverEffect(selector) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addHoverEffect('.artwork-card');



    // Console welcome message
    console.log(`
    🎨 Welcome to My Painting Gallery!
    
    This interactive painting gallery features:
    • Responsive design with smooth animations
    • Modal popups with detailed painting information
    • Mobile-friendly navigation
    • Contact form functionality
    • Parallax scrolling effects
    
    Enjoy exploring my paintings!
    `);
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const heroArtwork = document.querySelector('.hero-artwork');
    const scrolled = window.pageYOffset;
    
    // Parallax effect
    if (heroArtwork && scrolled < window.innerHeight) {
        heroArtwork.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 10);

// Replace the scroll event listener with the optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images (placeholder for actual implementation)
function preloadImages() {
    const imageUrls = [
        // Add actual image URLs here when available
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Custom Security Popup Functions
function showSecurityPopup(type, title, message) {
    const popup = document.getElementById('securityPopup');
    const icon = document.getElementById('popupIcon');
    const titleElement = document.getElementById('popupTitle');
    const messageElement = document.getElementById('popupMessage');
    
    // Set icon and styling based on type
    if (type === 'error') {
        icon.textContent = '⚠️';
        icon.className = 'security-popup-icon error';
    } else if (type === 'success') {
        icon.textContent = '✅';
        icon.className = 'security-popup-icon success';
    }
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSecurityPopup() {
    const popup = document.getElementById('securityPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const popup = document.getElementById('securityPopup');
    if (event.target === popup) {
        closeSecurityPopup();
    }
});
