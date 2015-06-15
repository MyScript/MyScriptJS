'use strict';

describe('TextRecognitionData: input/text/textRecognitionData.js', function () {

    describe('Default construction', function () {

        var textRecognitionData;
        before(function (done) {
            textRecognitionData = new MyScript.TextRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(textRecognitionData).to.be.an('object');
            expect(textRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(textRecognitionData).to.be.an.instanceOf(MyScript.TextRecognitionData);
        });

        it('Get recognition input', function () {
            expect(textRecognitionData.getTextRecognitionInput()).to.be.undefined;
        });

        it('Set recognition input', function () {
            textRecognitionData.setTextRecognitionInput(new MyScript.TextRecognitionInput());
            expect(textRecognitionData.getTextRecognitionInput()).not.to.be.undefined;
        });

    });

});