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
			return this.parseTerminalNode(node, components);
		}
		else if (node instanceof  scope.MathNonTerminalNode) {
			return this.parseNonTerminalNode(node, components);
		}
		else if (node instanceof scope.MathRuleNode) {
			return this.parseRuleNode(node, components);
		}

		throw new Error('unknown node type');
	};

	MathParserFX.prototype.parseTerminalNode = function (node, components) {
		var boxes = [];
		for (var i in node.getInkRanges()) {
			var component = components[node.getInkRanges()[i].getComponent()];
			if (component instanceof scope.Stroke) {
				boxes.push(component.getBoundingBox()); //Compute bounding box of recognized strokes
			}
		}
		node.boundingBox = scope.MathUtils.getBoundingRect(boxes);
		return node.boundingBox;
	};

	MathParserFX.prototype.parseNonTerminalNode = function (node, components) {
		node.boundingBox = this.parseNode(node.getSelectedCandidate(), components);
		return node.boundingBox;
	};

	MathParserFX.prototype.parseRuleNode = function (node, components) {
		var boxes = [];
		for (var i in node.getChildren()) {
			boxes.push(this.parseNode(node.getChildren()[i], components));
		}
		node.boundingBox = scope.MathUtils.getBoundingRect(boxes);
		return node.boundingBox;
	};

// Export
	scope.MathParserFX = MathParserFX;
})(MyScript);