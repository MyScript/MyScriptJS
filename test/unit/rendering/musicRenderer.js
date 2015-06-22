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

        var musicRenderer, canvas, currentContext, finalContext;
        before(function (done) {
            canvas = document.createElement('canvas');
            currentContext = canvas.getContext('2d');
            canvas.id = 'current';
            canvas.style.width = 800;
            canvas.style.height = 600;
            canvas.style.zIndex = '2';
            canvas.style.position = 'absolute';
            canvas.width = 800;
            canvas.height = 600;

            canvas = document.createElement('canvas');
            finalContext = canvas.getContext('2d');
            canvas.id = 'final';
            canvas.style.width = 800;
            canvas.style.height = 600;
            canvas.style.zIndex = '2';
            canvas.style.position = 'absolute';
            canvas.width = 800;
            canvas.height = 600;
            musicRenderer = new MyScript.MusicRenderer();
            done();
        });

        it('Clear context', function () {
            expect(function () {
                musicRenderer.clear(currentContext, finalContext);
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()], finalContext, musicRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw accidental', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw arpeggiate', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw bar', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw beam', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw clef', function () {
            var symbols = ['F', 'C', 'G'];

            function drawClef(symbol) {
                var component = new MyScript.MusicClefInputComponent();
                component.getValue().setSymbol(symbol);
                musicRenderer.drawComponents([component], finalContext);
                musicRenderer.drawComponents([component], finalContext, musicRenderer.getPenParameters());

            }

            symbols.forEach(drawClef);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw dots', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw head', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw ledger line', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw rest', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw stem', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw tie or slur', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw time signature', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()], finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw unknown music component', function () {
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'}, finalContext);
            }).to.throw(Error);
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'}, finalContext, musicRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw staff', function () {
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff(), finalContext, musicRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                musicRenderer.drawRecognitionResult([], new MyScript.MusicDocument(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                musicRenderer.drawRecognitionResult([], new MyScript.MusicDocument(), finalContext, musicRenderer.getPenParameters());
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