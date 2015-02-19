'use strict';

(function() {
	var canvas = document.getElementById('spl-shape-canvas');
	var context = canvas.getContext('2d');
	var pointerId;

	var host = 'webtest:8894';
	var applicationKey = '9faa1259-48ba-44c4-9857-b3c86d986f94';
	var hmacKey = 'fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0';

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

})();
