(function (scope) {

    /**
     *
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
     *
     * @type {MyScript.AbstractMusicResultElement}
     */
    MusicXMLResultElement.prototype = new scope.AbstractMusicResultElement();

    /**
     *
     * @type {MusicXMLResultElement}
     */
    MusicXMLResultElement.prototype.constructor = MusicXMLResultElement;

    /**
     *
     * @returns {string}
     */
    MusicXMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MusicXMLResultElement = MusicXMLResultElement;
})(MyScript);