'use strict';

describe('MyScriptJS: recognition/musicRecognizer.js', function () {

    it('MusicRecognizer object exist', function () {
        expect(MyScript.MusicRecognizer).to.exist;
        expect(MyScript.MusicRecognizer).not.to.be.null;
        expect(MyScript.MusicRecognizer).to.not.be.undefined;
    });

    var musicRecognizer = new MyScript.MusicRecognizer('cloud-internal-master.visionobjects.com');
    it('MusicRecognizer constructor', function () {
        expect(musicRecognizer).to.be.an('object');
        expect(musicRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(musicRecognizer).to.be.an.instanceof(MyScript.MusicRecognizer);
    });

    var applicationKey = '2862eaff-c535-4022-8242-8342f14af0b4';
    var hmacKey = 'bab75635-ee72-1612-2cb0-a72650b60838';
    var instanceId;

    var staff = new MyScript.MusicStaff();
    staff.setTop(100);
    staff.setGap(20);
    staff.setCount(5);

    musicRecognizer.getParameters().setStaff(staff);
    musicRecognizer.getParameters().setDivisions(480);
    musicRecognizer.getParameters().setResultTypes(['MUSICXML', 'SCORETREE']);

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
                expect(response).to.be.equal('');
                done(response);
            }
        );
    });

});