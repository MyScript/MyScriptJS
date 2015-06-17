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

        it('Get label', function () {
            expect(musicAnnotation.getLabel()).to.equal(undefined);
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

        it('Get label', function () {
            expect(musicAnnotation.getLabel()).to.not.be.undefined;
        });

    });

});