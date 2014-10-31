(function (scope) {

    /**
     * Recognition input object for analyzer recognition
     * @constructor
     */
    function AnalyzerRecognitionInput () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionInput}
     */
    AnalyzerRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     *
     * @type {AnalyzerRecognitionInput}
     */
    AnalyzerRecognitionInput.prototype.constructor = AnalyzerRecognitionInput;

    /**
     * Get analyzer recognition parameters
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognitionInput.prototype.getParameters = function () {
        return this.parameter;
    };

    /**
     * Set analyzer recognition parameters
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognitionInput.prototype.setParameters = function (parameters) {
        this.parameter = parameters;
    };

    /**
     * Get input components
     * @returns {Array}
     */
    AnalyzerRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     * @param {Array} components
     */
    AnalyzerRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get switch to children
     * @returns {Boolean}
     */
    AnalyzerRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * Set switch to children
     * @param {Boolean} switchToChildren
     */
    AnalyzerRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.AnalyzerRecognitionInput = AnalyzerRecognitionInput;
})(MyScript);