/**
 *
 * @param scope
 */
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
     * @type {Object}
     */
    ShapeResult.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {ShapeResult}
     */
    scope.ShapeResult = ShapeResult;
})(MyScript);