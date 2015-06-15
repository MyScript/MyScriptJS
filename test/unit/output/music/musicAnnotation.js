'use strict';

describe('MusicAnnotation: output/music/musicAnnotation.js', function () {

    describe('Default construction', function () {

        var musicAnnotation;
        before(function (done) {
            musicAnnotation = new MyScript.MusicAnnotation();
            done();
        });

        it('Check initial state', function () {
            expect(musicAnnotation).to.be.an('object');
            expect(musicAnnotation).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicAnnotation).to.be.an.instanceOf(MyScript.MusicAnnotation);
        });

        it('Label getter', function () {
            expect(musicAnnotation.getLabel()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicAnnotation;
        before(function (done) {
            musicAnnotation = new MyScript.MusicAnnotation({
                label: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicAnnotation).to.be.an('object');
            expect(musicAnnotation).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicAnnotation).to.be.an.instanceOf(MyScript.MusicAnnotation);
        });

        it('Test MusicAnnotation object construction', function () {
            expect(musicAnnotation.getLabel()).to.not.be.undefined;
        });

    });

});