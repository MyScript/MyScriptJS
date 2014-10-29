(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerUnderlineData (obj) {
        if (obj) {
            this.firstCharacter = obj.firstCharacter;
            this.lastCharacter = obj.lastCharacter;
        }
    }

    /**
     *
     * @returns {null|*}
     */
    AnalyzerUnderlineData.prototype.getFirstCharacter = function () {
        return this.firstCharacter;
    };

    /**
     *
     * @returns {null|*}
     */
    AnalyzerUnderlineData.prototype.getLastCharacter = function () {
        return this.lastCharacter;
    };

    // Export
    scope.AnalyzerUnderlineData = AnalyzerUnderlineData;
})(MyScript);