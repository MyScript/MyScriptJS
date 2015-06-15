'use strict';

describe('MusicPart: output/music/musicPart.js', function () {

    describe('Default construction', function () {

        var musicPart;
        before(function (done) {
            musicPart = new MyScript.MusicPart();
            done();
        });

        it('Check initial state', function () {
            expect(musicPart).to.be.an('object');
            expect(musicPart).to.be.an.instanceOf(MyScript.MusicPart);
            expect(musicPart).to.have.ownProperty('elements');
        });

        it('Elements getter', function () {
            expect(musicPart.getElements()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicPart;
        before(function (done) {
            musicPart = new MyScript.MusicPart({
                elements: [{
                    elementType: 'accidental'
                }, {
                    elementType: 'annotation'
                }, {
                    elementType: 'arpeggiate'
                }, {
                    elementType: 'bar'
                }, {
                    elementType: 'beam'
                }, {
                    elementType: 'chord'
                }, {
                    elementType: 'clef'
                }, {
                    elementType: 'decoration'
                }, {
                    elementType: 'dots'
                }, {
                    elementType: 'head'
                }, {
                    elementType: 'keySignature'
                }, {
                    elementType: 'ledgerLine'
                }, {
                    elementType: 'note'
                }, {
                    elementType: 'rest'
                }, {
                    elementType: 'slur'
                }, {
                    elementType: 'stem'
                }, {
                    elementType: 'tie'
                }, {
                    elementType: 'timeSignature'
                }, {
                    elementType: 'tuplet'
                }, {
                    elementType: 'tupletBracket'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicPart).to.be.an('object');
            expect(musicPart).to.be.an.instanceOf(MyScript.MusicPart);
            expect(musicPart).to.have.ownProperty('elements');
        });

        it('Test MusicPart object construction: MusicAccidental construction', function () {
            expect(musicPart.getElements()[0]).to.be.an.instanceOf(MyScript.MusicAccidental);
        });

        it('Test MusicPart object construction: MusicAnnotation construction', function () {
            expect(musicPart.getElements()[1]).to.be.an.instanceOf(MyScript.MusicAnnotation);
        });

        it('Test MusicPart object construction: MusicArpeggiate construction', function () {
            expect(musicPart.getElements()[2]).to.be.an.instanceOf(MyScript.MusicArpeggiate);
        });

        it('Test MusicPart object construction: MusicBar construction', function () {
            expect(musicPart.getElements()[3]).to.be.an.instanceOf(MyScript.MusicBar);
        });

        it('Test MusicPart object construction: MusicBeam construction', function () {
            expect(musicPart.getElements()[4]).to.be.an.instanceOf(MyScript.MusicBeam);
        });

        it('Test MusicPart object construction: MusicChord construction', function () {
            expect(musicPart.getElements()[5]).to.be.an.instanceOf(MyScript.MusicChord);
        });

        it('Test MusicPart object construction: MusicClef construction', function () {
            expect(musicPart.getElements()[6]).to.be.an.instanceOf(MyScript.MusicClef);
        });

        it('Test MusicPart object construction: MusicDecoration construction', function () {
            expect(musicPart.getElements()[7]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Test MusicPart object construction: MusicDots construction', function () {
            expect(musicPart.getElements()[8]).to.be.an.instanceOf(MyScript.MusicDots);
        });

        it('Test MusicPart object construction: MusicHead construction', function () {
            expect(musicPart.getElements()[9]).to.be.an.instanceOf(MyScript.MusicHead);
        });

        it('Test MusicPart object construction: MusicKeySignature construction', function () {
            expect(musicPart.getElements()[10]).to.be.an.instanceOf(MyScript.MusicKeySignature);
        });

        it('Test MusicPart object construction: MusicLedgerLine construction', function () {
            expect(musicPart.getElements()[11]).to.be.an.instanceOf(MyScript.MusicLedgerLine);
        });

        it('Test MusicPart object construction: MusicNote construction', function () {
            expect(musicPart.getElements()[12]).to.be.an.instanceOf(MyScript.MusicNote);
        });

        it('Test MusicPart object construction: MusicRest construction', function () {
            expect(musicPart.getElements()[13]).to.be.an.instanceOf(MyScript.MusicRest);
        });

        it('Test MusicPart object construction: MusicSlur construction', function () {
            expect(musicPart.getElements()[14]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Test MusicPart object construction: MusicStem construction', function () {
            expect(musicPart.getElements()[15]).to.be.an.instanceOf(MyScript.MusicStem);
        });

        it('Test MusicPart object construction: MusicTie construction', function () {
            expect(musicPart.getElements()[16]).to.be.an.instanceOf(MyScript.MusicTie);
        });

        it('Test MusicPart object construction: MusicTimeSignature construction', function () {
            expect(musicPart.getElements()[17]).to.be.an.instanceOf(MyScript.MusicTimeSignature);
        });

        it('Test MusicPart object construction: MusicTuplet construction', function () {
            expect(musicPart.getElements()[18]).to.be.an.instanceOf(MyScript.MusicTuplet);
        });

        it('Test MusicPart object construction: MusicTupletBracket construction', function () {
            expect(musicPart.getElements()[19]).to.be.an.instanceOf(MyScript.MusicTupletBracket);
        });

        it('Test MusicPart object construction: wrong elementType', function () {
            var data = {
                elements: [{
                    type: 'accidental'
                }]
            };
            expect(function () {
                new MyScript.MusicPart(data);
            }).to.throw(Error);
        });

    });

});