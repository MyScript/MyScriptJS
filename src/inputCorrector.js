(function (scope) {

    /**
     *
     * @constructor
     */
    function InputCorrector () {
    }

    /**
     *
     * @param parameters
     */
    InputCorrector.prototype.getTextParam = function (parameters) {
        var result = {
            language: parameters.getLanguage(),
            hwrInputMode: parameters.getInputMode(),
            contentTypes: parameters.getContentTypes(),
            subsetKnowledges: parameters.getSubsetKnowledges(),
            userResources: parameters.getUserResources(),
            userLkWords: parameters.getUserLkWords(),
            resultDetail: parameters.getResultDetail(),
            hwrProperties: parameters.getProperties()
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param inputUnits
     */
    InputCorrector.prototype.getTextInput = function (parameters, inputUnits) {
        var result = {
            hwrParameter: this.getTextParam(parameters),
            inputUnits: inputUnits,
            switchToChildren: parameters.getSwitchToChildren()
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param inputUnits
     */
    InputCorrector.prototype.getTextWSInput = function (parameters, inputUnits) {
        var result = {
            hwrParameter: this.getTextParam(parameters),
            inputUnits: inputUnits
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param components
     */
    InputCorrector.prototype.getAnalyzerInput = function (parameters, components) {
        var result = {
            components: components,
            parameter: {
                hwrParameter: this.getTextParam(parameters),
                coordinateResolution: parameters.getCoordinateResolution()
            },
            switchToChildren: parameters.getSwitchToChildren()
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param components
     */
    InputCorrector.prototype.getShapeInput = function (parameters, components) {
        var result = {
            components: components,
//                userResources: parameters.getUserResources(),
            doBeautification: parameters.getDoBeautification(),
            rejectDetectionSensitivity: parameters.getRejectDetectionSensitivity()
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param components
     */
    InputCorrector.prototype.getMathInput = function (parameters, components) {
        var result = {
            components: components,
            resultTypes: parameters.getResultTypes(),
            userResources: parameters.getUserResources(),
            scratchOutDetectionSensitivity: parameters.getScratchOutDetectionSensitivity(),
            switchToChildren: parameters.getSwitchToChildren()
        };
        return result;
    };

    /**
     *
     * @param parameters
     * @param components
     */
    InputCorrector.prototype.getMusicInput = function (parameters, components) {
        var result = {
            components: components,
            resultTypes: parameters.getResultTypes(),
            userResources: parameters.getUserResources(),
            scratchOutDetectionSensitivity: parameters.getScratchOutDetectionSensitivity(),
            staff: parameters.getStaff(),
            divisions: parameters.getDivisions()
        };
        return result;
    };

    // Export
    scope.InputCorrector = InputCorrector;
})(MyScript);