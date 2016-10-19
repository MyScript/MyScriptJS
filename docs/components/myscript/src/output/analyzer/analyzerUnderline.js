'use strict';

(function (scope) {
    /**
     * Analyzer underline
     *
     * @class AnalyzerUnderline
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerUnderline(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerUnderlineData(obj.data);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerUnderline.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerUnderline.prototype.constructor = AnalyzerUnderline;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerUnderlineData}
     */
    AnalyzerUnderline.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerUnderline.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);