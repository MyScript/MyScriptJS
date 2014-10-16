(function (scope) {

    /**
     * Represent the Abstract Renderer
     * @constructor
     */
    function AbstractRenderer () {
    }

    /**
     *
     * @type {Object}
     */
    AbstractRenderer.prototype.__proto__ = new Object();

    /**
     *
     * @type {boolean}
     */
    AbstractRenderer.prototype.showBoundingBoxes = false;

    /**
     *
     * @type {Array}
     */
    AbstractRenderer.prototype.points = [];

    /**
     *
     * @type {boolean}
     */
    AbstractRenderer.prototype.drawing = false;

    /**
     *
     * @type {number}
     */
    AbstractRenderer.prototype.offset = 0;

    /**
     *
     * @type {number}
     */
    AbstractRenderer.prototype.twoPI = Math.PI * 2;

    /**
     *
     * @type {number}
     */
    AbstractRenderer.prototype.eighthPI = Math.PI / 8;

    /**
     *
     * @param show
     */
    AbstractRenderer.prototype.setShowBoundingBoxes = function (show) {
        this.showBoundingBoxes = show;
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     * @param angle
     * @returns {number}
     * @constructor
     */
    AbstractRenderer.prototype.Phi = function (angle) {
        angle = ((angle + Math.PI) % this.twoPI) - Math.PI;
        if (angle < -Math.PI) {
            angle += this.twoPI;
        }
        return angle;
    };

    /**
     * Record the beginning of stroke drawing
     * @param event
     * @param x
     * @param y
     */
    AbstractRenderer.prototype.startStrokeDrawing = function (event, x, y) {
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
     * Record the drawing of stroke
     * @param event
     * @param x
     * @param y
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.continueStrokeDrawing = function (event, x, y, parameters, context) {
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
                    this.startDrawingQuadratricStroke(previous, point, parameters, context);
                } else {
                    var third = this.points[this.points.length - 3];
                    this.continueDrawingQuadratricStroke(third, previous, point, parameters, context);
                }

            }
        }
    };

    /**
     * Stop record of drawing stroke
     * @param event
     * @param x
     * @param y
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.endStrokeDrawing = function (event, x, y, parameters, context) {

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
            this.endDrawingQuadratricStroke(point, lastPoint, parameters, context);
        }
        this.drawing = false;
        event.preventDefault();
    };

    /**
     * Clear the context's canvas content to erase drawing strokes
     * @param context
     */
    AbstractRenderer.prototype.clear = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    /**
     * Trace line on context
     * @param context
     * @param lX
     * @param lY
     * @param cX
     * @param cY
     */
    AbstractRenderer.prototype.draw = function (parameters, context, lX, lY, cX, cY) {

        context.fillStyle = parameters.getColor();
        context.strokeStyle = parameters.getColor();
        context.globalAlpha = parameters.getAlpha();
        context.lineWidth = 0.5 * parameters.getWidth();

        // line from
        context.moveTo(lX, lY);
        // to
        context.lineTo(cX, cY);
        // draw it
        context.stroke();
    };

    /**
     * Draw a line on context
     * @param firstPoint
     * @param lastPoint
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.drawLine = function (firstPoint, lastPoint, parameters, context) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            context.moveTo(firstPoint.x - this.offset, firstPoint.y);
            context.lineTo(lastPoint.x - this.offset, lastPoint.y);
            context.stroke();

        } finally {
            context.restore();
        }

    };

    /**
     * Draw an arrow head on context
     * @param headPoint
     * @param angle
     * @param length
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.drawArrowHead = function (headPoint, angle, length, parameters, context) {

        var alpha = this.Phi(angle + Math.PI - this.eighthPI),
            beta = this.Phi(angle - Math.PI + this.eighthPI);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.moveTo(headPoint.x - this.offset, headPoint.y);
            context.beginPath();
            context.lineTo(headPoint.x - this.offset + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
            context.lineTo(headPoint.x - this.offset + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
            context.lineTo(headPoint.x - this.offset, headPoint.y);
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Draw a rectangle on context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.drawRectangle = function (x, y, width, height, parameters, context) {

        context.save();
        try {
            context.fillStyle = parameters.getRectColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.fillRect(x - this.offset, y, width, height);

        } finally {
            context.restore();
        }
    };

    /**
     * Draw an ellipse arc on context
     * @param centerPoint
     * @param maxRadius
     * @param minRadius
     * @param orientation
     * @param startAngle
     * @param sweepAngle
     * @param parameters
     * @param context
     * @returns {Array}
     */
    AbstractRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context) {

        var angleStep = 0.02; // angle delta between interpolated

        var z1 = Math.cos(orientation);
        var z3 = Math.sin(orientation);
        var z2 = z1;
        var z4 = z3;
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        var n = Math.floor(Math.abs(sweepAngle) / angleStep);

        var boundariesPoints = [];

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();

            for (var i = 0; i <= n; i++) {

                var angle = startAngle + (i / n) * sweepAngle; // points on the arc, in radian
                var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

                var cosAlpha = Math.cos(alpha);
                var sinAlpha = Math.sin(alpha);

                // current point
                var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
                var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
                if (i === 0) {
                    context.moveTo(x - this.offset, y);
                } else {
                    context.lineTo(x - this.offset, y);
                }

                if (i === 0 || i === n) {
                    boundariesPoints.push({x: x, y: y});
                }
            }

            context.stroke();

        } finally {
            context.restore();
        }

        return boundariesPoints;
    };

    /**
     * Draw text on analyser
     * @param x
     * @param y
     * @param width
     * @param height
     * @param text
     * @param justificationType
     * @param textHeight
     * @param baseline
     * @param parameters
     * @param context
     * @returns {{x: *, y: *}}
     */
    AbstractRenderer.prototype.drawText = function (x, y, width, height, text, justificationType, textHeight, baseline, parameters, context) {

        var topLeft = {
                x: x,
                y: y
            },
            textMetrics;

        // If Text height is taller than Bounding box height
        if (textHeight > height) {
            textHeight = height;
        }

        context.font = this.getFontLine(textHeight, parameters);

        textMetrics = context.measureText(text);

        // If Text width is wider than Bounding box width
        if (textMetrics.width > width) {
            textHeight = textHeight * width / textMetrics.width;
            context.font = this.getFontLine(textHeight, parameters);
        } else {
            // If Text is analyzed as centered
            if ('CENTER' === justificationType) {
                topLeft.x = x + (width - textMetrics.width) / 2;
            }
        }

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.font = this.getFontLine(textHeight, parameters);

            context.fillText(text, topLeft.x - this.offset, baseline);

        } finally {
            context.restore();
        }
        return topLeft;
    };

    /**
     * Get the font line
     * @param textHeight
     * @param parameters
     * @returns {string}
     */
    AbstractRenderer.prototype.getFontLine = function (textHeight, parameters) {
        return parameters.getDecoration() + textHeight + 'pt ' + parameters.font;
    };

    /**
     * Draw a stroke on context
     * @param stroke
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.drawStroke = function (stroke, parameters, context) {

        if (stroke.length === 1) {
            this.drawPoint(stroke[0], parameters, context);
            return;
        }

        for (var i = 0; i < stroke.length; i++) {
            if (i === 0) {
                var p1 = stroke[0];
                var p2 = stroke[1];
                this.startDrawingQuadratricStroke(p1, p2, parameters, context);
            } else if (i < stroke.length - 1) {
                var p3 = stroke[i - 1];
                var p4 = stroke[i];
                var p5 = stroke[i + 1];
                this.continueDrawingQuadratricStroke(p3, p4, p5, parameters, context);
            } else if (i > 1) {
                var p6 = stroke[i - 1];
                var p7 = stroke[i];
                this.endDrawingQuadratricStroke(p6, p7, parameters, context);
            }
        }

    };

    /**
     * Draw point on context
     * @param point
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.drawPoint = function (point, parameters, context) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            context.arc(point.x - this.offset, point.y, 0.5 * parameters.getWidth(), 0, 2 * Math.PI);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Compute all necessary point parameters to draw quadratics
     *
     * @param previous
     * @param point
     */
    AbstractRenderer.prototype.computePoint = function (previous, point, parameters, isFirst, isLast) {

        // compute distance from previous point
        if (previous !== null) {
            this.computeDistance(previous, point);
            var strokeLength = previous.length + point.distance;
            point.length = strokeLength;
        }
        // compute pressure
        switch (parameters.pressureType) {
            case 'SIMULATED':
                this.computePressure(point, point.distance, point.length);
                break;
            case 'CONSTANT':
                point.pressure = 1.0;
                break;
            case 'REAL':
                // keep the current pressure
                break;
        }
        this.computeLastControls(point, parameters);
        // compute control points
        if (previous !== null && !isLast) {
            if (isFirst) {
                this.computeFirstControls(previous, point, parameters);
            }
            if (isLast) {
                this.computeLastControls(point, parameters);
            } else {
                this.computeControls(previous, point, parameters);
            }
        }
    };

    /**
     * Compute distance and unit vector from the previous point.
     *
     * @param previous
     * @param point
     * @returns
     */
    AbstractRenderer.prototype.computeDistance = function (previous, point) {
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
     * @param point
     * @param distance
     * @param length
     * @returns
     */
    AbstractRenderer.prototype.computePressure = function (point, distance, length) {
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
     * @param last
     *            Last point to be computed
     * @param parameters
     *            Pressure and pen width
     */
    AbstractRenderer.prototype.computeLastControls = function (last, parameters) {
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
     * @param first
     *            First point of the list to be computed
     * @param next
     *            Next point
     * @param parameters
     *            Pressure and pen width
     */
    AbstractRenderer.prototype.computeFirstControls = function (first, next, parameters) {
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
     * @param point
     *            Point to be computed
     * @param next
     *            Next point
     * @param parameters
     *            Pressure and pen width
     */
    AbstractRenderer.prototype.computeControls = function (point, next, parameters) {
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
     * @param p1
     * @param p2
     * @param context
     */
    AbstractRenderer.prototype.strokeFirstSegment = function (offset, p1, p2, context) {
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
        context.moveTo(x11 - offset, y11);
        context.lineTo(x21 - offset, y21);
        context.lineTo(x22 - offset, y22);
        context.lineTo(x12 - offset, y12);
        context.lineTo(x11 - offset, y11);
    };

    /**
     * Draw a gradratic stroke on context
     * @param p1
     * @param p2
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.startDrawingQuadratricStroke = function (p1, p2, parameters, context) {

        this.computePoint(null, p1, parameters, true, false);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeFirstSegment(this.offset, p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Continue to draw a quadratic stroke on context
     * @param p1
     * @param p2
     * @param p3
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.continueDrawingQuadratricStroke = function (p1, p2, p3, parameters, context) {

        this.computePoint(p2, p3, parameters, false, false);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeSegment(this.offset, p1, p2, p3, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Render a stroke segment
     *
     * @param p1
     * @param p2
     * @param p3
     * @param context
     */
    AbstractRenderer.prototype.strokeSegment = function (offset, p1, p2, p3, context) {
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
        context.moveTo(x11 - offset, y11);
        context.quadraticCurveTo(p2.x1 - offset, p2.y1, x21 - offset, y21);
        context.lineTo(x22 - offset, y22);
        context.quadraticCurveTo(p2.x2 - offset, p2.y2, x12 - offset, y12);
        context.lineTo(x11 - offset, y11);
    };

    /**
     * Stop to draw a quadratic stroke
     * @param p1
     * @param p2
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.endDrawingQuadratricStroke = function (p1, p2, parameters, context) {

        this.computePoint(p1, p2, parameters, false, true);

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            this.strokeLastSegment(this.offset, p1, p2, context);
            context.fill();
        } finally {
            context.restore();
        }
    };

    /**
     * Render the last stroke segment
     *
     * @param p1
     * @param p2
     * @param context
     */
    AbstractRenderer.prototype.strokeLastSegment = function (offset, p1, p2, context) {
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
        context.moveTo(x11 - offset, y11);
        context.lineTo(x21 - offset, y21);
        context.lineTo(x22 - offset, y22);
        context.lineTo(x12 - offset, y12);
        context.lineTo(x11 - offset, y11);
    };

    /**
     *
     * @param horizontalSpacing
     * @param verticalSpacing
     * @param parameters
     * @param context
     */
    AbstractRenderer.prototype.guidelinesDrawing = function (horizontalSpacing, verticalSpacing, parameters, context) {

        context.save();
        try {
            context.fillStyle = '#c8c8c8';
            context.strokeStyle = '#c8c8c8';
            context.lineWidth = '1.1f';
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

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);