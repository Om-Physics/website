/* =========================================================================
   app.js — Particles.js configuration
   Academic dark theme: sparse molecular-graph aesthetic
   ========================================================================= */

particlesJS('particles-js', {
    particles: {
        number: {
            value: 48,
            density: {
                enable: true,
                value_area: 900
            }
        },
        color: {
            value: '#3a7a9c'   /* Muted ice-blue to complement the dark academic theme */
        },
        shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000000' }
        },
        opacity: {
            value: 0.45,
            random: true,
            anim: { enable: false }
        },
        size: {
            value: 2.5,
            random: true,
            anim: { enable: false }
        },
        line_linked: {
            enable: true,
            distance: 160,
            color: '#1e3d52',    /* Very dark blue-grey links */
            opacity: 0.35,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.7,          /* Slow, contemplative drift */
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'     /* Subtle grab — elegant for academic site */
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: { opacity: 0.65 }
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});
