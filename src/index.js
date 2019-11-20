import Banner from '@js/banner.js';

require('@css/index.styl');

//Date.prototype.getTime = () => Date.parse('2019.11.25');

document.addEventListener('DOMContentLoaded', (event) => {
  const banner = new Banner('.bf-actions', { slides: 4 });
}, false);

