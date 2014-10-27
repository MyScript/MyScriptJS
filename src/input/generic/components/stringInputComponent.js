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
     *
     * @returns {string}
     */
    StringInputComponent.prototype.getString = function () {
        return this.string;
    };

    /**
     *
     * @param {string} string
     */
    StringInputComponent.prototype.setString = function (string) {
        this.string = string;
    };

    /**
     *
     * @returns {Rectangle}
     */
    StringInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     *
     * @param {Rectangle} boundingBox
     */
    StringInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);