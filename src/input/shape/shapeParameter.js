/**
 *
 * @param scope
 */
(function (scope) {

    /**
     * Parameters used for shape recognition
     * @constructor
     */
    function ShapeParameter () {
    }

    /**
     *
     * @type {AbstractParameter}
     */
    ShapeParameter.prototype = Object.create(scope.AbstractParameter.prototype);

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

    /**
     *
     * @type {ShapeParameter}
     */
    scope.ShapeParameter = ShapeParameter;
})(MyScript);