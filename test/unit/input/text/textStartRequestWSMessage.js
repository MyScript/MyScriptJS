'use strict';

describe('TextStartRequestWSMessage: input/math/textStartRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.TextStartRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
            expect(message).to.be.an.instanceof(MyScript.TextStartRequestWSMessage);
        });

    });

    describe('Accessors', function () {

        var message;
        beforeEach(function (done) {
            message = new MyScript.TextStartRequestWSMessage();
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

        it('parameters getter', function () {
            expect(message.getParameters()).to.be.empty;
        });

        it('parameters setter', function () {
            expect(message.getParameters()).to.be.undefined;
            message.setParameters(new MyScript.AbstractParameter());
            expect(message.getParameters()).not.to.be.undefined;
        });

    });

});