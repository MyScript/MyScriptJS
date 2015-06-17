'use strict';

describe('MusicArpeggiate: output/music/musicArpeggiate.js', function () {

    describe('Default construction', function () {

        var musicArpeggiate;
        before(function (done) {
            musicArpeggiate = new MyScript.MusicArpeggiate();
            done();
        });

        it('Check initial state', function () {
            expect(musicArpeggiate).to.be.an('object');
            expect(musicArpeggiate).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicArpeggiate).to.be.an.instanceOf(MyScript.MusicArpeggiate);
        });

        it('Get type', function () {
            expect(musicArpeggiate.getType()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var musicArpeggiate;
        before(function (done) {
            musicArpeggiate = new MyScript.MusicArpeggiate({
                type: 'arpeggiate'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicArpeggiate).to.be.an('object');
            expect(musicArpeggiate).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicArpeggiate).to.be.an.instanceOf(MyScript.MusicArpeggiate);
        });

        it('Get type', function () {
            expect(musicArpeggiate.getType()).to.not.be.undefined;
        });

    });

});