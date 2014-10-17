(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeErased () {
    }

    /**
     *
     * @type {MyScript.ShapeCandidate}
     */
    ShapeErased.prototype = new scope.ShapeCandidate();

    /**
     *
     * @type {ShapeErased}
     */
    ShapeErased.prototype.constructor = ShapeErased;

    // Export
    scope.ShapeErased = ShapeErased;
})(MyScript);