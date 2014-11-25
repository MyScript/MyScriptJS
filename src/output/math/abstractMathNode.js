(function (scope) {

    /**
     * Math node
     *
     * @class MathNode
     * @param {Object} obj
     * @constructor
     */
    function MathNode (obj) {
        if (obj) {
            this.name = obj.name;
            this.type = obj.type;
        }
    }

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathNode.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    MathNode.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set bounding box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    MathNode.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.MathNode = MathNode;
})(MyScript);