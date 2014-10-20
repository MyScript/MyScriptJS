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
     * @returns {boolean}
     */
    ShapeParameter.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * @param {boolean}
     */
    ShapeParameter.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    /**
     * @returns {boolean}
     */
    ShapeParameter.prototype.hasBeautification = function () {
        return this.doBeautification;
    };

    /**
     * @param {boolean}
     */
    ShapeParameter.prototype.setBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * @returns {Array}
     */
    ShapeParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array}
     */
    ShapeParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    // Export
    scope.ShapeParameter = ShapeParameter;
})(MyScript);