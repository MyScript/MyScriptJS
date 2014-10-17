(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeDocument () {
        this.segments = [];
    }

    /**
     *
     * @returns {Array}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    // Export
    scope.ShapeDocument = ShapeDocument;
})(MyScript);