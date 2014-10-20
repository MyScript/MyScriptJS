(function (scope) {

    /**
     * Parameters used for music recognition
     * @constructor
     */
    function MusicParameter () {
        this.resultTypes = [];
        this.userResources = [];
    }

    /**
     *
     * @type {MyScript.AbstractParameter}
     */
    MusicParameter.prototype = new scope.AbstractParameter();

    /**
     *
     * @type {MusicParameter}
     */
    MusicParameter.prototype.constructor = MusicParameter;

    /**
     * @returns {Array}
     */
    MusicParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * @param {Array}
     */
    MusicParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * @returns {Array}
     */
    MusicParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array}
     */
    MusicParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * @returns {number}
     */
    MusicParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * @param {number}
     */
    MusicParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * @returns {MusicStaff}
     */
    MusicParameter.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * @param {MusicStaff}
     */
    MusicParameter.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * @returns {number}
     */
    MusicParameter.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * @param {number}
     */
    MusicParameter.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicParameter = MusicParameter;
})(MyScript);