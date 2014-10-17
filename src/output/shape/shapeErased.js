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
    ShapeErased.prototype.__proto__ = new scope.ShapeCandidate();

    // Export
    scope.ShapeErased = ShapeErased;
})(MyScript);