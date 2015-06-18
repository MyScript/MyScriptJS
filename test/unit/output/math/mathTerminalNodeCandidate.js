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

        it('Get label', function () {
            expect(mathTerminalNodeCandidate.getLabel()).to.equal(undefined);
        });

        it('Get normalized recognition score', function () {
            expect(mathTerminalNodeCandidate.getNormalizedRecognitionScore()).to.equal(undefined);
        });

    });

});