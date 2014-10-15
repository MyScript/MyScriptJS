/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeErased () {
    }


    /**
     *
     * @type {ShapeCandidate}
     */
    ShapeErased.prototype = Object.create(scope.ShapeCandidate.prototype);

    /**
     *
     * @type {AnalyzerElementReference}
     */
    scope.ShapeErased = ShapeErased;
})(MyScript);