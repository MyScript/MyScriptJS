'use strict';

(function (scope) {
    /**
     * Math term non-terminal node
     *
     * @class MathSystemNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathSystemNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathSystemNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathSystemNonTerminalNode.prototype.constructor = MathSystemNonTerminalNode;

    // Export
    scope.MathSystemNonTerminalNode = MathSystemNonTerminalNode;
})(MyScript);
