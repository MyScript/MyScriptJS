(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElementReference (obj) {
        if (obj) {
            this.uniqueID = obj.uniqueID;
            this.type = obj.type;
        }
    }

    /**
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerElementReference = AnalyzerElementReference;
})(MyScript);