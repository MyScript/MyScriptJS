exports.command = function (done) {
  this.injectScript('/samples/tests/inkPaperSupervisor.js', 'customScript', done);
};
