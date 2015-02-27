'use strict';

describe('MyScriptJS: recognition/mathRecognizer.js', function () {

    it('MathRecognizer object exist', function () {
        expect(MyScript.MathRecognizer).to.exist;
        expect(MyScript.MathRecognizer).not.to.be.null;
        expect(MyScript.MathRecognizer).to.not.be.undefined;
    });

    it('MathRecognizer constructor', function () {
        var mathRecognizer = new MyScript.MathRecognizer('http://localhost:3001/api/v3.0/recognition/rest');
        expect(mathRecognizer).to.be.an('object');
        expect(mathRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(mathRecognizer).to.be.an.instanceof(MyScript.MathRecognizer);
    });

    it('MathRecognizer Do SimpleRecognition', function () {
        var mathRecognizer = new MyScript.MathRecognizer('http://localhost:3001/api/v3.0/recognition/rest'),
            applicationKey = '7850ae71-6073-469c-8b8e-8abc8be44662',
            parameters = new MyScript.MathParameter(),
            instanceId = '',
            stroke = new MyScript.Stroke(),
            components = [],
            hmacKey = '7bc38c71-c867-c713-a7cd-6605a54141da';

        stroke.setX([297,300,303,309,315,321,327,332,338,344,348,349,351,351,352,353,354,356,357,358,359,360,360,360,361,362,362,363,363,364,364,364,365,365,366,366,367,367,368,369,370,370,371,372,373,373,373,373,372,372,371,370,370,368,367,367,366,365,365,364,364,363,362,361,361,360,360,359,359,358,358,358,358,358,358,358,357,357,357,357,357,357,357,357,357]);
        stroke.setY([241,241,241,241,241,239,237,236,234,232,230,228,227,226,225,224,223,223,221,219,218,218,217,216,216,214,213,213,212,212,211,210,209,208,207,206,206,205,204,203,202,201,199,198,197,196,197,200,202,204,206,208,211,213,216,219,221,223,225,227,229,231,234,236,239,242,245,247,249,251,253,254,255,256,257,258,258,259,260,263,264,265,267,268,269]);
        parameters.setResultTypes(['LATEX','MATHML','SYMBOLTREE']);
        components.push(stroke);

        mathRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
            function success (response) {
                expect(response.instanceId).to.not.be.undefined;
            },
            function error (response) {
                expect(response).to.be.equal('');
            }
        );
    });

});