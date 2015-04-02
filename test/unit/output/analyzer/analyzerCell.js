'use strict';

describe('MyScriptJS: output/analyzer/analyzerCell.js', function () {

    it('AnalyzerCell object exist', function () {
        expect(MyScript.AnalyzerCell).to.exist;
        expect(MyScript.AnalyzerCell).not.to.be.null;
        expect(MyScript.AnalyzerCell).to.not.be.undefined;
    });

    var analyzerCell = new MyScript.AnalyzerCell();
    it('AnalyzerCell constructor', function () {
        expect(analyzerCell).to.be.an('object');
        expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerElement);
        expect(analyzerCell).to.be.an.instanceof(MyScript.AnalyzerCell);
    });

    it('AnalyzerCell data getter', function () {
        var analyzerCell = new MyScript.AnalyzerCell();
        expect(analyzerCell.getData()).to.be.undefined;
    });

    var obj = {
        data: 'test'
    };
    var analyzerCell2 = new MyScript.AnalyzerCell(obj);
    it('Test AnalyzerCell object construction: AnalyzerCellData construction', function () {
        expect(analyzerCell2.getData()).to.be.an.instanceof(MyScript.AnalyzerCellData);
    });

});