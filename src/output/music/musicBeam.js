(function (scope) {

    /**
     * Music beam
     *
     * @class MusicBeam
     * @extends AbstractMusicElement
     * @param {Object} obj
     * @constructor
     */
    function MusicBeam (obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
            this.leftCount = obj.leftCount;
            this.rightCount = obj.rightCount;
        }
    }

    /**
     * Inheritance property
     */
    MusicBeam.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBeam.prototype.constructor = MusicBeam;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicBeam.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Get left count
     *
     * @method getLeftCount
     * @returns {Number}
     */
    MusicBeam.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Get right count
     *
     * @method getRightCount
     * @returns {Number}
     */
    MusicBeam.prototype.getRightCount = function () {
        return this.rightCount;
    };

    // Export
    scope.MusicBeam = MusicBeam;
})(MyScript);