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

        it('Get placement', function () {
            expect(musicTuplet.getPlacement()).to.equal(undefined);
        });

        it('Get number', function () {
            expect(musicTuplet.getNumber()).to.equal(undefined);
        });

        it('Get brackets', function () {
            expect(musicTuplet.getBrackets().length).to.equal(0);
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

        it('Get brackets', function () {
            expect(musicTuplet.getBrackets().length).to.equal(1);
            expect(musicTuplet.getBrackets()[0]).to.be.an.instanceOf(MyScript.MusicTupletBracket);
        });

    });

});