'use strict';

describe('AbstractResult: output/generic/abstractResult.js', function () {

    describe('Default construction', function () {

        var abstractResult;
        before(function (done) {
            abstractResult = new MyScript.AbstractResult();
            done();
        });

        it('check initial state', function () {
            expect(abstractResult).to.be.an('object');
            expect(abstractResult).to.be.an.instanceof(MyScript.AbstractResult);
        });

        it('Instance Id getter', function () {
            expect(abstractResult.getInstanceId()).to.be.undefined;
        });

    });

});