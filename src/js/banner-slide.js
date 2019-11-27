import Dom from '@js/dom.js';
import slideTpl from '@tpl/slide.tpl';

class BannerSlide extends Dom {
  constructor(el, index, parent) {
    super(el);
    this.parent = parent;
    this.props = {
      title: '',
      discount: '',
      date: '',
      ...this.$el.dataset};
    this.position = index;
    this.init();
    this.render();
    this.checkTime();
    this.timer = setInterval(this.checkTime.bind(this), 1000);
  }

  init() {
    for (let key in this.$el.dataset) {
      this[key] = this.$el.dataset[key];
    }
    const cdt = new Date();
    const cdtStr = `${cdt.getFullYear()}/${cdt.getMonth() + 1}/${cdt.getDate()}`;
    let dt = this.$el.dataset.actionDate.split(/\s?-\s?/);
    this.timeOffset = (new Date()).getTimezoneOffset() * 60000;
    this.startTime = Date.parse(`${cdtStr} ${dt[0]}:00`) - 3 * 60 * 60 * 1000;
    this.endTime = Date.parse(`${cdtStr} ${dt[1]}:00`) - 3 * 60 * 60 * 1000;
    this.props.startDate = `${cdtStr} ${dt[0]}:00`;
    this.props.endDate = `${cdtStr} ${dt[1]}:00`;
    // this.timeOffset = window.LMDA ? (new Date()).getTime() - (LMDA.nginxTime || LMDA.pageState.request.timestamp) * 1000 : 0;
    
    // console.log('timeOffset:', this.timeOffset, (new Date()).getTime(), (LMDA.nginxTime || LMDA.pageState.request.timestamp));
    this.time = (new Date()).getTime();
    this.started = false;
    if (this.time >= this.startTime && this.time <= this.endTime) {
      this.parent.position = this.position;
    }
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

  checkTime(parent = null) {
    this.time = (new Date()).getTime() + this.timeOffset;
    if (this.time >= this.startTime && this.time <= this.endTime) {
      if (!this.started) {
        const event = new CustomEvent('action:ready', {
          bubbles: true,
          detail: {
            position: this.position
        }});
        window.dispatchEvent(event);
        this.started = true;
      }
      this.$el.setAttribute('href', this.href);
      this.setClass('active');
      this.removeClass('soon');
    } else if (this.time < this.startTime) {
      //this.$el.removeAttribute('href');
      this.$el.setAttribute('href', this.href);
      this.removeClass('active');
      this.setClass('soon');
    } else {
      this.$el.removeAttribute('href');
      this.removeClass('active');
      this.removeClass('soon');
      this.started = false;
    }
    this.renderTimer(this.time, this.startTime, this.endTime);
    return this.started;
  }

  renderTimer(currentTime, startTime, endTime) {
    let resDateTime = '';
    let dt;
    if (currentTime < startTime) {
      dt = this.timeLeft(currentTime, startTime);
      resDateTime = `До старта: ${ this.timeString(dt) }`;
    } else if (currentTime >= startTime && currentTime <= endTime) {
      dt = this.timeLeft(currentTime, endTime);
      resDateTime = `До конца: ${ this.timeString(dt) }`;
    } else {
      resDateTime = 'Акция завершина';
    }
    this.$el.querySelector('.bf-actions-slide__timer').innerHTML = resDateTime;
  }

  timeString(dt) {
    const formatNum = (num) => parseInt(num) > 9 ? `${num}` : `0${parseInt(num)}`;
    let res = '';
    if (dt.days) res += `${ dt.days }д. `;
    if (dt.hours) res += `${ formatNum(dt.hours) }ч. `;
    if (dt.minutes) res += `${ formatNum(dt.minutes) }м. `;
    if (dt.seconds) res += `${ formatNum(dt.seconds) }с. `;
    return res;
  }

  timeLeft(startTime, finalTime) {
    const timeLeft = finalTime - startTime; //(new Date()).getTime()
    return {
      seconds     : Math.floor(timeLeft / 1000) % 60,
      minutes     : Math.floor(timeLeft / 1000 / 60) % 60,
      hours       : Math.floor(timeLeft / 1000 / 60 / 60) % 24,
      days        : Math.floor(timeLeft / 1000 / 60 / 60 / 24) % 30.4368,
    };
  }
}

export default BannerSlide;