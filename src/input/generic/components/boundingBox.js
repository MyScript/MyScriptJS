(function (scope) {

    function BoundingBox (obj) {
        if (obj) {
            this.xMin = obj.xMin;
            this.xMax = obj.xMax;
            this.yMin = obj.yMin;
            this.yMax = obj.yMax;
        }
    }

    BoundingBox.prototype.getXMin = function () {
        return this.xMin;
    };

    BoundingBox.prototype.setXMin = function (xMin) {
        this.xMin = xMin;
    };

    BoundingBox.prototype.getXMax = function () {
        return this.xMax;
    };

    BoundingBox.prototype.setXMax = function (xMax) {
        this.xMax = xMax;
    };

    BoundingBox.prototype.getYMin = function () {
        return this.yMin;
    };

    BoundingBox.prototype.setYMin = function (yMin) {
        this.yMin = yMin;
    };

    BoundingBox.prototype.getYMax = function () {
        return this.yMax;
    };

    BoundingBox.prototype.setYMax = function (yMax) {
        this.yMax = yMax;
    };

    BoundingBox.prototype.getWidth = function () {
        return this.xMax - this.xMin;
    };

    BoundingBox.prototype.getHeight = function () {
        return this.yMax - this.yMin;
    };

    // Export
    scope.BoundingBox = BoundingBox;
})(MyScript);