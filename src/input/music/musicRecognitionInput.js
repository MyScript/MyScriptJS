'use strict';

(function (scope) {
    /**
     * Recognition input object for music recognition
     *
     * @class MusicRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MusicRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MusicRecognitionInput.prototype.constructor = MusicRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MusicParameter}
     */
    MusicRecognitionInput.prototype.getParameters = function () {
        return new MusicParameter({
            divisions: this.divisions,
            staff: this.staff,
            scratchOutDetectionSensitivity: this.scratchOutDetectionSensitivity,
            resultTypes: this.resultTypes,
            userResources: this.userResources
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MusicParameter} parameters
     */
    MusicRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.divisions = parameters.getDivisions();
            this.staff = parameters.getStaff();
            this.scratchOutDetectionSensitivity = parameters.getScratchOutDetectionSensitivity();
            this.resultTypes = parameters.getResultTypes();
            this.userResources = parameters.getUserResources();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MusicRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MusicRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * Get the result types
     *
     * @deprecated Use getParameters instead of getResultTypes
     * @method getResultTypes
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the result types
     *
     * @deprecated Use setParameters instead of setResultTypes
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MusicRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the user resources
     *
     * @deprecated Use getParameters instead of getUserResources
     * @method getUserResources
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @deprecated Use setParameters instead of setUserResources
     * @method setUserResources
     * @param {Array} userResources
     */
    MusicRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @deprecated Use getParameters instead of getScratchOutDetectionSensitivity
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MusicRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @deprecated Use setParameters instead of setScratchOutDetectionSensitivity
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MusicRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * Get the staff
     *
     * @deprecated Use getParameters instead of getStaff
     * @method getStaff
     * @returns {MusicStaff}
     */
    MusicRecognitionInput.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * Set the staff
     *
     * @deprecated Use setParameters instead of setStaff
     * @method setStaff
     * @param {MusicStaff} staff
     */
    MusicRecognitionInput.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * Get the number of divisions
     *
     * @deprecated Use getParameters instead of getDivisions
     * @method getDivisions
     * @returns {Number}
     */
    MusicRecognitionInput.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * Set the number of divisions
     *
     * @deprecated Use setParameters instead of setDivisions
     * @method setDivisions
     * @param {Number} divisions
     */
    MusicRecognitionInput.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicRecognitionInput = MusicRecognitionInput;
})(MyScript);
