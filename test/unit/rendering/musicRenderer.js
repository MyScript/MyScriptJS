'use strict';

describe('MusicRenderer: rendering/musicRenderer.js', function () {

    describe('Default construction', function () {

        var musicRenderer;
        before(function (done) {
            musicRenderer = new MyScript.MusicRenderer();
            done();
        });

        it('check initial state', function () {
            expect(musicRenderer).to.be.an('object');
            expect(musicRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
            expect(musicRenderer).to.be.an.instanceof(MyScript.MusicRenderer);
        });

    });

    describe('Workflow', function () {

        var musicRenderer;
        before(function (done) {
            musicRenderer = new MyScript.MusicRenderer();
            done();
        });

        var context = document.createElement('canvas').getContext('2d');
        context.canvas.clientWidth = 800;
        context.canvas.clientHeight = 600;

        var stroke1 = new MyScript.Stroke();
        stroke1.setX([183, 185, 185, 186, 187, 188, 187, 186, 185, 184, 185, 186]);
        stroke1.setY([148, 148, 149, 149, 149, 150, 150, 149, 149, 149, 149, 149]);

        var stroke2 = new MyScript.Stroke();
        stroke2.setX([194, 194, 194, 194, 195, 195, 195, 195, 195, 196, 196, 196, 197, 197, 197, 197, 198, 198, 198, 198, 198, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199, 199]);
        stroke2.setY([152, 150, 148, 147, 146, 145, 144, 143, 142, 141, 140, 138, 137, 136, 135, 134, 133, 132, 131, 130, 129, 129, 128, 127, 126, 124, 122, 120, 118, 117, 116, 115, 113, 112, 111, 110, 109, 108, 107, 105, 104, 103, 102, 101, 99, 98, 96, 95, 94, 93, 91, 90, 89, 88, 87, 86, 84, 83]);

        var stroke3 = new MyScript.Stroke();
        stroke3.setX([175, 176, 177, 178, 179, 180, 182, 183, 186, 188, 190, 192, 194, 196, 198, 199, 201, 202, 203, 204, 205, 207, 208, 209, 210, 211, 213, 214, 214, 212, 210, 208, 206, 203, 201, 199, 197, 194, 192, 189, 187, 185, 183, 181, 179, 177, 176, 174, 172, 171, 173, 175, 178, 181, 185, 188, 192, 197, 200, 201, 202, 204, 205, 207, 206, 204, 202, 200, 197, 195, 193, 190, 187, 185, 182, 180, 178, 176, 175, 174, 173, 172, 171, 172, 174, 176, 179, 182, 186, 189, 193, 196, 198, 200, 202, 203, 205, 207, 209, 211, 212, 211, 210, 209, 207, 205, 203, 201, 199, 196, 194, 192, 191, 190, 191, 193, 195, 197, 199, 202, 205, 207, 210, 213, 215, 216, 214, 210, 204, 198, 193, 187, 182, 178, 175, 175, 174, 175, 176, 178, 180, 182, 184, 187, 189, 191, 193, 195, 197, 199, 201, 202, 201, 199, 197, 195, 192, 190, 188, 185, 183, 181, 180, 179, 178, 180, 183, 186, 193, 200, 207, 215, 222, 228, 232, 233, 234, 233, 232, 231, 230, 228, 225, 222, 219, 215, 211, 208, 205, 203, 201, 200, 197, 194, 192, 190, 190, 189, 187, 184, 180, 177, 174, 171, 170, 169]);
        stroke3.setY([88, 88, 88, 88, 88, 88, 88, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 86, 86, 86, 86, 86, 86, 86, 87, 87, 88, 89, 89, 90, 91, 92, 92, 93, 94, 94, 95, 96, 96, 97, 98, 98, 98, 99, 99, 100, 100, 100, 101, 101, 102, 102, 103, 104, 104, 105, 105, 105, 105, 105, 106, 106, 106, 107, 107, 108, 109, 109, 110, 111, 111, 112, 112, 113, 114, 114, 114, 114, 114, 115, 115, 115, 115, 115, 115, 115, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 117, 117, 118, 118, 119, 119, 119, 120, 121, 121, 122, 122, 123, 123, 123, 123, 123, 124, 124, 125, 126, 127, 128, 128, 129, 129, 130, 131, 131, 133, 133, 133, 134, 134, 134, 135, 135, 135, 135, 135, 135, 136, 136, 137, 137, 138, 138, 138, 139, 139, 140, 140, 141, 141, 141, 142, 142, 143, 144, 145, 145, 146, 147, 147, 147, 147, 147, 147, 147, 149, 149, 149, 149, 149, 150, 150, 150, 150, 150, 151, 151, 151, 151, 151, 152, 152, 152, 152, 152, 152, 152, 152, 153, 153, 154, 154, 155, 155, 155, 156, 158, 159, 161, 161, 161, 162]);

        var strokes = [stroke1, stroke2, stroke3];
        it('Draw music recognition result', function () {
            var recognitionResult = new MyScript.MusicDocument();
            musicRenderer.drawRecognitionResult(strokes, recognitionResult, context);
        });

        it('Remove scratched out', function () {
            var scratchOutResults = [new MyScript.MusicScratchOut({
                'erasedInputRanges': [{
                    'component': 1,
                    'firstItem': 0.0,
                    'lastItem': 11.0
                }, {'component': 2, 'firstItem': 0.0, 'lastItem': 57.0}],
                'inputRanges': [{'component': 3, 'firstItem': 0.0, 'lastItem': 205.0}]
            })];
            expect(musicRenderer.removeScratchOut(strokes, scratchOutResults).length).to.be.equal(1);
        });

        var staff = new MyScript.MusicStaff();

        it('Draw music staff', function () {
            musicRenderer.drawStaff(staff, context);
        });

        var components = [];
        var boundingBox = new MyScript.Rectangle();
        boundingBox.setX(0);
        boundingBox.setY(0);
        boundingBox.setWidth(10);
        boundingBox.setHeight(20);

        var accidental = new MyScript.MusicAccidentalInputComponent();
        accidental.setBoundingBox(boundingBox);
        components.push(accidental);
        it('Draw music components: MusicAccidentalInputComponent', function () {
            var test = [components[0]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var arpeggiate = new MyScript.MusicArpeggiateInputComponent();
        arpeggiate.setBoundingBox(boundingBox);
        components.push(arpeggiate);
        it('Draw music components: MusicArpeggiateInputComponent', function () {
            var test = [components[1]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var bar = new MyScript.MusicBarInputComponent();
        bar.setBoundingBox(boundingBox);
        components.push(bar);
        it('Draw music components: MusicBarInputComponent', function () {
            var test = [components[2]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var beam = new MyScript.MusicBeamInputComponent();
        beam.setBoundingBox(boundingBox);
        components.push(beam);
        it('Draw music components: MusicBeamInputComponent', function () {
            var test = [components[3]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var clef = new MyScript.MusicClefInputComponent();
        clef.setBoundingBox(boundingBox);
        clef.getValue().setSymbol('A');
        components.push(clef);
        it('Draw music components: MusicClefInputComponent fail', function () {
            var test = [clef];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });
        it('Draw music components: MusicClefInputComponent F', function () {
            var test = [clef];
            test[0].getValue().setSymbol('F');
            musicRenderer.drawComponents(test, context);
        });
        it('Draw music components: MusicClefInputComponent C', function () {
            var test = [clef];
            test[0].getValue().setSymbol('C');
            musicRenderer.drawComponents(test, context);
        });
        it('Draw music components: MusicClefInputComponent G', function () {
            var test = [clef];
            test[0].getValue().setSymbol('G');
            musicRenderer.drawComponents(test, context);
        });

        var decoration = new MyScript.MusicDecorationInputComponent();
        decoration.setBoundingBox(boundingBox);
        components.push(decoration);
        it('Draw music components: MusicDecorationInputComponent', function () {
            var test = [components[5]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var dots = new MyScript.MusicDotsInputComponent();
        dots.setBoundingBox(boundingBox);
        components.push(dots);
        it('Draw music components: MusicDotsInputComponent', function () {
            var test = [components[6]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var head = new MyScript.MusicHeadInputComponent();
        head.setBoundingBox(boundingBox);
        components.push(head);
        it('Draw music components: MusicHeadInputComponent', function () {
            var test = [components[7]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var ledgerLine = new MyScript.MusicLedgerLineInputComponent();
        ledgerLine.setBoundingBox(boundingBox);
        components.push(ledgerLine);
        it('Draw music components: MusicLedgerLineInputComponent', function () {
            var test = [components[8]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var rest = new MyScript.MusicRestInputComponent();
        rest.setBoundingBox(boundingBox);
        components.push(rest);
        it('Draw music components: MusicRestInputComponent', function () {
            var test = [components[9]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var stem = new MyScript.MusicStemInputComponent();
        stem.setBoundingBox(boundingBox);
        components.push(stem);
        it('Draw music components: MusicStemInputComponent', function () {
            var test = [components[10]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var tieOrSlur = new MyScript.MusicTieOrSlurInputComponent();
        tieOrSlur.setBoundingBox(boundingBox);
        components.push(tieOrSlur);
        it('Draw music components: MusicTieOrSlurInputComponent', function () {
            var test = [components[11]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        var timeSignature = new MyScript.MusicTimeSignatureInputComponent();
        timeSignature.setBoundingBox(boundingBox);
        components.push(timeSignature);
        it('Draw music components: MusicTimeSignatureInputComponent', function () {
            var test = [components[12]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

        components.push({test: 'test'});
        it('Draw music components: Unknown', function () {
            var test = [components[13]];
            expect(function () {
                musicRenderer.drawComponents(test, context);
            }).to.throw(Error);
        });

    });

});