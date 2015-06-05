'use strict';

describe('MathResult: output/math/mathResult.js', function () {

    describe('Default construction', function () {

        var mathResult;
        before(function (done) {
            mathResult = new MyScript.MathResult();
            done();
        });

        it('check initial state', function () {
            expect(mathResult).to.be.an('object');
            expect(mathResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(mathResult).to.be.an.instanceof(MyScript.MathResult);
        });

        it('Candidates getter', function () {
            expect(mathResult.getMathDocument()).to.be.undefined;
        });

    });

});