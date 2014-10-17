(function (scope) {

    /**
     * Parameters used for shape recognition
     * @constructor
     */
    function ShapeParameter () {
    }

    /**
     *
     * @type {MyScript.AbstractParameter}
     */
    ShapeParameter.prototype = new scope.AbstractParameter();

    /**
     *
      * @type {ShapeParameter}
     */
    ShapeParameter.prototype.constructor = ShapeParameter;

    /**
     *
     * @type {boolean}
     */
    ShapeParameter.prototype.rejectDetectionSensitivity = null;

    /**
     *
     * @type {boolean}
     */
    ShapeParameter.prototype.doBeautification = null;

    /**
     *
     * @type {Array}
     */
    ShapeParameter.prototype.userResources = null;

    /**
     *
     */
    ShapeParameter.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     *
     */
    ShapeParameter.prototype.getDoBeautification = function () {
        return this.doBeautification;
    };

    /**
     *
     */
    ShapeParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    // Export
    scope.ShapeParameter = ShapeParameter;
})(MyScript);