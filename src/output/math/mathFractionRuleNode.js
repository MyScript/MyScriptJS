(function (scope) {

    /**
     * Math fraction rule node
     *
     * @class MathFractionRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathFractionRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
        this.termRatio = 4/9;
    }

    /**
     * Inheritance property
     */
    MathFractionRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathFractionRuleNode.prototype.constructor = MathFractionRuleNode;

    /**
     * Set term ratio for fraction rendering
     *
     * @method setTermRatio
     * @param {Number} termRatio
     */
    MathFractionRuleNode.prototype.setTermRatio = function (termRatio) {
        this.termRatio = termRatio;
    };

    /**
     * Get term ratio for fraction rendering
     *
     * @method getTermRatio
     * @returns {Number}
     */
    MathFractionRuleNode.prototype.getTermRatio = function () {
        return this.termRatio;
    };

    MathFractionRuleNode.prototype.getNumeratorRect = function () {
        var rect;
        if (this.getBoundingBox()) {
            rect = new scope.Rectangle();
            rect.setWidth(this.getBoundingBox().getWidth());
            rect.setHeight(this.getBoundingBox().getHeight() * this.termRatio);
            rect.setX(this.getBoundingBox().getX());
            rect.setY(this.getBoundingBox().getY());
        }
        return rect;
    };

    MathFractionRuleNode.prototype.getDenominatorRect = function () {
        var rect;
        if (this.getBoundingBox()) {
            rect = new scope.Rectangle();
            rect.setWidth(this.getBoundingBox().getWidth());
            rect.setHeight(this.getBoundingBox().getHeight() * this.termRatio);
            rect.setX(this.getBoundingBox().getX());
            rect.setY((this.getBoundingBox().getY() + this.getBoundingBox().getHeight()) - this.getNumeratorRect().getHeight());
        }
        return rect;
    };

    MathFractionRuleNode.prototype.getFractionBarRect = function () {
        var rect;
        if (this.getBoundingBox()) {
            rect = new scope.Rectangle();
            rect.setWidth(this.getBoundingBox().getWidth());
            rect.setHeight(this.getBoundingBox().getHeight() * (1 - (this.termRatio * 2)));
            rect.setX(this.getBoundingBox().getX());
            rect.setY(this.getBoundingBox().getY() + (this.getBoundingBox().getHeight() * this.termRatio));
        }
        return rect;

    };

    // Export
    scope.MathFractionRuleNode = MathFractionRuleNode;
})(MyScript);