import Dom from '@js/dom.js';
import { waitEvent } from '@js/utils.js';

class Popup extends Dom {
  constructor(el, pick) {
    super(el)
    this.$pick = pick;
    this.$pick.addEventListener('click', this.showPopup.bind(this));
    this.init();
  }

  init() {
    waitEvent('background:click', this.hidePopup.bind(this));
  }

  showPopup() {
    this.$el.style.display = 'block';
  }

  hidePopup() {
    this.$el.style.display = 'none';
  }


}

export default Popup;