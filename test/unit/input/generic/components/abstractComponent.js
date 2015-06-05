'use strict';

describe('AbstractComponent: input/generic/components/abstractComponent.js', function () {

    describe('Default construction', function () {

        var abstractComponent;
        before(function (done) {
            abstractComponent = new MyScript.AbstractComponent();
            done();
        });

        it('check initial state', function () {
            expect(abstractComponent).to.be.an('object');
            expect(abstractComponent).to.be.an.instanceof(MyScript.AbstractComponent);
        });

    });

    describe('Accessors', function () {

        var abstractComponent;
        before(function (done) {
            abstractComponent = new MyScript.AbstractComponent();
            done();
        });

        it('type getter', function () {
            expect(abstractComponent.getType()).to.be.undefined;
        });

        it('type setter', function () {
            expect(abstractComponent.getType()).to.be.undefined;
            abstractComponent.setType('stroke');
            expect(abstractComponent.getType()).not.to.be.undefined;
            expect(abstractComponent.getType()).to.equal('stroke');
        });

    });

});