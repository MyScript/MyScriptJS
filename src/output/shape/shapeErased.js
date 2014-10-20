(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeErased (obj) {
        scope.ShapeCandidate.call(this, obj);
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
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