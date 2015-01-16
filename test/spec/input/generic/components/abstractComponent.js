'use strict';

describe('MyScriptJS: input/generic/components/abstractComponent.js', function () {

    var expect = require('chai').expect;

    it('AbstractComponent object exist', function () {
        expect(MyScript.AbstractComponent).to.exist;
        expect(MyScript.AbstractComponent).not.to.be.null;
        expect(MyScript.AbstractComponent).to.not.be.undefined;
    });

    it('AbstractComponent constructor', function () {
        var abstractComponent = new MyScript.AbstractComponent();
        expect(abstractComponent).to.be.an('object');
        expect(abstractComponent).to.be.an.instanceof(MyScript.AbstractComponent);
    });

    it('AbstractComponent type getter', function () {
        var abstractComponent = new MyScript.AbstractComponent();
        expect(abstractComponent.getType()).to.be.undefined;
    });

    it('AbstractComponent type setter', function () {
        var abstractComponent = new MyScript.AbstractComponent();
        expect(abstractComponent.getType()).to.be.undefined;
        abstractComponent.setType('stroke');
        expect(abstractComponent.getType()).not.to.be.undefined;
        expect(abstractComponent.getType()).to.equal('stroke');
    });

});