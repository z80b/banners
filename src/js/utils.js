export const sendEvent = (name, props = {}) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: props
  });
  console.log('sendEvent:', name, props);
  window.dispatchEvent(event);
}

export const waitEvent = (name, callback) =>  {
  window.addEventListener(name, callback, false);
}