(function (scope) {

    /**
     * Math exponentiable non-terminal node
     *
     * @class MathExponentiableNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathExponentiableNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathExponentiableNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathExponentiableNonTerminalNode.prototype.constructor = MathExponentiableNonTerminalNode;

    // Export
    scope.MathExponentiableNonTerminalNode = MathExponentiableNonTerminalNode;
})(MyScript);