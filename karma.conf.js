// Karma configuration
// Generated on Mon Dec 01 2014 11:50:09 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'src/MyScript.js',
      'src/common/generic/point.js',
      'src/common/generic/rectangle.js',
      'src/common/stroker.js',
      'src/common/mathUtils.js',
      'src/input/generic/components/abstractInputComponent.js',
      'src/input/generic/components/boundingBox.js',
      'src/input/generic/components/stroke.js',
      'src/input/generic/abstractParameter.js',
      'src/input/generic/abstractRecognitionInput.js',
      'src/input/generic/abstractRecognitionData.js',
      'src/input/generic/getRecognitionLanguagesData.js',
      'src/input/text/components/abstractTextInputComponent.js',
      'src/input/text/components/characterInputComponent.js',
      'src/input/text/components/characterInputComponentAlternate.js',
      'src/input/text/components/charInputComponent.js',
      'src/input/text/components/stringInputComponent.js',
      'src/input/text/textInputUnit.js',
      'src/input/text/textParameter.js',
      'src/input/text/textProperties.js',
      'src/input/text/textRecognitionInput.js',
      'src/input/text/textRecognitionData.js',
      'src/input/shape/shapeParameter.js',
      'src/input/shape/shapeRecognitionInput.js',
      'src/input/shape/shapeRecognitionData.js',
      'src/input/math/mathParameter.js',
      'src/input/math/mathRecognitionInput.js',
      'src/input/math/mathRecognitionData.js',
      'src/input/music/components/abstractMusicInputComponent.js',
      'src/input/music/components/musicAccidentalInputComponent.js',
      'src/input/music/components/musicArpeggiateInputComponent.js',
      'src/input/music/components/musicBarInput.js',
      'src/input/music/components/musicBarInputComponent.js',
      'src/input/music/components/musicBeamInput.js',
      'src/input/music/components/musicBeamInputComponent.js',
      'src/input/music/components/musicClefInput.js',
      'src/input/music/components/musicClefInputComponent.js',
      'src/input/music/components/musicDecorationInput.js',
      'src/input/music/components/musicDecorationInputComponent.js',
      'src/input/music/components/musicDotsInputComponent.js',
      'src/input/music/components/musicHeadInputComponent.js',
      'src/input/music/components/musicLedgerLineInputComponent.js',
      'src/input/music/components/musicRestInputComponent.js',
      'src/input/music/components/musicStemInputComponent.js',
      'src/input/music/components/musicTieOrSlurInputComponent.js',
      'src/input/music/components/musicTimeSignatureInputComponent.js',
      'src/input/music/musicStaff.js',
      'src/input/music/musicParameter.js',
      'src/input/music/musicRecognitionInput.js',
      'src/input/music/musicRecognitionData.js',
      'src/input/analyzer/analyzerParameter.js',
      'src/input/analyzer/analyzerRecognitionInput.js',
      'src/input/analyzer/analyzerRecognitionData.js',
      'src/output/generic/abstractResult.js',
      'src/output/text/textCandidate.js',
      'src/output/text/textDocument.js',
      'src/output/text/textResult.js',
      'src/output/text/textSegment.js',
      'src/output/text/textSegmentResult.js',
      'src/output/text/textTagItem.js',
      'src/output/shape/abstractShapePrimitive.js',
      'src/output/shape/abstractDecoratedShape.js',
      'src/output/shape/shapeCandidate.js',
      'src/output/shape/shapeDocument.js',
      'src/output/shape/shapeEllipse.js',
      'src/output/shape/shapeErased.js',
      'src/output/shape/shapeInkRange.js',
      'src/output/shape/shapeLine.js',
      'src/output/shape/shapeNotRecognized.js',
      'src/output/shape/shapePoint.js',
      'src/output/shape/shapeRecognized.js',
      'src/output/shape/shapeResult.js',
      'src/output/shape/shapeScratchOut.js',
      'src/output/shape/shapeSegment.js',
      'src/output/math/abstractMathNode.js',
      'src/output/math/abstractMathNonTerminalNode.js',
      'src/output/math/abstractMathResultElement.js',
      'src/output/math/abstractMathRuleNode.js',
      'src/output/math/mathDocument.js',
      'src/output/math/mathInkRange.js',
      'src/output/math/mathLaTexResultElement.js',
      'src/output/math/mathMathMLResultElement.js',
      'src/output/math/mathResult.js',
      'src/output/math/mathScratchOut.js',
      'src/output/math/mathSymbolTreeResultElement.js',
      'src/output/math/mathTerminalNode.js',
      'src/output/math/mathTerminalNodeCandidate.js',
      'src/output/math/mathFenceRuleNode.js',
      'src/output/math/mathFractionRuleNode.js',
      'src/output/math/mathHorizontalPairRuleNode.js',
      'src/output/math/mathIdentityRuleNode.js',
      'src/output/math/mathLeftFenceRuleNode.js',
      'src/output/math/mathOverscriptRuleNode.js',
      'src/output/math/mathPreSuperscriptRuleNode.js',
      'src/output/math/mathSqrtRuleNode.js',
      'src/output/math/mathSubscriptRuleNode.js',
      'src/output/math/mathSubSuperscriptRuleNode.js',
      'src/output/math/mathSuperscriptRuleNode.js',
      'src/output/math/mathUnderOverscriptRuleNode.js',
      'src/output/math/mathUnderscriptRuleNode.js',
      'src/output/math/mathVerticalPairRuleNode.js',
      'src/output/math/mathExponentiableNonTerminalNode.js',
      'src/output/math/mathExpressionNonTerminalNode.js',
      'src/output/math/mathSqrtNonTerminalNode.js',
      'src/output/math/mathVectorNonTerminalNode.js',
      'src/output/math/mathSystemNonTerminalNode.js',
      'src/output/math/mathTermNonTerminalNode.js',
      'src/output/music/abstractMusicElement.js',
      'src/output/music/abstractMusicResultElement.js',
      'src/output/music/musicAccidental.js',
      'src/output/music/musicAnnotation.js',
      'src/output/music/musicArpeggiate.js',
      'src/output/music/musicBar.js',
      'src/output/music/musicBeam.js',
      'src/output/music/musicChord.js',
      'src/output/music/musicClef.js',
      'src/output/music/musicDecoration.js',
      'src/output/music/musicDocument.js',
      'src/output/music/musicDots.js',
      'src/output/music/musicHead.js',
      'src/output/music/musicInputRange.js',
      'src/output/music/musicKeySignature.js',
      'src/output/music/musicKeySignatureData.js',
      'src/output/music/musicLedgerLine.js',
      'src/output/music/musicNote.js',
      'src/output/music/musicPart.js',
      'src/output/music/musicPitchData.js',
      'src/output/music/musicRest.js',
      'src/output/music/musicResult.js',
      'src/output/music/musicScore.js',
      'src/output/music/musicScoreTreeResultElement.js',
      'src/output/music/musicScratchOut.js',
      'src/output/music/musicSlur.js',
      'src/output/music/musicStem.js',
      'src/output/music/musicTie.js',
      'src/output/music/musicTimeSignature.js',
      'src/output/music/musicXMLResultElement.js',
      'src/output/analyzer/analyzerElement.js',
      'src/output/analyzer/analyzerCell.js',
      'src/output/analyzer/analyzerCellData.js',
      'src/output/analyzer/analyzerDocument.js',
      'src/output/analyzer/analyzerElementReference.js',
      'src/output/analyzer/analyzerGroup.js',
      'src/output/analyzer/analyzerInkRange.js',
      'src/output/analyzer/analyzerLine.js',
      'src/output/analyzer/analyzerLineData.js',
      'src/output/analyzer/analyzerPointData.js',
      'src/output/analyzer/analyzerRecognizedStroke.js',
      'src/output/analyzer/analyzerResult.js',
      'src/output/analyzer/analyzerStrokeType.js',
      'src/output/analyzer/analyzerTable.js',
      'src/output/analyzer/analyzerTableData.js',
      'src/output/analyzer/analyzerTextLine.js',
      'src/output/analyzer/analyzerTextLineData.js',
      'src/output/analyzer/analyzerUnderline.js',
      'src/output/analyzer/analyzerUnderlineData.js',
      'src/networking/networkInterface.js',
      'src/recognition/abstractRecognizer.js',
      'src/recognition/textRecognizer.js',
      'src/recognition/textWSRecognizer.js',
      'src/recognition/shapeRecognizer.js',
      'src/recognition/mathRecognizer.js',
      'src/recognition/mathWSRecognizer.js',
      'src/recognition/musicRecognizer.js',
      'src/recognition/analyzerRecognizer.js',
      'src/rendering/quadraticPoint.js',
      'src/rendering/mathSolver.js',
      'src/rendering/mathComputedData.js',
      'src/rendering/mathParser.js',
      'src/rendering/mathParserFX.js',
      'src/rendering/renderingParameters.js',
      'src/rendering/abstractRenderer.js',
      'src/rendering/textRenderer.js',
      'src/rendering/shapeRenderer.js',
      'src/rendering/mathRenderer.js',
      'src/rendering/mathRendererFX.js',
      'src/rendering/musicRenderer.js',
      'src/rendering/analyzerRenderer.js',
      'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'src/third_part/**/*.*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'test/results/coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
