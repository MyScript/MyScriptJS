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
    InputCorrector.prototype.getTextWSInput = function (parameters, inputUnits) {
        var result = {
            hwrParameter: this.getTextParam(parameters),
            inputUnits: this.getTextInputUnits(inputUnits)
        };
        return result;
    };

    // Export
    scope.InputCorrector = InputCorrector;
})(MyScript);