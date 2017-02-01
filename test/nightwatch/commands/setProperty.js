exports.command = function setProperty(element, property, value, callback) {
  const self = this;

  function setElementProperty(el, prop, val) {
    // eslint-disable-next-line no-undef
    document.querySelector(el)[prop] = val;
    return val;
  }

  function setElementPropertyCallback(result) {
    if (typeof callback === 'function') {
      callback.call(self, result);
    }
  }

  this.execute(setElementProperty, [element, property, value], setElementPropertyCallback);
  return this;
};
