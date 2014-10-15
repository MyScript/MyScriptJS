/**
 *
 * @param scope
 */
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
     * @type {AbstractParameter}
     */
    MusicParameter.prototype = Object.create(scope.AbstractParameter.prototype);

    /**
     *
     * @type {Array}
     */
    MusicParameter.prototype.resultTypes = null;

    /**
     *
     * @type {Array}
     */
    MusicParameter.prototype.userResources = null;

    /**
     *
     * @type {Array}
     */
    MusicParameter.prototype.scratchOutDetectionSensitivity = null;

    /**
     *
     * @type {Array}
     */
    MusicParameter.prototype.staff = null;

    /**
     *
     * @type {Array}
     */
    MusicParameter.prototype.divisions = null;

    /**
     *
     */
    MusicParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     *
     */
    MusicParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     *
     */
    MusicParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     *
     */
    MusicParameter.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     *
     */
    MusicParameter.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     *
     * @type {MusicParameter}
     */
    scope.MusicParameter = MusicParameter;
})(MyScript);