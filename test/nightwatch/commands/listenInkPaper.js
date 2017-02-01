exports.command = function listenInkPaper(done) {
  this.injectScript('/samples/tests/inkPaperSupervisor.js', 'customScript', done);
};
