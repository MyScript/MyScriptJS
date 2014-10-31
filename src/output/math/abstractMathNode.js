(function (scope) {

    /**
     *
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
     *
     * @returns {String}
     */
    MathNode.prototype.getName = function () {
        return this.name;
    };

    /**
     *
     * @returns {String}
     */
    MathNode.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MathNode = MathNode;
})(MyScript);