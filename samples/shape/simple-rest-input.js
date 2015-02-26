'use strict';

(function() {
	var canvas = document.getElementById('spl-shape-canvas');
	var context = canvas.getContext('2d');
	var pointerId;
	var instanceId;

    /*
     * Declare MyScript Cloud url and authentication keys
     */
	var host = 'cloud-internal-master.visionobjects.com';
	var applicationKey = '9faa1259-48ba-44c4-9857-b3c86d986f94';
	var hmacKey = 'fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0';

   /*
    * Declare an instance of MyScriptJS Stroker in order to capture digital ink
    */
	var stroker = new MyScript.Stroker();

   /*
    * Declare an instance of MyScriptJS Shape Renderer in order to enable ink rendering
    */
	var shapeRenderer = new MyScript.ShapeRenderer();

   /*
    * Declare an instance of MyScriptJS Shape Recognizer
    */
	var shapeRecognizer = new MyScript.ShapeRecognizer(host);

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

   /*
    * on pointer down: Start ink rendering and ink capture.
    */
	canvas.addEventListener('pointerdown', function (event) {
		if (!pointerId) {
			pointerId = event.pointerId;
			event.preventDefault();
		//Start ink rendering
			shapeRenderer.drawStart(event.offsetX, event.offsetY);
		//Start ink capture
			stroker.startStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

   /*
    * on pointer move: Continue ink rendering and ink capture.
    */
	canvas.addEventListener('pointermove', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();
		//Continue ink rendering
			shapeRenderer.drawContinue(event.offsetX, event.offsetY, context);
		//Continue ink capture
			stroker.continueStrokeWriting(event.offsetX, event.offsetY);
		}
	}, false);

   /*
    * on pointer up: Stop ink rendering and ink capture and send recognition request.
    */
	canvas.addEventListener('pointerup', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();
		//Stop ink rendering
			shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
		//Stop ink capture
			stroker.endStrokeWriting();
		//Send recognition request
			if (!stroker.isEmpty()) {
				doRecognition();
			}
			pointerId = undefined;
		}
	}, false);

   /*
    * on pointer leave: Continue ink rendering and ink capture.
    */
	canvas.addEventListener('pointerleave', function (event) {
		if (pointerId === event.pointerId) {
			event.preventDefault();
		//Stop ink rendering
			shapeRenderer.drawEnd(event.offsetX, event.offsetY, context);
		//Stop ink capture
			stroker.endStrokeWriting();
		//Send recognition request
			if (!stroker.isEmpty()) {
				doRecognition();
			}
			pointerId = undefined;
		}
	}, false);

})();
