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
	 * Compute bounding boxes function of children boxes
	 */
	MathFractionRuleNode.prototype.computeBoxes = function () {
		var height = Math.max.apply(Math, [
			this.getChildren()[0].getBoundingBox().getHeight(),
			this.getChildren()[1].getBoundingBox().getHeight(),
			this.getChildren()[2].getBoundingBox().getHeight()
		]);

		// Normalize height
		for (var i in this.getChildren()) {
			if (i > 0) { // Except fraction bar
				this.getChildren()[i].getBoundingBox().setHeight(height);
			}
		}

		var width = Math.max.apply(Math, [
			this.getChildren()[0].getBoundingBox().getWidth(),
			this.getChildren()[1].getBoundingBox().getWidth(),
			this.getChildren()[2].getBoundingBox().getWidth()
		]);

		// Normalize width
		for (var i in this.getChildren()) {
			this.getChildren()[i].getBoundingBox().setWidth(width);
		}

		// Positioning boxes - ref = Fraction bar // Ugly hack TODO: find another way
		// Top term
		this.getChildren()[1].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
		this.getChildren()[1].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() - this.getChildren()[1].getBoundingBox().getHeight());
		// Bottom term
		this.getChildren()[2].getBoundingBox().setX(this.getChildren()[0].getBoundingBox().getX());
		this.getChildren()[2].getBoundingBox().setY(this.getChildren()[0].getBoundingBox().getY() + this.getChildren()[0].getBoundingBox().getHeight());
	};

	// Export
	scope.MathFractionRuleNode = MathFractionRuleNode;
})(MyScript);