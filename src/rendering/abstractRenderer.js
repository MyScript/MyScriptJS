(function (scope) {
    'use strict';
    /**
     * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @constructor
     */
    function AbstractRenderer () {
        this.points = [];
        this.drawing = false;
        this.parameters = new scope.RenderingParameters();
    }

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {RenderingParameters}
     */
    AbstractRenderer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {RenderingParameters} parameters
     */
    AbstractRenderer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Draw ink strokes on HTML5 canvas.
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {Object} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawComponents = function (components, context, parameters) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.Stroke) {
                this.drawStroke(component, context, parameters);
            }
        }
    };

    /**
     * Record the beginning of drawing
     *
     * @method drawStart
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     */
    AbstractRenderer.prototype.drawStart = function (event, x, y) {
        this.points.length = 0;
        this.drawing = true;
        this.points.push({
            x: x,
            y: y,
            pressure: 0.5,
            distance: 0.0,
            length: 0.0,
            ux: 0.0,
            uy: 0.0,
            x1: 0.0,
            x2: 0.0,
            y1: 0.0,
            y2: 0.0
        });
        event.preventDefault();
    };

    /**
     * Record the drawing
     *
     * @method drawContinue
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawContinue = function (event, x, y, context, parameters) {
        if (this.drawing) {
            var point = {
                x: x,
                y: y,
                pressure: 0.5,
                distance: 0.0,
                length: 0.0,
                ux: 0.0,
                uy: 0.0,
                x1: 0.0,
                x2: 0.0,
                y1: 0.0,
                y2: 0.0
            };
            this.points.push(point);

            if (this.points.length > 1) {
                var previous = this.points[this.points.length - 2];

                if (this.points.length === 2) {
                    this.drawQuadratricStart(previous, point, context, parameters);
                } else {
                    var third = this.points[this.points.length - 3];
                    this.drawQuadratricContinue(third, previous, point, context, parameters);
                }

            }
        }
    };

    /**
     * Stop record of drawing
     *
     * @method drawEnd
     * @param {Object} event
     * @param {Number} x
     * @param {Number} y
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawEnd = function (event, x, y, context, parameters) {
        if (this.drawing) {
            if (this.points.length === 1) {
                this.drawPoint({
                    x: x,
                    y: y,
                    pressure: 0.5,
                    distance: 0.0,
                    length: 0.0,
                    ux: 0.0,
                    uy: 0.0,
                    x1: 0.0,
                    x2: 0.0,
                    y1: 0.0,
                    y2: 0.0
                }, parameters, context);
            } else if (this.points.length > 1) {
                var lastPoint = this.points[this.points.length - 1];
                var point = this.points[this.points.length - 2];
                this.drawQuadratricEnd(point, lastPoint, context, parameters);
            }
            this.drawing = false;
            event.preventDefault();
        }
    };

    /**
     * Clear the context's canvas content to erase drawing strokes
     *
     * @method clear
     * @param {Object} context
     */
    AbstractRenderer.prototype.clear = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    /**
     * Draw guidelines on the HTML5 canvas
     *
     * @method drawGuidelines
     * @param {Number} horizontalSpacing
     * @param {Number} verticalSpacing
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawGuidelines = function (horizontalSpacing, verticalSpacing, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

            if (verticalSpacing) {
                for (var y = verticalSpacing; y < context.canvas.clientHeight - verticalSpacing; y += verticalSpacing) {
                    context.beginPath();
                    context.moveTo(horizontalSpacing, y);
                    context.lineTo(context.canvas.clientWidth - horizontalSpacing, y);
                    context.stroke();
                }
            }
            if (horizontalSpacing) {
                for (var x = horizontalSpacing; x < context.canvas.clientWidth - horizontalSpacing; x += horizontalSpacing) {
                    context.beginPath();
                    context.moveTo(x, verticalSpacing);
                    context.lineTo(x, context.canvas.clientHeight - verticalSpacing);
                    context.stroke();
                }
            }
        } finally {
            context.restore();
        }
    };

    /**
     * Trace line on context
     *
     * @method drawLineByCoordinates
     * @param {Number} lX
     * @param {Number} lY
     * @param {Number} cX
     * @param {Number} cY
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawLineByCoordinates = function (lX, lY, cX, cY, context, parameters) {
        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.beginPath();
            // line from
            context.moveTo(lX, lY);
            // to
            context.lineTo(cX, cY);
            // draw it
            context.stroke();
        } finally {
            context.restore();
        }
    };

    /**
     * Draw a line on context
     *
     * @method drawLineByPoints
     * @param {QuadraticPoint} firstPoint
     * @param {QuadraticPoint} lastPoint
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawLineByPoints = function (firstPoint, lastPoint, context, parameters) {
        this.drawLineByCoordinates(firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y, context, parameters);
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {MyScript.Rectangle} rectangle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRectangle = function (rectangle, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getRectColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getRectColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());

        } finally {
            context.restore();
        }
    };

    /**
     * Draw strokes on context
     *
     * @method drawStrokes
     * @param {Stroke[]} strokes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawStrokes = function (strokes, context, parameters) {
        for (var i in strokes) {
            this.drawStroke(strokes[i], context, parameters);
        }
    };

    /**
     * Draw a stroke on context
     *
     * @method drawStroke
     * @param {Object} stroke
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawStroke = function (stroke, context, parameters) {
        var strokePoints = [];
        for (var j = 0; j < stroke.getLength(); j++) {
            strokePoints.push(new scope.QuadraticPoint({
                x: stroke.getX()[j],
                y: stroke.getY()[j]
            }));
        }
        if (stroke.getLength() === 1) {
            this.drawPoint(strokePoints[0], context, parameters);
            return;
        }

        for (var k = 0; k < stroke.getLength(); k++) {
            if (k === 0) {
                var p1 = strokePoints[0];
                var p2 = strokePoints[1];
                this.drawQuadratricStart(p1, p2, context, parameters);
            } else if (k < stroke.getLength() - 1) {
                var p3 = strokePoints[k - 1];
                var p4 = strokePoints[k];
                var p5 = strokePoints[k + 1];
                this.drawQuadratricContinue(p3, p4, p5, context, parameters);
            } else if (k > 1) {
                var p6 = strokePoints[k - 1];
                var p7 = strokePoints[k];
                this.drawQuadratricEnd(p6, p7, context, parameters);
            }
        }
    };
    /**
     * Draw point on context
     *
     * @method drawPoint
     * @param {QuadraticPoint} point
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawPoint = function (point, context, parameters) {

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.beginPath();
            context.arc(point.x, point.y, 0.5 * parameters.getWidth(), 0, 2 * Math.PI);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Draw an arrow head on context
     *
     * @method drawArrowHead
     * @param {QuadraticPoint} headPoint
     * @param {Number} angle
     * @param {Number} length
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawArrowHead = function (headPoint, angle, length, context, parameters) {

        var alpha = phi(angle + Math.PI - (Math.PI / 8)),
            beta = phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.moveTo(headPoint.x, headPoint.y);
            context.beginPath();
            context.lineTo(headPoint.x + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
            context.lineTo(headPoint.x + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
            context.lineTo(headPoint.x, headPoint.y);
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Get Strokes from inkRange
     *
     * @method extractStroke
     * @param {Stroke[]} strokes
     * @param {Object} inkRange
     * @result {Stroke[]} List of strokes from inkRange
     */
    AbstractRenderer.prototype.extractStroke = function (strokes, inkRange) {
        var result = [],
            firstPointIndex = Math.floor(inkRange.getFirstPoint()),
            lastPointIndex = Math.ceil(inkRange.getLastPoint());

        for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
            var currentStroke = strokes[strokeIndex];
            var currentStrokePointCount = currentStroke.x.length;

            var newStroke = new scope.Stroke(), x = [], y = [];

            for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                x.push(currentStroke.x[pointIndex]);
                y.push(currentStroke.y[pointIndex]);
            }

            newStroke.setX(x);
            newStroke.setY(y);
            result.push(newStroke);
        }
        return result;
    };

    /**
     * Draw a quadratic stroke on context
     *
     * @private
     * @method drawQuadratricStart
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricStart = function (p1, p2, context, parameters) {

        computePoint(null, p1, true, false, parameters);

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.beginPath();
            strokeFirstSegment(p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Continue to draw a quadratic stroke on context
     *
     * @private
     * @method drawQuadratricContinue
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {QuadraticPoint} p3
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricContinue = function (p1, p2, p3, context, parameters) {

        computePoint(p2, p3, false, false, parameters);

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.beginPath();
            strokeSegment(p1, p2, p3, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Stop to draw a quadratic stroke
     *
     * @private
     * @method drawQuadratricEnd
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AbstractRenderer.prototype.drawQuadratricEnd = function (p1, p2, context, parameters) {

        computePoint(p1, p2, false, true, parameters);

        context.save();
        try {
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

            context.beginPath();
            strokeLastSegment(p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Render the first stroke segment.
     *
     * @private
     * @method strokeFirstSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     */
    var strokeFirstSegment = function (p1, p2, context) {
        // compute start points
        var x11 = p1.x1,
            y11 = p1.y1,
            x12 = p1.x2,
            y12 = p1.y2,
        // compute end points
            x21 = 0.5 * p1.x1 + p2.x1,
            y21 = 0.5 * p1.y1 + p2.y1,
            x22 = 0.5 * p1.x2 + p2.x2,
            y22 = 0.5 * p1.y2 + p2.y2;

        // stroke segment
        context.moveTo(x11, y11);
        context.lineTo(x21, y21);
        context.lineTo(x22, y22);
        context.lineTo(x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Render a stroke segment
     *
     * @private
     * @method strokeSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {QuadraticPoint} p3
     * @param {Object} context
     */
    var strokeSegment = function (p1, p2, p3, context) {
        // compute start points
        var x11 = 0.5 * (p1.x1 + p2.x1),
            y11 = 0.5 * (p1.y1 + p2.y1),
            x12 = 0.5 * (p1.x2 + p2.x2),
            y12 = 0.5 * (p1.y2 + p2.y2),
        // compute end points
            x21 = 0.5 * (p2.x1 + p3.x1),
            y21 = 0.5 * (p2.y1 + p3.y1),
            x22 = 0.5 * (p2.x2 + p3.x2),
            y22 = 0.5 * (p2.y2 + p3.y2);
        // stroke segment
        context.moveTo(x11, y11);
        context.quadraticCurveTo(p2.x1, p2.y1, x21, y21);
        context.lineTo(x22, y22);
        context.quadraticCurveTo(p2.x2, p2.y2, x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Render the last stroke segment
     *
     * @private
     * @method strokeLastSegment
     * @param {QuadraticPoint} p1
     * @param {QuadraticPoint} p2
     * @param {Object} context
     */
    var strokeLastSegment = function (p1, p2, context) {
        // compute start points
        var x11 = 0.5 * (p1.x1 + p2.x1),
            y11 = 0.5 * (p1.y1 + p2.y1),
            x12 = 0.5 * (p1.x2 + p2.x2),
            y12 = 0.5 * (p1.y2 + p2.y2),
        // compute end points
            x21 = p2.x1,
            y21 = p2.y1,
            x22 = p2.x2,
            y22 = p2.y2;
        // stroke segment
        context.moveTo(x11, y11);
        context.lineTo(x21, y21);
        context.lineTo(x22, y22);
        context.lineTo(x12, y12);
        context.lineTo(x11, y11);
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     *
     * @private
     * @method phi
     * @param {Number} angle
     * @returns {Number}
     */
    var phi = function (angle) {
        angle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angle < -Math.PI) {
            angle += Math.PI * 2;
        }
        return angle;
    };

    /**
     * Compute all necessary point parameters to draw quadratics
     *
     * @private
     * @method computePoint
     * @param {QuadraticPoint} previous
     * @param {QuadraticPoint} point
     * @param {Boolean} isFirst
     * @param {Boolean} isLast
     * @param {RenderingParameters} [parameters]
     */
    var computePoint = function (previous, point, isFirst, isLast, parameters) {

        var pressureType, penWidth;

        if (parameters) {
            pressureType = parameters.getPressureType();
            penWidth = parameters.getWidth();
        } else {
            pressureType = this.getParameters().getPressureType();
            penWidth = this.getParameters().getWidth();
        }

        // compute distance from previous point
        if (previous !== null) {
            computeDistance(previous, point);
            var strokeLength = previous.length + point.distance;
            point.length = strokeLength;
        }
        // compute pressure
        switch (pressureType) {
            case 'SIMULATED':
                computePressure(point, point.distance, point.length);
                break;
            case 'CONSTANT':
                point.pressure = 1.0;
                break;
            case 'REAL':
                // keep the current pressure
                break;
        }
        computeLastControls(point, penWidth);
        // compute control points
        if (previous !== null && !isLast) {
            if (isFirst) {
                computeFirstControls(previous, point, penWidth);
            }
            if (isLast) {
                computeLastControls(point, penWidth);
            } else {
                computeControls(previous, point, penWidth);
            }
        }
    };

    /**
     * Compute distance and unit vector from the previous point.
     *
     * @private
     * @method computeDistance
     * @param {QuadraticPoint} previous
     * @param {QuadraticPoint} point
     */
    var computeDistance = function (previous, point) {
        var dx = point.x - previous.x,
            dy = point.y - previous.y,
            d = Math.sqrt(dx * dx + dy * dy);

        if (d !== 0) {
            point.distance = d;
            point.ux = dx / d;
            point.uy = dy / d;
        }
    };

    /**
     * Compute simulated pressure of given point.
     *
     * @private
     * @method computePressure
     * @param {QuadraticPoint} point
     * @param {Number} distance
     * @param {Number} length
     */
    var computePressure = function (point, distance, length) {
        var k, pressure;
        if (distance < 10) {
            k = 0.2 + Math.pow(0.1 * distance, 0.4);
        } else if (distance > length - 10) {
            k = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        } else {
            k = 1.0;
        }

        pressure = k * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(point.distance));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        point.pressure = pressure;
    };

    /**
     * Compute control points of the first point.
     *
     * @private
     * @method computeFirstControls
     * @param {QuadraticPoint} first First point of the list to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var computeFirstControls = function (first, next, penWidth) {
        var r = 0.5 * penWidth * first.pressure,
            nx = -r * next.uy,
            ny = r * next.ux;

        first.x1 = first.x + nx;
        first.y1 = first.y + ny;
        first.x2 = first.x - nx;
        first.y1 = first.y - ny;
    };

    /**
     * Compute control points between two points.
     *
     * @private
     * @method computeControls
     * @param {QuadraticPoint} point Point to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var computeControls = function (point, next, penWidth) {
        var ux = point.ux + next.ux,
            uy = point.uy + next.uy,
            u = Math.sqrt(ux * ux + uy * uy);

        if (u !== 0) {
            // compute control points
            var r = 0.5 * penWidth * point.pressure;
            var nx = -r * uy / u;
            var ny = r * ux / u;
            point.x1 = point.x + nx;
            point.y1 = point.y + ny;
            point.x2 = point.x - nx;
            point.y2 = point.y - ny;
        } else {
            // collapse control points
            point.x1 = point.x;
            point.y1 = point.y;
            point.x2 = point.x;
            point.y2 = point.y;
        }
    };

    /**
     * Compute control points of the last point.
     *
     * @private
     * @method computeLastControls
     * @param {QuadraticPoint} last Last point to be computed
     * @param {Number} penWidth Pen width
     */
    var computeLastControls = function (last, penWidth) {
        var r = 0.5 * penWidth * last.pressure,
            nx = -r * last.uy,
            ny = r * last.ux;

        last.x1 = last.x + nx;
        last.y1 = last.y + ny;
        last.x2 = last.x - nx;
        last.y2 = last.y - ny;
    };

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);