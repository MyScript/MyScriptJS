exports.command = function getProperty(element, property, callback) {
  const self = this;

  function getElementProperty(el, prop) {
    // eslint-disable-next-line no-undef
    return document.querySelector(el)[prop];
  }

  function getElementPropertyCallback(res) {
    if (typeof callback === 'function') {
      callback.call(self, res);
    }
  }

  this.execute(getElementProperty, [element, property], getElementPropertyCallback);
  return this;
};
