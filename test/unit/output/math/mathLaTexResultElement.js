'use strict';

describe('MathLaTexResultElement: output/math/mathLaTexResultElement.js', function () {

    describe('Default construction', function () {

        var mathLaTexResultElement;
        before(function (done) {
            mathLaTexResultElement = new MyScript.MathLaTexResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(mathLaTexResultElement).to.be.an('object');
            expect(mathLaTexResultElement).to.be.an.instanceOf(MyScript.MathResultElement);
            expect(mathLaTexResultElement).to.be.an.instanceOf(MyScript.MathLaTexResultElement);
        });

        it('Get value', function () {
            expect(mathLaTexResultElement.getValue()).to.equal(undefined);
        });

    });

});