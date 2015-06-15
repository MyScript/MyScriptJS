'use strict';

describe('AbstractWSRecognizer: recognition/abstractWSRecognizer.js', function () {

    describe('Default construction', function () {

        var abstractWSRecognizer;
        before(function (done) {
            abstractWSRecognizer = new MyScript.AbstractWSRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(abstractWSRecognizer).to.be.an('object');
            expect(abstractWSRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(abstractWSRecognizer).to.be.an.instanceOf(MyScript.AbstractWSRecognizer);
        });

    });

    describe('Accessors', function () {

        var abstractWSRecognizer;
        var messageCallback, openCallback, closeCallback, errorCallback;
        before(function (done) {
            abstractWSRecognizer = new MyScript.AbstractWSRecognizer();
            messageCallback = function (message) {
                console.log(message);
            };
            openCallback = function (message) {
                console.log(message);
            };
            closeCallback = function (message) {
                console.log(message);
            };
            errorCallback = function (message) {
                console.log(message);
            };
            done();
        });

        it('Get message callback', function () {
            expect(abstractWSRecognizer.getMessageCallback()).to.be.undefined;
        });

        it('Set message callback', function () {
            abstractWSRecognizer.setMessageCallback(messageCallback);
            expect(abstractWSRecognizer.getMessageCallback()).to.not.be.undefined;
        });

        it('Get open callback', function () {
            expect(abstractWSRecognizer.getOpenCallback()).to.be.undefined;
        });

        it('Set open callback', function () {
            abstractWSRecognizer.setOpenCallback(openCallback);
            expect(abstractWSRecognizer.getOpenCallback()).to.not.be.undefined;
        });

        it('Get close callback', function () {
            expect(abstractWSRecognizer.getCloseCallback()).to.be.undefined;
        });

        it('Set close callback', function () {
            abstractWSRecognizer.setCloseCallback(closeCallback);
            expect(abstractWSRecognizer.getCloseCallback()).to.not.be.undefined;
        });

        it('Get error callback', function () {
            expect(abstractWSRecognizer.getErrorCallback()).to.be.undefined;
        });

        it('Set error callback', function () {
            abstractWSRecognizer.setErrorCallback(errorCallback);
            expect(abstractWSRecognizer.getErrorCallback()).to.not.be.undefined;
        });

    });

});