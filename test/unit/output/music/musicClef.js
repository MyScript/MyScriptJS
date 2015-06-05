'use strict';

describe('MusicClef: output/music/musicClef.js', function () {

    describe('Default construction', function () {

        var musicClef;
        before(function (done) {
            musicClef = new MyScript.MusicClef();
            done();
        });

        it('check initial state', function () {
            expect(musicClef).to.be.an('object');
            expect(musicClef).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicClef).to.be.an.instanceof(MyScript.MusicClef);
        });

        it('Line getter', function () {
            expect(musicClef.getLine()).to.be.undefined;
        });

        it('Octave getter', function () {
            expect(musicClef.getOctave()).to.be.undefined;
        });

        it('Symbol getter', function () {
            expect(musicClef.getSymbol()).to.be.undefined;
        });

    });

});