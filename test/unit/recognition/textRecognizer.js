'use strict';

describe('TextRecognizer: recognition/textRecognizer.js', function () {

    describe('Default construction', function () {

        var textRecognizer;
        before(function (done) {
            textRecognizer = new MyScript.TextRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(textRecognizer).to.be.an('object');
            expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(textRecognizer).to.be.an.instanceof(MyScript.TextRecognizer);
        });

    });

    describe('Accessors', function () {

        var textRecognizer, parameters;
        before(function (done) {
            textRecognizer = new MyScript.TextRecognizer();
            parameters = new MyScript.TextParameter();
            parameters.setLanguage('en_US');
            parameters.setInputMode('CURSIVE');
            done();
        });

        it('Get parameters', function () {
            expect(textRecognizer.getParameters()).to.be.an.instanceof(MyScript.TextParameter);
        });

        it('Set parameters', function () {
            textRecognizer.setParameters(parameters);
            expect(textRecognizer.getParameters()).to.be.an.instanceof(MyScript.TextParameter);
        });

    });

});