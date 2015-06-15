'use strict';

describe('TextStartRequestWSMessage: input/math/textStartRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.TextStartRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.AbstractStartRequestWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.TextStartRequestWSMessage);
        });

        it('Get inputUnits', function () {
            expect(message.getInputUnits()).to.be.undefined;
        });

        it('Set inputUnits', function () {
            message.setInputUnits([new MyScript.TextInputUnit()]);
            expect(message.getInputUnits()).not.to.be.undefined;
        });

        it('Get parameters', function () {
            expect(message.getParameters()).to.be.empty;
        });

        it('Set parameters', function () {
            message.setParameters(new MyScript.AbstractParameter());
            expect(message.getParameters()).not.to.be.undefined;
        });

    });

});