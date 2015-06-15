'use strict';

describe('MusicRenderer: rendering/musicRenderer.js', function () {

    describe('Default construction', function () {

        var musicRenderer;
        before(function (done) {
            musicRenderer = new MyScript.MusicRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(musicRenderer).to.be.an('object');
            expect(musicRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(musicRenderer).to.be.an.instanceOf(MyScript.MusicRenderer);
        });

    });

    describe('Workflow', function () {

        var musicRenderer, context;
        before(function (done) {
            context = document.createElement('canvas').getContext('2d');
            musicRenderer = new MyScript.MusicRenderer();
            done();
        });

        it('Clear context', function () {
            expect(function () {
                musicRenderer.clear(context);
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()], context);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()], context, musicRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw accidental', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw arpeggiate', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw bar', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw beam', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw clef', function () {
            var symbols = ['F', 'C', 'G'];

            function drawClef(symbol) {
                var component = new MyScript.MusicClefInputComponent();
                component.getValue().setSymbol(symbol);
                musicRenderer.drawComponents([component], context);
                musicRenderer.drawComponents([component], context, musicRenderer.getParameters());

            }

            symbols.forEach(drawClef);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw dots', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw head', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw ledger line', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw rest', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw stem', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw tie or slur', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw time signature', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown music component', function () {
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'}, context);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'}, context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw staff', function () {
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff(), context);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff(), context, musicRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                musicRenderer.drawRecognitionResult([], new MyScript.MusicDocument(), context);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawRecognitionResult([], new MyScript.MusicDocument(), context, musicRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Remove scratch out', function () {
            var stroke1 = new MyScript.Stroke({
                x: [354, 355],
                y: [165, 165]
            });
            var stroke2 = new MyScript.Stroke({
                x: [371, 372, 373, 376],
                y: [114, 113, 112, 111]
            });
            var scratchOutResults = [new MyScript.MusicScratchOut({
                erasedInputRanges: [{
                    component: 0,
                    firstItem: 0,
                    lastItem: 2
                }], inputRanges: [{component: 1, firstItem: 0, lastItem: 4}]
            })];
            expect(musicRenderer.removeScratchOut([stroke1, stroke2], scratchOutResults).length).to.equal(0);
        });

    });

});