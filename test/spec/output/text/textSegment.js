'use strict';

describe('MyScriptJS: output/text/textSegment.js', function () {

    var expect = require('chai').expect;

    it('TextSegment object exist', function () {
        expect(MyScript.TextSegment).to.exist;
        expect(MyScript.TextSegment).not.to.be.null;
        expect(MyScript.TextSegment).to.not.be.undefined;
    });

    it('TextSegment constructor', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment).to.be.an('object');
        expect(textSegment).to.be.an.instanceof(MyScript.TextSegment);
        expect(textSegment).to.have.ownProperty('candidates');
    });

    it('TextSegment Candidates getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getCandidates()).to.be.empty;
    });

    it('TextSegment Ink Ranges getter', function () {
        var textSegment = new MyScript.TextSegment();
        expect(textSegment.getInkRanges()).to.be.undefined;
    });
});