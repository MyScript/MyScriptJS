(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElement (obj) {
        this.elementType = null;
        if (obj) {
            this.elementType = obj.elementType;
        }
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