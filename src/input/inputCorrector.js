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
            language: parameters.getLanguage()? parameters.getLanguage() : undefined,
            hwrInputMode: parameters.getInputMode()? parameters.getInputMode(): undefined,
            contentTypes: parameters.getContentTypes()? parameters.getContentTypes(): undefined,
            subsetKnowledges: parameters.getSubsetKnowledges()? parameters.getSubsetKnowledges(): undefined,
            userResources: parameters.getUserResources()? parameters.getUserResources(): undefined,
            userLkWords: parameters.getUserLkWords()? parameters.getUserLkWords(): undefined,
            resultDetail: parameters.getResultDetail()? parameters.getResultDetail(): undefined,
            hwrProperties: parameters.getProperties()? parameters.getProperties(): undefined
        };
        return result;
    };

    /**
     *
     * @param {Array} inputUnits
     */
    InputCorrector.prototype.getTextInputUnits = function (inputUnits) {
        var result = [];
        for (var i in inputUnits) {
            result.push({
                hwrInputType: inputUnits[i].getInputType()? inputUnits[i].getInputType(): undefined,
                components: inputUnits[i].getComponents()? inputUnits[i].getComponents(): undefined
            });
        }
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
            inputUnits: this.getTextInputUnits(inputUnits),
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
            inputUnits: this.getTextInputUnits(inputUnits)
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
            doBeautification: parameters.hasBeautification(),
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