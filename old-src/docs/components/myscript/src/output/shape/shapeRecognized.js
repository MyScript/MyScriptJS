'use strict';

(function (scope) {
    /**
     * Shape recognized
     *
     * @class ShapeRecognized
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeRecognized(obj) {
        scope.ShapeCandidate.call(this, obj);
        this.primitives = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
            this.resemblanceScore = obj.resemblanceScore;
            for (var i in obj.primitives) {
                switch (obj.primitives[i].type) {
                    case 'line':
                        this.primitives.push(new scope.ShapeLine(obj.primitives[i]));
                        break;
                    case 'ellipse':
                        this.primitives.push(new scope.ShapeEllipse(obj.primitives[i]));
                        break;
                    default:
                        throw new Error('Unknown shape primitive');
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeRecognized.prototype.constructor = ShapeRecognized;

    /**
     * Get primitives
     *
     * @method getPrimitives
     * @returns {AbstractShapePrimitive[]}
     */
    ShapeRecognized.prototype.getPrimitives = function () {
        return this.primitives;
    };

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    ShapeRecognized.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedRecognitionScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    // Export
    scope.ShapeRecognized = ShapeRecognized;
})(MyScript);