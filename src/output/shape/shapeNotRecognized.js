(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeNotRecognized (obj) {
        scope.ShapeCandidate.call(this, obj);
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
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