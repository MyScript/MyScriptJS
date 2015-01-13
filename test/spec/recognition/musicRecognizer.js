'use strict';

describe('MyScriptJS: recognition/musicRecognizer.js', function () {

    it('MusicRecognizer object exist', function () {
        expect(MyScript.MusicRecognizer).to.exist;
        expect(MyScript.MusicRecognizer).not.to.be.null;
        expect(MyScript.MusicRecognizer).to.not.be.undefined;
    });

    it('MusicRecognizer constructor', function () {
        var musicRecognizer = new MyScript.MusicRecognizer('http://localhost:3001');
        expect(musicRecognizer).to.be.an('object');
        expect(musicRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(musicRecognizer).to.be.an.instanceof(MyScript.MusicRecognizer);
    });

    it('MusicRecognizer Do SimpleRecognition', function () {
        var musicRecognizer = new MyScript.MusicRecognizer('http://localhost:3001'),
            applicationKey = '',
            parameters = new MyScript.MusicParameter(),
            instanceId = '',
            components = [new MyScript.AbstractComponent()],
            hmacKey = '';

        musicRecognizer.doSimpleRecognition(applicationKey, parameters, instanceId, components, hmacKey).then(
            function success (response) {

            },
            function error (response) {

            }
        );
    });

});