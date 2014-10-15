/**
 *
 * @param scope
 */
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
    ShapeDocument.prototype = Object.create(Object.prototype);

    /**
     *
     * @returns {Array}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    /**
     *
     * @type {ShapeDocument}
     */
    scope.ShapeDocument = ShapeDocument;
})(MyScript);