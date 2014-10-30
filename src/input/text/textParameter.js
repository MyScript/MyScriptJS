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
     * Get recognition language
     * @returns {string}
     */
    TextParameter.prototype.getLanguage = function () {
        return this.language;
    };

    /**
     * Set recognition language
     * @param {string} language
     */
    TextParameter.prototype.setLanguage = function (language) {
        this.language = language;
    };

    /**
     * Get input mode
     * @returns {string}
     */
    TextParameter.prototype.getInputMode = function () {
        return this.hwrInputMode;
    };

    /**
     * Set input mode
     * @param {string} inputMode
     */
    TextParameter.prototype.setInputMode = function (inputMode) {
        this.hwrInputMode = inputMode;
    };

    /**
     * Get content types
     * @returns {Array}
     */
    TextParameter.prototype.getContentTypes = function () {
        return this.contentTypes;
    };

    /**
     * Set content types
     * @param {Array} contentTypes
     */
    TextParameter.prototype.setContentTypes = function (contentTypes) {
        this.contentTypes = contentTypes;
    };

    /**
     * Get SK
     * @returns {Array}
     */
    TextParameter.prototype.getSubsetKnowledges = function () {
        return this.subsetKnowledges;
    };

    /**
     * Set SK
     * @param {Array} subsetKnowledges
     */
    TextParameter.prototype.setSubsetKnowledges = function (subsetKnowledges) {
        this.subsetKnowledges = subsetKnowledges;
    };

    /**
     * Get user resources
     * @returns {Array}
     */
    TextParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set user resources
     * @param {Array} userResources
     */
    TextParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get user LK words
     * @returns {Array}
     */
    TextParameter.prototype.getUserLkWords = function () {
        return this.userLkWords;
    };

    /**
     * Set user LK words
     * @param {Array} userLkWords
     */
    TextParameter.prototype.setUserLkWords = function (userLkWords) {
        this.userLkWords = userLkWords;
    };

    /**
     * Get result detail (e.g. TEXT, WORD ...)
     * @returns {string}
     */
    TextParameter.prototype.getResultDetail = function () {
        return this.resultDetail;
    };

    /**
     * Set result detail (e.g. TEXT, WORD ...)
     * @param {string} resultDetail
     */
    TextParameter.prototype.setResultDetail = function (resultDetail) {
        this.resultDetail = resultDetail;
    };

    /**
     * Get properties
     * @returns {Array}
     */
    TextParameter.prototype.getProperties = function () {
        return this.properties;
    };

    /**
     * Set properties
     * @param {Array} properties
     */
    TextParameter.prototype.setProperties = function (properties) {
        this.properties = properties;
    };

    // Export
    scope.TextParameter = TextParameter;
})(MyScript);