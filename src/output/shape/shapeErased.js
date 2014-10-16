(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeErased () {
        scope.ShapeCandidate.call(this);
    }

    /**
     *
     * @type {ShapeCandidate}
     */
    ShapeErased.prototype.__proto__ = new scope.ShapeCandidate();

    // Export
    scope.ShapeErased = ShapeErased;
})(MyScript);