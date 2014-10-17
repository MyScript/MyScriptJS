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

    // Export
    scope.AbstractShapePrimitive = AbstractShapePrimitive;
})(MyScript);