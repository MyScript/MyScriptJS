exports.command = function listenEditor(done) {
  this.injectScript('/examples/dev/tests/editorSupervisor.js', 'customScript', done);
};
