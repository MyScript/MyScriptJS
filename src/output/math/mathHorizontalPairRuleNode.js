(function (scope) {

	/**
	 * Math horizontal pair rule node
	 *
	 * @class MathHorizontalPairRuleNode
	 * @extends MathRuleNode
	 * @param {Object} obj
	 * @constructor
	 */
	function MathHorizontalPairRuleNode (obj) {
		scope.MathRuleNode.call(this, obj);
	}

	/**
	 * Inheritance property
	 */
	MathHorizontalPairRuleNode.prototype = new scope.MathRuleNode();

	/**
	 * Constructor property
	 */
	MathHorizontalPairRuleNode.prototype.constructor = MathHorizontalPairRuleNode;

	/**
	 * Compute bounding boxes function of children boxes
	 */
	MathHorizontalPairRuleNode.prototype.computeBoxes = function () {
		var height = Math.max.apply(Math, [
			this.getChildren()[0].getBoundingBox().getHeight(),
			this.getChildren()[1].getBoundingBox().getHeight()
		]);

		// Normalize height
		for (var i in this.getChildren()) {
			this.getChildren()[i].getBoundingBox().setWidth((height * this.getChildren()[i].getBoundingBox().getWidth()) / this.getChildren()[i].getBoundingBox().getHeight());
			this.getChildren()[i].getBoundingBox().setHeight(height);
		}

		// Positioning boxes - ref = Left term // Ugly hack TODO: find another way
		// Right term
		this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX() + this.getChildren()[0].getBoundingBox().getWidth());
		this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY());
	};

	// Export
	scope.MathHorizontalPairRuleNode = MathHorizontalPairRuleNode;
})(MyScript);