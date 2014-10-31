(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractShapePrimitive (obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     *
     * @returns {String}
     */
    AbstractShapePrimitive.prototype.getType = function () {
        return this.type;
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isLine = function () {
        return this.type === 'line';
    };

    /**
     *
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isEllipse = function () {
        return this.type === 'ellipse';
    };

    // Export
    scope.AbstractShapePrimitive = AbstractShapePrimitive;
})(MyScript);