(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerElement () {
        this.elementType = null;
    }

    /**
     * @returns {string}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);