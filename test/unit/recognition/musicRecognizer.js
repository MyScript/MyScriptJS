'use strict';

describe('MusicRecognizer: recognition/musicRecognizer.js', function () {

    describe('Default construction', function () {

        var musicRecognizer;
        before(function (done) {
            musicRecognizer = new MyScript.MusicRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(musicRecognizer).to.be.an('object');
            expect(musicRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(musicRecognizer).to.be.an.instanceof(MyScript.MusicRecognizer);
        });

    });

    describe('Accessors', function () {

        var musicRecognizer, parameters;
        before(function (done) {
            musicRecognizer = new MyScript.MusicRecognizer();

            var staff = new MyScript.MusicStaff();
            staff.setTop(100);
            staff.setGap(20);
            staff.setCount(5);

            parameters = new MyScript.MusicParameter();
            parameters.setStaff(staff);
            parameters.setDivisions(480);
            parameters.setResultTypes(['MUSICXML', 'SCORETREE']);
            done();
        });

        it('Get parameters', function () {
            expect(musicRecognizer.getParameters()).to.be.an.instanceof(MyScript.MusicParameter);
        });

        it('Set parameters', function () {
            musicRecognizer.setParameters(parameters);
            expect(musicRecognizer.getParameters()).to.be.an.instanceof(MyScript.MusicParameter);
        });

    });

});