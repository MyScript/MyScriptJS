'use strict';

describe('MyScriptJS: output/shape/shapeCandidate.js', function () {

    var expect = require('chai').expect;

    it('ShapeCandidate object exist', function () {
        expect(MyScript.ShapeCandidate).to.exist;
        expect(MyScript.ShapeCandidate).not.to.be.null;
        expect(MyScript.ShapeCandidate).to.not.be.undefined;
    });

    it('ShapeCandidate constructor', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate).to.be.an('object');
        expect(shapeCandidate).to.be.an.instanceof(MyScript.ShapeCandidate);
    });

    it('ShapeCandidate Type getter', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate.getType()).to.be.undefined;
    });

    it('ShapeCandidate Is Erased', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate.isErased()).to.be.false;
    });

    it('ShapeCandidate Is Scratch Out', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate.isScratchOut()).to.be.false;
    });

    it('ShapeCandidate Is Not Recognized', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate.isNotRecognized()).to.be.false;
    });

    it('ShapeCandidate Is Recognized', function () {
        var shapeCandidate = new MyScript.ShapeCandidate();
        expect(shapeCandidate.isRecognized()).to.be.false;
    });

});