(function (scope) {

	/**
	 * Math rule node
	 *
	 * @class MathRuleNode
	 * @extends MathNode
	 * @param {Object} obj
	 * @constructor
	 */
	function MathRuleNode (obj) {
		scope.MathNode.call(this, obj);
		this.children = [];
		if (obj) {
			this.name = obj.name;
			for (var i in obj.children) {
				switch (obj.children[i].type) {
					case 'nonTerminalNode':
						switch (obj.children[i].name) {
							case 'term':
								this.children.push(new scope.MathTermNonTerminalNode(obj.children[i]));
								break;
							case 'sqrtTerm':
								this.children.push(new scope.MathSqrtNonTerminalNode(obj.children[i]));
								break;
							case 'vectorTerm':
								this.children.push(new scope.MathVectorNonTerminalNode(obj.children[i]));
								break;
							case 'system':
								this.children.push(new scope.MathSystemNonTerminalNode(obj.children[i]));
								break;
							case 'exponentiable':
								this.children.push(new scope.MathExponentiableNonTerminalNode(obj.children[i]));
								break;
							case 'expression':
								this.children.push(new scope.MathExpressionNonTerminalNode(obj.children[i]));
								break;
						}
						break;
					case 'terminalNode':
						this.children.push(new scope.MathTerminalNode(obj.children[i]));
						break;
					case 'rule':
						switch (obj.children[i].name) {
							case 'identity':
								this.children.push(new scope.MathIdentityRuleNode(obj.children[i]));
								break;
							case 'horizontal pair':
								this.children.push(new scope.MathHorizontalPairRuleNode(obj.children[i]));
								break;
							case 'fence':
								this.children.push(new scope.MathFenceRuleNode(obj.children[i]));
								break;
							case 'fraction':
								this.children.push(new scope.MathFractionRuleNode(obj.children[i]));
								break;
							case 'sqrt':
								this.children.push(new scope.MathSqrtRuleNode(obj.children[i]));
								break;
							case 'subscript':
								this.children.push(new scope.MathSubscriptRuleNode(obj.children[i]));
								break;
							case 'superscript':
								this.children.push(new scope.MathSuperscriptRuleNode(obj.children[i]));
								break;
							case 'subsuperscript':
								this.children.push(new scope.MathSubSuperscriptRuleNode(obj.children[i]));
								break;
							case 'underscript':
								this.children.push(new scope.MathUnderscriptRuleNode(obj.children[i]));
								break;
							case 'overscript':
								this.children.push(new scope.MathOverscriptRuleNode(obj.children[i]));
								break;
							case 'underoverscript':
								this.children.push(new scope.MathUnderOverscriptRuleNode(obj.children[i]));
								break;
							case 'presuperscript':
								this.children.push(new scope.MathPreSuperscriptRuleNode(obj.children[i]));
								break;
							case 'vertical pair':
								this.children.push(new scope.MathVerticalPairRuleNode(obj.children[i]));
								break;
							case 'left fence':
								this.children.push(new scope.MathLeftFenceRuleNode(obj.children[i]));
								break;
						}
						break;
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
	 * Get bounding box
	 *
	 * @method getBoundingBox
	 * @returns {Rectangle}
	 */
	MathRuleNode.prototype.getBoundingBox = function () {

		var rule = this;
		var rect = new scope.Rectangle();

		rect.getXArray = function () {
			var xArray = [];
			for (var i in rule.getChildren()) {
				xArray.push(rule.getChildren()[i].getBoundingBox().getX());
				xArray.push(rule.getChildren()[i].getBoundingBox().getX() + rule.getChildren()[i].getBoundingBox().getWidth());
			}
			return xArray;
		};

		rect.getYArray = function () {
			var yArray = [];
			for (var i in rule.getChildren()) {
				yArray.push(rule.getChildren()[i].getBoundingBox().getY());
				yArray.push(rule.getChildren()[i].getBoundingBox().getY() + rule.getChildren()[i].getBoundingBox().getHeight());
			}
			return yArray;
		};

		rect.getX = function () {
			return Math.min.apply(Math, rect.getXArray());
		};

		rect.setX = function (x) {
			var offset = x - this.getX();
			for (var i in rule.getChildren()) {
				rule.getChildren()[i].getBoundingBox().setX(rule.getChildren()[i].getBoundingBox().getX() + offset);
			}
		};

		rect.getY = function () {
			return Math.min.apply(Math, rect.getYArray());
		};

		rect.setY = function (y) {
			var offset = y - this.getY();
			for (var i in rule.getChildren()) {
				rule.getChildren()[i].getBoundingBox().setY(rule.getChildren()[i].getBoundingBox().getY() + offset);
			}
		};

		rect.getWidth = function () {
			var xMin = this.getX();
			var xMax = Math.max.apply(Math, rect.getXArray());
			return xMax - xMin;
		};

		rect.setWidth = function (width) {
			var ratio = width / this.getWidth();
			for (var i in rule.getChildren()) {
				rule.getChildren()[i].getBoundingBox().setHeight(rule.getChildren()[i].getBoundingBox().getWidth() * ratio);
			}
		};

		rect.getHeight = function () {
			var yMin = this.getY();
			var yMax = Math.max.apply(Math, rect.getYArray());
			return yMax - yMin;
		};

		rect.setHeight = function (height) {
			var ratio = height / this.getHeight();
			for (var i in rule.getChildren()) {
				rule.getChildren()[i].getBoundingBox().setHeight(rule.getChildren()[i].getBoundingBox().getHeight() * ratio);
			}
		};

		return rect;
	};

	/**
	 * Compute bounding boxes function of children boxes
	 */
	MathRuleNode.prototype.computeBoxes = function () {
		throw new Error('not implemented');
	};

	// Export
	scope.MathRuleNode = MathRuleNode;
})(MyScript);