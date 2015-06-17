'use strict';

describe('ShapeDocument: output/shape/shapeDocument.js', function () {

    describe('Default construction', function () {

        var shapeDocument;
        before(function (done) {
            shapeDocument = new MyScript.ShapeDocument();
            done();
        });

        it('Check initial state', function () {
            expect(shapeDocument).to.be.an('object');
            expect(shapeDocument).to.be.an.instanceOf(MyScript.ShapeDocument);
            expect(shapeDocument).to.have.ownProperty('segments');
        });

        it('Get segments', function () {
            expect(shapeDocument.getSegments().length).to.equal(0);
        });

    });

    describe('JSON construction', function () {

        var shapeDocument;
        before(function (done) {
            shapeDocument = new MyScript.ShapeDocument({
                segments: [{
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(shapeDocument).to.be.an('object');
            expect(shapeDocument).to.be.an.instanceOf(MyScript.ShapeDocument);
            expect(shapeDocument).to.have.ownProperty('segments');
        });

        it('Get segments', function () {
            expect(shapeDocument.getSegments().length).to.equal(1);
            expect(shapeDocument.getSegments()[0]).to.be.an.instanceOf(MyScript.ShapeSegment);
        });

    });

});