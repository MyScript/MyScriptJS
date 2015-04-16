'use strict';

describe('MyScriptJS: output/text/textWordCandidate.js', function () {

    it('TextWordCandidate object exist', function () {
        expect(MyScript.TextWordCandidate).to.exist;
        expect(MyScript.TextWordCandidate).not.to.be.null;
        expect(MyScript.TextWordCandidate).to.not.be.undefined;
    });

    var textWordCandidate = new MyScript.TextWordCandidate();
    it('TextWordCandidate constructor', function () {
        expect(textWordCandidate).to.be.an('object');
        expect(textWordCandidate).to.be.an.instanceof(MyScript.TextCandidate);
        expect(textWordCandidate).to.be.an.instanceof(MyScript.TextWordCandidate);
        expect(textWordCandidate).to.have.ownProperty('children');
        expect(textWordCandidate).to.have.ownProperty('flags');
    });

    it('TextWordCandidate Label getter', function () {
        expect(textWordCandidate.getLabel()).to.be.undefined;
    });

    it('TextWordCandidate Normalized Score getter', function () {
        expect(textWordCandidate.getNormalizedScore()).to.be.undefined;
    });

    it('TextWordCandidate Resemblance Score getter', function () {
        expect(textWordCandidate.getResemblanceScore()).to.be.undefined;
    });

    it('TextWordCandidate Spelling Distortion Ratio getter', function () {
        expect(textWordCandidate.getSpellingDistortionRatio()).to.be.undefined;
    });

    it('TextWordCandidate Children getter', function () {
        expect(textWordCandidate.getChildren()).to.be.empty;
    });

    it('TextWordCandidate Flags getter', function () {
        expect(textWordCandidate.getFlags()).to.be.empty;
    });

    var obj = {
        children: [{
            type: 'child'
        }],
        flags: [{
            type: 'flag'
        }]
    };
    var textWordCandidate2 = new MyScript.TextWordCandidate(obj);
    it('Test TextWordCandidate object construction: TextSegment construction', function () {
        expect(textWordCandidate2.getChildren()[0]).to.be.an.instanceof(MyScript.TextSegment);
    });
    it('Test TextWordCandidate object construction: flag construction', function () {
        expect(textWordCandidate2.getFlags()).to.not.be.empty;
    });
});