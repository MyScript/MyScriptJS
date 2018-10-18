exports.command = function getJiixExports(callback) {
  const self = this;

  function getElementProperty() {
    // eslint-disable-next-line no-undef
    return document.querySelector("#editor").editor.model.exports['application/vnd.myscript.jiix'];
  }

  function getElementPropertyCallback(res) {
    if (typeof callback === 'function') {
      callback.call(self, res);
    }
  }

  this.execute(getElementProperty, [], getElementPropertyCallback);
  return this;
};
