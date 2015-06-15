'use strict';

describe('TextCandidate: output/text/textCandidate.js', function () {

    describe('Default construction', function () {

        var textCandidate;
        before(function (done) {
            textCandidate = new MyScript.TextCandidate();
            done();
        });

        it('Check initial state', function () {
            expect(textCandidate).to.be.an('object');
            expect(textCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textCandidate).to.have.ownProperty('flags');
        });

        it('Label getter', function () {
            expect(textCandidate.getLabel()).to.be.undefined;
        });

        it('Normalized Score getter', function () {
            expect(textCandidate.getNormalizedScore()).to.be.undefined;
        });

        it('Resemblance Score getter', function () {
            expect(textCandidate.getResemblanceScore()).to.be.undefined;
        });

        it('Spelling Distortion Ratio getter', function () {
            expect(textCandidate.getSpellingDistortionRatio()).to.be.undefined;
        });

        it('Flags getter', function () {
            expect(textCandidate.getFlags()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var textCandidate;
        before(function (done) {
            textCandidate = new MyScript.TextCandidate({
                flags: [{
                    type: 'flag'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textCandidate).to.be.an('object');
            expect(textCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textCandidate).to.have.ownProperty('flags');
        });

        it('Test TextCandidate object construction: flag construction', function () {
            expect(textCandidate.getFlags()).to.not.be.empty;
        });

    });

});