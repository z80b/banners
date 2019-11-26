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

  }

  showPopup() {
    this.$el.style.display = 'block';
  }

  hidePopup() {}


}

export default Popup;