'use strict';

describe('MyScriptJS: recognition/shapeRecognizer.js', function () {

    it('ShapeRecognizer object exist', function () {
        expect(MyScript.ShapeRecognizer).to.exist;
        expect(MyScript.ShapeRecognizer).not.to.be.null;
        expect(MyScript.ShapeRecognizer).to.not.be.undefined;
    });

    var shapeRecognizer = new MyScript.ShapeRecognizer('cloud-internal-master.visionobjects.com');
    it('ShapeRecognizer constructor', function () {
        expect(shapeRecognizer).to.be.an('object');
        expect(shapeRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(shapeRecognizer).to.be.an.instanceof(MyScript.ShapeRecognizer);
    });

    it('Get parameters', function () {
        expect(shapeRecognizer.getParameters()).to.be.an.instanceof(MyScript.ShapeParameter);
    });

    var parameters = new MyScript.ShapeParameter();
    parameters.setBeautification(true);
    parameters.setRejectDetectionSensitivity(0);
    it('Set parameters', function () {
        shapeRecognizer.setParameters(parameters);
        expect(shapeRecognizer.getParameters()).to.be.an.instanceof(MyScript.ShapeParameter);
    });

    var applicationKey = '9faa1259-48ba-44c4-9857-b3c86d986f94';
    var hmacKey = 'fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0';
    var instanceId;
    var stroke = new MyScript.Stroke();
    stroke.setX([396, 396, 396, 395, 393, 391, 389, 384, 381, 378, 375, 372, 370, 367, 366, 366, 366, 366, 365, 369, 372, 378, 386, 400, 418, 441, 468, 495, 524, 551, 574, 593, 610, 623, 632, 637, 640, 640, 640, 641, 641, 642, 642, 642, 644, 646, 646, 647, 647, 647, 647, 647, 647, 646, 646, 646, 645, 644, 643, 641, 639, 636, 633, 628, 621, 613, 604, 595, 586, 578, 571, 565, 560, 554, 548, 543, 537, 529, 522, 514, 506, 499, 492, 486, 480, 475, 469, 463, 458, 452, 447, 441, 436, 432, 429, 427, 425, 422, 421, 419, 418, 416, 415, 414, 413, 411, 410, 409, 407, 406, 405, 404, 403, 402, 401, 400, 399]);
    stroke.setY([211, 210, 211, 216, 224, 235, 245, 271, 284, 296, 309, 320, 331, 338, 345, 349, 350, 352, 352, 353, 354, 356, 358, 361, 363, 365, 367, 367, 367, 367, 367, 367, 367, 367, 367, 367, 367, 366, 363, 361, 358, 355, 350, 343, 334, 325, 313, 302, 292, 281, 271, 263, 256, 249, 245, 241, 239, 238, 238, 238, 238, 239, 239, 239, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 239, 239, 239, 239, 239, 239, 239, 239, 239, 239, 239, 239, 237, 237, 237, 236, 236, 234, 233, 231, 231, 230, 230, 229, 229, 229, 228, 228, 228, 228, 227, 227, 227, 227, 226, 226, 226, 226, 226, 226, 226, 226]);
    var components = [stroke];

    it('Do simple shape recognition', function (done) {
        shapeRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey).then(
            function success(response) {
                instanceId = response.getInstanceId();
                expect(instanceId).to.not.be.undefined;
                expect(response.result.segments.length).to.be.equal(1);
                expect(response.result.segments[0].candidates[0].label).to.be.equal('rectangle');
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

    it('Do simple shape recognition with custom parameters', function (done) {
        shapeRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
            function success(response) {
                instanceId = response.getInstanceId();
                expect(instanceId).to.not.be.undefined;
                expect(response.result.segments.length).to.be.equal(1);
                expect(response.result.segments[0].candidates[0].label).to.be.equal('rectangle');
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

    it('Clear shape recognition session', function (done) {
        shapeRecognizer.clearShapeRecognitionSession(applicationKey, instanceId).then(
            function success(response) {
                expect(response.result.status).to.be.equal('success');
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

    it('Return an error on simple shape recognition', function (done) {
        shapeRecognizer.doSimpleRecognition('test', instanceId, components).then(
            function success (response) {
                done(response);
            },
            function error (response) {
                expect(response).to.be.an.instanceof(Error);
                done(undefined, response);
            }
        );
    });
});