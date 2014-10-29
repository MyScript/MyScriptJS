(function (scope) {

    /**
     * @constructor
     */
    function MathRecognitionInput () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionInput}
     */
    MathRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     *
     * @type {MathRecognitionInput}
     */
    MathRecognitionInput.prototype.constructor = MathRecognitionInput;

    /**
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * @param {Array} components
     */
    MathRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getResultTypes = function () {
        return this.doBeautification;
    };

    /**
     * @param {Array} resultTypes
     */
    MathRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array} userResources
     */
    MathRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * @returns {number}
     */
    MathRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * @param {number} scratchOutDetectionSensitivity
     */
    MathRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * @returns {boolean}
     */
    MathRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * @param {boolean} switchToChildren
     */
    MathRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);