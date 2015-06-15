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

        var analyzerRenderer, parameters, context, components;
        beforeEach(function (done) {
            analyzerRenderer = new MyScript.AnalyzerRenderer();
            parameters = new MyScript.RenderingParameters();
            parameters.setShowBoundingBoxes(true);
            context = document.createElement('canvas').getContext('2d');
            context.canvas.clientWidth = 800;
            context.canvas.clientHeight = 600;

            var stroke1 = new MyScript.Stroke();
            stroke1.setX([357, 357, 357, 357]);
            stroke1.setY([115, 116, 122, 133]);

            var stroke2 = new MyScript.Stroke();
            stroke2.setX([684, 683, 682, 681, 679]);
            stroke2.setY([422, 422, 425, 429, 433]);
            components = [stroke1, stroke2];
            done();
        });

        it('Draw recognition result', function () {
            var recognitionResult = new MyScript.AnalyzerDocument({
                uniqueID: 'N/A',
                textLines: [{
                    elementType: 'textLine',
                    uniqueID: 0,
                    data: {
                        baselinePos: 297.15756,
                        toMidline: 0.0,
                        orientation: 0.0,
                        topLeftPoint: {x: 1094.0, y: 260.0},
                        height: 41.0,
                        width: 50.0,
                        textHeight: 36.97617,
                        justificationType: 'LEFT_ALIGN'
                    },
                    result: {
                        textSegmentResult: {
                            selectedCandidateIdx: 0,
                            candidates: [{
                                label: 'a',
                                normalizedScore: 1.0,
                                resemblanceScore: 0.99965465
                            }]
                        }
                    },
                    underlineList: [],
                    inkRanges: [{firstPoint: 0.0, lastPoint: 55.0, stroke: 1}]
                }],
                shapes: [{
                    elementType: 'shape',
                    selectedCandidateIndex: 0,
                    candidates: [{
                        type: 'recognizedShape',
                        label: 'polyline',
                        primitives: [{
                            type: 'line',
                            firstPoint: {x: 97.02565, y: 63.9619},
                            lastPoint: {x: 97.02565, y: 107.30849},
                            beginDecoration: 'NONE',
                            endDecoration: 'NONE',
                            beginTangentAngle: 0.0,
                            endTangentAngle: 0.0
                        }, {
                            type: 'line',
                            firstPoint: {x: 97.02565, y: 107.30849},
                            lastPoint: {x: 172.93484, y: 107.30849},
                            beginDecoration: 'NONE',
                            endDecoration: 'NONE',
                            beginTangentAngle: 0.0,
                            endTangentAngle: 0.0
                        }],
                        normalizedRecognitionScore: 1.0,
                        resemblanceScore: 0.9489879
                    }],
                    inkRanges: [{firstStroke: 0, lastStroke: 0, firstPoint: 0.0, lastPoint: 28.0}],
                    uniqueID: 1
                }],
                tables: [],
                groups: []
            });

            analyzerRenderer.drawRecognitionResult(components, recognitionResult, context);
            analyzerRenderer.drawRecognitionResult(components, recognitionResult, context, parameters);
        });

        it('Draw tables', function () {
            var tables = [new MyScript.AnalyzerTable()];

            analyzerRenderer.drawTables(components, tables, context);
            analyzerRenderer.drawTables(components, tables, context, parameters);
        });

        it('Draw text lines', function () {
            var textLines = [new MyScript.AnalyzerTextLine()];

            analyzerRenderer.drawTextLines(components, textLines, context);
            analyzerRenderer.drawTextLines(components, textLines, context, parameters);
        });

        it('Draw underline', function () {
            var boundingBox = new MyScript.Rectangle(),
                text = '',
                textHeight = 15,
                underline = new MyScript.AnalyzerUnderline({data: {firstCharacter: 0, lastCharacter: 4}}),
                baseline = 14;

            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, context);
            analyzerRenderer.drawUnderline(boundingBox, underline, text, textHeight, baseline, context, parameters);
        });

        it('Draw groups', function () {
            var groups = [new MyScript.AnalyzerGroup()];

            expect(function () {
                analyzerRenderer.drawGroups(components, groups, context, parameters);
            }).to.throw('not implemented');
        });

        it('Draw line', function () {
            var line = new MyScript.AnalyzerLine();

            analyzerRenderer.drawLine(line, context);
            analyzerRenderer.drawLine(line, context, parameters);
        });

        it('Draw cell', function () {
            var cell = new MyScript.AnalyzerCell();

            analyzerRenderer.drawCell(cell, context);
            analyzerRenderer.drawCell(cell, context, parameters);
        });

        it('Draw shapes', function () {
            var shapes = [new MyScript.ShapeSegment()];

            analyzerRenderer.drawShapes(components, shapes, context);
            analyzerRenderer.drawShapes(components, shapes, context, parameters);
        });

        it('Draw shapes not recognized', function () {
            var inkRange = new MyScript.ShapeInkRange({firstStroke: 1, lastStroke: 1, firstPoint: 0, lastPoint: 408}),
                inkRanges = [],
                shapeNotRecognized = new MyScript.ShapeNotRecognized();

            inkRanges.push(inkRange);

            analyzerRenderer.drawShapeNotRecognized(components, inkRanges, shapeNotRecognized, context);
            analyzerRenderer.drawShapeNotRecognized(components, inkRanges, shapeNotRecognized, context, parameters);
        });

        it('Draw shape primitive', function () {
            var primitive = new MyScript.AbstractShapePrimitive();

            analyzerRenderer.drawShapePrimitive(primitive, context);
            analyzerRenderer.drawShapePrimitive(primitive, context, parameters);
        });

        it('Draw shape line', function () {
            var shapeLine = new MyScript.ShapeLine({
                firstPoint: {x: 242.55331, y: 220.25092},
                lastPoint: {x: 1020.905, y: 220.25092}
            });

            analyzerRenderer.drawShapeLine(shapeLine, context);
            analyzerRenderer.drawShapeLine(shapeLine, context, parameters);
        });

        it('Draw ellipse arc', function () {
            var shapeEllipse = new MyScript.ShapeEllipse(),
                centerPoint = shapeEllipse.getCenter(),
                maxRadius = shapeEllipse.getMaxRadius(),
                minRadius = shapeEllipse.getMinRadius(),
                orientation = shapeEllipse.getOrientation(),
                startAngle = shapeEllipse.getStartAngle(),
                sweepAngle = shapeEllipse.getSweepAngle();

            analyzerRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context);
            analyzerRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters);
        });

        it('Draw shape ellipse', function () {
            var shapeEllipse = new MyScript.ShapeEllipse();

            analyzerRenderer.drawShapeEllipse(shapeEllipse, context);
            analyzerRenderer.drawShapeEllipse(shapeEllipse, context, parameters);
        });

        it('Primitive bounding box', function () {
            var primitive = new MyScript.ShapeLine({
                firstPoint: {x: 242.55331, y: 220.25092},
                lastPoint: {x: 1020.905, y: 220.25092}
            });

            expect(analyzerRenderer.getPrimitiveBoundingBox(primitive)).to.deep.equal(new MyScript.Rectangle({
                x: 242.55331,
                y: 220.25092,
                height: 0,
                width: 778.35169
            }));
        });

    });

});