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
     * @type {Object}
     */
    ShapeDocument.prototype.__proto__ = new Object();

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