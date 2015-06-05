'use strict';

describe('RecognitionLanguagesData: input/generic/recognitionLanguagesData.js', function () {

    describe('Default construction', function () {

        var recognitionLanguagesData;
        before(function (done) {
            recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
            done();
        });

        it('check initial state', function () {
            expect(recognitionLanguagesData).to.be.an('object');
            expect(recognitionLanguagesData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(recognitionLanguagesData).to.be.an.instanceof(MyScript.RecognitionLanguagesData);
        });

    });

    describe('Accessors', function () {

        var recognitionLanguagesData;
        beforeEach(function (done) {
            recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
            done();
        });

        it('Input Mode getter', function () {
            expect(recognitionLanguagesData.getInputMode()).to.be.undefined;
        });

        it('Input Mode setter', function () {
            expect(recognitionLanguagesData.getInputMode()).to.be.undefined;
            recognitionLanguagesData.setInputMode('CURSIVE');
            expect(recognitionLanguagesData.getInputMode()).not.to.be.undefined;
            expect(recognitionLanguagesData.getInputMode()).to.equal('CURSIVE');
        });

    });

});