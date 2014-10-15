/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerElementReference () {
        this.uniqueID = null;
        this.type = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerElementReference.prototype = Object.create(Object.prototype);

    /**
     * @returns {string}
     */
    AnalyzerElementReference.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * @returns {string}
     */
    AnalyzerElementReference.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @type {AnalyzerElementReference}
     */
    scope.AnalyzerElementReference = AnalyzerElementReference;
})(MyScript);