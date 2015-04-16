'use strict';

describe('MyScriptJS: output/text/textCharCandidate.js', function () {

    it('TextCharCandidate object exist', function () {
        expect(MyScript.TextCharCandidate).to.exist;
        expect(MyScript.TextCharCandidate).not.to.be.null;
        expect(MyScript.TextCharCandidate).to.not.be.undefined;
    });

    var textCharCandidate = new MyScript.TextCharCandidate();
    it('TextCharCandidate constructor', function () {
        expect(textCharCandidate).to.be.an('object');
        expect(textCharCandidate).to.be.an.instanceof(MyScript.TextCandidate);
        expect(textCharCandidate).to.be.an.instanceof(MyScript.TextCharCandidate);
        expect(textCharCandidate).to.have.ownProperty('flags');
    });

    it('TextCharCandidate Label getter', function () {
        expect(textCharCandidate.getLabel()).to.be.undefined;
    });

    it('TextCharCandidate Normalized Score getter', function () {
        expect(textCharCandidate.getNormalizedScore()).to.be.undefined;
    });

    it('TextCharCandidate Resemblance Score getter', function () {
        expect(textCharCandidate.getResemblanceScore()).to.be.undefined;
    });

    it('TextCharCandidate Spelling Distortion Ratio getter', function () {
        expect(textCharCandidate.getSpellingDistortionRatio()).to.be.undefined;
    });

    it('TextCharCandidate Flags getter', function () {
        expect(textCharCandidate.getFlags()).to.be.empty;
    });

    var obj = {
        flags: [{
            type: 'flag'
        }]
    };
    var textCharCandidate2 = new MyScript.TextCharCandidate(obj);
    it('Test TextCharCandidate object construction: flag construction', function () {
        expect(textCharCandidate2.getFlags()).to.not.be.empty;
    });
});