'use strict';

describe('MathInkRange: output/math/mathInkRange.js', function () {

    describe('Default construction', function () {

        var mathInkRange;
        before(function (done) {
            mathInkRange = new MyScript.MathInkRange();
            done();
        });

        it('check initial state', function () {
            expect(mathInkRange).to.be.an('object');
            expect(mathInkRange).to.be.an.instanceof(MyScript.MathInkRange);
        });

        it('Component getter', function () {
            expect(mathInkRange.getComponent()).to.be.undefined;
        });

        it('First Item getter', function () {
            expect(mathInkRange.getFirstItem()).to.be.undefined;
        });

        it('Last Item getter', function () {
            expect(mathInkRange.getLastItem()).to.be.undefined;
        });

    });

});