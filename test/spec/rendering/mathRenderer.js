'use strict';

describe('MyScriptJS: rendering/mathRenderer.js', function () {

    it('MathRenderer object exist', function () {
        expect(MyScript.MathRenderer).to.exist;
        expect(MyScript.MathRenderer).not.to.be.null;
        expect(MyScript.MathRenderer).to.not.be.undefined;
    });

    it('MathRenderer constructor', function () {
        var mathRenderer = new MyScript.MathRenderer();
        expect(mathRenderer).to.be.an('object');
        expect(mathRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(mathRenderer).to.be.an.instanceof(MyScript.MathRenderer);
        expect(mathRenderer).to.have.ownProperty('cloneStrokes');
        expect(mathRenderer).to.have.ownProperty('strokesToRemove');
    });

    it('MathRenderer Draw Strokes By RecognitionResult', function () {
        var mathRenderer = new MyScript.MathRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.MathDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        mathRenderer.drawRecognitionResult(strokes, recognitionResult, parameters, context);
    });

    it('MathRenderer Remove Scratch Out Strokes', function () {
        var mathRenderer = new MyScript.MathRenderer(),
            stroke1 = new MyScript.Stroke(),
            stroke2 = new MyScript.Stroke(),
            strokes = [],
            mathScratchOutResults = [new MyScript.MathScratchOut({"erasedInkRanges":[{"component":0,"firstItem":0.0,"lastItem":47.0}],"inkRanges":[{"component":1,"firstItem":0.0,"lastItem":213.0}]})];

        stroke1.setX([354,355,356,356,358,360,362,363,367,371,376,382,388,394,399,405,412,418,422,424,425,425,426,426,425,425,424,423,423,421,419,417,417,415,415,413,412,412,412,412,412,412,412,413,411,410,409,407]);
        stroke1.setY([165,165,165,166,166,165,164,162,159,155,150,144,138,132,127,121,115,108,102,98,94,90,89,87,86,87,91,97,104,114,124,134,144,154,165,175,183,192,198,202,203,205,206,206,206,205,205,204]);

        stroke2.setX([371,372,373,376,380,383,390,398,405,413,421,428,434,440,447,453,457,458,460,461,461,459,457,455,451,447,440,431,422,414,406,398,391,386,382,377,376,374,373,374,376,379,383,391,400,414,428,442,457,468,479,483,485,484,483,482,479,476,473,470,466,461,455,446,436,427,416,406,398,392,391,390,390,389,388,387,386,385,385,384,382,380,379,378,377,376,377,379,383,390,399,408,418,428,437,445,449,448,447,446,445,444,442,439,436,431,423,413,400,388,376,366,357,347,339,335,334,335,339,346,358,373,388,403,418,433,446,457,465,472,474,473,472,470,466,461,454,444,428,411,388,365,342,323,308,293,281,274,272,273,277,289,309,332,361,390,415,438,453,460,465,466,466,466,465,464,463,461,459,456,453,449,446,439,432,425,418,411,403,396,389,383,377,376,375,379,389,402,417,432,447,460,471,478,482,481,479,476,472,465,457,450,440,433,425,417,409,401,393,385,381,377,376,375]);
        stroke2.setY([114,113,112,111,108,105,100,95,89,83,79,75,73,71,71,69,69,69,70,70,71,72,73,74,76,79,82,86,90,94,99,103,107,111,115,115,116,117,117,117,117,117,116,115,113,113,111,111,111,111,111,109,109,109,109,110,111,111,112,113,115,118,119,122,123,126,128,129,131,133,134,134,135,135,135,135,135,135,136,136,137,138,138,138,139,139,139,139,138,136,134,133,133,131,129,129,127,127,127,128,128,128,129,130,132,134,137,141,145,150,152,156,158,159,161,163,163,164,164,164,164,164,164,164,164,164,162,162,162,162,162,162,162,163,164,165,168,170,172,175,178,180,183,185,185,187,187,187,187,187,187,185,185,185,183,183,181,181,181,181,181,181,180,181,181,182,184,185,185,186,187,187,188,188,190,191,191,193,195,197,199,201,201,203,204,203,201,199,196,194,194,192,192,192,192,193,194,196,197,200,202,204,206,207,210,210,212,212,214,216,218,218,219,219]);

        strokes.push(stroke1);
        strokes.push(stroke2);

        expect(mathRenderer.removeScratchOutStrokes(strokes, mathScratchOutResults).length).to.be.equal(0);
    });
});