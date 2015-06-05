'use strict';

describe('MusicArpeggiate: output/music/musicArpeggiate.js', function () {

    describe('Default construction', function () {

        var musicArpeggiate;
        before(function (done) {
            musicArpeggiate = new MyScript.MusicArpeggiate();
            done();
        });

        it('check initial state', function () {
            expect(musicArpeggiate).to.be.an('object');
            expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicArpeggiate);
        });

        it('Type getter', function () {
            expect(musicArpeggiate.getType()).to.be.undefined;
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

        it('check initial state', function () {
            expect(musicArpeggiate).to.be.an('object');
            expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicArpeggiate);
        });

        it('Type getter', function () {
            expect(musicArpeggiate.getType()).to.not.be.undefined;
        });

    });

});