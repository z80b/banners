export const sendMessage = (name, props = {}) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: props
  });
  console.log('sendMessage:', event);
  window.dispatchEvent(event);
}

export const waitMessage = (name, callback) =>  {
  window.addEventListener(name, callback, false);
}