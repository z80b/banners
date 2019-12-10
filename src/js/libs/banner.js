import { $, addClass, removeClass } from '@js/libs/dom.js';

class BannerBase {
  constructor(el) {
    this.$el = $(el);
    this.$el.addClass = this.addClass.bind(this);
    this.$el.removeClass = this.removeClass.bind(this);
    this.render();
  }

  render() {
    //...
  }

  addClass(className) {
    addClass(this.$el, className);
    return this.$el;
  }

  removeClass(className) {
    removeClass(this.$el, className);
    return this.$el;
  }
}

export default BannerBase;