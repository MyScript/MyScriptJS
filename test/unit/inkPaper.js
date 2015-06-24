'use strict';

describe('InkPaper: inkPaper.js', function () {

    describe('Default construction', function () {

        var inkPaper;
        before(function (done) {
            var parent = document.createElement('div');
            inkPaper = new MyScript.InkPaper(parent);
            done();
        });

        it('Check initial state', function () {
            expect(inkPaper).to.be.an('object');
            expect(inkPaper).to.be.an.instanceOf(MyScript.InkPaper);
            expect(inkPaper).to.have.ownProperty('options');
            expect(inkPaper).to.have.ownProperty('components');
            expect(inkPaper).to.have.ownProperty('redoComponents');
            expect(inkPaper).to.have.ownProperty('_inkGrabber');
            expect(inkPaper).to.have.ownProperty('_textRenderer');
            expect(inkPaper).to.have.ownProperty('_mathRenderer');
            expect(inkPaper).to.have.ownProperty('_shapeRenderer');
            expect(inkPaper).to.have.ownProperty('_analyzerRenderer');
            expect(inkPaper).to.have.ownProperty('_musicRenderer');
            expect(inkPaper).to.have.ownProperty('_selectedRenderer');
            expect(inkPaper).to.have.ownProperty('_textRecognizer');
            expect(inkPaper).to.have.ownProperty('_mathRecognizer');
            expect(inkPaper).to.have.ownProperty('_shapeRecognizer');
            expect(inkPaper).to.have.ownProperty('_analyzerRecognizer');
            expect(inkPaper).to.have.ownProperty('_musicRecognizer');
            expect(inkPaper).to.have.ownProperty('_selectedRecognizer');
        });

    });

    describe('JSON construction', function () {

        var inkPaper;
        before(function (done) {
            var parent = document.createElement('div');
            inkPaper = new MyScript.InkPaper(parent, {
                type: 'MATH',
                url: 'cloud.myscript.com',
                applicationKey: 'test-application-key',
                hmacKey: 'test-hmac-key'
            });
            done();
        });

        it('Check initial state', function () {
            expect(inkPaper).to.be.an('object');
            expect(inkPaper).to.be.an.instanceOf(MyScript.InkPaper);
            expect(inkPaper).to.have.ownProperty('options');
            expect(inkPaper).to.have.ownProperty('components');
            expect(inkPaper).to.have.ownProperty('redoComponents');
            expect(inkPaper).to.have.ownProperty('_inkGrabber');
            expect(inkPaper).to.have.ownProperty('_textRenderer');
            expect(inkPaper).to.have.ownProperty('_mathRenderer');
            expect(inkPaper).to.have.ownProperty('_shapeRenderer');
            expect(inkPaper).to.have.ownProperty('_analyzerRenderer');
            expect(inkPaper).to.have.ownProperty('_musicRenderer');
            expect(inkPaper).to.have.ownProperty('_selectedRenderer');
            expect(inkPaper).to.have.ownProperty('_textRecognizer');
            expect(inkPaper).to.have.ownProperty('_mathRecognizer');
            expect(inkPaper).to.have.ownProperty('_shapeRecognizer');
            expect(inkPaper).to.have.ownProperty('_analyzerRecognizer');
            expect(inkPaper).to.have.ownProperty('_musicRecognizer');
            expect(inkPaper).to.have.ownProperty('_selectedRecognizer');
        });

        it('Get renderer', function () {
            expect(inkPaper.getRenderer()).to.be.an.instanceOf(MyScript.AbstractRenderer);
        });

        it('Get ink capturer', function () {
            expect(inkPaper.getInkGrabber()).to.be.an.instanceOf(MyScript.InkGrabber);
        });

        it('Get recognizer', function () {
            expect(inkPaper.getRecognizer()).to.be.an.instanceOf(MyScript.AbstractRecognizer);
        });

        it('Set callback', function () {
            expect(function () {
                inkPaper.setCallback(function (data, err) {
                });
            }).to.not.throw(Error);
        });

    });

    describe('Workflow', function () {

        var recognitionTypes = ['TEXT', 'MATH', 'SHAPE', 'ANALYZER', 'MUSIC'];
        recognitionTypes.forEach(function (element) {

            var inkPaper;
            before(function (done) {
                var parent = document.createElement('div');
                var options = {
                    type: element,
                    timeout: -1
                };
                if ('MUSIC' === element) {
                    options.musicParameters = {
                        staff: new MyScript.MusicStaff()
                    };
                }
                inkPaper = new MyScript.InkPaper(parent, options);
                done();
            });

            it('Check initial state', function () {
                expect(inkPaper).to.be.an('object');
                expect(inkPaper).to.be.an.instanceOf(MyScript.InkPaper);
            });

            it('Draw start', function () {
                expect(function () {
                    inkPaper._down(1, 2);
                }).to.not.throw(Error);
            });

            it('Draw continue', function () {
                expect(function () {
                    inkPaper._move(2, 3);
                }).to.not.throw(Error);
            });

            it('Draw end', function () {
                expect(function () {
                    inkPaper._up(3, 4);
                }).to.not.throw(Error);
            });

            it('Undo', function () {
                expect(function () {
                    inkPaper.undo();
                }).to.not.throw(Error);
            });

            it('Undo with nothing to undo', function () {
                expect(function () {
                    inkPaper.undo();
                }).to.not.throw(Error);
            });

            it('Redo', function () {
                expect(function () {
                    inkPaper.redo();
                }).to.not.throw(Error);
            });

            it('Redo with nothing to redo', function () {
                expect(function () {
                    inkPaper.redo();
                }).to.not.throw(Error);
            });

            it('Clear', function () {
                expect(function () {
                    inkPaper.clear();
                }).to.not.throw(Error);
            });

        });

    });

});