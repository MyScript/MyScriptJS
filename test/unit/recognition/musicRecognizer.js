'use strict';

describe('MusicRecognizer: recognition/musicRecognizer.js', function () {

    describe('Default construction', function () {

        var musicRecognizer;
        before(function (done) {
            musicRecognizer = new MyScript.MusicRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(musicRecognizer).to.be.an('object');
            expect(musicRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(musicRecognizer).to.be.an.instanceOf(MyScript.MusicRecognizer);
        });

        it('Get parameters', function () {
            expect(musicRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MusicParameter);
        });

        it('Set parameters', function () {

            var staff = new MyScript.MusicStaff();
            staff.setTop(100);
            staff.setGap(20);
            staff.setCount(5);

            var parameters = new MyScript.MusicParameter();
            parameters.setStaff(staff);
            parameters.setDivisions(480);
            parameters.setResultTypes(['MUSICXML', 'SCORETREE']);

            musicRecognizer.setParameters(parameters);
            expect(musicRecognizer.getParameters()).to.be.an.instanceOf(MyScript.MusicParameter);
        });

    });

});