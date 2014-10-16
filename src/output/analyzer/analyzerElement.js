(function (scope) {

    /**
     *
     * @constructor
     */
    function AnalyzerElement () {
        this.elementType = null;
    }

    /**
     *
     * @type {Object}
     */
    AnalyzerElement.prototype.__proto__ = new Object();

    /**
     * @returns {string}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);