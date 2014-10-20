(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerTextLine (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.data = null;
        this.result = null;
        this.inkRanges = [];
        this.underlineList = [];
        if (obj) {
            this.data = new scope.AnalyzerTextLineData(obj.data);
            this.result = obj.result;
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.underlineList) {
                this.underlineList.push(new scope.AnalyzerUnderline(obj.inkRanges[j]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerTextLine.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerTextLine}
     */
    AnalyzerTextLine.prototype.constructor = AnalyzerTextLine;

    /**
     *
     * @returns {AnalyzerTextLineData}
     */
    AnalyzerTextLine.prototype.getData = function () {
        return this.data;
    };

    /**
     *
     * @returns {null|*}
     */
    AnalyzerTextLine.prototype.getResult = function () {
        return this.result;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTextLine.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerTextLine.prototype.getUnderlineList = function () {
        return this.underlineList;
    };

    // Export
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);