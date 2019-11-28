import Dom from '@js/dom.js';
import { sendMessage, waitMessage } from '@js/utils/events.js';
import { addClass, removeClass } from '@js/utils/dom.js';
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
    this.$el.innerHTML = panoramaPick(this.$el.dataset);
    this.afterRender();
  }

  showPopup() {
    this.inAction = true;
    sendMessage('popup:close');
    this.$el.style.zIndex = 5;
    this.$popup.style.display = 'block';
    setTimeout(() => {
      addClass(this.$popup, 'ny-panorama-popup--opened');
      this.inAction = false;
    }, 100);
    
  }

  hidePopup() {
    if (!this.inAction) {
      this.$el.style.zIndex = 'auto';
      removeClass(this.$popup, 'ny-panorama-popup--opened');
      setTimeout(() => { this.$popup.style.display = 'none' }, 500);
    }
  }


}

export default PanoramaPick;