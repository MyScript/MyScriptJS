'use strict';

describe('MyScriptJS: recognition/mathWSRecognizer.js', function () {

    it('MathWSRecognizer object exist', function () {
        expect(MyScript.MathWSRecognizer).to.exist;
        expect(MyScript.MathWSRecognizer).not.to.be.null;
        expect(MyScript.MathWSRecognizer).to.not.be.undefined;
    });

    /* TODO: Find a proper way to test WebSockets
    var mathRecognizer;
    it('Create a math WebSocket', function (done) {
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
        mathRecognizer = new MyScript.MathWSRecognizer('cloud-internal-master.visionobjects.com');
        mathRecognizer.setOpenCallback(opened);
        mathRecognizer.setCloseCallback(closed);
        mathRecognizer.setErrorCallback(error);
        mathRecognizer.setMessageCallback(message);
        expect(mathRecognizer).to.be.an('object');
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.MathWSRecognizer);
    });
    */

});