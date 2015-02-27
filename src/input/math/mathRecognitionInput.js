'use strict';

(function (scope) {
    /**
     * Recognition input object for math recognition
     *
     * @class MathRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MathRecognitionInput () {
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
     * @method getResultTypes
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MathRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };
    /**
     * Get the math result result orientation to columnar operations
     *
     * @method getIsColumnar
     * @returns boolean
     */
    MathRecognitionInput.prototype.getIsColumnar = function () {
        return this.isColumnar;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @method setIsColumnar
     * @param  boolean
     */
    MathRecognitionInput.prototype.setIsColumnar = function (isColumnar) {
        this.isColumnar = isColumnar;
    };
    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MathRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    MathRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MathRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };
    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);