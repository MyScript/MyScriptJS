'use strict';

(function (scope) {
    /**
     * Math border non-terminal node
     *
     * @class MathBorderNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathBorderNonTerminalNode(obj) {
        scope.MathNonTerminalNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathBorderData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathBorderNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathBorderNonTerminalNode.prototype.constructor = MathBorderNonTerminalNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathBorderData}
     */
    MathBorderNonTerminalNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathBorderNonTerminalNode = MathBorderNonTerminalNode;
})(MyScript);
