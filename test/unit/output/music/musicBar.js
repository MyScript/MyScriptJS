'use strict';

describe('MusicBar: output/music/musicBar.js', function () {

    describe('Default construction', function () {

        var musicBar;
        before(function (done) {
            musicBar = new MyScript.MusicBar();
            done();
        });

        it('check initial state', function () {
            expect(musicBar).to.be.an('object');
            expect(musicBar).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicBar).to.be.an.instanceof(MyScript.MusicBar);
            expect(musicBar).to.have.ownProperty('decorations');
        });

        it('Repeat Direction getter', function () {
            expect(musicBar.getRepeatDirection()).to.be.undefined;
        });

        it('Style getter', function () {
            expect(musicBar.getStyle()).to.be.undefined;
        });

        it('Decorations getter', function () {
            expect(musicBar.getDecorations()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicBar;
        before(function (done) {
            musicBar = new MyScript.MusicBar({
                decorations: [{
                    type: 'decoration'
                }]
            });
            done();
        });

        it('check initial state', function () {
            expect(musicBar).to.be.an('object');
            expect(musicBar).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicBar).to.be.an.instanceof(MyScript.MusicBar);
            expect(musicBar).to.have.ownProperty('decorations');
        });

        it('Test MusicBar object construction: MusicDecoration construction', function () {
            expect(musicBar.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
        });

    });

});