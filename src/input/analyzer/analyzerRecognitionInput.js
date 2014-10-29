(function (scope) {

    /**
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
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognitionInput.prototype.getParameters = function () {
        return this.parameter;
    };

    /**
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognitionInput.prototype.setParameters = function (parameters) {
        this.parameter = parameters;
    };

    /**
     * @returns {Array}
     */
    AnalyzerRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * @param {Array} components
     */
    AnalyzerRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * @returns {boolean}
     */
    AnalyzerRecognitionInput.prototype.getSwitchToChildren = function () {
        return this.switchToChildren;
    };

    /**
     * @param {boolean} switchToChildren
     */
    AnalyzerRecognitionInput.prototype.setSwitchToChildren = function (switchToChildren) {
        this.switchToChildren = switchToChildren;
    };

    // Export
    scope.AnalyzerRecognitionInput = AnalyzerRecognitionInput;
})(MyScript);