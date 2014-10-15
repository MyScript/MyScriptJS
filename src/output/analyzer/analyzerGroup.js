/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerGroup () {
        this.elementReferences = [];
        this.type = null;
        this.uniqueID = null;
    }

    /**
     *
     * @type {AnalyzerElement}
     */
    AnalyzerGroup.prototype = Object.create(scope.AnalyzerElement.prototype);

    /**
     * @returns {Array}
     */
    AnalyzerGroup.prototype.getElementReferences = function () {
        return this.elementReferences;
    };

    /**
     * @returns {string}
     */
    AnalyzerGroup.prototype.getType = function () {
        return this.type;
    };

    /**
     * @returns {string}
     */
    AnalyzerGroup.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     *
     * @type {AnalyzerGroup}
     */
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);