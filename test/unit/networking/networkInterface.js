'use strict';

describe('NetworkInterface: input/networking/networkInterface.js', function () {

    describe('Default construction', function () {

        var networkInterface;
        before(function (done) {
            networkInterface = new MyScript.NetworkInterface();
            done();
        });

        it('Check initial state', function () {
            expect(networkInterface).to.be.an('object');
            expect(networkInterface).to.be.an.instanceOf(MyScript.NetworkInterface);
        });

        it('Transform request', function () {
            var req = new MyScript.TextRecognitionData();
            req.setApplicationKey('test');
            expect(MyScript.NetworkInterface.transformRequest(req)).to.equal('applicationKey=test');
        });

        it('Parse response', function () {
            var res = {
                responseText: '{test: [0,1,2,3]}'
            };
            expect(MyScript.NetworkInterface.parse(res)).to.equal('{test: [0,1,2,3]}');
        });

    });
});