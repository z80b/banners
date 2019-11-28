export const addClass = ($el, className) => {
  if ($el.className.search(className) < 0) {
    $el.className += ` ${className}`;
  }
}

export const removeClass = ($el, className) => {
  if ($el.className.search(className) >= 0) {
    $el.className = $el.className.replace(` ${className}`, '');
  }  
}