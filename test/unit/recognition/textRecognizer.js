'use strict';

describe('TextRecognizer: recognition/textRecognizer.js', function () {

    describe('Default construction', function () {

        var textRecognizer;
        before(function (done) {
            textRecognizer = new MyScript.TextRecognizer();
            done();
        });

        it('Check initial state', function () {
            expect(textRecognizer).to.be.an('object');
            expect(textRecognizer).to.be.an.instanceOf(MyScript.AbstractRecognizer);
            expect(textRecognizer).to.be.an.instanceOf(MyScript.TextRecognizer);
        });

        it('Get parameters', function () {
            expect(textRecognizer.getParameters()).to.be.an.instanceOf(MyScript.TextParameter);
        });

        it('Set parameters', function () {
            var parameters = new MyScript.TextParameter();
            parameters.setLanguage('en_US');
            parameters.setInputMode('CURSIVE');
            textRecognizer.setParameters(parameters);
            expect(textRecognizer.getParameters()).to.be.an.instanceOf(MyScript.TextParameter);
        });

    });

});