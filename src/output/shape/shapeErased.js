(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function ShapeErased (obj) {
        scope.ShapeCandidate.call(this, obj);
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