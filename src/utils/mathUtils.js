(function (scope) {

    /**
     * The mathUtil class is use to calculate lines
     *
     * @class MathUtil
     * @constructor
     */
    function MathUtils () {
    }

    /**
     * This method is use to calculate the size of the rectangle that contains an ellipse arc.
     *
     * @method getEllipseArcRect
     * @param {Object} center
     * @param {Object} maxRadius
     * @param {Object} minRadius
     * @param {Object} orientation
     * @param {Object} startAngle
     * @param {Object} sweepAngle
     */
    MathUtils.prototype.getEllipseArcRect = function (center, maxRadius, minRadius, orientation, startAngle, sweepAngle) {

        var angleStep = 0.02, // angle delta between interpolated points on the arc, in radian
            angle, // angle
            alpha, // angle
            z1,
            z2,
            z3,
            z4,
            cosAlpha,
            sinAlpha,
            n,
            xList,
            yList,
            i,
            x,
            y,
            xMin,
            xMax,
            yMin,
            yMax,
            sortFloat = function (a, b) {
                return a - b;
            };

        z1 = z2 = Math.cos(orientation);
        z3 = z4 = Math.sin(orientation);
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        n = Math.abs(sweepAngle) / angleStep;

        xList = [];
        yList = [];

        for (i = 0; i <= n; i++) {

            angle = startAngle + (i / n) * sweepAngle;
            alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

            cosAlpha = Math.cos(alpha);
            sinAlpha = Math.sin(alpha);

            // current point
            x = center.x + z1 * cosAlpha - z4 * sinAlpha;
            y = center.y + z2 * sinAlpha + z3 * cosAlpha;

            xList.push(x);
            yList.push(y);
        }

        xList.sort(sortFloat);
        yList.sort(sortFloat);

        xMin = xList[0];
        xMax = xList[xList.length - 1];
        yMin = yList[0];
        yMax = yList[yList.length - 1];

        return {x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin};
    };

    /**
     * This method is use to calculate the size of the rectangle that contains a line.
     *
     * @Method getLineRect
     * @param {Object} firstPoint
     * @param {Object} lastPoint
     */
    MathUtils.prototype.getLineRect = function (firstPoint, lastPoint) {

        var xFirst = firstPoint.x,
            xLast = lastPoint.x,
            xMin = (xFirst < xLast) ? xFirst : xLast,
            xMax = (xFirst > xLast) ? xFirst : xLast,

            yFirst = firstPoint.y,
            yLast = lastPoint.y,
            yMin = (yFirst < yLast) ? yFirst : yLast,
            yMax = (yFirst > yLast) ? yFirst : yLast;

        return {x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin};
    };

    /**
     * This method is use to calculate the size of the rectangle that contains bounding boxes.
     *
     * @Method getBoundingRect
     * @param {Object} boundingBoxes List of bounding box
     */
    MathUtils.prototype.getBoundingRect = function (boundingBoxes) {

        var xList = [],
            yList = [],
            sortFloat = function (a, b) {
                return a - b;
            },
            i,
            rectangle,
            xMin,
            xMax,
            yMin,
            yMax;

        for (i = 0; i < boundingBoxes.length; i++) {
            rectangle = boundingBoxes[i];
            xList.push(rectangle.x);
            xList.push(rectangle.x + rectangle.width);
            yList.push(rectangle.y);
            yList.push(rectangle.y + rectangle.height);
        }

        xList.sort(sortFloat);
        yList.sort(sortFloat);

        xMin = xList[0];
        xMax = xList[xList.length - 1];
        yMin = yList[0];
        yMax = yList[yList.length - 1];

        return {x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin};
    };

    // Export
    scope.MathUtils = MathUtils;
})(MyScript);