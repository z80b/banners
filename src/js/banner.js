import Dom from '@js/dom.js';
import { sendEvent } from '@js/utils.js';
import Popup from '@js/popup.js';
import Swiper from 'swiper';
import panoramaPick from '@tpl/pick-popup.tpl';

class Banner extends Dom {
  constructor(el) {
    super(el);

    this.slidesCount = 10;
    this.visibleSlides = 4;
    //this.slideWidth = this.$el.clientWidth / this.visibleSlides;
    // this.image = this.$el.getAttribute('data-image');
    // this.imageWidth = 5439;
    // this.imageHeight = 854;
    // this.$container = this.$el.querySelector('.ny-panorama__content');
    // this.$image = new Image(this.imageWidth, this.imageHeight);
    // this.$image.addEventListener('load', this.init.bind(this));
    // this.$image.src = this.image;
    this.initSlider();
    // this.$el.addEventListener('click', this.hidePopups.bind(this), false);
    console.log('Banner:', this);
    return this;
  }

  init() {
    const $imgs = this.$el.querySelectorAll('.ny-panorama__slide-img');
    $imgs.forEach(el => {
      el.addEventListener('click', () => {
        sendEvent('background:click');
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
        const $popup = document.createElement('div');
        $popup.className = 'ny-panorama-popup';
        $picks[i].style.top = `${position[1]}px`;
        $picks[i].style.left = `${position[0]}px`;
        if (parseInt(position[1]) + 310 > this.$el.clientHeight) {
          $popup.style.top = `${parseInt(position[1]) - 310 + 8}px`;
        } else $popup.style.top = `${parseInt(position[1]) + 8}px`;
        $popup.style.left = `${parseInt(position[0]) + 8}px`;
        $picks[i].parentNode.appendChild($popup);
        $popup.innerHTML = panoramaPick({
          src: '/static/MP002XW1247P_9518641_1_v1.jpg',
          title: 'Массивные кроссовки',
          text: 'Коллекция, объединила в себе женственные силуэты и спортивный стиль.',
        });
        new Popup($popup, $picks[i]);
      }
    }
  }

  hidePopups() {
    const $popups = this.$el.querySelectorAll('.ny-panorama-popup');
    for (let i = 0; i < $popups.length; i++) {
      $popups[i].style.display = 'none';
    }
  }

}

export default Banner;