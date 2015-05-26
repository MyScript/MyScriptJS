'use strict';

(function (scope) {
    /**
     * Math table rule node
     *
     * @class MathTableRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathTableRuleNode(obj) {
        scope.MathRuleNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathTableData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathTableRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathTableRuleNode.prototype.constructor = MathTableRuleNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathTableData}
     */
    MathTableRuleNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathTableRuleNode = MathTableRuleNode;
})(MyScript);
