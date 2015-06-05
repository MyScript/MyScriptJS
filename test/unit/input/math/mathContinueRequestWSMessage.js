'use strict';

describe('MathContinueRequestWSMessage: input/math/mathContinueRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.MathContinueRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractContinueRequestWSMessage);
            expect(message).to.be.an.instanceof(MyScript.MathContinueRequestWSMessage);
        });

    });

    describe('Accessors', function () {

        var message;
        beforeEach(function (done) {
            message = new MyScript.MathContinueRequestWSMessage();
            done();
        });

        it('components getter', function () {
            expect(message.getComponents()).to.be.undefined;
        });

        it('components setter', function () {
            expect(message.getComponents()).to.be.undefined;
            message.setComponents(new MyScript.AbstractComponent());
            expect(message.getComponents()).not.to.be.undefined;
        });

    });

});