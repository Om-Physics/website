/* =========================================================================
   scroll-active.js
   Handles: ScrollSpy navigation, mobile menu, scroll animations,
            header state, skill bar animation, contact form validation,
            typed text effect, and footer year.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------------------ */
    /* 1. HEADER SCROLL STATE                                              */
    /* ------------------------------------------------------------------ */
    const header = document.getElementById('site-header');

    function updateHeader() {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();


    /* ------------------------------------------------------------------ */
    /* 2. SCROLLSPY — active-link on current section                       */
    /* ------------------------------------------------------------------ */
    const sections  = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function runScrollSpy() {
        let currentId = '';
        const scrollPos = window.scrollY + window.innerHeight * 0.25;

        sections.forEach(section => {
            const top    = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                currentId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(link => {
            link.classList.remove('active-link');
            if (currentId && link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active-link');
            }
        });
    }

    window.addEventListener('scroll', runScrollSpy, { passive: true });
    runScrollSpy();


    /* ------------------------------------------------------------------ */
    /* 3. MOBILE MENU TOGGLE                                               */
    /* ------------------------------------------------------------------ */
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', function () {
        const isOpen = header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navAnchors.forEach(link => {
        link.addEventListener('click', function () {
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
        if (!header.contains(e.target) && header.classList.contains('menu-open')) {
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });


    /* ------------------------------------------------------------------ */
    /* 4. TYPED TEXT EFFECT (Hero)                                         */
    /* ------------------------------------------------------------------ */
    const typedTarget = document.getElementById('typed-target');
    if (typedTarget) {
        const phrases = [
            'Computational Physics',
            'Density Functional Theory',
            'Biophysical Modelling',
            'Quantum Simulation',
            'Material Science',
        ];
        let phraseIndex  = 0;
        let charIndex    = 0;
        let isDeleting   = false;
        const typeDelay  = 80;
        const deleteDelay = 40;
        const pauseAfter  = 1800;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (!isDeleting) {
                typedTarget.textContent = currentPhrase.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, pauseAfter);
                    return;
                }
            } else {
                typedTarget.textContent = currentPhrase.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }

            setTimeout(typeLoop, isDeleting ? deleteDelay : typeDelay);
        }

        // Small delay before typing starts
        setTimeout(typeLoop, 800);
    }


    /* ------------------------------------------------------------------ */
    /* 5. INTERSECTION OBSERVER — fade-in on scroll                        */
    /* ------------------------------------------------------------------ */
    const fadeEls = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Stagger children in same parent
                    const siblings = entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)');
                    let delay = 0;
                    siblings.forEach(sib => {
                        sib.style.transitionDelay = delay + 'ms';
                        delay += 80;
                    });
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately
        fadeEls.forEach(el => el.classList.add('visible'));
    }


    /* ------------------------------------------------------------------ */
    /* 6. SKILL BAR ANIMATION (animate when section scrolls into view)     */
    /* ------------------------------------------------------------------ */
    const compSkills = document.querySelectorAll('.comp-skill');

    if ('IntersectionObserver' in window && compSkills.length > 0) {
        const barObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill   = entry.target;
                    const pct     = parseInt(skill.getAttribute('data-pct'), 10) || 0;
                    const fill    = skill.querySelector('.comp-fill');
                    if (fill) {
                        // Small delay so the user sees the bar animate in
                        setTimeout(() => {
                            fill.style.width = pct + '%';
                        }, 150);
                    }
                    barObserver.unobserve(skill);
                }
            });
        }, { threshold: 0.5 });

        compSkills.forEach(skill => barObserver.observe(skill));
    }


    /* ------------------------------------------------------------------ */
    /* 7. CONTACT FORM — validation + simulated submit                     */
    /* ------------------------------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {

        // Character counter for message
        const messageField = document.getElementById('cf-message');
        const charCount    = document.getElementById('char-count');
        const maxChars     = 1000;

        if (messageField && charCount) {
            messageField.addEventListener('input', function () {
                const len = this.value.length;
                charCount.textContent = len + ' / ' + maxChars;
                if (len > maxChars) {
                    charCount.style.color = '#e57373';
                } else {
                    charCount.style.color = '';
                }
            });
        }

        // Validation helper
        function showError(fieldId, errId, message) {
            const field = document.getElementById(fieldId);
            const err   = document.getElementById(errId);
            if (field) field.classList.add('error');
            if (err)   err.textContent = message;
            return false;
        }
        function clearError(fieldId, errId) {
            const field = document.getElementById(fieldId);
            const err   = document.getElementById(errId);
            if (field) field.classList.remove('error');
            if (err)   err.textContent = '';
        }

        function validateForm() {
            let valid = true;

            const name    = document.getElementById('cf-name');
            const email   = document.getElementById('cf-email');
            const subject = document.getElementById('cf-subject');
            const message = document.getElementById('cf-message');

            // Clear previous errors
            ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('error');
            });
            ['err-name', 'err-email', 'err-subject', 'err-message'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '';
            });

            if (!name || name.value.trim().length < 2) {
                showError('cf-name', 'err-name', 'Please provide your full name.');
                valid = false;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError('cf-email', 'err-email', 'Please provide a valid email address.');
                valid = false;
            }

            if (!subject || subject.value === '') {
                showError('cf-subject', 'err-subject', 'Please select a subject.');
                valid = false;
            }

            if (!message || message.value.trim().length < 20) {
                showError('cf-message', 'err-message', 'Please provide a message of at least 20 characters.');
                valid = false;
            }

            if (message && message.value.length > maxChars) {
                showError('cf-message', 'err-message', 'Message exceeds the maximum of ' + maxChars + ' characters.');
                valid = false;
            }

            return valid;
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            const submitBtn = document.getElementById('submit-btn');
            const btnText   = submitBtn.querySelector('.btn-text');
            const btnLoad   = submitBtn.querySelector('.btn-loading');
            const formSuccess = document.getElementById('form-success');

            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoad) btnLoad.style.display  = 'inline-flex';

            // Simulate async submission (replace with your actual endpoint)
            setTimeout(function () {
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoad) btnLoad.style.display  = 'none';

                if (formSuccess) {
                    formSuccess.style.display = 'flex';
                    contactForm.reset();
                    if (charCount) charCount.textContent = '0 / ' + maxChars;
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 1600);
        });

        // Inline validation on blur
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function () {
                field.classList.remove('error');
            });
        });
    }


    /* ------------------------------------------------------------------ */
    /* 8. FOOTER YEAR                                                      */
    /* ------------------------------------------------------------------ */
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});
