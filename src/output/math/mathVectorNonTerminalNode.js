(function (scope) {

    /**
     * Math term non-terminal node
     *
     * @class MathVectorNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} obj
     * @constructor
     */
    function MathVectorNonTerminalNode (obj) {
        scope.MathNonTerminalNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathVectorNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathVectorNonTerminalNode.prototype.constructor = MathVectorNonTerminalNode;

    // Export
    scope.MathVectorNonTerminalNode = MathVectorNonTerminalNode;
})(MyScript);