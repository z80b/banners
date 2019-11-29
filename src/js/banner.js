import Dom from '@js/dom.js';
import { sendMessage } from '@js/utils/events.js';
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
      slideClass: 'ny-panorama__slide',
      wrapperClass: 'ny-panorama__track',
      freeMode: true,
      watchOverflow: true,
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
      }
    });
  }

  initAfterSlider() {
    this.$track = this.$el.querySelector('.ny-panorama__track');
    this.trackWidth = this.$track.scrollWidth;
    this.trackPosition = 0;
    this.viewPortWidth = this.$el.offsetWidth;
    this.trackOffset = Math.abs(this.viewPortWidth - this.trackWidth);
    this.$el
      .querySelectorAll('.ny-panorama__pick')
      .forEach($pick => new PanoramaPick($pick, this.$el));
    this.initEvents();
  }

  initEvents() {
    const $imgs = this.$el.querySelectorAll('.ny-panorama__slide-img');
    $imgs.forEach(el => {
      el.addEventListener('click', () => {
        sendMessage('popup:close');
      });
    });
    this.$el.addEventListener('mouseover',this.pauseScroll.bind(this), false);
    this.$el.addEventListener('mouseout', this.continueScroll.bind(this), false);
    this.timer = setInterval(this.moveTrack.bind(this), 30);
  }

  moveTrack() {
    
    if (!this.allowScroll) return;
    
    if (this.scrollDirection == 'left') {
      this.trackPosition -= 1;
      this.slider.setTranslate(this.trackPosition);
      if (Math.abs(this.trackPosition) >= this.trackOffset) {
        this.scrollDirection = 'right';
      }
    } else {
      this.trackPosition += 1;
      this.slider.setTranslate(this.trackPosition);
      if (this.trackPosition >= 0) {
        this.scrollDirection = 'left';
      }
    }
  }

  pauseScroll() {
    this.allowScroll = false;
  }

  continueScroll() {
    this.allowScroll = true;
    this.trackPosition = Math.ceil(this.slider.getTranslate());
    [
      "transitionDuration",
      "msTransitionDuration",
      "webkitTransitionDuration",
      "mozTransitionDuration",
      "oTransitionDuration"
    ].forEach(transitionDuration => {
      if (document.body.style[transitionDuration]) this.$track.style[transitionDuration] = 0;
    });
  }
}

export default Banner;