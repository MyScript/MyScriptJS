(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathSqrtNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathSqrtNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSqrtNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathSqrtNonTerminalNode.prototype.constructor = MathSqrtNonTerminalNode;

    // Export
    scope.MathSqrtNonTerminalNode = MathSqrtNonTerminalNode;
})(MyScript);
