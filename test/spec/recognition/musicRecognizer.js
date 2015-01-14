'use strict';

describe('MyScriptJS: recognition/musicRecognizer.js', function () {

    it('MusicRecognizer object exist', function () {
        expect(MyScript.MusicRecognizer).to.exist;
        expect(MyScript.MusicRecognizer).not.to.be.null;
        expect(MyScript.MusicRecognizer).to.not.be.undefined;
    });

    it('MusicRecognizer constructor', function () {
        var musicRecognizer = new MyScript.MusicRecognizer('http://localhost:3001/api/myscript/v2.0');
        expect(musicRecognizer).to.be.an('object');
        expect(musicRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(musicRecognizer).to.be.an.instanceof(MyScript.MusicRecognizer);
    });

    it('MusicRecognizer Do SimpleRecognition', function () {
        var musicRecognizer = new MyScript.MusicRecognizer('http://localhost:3001/api/myscript/v2.0'),
            applicationKey = '2862eaff-c535-4022-8242-8342f14af0b4',
            parameters = new MyScript.MusicParameter(),
            instanceId = '',
            stroke1 = new MyScript.Stroke(),
            stroke2 = new MyScript.Stroke(),
            stroke3 = new MyScript.Stroke(),
            stroke4 = new MyScript.Stroke(),
            stroke5 = new MyScript.Stroke(),
            stroke6 = new MyScript.Stroke(),
            clefInput = new MyScript.MusicClefInput(),
            clefComponent = new MyScript.MusicClefInputComponent(),
            staff = new MyScript.MusicStaff(),
            components = [],
            hmacKey = 'bab75635-ee72-1612-2cb0-a72650b60838';

        staff.setCount(5);
        staff.setTop(100);
        staff.setGap(20);

        parameters.setStaff(staff);
        parameters.setDivisions(480);
        parameters.setResultTypes(['MUSICXML','SCORETREE']);

        clefInput.setSymbol('G');
        clefInput.setOctave(0);
        clefInput.setYAnchor(160);
        clefComponent.setValue(clefInput);
        clefComponent.setBoundingBox(new MyScript.Rectangle({"x":5,"y":72,"height":140,"width":52.5}));

        stroke1.setX([126,126]);
        stroke1.setY([134,133]);
        stroke2.setX([137,137,138,139,140,140,140,140,140,140,141,141,141,142,142,142,142,142,142,143]);
        stroke2.setY([126,125,124,122,121,119,117,115,114,112,111,110,108,107,106,105,104,103,102,101]);
        stroke3.setX([178,179,179,179,180,180,181,180]);
        stroke3.setY([151,151,150,149,148,147,147,147]);
        stroke4.setX([183,183,184,184,184,184,184,185,185,185,185,185,185,185,186,186,186,186,187,187,187,187,187,187,188,188,188,188,188,188]);
        stroke4.setY([146,145,142,140,139,137,135,133,132,130,129,128,127,126,125,124,122,121,120,119,117,116,115,114,113,112,110,109,108,107]);
        stroke5.setX([249,248,248,249,249,249,249,249,248,247,246,245,245,245,245,246,246,246]);
        stroke5.setY([118,117,116,116,117,118,119,120,120,120,119,118,117,116,115,115,116,117]);
        stroke6.setX([251,252,252,252,252,252,252,252,253,253,253,253,253,253,253,253,253,253,253,253,253,253,253,254,254,254,254]);
        stroke6.setY([118,116,115,113,111,109,108,106,104,103,101,100,98,96,94,93,91,90,89,87,86,85,84,83,82,81,80]);

        components.push(clefComponent);
        components.push(stroke1);
        components.push(stroke2);
        components.push(stroke3);
        components.push(stroke4);
        components.push(stroke5);
        components.push(stroke6);

        musicRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {
                expect(response.instanceId).to.not.be.undefined;
                expect(response.result.results.length).to.be.equal(2);
            },
            function error (response) {
                expect(response).to.be.equal('');
            }
        );
    });

});