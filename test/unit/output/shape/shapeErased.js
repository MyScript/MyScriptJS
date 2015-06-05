'use strict';

describe('ShapeErased: output/shape/shapeErased.js', function () {

    describe('Default construction', function () {

        var shapeErased;
        before(function (done) {
            shapeErased = new MyScript.ShapeErased();
            done();
        });

        it('check initial state', function () {
            expect(shapeErased).to.be.an('object');
            expect(shapeErased).to.be.an.instanceof(MyScript.ShapeErased);
        });

    });

});