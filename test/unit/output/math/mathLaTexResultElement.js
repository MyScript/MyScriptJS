'use strict';

describe('MathLaTexResultElement: output/math/mathLaTexResultElement.js', function () {

    describe('Default construction', function () {

        var mathLaTexResultElement;
        before(function (done) {
            mathLaTexResultElement = new MyScript.MathLaTexResultElement();
            done();
        });

        it('check initial state', function () {
            expect(mathLaTexResultElement).to.be.an('object');
            expect(mathLaTexResultElement).to.be.an.instanceof(MyScript.MathResultElement);
            expect(mathLaTexResultElement).to.be.an.instanceof(MyScript.MathLaTexResultElement);
        });

        it('Value getter', function () {
            expect(mathLaTexResultElement.getValue()).to.be.undefined;
        });

    });

});