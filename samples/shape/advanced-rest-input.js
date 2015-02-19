'use strict';

(function() {
	var canvas = document.getElementById('adv-shape-canvas');
	var trash = document.getElementById('adv-trash');
	var undo = document.getElementById('adv-undo');
	var redo = document.getElementById('adv-redo');
	var context = canvas.getContext('2d');
	var pointerId;

	var host = 'webtest:8894';
	var applicationKey = 'ed45a5b4-946d-45c4-8234-fb840fb6416b';
	var hmacKey = 'a1789a80-8514-3d17-acd0-cc5d6674acea';

	var stroker = new MyScript.Stroker();
	var shapeRenderer = new MyScript.ShapeRenderer();
	var shapeRecognizer = new MyScript.ShapeRecognizer(host);
	var instanceId;

	function doRecognition () {
		shapeRecognizer.doSimpleRecognition(applicationKey, instanceId, stroker.getStrokes(), hmacKey).then(
			function (data) {
				if (!instanceId) {
					instanceId = data.getInstanceId();
				} else if (instanceId !== data.getInstanceId()) {
					return;
				}

				shapeRenderer.clear(context);
				shapeRenderer.drawRecognitionResult(stroker.getStrokes(), data.getShapeDocument(), context);
			}
		);
	}

	canvas.addEventListener('pointerdown', function (event) {
		if (!pointerId) {
			pointerId = event.pointerId;
			event.preventDefault();

			shapeRenderer.drawStart(event.offsetX, event.offsetY);
			stroker.startStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

	canvas.addEventListener('pointermove', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();

			shapeRenderer.drawContinue(event.offsetX, event.offsetY, context);
			stroker.continueStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

	canvas.addEventListener('pointerup', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();

			shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
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

			shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
			stroker.endStrokeWriting();
			if (!stroker.isEmpty()) {
				doRecognition();
			}
			pointerId = undefined;
		}
	}, false);

	trash.addEventListener('click', function () {
		instanceId = undefined;
		shapeRenderer.clear(context);
		stroker.clear();
	}, false);

	undo.addEventListener('click', function () {
		if (!stroker.isEmpty()) {
			stroker.undo();
			shapeRenderer.clear(context);
			shapeRenderer.drawStrokes(stroker.getStrokes(), context);
		}
		doRecognition();
	}, false);

	redo.addEventListener('click', function () {
		if (!stroker.isRedoEmpty()) {
			stroker.redo();
			shapeRenderer.clear(context);
			shapeRenderer.drawStrokes(stroker.getStrokes(), context);
		}
		doRecognition();
	}, false);

})();
