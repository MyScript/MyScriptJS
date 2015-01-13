'use strict';

describe('MyScriptJS: output/shape/shapeRecognized.js', function () {

    it('ShapeRecognized object exist', function () {
        expect(MyScript.ShapeRecognized).to.exist;
        expect(MyScript.ShapeRecognized).not.to.be.null;
        expect(MyScript.ShapeRecognized).to.not.be.undefined;
    });

    it('ShapeRecognized constructor', function () {
        var shapeRecognized = new MyScript.ShapeRecognized();
        expect(shapeRecognized).to.be.an('object');
        expect(shapeRecognized).to.be.an.instanceof(MyScript.ShapeCandidate);
        expect(shapeRecognized).to.be.an.instanceof(MyScript.ShapeRecognized);
        expect(shapeRecognized).to.have.ownProperty('primitives');
    });

    it('ShapeRecognized Primitives getter', function () {
        var shapeRecognized = new MyScript.ShapeRecognized();
        expect(shapeRecognized.getPrimitives()).to.be.undefined;
    });

    it('ShapeRecognized Label getter', function () {
        var shapeRecognized = new MyScript.ShapeRecognized();
        expect(shapeRecognized.getLabel()).to.be.undefined;
    });

    it('ShapeRecognized Normalized Recognition Score getter', function () {
        var shapeRecognized = new MyScript.ShapeRecognized();
        expect(shapeRecognized.getNormalizedRecognitionScore()).to.be.undefined;
    });

    it('ShapeRecognized Resemblance Score getter', function () {
        var shapeRecognized = new MyScript.ShapeRecognized();
        expect(shapeRecognized.getResemblanceScore()).to.be.undefined;
    });

});