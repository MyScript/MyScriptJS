/**
 *
 * @param scope
 */
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
    AnalyzerUnderlineData.prototype = Object.create(Object.prototype);

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

    /**
     *
     * @type {AnalyzerUnderlineData}
     */
    scope.AnalyzerUnderlineData = AnalyzerUnderlineData;
})(MyScript);