'use strict';

describe('TextCharCandidate: output/text/textCharCandidate.js', function () {

    describe('Default construction', function () {

        var textCharCandidate;
        before(function (done) {
            textCharCandidate = new MyScript.TextCharCandidate();
            done();
        });

        it('Check initial state', function () {
            expect(textCharCandidate).to.be.an('object');
            expect(textCharCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textCharCandidate).to.be.an.instanceOf(MyScript.TextCharCandidate);
            expect(textCharCandidate).to.have.ownProperty('flags');
        });

        it('Label getter', function () {
            expect(textCharCandidate.getLabel()).to.be.undefined;
        });

        it('Normalized Score getter', function () {
            expect(textCharCandidate.getNormalizedScore()).to.be.undefined;
        });

        it('Resemblance Score getter', function () {
            expect(textCharCandidate.getResemblanceScore()).to.be.undefined;
        });

        it('Spelling Distortion Ratio getter', function () {
            expect(textCharCandidate.getSpellingDistortionRatio()).to.be.undefined;
        });

        it('Flags getter', function () {
            expect(textCharCandidate.getFlags()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var textCharCandidate;
        before(function (done) {
            textCharCandidate = new MyScript.TextCharCandidate({
                flags: [{
                    type: 'flag'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textCharCandidate).to.be.an('object');
            expect(textCharCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textCharCandidate).to.be.an.instanceOf(MyScript.TextCharCandidate);
            expect(textCharCandidate).to.have.ownProperty('flags');
        });

        it('Test TextCharCandidate object construction: flag construction', function () {
            expect(textCharCandidate.getFlags()).to.not.be.empty;
        });

    });

});