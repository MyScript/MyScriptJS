(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerUnderline (obj) {
        scope.AnalyzerElement.call(this, obj);
        this.data = null;
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerUnderlineData(obj.data);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
        }
    }

    /**
     *
     * @type {MyScript.AnalyzerElement}
     */
    AnalyzerUnderline.prototype = new scope.AnalyzerElement();

    /**
     *
     * @type {AnalyzerUnderline}
     */
    AnalyzerUnderline.prototype.constructor = AnalyzerUnderline;

    /**
     *
     * @returns {AnalyzerUnderlineData}
     */
    AnalyzerUnderline.prototype.getData = function () {
        return this.data;
    };

    /**
     *
     * @returns {Array}
     */
    AnalyzerUnderline.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);