(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeRecognized () {
        this.primitives = [];
        this.label = null;
        this.normalizedRecognitionScore = null;
        this.resemblanceScore = null;
    }

    /**
     *
     * @type {MyScript.ShapeCandidate}
     */
    ShapeRecognized.prototype = new scope.ShapeCandidate();

    /**
     *
     * @type {ShapeRecognized}
     */
    ShapeRecognized.prototype.constructor = ShapeRecognized;

    /**
     *
     * @returns {Array}
     */
    ShapeRecognized.prototype.getPrimitives = function () {
        return this.primitives;
    };

    /**
     *
     * @returns {string}
     */
    ShapeRecognized.prototype.getLabel = function () {
        return this.label;
    };

    /**
     *
     * @returns {number}
     */
    ShapeRecognized.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    /**
     *
     * @returns {number}
     */
    ShapeRecognized.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    // Export
    scope.ShapeRecognized = ShapeRecognized;
})(MyScript);