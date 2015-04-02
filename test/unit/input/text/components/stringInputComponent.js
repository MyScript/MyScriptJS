'use strict';

describe('MyScriptJS: input/text/components/stringInputComponent.js', function () {

    it('StringInputComponent object exist', function () {
        expect(MyScript.StringInputComponent).to.exist;
        expect(MyScript.StringInputComponent).not.to.be.null;
        expect(MyScript.StringInputComponent).to.not.be.undefined;
    });

    it('StringInputComponent constructor', function () {
        var stringInputComponent = new MyScript.StringInputComponent();
        expect(stringInputComponent).to.be.an('object');
        expect(stringInputComponent).to.be.an.instanceof(MyScript.AbstractTextInputComponent);
        expect(stringInputComponent).to.be.an.instanceof(MyScript.StringInputComponent);
        expect(stringInputComponent).to.have.ownProperty('type');
    });

    it('StringInputComponent String getter', function () {
        var stringInputComponent = new MyScript.StringInputComponent();
        expect(stringInputComponent.getString()).to.be.undefined;
    });

    it('StringInputComponent String setter', function () {
        var stringInputComponent = new MyScript.StringInputComponent();
        expect(stringInputComponent.getString()).to.be.undefined;
        stringInputComponent.setString('mystring');
        expect(stringInputComponent.getString()).not.to.be.undefined;
        expect(stringInputComponent.getString()).to.be.equal('mystring');
    });

});