'use strict';

describe('MathStartRequestWSMessage: input/math/mathStartRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.MathStartRequestWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceof(MyScript.AbstractStartRequestWSMessage);
            expect(message).to.be.an.instanceof(MyScript.MathStartRequestWSMessage);
        });

    });

    describe('Accessors', function () {

        var message;
        beforeEach(function (done) {
            message = new MyScript.MathStartRequestWSMessage();
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

        it('parameters getter', function () {
            expect(message.getParameters()).to.be.empty;
        });

        it('parameters setter', function () {
            expect(message.getParameters()).to.be.undefined;
            message.setParameters(new MyScript.MathParameter());
            expect(message.getParameters()).not.to.be.undefined;
        });

    });

});