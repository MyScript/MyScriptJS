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

        it('Get result elements', function () {
            expect(musicDocument.getResultElements().length).to.equal(0);
        });

        it('Get scratch-out results', function () {
            expect(musicDocument.getScratchOutResults().length).to.equal(0);
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
        it('Get MusicXML result element', function () {
            expect(musicDocument.getResultElements()[0]).to.be.an.instanceOf(MyScript.MusicXMLResultElement);
        });
        it('Get score tree result element', function () {
            expect(musicDocument.getResultElements()[1]).to.be.an.instanceOf(MyScript.MusicScoreTreeResultElement);
        });
        it('Get scratch-out results', function () {
            expect(musicDocument.getScratchOutResults()[0]).to.be.an.instanceOf(MyScript.MusicScratchOut);
        });

    });

});