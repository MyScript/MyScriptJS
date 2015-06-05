'use strict';

describe('MathUtils: common/mathUtils.js', function () {

    describe('Default construction', function () {

        var mathUtils;
        before(function (done) {
            mathUtils = new MyScript.MathUtils();
            done();
        });

        it('check initial state', function () {
            expect(mathUtils).to.be.an('object');
            expect(mathUtils).to.be.an.instanceof(MyScript.MathUtils);
        });

    });

    describe('Workflow', function () {

        it('Ellipse Arc Rect getter', function () {
            var shapeEllipse = new MyScript.ShapeEllipse({
                    center: {x: 242.55331, y: 220.25092},
                    maxRadius: 1,
                    minRadius: 1,
                    orientation: 1,
                    startAngle: 1,
                    sweepAngle: 1
                }),
                center = shapeEllipse.getCenter(),
                maxRadius = shapeEllipse.getMaxRadius(),
                minRadius = shapeEllipse.getMinRadius(),
                orientation = shapeEllipse.getOrientation(),
                startAngle = shapeEllipse.getStartAngle(),
                sweepAngle = shapeEllipse.getSweepAngle();

            expect(MyScript.MathUtils.getEllipseArcRect(center, maxRadius, minRadius, orientation, startAngle, sweepAngle)).to.deep.equal(new MyScript.Rectangle({
                x: 241.56331750339956,
                y: 220.39204000805987,
                height: 0.7681774187658164,
                width: 0.57384566005328
            }));
        });

        it('Line Rect getter', function () {
            var firsPoint = new MyScript.Point({x: 12, y: 25}),
                lastPoint = new MyScript.Point({x: 142, y: 25});

            expect(MyScript.MathUtils.getLineRect(firsPoint, lastPoint)).to.deep.equal(new MyScript.Rectangle({
                x: 12,
                y: 25,
                height: 0,
                width: 130
            }));
        });

        it('Bounding Rect getter', function () {
            var rect1 = new MyScript.Rectangle({x: 12, y: 25, height: 10, width: 130}),
                rect2 = new MyScript.Rectangle({x: 2, y: 5, height: 40, width: 10}),
                boundingBoxes = [];

            boundingBoxes.push(rect1);
            boundingBoxes.push(rect2);

            expect(MyScript.MathUtils.getBoundingRect(boundingBoxes)).to.deep.equal(new MyScript.Rectangle({
                x: 2,
                y: 5,
                height: 40,
                width: 140
            }));
        });

    });

});