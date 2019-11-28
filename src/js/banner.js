import Dom from '@js/dom.js';
import { sendMessage } from '@js/utils/events.js';
import PanoramaPick from '@js/panorama-pick.js';
import Swiper from 'swiper';

class Banner extends Dom {
  constructor(el) {
    super(el);

    this.slidesCount = 10;
    this.visibleSlides = 4;
    this.init();
    this.initSlider();
    return this;
  }

  init() {
    const $imgs = this.$el.querySelectorAll('.ny-panorama__slide-img');
    $imgs.forEach(el => {
      el.addEventListener('click', () => {
        sendMessage('popup:close');
      });
    });
  }

  initSlider() {
    this.slider = new Swiper('.ny-panorama__content', {
      initialSlide: 0,
      slidesPerView: 10,
      autoHeight: true,
      autoplay: {
        delay: 0,
        //reverseDirection: false,
        // waitForTransition: false,
      },
      speed: 8000,
      slideClass: 'ny-panorama__slide',
      wrapperClass: 'ny-panorama__track',
      freeMode: true,
      mousewheel: true,
      breakpoints: {
        960: {
          slidesPerView: 4,
        },
        1206: {
          slidesPerView: 5,
        },
        2500: {
          slidesPerView: 7,
        },
        5000: {
          slidesPerView: 10,
        }
      },
      on: {
        init: this.initPicks.bind(this),
      }
    });
    // this.initPicks();
    // this.$el.addEventListener('mouseover', this.slider.autoplay.start);
    // this.$el.addEventListener('mouseout', this.slider.autoplay.stop);
  }

  initPicks() {
    this.$el
      .querySelectorAll('.ny-panorama__pick')
      .forEach($pick => new PanoramaPick($pick, this.$el));
  }
}

export default Banner;