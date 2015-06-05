'use strict';

describe('AbstractComponent: input/generic/components/abstractComponent.js', function () {

    describe('Default construction', function () {

        var abstractComponent;
        before(function (done) {
            abstractComponent = new MyScript.AbstractComponent();
            done();
        });

        it('Check initial state', function () {
            expect(abstractComponent).to.be.an('object');
            expect(abstractComponent).to.be.an.instanceof(MyScript.AbstractComponent);
        });

        it('Get type', function () {
            expect(abstractComponent.getType()).to.be.undefined;
        });

        it('Set type', function () {
            abstractComponent.setType('stroke');
            expect(abstractComponent.getType()).not.to.be.undefined;
            expect(abstractComponent.getType()).to.equal('stroke');
        });

    });

});