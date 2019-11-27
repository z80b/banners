import Dom from '@js/dom.js';
import { sendMessage } from '@js/utils.js';
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
      slidesPerView: 4,
      // autoplay: true,
      // spaceBetween: 15,
      slideClass: 'ny-panorama__slide',
      wrapperClass: 'ny-panorama__track',
      freeMode: true,
      // loop: true,
      mousewheel: true,
      loopAdditionalSlides: 10,
    });
    this.initPicks();
  }

  initPicks() {
    console.log('initPicks', this, this.$el);
    const $picks = this.$el.querySelectorAll('.ny-panorama__pick');
    
    if ($picks && $picks.length) {
      for (let i = 0; i < $picks.length; i++) {
        const position = $picks[i].getAttribute('data-position').split(',');
        $picks[i].style.top = `${position[1]}%`;
        $picks[i].style.left = `${position[0]}%`;
        new PanoramaPick($picks[i]);
      }
    }
  }
}

export default Banner;