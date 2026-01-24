/**
 * 帛瑀 - Luxury Interior Design Website
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function () {

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('mainNavbar');
    const heroSection = document.getElementById('hero');

    function handleNavbarScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleNavbarScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleNavbarScroll);


    // === Hero Slideshow ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    if (heroSlides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }


    // === Smooth Scroll for Navigation Links ===
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });


    // === Active Navigation Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);


    // === Hero Button Smooth Scroll ===
    const heroButton = document.querySelector('.btn-hero');

    if (heroButton) {
        heroButton.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }


    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Validate required fields
            if (!formData.name || !formData.phone || !formData.message) {
                showNotification('請填寫所有必填欄位', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('感謝您的訊息！我們將盡快與您聯繫。', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }


    // === Notification System ===
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 20px 30px;
            background: ${type === 'success' ? '#C5A47E' : '#e74c3c'};
            color: white;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 14px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            animation: slideInRight 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;

        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }


    // === LeBlanc-Style Scroll Reveal Animations ===
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, revealOptions);

    // Select all elements that should animate on scroll
    const revealElements = document.querySelectorAll(
        '.about-content, .about-image-wrapper, .project-card, .process-card, ' +
        '.contact-form, .contact-info, .designer-info, .designer-photo, ' +
        '.section-header, [data-reveal]'
    );

    // Apply initial hidden state and staggered delays
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        // Add staggered delay for grouped elements
        const delay = (index % 4) * 0.1;
        el.style.transitionDelay = `${delay}s`;
        revealObserver.observe(el);
    });

    // Add reveal animation styles
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Smooth hover effects for cards */
        .project-card {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover {
            transform: translateY(-8px);
        }
        
        .project-card img {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover img {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(revealStyles);


    // === Project Card Hover Effect Enhancement ===
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });

        card.addEventListener('click', function () {
            // Placeholder for project detail view
            const projectTitle = this.querySelector('.project-title').textContent;
            console.log(`Viewing project: ${projectTitle}`);
            // In a real implementation, this would navigate to a project detail page
        });
    });


    // === Parallax Effect for Hero Section ===
    function handleParallax() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth > 991) {
            const scrolled = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    }

    window.addEventListener('scroll', handleParallax);


    // === Mobile Menu Close on Outside Click ===
    document.addEventListener('click', function (e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });


    // === Preloader (Optional Enhancement) ===
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

});

// === Google Maps Initialization ===
window.initMap = function () {
    // Coordinates for 324桃園市平鎮區南平路50號11樓
    // 帛瑀室內裝修設計股份有限公司 - Exact coordinates from Google Maps
    const location = { lat: 24.919720259547983, lng: 121.20975747116424 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17, // Zoomed in closer for specific building location
        center: location,
        gestureHandling: "cooperative", // Cooperative gesture handling
        mapTypeControl: false, // Hide default map type control to make room
        streetViewControl: false,
    });

    // Create the DIV to hold the control and call the constructor passing in this DIV
    const centerControlDiv = document.createElement("div");

    // Custom Control UI
    const controlUI = document.createElement("div");
    controlUI.className = "custom-map-control";
    controlUI.title = "點擊以在 Google 地圖中查看";
    centerControlDiv.appendChild(controlUI);

    // Custom Control Text
    const controlText = document.createElement("div");
    controlText.className = "custom-map-control-text";
    controlText.innerHTML = "顯示詳細地圖";
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener("click", () => {
        window.open("https://www.google.com/maps/search/?api=1&query=帛瑀室內裝修設計股份有限公司", "_blank");
    });

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "帛瑀室內裝修設計股份有限公司",
    });

    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="color: #333; padding: 10px; font-family: sans-serif;"><strong>帛瑀室內裝修設計股份有限公司</strong><br>324桃園市平鎮區南平路50號11樓</div>'
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
};
