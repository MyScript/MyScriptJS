(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.ShapeDocument(obj.result);
        }
    }

    /**
     *
     * @type {MyScript.AbstractResult}
     */
    ShapeResult.prototype = new scope.AbstractResult();

    /**
     *
     * @type {ShapeResult}
     */
    ShapeResult.prototype.constructor = ShapeResult;

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