'use strict';

describe('MyScriptJS: MathRecognizer', function () {
    console.log('checking MyScript exist');
    it('MyScript.js exist', function () {
        expect(MyScript).to.exist;
    });
    it('MyScript.js not null', function () {
        expect(MyScript).not.to.be.null;
    });
    it('MyScript.js not undefined', function () {
        expect(MyScript).to.not.be.undefined;
    });
});

var host = 'cloud-internal-master.visionobjects.com';
var mathRecognizer = new MyScript.MathRecognizer(host),
    applicationKey = '7850ae71-6073-469c-8b8e-8abc8be44662',
    parameters = new MyScript.MathParameter(),
    components = [],
    stroke = new MyScript.Stroke(),
    hmacKey = '7bc38c71-c867-c713-a7cd-6605a54141da';
var instanceId;

stroke.setX([297, 300, 303, 309, 315, 321, 327, 332, 338, 344, 348, 349, 351, 351, 352, 353, 354, 356, 357, 358, 359, 360, 360, 360, 361, 362, 362, 363, 363, 364, 364, 364, 365, 365, 366, 366, 367, 367, 368, 369, 370, 370, 371, 372, 373, 373, 373, 373, 372, 372, 371, 370, 370, 368, 367, 367, 366, 365, 365, 364, 364, 363, 362, 361, 361, 360, 360, 359, 359, 358, 358, 358, 358, 358, 358, 358, 357, 357, 357, 357, 357, 357, 357, 357, 357]);
stroke.setY([241, 241, 241, 241, 241, 239, 237, 236, 234, 232, 230, 228, 227, 226, 225, 224, 223, 223, 221, 219, 218, 218, 217, 216, 216, 214, 213, 213, 212, 212, 211, 210, 209, 208, 207, 206, 206, 205, 204, 203, 202, 201, 199, 198, 197, 196, 197, 200, 202, 204, 206, 208, 211, 213, 216, 219, 221, 223, 225, 227, 229, 231, 234, 236, 239, 242, 245, 247, 249, 251, 253, 254, 255, 256, 257, 258, 258, 259, 260, 263, 264, 265, 267, 268, 269]);
parameters.setResultTypes(['LATEX']);
components.push(stroke);

/*var stroker = new MyScript.Stroker();
 for (var i in stroke.getLength()) {
 if(i === 0) {
 stroker.startStrokeWriting(stroke.getX()[i], stroke.getY()[i]);
 }
 else {
 stroker.continueStrokeWriting(stroke.getX()[i], stroke.getY()[i]);
 }
 }
 stroker.endStrokeWriting();

 describe('stroker', function() {
 console.log('checking stroker OK');
 it('nb strokes > 0', function() {
 expect(stroker.getStrokes().length).to.be.above(0);
 });
 });
*/
describe('MathRecognizer Do SimpleRecognition', function() {
	it('checking MathRecognizer exists', function() {
		expect(mathRecognizer).to.exist;
	});
	it('checking MathRecognizer not null', function() {
		expect(mathRecognizer).not.to.be.null;
	});
	it('do simple math recognition', function (done) {
		mathRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
			function success(response) {
				console.log('Success');
				expect(response.getInstanceId()).not.to.be.undefined;
				expect(response.getMathDocument()).to.exist;
				expect(response.getMathDocument()).not.to.be.null;
				var results = response.getMathDocument().getResultElements();
				expect(results.length).to.be.above(0);
				for (var i in results) {
					if (results[i] instanceof MyScript.MathLaTexResultElement) {
						console.log(results[i].getValue());
					}
				}
				done();
			},
			function failure(error) {
				console.log('failure');
				expect(error).not.to.be.equal('');
				done();
			}
		);
	});
});