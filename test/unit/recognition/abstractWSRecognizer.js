'use strict';

describe('MyScriptJS: recognition/abstractWSRecognizer.js', function () {

    it('AbstractWSRecognizer object exist', function () {
        expect(MyScript.AbstractWSRecognizer).to.exist;
        expect(MyScript.AbstractWSRecognizer).not.to.be.null;
        expect(MyScript.AbstractWSRecognizer).to.not.be.undefined;
    });

    var abstractWSRecognizer = new MyScript.AbstractWSRecognizer('cloud-internal-master.visionobjects.com');
    it('AbstractWSRecognizer constructor', function () {
        expect(abstractWSRecognizer).to.be.an('object');
        expect(abstractWSRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(abstractWSRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
    });

    it('Get message callback', function () {
        expect(abstractWSRecognizer.getMessageCallback()).to.be.undefined;
    });

    var messageCallback = function (message) {
        console.log(message);
    };

    it('Set message callback', function () {
        abstractWSRecognizer.setMessageCallback(messageCallback);
        expect(abstractWSRecognizer.getMessageCallback()).to.not.be.undefined;
    });

    it('Get open callback', function () {
        expect(abstractWSRecognizer.getOpenCallback()).to.be.undefined;
    });

    var openCallback = function (message) {
        console.log(message);
    };

    it('Set open callback', function () {
        abstractWSRecognizer.setOpenCallback(openCallback);
        expect(abstractWSRecognizer.getOpenCallback()).to.not.be.undefined;
    });

    it('Get close callback', function () {
        expect(abstractWSRecognizer.getCloseCallback()).to.be.undefined;
    });

    var closeCallback = function (message) {
        console.log(message);
    };

    it('Set close callback', function () {
        abstractWSRecognizer.setCloseCallback(closeCallback);
        expect(abstractWSRecognizer.getCloseCallback()).to.not.be.undefined;
    });

    it('Get error callback', function () {
        expect(abstractWSRecognizer.getErrorCallback()).to.be.undefined;
    });

    var errorCallback = function (message) {
        console.log(message);
    };

    it('Set error callback', function () {
        abstractWSRecognizer.setErrorCallback(errorCallback);
        expect(abstractWSRecognizer.getErrorCallback()).to.not.be.undefined;
    });

    it('Get state failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.getState().then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });

    it('Close socket failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.close().then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });

    var message = {
        type: 'test'
    };
    it('Send message failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.sendMessage(message).then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });

    var applicationKey = 'applicationKey';
    var challenge = 'challenge';
    var hmacKey = 'HMAC';
    it('Init recognition failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.initWSRecognition(applicationKey).then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });
    it('Tack up HMAC challenge failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.takeUpHmacChallenge(applicationKey, challenge, hmacKey).then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });
    it('Reset recognition failed - abstraction has no socket', function (done) {
        abstractWSRecognizer.resetWSRecognition().then(
            function success(response) {
                done(response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });

});