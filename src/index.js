import Banner from '@js/banner.js';

require('@css/index.styl');

document.addEventListener('DOMContentLoaded', (event) => {
  const banner = new Banner('.bf-actions', { slides: 3 });
});

