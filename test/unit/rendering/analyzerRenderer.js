'use strict';

describe('AnalyzerRenderer: rendering/analyzerRenderer.js', function () {

    describe('Default construction', function () {

        var analyzerRenderer;
        before(function (done) {
            var canvas = document.createElement('canvas');
            analyzerRenderer = new MyScript.AnalyzerRenderer(canvas.getContext('2d'));
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

        var analyzerRenderer, context;
        before(function (done) {
            var canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            analyzerRenderer = new MyScript.AnalyzerRenderer(context);
            done();
        });

        it('Clear context', function () {
            analyzerRenderer.clear();
        });

        it('Draw stroke', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.Stroke()]);
            }).to.not.throw(Error);
        });

        it('Draw stroke (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.Stroke()], context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw character', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw character (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawComponents([new MyScript.CharacterInputComponent()], context, analyzerRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                analyzerRenderer.drawComponent({test: 'test'});
            }).to.throw(Error);
        });

        it('Draw unknown component (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawComponent({test: 'test'}, context, analyzerRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw tables', function () {
            expect(function () {
                analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()]);
            }).to.not.throw(Error);
        });

        it('Draw tables (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawTables([], [new MyScript.AnalyzerTable()], context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw text lines', function () {
            expect(function () {
                analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()]);
            }).to.not.throw(Error);
        });

        it('Draw text lines (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawTextLines([], [new MyScript.AnalyzerTextLine()], context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw underline', function () {
            var boundingBox = new MyScript.Rectangle(),
                text = '',
                textHeight = 15,
                underline = new MyScript.AnalyzerUnderline({data: {firstCharacter: 0, lastCharacter: 4}}),
                baseline = 14;

            expect(function () {
                analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline);
            }).to.not.throw(Error);
        });

        it('Draw underline (@deprecated)', function () {
            var boundingBox = new MyScript.Rectangle(),
                text = '',
                textHeight = 15,
                underline = new MyScript.AnalyzerUnderline({data: {firstCharacter: 0, lastCharacter: 4}}),
                baseline = 14;

            expect(function () {
                analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw groups', function () {
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()]);
            }).to.throw(Error);
        });

        it('Draw groups (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawGroups([], [new MyScript.AnalyzerGroup()], context, analyzerRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw cell', function () {
            expect(function () {
                analyzerRenderer.drawCell(new MyScript.AnalyzerCell());
            }).to.not.throw(Error);
        });

        it('Draw cell (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawCell(new MyScript.AnalyzerCell(), context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument());
            }).to.not.throw(Error);
        });

        it('Draw recognition result (@deprecated)', function () {
            expect(function () {
                analyzerRenderer.drawRecognitionResult([], new MyScript.AnalyzerDocument(), context, analyzerRenderer.getParameters());
            }).to.not.throw(Error);
        });

    });

});