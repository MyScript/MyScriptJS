'use strict';

(function (scope) {
    /**
     * Math cell non-terminal node
     *
     * @class MathCellNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathCellNonTerminalNode(obj) {
        scope.MathNonTerminalNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathCellData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathCellNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathCellNonTerminalNode.prototype.constructor = MathCellNonTerminalNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathCellData}
     */
    MathCellNonTerminalNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathCellNonTerminalNode = MathCellNonTerminalNode;
})(MyScript);
