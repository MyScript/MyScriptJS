(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerDocument (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.textLines = [];
        this.shapes = [];
        this.tables = [];
        this.groups = [];
        if (obj) {
            for (var i in obj.textLines) {
                this.textLines.push(new scope.AnalyzerTextLine(obj.textLines[i]));
            }
            for (var j in obj.shapes) {
                this.shapes.push(new scope.ShapeSegment(obj.shapes[j]));
            }
            for (var k in obj.tables) {
                this.tables.push(new scope.AnalyzerTable(obj.tables[k]));
            }
            for (var l in obj.groups) {
                this.groups.push(new scope.AnalyzerGroup(obj.groups[l]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerDocument.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerDocument}
     */
    AnalyzerDocument.prototype.constructor = AnalyzerDocument;

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