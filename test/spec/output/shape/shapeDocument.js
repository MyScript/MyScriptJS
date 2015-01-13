'use strict';

describe('MyScriptJS: output/shape/shapeDocument.js', function () {

    it('ShapeDocument object exist', function () {
        expect(MyScript.ShapeDocument).to.exist;
        expect(MyScript.ShapeDocument).not.to.be.null;
        expect(MyScript.ShapeDocument).to.not.be.undefined;
    });

    it('ShapeDocument constructor', function () {
        var shapeDocument = new ShapeDocument.MusicDocument();
        expect(shapeDocument).to.be.an('object');
        expect(shapeDocument).to.be.an.instanceof(MyScript.ShapeDocument);
        expect(shapeDocument).to.have.ownProperty('segments');
    });

    it('ShapeDocument Segments getter', function () {
        var shapeDocument = new ShapeDocument.MusicDocument();
        expect(shapeDocument.getSegments()).to.be.undefined;
    });

});