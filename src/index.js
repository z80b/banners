import Banner from '@js/banner.js';

require('@css/index.styl');

// Date.prototype.getTime = () => Date.parse('2019.11.08');
console.log('Hello');

document.addEventListener('DOMContentLoaded', (event) => {
  const banner = new Banner('.bf-actions', { slides: 3 });
}, false);

