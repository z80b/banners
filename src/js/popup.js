import Dom from '@js/dom.js';

class Popup extends Dom {
  constructor(el, pick) {
    super(el)
    this.$pick = pick;
    this.$pick.addEventListener('click', this.showPopup.bind(this));
  }

  showPopup() {
    this.$el.style.display = 'block';
  }


}

export default Popup;