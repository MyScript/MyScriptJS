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

        it('Get label', function () {
            expect(textCandidate.getLabel()).to.equal(undefined);
        });

        it('Get normalized score', function () {
            expect(textCandidate.getNormalizedScore()).to.equal(undefined);
        });

        it('Get resemblance score', function () {
            expect(textCandidate.getResemblanceScore()).to.equal(undefined);
        });

        it('Get spelling distortion ratio', function () {
            expect(textCandidate.getSpellingDistortionRatio()).to.equal(undefined);
        });

        it('Get flags', function () {
            expect(textCandidate.getFlags().length).to.equal(0);
        });

        it('Get children', function () {
            expect(textCandidate.getChildren().length).to.equal(0);
        });

    });

    describe('JSON construction', function () {

        var textCandidate;
        before(function (done) {
            textCandidate = new MyScript.TextCandidate({
                flags: [{
                    type: 'flag'
                }],
                children: [{
                    type: 'child'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(textCandidate).to.be.an('object');
            expect(textCandidate).to.be.an.instanceOf(MyScript.TextCandidate);
            expect(textCandidate).to.have.ownProperty('flags');
        });

        it('Get flags', function () {
            expect(textCandidate.getFlags().length).to.equal(1);
        });

        it('Get children', function () {
            expect(textCandidate.getChildren().length).to.equal(1);
            expect(textCandidate.getChildren()[0]).to.be.an.instanceOf(MyScript.TextSegment);
        });

    });

});