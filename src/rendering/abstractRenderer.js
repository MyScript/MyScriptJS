(function (scope) {

    /**
     * Represent the Abstract Renderer. It's use to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @constructor
     */
    function AbstractRenderer () {
        this.points = [];
        this.drawing = false;
    }

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
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawContinue = function (event, x, y, parameters, context) {
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
                    this.drawQuadratricStart(previous, point, parameters, context);
                } else {
                    var third = this.points[this.points.length - 3];
                    this.drawQuadratricContinue(third, previous, point, parameters, context);
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
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawEnd = function (event, x, y, parameters, context) {
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
                this.drawQuadratricEnd(point, lastPoint, parameters, context);
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
     * @param {number} horizontalSpacing
     * @param {number} verticalSpacing
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawGuidelines = function (horizontalSpacing, verticalSpacing, parameters, context) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();

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
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawLineByCoordinates = function (lX, lY, cX, cY, parameters, context) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

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
     * @param {Object} firstPoint
     * @param {Object} lastPoint
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawLineByPoints = function (firstPoint, lastPoint, parameters, context) {
        this.drawLineByCoordinates(firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y, parameters, context);
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawRectangle = function (x, y, width, height, parameters, context) {

        context.save();
        try {
            context.fillStyle = parameters.getRectColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.fillRect(x, y, width, height);

        } finally {
            context.restore();
        }
    };

    /**
     * Draw ink strokes on HTML5 canvas.
     *
     * @method drawStrokesByRecognitionResult
     * @param {Array} strokes
     * @param {Object} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        throw new Error('not implemented');
    };

    /**
     * Draw strokes on context
     *
     * @method drawStroke
     * @param {Array} strokes
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawStroke = function (strokes, parameters, context) {

        if (strokes.length === 1) {
            this.drawPoint(strokes[0], parameters, context);
            return;
        }

        for (var i = 0; i < strokes.length; i++) {
            if (i === 0) {
                var p1 = strokes[0];
                var p2 = strokes[1];
                this.drawQuadratricStart(p1, p2, parameters, context);
            } else if (i < strokes.length - 1) {
                var p3 = strokes[i - 1];
                var p4 = strokes[i];
                var p5 = strokes[i + 1];
                this.drawQuadratricContinue(p3, p4, p5, parameters, context);
            } else if (i > 1) {
                var p6 = strokes[i - 1];
                var p7 = strokes[i];
                this.drawQuadratricEnd(p6, p7, parameters, context);
            }
        }

    };

    /**
     * Draw point on context
     *
     * @method drawPoint
     * @param {Object} point
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawPoint = function (point, parameters, context) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

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
     * @param {Object} headPoint
     * @param {Object} angle
     * @param {Object} length
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawArrowHead = function (headPoint, angle, length, parameters, context) {

        var alpha = Phi(angle + Math.PI - (Math.PI / 8)),
            beta = Phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

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
     * @param {Array} strokes
     * @param {Object} inkRange
     * @result {Array} List of strokes from inkRange
     */
    AbstractRenderer.prototype.extractStroke = function (strokes, inkRange) {
        var result = [],
            firstPointIndex = Math.floor(inkRange.getFirstPoint()),
            lastPointIndex = Math.ceil(inkRange.getLastPoint());

        for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
            var currentStroke = strokes[strokeIndex];
            var currentStrokePointCount = currentStroke.x.length;

            var newStroke = [];

            for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                newStroke.push({
                    x: currentStroke.x[pointIndex],
                    y: currentStroke.y[pointIndex],
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
            }

            result.push(newStroke);
        }
        return result;
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     *
     * @private
     * @method Phi
     * @param {Number} angle
     * @returns {Number}
     */
    var Phi = function (angle) {
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
     * @param {Object} previous
     * @param {Object} point
     * @param {RenderingParameters} parameters
     * @param {boolean} isFirst
     * @param {boolean} isLast
     */
    var computePoint = function (previous, point, parameters, isFirst, isLast) {

        // compute distance from previous point
        if (previous !== null) {
            computeDistance(previous, point);
            var strokeLength = previous.length + point.distance;
            point.length = strokeLength;
        }
        // compute pressure
        switch (parameters.pressureType) {
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
        computeLastControls(point, parameters);
        // compute control points
        if (previous !== null && !isLast) {
            if (isFirst) {
                computeFirstControls(previous, point, parameters);
            }
            if (isLast) {
                computeLastControls(point, parameters);
            } else {
                computeControls(previous, point, parameters);
            }
        }
    };

    /**
     * Compute distance and unit vector from the previous point.
     *
     * @private
     * @method computeDistance
     * @param {Object} previous
     * @param {Object} point
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
     * @param {Object} point
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
     * Compute control points of the last point.
     *
     * @private
     * @method computeLastControls
     * @param {Object} last Last point to be computed
     * @param {Object} parameters Pressure and pen width
     */
    var computeLastControls = function (last, parameters) {
        var r = 0.5 * parameters.getWidth() * last.pressure,
            nx = -r * last.uy,
            ny = r * last.ux;

        last.x1 = last.x + nx;
        last.y1 = last.y + ny;
        last.x2 = last.x - nx;
        last.y2 = last.y - ny;
    };

    /**
     * Compute control points of the first point.
     *
     * @private
     * @method computeFirstControls
     * @param {Object} first First point of the list to be computed
     * @param {Object} next Next point
     * @param {RenderingParameters} parameters Pressure and pen width
     */
    var computeFirstControls = function (first, next, parameters) {
        var r = 0.5 * parameters.getWidth() * first.pressure,
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
     * @param {Object} point Point to be computed
     * @param {Object} next Next point
     * @param {RenderingParameters} parameters Pressure and pen width
     */
    var computeControls = function (point, next, parameters) {
        var ux = point.ux + next.ux,
            uy = point.uy + next.uy,
            u = Math.sqrt(ux * ux + uy * uy);

        if (u !== 0) {
            // compute control points
            var r = 0.5 * parameters.getWidth() * point.pressure;
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
     * Render the first stroke segment.
     *
     * @private
     * @method strokeFirstSegment
     * @param {Object} p1
     * @param {Object} p2
     * @param {Object} context
     */
    AbstractRenderer.prototype.strokeFirstSegment = function (p1, p2, context) {
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
     * Draw a quadratic stroke on context
     *
     * @private
     * @method drawQuadratricStart
     * @param {Object} p1
     * @param {Object} p2
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawQuadratricStart = function (p1, p2, parameters, context) {

        computePoint(null, p1, parameters, true, false);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeFirstSegment(p1, p2, context);
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
     * @param {Object} p1
     * @param {Object} p2
     * @param {Object} p3
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawQuadratricContinue = function (p1, p2, p3, parameters, context) {

        computePoint(p2, p3, parameters, false, false);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeSegment(p1, p2, p3, context);
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
     * @param {Object} p1
     * @param {Object} p2
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawQuadratricEnd = function (p1, p2, parameters, context) {

        computePoint(p1, p2, parameters, false, true);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeLastSegment(p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Render a stroke segment
     *
     * @private
     * @method strokeSegment
     * @param {Object} p1
     * @param {Object} p2
     * @param {Object} p3
     * @param {Object} context
     */
    AbstractRenderer.prototype.strokeSegment = function (p1, p2, p3, context) {
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
     * @param {Object} p1
     * @param {Object} p2
     * @param {Object} context
     */
    AbstractRenderer.prototype.strokeLastSegment = function (p1, p2, context) {
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
     * Fade out your text ink on HTML5 canvas
     *
     * @private
     * @method fadeOut
     * @param {Object} window
     * @param {Object} timeout
     * @param {Object} lastStroke
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AbstractRenderer.prototype.fadeOut = function (window, timeout, lastStroke, parameters, context) {
//        var alpha = 1,/// current alpha
//            delta = 0.02;
//
//        this.doFadeOutLoop = true;
//
//        function launch () {
//            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
//                function (callback) {
//                    timeout(callback, 500);
//                };
//        }
//
//        function loop (doFadeOutLoop, strokesDrawing) {
//            /// dicrease alpha with delta value
//            alpha -= delta;
//            /// clear canvas
//            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//            if (alpha >= 0 && doFadeOutLoop) {
//                /// fadeout stroke
//                parameters.alpha = alpha;
//                strokesDrawing(lastStroke, parameters, context);
//                window.requestAnimationFrame(loop);
//            }
//        }
//
//        window.requestAnimationFrame = launch();
//        loop(this.doFadeOutLoop, this.strokesDrawing);
    };

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);