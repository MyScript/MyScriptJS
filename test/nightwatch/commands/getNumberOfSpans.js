exports.command = function getNumberOfSpans(element, callback) {
  const self = this;

  function getNumberOfSpansFunc(el) {
    // eslint-disable-next-line no-undef
    return document.querySelector(el).getElementsByTagName('span').length;
  }

  function getNumberOfSpansCallback(res) {
    if (typeof callback === 'function') {
      callback.call(self, res);
    }
  }

  this.execute(getNumberOfSpansFunc, [element], getNumberOfSpansCallback);
  return this;
};
