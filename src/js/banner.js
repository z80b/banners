import Dom from '@js/dom.js';
import Swiper from 'swiper';
import BannerSlide from '@js/banner-slide.js';

class Banner extends Dom {
  constructor(el) {
    super(el);
    this.slides = [];
    this.$el.querySelectorAll('.ny-calendar__slide').forEach(($slide, index) => {
      this.slides.push(new BannerSlide($slide, index, this));
    });
    this.initSlider();
    console.log('constructor:', this);
    return this;
  }

  initSlider() {
    return new Swiper('.ny-calendar__slider', {
      initialSlide: 0,
      
      
      watchSlidesVisibility: true,
      slideClass: 'ny-calendar-slide',
      slideActiveClass: 'ny-calendar-slide--active',
      slideVisibleClass: 'ny-calendar-slide--visible',
      slideNextClass: 'ny-calendar-slide--next',
      slidePrevClass: 'ny-calendar-slide--prev',
      wrapperClass: 'ny-calendar__track',
      watchOverflow: true,
      breakpoints: {
        0: {
          centeredSlides: true,
          spaceBetween: 16,
          slidesPerView: 1.5,
          pagination: {
            el: '.ny-calendar-slider__bullets',
            type: 'bullets',
            bulletClass: 'ny-calendar-slider__bullet',
            bulletActiveClass: 'ny-calendar-slider__bullet--active',
          }

        },
        960: {
          spaceBetween: 30,
          slidesPerView: 2,
          navigation: {
            nextEl: '.ny-calendar-slider__button--next',
            prevEl: '.ny-calendar-slider__button--prev',
            disabledClass: 'ny-calendar-slider__button--disabled',
          },
        }
      },
      on: {
        imagesReady: this.initAfterSlider.bind(this),
      }
    });
  }

  initAfterSlider() {
    this.initEvents();
  }

  initEvents() {

  }
}

export default Banner;