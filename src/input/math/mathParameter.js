(function (scope) {
    'use strict';
    /**
     * Parameters used for math recognition
     *
     * @class MathParameter
     * @extends AbstractParameter
     * @constructor
     */
    function MathParameter () {
        this.resultTypes = [];
        this.isColumnar = false;
        this.userResources = [];
    }

    /**
     * Inheritance property
     */
    MathParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    MathParameter.prototype.constructor = MathParameter;

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MathParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method setResultTypes
     * @param {Array}
     */
    MathParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };
    /**
     * Get the math result result orientation to columnar operations
     *
     * @method getIsColumnar
     * @returns boolean
     */
    MathParameter.prototype.getIsColumnar = function () {
        return this.isColumnar;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @method setIsColumnar
     * @param  boolean
     */
    MathParameter.prototype.setIsColumnar = function (isColumnar) {
        this.resultTypes = isColumnar;
    };
    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MathParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array}
     */
    MathParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number}
     */
    MathParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    // Export
    scope.MathParameter = MathParameter;
})(MyScript);