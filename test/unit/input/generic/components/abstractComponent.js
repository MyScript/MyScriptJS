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
            expect(abstractComponent).to.be.an.instanceOf(MyScript.AbstractComponent);
        });

        it('Get type', function () {
            expect(abstractComponent.getType()).to.equal(undefined);
        });

        it('Set type', function () {
            abstractComponent.setType('stroke');
            expect(abstractComponent.getType()).to.equal('stroke');
        });

        it('Get bounding box', function () {
            expect(function () {
                abstractComponent.getBoundingBox();
            }).to.throw(Error);
        });

        it('Set bounding box', function () {
            expect(function () {
                abstractComponent.setBoundingBox(new MyScript.Rectangle());
            }).to.throw(Error);
        });

    });

});