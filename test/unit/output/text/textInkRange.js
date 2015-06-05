'use strict';

describe('TextInkRange: output/text/textInkRange.js', function () {

    describe('Default construction', function () {

        var textInkRange;
        before(function (done) {
            textInkRange = new MyScript.TextInkRange();
            done();
        });

        it('check initial state', function () {
            expect(textInkRange).to.be.an('object');
            expect(textInkRange).to.be.an.instanceof(MyScript.TextInkRange);
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

        it('check initial state', function () {
            expect(textInkRange).to.be.an('object');
            expect(textInkRange).to.be.an.instanceof(MyScript.TextInkRange);
        });

        it('Get startUnit', function () {
            expect(textInkRange.getStartUnit()).to.be.equal(0);
        });

        it('Get endUnit', function () {
            expect(textInkRange.getEndUnit()).to.be.equal(3);
        });

        it('Get startComponent', function () {
            expect(textInkRange.getStartComponent()).to.be.equal(1);
        });

        it('Get endComponent', function () {
            expect(textInkRange.getEndComponent()).to.be.equal(4);
        });

        it('Get startPoint', function () {
            expect(textInkRange.getStartPoint()).to.be.equal(2);
        });

        it('Get endPoint', function () {
            expect(textInkRange.getEndPoint()).to.be.equal(5);
        });

    });

});