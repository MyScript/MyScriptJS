(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeResult () {
        this.instanceId = null;
        this.result = null;
    }

    /**
     *
     * @returns {string}
     */
    ShapeResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     *
     * @returns {ShapeDocument}
     */
    ShapeResult.prototype.getShapeDocument = function () {
        return this.result;
    };

    // Export
    scope.ShapeResult = ShapeResult;
})(MyScript);