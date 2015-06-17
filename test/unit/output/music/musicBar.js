'use strict';

describe('MusicBar: output/music/musicBar.js', function () {

    describe('Default construction', function () {

        var musicBar;
        before(function (done) {
            musicBar = new MyScript.MusicBar();
            done();
        });

        it('Check initial state', function () {
            expect(musicBar).to.be.an('object');
            expect(musicBar).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicBar).to.be.an.instanceOf(MyScript.MusicBar);
            expect(musicBar).to.have.ownProperty('decorations');
        });

        it('Get repeat direction', function () {
            expect(musicBar.getRepeatDirection()).to.equal(undefined);
        });

        it('Set repeat direction', function () {
            musicBar.setRepeatDirection('LEFT');
            expect(musicBar.getRepeatDirection()).to.equal('LEFT');
        });

        it('Get style', function () {
            expect(musicBar.getStyle()).to.equal(undefined);
        });

        it('Set style', function () {
            musicBar.setStyle('BLACK');
            expect(musicBar.getStyle()).to.equal('BLACK');
        });

        it('Get decorations', function () {
            expect(musicBar.getDecorations().length).to.equal(0);
        });

        it('Set decorations', function () {
            musicBar.setDecorations([new MyScript.MusicDecoration()]);
            expect(musicBar.getDecorations().length).to.equal(1);
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

        it('Check initial state', function () {
            expect(musicBar).to.be.an('object');
            expect(musicBar).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicBar).to.be.an.instanceOf(MyScript.MusicBar);
            expect(musicBar).to.have.ownProperty('decorations');
        });

        it('Get decorations', function () {
            expect(musicBar.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

    });

});