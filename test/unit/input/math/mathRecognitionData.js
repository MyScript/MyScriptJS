'use strict';

describe('MathRecognitionData: input/math/mathRecognitionData.js', function () {

    describe('Default construction', function () {

        var mathRecognitionData;
        before(function (done) {
            mathRecognitionData = new MyScript.MathRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(mathRecognitionData).to.be.an('object');
            expect(mathRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(mathRecognitionData).to.be.an.instanceof(MyScript.MathRecognitionData);
        });

    });

    describe('Accessors', function () {

        var mathRecognitionData;
        beforeEach(function (done) {
            mathRecognitionData = new MyScript.MathRecognitionData();
            done();
        });

        it('math recognition input getter', function () {
            expect(mathRecognitionData.getMathRecognitionInput()).to.be.undefined;
        });

        it('math recognition input setter', function () {
            expect(mathRecognitionData.getMathRecognitionInput()).to.be.undefined;
            mathRecognitionData.setMathRecognitionInput(new MyScript.MathRecognitionInput());
            expect(mathRecognitionData.getMathRecognitionInput()).not.to.be.undefined;
        });

    });

});