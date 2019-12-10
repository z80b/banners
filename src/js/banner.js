import BannerBase from '@js/libs/banner.js';
import { sendMessage } from '@js/libs/events.js';


class Banner extends BannerBase {
  constructor(el) {
    super(el);
    this.$el.addClass('lp-banner--ready');
    console.log(this);
  }
}

export default Banner;