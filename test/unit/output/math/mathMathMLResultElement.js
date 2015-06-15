'use strict';

describe('MathMathMLResultElement: output/math/mathMathMLResultElement.js', function () {

    describe('Default construction', function () {

        var mathMathMLResultElement;
        before(function (done) {
            mathMathMLResultElement = new MyScript.MathMathMLResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(mathMathMLResultElement).to.be.an('object');
            expect(mathMathMLResultElement).to.be.an.instanceOf(MyScript.MathResultElement);
            expect(mathMathMLResultElement).to.be.an.instanceOf(MyScript.MathMathMLResultElement);
        });

        it('Value getter', function () {
            expect(mathMathMLResultElement.getValue()).to.be.undefined;
        });

    });

});