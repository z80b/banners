import Dom from '@js/dom.js';
import { sendMessage, waitMessage, addClass, removeClass } from '@js/utils.js';
import panoramaPick from '@tpl/pick-popup.tpl';

class PanoramaPick extends Dom {
  constructor(el) {
    super(el)
    this.inAction = false;
    waitMessage('popup:close', this.hidePopup.bind(this));
    this.render();
  }

  afterRender() {
    this.$dot = this.$el.querySelector('.ny-panorama__dot');
    this.$popup = this.$el.querySelector('.ny-panorama-popup');
    this.$popup.style.display = 'none';
    this.$dot.addEventListener('click', this.showPopup.bind(this));
  }

  render() {
    this.$el.innerHTML = panoramaPick({
      src: '/static/MP002XW1247P_9518641_1_v1.jpg',
      title: 'Массивные кроссовки',
      text: 'Коллекция, объединила в себе женственные силуэты и спортивный стиль.',
    });
    this.afterRender();
  }

  showPopup() {
    this.inAction = true;
    sendMessage('popup:close');
    this.$popup.style.display = 'block';
    setTimeout(() => {
      addClass(this.$popup, 'ny-panorama-popup--opened');
      this.inAction = false;
    }, 100);
    
  }

  hidePopup() {
    if (!this.inAction) {
      removeClass(this.$popup, 'ny-panorama-popup--opened');
      setTimeout(() => { this.$popup.style.display = 'none' }, 500);
    }
  }


}

export default PanoramaPick;