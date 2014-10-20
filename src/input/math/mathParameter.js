(function (scope) {

    /**
     * Parameters used for math recognition
     * @constructor
     */
    function MathParameter () {
        this.resultTypes = [];
        this.userResources = [];
    }

    /**
     *
     * @type {MyScript.AbstractParameter}
     */
    MathParameter.prototype = new scope.AbstractParameter();

    /**
     *
     * @type {MathParameter}
     */
    MathParameter.prototype.constructor = MathParameter;

    /**
     * @returns {Array}
     */
    MathParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * @param {Array}
     */
    MathParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * @returns {Array}
     */
    MathParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array}
     */
    MathParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * @returns {number}
     */
    MathParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * @param {number}
     */
    MathParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    // Export
    scope.MathParameter = MathParameter;
})(MyScript);