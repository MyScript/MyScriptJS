'use strict';

(function() {
	var result = document.getElementById('spl-text-result');
	var canvas = document.getElementById('spl-text-canvas');
	var context = canvas.getContext('2d');
	var pointerId;

	var host = 'webtest:8894';
	var applicationKey = 'ed45a5b4-946d-45c4-8234-fb840fb6416b';
	var hmacKey = 'a1789a80-8514-3d17-acd0-cc5d6674acea';

	var stroker = new MyScript.Stroker();
	var textRenderer = new MyScript.TextRenderer();
	var textRecognizer = new MyScript.TextRecognizer(host);
	textRecognizer.getParameters().setLanguage('en_US');
	var instanceId;

	function doRecognition () {

		if (stroker.isEmpty()) {
			result.innerText = '';
		} else {

			var inputUnit = new MyScript.TextInputUnit();
			inputUnit.setComponents(stroker.getStrokes());

			var units = [inputUnit];

			textRecognizer.doSimpleRecognition(applicationKey, instanceId, units, hmacKey).then(
				function (data) {
					if (!instanceId) {
						instanceId = data.getInstanceId();
					} else if (instanceId !== data.getInstanceId()) {
						return;
					}

					result.innerText = data.getTextDocument().getTextSegmentResult().getSelectedCandidate().getLabel();
				}
			);
		}
	}

	canvas.addEventListener('pointerdown', function (event) {
		if (!pointerId) {
			pointerId = event.pointerId;
			event.preventDefault();

			textRenderer.drawStart(event.offsetX, event.offsetY);
			stroker.startStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

	canvas.addEventListener('pointermove', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();

			textRenderer.drawContinue(event.offsetX, event.offsetY, context);
			stroker.continueStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

	canvas.addEventListener('pointerup', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();

			textRenderer.drawEnd(event.offsetX, event.offsetY, context);
			stroker.endStrokeWriting();
			if (!stroker.isEmpty()) {
				doRecognition();
			}
			pointerId = undefined;
		}
	}, false);

	canvas.addEventListener('pointerleave', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();

			textRenderer.drawEnd(event.offsetX, event.offsetY, context);
			stroker.endStrokeWriting();
			if (!stroker.isEmpty()) {
				doRecognition();
			}
			pointerId = undefined;
		}
	}, false);

})();
