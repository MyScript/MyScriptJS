'use strict';

(function() {
	var result = document.getElementById('adv-text-result');
	var canvas = document.getElementById('adv-text-canvas');
	var trash = document.getElementById('adv-trash');
	var undo = document.getElementById('adv-undo');
	var redo = document.getElementById('adv-redo');
	var languages = document.getElementById('adv-languages');
	var context = canvas.getContext('2d');
	var pointerId;

	var host = 'cloud-internal-master.visionobjects.com';
	var applicationKey = 'ed45a5b4-946d-45c4-8234-fb840fb6416b';
	var hmacKey = 'a1789a80-8514-3d17-acd0-cc5d6674acea';

	var stroker = new MyScript.Stroker();
	var textRenderer = new MyScript.TextRenderer();
	var textRecognizer = new MyScript.TextRecognizer(host);
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

	trash.addEventListener('click', function () {
		instanceId = undefined;
		textRenderer.clear(context);
		stroker.clear();
		result.innerText = '';
	}, false);

	undo.addEventListener('click', function () {
		if (!stroker.isEmpty()) {
			stroker.undo();
			textRenderer.clear(context);
			textRenderer.drawStrokes(stroker.getStrokes(), context);
		}
		doRecognition();
	}, false);

	redo.addEventListener('click', function () {
		if (!stroker.isRedoEmpty()) {
			stroker.redo();
			textRenderer.clear(context);
			textRenderer.drawStrokes(stroker.getStrokes(), context);
		}
		doRecognition();
	}, false);

	languages.addEventListener('change', function () {
		textRecognizer.getParameters().setLanguage(languages.options[languages.selectedIndex].value);
		doRecognition();
	}, false);

})();
