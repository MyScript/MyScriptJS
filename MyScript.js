/**
 * Created by ystreibel on 10/10/14.
 */
(function() {

    var thisFile = 'MyScript.js';
    var scopeName = 'MyScript';

    var modules = [

    ].concat([
            "input/generic/abstractParameter.js",
            "input/text/textParameter.js",
            "input/analyzer/analyzerParameter.js",
            "input/generic/components/abstractComponent.js",
            "input/generic/components/stroke.js",
            "input/math/mathParameter.js",
            "input/music/musicParameter.js",
            "input/music/musicStaff.js",
            "input/shape/shapeParameter.js",
            "input/text/textInputUnit.js",
            "input/text/textProperties.js",
            "networking/networkInterface.js",
            "output/generic/point.js",
            "output/analyzer/analyzerElement.js",
            "output/analyzer/analyzerCell.js",
            "output/analyzer/analyzerCellData.js",
            "output/analyzer/analyzerDocument.js",
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
            "output/math/abstractMathNode.js",
            "output/math/abstractMathResultElement.js",
            "output/math/mathDocument.js",
            "output/math/mathInkRange.js",
            "output/math/mathLaTexResultElement.js",
            "output/math/mathMathMLResultElement.js",
            "output/math/mathNonTerminalNode.js",
            "output/math/mathResult.js",
            "output/math/mathRuleNode.js",
            "output/math/mathScratchOut.js",
            "output/math/mathSymbolTreeResultElement.js",
            "output/math/mathTerminalNode.js",
            "output/math/mathTerminalNodeCandidate.js",
            "output/music/abstractMusicElement.js",
            "output/music/abstractMusicResultElement.js",
            "output/music/musicAccidental.js",
            "output/music/musicAnnotation.js",
            "output/music/musicArpeggiate.js",
            "output/music/musicBar.js",
            "output/music/musicBeam.js",
            "output/music/musicChord.js",
            "output/music/musicClef.js",
            "output/music/musicDecoration.js",
            "output/music/musicDocument.js",
            "output/music/musicDots.js",
            "output/music/musicHead.js",
            "output/music/musicInputRange.js",
            "output/music/musicKeySignature.js",
            "output/music/musicKeySignatureData.js",
            "output/music/musicLedgerLine.js",
            "output/music/musicNote.js",
            "output/music/musicPart.js",
            "output/music/musicPitchData.js",
            "output/music/musicRest.js",
            "output/music/musicResult.js",
            "output/music/musicScore.js",
            "output/music/musicScoreTreeResultElement.js",
            "output/music/musicScratchOut.js",
            "output/music/musicSlur.js",
            "output/music/musicStem.js",
            "output/music/musicTie.js",
            "output/music/musicTimeSignature.js",
            "output/music/musicXMLResultElement.js",
            "output/shape/abstractShapePrimitive.js",
            "output/shape/abstractDecoratedShape.js",
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
            "inputCorrector.js",
            "recognition/abstractWSRecognizer.js",
            "recognition/textWSRecognizer.js",
            "rendering/abstractRenderer.js",
            "rendering/textRenderer.js",
            "rendering/mathRenderer.js",
            "rendering/analyzerRenderer.js",
            "rendering/renderingParameters.js",
            "rendering/shapeRenderer.js",
            "rendering/musicRenderer.js",
            "utils/mathUtils.js",
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