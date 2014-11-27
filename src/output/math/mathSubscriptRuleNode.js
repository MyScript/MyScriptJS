(function (scope) {

	/**
	 * Math subscript rule node
	 *
	 * @class MathSubscriptRuleNode
	 * @extends MathRuleNode
	 * @param {Object} obj
	 * @constructor
	 */
	function MathSubscriptRuleNode (obj) {
		scope.MathRuleNode.call(this, obj);
	}

	/**
	 * Inheritance property
	 */
	MathSubscriptRuleNode.prototype = new scope.MathRuleNode();

	/**
	 * Constructor property
	 */
	MathSubscriptRuleNode.prototype.constructor = MathSubscriptRuleNode;

	/**
	 * Compute bounding boxes function of children boxes
	 */
	MathSubscriptRuleNode.prototype.computeBoxes = function () {
		var height = Math.max.apply(Math, [
			this.getChildren()[0].getBoundingBox().getHeight(),
			this.getChildren()[1].getBoundingBox().getHeight()
		]);

		// Normalize height
		this.getChildren()[0].getBoundingBox().setHeight(height);
		this.getChildren()[1].getBoundingBox().setHeight(height * (2 /3));

		// Positioning boxes - ref = Term // Ugly hack TODO: find another way
		this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
		this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + (height * (1 /3)));
	};

	// Export
	scope.MathSubscriptRuleNode = MathSubscriptRuleNode;
})(MyScript);