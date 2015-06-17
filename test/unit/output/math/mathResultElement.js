'use strict';

describe('MathResultElement: output/math/mathResultElement.js', function () {

    describe('Default construction', function () {

        var mathResultElement;
        before(function (done) {
            mathResultElement = new MyScript.MathResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(mathResultElement).to.be.an('object');
            expect(mathResultElement).to.be.an.instanceOf(MyScript.MathResultElement);
        });

        it('Get type', function () {
            expect(mathResultElement.getType()).to.equal(undefined);
        });

        it('Get is LaTex', function () {
            expect(mathResultElement.isLaTex()).to.equal(false);
        });

        it('Get is MathML', function () {
            expect(mathResultElement.isMathMl()).to.equal(false);
        });

        it('Get is SymbolTree', function () {
            expect(mathResultElement.isSymbolTree()).to.equal(false);
        });

    });

});