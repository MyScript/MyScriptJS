(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerDocument () {
        this.textLines = [];
        this.shapes = [];
        this.tables = [];
        this.groups = [];
    }

    /**
     *
     * @type {AnalyzerElement}
     */
    AnalyzerDocument.prototype.__proto__ = new scope.AnalyzerElement();

    /**
     * @returns {Array}
     */
    AnalyzerDocument.prototype.getTextLines = function () {
        return this.textLines;
    };

    /**
     * @returns {Array}
     */
    AnalyzerDocument.prototype.getShapes = function () {
        return this.shapes;
    };

    /**
     * @returns {Array}
     */
    AnalyzerDocument.prototype.getTables = function () {
        return this.tables;
    };

    /**
     * @returns {Array}
     */
    AnalyzerDocument.prototype.getGroups = function () {
        return this.groups;
    };

    // Export
    scope.AnalyzerDocument = AnalyzerDocument;
})(MyScript);