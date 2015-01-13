'use strict';

describe('MyScriptJS: output/text/textResult.js', function () {

    it('TextResult object exist', function () {
        expect(MyScript.TextResult).to.exist;
        expect(MyScript.TextResult).not.to.be.null;
        expect(MyScript.TextResult).to.not.be.undefined;
    });

    it('TextResult constructor', function () {
        var textResult = new MyScript.TextResult();
        expect(textResult).to.be.an('object');
        expect(textResult).to.be.an.instanceof(MyScript.AbstractResult);
        expect(textResult).to.be.an.instanceof(MyScript.TextResult);
    });

    it('TextResult Text Document getter', function () {
        var textResult = new MyScript.TextResult();
        expect(textResult.getTextDocument()).to.be.undefined;
    });

});