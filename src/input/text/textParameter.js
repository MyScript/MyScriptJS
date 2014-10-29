(function (scope) {

    /**
     * Parameters used for text recognition
     * @constructor
     */
    function TextParameter (obj) {
        scope.AbstractParameter.call(this, obj);
    }

    /**
     *
     * @type {MyScript.AbstractParameter}
     */
    TextParameter.prototype = new scope.AbstractParameter();

    /**
     *
     * @type {TextParameter}
     */
    TextParameter.prototype.constructor = TextParameter;

    /**
     * @returns {string}
     */
    TextParameter.prototype.getLanguage = function () {
        return this.language;
    };

    /**
     * @param {string}
     */
    TextParameter.prototype.setLanguage = function (language) {
        this.language = language;
    };

    /**
     * @returns {string}
     */
    TextParameter.prototype.getInputMode = function () {
        return this.hwrInputMode;
    };

    /**
     * @param {string}
     */
    TextParameter.prototype.setInputMode = function (inputMode) {
        this.hwrInputMode = inputMode;
    };

    /**
     * @returns {Array}
     */
    TextParameter.prototype.getContentTypes = function () {
        return this.contentTypes;
    };

    /**
     * @param {Array}
     */
    TextParameter.prototype.setContentTypes = function (contentTypes) {
        this.contentTypes = contentTypes;
    };

    /**
     * @returns {Array}
     */
    TextParameter.prototype.getSubsetKnowledges = function () {
        return this.subsetKnowledges;
    };

    /**
     * @param {Array}
     */
    TextParameter.prototype.setSubsetKnowledges = function (subsetKnowledges) {
        this.subsetKnowledges = subsetKnowledges;
    };

    /**
     * @returns {Array}
     */
    TextParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * @param {Array}
     */
    TextParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * @returns {Array}
     */
    TextParameter.prototype.getUserLkWords = function () {
        return this.userLkWords;
    };

    /**
     * @param {Array}
     */
    TextParameter.prototype.setUserLkWords = function (userLkWords) {
        this.userLkWords = userLkWords;
    };

    /**
     * @returns {string}
     */
    TextParameter.prototype.getResultDetail = function () {
        return this.resultDetail;
    };

    /**
     * @param {string}
     */
    TextParameter.prototype.setResultDetail = function (resultDetail) {
        this.resultDetail = resultDetail;
    };

    /**
     * @returns {Array}
     */
    TextParameter.prototype.getProperties = function () {
        return this.properties;
    };

    /**
     * @param {Array}
     */
    TextParameter.prototype.setProperties = function (properties) {
        this.properties = properties;
    };

    // Export
    scope.TextParameter = TextParameter;
})(MyScript);