'use strict';

describe('MathContinueRequestWSMessage: input/math/mathContinueRequestWSMessage.js', function () {

    describe('Default construction', function () {

        var message;
        before(function (done) {
            message = new MyScript.MathContinueRequestWSMessage();
            done();
        });

        it('Check initial state', function () {
            expect(message).to.be.an('object');
            expect(message).to.be.an.instanceOf(MyScript.AbstractWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.AbstractContinueRequestWSMessage);
            expect(message).to.be.an.instanceOf(MyScript.MathContinueRequestWSMessage);
        });

        it('Get components', function () {
            expect(message.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            message.setComponents(new MyScript.AbstractComponent());
            expect(message.getComponents()).not.to.be.undefined;
        });

    });

});