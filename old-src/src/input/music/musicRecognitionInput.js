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

    // Export
    scope.MusicRecognitionInput = MusicRecognitionInput;
})(MyScript);
