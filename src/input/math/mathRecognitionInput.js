'use strict';

(function (scope) {
    /**
     * Recognition input object for math recognition
     *
     * @class MathRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MathRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    MathRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MathRecognitionInput.prototype.constructor = MathRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathRecognitionInput.prototype.getParameters = function () {
        return new MathParameter({
            resultTypes: this.resultTypes,
            columnarOperation: this.columnarOperation,
            userResources: this.userResources,
            scratchOutDetectionSensitivity: this.scratchOutDetectionSensitivity
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.resultTypes = parameters.getResultTypes();
            this.columnarOperation = parameters.isColumnar();
            this.userResources = parameters.getUserResources();
            this.scratchOutDetectionSensitivity = parameters.getScratchOutDetectionSensitivity();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MathRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MathRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);
