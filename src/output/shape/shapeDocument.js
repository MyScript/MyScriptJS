(function (scope) {
    'use strict';
    /**
     * Shape document
     *
     * @class ShapeDocument
     * @param {Object} obj
     * @constructor
     */
    function ShapeDocument (obj) {
        this.segments = [];
        if (obj) {
            for (var i in obj.segments) {
                this.segments.push(new scope.ShapeSegment(obj.segments[i]));
            }
        }
    }

    /**
     * Get segments
     *
     * @method getSegments
     * @returns {MyScript.ShapeSegment[]}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    // Export
    scope.ShapeDocument = ShapeDocument;
})(MyScript);