(function (scope) {

    /**
     * Math identity rule node
     *
     * @class MathIdentityRuleNode
     * @extends MathRuleNode
     * @param {Object} obj
     * @constructor
     */
    function MathIdentityRuleNode (obj) {
        scope.MathRuleNode.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathIdentityRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathIdentityRuleNode.prototype.constructor = MathIdentityRuleNode;

    /**
     * Compute bounding boxes function of children boxes
     */
    MathIdentityRuleNode.prototype.computeBoxes = function () {
        //var termsHeights = [
        //    this.getChildren()[0].getHeight()
        //]
        //var normalHeight = Math.max.apply(Math, termsHeights);
        //
        //// Normalize height
        //for (var i in this.getChildren()) {
        //    this.getChildren()[i].setWidth((normalHeight * this.getChildren()[i].getWidth()) / this.getChildren()[i].getHeight());
        //    this.getChildren()[i].setHeight(normalHeight);
        //}

        // Positioning boxes - ref = Term // Ugly hack TODO: find another way
    };

    // Export
    scope.MathIdentityRuleNode = MathIdentityRuleNode;
})(MyScript);