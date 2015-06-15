'use strict';

describe('AnalyzerRenderer: rendering/analyzerRenderer.js', function () {

    describe('Default construction', function () {

        var analyzerRenderer;
        before(function (done) {
            analyzerRenderer = new MyScript.AnalyzerRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerRenderer).to.be.an('object');
            expect(analyzerRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(analyzerRenderer).to.be.an.instanceOf(MyScript.AnalyzerRenderer);
        });

    });

    describe('Workflow', function () {

        var analyzerRenderer, context;
        before(function (done) {
            context = document.createElement('canvas').getContext('2d');
            analyzerRenderer = new MyScript.AnalyzerRenderer();
            done();
        });

        it('Clear context', function () {
            analyzerRenderer.clear(context);
        });

        it('Draw stroke', function () {
            analyzerRenderer.drawComponents([new MyScript.Stroke()], context);
            analyzerRenderer.drawComponents([new MyScript.Stroke()], context, analyzerRenderer.getParameters());
        });

        it('Draw character', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()], context, analyzerRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            analyzerRenderer.drawComponents([{test: 'test'}], context);
            analyzerRenderer.drawComponents([{test: 'test'}], context, analyzerRenderer.getParameters());
        });


        it('Draw tables', function () {
            analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()], context);
            analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()], context, analyzerRenderer.getParameters());
        });

        it('Draw text lines', function () {
            analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()], context);
            analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()], context, analyzerRenderer.getParameters());
        });

        it('Draw underline', function () {
            var boundingBox = new MyScript.Rectangle(),
                text = '',
                textHeight = 15,
                underline = new MyScript.AnalyzerUnderline({data: {firstCharacter: 0, lastCharacter: 4}}),
                baseline = 14;

            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, context);
            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, context, analyzerRenderer.getParameters());
        });

        it('Draw groups', function () {
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()], context);
            }).to.throw(Error);
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()], context, analyzerRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw line', function () {
            analyzerRenderer.drawLine(new MyScript.AnalyzerLine(), context);
            analyzerRenderer.drawLine(new MyScript.AnalyzerLine(), context, analyzerRenderer.getParameters());
        });

        it('Draw cell', function () {
            analyzerRenderer.drawCell(new MyScript.AnalyzerCell(), context);
            analyzerRenderer.drawCell(new MyScript.AnalyzerCell(), context, analyzerRenderer.getParameters());
        });

        it('Draw shape recognized', function () {
            analyzerRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), context);
            analyzerRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), context, analyzerRenderer.getParameters());
        });

        it('Draw shape not recognized', function () {
            analyzerRenderer.drawShapeNotRecognized([], [], new MyScript.ShapeNotRecognized(), context);
            analyzerRenderer.drawShapeNotRecognized([], [], new MyScript.ShapeNotRecognized(), context, analyzerRenderer.getParameters());
        });

        it('Draw recognition result', function () {
            analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument(), context);
            analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument(), context, analyzerRenderer.getParameters());
        });

    });

});