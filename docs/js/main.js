!function() {
  const e = document,
  t = e.documentElement,
  n = e.body,
  i = e.getElementById("lights-toggle"),
  s = window.sr = ScrollReveal(); function a() {
    let e = i.parentNode.querySelector(".label-text"); i.checked?(n.classList.remove("lights-off"), e && (e.innerHTML = "dark")): (n.classList.add("lights-off"), e && (e.innerHTML = "light"))}t.classList.remove("no-js"),
  t.classList.add("js"),
  window.addEventListener("load", function() {
    n.classList.add("is-loaded")}),
  n.classList.contains("has-animations") && window.addEventListener("load", function() {
    s.reveal(".feature", {
      duration: 600, distance: "20px", easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", origin: "right", viewFactor: .2
    })}),
  i && (window.addEventListener("load", a), i.addEventListener("change", a))}();

/* --------------------------
   * Start * Parallax Layers
* --------------------------- */
$(document).ready(function () {
  if ($('#particles-js').length) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        color: {
          value: ['#009B77']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 5,
            color: '#009B77'
          },
          fill: {
            color: '#009B77'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: '',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.6,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 120,
          color: '#009B77',
          opacity: 0.2,
          width: 1.6
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'top',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    })
  }
})
/* --------------------------
   * End * Parallax Layers
* --------------------------- */