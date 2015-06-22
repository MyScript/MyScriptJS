'use strict';

describe('InkManager: common/inkManager.js', function () {

    describe('Default construction', function () {

        var inkManager;
        before(function (done) {
            inkManager = new MyScript.InkManager();
            done();
        });

        it('Check initial state', function () {
            expect(inkManager).to.be.an('object');
            expect(inkManager).to.be.an.instanceOf(MyScript.InkManager);
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

        var inkManager, context;
        before(function (done) {
            context = document.createElement('canvas').getContext('2d');
            inkManager = new MyScript.InkManager();
            done();
        });

        it('Start stroke writing', function () {
            inkManager.drawStart(50, 2, 0, context);
            expect(inkManager.getStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getStroke().getX()[0]).to.equal(50);
            expect(inkManager.getStroke().getY()[0]).to.equal(2);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Continue stroke writing', function () {
            inkManager.drawContinue(60, 8, 1, context);
            expect(inkManager.getStroke()).to.be.an.instanceOf(MyScript.Stroke);
            expect(inkManager.getStroke().getX()[1]).to.equal(60);
            expect(inkManager.getStroke().getY()[1]).to.equal(8);
            expect(inkManager.isWriting()).to.equal(true);
        });

        it('Start stroke writing fail', function () {
            expect(function () {
                inkManager.drawStart(60, 8, 1, context);
            }).to.throw(Error);
        });

        it('End stroke writing', function () {
            inkManager.drawEnd(75, 11, 2, context);
            expect(inkManager.isWriting()).to.equal(false);
        });

        it('Continue stroke writing fail', function () {
            expect(function () {
                inkManager.drawContinue(60, 8, 1, context);
            }).to.throw(Error);
        });

        it('End stroke writing fail', function () {
            expect(function () {
                inkManager.drawEnd(75, 11, 2, context);
            }).to.throw(Error);
        });

    });

});