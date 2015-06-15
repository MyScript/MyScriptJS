'use strict';

describe('MathResult: output/math/mathResult.js', function () {

    describe('Default construction', function () {

        var mathResult;
        before(function (done) {
            mathResult = new MyScript.MathResult();
            done();
        });

        it('Check initial state', function () {
            expect(mathResult).to.be.an('object');
            expect(mathResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(mathResult).to.be.an.instanceOf(MyScript.MathResult);
        });

        it('Get MathDocument', function () {
            expect(mathResult.getMathDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var mathResult;
        before(function (done) {
            mathResult = new MyScript.MathResult({
                result: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(mathResult).to.be.an('object');
            expect(mathResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(mathResult).to.be.an.instanceOf(MyScript.MathResult);
        });

        it('Get MathDocument', function () {
            expect(mathResult.getMathDocument()).to.be.an.instanceOf(MyScript.MathDocument);
        });

    });

});