'use strict';

(function (scope) {
    /**
     * Music clef
     * default values: symbol='G', octave=0
     *
     * @class MusicClef
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicClef(obj) {
        scope.MusicElement.call(this, obj);
        this.symbol = 'G';
        this.octave = 0;
        if (obj) {
            this.line = obj.line;
            this.yAnchor = obj.yAnchor;
            this.octave = obj.octave;
            this.symbol = obj.symbol;
        }
    }

    /**
     * Inheritance property
     */
    MusicClef.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicClef.prototype.constructor = MusicClef;

    /**
     * Get y anchor
     *
     * @method getYAnchor
     * @returns {Number}
     */
    MusicClef.prototype.getYAnchor = function () {
        return this.yAnchor;
    };

    /**
     * Set y anchor
     *
     * @method setYAnchor
     * @param {Number} yAnchor
     */
    MusicClef.prototype.setYAnchor = function (yAnchor) {
        this.yAnchor = yAnchor;
    };

    /**
     * Get line
     *
     * @method getLine
     * @returns {Number}
     */
    MusicClef.prototype.getLine = function () {
        return this.line;
    };

    /**
     * Set line
     *
     * @method setLine
     * @param {Number} line
     */
    MusicClef.prototype.setLine = function (line) {
        this.line = line;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicClef.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Set octave
     *
     * @method setOctave
     * @param {Number} octave
     */
    MusicClef.prototype.setOctave = function (octave) {
        this.octave = octave;
    };

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicClef.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicClef.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    // Export
    scope.MusicClef = MusicClef;
})(MyScript);