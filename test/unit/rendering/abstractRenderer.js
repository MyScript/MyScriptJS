'use strict';

describe('AbstractRenderer: rendering/abstractRenderer.js', function () {

    describe('Default construction', function () {

        var abstractRenderer;
        before(function (done) {
            abstractRenderer = new MyScript.AbstractRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(abstractRenderer).to.be.an('object');
            expect(abstractRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
            expect(abstractRenderer).to.have.ownProperty('points');
            expect(abstractRenderer).to.have.ownProperty('drawing');
            expect(abstractRenderer).to.have.ownProperty('parameters');
        });

        it('Get parameters', function () {
            expect(abstractRenderer.getParameters()).to.be.an.instanceof(MyScript.RenderingParameters);
        });

        it('Set parameters', function () {
            abstractRenderer.setParameters(new MyScript.RenderingParameters());
            expect(abstractRenderer.getParameters()).to.be.an.instanceof(MyScript.RenderingParameters);
        });

    });

    describe('Workflow', function () {

        var abstractRenderer, parameters, context, stroke, point;
        before(function (done) {
            abstractRenderer = new MyScript.AbstractRenderer();
            parameters = new MyScript.RenderingParameters();
            context = document.createElement('canvas').getContext('2d');
            context.canvas.clientWidth = 800;
            context.canvas.clientHeight = 600;
            stroke = new MyScript.Stroke();
            stroke.setX([357, 357, 357, 357]);
            stroke.setY([115, 116, 122, 133]);
            point = new MyScript.Stroke();
            point.setX([4]);
            point.setY([150]);
            done();
        });

        it('Draw components', function () {
            abstractRenderer.drawComponents([stroke], context);
            abstractRenderer.drawComponents([stroke], context, parameters);
            parameters.setPressureType('CONSTANT');
            abstractRenderer.drawComponents([stroke], context);
            abstractRenderer.drawComponents([stroke], context, parameters);
            parameters.setPressureType('REAL');
            abstractRenderer.drawComponents([stroke], context);
            abstractRenderer.drawComponents([stroke], context, parameters);
            parameters.setPressureType('RANDOM');
            abstractRenderer.drawComponents([point], context);
            abstractRenderer.drawComponents([point], context, parameters);
        });

        it('Draw character input component', function () {
            expect(function () {abstractRenderer.drawComponents([new MyScript.CharacterInputComponent()], context, abstractRenderer.getParameters());}).to.throw(Error);
        });

        it('Clear context', function () {
            abstractRenderer.clear(context);
        });

        it('Draw guidelines', function () {
            abstractRenderer.drawGuidelines(undefined, 5, context);
            abstractRenderer.drawGuidelines(5, undefined, context, parameters);
        });

        it('Draw recognition result', function () {
            expect(function () {abstractRenderer.drawRecognitionResult(new MyScript.TextDocument(), context);}).to.throw(Error);
        });

    });
});