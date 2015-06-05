'use strict';

describe('TextResult: output/text/textResult.js', function () {

    describe('Default construction', function () {

        var textResult;
        before(function (done) {
            textResult = new MyScript.TextResult();
            done();
        });

        it('check initial state', function () {
            expect(textResult).to.be.an('object');
            expect(textResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(textResult).to.be.an.instanceof(MyScript.TextResult);
        });

        it('Text Document getter', function () {
            expect(textResult.getTextDocument()).to.be.undefined;
        });

    });

});