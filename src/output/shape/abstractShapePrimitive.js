(function (scope) {

    /**
     *
     * @param {Object} obj
     * @constructor
     */
    function AbstractShapePrimitive (obj) {
        this.type = null;
        if (obj) {
            this.type = obj.type;
        }
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