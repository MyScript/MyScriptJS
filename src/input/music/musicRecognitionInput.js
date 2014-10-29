(function (scope) {

    /**
     * @constructor
     */
    function MusicRecognitionInput () {
    }

    /**
     *
     * @type {MyScript.AbstractRecognitionInput}
     */
    MusicRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     *
     * @type {MusicRecognitionInput}
     */
    MusicRecognitionInput.prototype.constructor = MusicRecognitionInput;

    /**
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * @param {Array} components
     */
    MusicRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    /**
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getResultTypes = function () {
        return this.doBeautification;
    };

    /**
     * @param {Array} resultTypes
     */
    MusicRecognitionInput.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * @returns {Array}
     */
    MusicRecognitionInput.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array} userResources
     */
    MusicRecognitionInput.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * @returns {number}
     */
    MusicRecognitionInput.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * @param {number} scratchOutDetectionSensitivity
     */
    MusicRecognitionInput.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * @returns {MusicStaff}
     */
    MusicRecognitionInput.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * @param {MusicStaff} staff
     */
    MusicRecognitionInput.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * @returns {number}
     */
    MusicRecognitionInput.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * @param {number} divisions
     */
    MusicRecognitionInput.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicRecognitionInput = MusicRecognitionInput;
})(MyScript);