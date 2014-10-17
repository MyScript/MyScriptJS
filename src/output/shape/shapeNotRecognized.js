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
    ShapeNotRecognized.prototype.__proto__ = new scope.ShapeCandidate();

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);