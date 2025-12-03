/* ========================================================================= */
/* scroll-active.js - Adds 'active-link' class to current section in the navigation */
/* ========================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function activateNavLink() {
        let current = '';

        // Find the section currently in the viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // The 150px offset is to ensure the link highlights 
            // before the section fully hits the top of the viewport
            if (pageYOffset >= sectionTop - 150) { 
                current = section.getAttribute('id');
            }
        });

        // Remove 'active-link' from all links
        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Only add 'active-link' if a section is currently in view (i.e., we've scrolled)
        // This ensures the link is not highlighted if current remains ''
        if (current) {
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active-link');
                }
            });
        }
    }

       

    // Run on page load and on scroll
    window.addEventListener('scroll', activateNavLink);
});

document.addEventListener('DOMContentLoaded', function() {
    // ... existing ScrollSpy code ...

    // -----------------------------------------------------
    // NEW: MOBILE MENU TOGGLE LOGIC
    // -----------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');

    menuToggle.addEventListener('click', function() {
        header.classList.toggle('menu-open');
    });

    // Close the menu when a link is clicked (to navigate to a section)
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
            }
        });
    });
});