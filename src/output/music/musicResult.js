(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicResult (obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MusicDocument(obj.result);
        }
    }

    /**
     *
     * @type {MyScript.AbstractResult}
     */
    MusicResult.prototype = new scope.AbstractResult();

    /**
     *
     * @type {MusicResult}
     */
    MusicResult.prototype.constructor = MusicResult;

    /**
     *
     * @returns {MusicDocument}
     */
    MusicResult.prototype.getMusicDocument = function () {
        return this.result;
    };

    // Export
    scope.MusicResult = MusicResult;
})(MyScript);