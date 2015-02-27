'use strict';

describe('MyScriptJS: input/math/mathRecognitionData.js', function () {

    it('MathRecognitionData object exist', function () {
        expect(MyScript.MathRecognitionData).to.exist;
        expect(MyScript.MathRecognitionData).not.to.be.null;
        expect(MyScript.MathRecognitionData).to.not.be.undefined;
    });

    it('MathRecognitionData constructor', function () {
        var mathRecognitionData = new MyScript.MathRecognitionData();
        expect(mathRecognitionData).to.be.an('object');
        expect(mathRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(mathRecognitionData).to.be.an.instanceof(MyScript.MathRecognitionData);
    });


    it('MathRecognitionData math recognition input getter', function () {
        var mathRecognitionData = new MyScript.MathRecognitionData();
        expect(mathRecognitionData.getMathRecognitionInput()).to.be.undefined;
    });

    it('MathRecognitionData math recognition input setter', function () {
        var mathRecognitionData = new MyScript.MathRecognitionData();
        expect(mathRecognitionData.getMathRecognitionInput()).to.be.undefined;
        mathRecognitionData.setMathRecognitionInput(new MyScript.MathRecognitionInput());
        expect(mathRecognitionData.getMathRecognitionInput()).not.to.be.undefined;
    });

});