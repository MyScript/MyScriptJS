(function (scope) {
    'use strict';
    /**
     * Math rule node
     *
     * @class MathRuleNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathRuleNode(obj) {
        scope.MathNode.call(this, obj);
        this.children = [];
        if (obj) {
            this.name = obj.name;
            for (var i in obj.children) {
                switch (obj.children[i].type) {
                    case 'nonTerminalNode':
                        this.children.push(new scope.MathNonTerminalNode(obj.children[i]));
                        break;
                    case 'terminalNode':
                        this.children.push(new scope.MathTerminalNode(obj.children[i]));
                        break;
                    case 'rule':
                        this.children.push(new scope.MathRuleNode(obj.children[i]));
                        break;
                    case 'cell':
                        this.children.push(new scope.MathCellNonTerminalNode(obj.children[i]));
                        break;
                    case 'border':
                        this.children.push(new scope.MathBorderNonTerminalNode(obj.children[i]));
                        break;
                    case 'table':
                        this.children.push(new scope.MathTableRuleNode(obj.children[i]));
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.children[i].type);
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathRuleNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathRuleNode.prototype.constructor = MathRuleNode;

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathRuleNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {MathNode[]}
     */
    MathRuleNode.prototype.getChildren = function () {
        return this.children;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathRuleNode.prototype.getInkRanges = function () {
        var inkRanges = [];
        for (var i in this.getChildren()) {
            var childInkRanges = this.getChildren()[i].getInkRanges();
            for (var j in childInkRanges) {
                inkRanges.push(childInkRanges[j]);
            }
        }
        return inkRanges;
    };

    // Export
    scope.MathRuleNode = MathRuleNode;
})(MyScript);