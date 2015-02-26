'use strict';

(function() {
	var result = document.getElementById('spl-text-result');
	var canvas = document.getElementById('spl-text-canvas');
	var context = canvas.getContext('2d');
	var pointerId;
	var instanceId;

    /*
     * Declare MyScript Cloud url and authentication keys
     */
	var host = 'cloud-internal-master.visionobjects.com';
	var applicationKey = 'ed45a5b4-946d-45c4-8234-fb840fb6416b';
	var hmacKey = 'a1789a80-8514-3d17-acd0-cc5d6674acea';

    /*
     * Declare an instance of MyScriptJS Stroker in order to capture digital ink
     */
	var stroker = new MyScript.Stroker();

    /*
     * Declare an instance of MyScriptJS TextRenderer in order to enable ink rendering
     */
	var textRenderer = new MyScript.TextRenderer();

    /*
     * Declare an instance of MyScriptJS Text Recognizer
     */
	var textRecognizer = new MyScript.TextRecognizer(host);

    /*
     * Set Recognition language (i.e.: "en_US")
     */
	textRecognizer.getParameters().setLanguage('en_US');

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

   /*
    * on pointer down: Start ink rendering and ink capture.
    */
	canvas.addEventListener('pointerdown', function (event) {
		if (!pointerId) {
			pointerId = event.pointerId;
			event.preventDefault();
			//Start ink rendering
			textRenderer.drawStart(event.offsetX, event.offsetY);
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
			textRenderer.drawContinue(event.offsetX, event.offsetY, context);
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
			textRenderer.drawEnd(event.offsetX, event.offsetY, context);
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
			textRenderer.drawEnd(event.offsetX, event.offsetY, context);
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
