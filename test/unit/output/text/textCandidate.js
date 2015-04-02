'use strict';

describe('MyScriptJS: output/text/textCandidate.js', function () {

    it('TextCandidate object exist', function () {
        expect(MyScript.TextCandidate).to.exist;
        expect(MyScript.TextCandidate).not.to.be.null;
        expect(MyScript.TextCandidate).to.not.be.undefined;
    });

    var textCandidate = new MyScript.TextCandidate();
    it('TextCandidate constructor', function () {
        expect(textCandidate).to.be.an('object');
        expect(textCandidate).to.be.an.instanceof(MyScript.TextCandidate);
        expect(textCandidate).to.have.ownProperty('children');
        expect(textCandidate).to.have.ownProperty('flags');
    });

    it('TextCandidate Label getter', function () {
        expect(textCandidate.getLabel()).to.be.undefined;
    });

    it('TextCandidate Normalized Score getter', function () {
        expect(textCandidate.getNormalizedScore()).to.be.undefined;
    });

    it('TextCandidate Resemblance Score getter', function () {
        expect(textCandidate.getResemblanceScore()).to.be.undefined;
    });

    it('TextCandidate Spelling Distortion Ratio getter', function () {
        expect(textCandidate.getSpellingDistortionRatio()).to.be.undefined;
    });

    it('TextCandidate Children getter', function () {
        expect(textCandidate.getChildren()).to.be.empty;
    });

    it('TextCandidate Flags getter', function () {
        expect(textCandidate.getFlags()).to.be.empty;
    });

    var obj = {
        children: [{
            type: 'child'
        }],
        flags: [{
            type: 'flag'
        }]
    };
    var textCandidate2 = new MyScript.TextCandidate(obj);
    it('Test TextCandidate object construction: TextSegment construction', function () {
        expect(textCandidate2.getChildren()[0]).to.be.an.instanceof(MyScript.TextSegment);
    });
    it('Test TextCandidate object construction: flag construction', function () {
        expect(textCandidate2.getFlags()).to.not.be.empty;
    });
});