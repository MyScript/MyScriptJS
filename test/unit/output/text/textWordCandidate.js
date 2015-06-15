'use strict';

describe('TextWordCandidate: output/text/textWordCandidate.js', function () {

    describe('Default construction', function () {

        var textWordCandidate;
        before(function (done) {
            textWordCandidate = new MyScript.TextWordCandidate();
            done();
        });

        it('Check initial state', function () {
            expect(textWordCandidate).to.be.an('object');
            expect(textWordCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textWordCandidate).to.be.an.instanceOf(MyScript.TextWordCandidate);
            expect(textWordCandidate).to.have.ownProperty('children');
            expect(textWordCandidate).to.have.ownProperty('flags');
        });

        it('Label getter', function () {
            expect(textWordCandidate.getLabel()).to.be.undefined;
        });

        it('Normalized Score getter', function () {
            expect(textWordCandidate.getNormalizedScore()).to.be.undefined;
        });

        it('Resemblance Score getter', function () {
            expect(textWordCandidate.getResemblanceScore()).to.be.undefined;
        });

        it('Spelling Distortion Ratio getter', function () {
            expect(textWordCandidate.getSpellingDistortionRatio()).to.be.undefined;
        });

        it('Children getter', function () {
            expect(textWordCandidate.getChildren()).to.be.empty;
        });

        it('Flags getter', function () {
            expect(textWordCandidate.getFlags()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var textWordCandidate;
        before(function (done) {
            textWordCandidate = new MyScript.TextWordCandidate({
                children: [{
                    type: 'child'
                }],
                flags: [{
                    type: 'flag'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textWordCandidate).to.be.an('object');
            expect(textWordCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textWordCandidate).to.be.an.instanceOf(MyScript.TextWordCandidate);
            expect(textWordCandidate).to.have.ownProperty('children');
            expect(textWordCandidate).to.have.ownProperty('flags');
        });

        it('Test TextWordCandidate object construction: TextSegment construction', function () {
            expect(textWordCandidate.getChildren()[0]).to.be.an.instanceOf(MyScript.TextSegment);
        });

        it('Test TextWordCandidate object construction: flag construction', function () {
            expect(textWordCandidate.getFlags()).to.not.be.empty;
        });

    });

});