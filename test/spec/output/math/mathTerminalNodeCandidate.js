'use strict';

describe('MyScriptJS: output/math/mathTerminalNodeCandidate.js', function () {

    it('MathTerminalNodeCandidate object exist', function () {
        expect(MyScript.MathTerminalNodeCandidate).to.exist;
        expect(MyScript.MathTerminalNodeCandidate).not.to.be.null;
        expect(MyScript.MathTerminalNodeCandidate).to.not.be.undefined;
    });

    it('MathTerminalNodeCandidate constructor', function () {
        var mathTerminalNodeCandidate = new MyScript.MathTerminalNodeCandidate();
        expect(mathTerminalNodeCandidate).to.be.an('object');
        expect(mathTerminalNodeCandidate).to.be.an.instanceof(MyScript.MathTerminalNodeCandidate);
    });

    it('MathTerminalNodeCandidate Label getter', function () {
        var mathTerminalNodeCandidate = new MyScript.MathTerminalNodeCandidate();
        expect(mathTerminalNodeCandidate.getLabel()).to.be.undefined;
    });

    it('MathTerminalNodeCandidate Normalized Recognition Score getter', function () {
        var mathTerminalNodeCandidate = new MyScript.MathTerminalNodeCandidate();
        expect(mathTerminalNodeCandidate.getNormalizedRecognitionScore()).to.be.undefined;
    });
});