'use strict';

describe('ShapeDocument: output/shape/shapeDocument.js', function () {

    describe('Default construction', function () {

        var shapeDocument;
        before(function (done) {
            shapeDocument = new MyScript.ShapeDocument();
            done();
        });

        it('check initial state', function () {
            expect(shapeDocument).to.be.an('object');
            expect(shapeDocument).to.be.an.instanceof(MyScript.ShapeDocument);
            expect(shapeDocument).to.have.ownProperty('segments');
        });

        it('Get segments', function () {
            expect(shapeDocument.getSegments()).to.be.empty;
        });

    });

});