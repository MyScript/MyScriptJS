'use strict';

(function (scope) {
    /**
     * Math symbol tree
     *
     * @class MathSymbolTreeResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathSymbolTreeResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            if (obj.root) {
                switch (obj.root.type) {
                    case 'nonTerminalNode':
                        this.root = new scope.MathNonTerminalNode(obj.root);
                        break;
                    case 'terminalNode':
                        this.root = new scope.MathTerminalNode(obj.root);
                        break;
                    case 'rule':
                        this.root = new scope.MathRuleNode(obj.root);
                        break;
                    case 'cell':
                        this.root = new scope.MathCellNonTerminalNode(obj.root);
                        break;
                    case 'border':
                        this.root = new scope.MathBorderNonTerminalNode(obj.root);
                        break;
                    case 'table':
                        this.root = new scope.MathTableRuleNode(obj.root);
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.root.type);
                }
                this.value = JSON.stringify(obj.root, null, '  ');
            } else {
                throw new Error('Missing root');
            }
        }
    }

    /**
     * Inheritance property
     */
    MathSymbolTreeResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathSymbolTreeResultElement.prototype.constructor = MathSymbolTreeResultElement;

    /**
     * Get tree root
     *
     * @method getRoot
     * @returns {MathNode}
     */
    MathSymbolTreeResultElement.prototype.getRoot = function () {
        return this.root;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathSymbolTreeResultElement.prototype.getInkRanges = function () {
        if (this.getRoot()) {
            return this.getRoot().getInkRanges();
        } else {
            throw new Error('No selected candidate');
        }
    };

    /**
    * Get value
    *
    * @method getValue
    * @returns {String}
    */
    MathSymbolTreeResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathSymbolTreeResultElement = MathSymbolTreeResultElement;
})(MyScript);
