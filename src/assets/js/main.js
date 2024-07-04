import jQuery from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
import marquee from 'jquery.marquee'
window.$ = window.jQuery = jQuery

const karrot = ($ => {
  return {
    init() {
      AOS.init({
        duration: 1000
      })
      this.marqueeRibbon()
      this.mobileMenu()
      this.animateScroll()
    },
    mobileMenu() {
      $('.navbar-burger').on('click', () => {
        $('.navbar-burger').toggleClass('is-active')
        $('.navbar-menu').toggleClass('is-active')
      })
    },
    animateScroll() {
      let active = 0
      const lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index')

      const navigate = function(ndx) {
        if(ndx < 0 || ndx > lastIndex) return

        const targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + 1
        $('html,body').animate({
            scrollTop: targetTop,
            easing: 'linear',
        }, 600)
      }

      const doScroll = function (e) {
        const target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
        $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto')
        navigate(parseInt(target))
      }

      const updateActive = function(ndx) {
        active = ndx
        $('[data-scroll-nav]').removeClass('is-active')
        $('[data-scroll-nav=' + ndx + ']').addClass('is-active')
      }

      const watchActive = function() {
        const winTop = $(window).scrollTop()

        const visible = $('[data-scroll-index]').filter(function(ndx, div) {
            return winTop >= $(div).offset().top &&
            winTop < $(div).offset().top + $(div).outerHeight()
        })
        const newActive = visible.first().attr('data-scroll-index')
        updateActive(newActive)
      }

      $(window).on('scroll', watchActive);

      $('body').on('click','[data-scroll-nav], [data-scroll-goto]', function(e){
        e.preventDefault()
        $('.navbar-burger').removeClass('is-active')
        $('.navbar-menu').removeClass('is-active')
        doScroll(e)
      });
    },
    marqueeRibbon() {
      $('.marquee-ribbon').marquee({
        duration: 10000,
        duplicated: true
      });
    }
  }
})( jQuery )

$(() => {
  karrot.init()
})

