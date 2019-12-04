import Dom from '@js/dom.js';
import { sendMessage } from '@js/utils/events.js';
import { addClass, removeClass } from '@js/utils/dom.js';
import { getMoscowTime, getDate } from '@js/utils/date.js';

class BannerSlide extends Dom {
  constructor(el, index) {
    super(el);
    const dt = this.$el.dataset.actionDate.match(/(\d+).(\d+)\-(\d+).(\d+)/);
    this.startTime   = Date.parse(`2019/${dt[1]}/${dt[2]} 00:00:00`);
    this.endTime     = Date.parse(`2019/${dt[3]}/${dt[4]} 23:59:59`);
    this.currentTime = getMoscowTime();
    this.href = this.$el.getAttribute('data-href');
    this.started = false;
    this.checkTime();
    this.timer = setInterval(this.checkTime.bind(this), 1000);
  }

  checkTime() {
    this.currentTime = getMoscowTime();
    if (this.currentTime >= this.startTime && this.currentTime <= this.endTime) {
      this.started = true;
      sendMessage('action:started', { position: this.position });
      this.$el.setAttribute('href', this.href);
      addClass(this.$el, 'ny-calendar-slide--started');
    } else if (this.currentTime < this.startTime) {
      this.$el.removeAttribute('href');
      addClass(this.$el, 'ny-calendar-slide--coming');
    } else {
      this.$el.removeAttribute('href');
      removeClass(this.$el, 'ny-calendar-slide--coming');
      removeClass(this.$el, 'ny-calendar-slide--started');
    }
  }
}

export default BannerSlide;