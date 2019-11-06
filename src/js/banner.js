import Dom from '@js/dom.js';
import BannerSlide from '@js/banner-slide.js';

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
    this.visibleSlidesCount = 3;
    this.slides = [];
    this.dots = [];
    this.$slides.forEach((el, index) => {
      this.slides.push(new BannerSlide(el, index));
    });
    this.calcSizes();
    this.creteDots();
    this.initPosition();
    this.setInitialized();
    document.addEventListener('action:ready', this.actionStarted.bind(this));
  }

  calcSizes() {
    this.sliderWidth = this.$el.clientWidth;
    this.slideWidth = 100 / this.slidesCount;

    this.slides.forEach(slide => {
      slide.$el.style.width = `${this.slideWidth}%`;
    }); 
    if (this.platform == 'mobile') {
      this.$sliderTrack.style.width = `${this.slidesCount / this.visibleSlidesCount * 250}%`;
    } else {
      this.$sliderTrack.style.width = `${this.slidesCount / this.visibleSlidesCount * 100}%`;
    }
  }

  creteDots() {
    for (let index = 0; index < this.slidesCount; index++) {
      let $dot = document.createElement('div');
      $dot.className = `bf-actions-slider__dot${index == this.position ? ' active' : ''}`;
      this.$dotsBlock.appendChild($dot);
      this.dots.push($dot);
    }
  }

  setInitialized() { this.$el.className += ' initialized' }

  initPosition() {
    let actionInProgress = false;
    let startPosition = 0;

    for (let [key, slide] of this.slides.entries()) {
      if (this.currentTime < slide.startPosition) {
        startPosition = key;
        break;
      }

      if (this.currentTime > slide.endTime) {
        startPosition = key;
      }

      if (this.currentTime >= slide.startTime && this.currentTime <= slide.endTime) {
        actionInProgress = true;
        this.changePosition(slide.position);
        break;
      }
    }
    if (!actionInProgress) {
      this.changePosition(startPosition);
    }
  }

  changePosition(position) {
    if (this.platform == 'mobile') {
      this.transform(this.$sliderTrack, `translate3d(${(0 - position) * this.slideWidth + 2.5}%, 0, 0)`);
    } else {
      if (position < this.slidesCount - 2 && position > 0) {
        this.transform(this.$sliderTrack, `translate3d(${(1 - position) * this.slideWidth}%, 0, 0)`);
      } else if (position > 0) {
        this.transform(this.$sliderTrack, `translate3d(${(1 - (this.slidesCount - 2)) * this.slideWidth}%, 0, 0)`);
      } else {
        this.transform(this.$sliderTrack, `translate3d(0, 0, 0)`);
      }
    }
    this.position = position;
    this.updateDots();
  }

  updateDots() {
    this.dots.forEach((el, index) => {
      el.className = this.position == index ? 'bf-actions-slider__dot active' : 'bf-actions-slider__dot';
    });
  }

  transform(el, value) {
    el.style.webkitTransform = value;
    el.style.MozTransform = value;
    el.style.msTransform = value;
    el.style.OTransform = value;
    el.style.transform = value;  
  }

  actionStarted(event) {
    this.changePosition(event.detail.position);
    this.updateDots();
  }
}

export default Banner;