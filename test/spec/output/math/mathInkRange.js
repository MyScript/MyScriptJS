'use strict';

describe('MyScriptJS: output/math/mathInkRange.js', function () {

    it('MathInkRange object exist', function () {
        expect(MyScript.MathInkRange).to.exist;
        expect(MyScript.MathInkRange).not.to.be.null;
        expect(MyScript.MathInkRange).to.not.be.undefined;
    });

    it('MathInkRange constructor', function () {
        var mathInkRange = new MyScript.MathInkRange();
        expect(mathInkRange).to.be.an('object');
        expect(mathInkRange).to.be.an.instanceof(MyScript.MathInkRange);
    });

    it('MathFractionRuleNode Component getter', function () {
        var mathInkRange = new MyScript.MathInkRange();
        expect(mathInkRange.getComponent()).to.be.undefined;
    });

    it('MathFractionRuleNode First Item getter', function () {
        var mathInkRange = new MyScript.MathInkRange();
        expect(mathInkRange.getFirstItem()).to.be.undefined;
    });

    it('MathFractionRuleNode Last Item getter', function () {
        var mathInkRange = new MyScript.MathInkRange();
        expect(mathInkRange.getLastItem()).to.be.undefined;
    });
});