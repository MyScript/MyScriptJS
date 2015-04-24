'use strict';

describe('MyScriptJS: output/text/textInkRange.js', function () {

    it('TextInkRange object exist', function () {
        expect(MyScript.TextInkRange).to.exist;
        expect(MyScript.TextInkRange).not.to.be.null;
        expect(MyScript.TextInkRange).to.not.be.undefined;
    });

    var textInkRange = new MyScript.TextInkRange();
    it('TextInkRange constructor', function () {
        expect(textInkRange).to.be.an('object');
        expect(textInkRange).to.be.an.instanceof(MyScript.TextInkRange);
    });

    it('TextInkRange startUnit getter', function () {
        expect(textInkRange.getStartUnit()).to.be.undefined;
    });

    it('TextInkRange endUnit getter', function () {
        expect(textInkRange.getEndUnit()).to.be.undefined;
    });

    it('TextInkRange startStroke getter', function () {
        expect(textInkRange.getStartStroke()).to.be.undefined;
    });

    it('TextInkRange endStroke getter', function () {
        expect(textInkRange.getEndStroke()).to.be.undefined;
    });

    it('TextInkRange startPoint getter', function () {
        expect(textInkRange.getStartPoint()).to.be.undefined;
    });

    it('TextInkRange endPoint getter', function () {
        expect(textInkRange.getEndPoint()).to.be.undefined;
    });

    var textInkRange2 = new MyScript.TextInkRange('0-1-2:3-4-5');

    it('Get startUnit', function () {
        expect(textInkRange2.getStartUnit()).to.be.equal(0);
    });

    it('Get endUnit', function () {
        expect(textInkRange2.getEndUnit()).to.be.equal(3);
    });

    it('Get startStroke', function () {
        expect(textInkRange2.getStartStroke()).to.be.equal(1);
    });

    it('Get endStroke', function () {
        expect(textInkRange2.getEndStroke()).to.be.equal(4);
    });

    it('Get startPoint', function () {
        expect(textInkRange2.getStartPoint()).to.be.equal(2);
    });

    it('Get endPoint', function () {
        expect(textInkRange2.getEndPoint()).to.be.equal(5);
    });
});