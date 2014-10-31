(function (scope) {

    /**
     * Recognition input object for math recognition
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
     * Get input components
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     * @param {Array} components
     */
    MathRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getResultTypes = function () {
        return this.doBeautification;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     * @param {Array} resultTypes
     */
    MathRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the user resources
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     * @param {Array} userResources
     */
    MathRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     * @returns {Number}
     */
    MathRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     * @param {Number} scratchOutDetectionSensitivity
     */
    MathRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * Get switch to children
     * @returns {Boolean}
     */
    MathRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * Set switch to children
     * @param {Boolean} switchToChildren
     */
    MathRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);