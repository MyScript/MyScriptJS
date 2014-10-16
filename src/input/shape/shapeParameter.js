(function (scope) {

    /**
     * Parameters used for shape recognition
     * @constructor
     */
    function ShapeParameter () {
        scope.AbstractParameter.call(this);
    }

    /**
     *
     * @type {AbstractParameter}
     */
    ShapeParameter.prototype.__proto__ = new scope.AbstractParameter();

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