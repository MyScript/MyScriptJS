(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function MusicResult (obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
            this.result = new scope.MusicDocument(obj.result);
        }
    }

    /**
     *
     * @returns {string}
     */
    MusicResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

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