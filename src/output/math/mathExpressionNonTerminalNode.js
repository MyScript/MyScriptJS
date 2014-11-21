(function (scope) {

    /**
     * Math expression non-terminal node
     *
     * @class MathExpressionNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathExpressionNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathExpressionNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathExpressionNonTerminalNode.prototype.constructor = MathExpressionNonTerminalNode;

    // Export
    scope.MathExpressionNonTerminalNode = MathExpressionNonTerminalNode;
})(MyScript);