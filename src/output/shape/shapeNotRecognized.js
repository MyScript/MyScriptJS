(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeNotRecognized () {
    }

    /**
     *
     * @type {MyScript.ShapeCandidate}
     */
    ShapeNotRecognized.prototype = new scope.ShapeCandidate();

    /**
     *
     * @type {ShapeNotRecognized}
     */
    ShapeNotRecognized.prototype.constructor = ShapeNotRecognized;

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);