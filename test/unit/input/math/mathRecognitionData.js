'use strict';

describe('MathRecognitionData: input/math/mathRecognitionData.js', function () {

    describe('Default construction', function () {

        var mathRecognitionData;
        before(function (done) {
            mathRecognitionData = new MyScript.MathRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(mathRecognitionData).to.be.an('object');
            expect(mathRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(mathRecognitionData).to.be.an.instanceOf(MyScript.MathRecognitionData);
        });

        it('Get recognition input', function () {
            expect(mathRecognitionData.getMathRecognitionInput()).to.be.undefined;
        });

        it('Set recognition input', function () {
            mathRecognitionData.setMathRecognitionInput(new MyScript.MathRecognitionInput());
            expect(mathRecognitionData.getMathRecognitionInput()).not.to.be.undefined;
        });

    });

});