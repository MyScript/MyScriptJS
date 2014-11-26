(function (scope) {

	/**
	 *
	 * @class MathParserFX
	 * @constructor
	 */
	function MathParserFX () {
	}

	MathParserFX.prototype.parseNode = function (node, components) {
		if (node instanceof scope.MathTerminalNode) {
			this.parseTerminalNode(node, components);
		}
		else if (node instanceof  scope.MathNonTerminalNode) {
			this.parseNonTerminalNode(node, components);
		}
		else if (node instanceof scope.MathRuleNode) {
			this.parseRuleNode(node, components);
		}
		else {
			throw new Error('unknown node type');
		}
	};

	MathParserFX.prototype.parseTerminalNode = function (node, components) {
		node.setBoundingBox(node.getInkBoundingBox(components));
	};

	MathParserFX.prototype.parseNonTerminalNode = function (node, components) {
		this.parseNode(node.getSelectedCandidate(), components);
	};

	MathParserFX.prototype.parseRuleNode = function (node, components) {
		for (var i in node.getChildren()) {
			this.parseNode(node.getChildren()[i], components);
		}
		node.computeBoxes();
	};

// Export
	scope.MathParserFX = MathParserFX;
})(MyScript);