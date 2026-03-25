/**
 * 帛瑪室內設計 (Silky Jade) - Official Website Properties
 * 
 * Developed with Vanilla JavaScript (ES6+)
 * No external frameworks used.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initHeroInteraction();
    initMobileMenu();
    initFadeInAnimations();
    initLightsTransition();
    initMultiSelects();
    console.log('Silky Jade Scripts Loaded.');
});

/**
 * Header Scroll Effect
 * Hides the header when scrolling down more than 50px.
 * Shows it again when scrolling back to the top.
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const nav = document.querySelector('.main-nav');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            if (nav && nav.classList.contains('menu-open')) { ticking = false; return; }
            if (window.scrollY > 50) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            ticking = false;
        });
    }, { passive: true });
}

/**
 * Hero Section Hover Interaction
 * Adds '.is-active' class on first mouse enter to trigger
 * the immersive "zoom in" and text fade-in effects.
 */
function initHeroInteraction() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Use 'mouseenter' to trigger the effect once the user interacts with the main visual
    heroSection.addEventListener('mouseenter', () => {
        if (!heroSection.classList.contains('is-active')) {
            heroSection.classList.add('is-active');
        }
    });

    // Optional: Trigger immediately on touch devices as hover isn't reliable
    if ('ontouchstart' in window) {
        setTimeout(() => {
            heroSection.classList.add('is-active');
        }, 1000);
    }
}

/**
 * Scroll Fade-In Animations (About Page)
 * Observes .fade-in-up elements and adds .is-visible when in view.
 * Waits for window.load so images have real dimensions before observing.
 */
function initFadeInAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in-up, .fade-in');
    if (!fadeEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 出現後停止觀察，不重複觸發
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    const startObserving = () => fadeEls.forEach(el => observer.observe(el));

    if (document.readyState === 'complete') {
        startObserving();
    } else {
        window.addEventListener('load', startObserving);
    }
}

/**
 * Lights Transition (大華 project-2)
 * 當 .lights-transition 元素進入視窗時，加上 .is-lit 觸發開燈淡入效果。
 */
function initLightsTransition() {
    const els = document.querySelectorAll('.lights-transition');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-lit');
                }, 400);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    const start = () => els.forEach(el => observer.observe(el));
    if (document.readyState === 'complete') {
        start();
    } else {
        window.addEventListener('load', start);
    }
}

/**
 * Multi-select Dropdowns
 */
function initMultiSelects() {
    document.querySelectorAll('.sv-multiselect-wrap').forEach(wrap => {
        const isSingle = wrap.dataset.single === 'true';
        const trigger = wrap.querySelector('.sv-multiselect-trigger');
        const textEl = wrap.querySelector('.sv-multiselect-text');
        const hiddenInput = wrap.querySelector('input[type="hidden"]');

        trigger.addEventListener('click', e => {
            e.stopPropagation();
            const isOpen = wrap.classList.contains('ms-open');
            document.querySelectorAll('.sv-multiselect-wrap.ms-open').forEach(w => w.classList.remove('ms-open'));
            if (!isOpen) wrap.classList.add('ms-open');
        });

        if (isSingle) {
            wrap.querySelectorAll('.sv-ms-single').forEach(opt => {
                opt.addEventListener('click', e => {
                    e.stopPropagation();
                    wrap.querySelectorAll('.sv-ms-single').forEach(o => o.classList.remove('is-selected'));
                    opt.classList.add('is-selected');
                    textEl.textContent = opt.dataset.value;
                    if (hiddenInput) hiddenInput.value = opt.dataset.value;
                    wrap.classList.remove('ms-open');
                });
            });
        } else {
            const checkboxes = wrap.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.addEventListener('change', () => {
                    const selected = [...checkboxes].filter(c => c.checked).map(c => c.value);
                    textEl.textContent = selected.join('、');
                    if (hiddenInput) hiddenInput.value = selected.join('、');
                });
            });
            wrap.querySelector('.sv-multiselect-dropdown').addEventListener('click', e => e.stopPropagation());
        }
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.sv-multiselect-wrap.ms-open').forEach(w => w.classList.remove('ms-open'));
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        nav.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            nav.classList.remove('menu-open');
        });
    });
}
