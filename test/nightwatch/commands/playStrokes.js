exports.command = function playStrokes(element, strokes, offsetX, offsetY, timeout, callback) {
  const offsetXRef = offsetX || 0;
  const offsetYRef = offsetY || 0;
  const timeoutRef = timeout || 3000;

  function playStroke(stroke, client) {
    if (stroke[0].length === 1 && stroke[0][0] === stroke[1][0]) {
      if (stroke[0][0] === -1) {
        client.click('#undo');
      } else if (stroke[0][0] === 1) {
        client.click('#redo');
      } else if (stroke[0][0] === 0) {
        client.click('#clear');
      }
    } else {
      client.moveToElement(element, offsetXRef + stroke[0][0], offsetYRef + stroke[1][0]);
      client.mouseButtonDown('left');
      for (let p = 0; p < stroke[0].length; p++) {
        client.moveToElement(element, offsetXRef + stroke[0][p], offsetYRef + stroke[1][p]);
      }
      client.mouseButtonUp('left');
    }
  }

  function playStrokesFunction(client, done) {
    strokes.forEach(stroke => playStroke(stroke, client));
    client.waitForIdle('#editorSupervisor', timeoutRef, done);
  }

  this.perform(playStrokesFunction);

  if (typeof callback === 'function') {
    callback.call(this);
  }
  return this;
};
