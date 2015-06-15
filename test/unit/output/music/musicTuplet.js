'use strict';

describe('MusicTuplet: output/music/musicTuplet.js', function () {

    describe('Default construction', function () {

        var musicTuplet;
        before(function (done) {
            musicTuplet = new MyScript.MusicTuplet();
            done();
        });

        it('Check initial state', function () {
            expect(musicTuplet).to.be.an('object');
            expect(musicTuplet).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicTuplet).to.be.an.instanceOf(MyScript.MusicTuplet);
            expect(musicTuplet).to.have.ownProperty('brackets');
        });

        it('Placement getter', function () {
            expect(musicTuplet.getPlacement()).to.be.undefined;
        });

        it('Number getter', function () {
            expect(musicTuplet.getNumber()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicTuplet;
        before(function (done) {
            musicTuplet = new MyScript.MusicTuplet({
                brackets: [{
                    type: 'bracket'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicTuplet).to.be.an('object');
            expect(musicTuplet).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicTuplet).to.be.an.instanceOf(MyScript.MusicTuplet);
            expect(musicTuplet).to.have.ownProperty('brackets');
        });

        it('Test MusicTuplet object construction: MusicTupletBracket construction', function () {
            expect(musicTuplet.getBrackets()[0]).to.be.an.instanceOf(MyScript.MusicTupletBracket);
        });

    });

});