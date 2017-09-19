'use strict';

(function (scope) {
    /**
     * Shape not recognized
     *
     * @class ShapeNotRecognized
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeNotRecognized(obj) {
        scope.ShapeCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapeNotRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeNotRecognized.prototype.constructor = ShapeNotRecognized;

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);