import Dom from '@js/dom.js';
import Swiper from 'swiper';

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
    return this;
  }

  init() {
     
    this.createSlides();
  }

  initSlider() {
    this.slider = new Swiper('.ny-panorama__content', {
      initialSlide: 0,
      slidesPerView: 4,
      autoplay: true,
      //spaceBetween: 15,
      slideClass: 'ny-panorama__slide',
      wrapperClass: 'ny-panorama__track',
      freeMode: true,
      loop: true,
      mousewheel: true,
      loopAdditionalSlides: 10,
    });
  }

  createSlides() {
    this.$container.style.width = `${this.slidesCount / this.visibleSlides * 100}%`;
    this.slideWidth = 100 / this.slidesCount;
    const cropCanvas = document.createElement('canvas');
    const partWidth = this.imageWidth / 10;
    cropCanvas.width = this.imageWidth;
    cropCanvas.height = this.imageHeight;

    for (let slide, i = 0; i < this.slidesCount; i++) {
      cropCanvas.getContext('2d').drawImage(
        this.$image,
        0, 0, this.imageWidth, this.imageHeight,
        i * this.partWidth, 0, this.partWidth, this.imageHeight);
      slide = document.createElement('img');
      slide.className = 'ny-panorama__slide';
      slide.style.width = `${this.slideWidth}%`;
      slide.src = cropCanvas.toDataURL('image/jpg');
      //slide.style.backgroundImage = `url(${cropCanvas.toDataURL('image/png')})`;
      //slide.style.backgroundPosition = `${i*10}%`;
      this.$container.appendChild(slide);
    }
  }

  initPicks() {

  }

}

export default Banner;