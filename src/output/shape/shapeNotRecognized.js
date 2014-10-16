(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeNotRecognized () {
        scope.ShapeCandidate.call(this);
    }

    /**
     *
     * @type {ShapeCandidate}
     */
    ShapeNotRecognized.prototype.__proto__ = new scope.ShapeCandidate();

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);