'use strict';

describe('MyScriptJS: recognition/shapeRecognizer.js', function () {

    it('ShapeRecognizer object exist', function () {
        expect(MyScript.ShapeRecognizer).to.exist;
        expect(MyScript.ShapeRecognizer).not.to.be.null;
        expect(MyScript.ShapeRecognizer).to.not.be.undefined;
    });

    it('ShapeRecognizer constructor', function () {
        var shapeRecognizer = new MyScript.ShapeRecognizer('http://localhost:3001');
        expect(shapeRecognizer).to.be.an('object');
        expect(shapeRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(shapeRecognizer).to.be.an.instanceof(MyScript.ShapeRecognizer);
    });

    it('ShapeRecognizer Do Simple Recognition', function () {
        var shapeRecognizer = new MyScript.ShapeRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.ShapeParameter(),
            instanceId = '',
            components = [new MyScript.AbstractComponent()],
            hmacKey = '';

        shapeRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

    it('ShapeRecognizer Clear Shape Recognition Session', function () {
        var shapeRecognizer = new MyScript.ShapeRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.ShapeParameter(),
            instanceId = '',
            components = [new MyScript.AbstractComponent()],
            hmacKey = '';

        shapeRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {
                shapeRecognizer.clearShapeRecognitionSession(applicationKey, instanceId);
            },
            function error (response) {

            }
        );
    });
});