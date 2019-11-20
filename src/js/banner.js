import Dom from '@js/dom.js';
import BannerSlide from '@js/banner-slide.js';
import Swiper from 'swiper';


const slideTpl = require('@tpl/slide.html');

class Banner extends Dom {
  constructor(el) {
    super(el);
    this.init();
    return this;
  }

  init() {
    this.currentTime = (new Date()).getTime();
    this.$slides = this.getElements('.bf-actions-slide');
    this.$sliderTrack = this.getElement('.bf-actions-slider__track');
    this.$dotsBlock = this.getElement('.bf-actions-slider__dots');
    this.platform = document.body.clientWidth < 520 ? 'mobile' : 'desktop';
    this.slidesCount = this.$slides.length;
    this.position = 0;
    this.visibleSlidesCount = 4;
    this.slides = [];
    this.dots = [];
    this.$slides.forEach((el, index) => {
      this.slides.push(new BannerSlide(el, index, this));
    });

    this.calcSizes();

    if (this.platform/* == 'desktop'*/) {
      this.slider = new Swiper('.bf-actions-slider__content', {
        initialSlide: this.position,
        slidesPerView: 4,
        spaceBetween: 15,
        slideClass: 'bf-actions-slide',
        wrapperClass: 'bf-actions-slider__track',
        navigation: {
          prevEl: '.bf-actions-slider__arrow--prev',
          nextEl: '.bf-actions-slider__arrow--next',
          disabledClass: 'bf-actions-slider__arrow--disabled',
          hiddenClass: 'bf-actions-slider__arrow--hidden',
        }

        // pagination: {
        //   el: '.bf-actions-slider__dots',
        //   bulletClass: 'bf-actions-slider__dot',
        //   bulletActiveClass: 'active',
        //   clickable: true
        // }
      });
    }

    this.setInitialized();
    window.addEventListener('action:ready', this.actionStarted.bind(this));
  }

  calcSizes() {
    this.sliderWidth = this.$el.clientWidth;
    this.slideWidth = 100 / this.slidesCount;

    this.slides.forEach(slide => {
      slide.$el.style.width = `${this.slideWidth}%`;
    }); 
    this.$sliderTrack.style.width = `${this.slidesCount / this.visibleSlidesCount * 250}%`;
  }

  setInitialized() { this.$el.className += ' initialized' }

  getStartPosition() {
    let startPosition = 0;

    // for (let [key, slide] of this.slides.entries()) {
    //   if (this.currentTime < slide.startPosition) {
    //     startPosition = this.platform == 'desktop' ? key - 1 : key;
    //     break;
    //   }

    //   if (this.currentTime > slide.endTime) {
    //     startPosition = this.platform == 'desktop' ? key - 1 : key;
    //   }

    //   if (this.currentTime >= slide.startTime && this.currentTime <= slide.endTime) {
    //     startPosition = this.platform == 'desktop' ? key - 1 : key;
    //     break;
    //   }
    // }
    // this.slider.slideTo(startPosition);
    return startPosition;
  }

  changePosition(position) {
    this.slider.slideTo(position);
  }

  actionStarted(event) {
    this.changePosition(event.detail.position);
  }
}

export default Banner;