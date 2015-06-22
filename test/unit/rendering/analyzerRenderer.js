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

        it('Get shape renderer', function () {
            expect(analyzerRenderer.getShapeRenderer()).to.be.an.instanceOf(MyScript.ShapeRenderer);
        });

        it('Set shape renderer', function () {
            analyzerRenderer.setShapeRenderer(new MyScript.ShapeRenderer());
            expect(analyzerRenderer.getShapeRenderer()).to.be.an.instanceOf(MyScript.ShapeRenderer);
        });

    });

    describe('Workflow', function () {

        var analyzerRenderer, canvas, currentContext, finalContext;
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
            analyzerRenderer = new MyScript.AnalyzerRenderer();
            done();
        });

        it('Clear context', function () {
            analyzerRenderer.clear(currentContext, finalContext);
        });

        it('Draw stroke', function () {
            analyzerRenderer.drawComponents([new MyScript.Stroke()], finalContext);
            analyzerRenderer.drawComponents([new MyScript.Stroke()], finalContext, analyzerRenderer.getPenParameters());
        });

        it('Draw character', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()], finalContext, analyzerRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                analyzerRenderer.drawComponent({test: 'test'}, currentContext, finalContext);
            }).to.throw(Error);
            expect(function () {
                analyzerRenderer.drawComponent({test: 'test'}, currentContext, finalContext, analyzerRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw tables', function () {
            analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()], finalContext);
            analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()], finalContext, analyzerRenderer.getPenParameters());
        });

        it('Draw text lines', function () {
            analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()], finalContext);
            analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()], finalContext, analyzerRenderer.getPenParameters());
        });

        it('Draw underline', function () {
            var boundingBox = new MyScript.Rectangle(),
                text = '',
                textHeight = 15,
                underline = new MyScript.AnalyzerUnderline({data: {firstCharacter: 0, lastCharacter: 4}}),
                baseline = 14;

            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, finalContext);
            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, finalContext, analyzerRenderer.getPenParameters());
        });

        it('Draw groups', function () {
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()], finalContext);
            }).to.throw(Error);
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()], finalContext, analyzerRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw cell', function () {
            analyzerRenderer.drawCell(new MyScript.AnalyzerCell(), finalContext);
            analyzerRenderer.drawCell(new MyScript.AnalyzerCell(), finalContext, analyzerRenderer.getPenParameters());
        });

        it('Draw recognition result', function () {
            analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument(), finalContext);
            analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument(), finalContext, analyzerRenderer.getPenParameters());
        });

    });

});