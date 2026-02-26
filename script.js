/**
 * 帛瑀 - Silky Jade Interior Design Website
 * JavaScript Functionality
 * Based on PDF Design
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


    // === Smooth Scroll for Navigation Links ===
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .footer-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
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


    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validate required fields
            if (!data.name || !data.phone) {
                showNotification('請填寫姓名和聯絡電話', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit-new');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '發送中...';
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
            background: ${type === 'success' ? '#8B7355' : '#e74c3c'};
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

        // Add animation keyframes if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
        }

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


    // === Scroll Reveal Animations ===
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);

    // Select all elements that should animate on scroll
    const revealElements = document.querySelectorAll(
        '.about-concept-content, .about-images-grid, .hele-content, .hele-image-wrapper, ' +
        '.designer-card, .project-item, .project-grid-item, .project-detail-content, ' +
        '.service-step, .contact-form-new, .information-section, .section-header'
    );

    // Apply initial hidden state
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-element');
        const delay = (index % 4) * 0.08;
        el.style.transitionDelay = `${delay}s`;
        revealObserver.observe(el);
    });

    // Add reveal animation styles
    if (!document.querySelector('#reveal-styles')) {
        const revealStyles = document.createElement('style');
        revealStyles.id = 'reveal-styles';
        revealStyles.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
                            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .reveal-element.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(revealStyles);
    }


    // === About Page: Scroll Fade-In Animations (IntersectionObserver) ===
    const fadeUpEls = document.querySelectorAll('.fade-in-up');

    if (fadeUpEls.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target); // 觸發一次後不再觀察
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeUpEls.forEach(el => fadeObserver.observe(el));
    }


    // === Project Item Hover Effects ===
    const projectItems = document.querySelectorAll('.project-item, .project-grid-item');

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });

        item.addEventListener('click', function () {
            // Placeholder for project detail view
            console.log('Project clicked');
        });
    });


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


    // === Preloader ===
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

});

// === Google Maps Initialization ===
window.initMap = function () {
    // Coordinates for 桃園市平鎮區南平路50號11樓
    const location = { lat: 24.919720259547983, lng: 121.20975747116424 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: location,
        gestureHandling: "cooperative",
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "saturation": -20 }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#c9d1d9" }]
            }
        ]
    });

    // Create custom control for opening in Google Maps
    const centerControlDiv = document.createElement("div");

    const controlUI = document.createElement("div");
    controlUI.className = "custom-map-control";
    controlUI.title = "點擊以在 Google 地圖中查看";
    centerControlDiv.appendChild(controlUI);

    const controlText = document.createElement("div");
    controlText.className = "custom-map-control-text";
    controlText.innerHTML = "顯示詳細地圖";
    controlUI.appendChild(controlText);

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
        content: '<div style="color: #4A3F35; padding: 10px; font-family: sans-serif;"><strong>帛瑀室內裝修設計股份有限公司</strong><br>桃園市平鎮區南平路50號11樓</div>'
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
};
