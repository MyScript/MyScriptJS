'use strict';

describe('MyScriptJS: recognition/analyzerRecognizer.js', function () {

    it('AnalyzerRecognizer object exist', function () {
        expect(MyScript.AnalyzerRecognizer).to.exist;
        expect(MyScript.AnalyzerRecognizer).not.to.be.null;
        expect(MyScript.AnalyzerRecognizer).to.not.be.undefined;
    });

    var analyzerRecognizer = new MyScript.AnalyzerRecognizer('cloud-internal-master.visionobjects.com');
    it('AnalyzerRecognizer constructor', function () {
        expect(analyzerRecognizer).to.be.an('object');
        expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AbstractRecognizer);
        expect(analyzerRecognizer).to.be.an.instanceof(MyScript.AnalyzerRecognizer);
    });

    it('Get parameters', function () {
        expect(analyzerRecognizer.getParameters()).to.be.an.instanceof(MyScript.AnalyzerParameter);
    });

    var parameters = new MyScript.AnalyzerParameter();
    parameters.getTextParameters().setLanguage('en_US');
    it('Set parameters', function () {
        analyzerRecognizer.setParameters(parameters);
        expect(analyzerRecognizer.getParameters()).to.be.an.instanceof(MyScript.AnalyzerParameter);
        expect(analyzerRecognizer.getParameters().getTextParameters().getLanguage()).to.equal('en_US');
    });

    var applicationKey = '360bd821-010f-4ab4-ac1e-de53b95bfc1f';
    var hmacKey = 'e5c2f889-6f80-bd46-f538-b8432be6f9ff';
    var instanceId;
    var stroke = new MyScript.Stroke();
    stroke.setX([326,327,329,332,335,339,347,358,370,384,399,413,428,443,456,469,478,485,492,497,499,501,501,501,501,501,500,499,496,492,489,485,482,478,475,471,466,461,456,450,446,442,438,438,436,436,436,438,440,441,443,445,446,448,450,451,451,453,456,459,462,466,472,478,485,490,492,494,495,496,498,500,501,503,505,507,509,511,513,514,516,518,520,523,526,528,530,532,533,534,534,534,534,533,532,531,530,528,527,527,526,526,526,526,526,527,528,529,531,532,534,536,539,542,545,548,552,554,559,563,567,569,571,572,572,572,572,572,572,570,569,567,567,566,564,563,563,561,559,559,559,557,557,557,560,563,568,574,580,588,598,610,622,633,643,652,660,667,669,671,673,673,673,670,667,664,661,659,658,657,656,655,653,653,653,651,653,655,659,664,668,673,677,682,687,691,693,695,697,700,704,707,710,713,717,719,721,721,721,721,721,720,718,716,714,712,710,708,707,707,707,707,708,709,711,713,715,717,720,723,725,727,729,730,730,731,731,731,731,730,728,726,724,722,720,719,718,717,716,716,715,715,715,714,714,715,715,716,718,721,725,729,736,745,754,762,770,774,778,782,784,785,785,784,783,782]);
    stroke.setY([301,301,301,301,300,299,297,295,292,287,282,277,270,263,256,249,242,235,226,217,211,206,202,200,199,198,197,197,196,195,195,195,194,194,194,196,197,201,205,210,216,222,227,233,239,245,250,258,265,273,280,288,296,301,307,311,313,309,304,298,292,286,280,274,270,266,266,266,266,267,269,272,274,277,281,284,287,289,290,292,292,292,292,292,291,289,287,285,282,279,277,275,273,272,270,270,270,272,274,276,279,282,285,287,290,292,294,296,298,298,298,299,299,298,297,295,292,290,286,280,275,267,260,250,241,231,221,212,202,195,189,187,186,186,187,189,193,199,206,215,225,235,247,260,270,281,287,294,298,302,304,304,304,302,299,295,288,280,271,259,247,234,222,209,198,191,184,180,178,178,179,182,186,190,195,204,213,222,233,245,257,269,277,283,290,295,295,296,296,296,295,294,292,289,285,281,277,274,272,270,269,269,270,272,275,278,281,287,294,299,305,309,312,313,314,315,315,315,315,313,312,310,308,305,303,300,297,294,292,289,286,284,282,281,279,279,279,279,281,283,285,287,289,289,290,291,292,292,293,293,294,294,294,294,291,289,286,282,278,274,270,268,267,267,268,267]);
    var components = [stroke];
    it('Do simple analyzer recognition', function (done) {
        analyzerRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey).then(
            function success (response) {
                expect(response.instanceId).to.not.be.undefined;
                expect(response.result.textLines.length).to.be.equal(1);
                expect(response.result.textLines[0].result.textSegmentResult.candidates[0].label).to.be.equal('hello');
                done(undefined, response);
            },
            function error (response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

    it('Do simple analyzer recognition with custom parameters', function (done) {
        analyzerRecognizer.doSimpleRecognition(applicationKey, instanceId, components, hmacKey, parameters).then(
            function success (response) {
                expect(response.instanceId).to.not.be.undefined;
                expect(response.result.textLines.length).to.be.equal(1);
                expect(response.result.textLines[0].result.textSegmentResult.candidates[0].label).to.be.equal('hello');
                done(undefined, response);
            },
            function error (response) {
                expect(response).to.be.an.instanceof(Error);
                done(response);
            }
        );
    });

});