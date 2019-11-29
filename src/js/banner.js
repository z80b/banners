import Dom from '@js/dom.js';
import { sendMessage } from '@js/utils/events.js';
import { translate3d } from '@js/utils/animations.js';
import PanoramaPick from '@js/panorama-pick.js';
import Swiper from 'swiper';

class Banner extends Dom {
  constructor(el) {
    super(el);

    this.slidesCount = 10;
    this.visibleSlides = 4;
    this.scrollDirection = 'left';
    this.allowScroll = true;
    this.slider = this.initSlider();
    // this.initEvents();
    console.log('constructor:', this);
    return this;
  }

  initSlider() {
    return new Swiper('.ny-panorama__content', {
      initialSlide: 0,
      slidesPerView: 10,
      autoHeight: true,
      // autoplay: {
      //   delay: 0,
      //   //reverseDirection: false,
      //   // waitForTransition: false,
      // },
      // speed: 8000,
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
        imagesReady: this.initAfterSlider.bind(this),
        transitionEnd: this.toggleScroll.bind(this),
      }
    });
  }

  initAfterSlider() {
    this.$track = this.$el.querySelector('.ny-panorama__track');
    this.trackWidth = this.$track.scrollWidth;
    this.viewPortWidth = this.$el.offsetWidth;
    this.transitionDuration = 10;
    this.avgDuration = this.transitionDuration / Math.abs(this.viewPortWidth - this.trackWidth);
    this.$el
      .querySelectorAll('.ny-panorama__pick')
      .forEach($pick => new PanoramaPick($pick, this.$el));
    this.initEvents();
    this.toggleScroll();
  }

  initEvents() {
    const $imgs = this.$el.querySelectorAll('.ny-panorama__slide-img');
    $imgs.forEach(el => {
      el.addEventListener('click', () => {
        sendMessage('popup:close');
      });
    });
    this.$el.addEventListener('mouseover', () => {
      this.allowScroll = false;
      this.pauseScroll();
    }, false);
    this.$el.addEventListener('mouseout', () => {
      this.allowScroll = true;
      this.continueScroll();
    }, false);
    this.$track.addEventListener('transitionend', this.toggleScroll.bind(this), false);
  }

  scrollLeft() {
    this.scrollDirection = 'left';
    this.slider.setTranslate(0);
  }

  scrollRight() {
    this.scrollDirection = 'right';
    this.slider.setTranslate(this.viewPortWidth - this.trackWidth);
  }

  toggleScroll() {
    if (!this.allowScroll) return;
    this.$track.style.transitionDuration = `${this.transitionDuration}s`;
    if (this.scrollDirection == 'left') {
      this.scrollRight();
    } else this.scrollLeft();
  }

  pauseScroll() {
    this.allowScroll = false;
    this.currStyles = window.getComputedStyle(this.$track);
    this.$track.style.transform = this.currStyles.transform;
    this.$track.style.transitionDuration = 0;
    
  }

  continueScroll() {
    if (this.currStyles) {
      this.allowScroll = true;
      const pathPart = parseFloat(this.currStyles.transform.split(',')[4]);
      this.$track.style.transform = this.currStyles.transform;
      //this.$track.style.transitionDuration = `${pathPart * this.avgDuration}s`;
      

    }
  }
}

export default Banner;