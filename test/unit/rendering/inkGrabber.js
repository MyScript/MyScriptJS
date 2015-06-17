'use strict';

describe('InkGrabber: common/inkGrabber.js', function () {

    describe('Default construction', function () {

        var inkGrabber;
        before(function (done) {
            var canvas = document.createElement('canvas');
            inkGrabber = new MyScript.InkGrabber(canvas.getContext('2d'));
            done();
        });

        it('Check initial state', function () {
            expect(inkGrabber).to.be.an('object');
            expect(inkGrabber).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(inkGrabber).to.be.an.instanceOf(MyScript.InkGrabber);
            expect(inkGrabber).to.have.ownProperty('writing');
            expect(inkGrabber).to.have.ownProperty('stroke');
        });

        it('Is writing', function () {
            expect(inkGrabber.isWriting()).to.equal(false);
        });

        it('Get stroke', function () {
            expect(inkGrabber.getStroke()).to.equal(undefined);
        });

    });

    describe('Workflow', function () {

        var inkGrabber;
        before(function (done) {
            var canvas = document.createElement('canvas');
            inkGrabber = new MyScript.InkGrabber(canvas.getContext('2d'));
            done();
        });

        it('Start stroke writing', function () {
            inkGrabber.startCapture(50, 2, 0);
            expect(inkGrabber.getStroke()).to.be.an.instanceOf(MyScript.StrokeComponent);
            expect(inkGrabber.getStroke().getX()[0]).to.equal(50);
            expect(inkGrabber.getStroke().getY()[0]).to.equal(2);
            expect(inkGrabber.isWriting()).to.equal(true);
        });

        it('Continue stroke writing', function () {
            inkGrabber.continueCapture(60, 8, 1);
            expect(inkGrabber.getStroke()).to.be.an.instanceOf(MyScript.StrokeComponent);
            expect(inkGrabber.getStroke().getX()[1]).to.equal(60);
            expect(inkGrabber.getStroke().getY()[1]).to.equal(8);
            expect(inkGrabber.isWriting()).to.equal(true);
        });

        it('Start stroke writing fail', function () {
            expect(function () {
                inkGrabber.startCapture(60, 8, 1);
            }).to.throw(Error);
        });

        it('End stroke writing', function () {
            inkGrabber.endCapture(75, 11, 2);
            expect(inkGrabber.isWriting()).to.equal(false);
        });

        it('Continue stroke writing fail', function () {
            expect(function () {
                inkGrabber.continueCapture(60, 8, 1);
            }).to.throw(Error);
        });

        it('End stroke writing fail', function () {
            expect(function () {
                inkGrabber.endCapture(75, 11, 2);
            }).to.throw(Error);
        });

    });

});