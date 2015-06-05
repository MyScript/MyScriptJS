'use strict';

describe('MusicBarInput: input/music/components/musicBarInput.js', function () {

    describe('Default construction', function () {

        var musicBarInput;
        before(function (done) {
            musicBarInput = new MyScript.MusicBarInput();
            done();
        });

        it('check initial state', function () {
            expect(musicBarInput).to.be.an('object');
            expect(musicBarInput).to.be.an.instanceof(MyScript.MusicBarInput);
        });

    });

    describe('Accessors', function () {

        var musicBarInput;
        beforeEach(function (done) {
            musicBarInput = new MyScript.MusicBarInput();
            done();
        });

        it('MusicBarInput Repeat Direction getter', function () {
            expect(musicBarInput.getRepeatDirection()).to.be.undefined;
        });

        it('MusicBarInput Repeat Direction setter', function () {
            expect(musicBarInput.getRepeatDirection()).to.be.undefined;
            musicBarInput.setRepeatDirection('FORWARD');
            expect(musicBarInput.getRepeatDirection()).to.equal('FORWARD');
        });

        it('MusicBarInput Style getter', function () {
            expect(musicBarInput.getStyle()).to.be.undefined;
        });

        it('MusicBarInput Style setter', function () {
            expect(musicBarInput.getStyle()).to.be.undefined;
            musicBarInput.setStyle('LIGHT_LIGHT');
            expect(musicBarInput.getStyle()).to.equal('LIGHT_LIGHT');
        });

    });

});