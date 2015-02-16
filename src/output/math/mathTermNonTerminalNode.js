(function (scope) {
    'use strict';
    /**
     * Math term non-terminal node
     *
     * @class MathTermNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathTermNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathTermNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathTermNonTerminalNode.prototype.constructor = MathTermNonTerminalNode;

    // Export
    scope.MathTermNonTerminalNode = MathTermNonTerminalNode;
})(MyScript);
