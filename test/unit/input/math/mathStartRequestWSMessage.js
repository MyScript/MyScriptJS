'use strict';

describe('MathStartRequestWSMessage: input/math/mathStartRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.MathStartRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.AbstractStartRequestWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.MathStartRequestWSMessage);
        });

        it('Get components', function () {
            expect(message.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            expect(message.getComponents()).to.be.undefined;
            message.setComponents(new MyScript.AbstractComponent());
            expect(message.getComponents()).not.to.be.undefined;
        });

        it('Get parameters', function () {
            expect(message.getParameters()).to.be.empty;
        });

        it('Set parameters', function () {
            expect(message.getParameters()).to.be.undefined;
            message.setParameters(new MyScript.MathParameter());
            expect(message.getParameters()).not.to.be.undefined;
        });

    });

});