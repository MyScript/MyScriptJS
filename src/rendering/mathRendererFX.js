(function (scope) {

	/**
	 * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
	 *
	 * @class MathRendererFX
	 * @extends AbstractRenderer
	 * @constructor
	 */
	function MathRendererFX () {
		this.cloneStrokes = [];
		this.strokesToRemove = [];
		this.parser = new scope.MathParserFX();
	}

	/**
	 * Inheritance property
	 */
	MathRendererFX.prototype = new scope.AbstractRenderer();

	/**
	 * Constructor property
	 */
	MathRendererFX.prototype.constructor = MathRendererFX;

	/**
	 * Draw math strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
	 *
	 * @method drawStrokesByRecognitionResult
	 * @param {Stroke[]} strokes
	 * @param {MathDocument} recognitionResult
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {
		var notScratchOutStrokes = this.removeScratchOutStrokes(strokes, recognitionResult.getScratchOutResults());

		for (var i in notScratchOutStrokes) {
			var stroke = notScratchOutStrokes[i];
			this.drawStroke(stroke, parameters, context);
		}
	};

	/**
	 * Remove scratch out from input strokes
	 *
	 * @param {Stroke[]} strokes
	 * @param {MusicScratchOut[]} scratchOutResults
	 * @returns {Stroke[]} notScratchOutStrokes
	 */
	MathRendererFX.prototype.removeScratchOutStrokes = function (strokes, scratchOutResults) {
		if (!scratchOutResults || scratchOutResults.length === 0) {
			return strokes;
		}

		var cloneStrokes = strokes.slice(0);
		var strokesToRemove = [];

		for (var k in scratchOutResults) {
			if (scratchOutResults[k].getErasedInkRanges()) {
				for (var n in scratchOutResults[k].getErasedInkRanges()) {
					strokesToRemove.push(scratchOutResults[k].getErasedInkRanges()[n].getComponent());
				}
				for (var p in scratchOutResults[k].getInkRanges()) {
					strokesToRemove.push(scratchOutResults[k].getInkRanges()[p].getComponent());
				}
			}
		}

		strokesToRemove.sort(function (a, b) {
			return b - a;
		});

		for (var z in strokesToRemove) {
			cloneStrokes.splice(strokesToRemove[z], 1);
		}
		return cloneStrokes;
	};

	/**
	 * Draw math strokes on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
	 *
	 * @method drawFontByRecognitionResult
	 * @param {AbstractComponent[]} components
	 * @param {MathNode} rootNode
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawFontByRecognitionResult = function (components, rootNode, parameters, context) {
		this.parser.parseNode(rootNode, components);
		this.drawNode(rootNode, parameters, context);
	};

	/**
	 * Draw node
	 *
	 * @private
	 * @method drawNode
	 * @param {MathNode} node
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawNode = function (node, parameters, context) {
		if (node instanceof scope.MathTerminalNode) {
			this.drawTerminalNode(node, parameters, context);
		}
		else if (node instanceof scope.MathNonTerminalNode) {
			this.drawNonTerminalNode(node, parameters, context);
		}
		else if (node instanceof scope.MathRuleNode) {
			this.drawRuleNode(node, parameters, context);
		} else {
			throw new Error('not implemented');
		}
	};

	/**
	 * Draw terminal node
	 *
	 * @private
	 * @method drawTerminalNode
	 * @param {MathTerminalNode} node
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawTerminalNode = function (node, parameters, context) {

		if (parameters.getShowBoundingBoxes()) {

			var outputParams = new scope.RenderingParameters();
			outputParams.setColor('red');
			outputParams.setRectColor('rgba(255, 0, 0, 0.1)');

			this.drawRectangle(node.getBoundingBox(), outputParams, context);

			var inputParams = new scope.RenderingParameters();
			inputParams.setColor('green');
			inputParams.setRectColor('rgba(0, 255, 0, 0.1)');

			this.drawRectangle(node.getInkBoundingBox(), inputParams, context);
		}
		//this.drawRectangle(node.getBoundingBox(), parameters, context);
	};

	/**
	 * Draw non terminal node
	 *
	 * @private
	 * @method drawNonTerminalNode
	 * @param {MathNonTerminalNode} node
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawNonTerminalNode = function (node, parameters, context) {
		this.drawNode(node.getSelectedCandidate(), parameters, context);

		//this.drawRectangle(node.getBoundingBox(), parameters, context);
	};

	/**
	 * Draw rule node
	 *
	 * @private
	 * @method drawRuleNode
	 * @param {MathRuleNode} node
	 * @param {RenderingParameters} parameters
	 * @param {Object} context
	 */
	MathRendererFX.prototype.drawRuleNode = function (node, parameters, context) {
		for (var i in node.getChildren()) {
			this.drawNode(node.getChildren()[i], parameters, context);
		}
	};

	// Export
	scope.MathRendererFX = MathRendererFX;
})(MyScript);