'use strict';

describe('MathResultElement: output/math/mathResultElement.js', function () {

    describe('Default construction', function () {

        var mathResultElement;
        before(function (done) {
            mathResultElement = new MyScript.MathResultElement();
            done();
        });

        it('check initial state', function () {
            expect(mathResultElement).to.be.an('object');
            expect(mathResultElement).to.be.an.instanceof(MyScript.MathResultElement);
        });

        it('Type getter', function () {
            expect(mathResultElement.getType()).to.be.undefined;
        });

        it('is LaTex', function () {
            expect(mathResultElement.isLaTex()).to.be.false;
        });

        it('is MathML', function () {
            expect(mathResultElement.isMathMl()).to.be.false;
        });

        it('is Symbol Tree', function () {
            expect(mathResultElement.isSymbolTree()).to.be.false;
        });

    });

});