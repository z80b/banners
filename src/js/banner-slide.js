import Dom from '@js/dom.js';

const slideTpl = require('@tpl/slide.html');

class BannerSlide extends Dom{
  constructor(el, index) {
    super(el);
    this.props = {
      title: '',
      discount: '',
      date: '',
      ...this.$el.dataset};
    this.position = index;
    this.init();
    this.render();
    if (!this.checkTime()) {
      this.timer = setInterval(this.checkTime.bind(this), 3000);
    }
  }

  init() {
    for (let key in this.$el.dataset) {
      this[key] = this.$el.dataset[key];
    }
    let dt = this.$el.dataset.actionDate.split(/\s?-\s?/);
    this.startTime = Date.parse(`2019.${dt[0]}`.replace(/\./g, '/'));
    this.endTime = Date.parse(`2019.${dt[1]}`.replace(/\./g, '/')); + 86399999;
    this.props.startDate = `2019.${dt[0]}`.replace(/\./g, '/');
    this.props.endDate = `2019.${dt[1]}`.replace(/\./g, '/');
    this.time = 0;
    this.started = false;
  }

  render() {
    this.$el.innerHTML = slideTpl(this.props);
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
    this.time = (new Date()).getTime();
    if (this.time >= this.startTime && this.time <= this.endTime) {
      if (!this.started) {
        const event = new CustomEvent('action:ready', {
          bubbles: true,
          cancelable: true,
          detail: {
            position: this.position
        }});
        document.dispatchEvent(event);
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
     return this.started;
  }
}

export default BannerSlide;