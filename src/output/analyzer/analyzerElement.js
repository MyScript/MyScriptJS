(function (scope) {
    'use strict';
    /**
     * Analyzer element
     *
     * @class AnalyzerElement
     * @param {Object} obj
     * @constructor
     */
    function AnalyzerElement (obj) {
        if (obj) {
            this.elementType = obj.elementType;
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);