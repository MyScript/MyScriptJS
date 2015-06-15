'use strict';

describe('AnalyzerCellData: output/analyzer/analyzerCellData.js', function () {

    describe('Default construction', function () {

        var analyzerCellData;
        before(function (done) {
            analyzerCellData = new MyScript.AnalyzerCellData();
            done();
        });

        it('Check initial state', function () {
            expect(analyzerCellData).to.be.an('object');
            expect(analyzerCellData).to.be.an.instanceOf(MyScript.AnalyzerCellData);
        });

        it('First Column getter', function () {
            expect(analyzerCellData.getFirstColumn()).to.be.undefined;
        });

        it('Last Column getter', function () {
            expect(analyzerCellData.getLastColumn()).to.be.undefined;
        });

        it('First Row getter', function () {
            expect(analyzerCellData.getFirstRow()).to.be.undefined;
        });

        it('Last Row getter', function () {
            expect(analyzerCellData.getLastRow()).to.be.undefined;
        });

        it('Height getter', function () {
            expect(analyzerCellData.getHeight()).to.be.undefined;
        });

        it('Width getter', function () {
            expect(analyzerCellData.getWidth()).to.be.undefined;
        });

        it('Orientation getter', function () {
            expect(analyzerCellData.getOrientation()).to.be.undefined;
        });

        it('Top Left Point getter', function () {
            expect(analyzerCellData.getTopLeftPoint()).to.be.undefined;
        });

        it('Has Top Border getter', function () {
            expect(analyzerCellData.hasTopBorder()).to.be.undefined;
        });

        it('Has Bottom Border getter', function () {
            expect(analyzerCellData.hasBottomBorder()).to.be.undefined;
        });

        it('Has Left Border getter', function () {
            expect(analyzerCellData.hasLeftBorder()).to.be.undefined;
        });

        it('Has Right Border getter', function () {
            expect(analyzerCellData.hasRightBorder()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var analyzerCellData;
        before(function (done) {
            analyzerCellData = new MyScript.AnalyzerCellData({
                topLeftPoint: {
                    x: 0,
                    y: 0
                },
                height: 1,
                width: 1
            });
            done();
        });

        it('Check initial state', function () {
            expect(analyzerCellData).to.be.an('object');
            expect(analyzerCellData).to.be.an.instanceOf(MyScript.AnalyzerCellData);
        });

        it('Get top left point', function () {
            expect(analyzerCellData.getTopLeftPoint()).to.be.an.instanceOf(MyScript.Point);
        });
        it('Get bounding box', function () {
            expect(analyzerCellData.getBoundingBox()).to.be.an.instanceOf(MyScript.Rectangle);
        });

    });

});