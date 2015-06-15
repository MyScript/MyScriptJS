'use strict';

describe('RecognitionLanguagesData: input/generic/recognitionLanguagesData.js', function () {

    describe('Default construction', function () {

        var recognitionLanguagesData;
        before(function (done) {
            recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
            done();
        });

        it('Check initial state', function () {
            expect(recognitionLanguagesData).to.be.an('object');
            expect(recognitionLanguagesData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(recognitionLanguagesData).to.be.an.instanceOf(MyScript.RecognitionLanguagesData);
        });

        it('Get input mode', function () {
            expect(recognitionLanguagesData.getInputMode()).to.be.undefined;
        });

        it('Set input mode', function () {
            recognitionLanguagesData.setInputMode('CURSIVE');
            expect(recognitionLanguagesData.getInputMode()).not.to.be.undefined;
            expect(recognitionLanguagesData.getInputMode()).to.equal('CURSIVE');
        });

    });

});