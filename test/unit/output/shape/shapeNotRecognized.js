'use strict';

describe('ShapeNotRecognized: output/shape/shapeNotRecognized.js', function () {

    describe('Default construction', function () {

        var shapeNotRecognized;
        before(function (done) {
            shapeNotRecognized = new MyScript.ShapeNotRecognized();
            done();
        });

        it('check initial state', function () {
            expect(shapeNotRecognized).to.be.an('object');
            expect(shapeNotRecognized).to.be.an.instanceof(MyScript.ShapeCandidate);
            expect(shapeNotRecognized).to.be.an.instanceof(MyScript.ShapeNotRecognized);
        });

    });

});