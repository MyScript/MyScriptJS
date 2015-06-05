'use strict';

describe('TextRecognitionData: input/text/textRecognitionData.js', function () {

    describe('Default construction', function () {

        var textRecognitionData;
        before(function (done) {
            textRecognitionData = new MyScript.TextRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(textRecognitionData).to.be.an('object');
            expect(textRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(textRecognitionData).to.be.an.instanceof(MyScript.TextRecognitionData);
        });

    });

    describe('Accessors', function () {

        var textRecognitionData;
        beforeEach(function (done) {
            textRecognitionData = new MyScript.TextRecognitionData();
            done();
        });

        it('text recognition input getter', function () {
            expect(textRecognitionData.getTextRecognitionInput()).to.be.undefined;
        });

        it('text recognition input setter', function () {
            expect(textRecognitionData.getTextRecognitionInput()).to.be.undefined;
            textRecognitionData.setTextRecognitionInput(new MyScript.TextRecognitionInput());
            expect(textRecognitionData.getTextRecognitionInput()).not.to.be.undefined;
        });

    });

});