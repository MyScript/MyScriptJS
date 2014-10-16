(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerUnderlineData () {
        this.firstCharacter = null;
        this.lastCharacter = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerUnderlineData.prototype.__proto__ = new Object();

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