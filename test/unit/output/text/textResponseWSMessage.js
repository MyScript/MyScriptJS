'use strict';

describe('TextResponseWSMessage: input/generic/textResponseWSMessage.js', function () {

    describe('Default construction', function () {

        var textResponse;
        before(function (done) {
            textResponse = new MyScript.TextResponseWSMessage();
            done();
        });

        it('check initial state', function () {
            expect(textResponse).to.be.an('object');
            expect(textResponse).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(textResponse).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
            expect(textResponse).to.be.an.instanceof(MyScript.TextResponseWSMessage);
        });

        it('result getter', function () {
            expect(textResponse.getTextDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textResponse;
        before(function (done) {
            textResponse = new MyScript.TextResponseWSMessage({
                result: {
                    type: 'result'
                }
            });
            done();
        });

        it('check initial state', function () {
            expect(textResponse).to.be.an('object');
            expect(textResponse).to.be.an.instanceof(MyScript.AbstractWSMessage);
            expect(textResponse).to.be.an.instanceof(MyScript.AbstractRecoResponseWSMessage);
            expect(textResponse).to.be.an.instanceof(MyScript.TextResponseWSMessage);
        });

        it('Test TextResponseWSMessage object construction: TextDocument construction', function () {
            expect(textResponse.getTextDocument()).to.be.an.instanceof(MyScript.TextDocument);
        });

    });

});