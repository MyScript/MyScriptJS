'use strict';

describe('TextInkRange: output/text/textInkRange.js', function () {

    describe('Default construction', function () {

        var textInkRange;
        before(function (done) {
            textInkRange = new MyScript.TextInkRange();
            done();
        });

        it('Check initial state', function () {
            expect(textInkRange).to.be.an('object');
            expect(textInkRange).to.be.an.instanceOf(MyScript.TextInkRange);
        });

        it('startUnit getter', function () {
            expect(textInkRange.getStartUnit()).to.be.undefined;
        });

        it('endUnit getter', function () {
            expect(textInkRange.getEndUnit()).to.be.undefined;
        });

        it('startComponent getter', function () {
            expect(textInkRange.getStartComponent()).to.be.undefined;
        });

        it('endComponent getter', function () {
            expect(textInkRange.getEndComponent()).to.be.undefined;
        });

        it('startPoint getter', function () {
            expect(textInkRange.getStartPoint()).to.be.undefined;
        });

        it('endPoint getter', function () {
            expect(textInkRange.getEndPoint()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var textInkRange;
        before(function (done) {
            textInkRange = new MyScript.TextInkRange('0-1-2:3-4-5');
            done();
        });

        it('Check initial state', function () {
            expect(textInkRange).to.be.an('object');
            expect(textInkRange).to.be.an.instanceOf(MyScript.TextInkRange);
        });

        it('Get startUnit', function () {
            expect(textInkRange.getStartUnit()).to.equal(0);
        });

        it('Get endUnit', function () {
            expect(textInkRange.getEndUnit()).to.equal(3);
        });

        it('Get startComponent', function () {
            expect(textInkRange.getStartComponent()).to.equal(1);
        });

        it('Get endComponent', function () {
            expect(textInkRange.getEndComponent()).to.equal(4);
        });

        it('Get startPoint', function () {
            expect(textInkRange.getStartPoint()).to.equal(2);
        });

        it('Get endPoint', function () {
            expect(textInkRange.getEndPoint()).to.equal(5);
        });

    });

});