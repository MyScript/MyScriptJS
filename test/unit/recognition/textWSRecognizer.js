'use strict';

describe('MyScriptJS: recognition/textWSRecognizer.js', function () {

    it('TextWSRecognizer object exist', function () {
        expect(MyScript.TextWSRecognizer).to.exist;
        expect(MyScript.TextWSRecognizer).not.to.be.null;
        expect(MyScript.TextWSRecognizer).to.not.be.undefined;
    });

    /* TODO: Find a proper way to test WebSockets
    var textRecognizer;
    it('Create a text WebSocket', function (done) {
        var opened = function (response) {
            expect(response).to.exist;
            done(undefined, response);
        };
        var error = function (response) {
            expect(response).to.exist;
            done(response);
        };
        var closed = function (response) {
            expect(response).to.exist;
            done(response);
        };
        var message = function (response) {
            expect(response).to.exist;
            done(response);
        };
        textRecognizer = new MyScript.TextWSRecognizer(opened, closed, error, message, 'cloud-internal-master.visionobjects.com');
        textRecognizer.setOpenCallback(opened);
        textRecognizer.setCloseCallback(closed);
        textRecognizer.setErrorCallback(error);
        textRecognizer.setMessageCallback(message);
        expect(textRecognizer).to.be.an('object');
        expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
        expect(textRecognizer).to.be.an.instanceof(MyScript.TextWSRecognizer);
    });
    */


});