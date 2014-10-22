(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicRest (obj) {
        scope.AbstractMusicElement.call(this, obj);
        this.decorations = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.type = obj.type;
            this.dots = new scope.MusicDots(obj.dots);
            this.duration = obj.duration;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AbstractMusicElement}
     */
    MusicRest.prototype = new scope.AbstractMusicElement();

    /**
     *
     * @type {MusicRest}
     */
    MusicRest.prototype.constructor = MusicRest;

    /**
     *
     * @returns {string}
     */
    MusicRest.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {MusicDots}
     */
    MusicRest.prototype.getDots = function () {
        return this.dots;
    };

    /**
     *
     * @returns {number}
     */
    MusicRest.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     *
     * @returns {Array}
     */
    MusicRest.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     *
     * @returns {Array}
     */
    MusicRest.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     *
     * @returns {Array}
     */
    MusicRest.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicRest = MusicRest;
})(MyScript);