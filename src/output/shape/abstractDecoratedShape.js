(function (scope) {

    /**
     * Abstract decorated shape
     *
     * @class AbstractDecoratedShape
     * @extends AbstractShapePrimitive
     * @param {Object} obj
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
     *
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasBeginDecoration = function () {
        return typeof this.beginDecoration !== 'undefined';
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractDecoratedShape.prototype.hasEndDecoration = function () {
        return typeof this.endDecoration !== 'undefined';
    };

    /**
     *
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getBeginDecoration = function () {
        return this.beginDecoration;
    };

    /**
     *
     * @returns {String}
     */
    AbstractDecoratedShape.prototype.getEndDecoration = function () {
        return this.endDecoration;
    };

    /**
     *
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getBeginTangentAngle = function () {
        return this.beginTangentAngle;
    };

    /**
     *
     * @returns {Number}
     */
    AbstractDecoratedShape.prototype.getEndTangentAngle = function () {
        return this.endTangentAngle;
    };

    // Export
    scope.AbstractDecoratedShape = AbstractDecoratedShape;
})(MyScript);