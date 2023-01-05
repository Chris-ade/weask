const CORE = {}

'use strict'

function startLoadingBar () {
  // only add progress bar if added yet.
  $('#loading-bar').show()
  $('#loading-bar').width((50 + Math.random() * 30) + '%')
}

function stopLoadingBar () {
  // End loading animation
  $('#loading-bar').width('101%').delay(200).fadeOut(400, function () {
    $(this).width('0')
  })
}

/* ----------------------------
   * Start * Preloader Service
* ----------------------------- */
$(document).ready(function () {
  startLoadingBar()
  stopLoadingBar()
})

/* ----------------------------
   * Start * Character Counter
* ----------------------------- */
$(document).ready(function() {
$('input[maxlength]').each(function() {
let length = $(this).attr('maxlength');
$(this).characterCounter({
    max: length,
    opacity: '.5'
});
});

$('textarea[maxlength]').each(function() {
let length = $(this).attr('maxlength');
$(this).characterCounter({
    max: length,
    textArea: true,
    opacity: '.5'
});
});
});

/* -------------------------------------
   * Start * Truncate / See More & Less
* -------------------------------------- */
$(document).ready(function() {
$("main#content").on('click', '.see-more', function() {
  let elem = $(this).text();
  let text = $(this).parent().children('span.full');
  let dots = $(this).parent().children('span.dots');
  if (elem == "See more") {
    $(this).text("See less");
    $(dots).hide();
    $(text).show();
  } else {
    $(this).text("See more");
    $(dots).show();
    $(text).hide();
  }
});
});

/* --------------------------------------
   * Start * Invokable Character Counter
* ------------------------------------- */
function counter() {
$('input[maxlength]').each(function() {
let length = $(this).attr('maxlength');
$(this).characterCounter({
    max: length,
    opacity: '.5'
});
});

$('textarea[maxlength]').each(function() {
let length = $(this).attr('maxlength');
$(this).characterCounter({
    max: length,
    textArea: true,
    opacity: '.5'
});
});
}
/* -----------------------
   * Start * Toast Service
* --------------------- */
function toast_success (text) {
  iziToast.show({
    maxWidth: '280px',
    class: 'success-toast',
    title: '',
    message: text,
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#009B77',
    progressBarColor: '#fafafa',
    position: 'bottomRight',
    transitionIn: 'fadeInUp',
    close: false,
    timeout: 1800,
    zindex: 99999
  })
}

function toast_error (text) {
  iziToast.show({
    maxWidth: '280px',
    class: 'error-toast',
    title: '',
    message: text,
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#ff533d',
    progressBarColor: '#fff',
    position: 'bottomRight',
    transitionIn: 'fadeInUp',
    close: false,
    timeout: 1800,
    zindex: 99999
  })
}
/* -----------------------
   * End * Toast Service
* --------------------- */

/* --------------------------
   * Start * UI Tabs Service
* --------------------------- */
$(document).ready(function() {
$(".uk-tab").find("li").click(function(){
    $(".uk-tab").find("li").removeClass("uk-active");
    $(this).addClass("uk-active");
});
});

/* --------------------------
   * Start * Post Question
* --------------------------- */
$('form#post_form').on('submit', function(e) {
  e.preventDefault()
  const data = new FormData(this)
  const token = $('body').data('token')
  fetch('/questions/post/', {
    method: 'POST',
    body: data,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': token
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.status == 200) {
          $(this).trigger('reset')
          toast_success(data.message)
          counter()
        } else {
          toast_error(data.message)
        }
      })
})
/* --------------------------
   * End * Post Question
* --------------------------- */

/* -----------------------
   * Start * UI Modals
* ------------------------ */
function showModal (modal) {
  $(document).find(modal).removeClass('is-hidden');
  $('#app-overlay').addClass('is-active').fadeIn();
}

function closeModal(modal) {
  $(document).find(modal).addClass('is-hidden');
  $('#app-overlay').removeClass('is-active').fadeOut();
}

htmx.on('htmx:afterSettle', (e) => {
  e.preventDefault()
  if (e.detail.target.id == 'feed-menu-modal') {
    showModal('#feed-menu-modal')
  }
})

$(document).ready(function () {
  if ($('.modal-trigger').length) {
    $('main#content').on('click', '.modal-trigger', function () {
      const modalID = $(this).attr('data-modal')
      $('#' + modalID).removeClass('is-hidden')
      $('#app-overlay').addClass('is-active').fadeIn()
    })
}
    $('main#content').on('click', '.ui-modal-close', function () {
      const modalID = '#'+$(this).parents('div.ui-modal-container').attr('id');
      $(modalID).addClass('is-hidden');
      $('#app-overlay').removeClass('is-active').fadeOut();
    });
})
/* -----------------------
   * End * UI Modals
* ------------------------ */

/* --------------------------
   * Start * Password Toggle
* --------------------------- */
$(document).ready(function () {
  $(document).on('click', '#toggle-password', function () {
    const input = $('#password')
    if (input.attr('type') == 'password') {
      input.attr('type', 'text')
      $(this).html('<svg class="icon icon--20" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 9C20 9 19.6797 9.66735 19 10.5144M12 14C10.392 14 9.04786 13.5878 7.94861 13M12 14C13.608 14 14.9521 13.5878 16.0514 13M12 14V17.5M4 9C4 9 4.35367 9.73682 5.10628 10.6448M7.94861 13L5 16M7.94861 13C6.6892 12.3266 5.75124 11.4228 5.10628 10.6448M16.0514 13L18.5 16M16.0514 13C17.3818 12.2887 18.3535 11.3202 19 10.5144M5.10628 10.6448L2 12M19 10.5144L22 12"></path></svg>')
    } else {
      input.attr('type', 'password')
      $(this).html('<svg class="icon icon--20" viewBox="0 0 24 24"><path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>')
    }
  })
})
/* --------------------------
   * End * Password Toggle
* --------------------------- */

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
          value: ['#5596e6']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 5,
            color: '#5596e6'
          },
          fill: {
            color: '#5596e6'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
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
          color: '#1a72ff',
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

/* -----------------------------
     * Material design js effects
     * Script file: material.min.js
     * Documentation about used plugin:
     * http://demos.creative-tim.com/material-kit/components-documentation.html
* --------------------------- */
CORE.Materialize = function () {
  $.material.init()
  $('.checkbox > label').on('click', function () {
    $(this).closest('.checkbox').addClass('clicked')
  })
}
$(document).ready(function () {
  CORE.Materialize()
})

/* -------------------------
   * End * Init Materialize
* -------------------------- */

/* --------------------------
   * Start * Preview Images
* --------------------------- */
$(document).on('change', '#profile_picture_field', function () {
  if (this.files.length > 0) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i]) {
        var reader = new FileReader()
        reader.onload = function (e) {
          $('#profile_picture').html('<img src="'+ e.target.result +'">')
        }
        reader.readAsDataURL(this.files[i])
      }
    }
  }
})

$(document).on('change', '#cover_picture_field', function () {
  if (this.files.length > 0) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i]) {
        var reader = new FileReader()
        reader.onload = function (e) {
          $('#cover_picture').find('img').replaceWith('<img src="'+ e.target.result +'">')
        }
        reader.readAsDataURL(this.files[i])
      }
    }
  }
})

/* --------------------------
   * End * Preview Images
* --------------------------- */

/* --------------------------
   * Start * Misc Services
* --------------------------- */
$(document).ready(function () {
$('main#content').on('click', '#change_avatar', function () {
  $('#profile_picture_field').trigger('click')
})
$('main#content').on('click', '#change_cover', function () {
  $('#cover_picture_field').trigger('click')
})
/* --------------------------
   * Start * Tokenization :)
* --------------------------- */
  $('body').on('htmx:configRequest', function (e) {
    const token = $(this).data('token')
    e.detail.headers['X-CSRFToken'] = token
  })

 $('main#content').on('click', '#fab_menu_button', function () {
   $(this).toggleClass('is-active')
   $('#app-overlay').toggleClass('is-active')
 })

  /* --------------------------
   * Start * Infinite Scroll
* --------------------------- */
  if (/Mobi/.test(navigator.userAgent) == false) {
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        // htmx.trigger("#load-more", "click")
      }
    })
  }

  /* if($("#feed-container").length) {
var target = $("#feed-container").children().last().attr('id').slice(4);
$(document).find('#more_button > input[name="lmd"]').val(target);
}
*/

  /* --------------------------
   * Start * Load More Button
* --------------------------- */
  if ($('#feed-container').length) {
    const target = $('#feed-container').children().length
    $(document).find('#more_button input[name="page"]').val(target)
  }

  if ($('#lmd').val()) {
    $('#more_button').removeClass('is-hidden')
  }

  /* --------------------------
   * Start * Load More Feed
* --------------------------- */
  $('main#content').on('click', '#load-more', function (e) {
    let t
    e.preventDefault()
    clearTimeout(t)
    $(this).toggleClass('loading')
    t = setTimeout(function () {
      $('.load-more-button').removeClass('loading')
      const data = new FormData()
      const target = $(this).data('id')
      data.append('id', target)
      if ($('.no_data').length) {
  	$('.no_data').fadeOut(function () {
  	$(this).detach()
  	})
      }
    }, 3500)
  })

/* --------------------------
   * Start * Preview Feed
* --------------------------- */
$(document).ready(function() {
$('#feed_image').on('change', function () {
  let target = this
      if (target.files.length > 0) {
        $('#feed-image-preview').empty()
        if (target.files.length == 1) {
          for (var i = 0; i < target.files.length; i++) {
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').html('<div class="feed-image"><a class="feed-image-item" style="background-image: url(' + e.target.result + ');display: block;"></a></div>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length == 2) {
          $('#feed-image-preview').html('<div class="feed-image"><div class="feed-image-column" id="column-preview"></div></div>')
          for (var i = 0; i < target.files.length; i++) {
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').find('#column-preview').append('<a class="feed-image-item image-item" style="background-image: url(' + e.target.result + ');display: block;"></a>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length == 3) {
          $('#feed-image-preview').html('<div class="feed-masonry-grid"><div class="feed-masonry-column" id="columns-preview1"></div><div class="feed-masonry-columns" id="columns-preview"></div></div>')
          if (target.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
              $('#feed-image-preview').find('#columns-preview1').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
            }
            reader.readAsDataURL(target.files[0])
          }
          for (var i = 0; i < target.files.length; i++) {
            if (i == 0) { continue }
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length > 3) {
          $('#feed-image-preview').html('<div class="feed-masonry-grid"><div class="feed-masonry-column" id="columns-preview1"></div><div class="feed-masonry-columns" id="columns-preview"></div></div>')
          if (target.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
              $('#feed-image-preview').find('#columns-preview1').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
            }
            reader.readAsDataURL(target.files[0])
          }
          for (var i = 0; i < target.files.length; i++) {
            if (i == 0) { continue }
            if (i >= 4) { break } else {
              if (i == 3) {
                let count = target.files.length - i - 1
                var reader = new FileReader()
                reader.onload = function (e) {
                  if (count == 0) {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
                  } else {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"><span class="bg-gray-900 bg-opacity-30">+' + count + ' more</span></a>')
                  }
                }
                reader.readAsDataURL(target.files[3])
              } else {
                if (target.files[i]) {
                  var reader = new FileReader()
                  reader.onload = function (e) {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
                  }
                  reader.readAsDataURL(target.files[i])
                }
              }
            }
          }
        }
      } else {
        // Clear any previous selections
        $('#feed-image-preview').empty()
      }
    })
})
  $(document).on('click', 'textarea#feed_text', function (e) {
    e.preventDefault()
    $('#feed-preview').addClass('is-highlighted').removeClass('hidden')
    $(this).on('change keyup paste click', function () {
      let text = $(this).val()
      $('#feed-text-preview').text(text)
    })
    let target = $('#feed_image')[0]
    $(target).on('change', function () {
      if (target.files.length > 0) {
        $('#feed-image-preview').empty()
        if (target.files.length == 1) {
          for (var i = 0; i < target.files.length; i++) {
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').html('<div class="feed-image"><a class="feed-image-item" style="background-image: url(' + e.target.result + ');display: block;"></a></div>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length == 2) {
          $('#feed-image-preview').html('<div class="feed-image"><div class="feed-image-column" id="column-preview"></div></div>')
          for (var i = 0; i < target.files.length; i++) {
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').find('#column-preview').append('<a class="feed-image-item image-item" style="background-image: url(' + e.target.result + ');display: block;"></a>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length == 3) {
          $('#feed-image-preview').html('<div class="feed-masonry-grid"><div class="feed-masonry-column" id="columns-preview1"></div><div class="feed-masonry-columns" id="columns-preview"></div></div>')
          if (target.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
              $('#feed-image-preview').find('#columns-preview1').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
            }
            reader.readAsDataURL(target.files[0])
          }
          for (var i = 0; i < target.files.length; i++) {
            if (i == 0) { continue }
            if (target.files[i]) {
              var reader = new FileReader()
              reader.onload = function (e) {
                $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
              }
              reader.readAsDataURL(target.files[i])
            }
          }
        } else if (target.files.length > 3) {
          $('#feed-image-preview').html('<div class="feed-masonry-grid"><div class="feed-masonry-column" id="columns-preview1"></div><div class="feed-masonry-columns" id="columns-preview"></div></div>')
          if (target.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
              $('#feed-image-preview').find('#columns-preview1').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
            }
            reader.readAsDataURL(target.files[0])
          }
          for (var i = 0; i < target.files.length; i++) {
            if (i == 0) { continue }
            if (i >= 4) { break } else {
              if (i == 3) {
                let count = target.files.length - i - 1
                var reader = new FileReader()
                reader.onload = function (e) {
                  if (count == 0) {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
                  } else {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"><span class="bg-gray-900 bg-opacity-30">+' + count + ' more</span></a>')
                  }
                }
                reader.readAsDataURL(target.files[3])
              } else {
                if (target.files[i]) {
                  var reader = new FileReader()
                  reader.onload = function (e) {
                    $('#feed-image-preview').find('#columns-preview').append('<a style="background-image: url(' + e.target.result + ');display: block;"></a>')
                  }
                  reader.readAsDataURL(target.files[i])
                }
              }
            }
          }
        }
      } else {
        // Clear any previous selections
        $('#feed-image-preview').empty()
      }
    })
  })

/* --------------------------
  * Start * Search
* --------------------------- */
$(document).on('submit', '#search_form', function (e) {
    e.preventDefault()
    const content = $('#search_content')
    const token = $('body').data('token')
    const data = new FormData(this)
    fetch('/search/', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': token
        }
      })
      .then(response => {
          return response.json()
      })
      .then(data => {
        if (data.status == 200) {
          $(content).html(data.html)
        } else {
        toast_error('An error occurred!')
        }
      })
  })
})
/* --------------------------
   * End * Misc Services
* --------------------------- */
