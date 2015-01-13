'use strict';

describe('MyScriptJS: output/text/textCandidate.js', function () {

    it('TextCandidate object exist', function () {
        expect(MyScript.TextCandidate).to.exist;
        expect(MyScript.TextCandidate).not.to.be.null;
        expect(MyScript.TextCandidate).to.not.be.undefined;
    });

    it('TextCandidate constructor', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate).to.be.an('object');
        expect(textCandidate).to.be.an.instanceof(MyScript.TextCandidate);
        expect(textCandidate).to.have.ownProperty('children');
        expect(textCandidate).to.have.ownProperty('flags');
    });

    it('TextCandidate Label getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getLabel()).to.be.undefined;
    });

    it('TextCandidate Normalized Score getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getNormalizedScore()).to.be.undefined;
    });

    it('TextCandidate Resemblance Score getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getResemblanceScore()).to.be.undefined;
    });

    it('TextCandidate Spelling Distortion Ratio getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getSpellingDistortionRatio()).to.be.undefined;
    });

    it('TextCandidate Children getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getChildren()).to.be.undefined;
    });

    it('TextCandidate Flags getter', function () {
        var textCandidate = new MyScript.TextCandidate();
        expect(textCandidate.getFlags()).to.be.undefined;
    });
});