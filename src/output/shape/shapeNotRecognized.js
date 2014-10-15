/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeNotRecognized () {
    }


    /**
     *
     * @type {ShapeCandidate}
     */
    ShapeNotRecognized.prototype = Object.create(scope.ShapeCandidate.prototype);

    /**
     *
     * @type {ShapeNotRecognized}
     */
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);