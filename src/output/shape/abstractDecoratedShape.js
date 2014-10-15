/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AbstractDecoratedShape () {
        this.beginDecoration = null;
        this.beginTangentAngle = null;
        this.endDecoration = null;
        this.endTangentAngle = null;
    }

    /**
     *
     * @type {AbstractShapePrimitive}
     */
    AbstractDecoratedShape.prototype = Object.create(scope.AbstractShapePrimitive.prototype);

    /**
     *
     * @returns {boolean}
     */
    AbstractDecoratedShape.prototype.hasBeginDecoration = function () {
        return this.beginDecoration && this.beginTangentAngle;
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractDecoratedShape.prototype.hasEndDecoration = function () {
        return this.endDecoration && this.endTangentAngle;
    };

    /**
     *
     * @returns {string}
     */
    AbstractDecoratedShape.prototype.getBeginDecoration = function () {
        return this.beginDecoration;
    };

    /**
     *
     * @returns {string}
     */
    AbstractDecoratedShape.prototype.getEndDecoration = function () {
        return this.endDecoration;
    };

    /**
     *
     * @returns {number}
     */
    AbstractDecoratedShape.prototype.getBeginTangentAngle = function () {
        return this.beginTangentAngle;
    };

    /**
     *
     * @returns {number}
     */
    AbstractDecoratedShape.prototype.getEndTangentAngle = function () {
        return this.endTangentAngle;
    };

    /**
     *
     * @type {AbstractDecoratedShape}
     */
    scope.AbstractDecoratedShape = AbstractDecoratedShape;
})(MyScript);