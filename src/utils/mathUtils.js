(function (scope) {

    /**
     *
     * @constructor
     */
    function MathUtils () {
    }

    /**
     *
     * @param center
     * @param maxRadius
     * @param minRadius
     * @param orientation
     * @param startAngle
     * @param sweepAngle
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
     *
     * @param firstPoint
     * @param lastPoint
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
     *
     * @param boundingBoxes
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