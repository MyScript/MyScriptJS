(function (scope) {

    /**
     * MusicXML result
     *
     * @class MusicXMLResultElement
     * @extends AbstractMusicResultElement
     * @param {Object} obj
     * @constructor
     */
    function MusicXMLResultElement (obj) {
        scope.AbstractMusicResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MusicXMLResultElement.prototype = new scope.AbstractMusicResultElement();

    /**
     * Constructor property
     */
    MusicXMLResultElement.prototype.constructor = MusicXMLResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MusicXMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MusicXMLResultElement = MusicXMLResultElement;
})(MyScript);