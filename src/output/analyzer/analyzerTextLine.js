'use strict';

(function (scope) {
    /**
     * Analyzer text line
     *
     * @class AnalyzerTextLine
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerTextLine(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        this.underlineList = [];
        if (obj) {
            this.data = new scope.AnalyzerTextLineData(obj.data);
            this.result = new scope.TextDocument(obj.result);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.underlineList) {
                this.underlineList.push(new scope.AnalyzerUnderline(obj.underlineList[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerTextLine.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerTextLine.prototype.constructor = AnalyzerTextLine;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerTextLineData}
     */
    AnalyzerTextLine.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get text document
     *
     * @method getTextDocument
     * @returns {TextDocument}
     */
    AnalyzerTextLine.prototype.getTextDocument = function () {
        return this.result;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerTextLine.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get underline list
     *
     * @method getUnderlineList
     * @returns {AnalyzerUnderline[]}
     */
    AnalyzerTextLine.prototype.getUnderlineList = function () {
        return this.underlineList;
    };

    // Export
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);