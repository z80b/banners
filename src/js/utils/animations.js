export const getTransformName = ($el) => {
  ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"].forEach(transform => {
    if (document.body.style[transform]) return transform;
  });
  return '';
}

export const translate3d = ($el, x, y, z) => {
  const transform = getTransformName($el);
  $el.style[transform] = `translate3d(${x}, ${y}, ${z})`;
  console.log('translate3D', $el.style[transform],`translate3d(${x}, ${y}, ${z})`);
}