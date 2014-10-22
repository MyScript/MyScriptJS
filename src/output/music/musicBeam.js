(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicBeam (obj) {
        scope.AbstractMusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
            this.leftCount = obj.leftCount;
            this.rightCount = obj.rightCount;
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicBeam.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicBeam}
     */
    MusicBeam.prototype.constructor = MusicBeam;

    /**
     *
     * @returns {string}
     */
    MusicBeam.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     *
     * @returns {number}
     */
    MusicBeam.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     *
     * @returns {number}
     */
    MusicBeam.prototype.getRightCount = function () {
        return this.rightCount;
    };

    // Export
    scope.MusicBeam = MusicBeam;
})(MyScript);