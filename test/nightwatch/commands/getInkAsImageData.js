exports.command = function getInkAsImageData(callback) {
  const self = this;

  function getInkImageData() {
    // eslint-disable-next-line no-undef
    return document.querySelector('[data-myscript-ink-paper]').png;
  }

  function getInkImageDataCallback(result) {
    if (typeof callback === 'function') {
      callback.call(self, result);
    }
  }

  this.execute(getInkImageData, [], getInkImageDataCallback);
  return this;
};
