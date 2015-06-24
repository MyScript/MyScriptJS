'use strict';

describe('InkGrabber: common/inkGrabber.js', function () {

    describe('Default construction', function () {

        var inkManager;
        before(function (done) {
            var canvas = document.createElement('canvas');
            inkManager = new MyScript.InkGrabber(canvas.getContext('2d'));
            done();
        });

        it('Check initial state', function () {
            expect(inkManager).to.be.an('object');
            expect(inkManager).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(inkManager).to.be.an.instanceOf(MyScript.InkGrabber);
            expect(inkManager).to.have.ownProperty('writing');
            expect(inkManager).to.have.ownProperty('stroke');
        });

        it('Is writing', function () {
            expect(inkManager.isWriting()).to.equal(false);
        });

        it('Get stroke', function () {
            expect(inkManager.getStroke()).to.equal(undefined);
        });

    });

    describe('Workflow', function () {

        var inkManager;
        before(function (done) {
            var canvas = document.createElement('canvas');
            inkManager = new MyScript.InkGrabber(canvas.getContext('2d'));
            done();
        });

        it('Start stroke writing', function () {
            inkManager.startCapture(50, 2, 0);
            expect(inkManager.getStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getStroke().getX()[0]).to.equal(50);
            expect(inkManager.getStroke().getY()[0]).to.equal(2);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Continue stroke writing', function () {
            inkManager.continueCapture(60, 8, 1);
            expect(inkManager.getStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getStroke().getX()[1]).to.equal(60);
            expect(inkManager.getStroke().getY()[1]).to.equal(8);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Start stroke writing fail', function () {
            expect(function () {
                inkManager.startCapture(60, 8, 1);
            }).to.throw(Error);
        });

        it('End stroke writing', function () {
            inkManager.endCapture(75, 11, 2);
            expect(inkManager.isWriting()).to.equal(false);
        });

        it('Continue stroke writing fail', function () {
            expect(function () {
                inkManager.continueCapture(60, 8, 1);
            }).to.throw(Error);
        });

        it('End stroke writing fail', function () {
            expect(function () {
                inkManager.endCapture(75, 11, 2);
            }).to.throw(Error);
        });

    });

});