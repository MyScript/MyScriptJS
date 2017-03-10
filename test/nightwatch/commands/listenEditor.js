exports.command = function listenEditor(done) {
  this.injectScript('/samples/tests/editorSupervisor.js', 'customScript', done);
};
