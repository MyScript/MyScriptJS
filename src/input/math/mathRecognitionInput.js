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

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @deprecated Use getParameters instead of getResultTypes
     * @method getResultTypes
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @deprecated Use setParameters instead of setResultTypes
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MathRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the math result result orientation to columnar operations
     *
     * @deprecated Use getParameters instead of isColumnar
     * @method isColumnar
     * @returns {Boolean}
     */
    MathRecognitionInput.prototype.isColumnar = function () {
        return this.columnarOperation;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @deprecated Use setParameters instead of setColumnar
     * @method setColumnar
     * @param  {Boolean} columnar
     */
    MathRecognitionInput.prototype.setColumnar = function (columnar) {
        this.columnarOperation = columnar;
    };

    /**
     * Get the user resources
     *
     * @deprecated Use getParameters instead of getUserResources
     * @method getUserResources
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @deprecated Use setParameters instead of setUserResources
     * @method setUserResources
     * @param {Array} userResources
     */
    MathRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @deprecated Use getParameters instead of getScratchOutDetectionSensitivity
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @deprecated Use setParameters instead of setScratchOutDetectionSensitivity
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MathRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };


    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);
