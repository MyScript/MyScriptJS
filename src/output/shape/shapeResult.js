(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeResult (obj) {
        this.instanceId = null;
        this.result = null;
        if (obj) {
            this.instanceId = obj.instanceId;
            this.result = new scope.ShapeDocument(obj.result);
        }
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