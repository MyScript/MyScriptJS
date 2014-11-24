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
		var boxes = [];
		for (var i in node.getInkRanges()) {
			var component = components[node.getInkRanges()[i].getComponent()];
			if (component instanceof scope.Stroke) {
				boxes.push(component.getBoundingBox()); //Compute bounding box of recognized strokes
			}
		}
		node.setBoundingBox(scope.MathUtils.getBoundingRect(boxes));
	};

	MathParserFX.prototype.parseNonTerminalNode = function (node, components) {
		this.parseNode(node.getSelectedCandidate(), components);
		node.setBoundingBox(node.getSelectedCandidate().getBoundingBox());
	};

	MathParserFX.prototype.parseRuleNode = function (node, components) {
		var boxes = [];
		for (var i in node.getChildren()) {
			this.parseNode(node.getChildren()[i], components)
			boxes.push(node.getChildren()[i].getBoundingBox());
		}
		var boundingBoxes = scope.MathUtils.fillRect(boxes);
		for (var i in node.getChildren()) {
			node.getChildren()[i].setBoundingBox(boundingBoxes[i]);
		}

		node.setBoundingBox(scope.MathUtils.getBoundingRect(boundingBoxes));


		//if (node instanceof scope.MathFenceRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathFractionRuleNode) {
		//	this.normalizeNode(node.getChildren()[0], node.getFractionBarRect());
		//	this.normalizeNode(node.getChildren()[1], node.getNumeratorRect());
		//	this.normalizeNode(node.getChildren()[2], node.getDenominatorRect());
		//}
		//else if (node instanceof scope.MathHorizontalPairRuleNode) {
		//
		//	//var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	//for (var i in node.getChildren()) {
		//	//	this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	//}
		//}
		//else if (node instanceof scope.MathIdentityRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathLeftFenceRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathOverscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathPreSuperscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathSqrtRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathSubscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathSubSuperscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathSuperscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathUnderOverscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathUnderscriptRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//}
		//else if (node instanceof scope.MathVerticalPairRuleNode) {
		//	var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
		//	for (var i in node.getChildren()) {
		//		this.normalizeNode(node.getChildren()[i], boxes[i]);
		//	}
		//} else {
		//	throw new Error('unknown rule node type');
		//}
	};

	//MathParserFX.prototype.normalizeNode = function (node, box) {
	//	if (node instanceof scope.MathTerminalNode) {
	//		this.normalizeTerminalNode(node, box);
	//	}
	//	else if (node instanceof  scope.MathNonTerminalNode) {
	//		this.normalizeNonTerminalNode(node, box);
	//	}
	//	else if (node instanceof scope.MathRuleNode) {
	//		this.normalizeRuleNode(node, box);
	//	}
	//	else {
	//		throw new Error('unknown node type');
	//	}
	//};
	//
	//MathParserFX.prototype.normalizeTerminalNode = function (node, box) {
	//	node.boundingBox = box;
	//};
	//
	//MathParserFX.prototype.normalizeNonTerminalNode = function (node, box) {
	//	node.boundingBox = box;
	//	this.normalizeNode(node.getSelectedCandidate(), node.getBoundingBox());
	//};
	//
	//MathParserFX.prototype.normalizeRuleNode = function (node, box) {
	//	node.boundingBox = box;
	//	if (node instanceof scope.MathFenceRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathFractionRuleNode) {
	//		this.normalizeNode(node.getChildren()[0], node.getFractionBarRect());
	//		this.normalizeNode(node.getChildren()[1], node.getNumeratorRect());
	//		this.normalizeNode(node.getChildren()[2], node.getDenominatorRect());
	//	}
	//	else if (node instanceof scope.MathHorizontalPairRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathIdentityRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathLeftFenceRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathOverscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathPreSuperscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathSqrtRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathSubscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathSubSuperscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathSuperscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), node.getChildren().length, 1);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathUnderOverscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathUnderscriptRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	}
	//	else if (node instanceof scope.MathVerticalPairRuleNode) {
	//		var boxes = scope.MathUtils.splitRect(node.getBoundingBox(), 1, node.getChildren().length);
	//		for (var i in node.getChildren()) {
	//			this.normalizeNode(node.getChildren()[i], boxes[i]);
	//		}
	//	} else {
	//		throw new Error('unknown rule node type');
	//	}
	//};

// Export
	scope.MathParserFX = MathParserFX;
})(MyScript);