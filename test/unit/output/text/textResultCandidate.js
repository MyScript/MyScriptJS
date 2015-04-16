'use strict';

describe('MyScriptJS: output/text/textResultCandidate.js', function () {

    it('TextResultCandidate object exist', function () {
        expect(MyScript.TextResultCandidate).to.exist;
        expect(MyScript.TextResultCandidate).not.to.be.null;
        expect(MyScript.TextResultCandidate).to.not.be.undefined;
    });

    var textResultCandidate = new MyScript.TextResultCandidate();
    it('TextResultCandidate constructor', function () {
        expect(textResultCandidate).to.be.an('object');
        expect(textResultCandidate).to.be.an.instanceof(MyScript.TextCandidate);
        expect(textResultCandidate).to.be.an.instanceof(MyScript.TextResultCandidate);
        expect(textResultCandidate).to.have.ownProperty('children');
        expect(textResultCandidate).to.have.ownProperty('flags');
    });

    it('TextResultCandidate Label getter', function () {
        expect(textResultCandidate.getLabel()).to.be.undefined;
    });

    it('TextResultCandidate Normalized Score getter', function () {
        expect(textResultCandidate.getNormalizedScore()).to.be.undefined;
    });

    it('TextResultCandidate Resemblance Score getter', function () {
        expect(textResultCandidate.getResemblanceScore()).to.be.undefined;
    });

    it('TextResultCandidate Spelling Distortion Ratio getter', function () {
        expect(textResultCandidate.getSpellingDistortionRatio()).to.be.undefined;
    });

    it('TextResultCandidate Children getter', function () {
        expect(textResultCandidate.getChildren()).to.be.empty;
    });

    it('TextResultCandidate Flags getter', function () {
        expect(textResultCandidate.getFlags()).to.be.empty;
    });

    var obj = {
        children: [{
            type: 'child'
        }],
        flags: [{
            type: 'flag'
        }]
    };
    var textResultCandidate2 = new MyScript.TextResultCandidate(obj);
    it('Test TextResultCandidate object construction: TextSegment construction', function () {
        expect(textResultCandidate2.getChildren()[0]).to.be.an.instanceof(MyScript.TextSegment);
    });
    it('Test TextResultCandidate object construction: flag construction', function () {
        expect(textResultCandidate2.getFlags()).to.not.be.empty;
    });
});