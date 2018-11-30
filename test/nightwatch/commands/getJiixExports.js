exports.command = function getJiixExports(component, callback) {
  const self = this;

  function getElementProperty(comp) {
    // eslint-disable-next-line no-undef
    return document.querySelector(comp).editor.model.exports['application/vnd.myscript.jiix'];
  }

  function getElementPropertyCallback(res) {
    if (typeof callback === 'function') {
      callback.call(self, res);
    }
  }

  this.execute(getElementProperty, [component], getElementPropertyCallback);
  return this;
};
