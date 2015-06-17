'use strict';

describe('AbstractRenderer: rendering/abstractRenderer.js', function () {

    describe('Default construction', function () {

        var abstractRenderer;
        before(function (done) {
            var canvas = document.createElement('canvas');
            abstractRenderer = new MyScript.AbstractRenderer(canvas.getContext('2d'));
            done();
        });

        it('Check initial state', function () {
            expect(abstractRenderer).to.be.an('object');
            expect(abstractRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(abstractRenderer).to.have.ownProperty('context');
            expect(abstractRenderer).to.have.ownProperty('penParameters');
            expect(abstractRenderer).to.have.ownProperty('showBoundingBoxes');
        });

        it('Get rendering parameters', function () {
            expect(abstractRenderer.getParameters()).to.be.an.instanceOf(MyScript.PenParameters);
        });

        it('Set rendering parameters', function () {
            abstractRenderer.setParameters(new MyScript.PenParameters());
            expect(abstractRenderer.getParameters()).to.be.an.instanceOf(MyScript.PenParameters);
        });

        it('Get show bounding box', function () {
            expect(abstractRenderer.getShowBoundingBoxes()).to.equal(false);
        });

        it('Set show bounding box', function () {
            abstractRenderer.setShowBoundingBoxes(true);
            expect(abstractRenderer.getShowBoundingBoxes()).to.equal(true);
        });

        it('Get is typesetting', function () {
            expect(abstractRenderer.isTypesetting()).to.equal(true);
        });

        it('Set typeset', function () {
            abstractRenderer.setTypeset(false);
            expect(abstractRenderer.isTypesetting()).to.equal(false);
        });

    });

    describe('Workflow', function () {

        var abstractRenderer, context;
        before(function (done) {
            var canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            abstractRenderer = new MyScript.AbstractRenderer(context);
            done();
        });

        it('Clear context', function () {
            expect(function () {
                abstractRenderer.clear();
            }).to.not.throw(Error);
        });

        it('Draw character', function () {
            expect(function () {
                abstractRenderer.drawCharacter(new MyScript.CharacterInputComponent());
            }).to.throw(Error);
        });

        it('Draw character (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawCharacter(new MyScript.CharacterInputComponent(), context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw rectangle', function () {
            expect(function () {
                abstractRenderer.drawRectangle(new MyScript.Rectangle());
            }).to.not.throw(Error);
        });

        it('Draw rectangle (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawRectangle(new MyScript.Rectangle(), context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw one point stroke', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357]);
            stroke.setY([115]);
            expect(function () {
                abstractRenderer.drawStroke(stroke);
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357, 357, 357, 357]);
            stroke.setY([115, 116, 122, 133]);
            expect(function () {
                abstractRenderer.drawStroke(stroke);
            }).to.not.throw(Error);
        });

        it('Draw strokes', function () {
            var stroke = new MyScript.Stroke();
            stroke.setX([357, 357, 357, 357]);
            stroke.setY([115, 116, 122, 133]);
            expect(function () {
                abstractRenderer.drawStrokes([stroke]);
            }).to.not.throw(Error);
        });

        it('Draw components', function () {
            expect(function () {
                abstractRenderer.drawComponents([]);
            }).to.throw(Error);
        });

        it('Draw components (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawComponents([], context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw stroke component', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.Stroke());
            }).to.not.throw(Error);
        });

        it('Draw stroke component (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.Stroke(), context, abstractRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw character component', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.CharacterInputComponent());
            }).to.throw(Error);
        });

        it('Draw character component (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawComponent(new MyScript.CharacterInputComponent(), context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                abstractRenderer.drawComponent({test: 'test'});
            }).to.throw(Error);
        });

        it('Draw unknown component (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawComponent({test: 'test'}, context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                abstractRenderer.drawRecognitionResult([], new MyScript.TextDocument());
            }).to.throw(Error);
        });

        it('Draw recognition result (@deprecated)', function () {
            expect(function () {
                abstractRenderer.drawRecognitionResult([], new MyScript.TextDocument(), context, abstractRenderer.getParameters());
            }).to.throw(Error);
        });

    });
});