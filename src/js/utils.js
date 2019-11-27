export const sendMessage = (name, props = {}) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: props
  });
  window.dispatchEvent(event);
}

export const waitMessage = (name, callback) =>  {
  window.addEventListener(name, callback, false);
}

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