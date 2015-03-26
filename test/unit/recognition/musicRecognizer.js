'use strict';

describe('MyScriptJS: recognition/musicRecognizer.js', function () {

    it('MusicRecognizer object exist', function () {
        expect(MyScript.MusicRecognizer).to.exist;
        expect(MyScript.MusicRecognizer).not.to.be.null;
        expect(MyScript.MusicRecognizer).to.not.be.undefined;
    });

    var musicRecognizer = new MyScript.MusicRecognizer('cloud-internal-stable.visionobjects.com');
    it('MusicRecognizer constructor', function () {
        expect(musicRecognizer).to.be.an('object');
        expect(musicRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(musicRecognizer).to.be.an.instanceof(MyScript.MusicRecognizer);
    });

    it('Get parameters', function () {
        expect(musicRecognizer.getParameters()).to.be.an.instanceof(MyScript.MusicParameter);
    });

    var staff = new MyScript.MusicStaff();
    staff.setTop(100);
    staff.setGap(20);
    staff.setCount(5);

    var parameters = new MyScript.MusicParameter();
    parameters.setStaff(staff);
    parameters.setDivisions(480);
    parameters.setResultTypes(['MUSICXML', 'SCORETREE']);
    it('Set parameters', function () {
        musicRecognizer.setParameters(parameters);
        expect(musicRecognizer.getParameters()).to.be.an.instanceof(MyScript.MusicParameter);
    });

    var applicationKey = '2862eaff-c535-4022-8242-8342f14af0b4';
    var hmacKey = 'bab75635-ee72-1612-2cb0-a72650b60838';
    var instanceId;

    var stroke = new MyScript.Stroke();
    stroke.setX([126, 126]);
    stroke.setY([134, 133]);

    var clefComponent = new MyScript.MusicClefInputComponent();
    clefComponent.getValue().setYAnchor(160);
    clefComponent.setBoundingBox(new MyScript.Rectangle({'x': 5, 'y': 72, 'height': 140, 'width': 52.5}));

    var components = [clefComponent, stroke];

    it('Do simple music recognition', function (done) {
        musicRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey).then(
            function success(response) {
                expect(response.instanceId).to.not.be.undefined;
                expect(response.result.results.length).to.be.equal(2);
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.not.be.undefined;
                done(undefined, response);
            }
        );
    });

    it('Do simple music recognition with custom parameters', function (done) {
        musicRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
            function success(response) {
                expect(response.instanceId).to.not.be.undefined;
                expect(response.result.results.length).to.be.equal(2);
                done(undefined, response);
            },
            function error(response) {
                expect(response).to.not.be.undefined;
                done(undefined, response);
            }
        );
    });

    it('Return an error on simple music recognition', function (done) {
        musicRecognizer.doSimpleRecognition('test', instanceId, components).then(
            function success (response) {
                done(response);
            },
            function error (response) {
                expect(response).to.not.be.undefined;
                done(undefined, response);
            }
        );
    });

});