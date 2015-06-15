'use strict';

describe('MathTerminalNodeCandidate: output/math/mathTerminalNodeCandidate.js', function () {

    describe('Default construction', function () {

        var mathTerminalNodeCandidate;
        before(function (done) {
            mathTerminalNodeCandidate = new MyScript.MathTerminalNodeCandidate();
            done();
        });

        it('Check initial state', function () {
            expect(mathTerminalNodeCandidate).to.be.an('object');
            expect(mathTerminalNodeCandidate).to.be.an.instanceOf(MyScript.MathTerminalNodeCandidate);
        });

        it('MathTerminalNodeCandidate Label getter', function () {
            expect(mathTerminalNodeCandidate.getLabel()).to.be.undefined;
        });

        it('MathTerminalNodeCandidate Normalized Recognition Score getter', function () {
            expect(mathTerminalNodeCandidate.getNormalizedRecognitionScore()).to.be.undefined;
        });

    });

});