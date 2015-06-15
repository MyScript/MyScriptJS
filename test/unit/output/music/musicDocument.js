'use strict';

describe('MusicDocument: output/music/musicDocument.js', function () {

    describe('Default construction', function () {

        var musicDocument;
        before(function (done) {
            musicDocument = new MyScript.MusicDocument();
            done();
        });

        it('Check initial state', function () {
            expect(musicDocument).to.be.an('object');
            expect(musicDocument).to.be.an.instanceOf(MyScript.MusicDocument);
            expect(musicDocument).to.have.ownProperty('results');
            expect(musicDocument).to.have.ownProperty('scratchOutResults');
        });

        it('Result Elements getter', function () {
            expect(musicDocument.getResultElements()).to.be.empty;
        });

        it('Scratch Out Results getter', function () {
            expect(musicDocument.getScratchOutResults()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicDocument;
        before(function (done) {
            musicDocument = new MyScript.MusicDocument({
                results: [{
                    type: 'MUSICXML'
                }, {
                    root: {
                        type: 'default'
                    }
                }],
                scratchOutResults: [{
                    type: 'test'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicDocument).to.be.an('object');
            expect(musicDocument).to.be.an.instanceOf(MyScript.MusicDocument);
            expect(musicDocument).to.have.ownProperty('results');
            expect(musicDocument).to.have.ownProperty('scratchOutResults');
        });
        it('Test MusicDocument object construction: MusicXMLResultElement construction', function () {
            expect(musicDocument.getResultElements()[0]).to.be.an.instanceOf(MyScript.MusicXMLResultElement);
        });
        it('Test MusicDocument object construction: MusicScoreTreeResultElement construction', function () {
            expect(musicDocument.getResultElements()[1]).to.be.an.instanceOf(MyScript.MusicScoreTreeResultElement);
        });
        it('Test MusicDocument object construction: MathScratchOut construction', function () {
            expect(musicDocument.getScratchOutResults()[0]).to.be.an.instanceOf(MyScript.MusicScratchOut);
        });

    });

});