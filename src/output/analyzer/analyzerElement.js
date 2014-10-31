(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElement (obj) {
        if (obj) {
            this.elementType = obj.elementType;
        }
    }

    /**
     * @returns {String}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);