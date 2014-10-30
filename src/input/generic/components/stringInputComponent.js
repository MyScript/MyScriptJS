(function (scope) {

    /**
     * String input component
     * @constructor
     */
    function StringInputComponent () {
        this.type = 'string';
    }

    /**
     *
     * @type {MyScript.AbstractComponent}
     */
    StringInputComponent.prototype = new scope.AbstractComponent();

    /**
     *
     * @type {StringInputComponent}
     */
    StringInputComponent.prototype.constructor = StringInputComponent;

    /**
     * Get string
     * @returns {string}
     */
    StringInputComponent.prototype.getString = function () {
        return this.string;
    };

    /**
     * Set string
     * @param {string} string
     */
    StringInputComponent.prototype.setString = function (string) {
        this.string = string;
    };

    /**
     * Get input component bounding box
     * @returns {Rectangle}
     */
    StringInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding box
     * @param {Rectangle} boundingBox
     */
    StringInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);