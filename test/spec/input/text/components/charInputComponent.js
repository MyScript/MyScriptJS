'use strict';

describe('MyScriptJS: input/text/components/charInputComponent.js', function () {

    var expect = require('chai').expect;

    it('CharInputComponent object exist', function () {
        expect(MyScript.CharInputComponent).to.exist;
        expect(MyScript.CharInputComponent).not.to.be.null;
        expect(MyScript.CharInputComponent).to.not.be.undefined;
    });

    it('CharInputComponent constructor', function () {
        var charInputComponent = new MyScript.CharInputComponent();
        expect(charInputComponent).to.be.an('object');
        expect(charInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
        expect(charInputComponent).to.be.an.instanceof(MyScript.CharInputComponent);
        expect(charInputComponent).to.have.ownProperty('type');
    });

    it('CharInputComponent Character getter', function () {
        var charInputComponent = new MyScript.CharInputComponent();
        expect(charInputComponent.getCharacter()).to.be.undefined;
    });

    it('CharInputComponent Character setter', function () {
        var charInputComponent = new MyScript.CharInputComponent();
        expect(charInputComponent.getCharacter()).to.be.undefined;
        charInputComponent.setCharacter('c');
        expect(charInputComponent.getCharacter()).not.to.be.undefined;
        expect(charInputComponent.getCharacter()).to.be.equal('c');
    });


});