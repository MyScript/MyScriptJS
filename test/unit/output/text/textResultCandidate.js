'use strict';

describe('TextResultCandidate: output/text/textResultCandidate.js', function () {

    describe('Default construction', function () {

        var textResultCandidate;
        before(function (done) {
            textResultCandidate = new MyScript.TextResultCandidate();
            done();
        });

        it('check initial state', function () {
            expect(textResultCandidate).to.be.an('object');
            expect(textResultCandidate).to.be.an.instanceof(MyScript.TextCandidate);
            expect(textResultCandidate).to.be.an.instanceof(MyScript.TextResultCandidate);
            expect(textResultCandidate).to.have.ownProperty('children');
            expect(textResultCandidate).to.have.ownProperty('flags');
        });

        it('Label getter', function () {
            expect(textResultCandidate.getLabel()).to.be.undefined;
        });

        it('Normalized Score getter', function () {
            expect(textResultCandidate.getNormalizedScore()).to.be.undefined;
        });

        it('Resemblance Score getter', function () {
            expect(textResultCandidate.getResemblanceScore()).to.be.undefined;
        });

        it('Spelling Distortion Ratio getter', function () {
            expect(textResultCandidate.getSpellingDistortionRatio()).to.be.undefined;
        });

        it('Children getter', function () {
            expect(textResultCandidate.getChildren()).to.be.empty;
        });

        it('Flags getter', function () {
            expect(textResultCandidate.getFlags()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var textResultCandidate;
        before(function (done) {
            textResultCandidate = new MyScript.TextResultCandidate({
                children: [{
                    type: 'child'
                }],
                flags: [{
                    type: 'flag'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(textResultCandidate).to.be.an('object');
            expect(textResultCandidate).to.be.an.instanceof(MyScript.TextCandidate);
            expect(textResultCandidate).to.be.an.instanceof(MyScript.TextResultCandidate);
            expect(textResultCandidate).to.have.ownProperty('children');
            expect(textResultCandidate).to.have.ownProperty('flags');
        });

        it('Test TextResultCandidate object construction: TextSegment construction', function () {
            expect(textResultCandidate.getChildren()[0]).to.be.an.instanceof(MyScript.TextSegment);
        });

        it('Test TextResultCandidate object construction: flag construction', function () {
            expect(textResultCandidate.getFlags()).to.not.be.empty;
        });

    });

});