'use strict';

describe('MathInkRange: output/math/mathInkRange.js', function () {

    describe('Default construction', function () {

        var mathInkRange;
        before(function (done) {
            mathInkRange = new MyScript.MathInkRange();
            done();
        });

        it('Check initial state', function () {
            expect(mathInkRange).to.be.an('object');
            expect(mathInkRange).to.be.an.instanceOf(MyScript.MathInkRange);
        });

        it('Get component', function () {
            expect(mathInkRange.getComponent()).to.equal(undefined);
        });

        it('Get first item', function () {
            expect(mathInkRange.getFirstItem()).to.equal(undefined);
        });

        it('Get last item', function () {
            expect(mathInkRange.getLastItem()).to.equal(undefined);
        });

    });

});