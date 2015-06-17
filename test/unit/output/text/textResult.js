'use strict';

describe('TextResult: output/text/textResult.js', function () {

    describe('Default construction', function () {

        var textResult;
        before(function (done) {
            textResult = new MyScript.TextResult();
            done();
        });

        it('Check initial state', function () {
            expect(textResult).to.be.an('object');
            expect(textResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(textResult).to.be.an.instanceOf(MyScript.TextResult);
        });

        it('Get TextDocument (@deprecated)', function () {
            expect(textResult.getTextDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textResult;
        before(function (done) {
            textResult = new MyScript.TextResult({
                result: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(textResult).to.be.an('object');
            expect(textResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(textResult).to.be.an.instanceOf(MyScript.TextResult);
        });

        it('Get TextDocument (@deprecated)', function () {
            expect(textResult.getTextDocument()).to.be.an.instanceOf(MyScript.TextDocument);
        });

    });

});