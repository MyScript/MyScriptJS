'use strict';

describe('MyScriptJS: output/shape/shapeRecognized.js', function () {

    it('ShapeRecognized object exist', function () {
        expect(MyScript.ShapeRecognized).to.exist;
        expect(MyScript.ShapeRecognized).not.to.be.null;
        expect(MyScript.ShapeRecognized).to.not.be.undefined;
    });

    var shapeRecognized = new MyScript.ShapeRecognized();
    it('ShapeRecognized constructor', function () {
        expect(shapeRecognized).to.be.an('object');
        expect(shapeRecognized).to.be.an.instanceof(MyScript.ShapeCandidate);
        expect(shapeRecognized).to.be.an.instanceof(MyScript.ShapeRecognized);
        expect(shapeRecognized).to.have.ownProperty('primitives');
    });

    it('ShapeRecognized Primitives getter', function () {
        expect(shapeRecognized.getPrimitives()).to.be.empty;
    });

    it('ShapeRecognized Label getter', function () {
        expect(shapeRecognized.getLabel()).to.be.undefined;
    });

    it('ShapeRecognized Normalized Recognition Score getter', function () {
        expect(shapeRecognized.getNormalizedRecognitionScore()).to.be.undefined;
    });

    it('ShapeRecognized Resemblance Score getter', function () {
        expect(shapeRecognized.getResemblanceScore()).to.be.undefined;
    });

    var obj = {
        primitives: [{
            type: 'line'
        },{
            type: 'ellipse'
        }]
    };
    var shapeRecognized2 = new MyScript.ShapeRecognized(obj);
    it('Test ShapeRecognized object construction: ShapeLine construction', function () {
        expect(shapeRecognized2.getPrimitives()[0]).to.be.an.instanceof(MyScript.ShapeLine);
    });
    it('Test ShapeRecognized object construction: ShapeEllipse construction', function () {
        expect(shapeRecognized2.getPrimitives()[1]).to.be.an.instanceof(MyScript.ShapeEllipse);
    });

});