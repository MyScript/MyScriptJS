(function (scope) {

    /**
     * Parameters used for text recognition
     * @constructor
     */
    function TextParameter () {
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
     *
     * @type {string}
     */
    TextParameter.prototype.language = null;

    /**
     *
     * @type {string}
     */
    TextParameter.prototype.textInputMode = null;

    /**
     *
     * @type {Array}
     */
    TextParameter.prototype.contentTypes = null;

    /**
     *
     * @type {Array}
     */
    TextParameter.prototype.subsetKnowledges = null;

    /**
     *
     * @type {Array}
     */
    TextParameter.prototype.userResources = null;

    /**
     *
     * @type {Array}
     */
    TextParameter.prototype.userLkWords = null;

    /**
     *
     * @type {string}
     */
    TextParameter.prototype.resultDetail = null;

    /**
     *
     * @type {Array}
     */
    TextParameter.prototype.properties = null;

    /**
     *
     */
    TextParameter.prototype.getLanguage = function () {
        return this.language;
    };

    /**
     *
     */
    TextParameter.prototype.getInputMode = function () {
        return this.textInputMode;
    };

    /**
     *
     */
    TextParameter.prototype.getContentTypes = function () {
        return this.contentTypes;
    };

    /**
     *
     */
    TextParameter.prototype.getSubsetKnowledges = function () {
        return this.subsetKnowledges;
    };

    /**
     *
     */
    TextParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     *
     */
    TextParameter.prototype.getUserLkWords = function () {
        return this.userLkWords;
    };

    /**
     *
     */
    TextParameter.prototype.getResultDetail = function () {
        return this.resultDetail;
    };

    /**
     *
     */
    TextParameter.prototype.getProperties = function () {
        return this.properties;
    };

    // Export
    scope.TextParameter = TextParameter;
})(MyScript);