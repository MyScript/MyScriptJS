'use strict';

describe('NetworkWSInterface: input/networking/networkWSInterface.js', function () {

    describe('Default construction', function () {

        var networkWSInterface;
        before(function (done) {
            networkWSInterface = new MyScript.NetworkWSInterface('wss://cloud.myscript.com/api/v3.0/recognition/ws/text');
            done();
        });

        it('Check initial state', function () {
            expect(networkWSInterface).to.be.an('object');
            expect(networkWSInterface).to.be.an.instanceOf(MyScript.NetworkWSInterface);
        });

    });
});