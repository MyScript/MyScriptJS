'use strict';

describe('MyScriptJS: output/shape/shapeSegment.js', function () {

    it('ShapeSegment object exist', function () {
        expect(MyScript.ShapeSegment).to.exist;
        expect(MyScript.ShapeSegment).not.to.be.null;
        expect(MyScript.ShapeSegment).to.not.be.undefined;
    });

    it('ShapeSegment constructor', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment).to.be.an('object');
        expect(shapeSegment).to.be.an.instanceof(MyScript.ShapeSegment);
        expect(shapeSegment).to.have.ownProperty('inkRanges');
        expect(shapeSegment).to.have.ownProperty('candidates');
    });

    it('ShapeSegment Element Type getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getElementType()).to.be.undefined;
    });

    it('ShapeSegment Unique Id getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getUniqueId()).to.be.undefined;
    });

    it('ShapeSegment Ink Ranges getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getInkRanges()).to.be.undefined;
    });

    it('ShapeSegment Selected Candidate Index getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getSelectedCandidateIndex()).to.be.undefined;
    });

    it('ShapeSegment Candidates getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getCandidates()).to.be.undefined;
    });

    it('ShapeSegment Selected Candidate getter', function () {
        var shapeSegment = new MyScript.ShapeSegment();
        expect(shapeSegment.getSelectedCandidate()).to.be.undefined;
    });
});