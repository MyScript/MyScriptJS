'use strict';

describe('MusicBarInput: input/music/components/musicBarInput.js', function () {

    describe('Default construction', function () {

        var musicBarInput;
        before(function (done) {
            musicBarInput = new MyScript.MusicBarInput();
            done();
        });

        it('Check initial state', function () {
            expect(musicBarInput).to.be.an('object');
            expect(musicBarInput).to.be.an.instanceOf(MyScript.MusicBarInput);
        });

        it('Get repeat direction', function () {
            expect(musicBarInput.getRepeatDirection()).to.be.undefined;
        });

        it('Set repeat direction', function () {
            musicBarInput.setRepeatDirection('FORWARD');
            expect(musicBarInput.getRepeatDirection()).to.equal('FORWARD');
        });

        it('Get style', function () {
            expect(musicBarInput.getStyle()).to.be.undefined;
        });

        it('Set style', function () {
            musicBarInput.setStyle('LIGHT_LIGHT');
            expect(musicBarInput.getStyle()).to.equal('LIGHT_LIGHT');
        });

    });

});