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
    AnalyzerGroup.prototype.__proto__ = new scope.AnalyzerElement();

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

    // Export
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);