'use strict';

describe('MusicRenderer: rendering/musicRenderer.js', function () {

    describe('Default construction', function () {

        var musicRenderer;
        before(function (done) {
            var canvas = document.createElement('canvas');
            musicRenderer = new MyScript.MusicRenderer(canvas.getContext('2d'));
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
            var canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            musicRenderer = new MyScript.MusicRenderer(context);
            done();
        });

        it('Clear context', function () {
            expect(function () {
                musicRenderer.clear();
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()]);
            }).to.not.throw(Error);
        });

        it('Draw stroke (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.Stroke()], context, musicRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}]);
            }).to.throw(Error);
        });

        it('Draw unknown component (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([{test: 'test'}], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw accidental', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw accidental (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicAccidentalInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw arpeggiate', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw arpeggiate (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicArpeggiateInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw bar', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw bar (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBarInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw beam', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw beam (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicBeamInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw clef', function () {
            var symbols = ['F', 'C', 'G'];

            function drawClef(symbol) {
                var component = new MyScript.MusicClefInputComponent();
                component.getValue().setSymbol(symbol);
                musicRenderer.drawComponents([component]);

            }

            expect(function () {
                symbols.forEach(drawClef);
            }).to.not.throw(Error);
        });

        it('Draw clef (@deprecated)', function () {
            var symbols = ['F', 'C', 'G'];

            function drawClef(symbol) {
                var component = new MyScript.MusicClefInputComponent();
                component.getValue().setSymbol(symbol);
                musicRenderer.drawComponents([component], context, musicRenderer.getParameters());

            }

            expect(function () {
                symbols.forEach(drawClef);
            }).to.not.throw(Error);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw decoration (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw dots', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw dots (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDotsInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw head', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw head (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicHeadInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw decoration', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw decoration (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicDecorationInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw ledger line', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw ledger line (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicLedgerLineInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw rest', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw rest (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicRestInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw stem', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw stem (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicStemInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw tie or slur', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw tie or slur (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTieOrSlurInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw time signature', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw time signature (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawComponents([new MyScript.MusicTimeSignatureInputComponent()], context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown music component', function () {
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'});
            }).to.throw(Error);
        });

        it('Draw unknown music component (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawMusicNode({test: 'test'}, context, musicRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw staff', function () {
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff());
            }).to.not.throw(Error);
        });

        it('Draw staff (@deprecated)', function () {
            expect(function () {
                musicRenderer.drawStaff(new MyScript.MusicStaff(), context, musicRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                musicRenderer.drawRecognitionResult([], new MyScript.MusicDocument());
            }).to.not.throw(Error);
        });

        it('Draw recognition result (@deprecated)', function () {
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