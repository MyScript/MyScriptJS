exports.command = function (element, strokes, offsetX, offsetY, callback) {
    offsetX = offsetX | 0;
    offsetY = offsetY | 0;

    this.perform(function (client, done) {
        strokes.forEach(function (stroke) {
            if (stroke[0].length === 1 && stroke[0][0] === stroke[1][0]) {
                if (stroke[0][0] === -1) {
                    client.click('paper-fab[icon=undo]');
                }
                else if (stroke[0][0] === 1) {
                    client.click('paper-fab[icon=redo]');
                }
                else if (stroke[0][0] === 0) {
                    client.click('paper-fab[icon=delete]');
                }
            } else {
                client.moveToElement(element, offsetX + stroke[0][0], offsetY + stroke[1][0]);
                client.mouseButtonDown('left');
                for (var p in stroke[0]) {
                    client.moveToElement(element, offsetX + stroke[0][p], offsetY + stroke[1][p]);
                }
                client.mouseButtonUp('left');
            }
        });
        done();
    });


    if (typeof callback === 'function') {
        callback.call(this);
    }
    return this;
};
