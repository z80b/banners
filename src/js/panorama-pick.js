import Dom from '@js/dom.js';
import { sendMessage, waitMessage } from '@js/utils/events.js';
import { addClass, removeClass } from '@js/utils/dom.js';
import panoramaPick from '@tpl/pick-popup.tpl';

class PanoramaPick extends Dom {
  constructor(el, $parent) {
    super(el)
    this.$parent = $parent;
    this.inAction = false;
    waitMessage('popup:close', this.hidePopup.bind(this));
    this.render();
  }

  afterRender() {
    this.$dot = this.$el.querySelector('.ny-panorama__dot');
    this.$popup = this.$el.querySelector('.ny-panorama-popup');

    if ((this.$el.offsetTop + this.$popup.clientHeight) > this.$parent.clientHeight) {
      this.$el.setAttribute('data-direction', 'up');
    } else this.$el.setAttribute('data-direction', 'down');

    this.$popup.style.display = 'none';
    this.$dot.addEventListener('click', this.showPopup.bind(this));
  }

  render() {
    this.setPosition();
    this.$el.innerHTML = panoramaPick(this.$el.dataset);
    this.afterRender();
  }

  setPosition() {
    const position = this.$el.getAttribute('data-position').split(',');
    this.$el.style.top = `${position[1]}%`;
    this.$el.style.left = `${position[0]}%`;
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