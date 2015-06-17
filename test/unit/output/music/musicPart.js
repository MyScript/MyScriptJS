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

        it('Get elements', function () {
            expect(musicPart.getElements().length).to.equal(0);
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

        it('Get elements', function () {
            expect(musicPart.getElements().length).to.equal(20);
        });

        it('Get accidental element', function () {
            expect(musicPart.getElements()[0]).to.be.an.instanceOf(MyScript.MusicAccidental);
        });

        it('Get annotation element', function () {
            expect(musicPart.getElements()[1]).to.be.an.instanceOf(MyScript.MusicAnnotation);
        });

        it('Get arpeggiate element', function () {
            expect(musicPart.getElements()[2]).to.be.an.instanceOf(MyScript.MusicArpeggiate);
        });

        it('Get bar element', function () {
            expect(musicPart.getElements()[3]).to.be.an.instanceOf(MyScript.MusicBar);
        });

        it('Get beam element', function () {
            expect(musicPart.getElements()[4]).to.be.an.instanceOf(MyScript.MusicBeam);
        });

        it('Get chord element', function () {
            expect(musicPart.getElements()[5]).to.be.an.instanceOf(MyScript.MusicChord);
        });

        it('Get clef element', function () {
            expect(musicPart.getElements()[6]).to.be.an.instanceOf(MyScript.MusicClef);
        });

        it('Get decoration element', function () {
            expect(musicPart.getElements()[7]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Get dots element', function () {
            expect(musicPart.getElements()[8]).to.be.an.instanceOf(MyScript.MusicDots);
        });

        it('Get head element', function () {
            expect(musicPart.getElements()[9]).to.be.an.instanceOf(MyScript.MusicHead);
        });

        it('Get key signature element', function () {
            expect(musicPart.getElements()[10]).to.be.an.instanceOf(MyScript.MusicKeySignature);
        });

        it('Get ledger line element', function () {
            expect(musicPart.getElements()[11]).to.be.an.instanceOf(MyScript.MusicLedgerLine);
        });

        it('Get note element', function () {
            expect(musicPart.getElements()[12]).to.be.an.instanceOf(MyScript.MusicNote);
        });

        it('Get rest element', function () {
            expect(musicPart.getElements()[13]).to.be.an.instanceOf(MyScript.MusicRest);
        });

        it('Get slur element', function () {
            expect(musicPart.getElements()[14]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Get stem element', function () {
            expect(musicPart.getElements()[15]).to.be.an.instanceOf(MyScript.MusicStem);
        });

        it('Get tie element', function () {
            expect(musicPart.getElements()[16]).to.be.an.instanceOf(MyScript.MusicTie);
        });

        it('Get time signature element', function () {
            expect(musicPart.getElements()[17]).to.be.an.instanceOf(MyScript.MusicTimeSignature);
        });

        it('Get tuplet element', function () {
            expect(musicPart.getElements()[18]).to.be.an.instanceOf(MyScript.MusicTuplet);
        });

        it('Get tuplet bracket element', function () {
            expect(musicPart.getElements()[19]).to.be.an.instanceOf(MyScript.MusicTupletBracket);
        });

        it('Get unknown element', function () {
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