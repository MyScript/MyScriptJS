/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function AbstractShapePrimitive () {
        this.type = null;
    }

    /**
     *
     * @type {Object}
     */
    AbstractShapePrimitive.prototype = Object.create(Object.prototype);

    /**
     *
     * @returns {string}
     */
    AbstractShapePrimitive.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractShapePrimitive.prototype.isLine = function () {
        return this.type === 'line';
    };

    /**
     *
     * @returns {boolean}
     */
    AbstractShapePrimitive.prototype.isEllipse = function () {
        return this.type === 'ellipse';
    };

    /**
     *
     * @type {AbstractShapePrimitive}
     */
    scope.AbstractShapePrimitive = AbstractShapePrimitive;
})(MyScript);