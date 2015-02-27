'use strict';

(function (scope) {
    /**
     * Abstract decorated shape
     *
     * @class AbstractDecoratedShape
     * @extends AbstractShapePrimitive
     * @param {Object} [obj]
     * @constructor
     */
    function AbstractDecoratedShape (obj) {
        scope.AbstractShapePrimitive.call(this, obj);
        if (obj) {
            this.beginDecoration = obj.beginDecoration;
            this.beginTangentAngle = obj.beginTangentAngle;
            this.endDecoration = obj.endDecoration;
            this.endTangentAngle = obj.endTangentAngle;
        }
    }

    /**
     * Inheritance property
     */
    AbstractDecoratedShape.prototype = new scope.AbstractShapePrimitive();

    /**
     * Constructor property
     */
    AbstractDecoratedShape.prototype.constructor = AbstractDecoratedShape;

    /**
     * Has begin decoration
     *
     * @method hasBeginDecoration
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasBeginDecoration = function () {
        return typeof this.beginDecoration !== 'undefined';
    };

    /**
     * Has end decoration
     *
     * @method hasEndDecoration
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasEndDecoration = function () {
        return typeof this.endDecoration !== 'undefined';
    };

    /**
     * Get begin decoration
     *
     * @method getBeginDecoration
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getBeginDecoration = function () {
        return this.beginDecoration;
    };

    /**
     * Get end decoration
     *
     * @method getEndDecoration
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getEndDecoration = function () {
        return this.endDecoration;
    };

    /**
     * Get begin tangent angle
     *
     * @method getBeginTangentAngle
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getBeginTangentAngle = function () {
        return this.beginTangentAngle;
    };

    /**
     * Get end tangent angle
     *
     * @method getEndTangentAngle
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getEndTangentAngle = function () {
        return this.endTangentAngle;
    };

    // Export
    scope.AbstractDecoratedShape = AbstractDecoratedShape;
})(MyScript);