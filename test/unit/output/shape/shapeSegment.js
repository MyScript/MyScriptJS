'use strict';

describe('MyScriptJS: output/shape/shapeSegment.js', function () {

    it('ShapeSegment object exist', function () {
        expect(MyScript.ShapeSegment).to.exist;
        expect(MyScript.ShapeSegment).not.to.be.null;
        expect(MyScript.ShapeSegment).to.not.be.undefined;
    });

    var shapeSegment = new MyScript.ShapeSegment();
    it('ShapeSegment constructor', function () {
        expect(shapeSegment).to.be.an('object');
        expect(shapeSegment).to.be.an.instanceof(MyScript.ShapeSegment);
        expect(shapeSegment).to.have.ownProperty('inkRanges');
        expect(shapeSegment).to.have.ownProperty('candidates');
    });

    it('ShapeSegment Element Type getter', function () {
        expect(shapeSegment.getElementType()).to.be.undefined;
    });

    it('ShapeSegment Unique Id getter', function () {
        expect(shapeSegment.getUniqueId()).to.be.undefined;
    });

    it('ShapeSegment Ink Ranges getter', function () {
        expect(shapeSegment.getInkRanges()).to.be.empty;
    });

    it('ShapeSegment Selected Candidate Index getter', function () {
        expect(shapeSegment.getSelectedCandidateIndex()).to.be.undefined;
    });

    it('ShapeSegment Candidates getter', function () {
        expect(shapeSegment.getCandidates()).to.be.empty;
    });

    it('ShapeSegment Selected Candidate getter', function () {
        expect(shapeSegment.getSelectedCandidate()).to.be.undefined;
    });

    var obj = {
        candidates: [{
            type: 'erased'
        },{
            type: 'scratchOut'
        },{
            type: 'recognizedShape'
        },{
            type: 'default'
        }]
    };
    var shapeSegment2 = new MyScript.ShapeSegment(obj);
    it('Test ShapeSegment object construction: ShapeErased construction', function () {
        expect(shapeSegment2.getCandidates()[0]).to.be.an.instanceof(MyScript.ShapeErased);
    });
    it('Test ShapeSegment object construction: ShapeScratchOut construction', function () {
        expect(shapeSegment2.getCandidates()[1]).to.be.an.instanceof(MyScript.ShapeScratchOut);
    });
    it('Test ShapeSegment object construction: ShapeRecognized construction', function () {
        expect(shapeSegment2.getCandidates()[2]).to.be.an.instanceof(MyScript.ShapeRecognized);
    });
    it('Test ShapeSegment object construction: ShapeNotRecognized construction', function () {
        expect(shapeSegment2.getCandidates()[3]).to.be.an.instanceof(MyScript.ShapeNotRecognized);
    });
});