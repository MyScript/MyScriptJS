'use strict';

describe('MyScriptJS: rendering/analyzerRenderer.js', function () {

    it('AnalyzerRenderer object exist', function () {
        expect(MyScript.AnalyzerRenderer).to.exist;
        expect(MyScript.AnalyzerRenderer).not.to.be.null;
        expect(MyScript.AnalyzerRenderer).to.not.be.undefined;
    });

    it('AnalyzerRenderer constructor', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer();
        expect(analyzerRenderer).to.be.an('object');
        expect(analyzerRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(analyzerRenderer).to.be.an.instanceof(MyScript.AnalyzerRenderer);
    });

    it('AnalyzerRenderer Draw Strokes By RecognitionResult', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.AnalyzerDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });


    it('AnalyzerRenderer Draw Tables', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            tables = [new MyScript.AnalyzerTable()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawTables(strokes, tables, parameters, context);
    });

    it('AnalyzerRenderer Draw Text Lines', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            textLines = [new MyScript.AnalyzerTextLine()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawTextLines(strokes, textLines, parameters, context);
    });

    it('AnalyzerRenderer Draw Text', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            boundingBox = new MyScript.Rectangle(),
            text = '',
            justificationType = '',
            textHeight = 100,
            baseline = 14,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawText(boundingBox, text, justificationType, textHeight, baseline, parameters, context);
    });

    it('AnalyzerRenderer Draw Under Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            boundingBox = new MyScript.Rectangle(),
            text = '',
            underline = new MyScript.AnalyzerUnderline({data:{firstCharacter:0, lastCharacter:4}}),
            baseline = 14,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawUnderline(boundingBox, underline, text, baseline, parameters, context);
    });

    it('AnalyzerRenderer Draw Groups', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            groups = [new MyScript.AnalyzerGroup()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        expect(function(){analyzerRenderer.drawGroups(strokes, groups, parameters, context)}).to.throw('not implemented');
    });

    it('AnalyzerRenderer Draw Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            line = new MyScript.AnalyzerLine(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawLine(line, parameters, context);
    });

    it('AnalyzerRenderer Draw Cell', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            cell = new MyScript.AnalyzerCell(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawLine(cell, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            shapes = [new MyScript.ShapeSegment()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapes(strokes, shapes, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes Recognized', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeRecognized = new MyScript.ShapeRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeRecognized(shapeRecognized, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes Not Recognized', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            stroke1 = new MyScript.Stroke(),
            stroke2 = new MyScript.Stroke(),
            strokes = [],
            inkRange = new MyScript.ShapeInkRange({firstStroke: 1, lastStroke: 1, firstPoint: 0, lastPoint: 408}),
            inkRanges = [],
            shapeNotRecognized = new MyScript.ShapeNotRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        stroke1.setX([357,357,357,357,354,352,349,346,343,340,338,335,335,333,331,331,331,331,331,331,331,331,331,332,333,336,341,353,371,394,423,452,485,518,555,590,625,658,687,714,739,760,779,796,809,818,825,829,833,834,835,836,837,837,838,839,840,842,844,845,847,852,856,860,862,864,866,868,870,871,873,875,875,875,875,875,875,875,874,873,872,871,870,869,867,865,862,859,854,846,837,824,810,793,770,747,722,697,668,641,614,589,566,543,522,501,484,467,452,437,426,415,404,398,391,386,383,382,380,379,378,377,376,374,373,372,370,368,366,363,360,356,353,350,346,344,341,339,338,336]);
        stroke1.setY([115,116,122,133,150,167,186,205,224,243,262,279,294,307,318,329,338,347,356,365,369,373,375,375,375,375,375,375,375,373,373,373,371,371,369,369,367,365,363,363,361,359,356,354,351,349,346,344,342,341,340,339,337,336,335,333,331,328,325,320,312,302,293,283,274,265,256,246,237,226,216,208,199,191,184,180,176,175,175,174,174,174,173,173,172,171,171,171,170,170,168,168,167,165,162,160,158,155,152,150,148,146,143,141,139,137,135,135,133,133,133,131,131,131,129,129,129,129,129,129,129,129,129,129,129,129,129,129,128,128,128,128,127,127,127,127,127,126,126,126]);

        stroke2.setX([684,683,682,681,679,679,679,679,680,680,681,682,683,686,690,696,705,714,722,731,740,745,749,749,749,749,749,749,749,748,748,747,747,746,745,745,745,745,745,747,749,753,756,762,772,787,802,817,832,847,856,863,868,868,868,868,868,866,864,864,863,862,862,860,859,857,857,857,859,861,865,870,876,883,892,904,917,929,940,951,960,967,971,973,973,973,973,972,970,969,968,968,968,971,973,975,981,986,993,1002,1012,1022,1032,1041,1047,1054,1060,1065,1067,1069,1069,1069,1067,1065,1063,1062,1060,1057,1053,1049,1044,1042,1042,1042,1044,1045,1045,1046,1048,1050,1052,1055,1059,1064,1068,1073,1075,1075,1075,1073,1068,1063,1059,1054,1050,1043,1034,1025,1015,1005,994,985,976,971,969,969,969,972,973,974,976,978,981,984,989,995,1000,1004,1006,1006,1006,1006,1005,1003,1001,997,991,981,969,954,940,925,912,903,896,894,892,892,893,896,897,899,900,902,904,907,910,913,916,918,919,920,921,921,920,919,917,914,909,900,886,868,847,826,805,784,769,756,751,749,748,748,748,750,751,752,753,755,759,766,777,796,815,836,859,880,897,910,917,917,917,916,914,912,909,905,900,893,885,876,866,856,850,845,845,845,845,846,848,850,855,865,880,901,924,947,970,993,1012,1029,1040,1047,1052,1052,1052,1050,1046,1042,1038,1034,1030,1029,1028,1027,1025,1023,1021,1019,1017,1016,1016,1017,1020,1024,1028,1033,1039,1049,1058,1068,1080,1093,1104,1113,1119,1121,1123,1123,1123,1123,1121,1120,1119,1119,1118,1117,1117,1116,1116,1117,1118,1119,1120,1122,1124,1127,1130,1133,1139,1143,1147,1152,1156,1161,1165,1165,1167,1167,1167,1167,1165,1164,1163,1163,1163,1163,1163,1163,1163,1164,1166,1168,1171,1175,1176,1178,1179,1180,1181,1181,1183,1183,1185,1185,1185,1185,1185,1187,1187,1188,1188,1187,1186,1186,1185,1184,1183,1182,1180,1179,1178,1178,1178,1180,1181,1182,1183,1184,1185,1186,1187,1189,1192,1194,1197,1200,1203,1206,1208,1209,1209,1209,1209,1209,1209,1209,1209,1209,1209]);
        stroke2.setY([422,422,425,429,433,436,439,441,442,443,444,445,445,445,445,445,444,441,439,437,434,432,430,428,427,425,424,422,421,420,419,419,420,423,426,429,432,435,437,439,442,445,446,446,446,446,444,439,434,429,422,415,408,401,395,389,383,378,374,373,372,372,373,375,379,384,390,395,401,404,408,410,411,413,413,411,408,403,399,392,385,376,367,360,354,348,344,341,340,343,347,353,359,364,370,375,377,378,378,378,375,371,366,362,355,349,342,335,329,323,316,310,304,300,299,299,299,302,307,315,325,334,342,348,353,354,355,355,353,351,347,341,334,326,317,307,296,284,274,263,255,248,244,242,242,242,246,252,260,269,281,294,307,318,327,336,343,347,348,349,349,349,349,348,346,343,340,337,335,332,328,326,323,321,320,318,318,318,320,323,330,339,348,357,366,375,384,391,397,400,403,404,404,405,405,405,404,403,402,400,399,397,396,395,394,393,393,392,392,392,392,392,390,390,390,390,390,390,392,392,393,395,396,397,398,399,399,401,401,403,405,408,410,412,414,414,414,414,412,411,410,409,407,406,405,404,403,403,403,403,403,404,407,410,411,413,414,414,415,415,416,416,416,416,414,412,410,407,404,399,394,389,382,375,369,363,358,352,348,344,342,341,341,342,344,348,351,354,360,367,374,381,387,393,398,403,407,408,410,410,410,407,402,398,393,388,382,376,371,370,369,368,368,369,371,374,378,381,383,386,387,388,388,388,387,386,383,379,373,368,360,352,344,334,325,315,304,294,283,273,266,269,272,274,277,279,283,287,291,297,304,313,322,329,335,339,340,340,340,341,343,346,353,361,372,384,397,405,410,411,410,409,409,407,407,406,406,405,404,403,402,400,399,397,396,395,395,395,395,395,396,397,399,401,402,404,406,407,408,408,407,406,405,404,403,402,401,400,399]);

        strokes.push(stroke1);
        strokes.push(stroke2);

        inkRanges.push(inkRange);

        analyzerRenderer.drawShapeNotRecognized(strokes, inkRanges, shapeNotRecognized, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Primitive', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            primitive = new MyScript.AbstractShapePrimitive(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapePrimitive(primitive, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeLine = new MyScript.ShapeLine({firstPoint: {x: 242.55331, y: 220.25092}, lastPoint: {x: 1020.905, y: 220.25092}}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeLine(shapeLine, parameters, context);
    });

    it('AnalyzerRenderer Draw Ellipse Arc', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            centerPoint = shapeEllipse.getCenter(),
            maxRadius = shapeEllipse.getMaxRadius(),
            minRadius = shapeEllipse.getMinRadius(),
            orientation = shapeEllipse.getOrientation(),
            startAngle = shapeEllipse.getStartAngle(),
            sweepAngle = shapeEllipse.getSweepAngle(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Ellipse', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeEllipse(shapeEllipse, parameters, context);
    });

    it('AnalyzerRenderer Primitive Bounding Box', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            primitive = new MyScript.ShapeLine({firstPoint: {x: 242.55331, y: 220.25092}, lastPoint: {x: 1020.905, y: 220.25092}});

        expect(analyzerRenderer.getPrimitiveBoundingBox(primitive)).to.deep.equal(new MyScript.Rectangle({x:242.55331,y:220.25092,height:0,width:778.35169}));
    });
});