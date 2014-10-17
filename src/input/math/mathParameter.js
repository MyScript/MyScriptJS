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
     *
     * @type {Array}
     */
    MathParameter.prototype.resultTypes = null;

    /**
     *
     * @type {Array}
     */
    MathParameter.prototype.userResources = null;

    /**
     *
     * @type {number}
     */
    MathParameter.prototype.scratchOutDetectionSensitivity = null;

    /**
     *
     */
    MathParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     *
     */
    MathParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     *
     */
    MathParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    // Export
    scope.MathParameter = MathParameter;
})(MyScript);