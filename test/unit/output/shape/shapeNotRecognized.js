'use strict';

describe('ShapeNotRecognized: output/shape/shapeNotRecognized.js', function () {

    describe('Default construction', function () {

        var shapeNotRecognized;
        before(function (done) {
            shapeNotRecognized = new MyScript.ShapeNotRecognized();
            done();
        });

        it('Check initial state', function () {
            expect(shapeNotRecognized).to.be.an('object');
            expect(shapeNotRecognized).to.be.an.instanceOf(MyScript.ShapeCandidate);
            expect(shapeNotRecognized).to.be.an.instanceOf(MyScript.ShapeNotRecognized);
        });

    });

});