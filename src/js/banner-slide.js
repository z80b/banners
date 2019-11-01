import Dom from '@js/dom.js';

const slideTpl = require('@tpl/slide.html');

class BannerSlide extends Dom{
  constructor(el, index) {
    super(el);
    this.props = this.$el.dataset;
    this.position = index;
    this.init();
    this.render();
    this.timer = setInterval(this.checkTime.bind(this), 3000);
  }

  init() {
    for (let key in this.$el.dataset) {
      this[key] = this.$el.dataset[key];
      this.startTime = Date.parse(this.$el.dataset.startDate);
      this.endTime = Date.parse(this.$el.dataset.endDate) + 86399999;
      this.time = 0;
      this.started = false;
    }
  }

  render() {
    this.$el.innerHTML = slideTpl({...this.props, date: this.formatDate(this.props.startDate, this.props.endDate)});
  }

  formatDate(startDate, endDate) {
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const sdt = new Date(startDate);
    const edt = new Date(endDate);
    if (sdt.getMonth() == edt.getMonth()) {
      return `${sdt.getDate()}-${edt.getDate()} ${monthNames[sdt.getMonth()]}`;
    } else {
      return `${sdt.getDate()} ${monthNames[sdt.getMonth()]} - ${edt.getDate()} ${monthNames[edt.getMonth()]}`;
    }
  }

  checkTime() {
    let dt = new Date();
    this.time = dt.getTime();
    if (this.time >= this.startTime && this.time <= this.endTime) {
      if (!this.started) {
        window.dispatchEvent(new CustomEvent('action:ready', {bubbles: true, detail: {
          position: this.position
        }}));
        this.started = true;
      }
      this.$el.setAttribute('href', this.href);
      this.setClass('active');
    } else if (this.time < this.startTime) {
      this.$el.removeAttribute('href');
      this.setClass('active');
    } else {
      this.$el.removeAttribute('href');
      this.removeClass('active');
      this.started = false;
    }
  }
}

export default BannerSlide;