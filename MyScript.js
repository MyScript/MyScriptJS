/**
 * Created by ystreibel on 10/10/14.
 */
(function() {

    var thisFile = 'MyScript.js';
    var scopeName = 'MyScript';

    var modules = [

    ].concat([
            "input/analyzer/analyzerParameter.js",
            "input/generic/components/abstractComponent.js",
            "input/generic/components/stroke.js",
            "input/generic/abstractParameter.js",
            "input/math/mathParameter.js",
            "input/music/musicParameter.js",
            "input/music/musicStaff.js",
            "input/shape/shapeParameter.js",
            "input/text/textInputUnit.js",
            "input/text/textParameter.js",
            "input/text/textProperties.js",
            "output/analyzer/analyzerCell.js",
            "output/analyzer/analyzerCellData.js",
            "output/analyzer/analyzerDocument.js",
            "output/analyzer/analyzerElement.js",
            "output/analyzer/analyzerElementReference.js",
            "output/analyzer/analyzerGroup.js",
            "output/analyzer/analyzerInkRange.js",
            "output/analyzer/analyzerLine.js",
            "output/analyzer/analyzerLineData.js",
            "output/analyzer/analyzerPointData.js",
            "output/analyzer/analyzerRecognizedStroke.js",
            "output/analyzer/analyzerResult.js",
            "output/analyzer/analyzerStrokeType.js",
            "output/analyzer/analyzerTable.js",
            "output/analyzer/analyzerTableData.js",
            "output/analyzer/analyzerTextLine.js",
            "output/analyzer/analyzerTextLineData.js",
            "output/analyzer/analyzerUnderline.js",
            "output/analyzer/analyzerUnderlineData.js",
            "output/generic/point.js",
            "output/shape/abstractDecoratedShape.js",
            "output/shape/abstractShapePrimitive.js",
            "output/shape/shapeCandidate.js",
            "output/shape/shapeDocument.js",
            "output/shape/shapeEllipse.js",
            "output/shape/shapeErased.js",
            "output/shape/shapeInkRange.js",
            "output/shape/shapeLine.js",
            "output/shape/shapeNotRecognized.js",
            "output/shape/shapePoint.js",
            "output/shape/shapeRecognized.js",
            "output/shape/shapeResult.js",
            "output/shape/shapeScratchOut.js",
            "output/shape/shapeSegment.js",
            "output/text/textCandidate.js",
            "output/text/textDocument.js",
            "output/text/textResult.js",
            "output/text/textSegment.js",
            "output/text/textSegmentResult.js",
            "output/text/textTagItem.js",
            "rendering/abstractRenderer.js",
            "rendering/analyzerRenderer.js",
            "rendering/musicRenderer.js",
            "rendering/renderingParameters.js",
            "rendering/shapeRenderer.js",
            "rendering/textRenderer.js",
            "utils/mathUtils.js",
            "inputCorrector.js",
            "stroker.js"
        ].map(function(n) {
                return "src/" + n;
            }));

// export

    window[scopeName] = {
        entryPointName: thisFile,
        modules: modules
    };

//// bootstrap
//
//    var script = document.querySelector('script[src*="' + thisFile + '"]');
//    var src = script.attributes.src.value;
//    var basePath = src.slice(0, src.indexOf(thisFile));
//
//    if (!window.PolymerLoader) {
//        var path = basePath + '../polymerdev/tools/loader/loader.js';
//        document.write('<script src="' + path + '"></script>');
//    }
//    document.write('<script>PolymerLoader.load("' + scopeName + '")</script>');

})();