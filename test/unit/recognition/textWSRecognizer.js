'use strict';

describe('TextWSRecognizer: recognition/textWSRecognizer.js', function () {

    describe('Default construction', function () {

        var textRecognizer;
        before(function (done) {
            textRecognizer = new MyScript.TextWSRecognizer();
            done();
        });

        it('check initial state', function () {
            expect(textRecognizer).to.be.an('object');
            expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
            expect(textRecognizer).to.be.an.instanceof(MyScript.AbstractWSRecognizer);
            expect(textRecognizer).to.be.an.instanceof(MyScript.TextWSRecognizer);
        });

    });

    describe('Accessors', function () {

        var textRecognizer, parameters;
        before(function (done) {
            textRecognizer = new MyScript.TextWSRecognizer();
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