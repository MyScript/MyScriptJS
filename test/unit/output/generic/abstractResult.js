'use strict';

describe('AbstractResult: output/generic/abstractResult.js', function () {

    describe('Default construction', function () {

        var abstractResult;
        before(function (done) {
            abstractResult = new MyScript.AbstractResult();
            done();
        });

        it('Check initial state', function () {
            expect(abstractResult).to.be.an('object');
            expect(abstractResult).to.be.an.instanceOf(MyScript.AbstractResult);
        });

        it('Get instance Id', function () {
            expect(abstractResult.getInstanceId()).to.equal(undefined);
        });

        it('Get document', function () {
            expect(abstractResult.getDocument()).to.equal(undefined);
        });

    });

});