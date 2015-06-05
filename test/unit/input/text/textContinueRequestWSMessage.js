'use strict';

describe('TextContinueRequestWSMessage: input/math/textContinueRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.TextContinueRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
            expect(message).to.be.an.instanceof(MyScript.TextContinueRequestWSMessage);
        });

    });

    describe('Accessors', function () {

        var message;
        before(function (done) {
            message = new MyScript.TextContinueRequestWSMessage();
            done();
        });

        it('inputUnits getter', function () {
            expect(message.getInputUnits()).to.be.undefined;
        });

        it('inputUnits setter', function () {
            expect(message.getInputUnits()).to.be.undefined;
            message.setInputUnits([new MyScript.TextInputUnit()]);
            expect(message.getInputUnits()).not.to.be.undefined;
        });

    });

});