/**
 *
 * @param scope
 */
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
    AnalyzerElement.prototype = Object.create(Object.prototype);

    /**
     * @returns {string}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     *
     * @type {AnalyzerElement}
     */
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);