/* ========================================================================= */
/* app.js - Initializes the particles.js library for the live background */
/* ========================================================================= */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40, 
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#9eb9cc" 
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#3f5466",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse" // CHANGED: This creates the scattering/repelling effect
      },
      "onclick": {
        "enable": true,
        "mode": "push" 
      },
      "resize": true
    },
    "modes": {
      // Added settings for the repulse mode
      "repulse": {
        "distance": 120, // How far the particles scatter from the cursor
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});