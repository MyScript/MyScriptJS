'use strict';

describe('TextContinueRequestWSMessage: input/math/textContinueRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.TextContinueRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.AbstractContinueRequestWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.TextContinueRequestWSMessage);
        });

        it('Get inputUnits', function () {
            expect(message.getInputUnits()).to.be.undefined;
        });

        it('Set inputUnits', function () {
            message.setInputUnits([new MyScript.TextInputUnit()]);
            expect(message.getInputUnits()).not.to.be.undefined;
        });

    });

});