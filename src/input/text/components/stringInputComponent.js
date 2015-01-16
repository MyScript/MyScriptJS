(function (scope) {
    'use strict';
    /**
     * String input component
     *
     * @class StringInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function StringInputComponent () {
        this.type = 'string';
    }

    /**
     * Inheritance property
     */
    StringInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    StringInputComponent.prototype.constructor = StringInputComponent;

    /**
     * Get string
     *
     * @method getString
     * @returns {String}
     */
    StringInputComponent.prototype.getString = function () {
        return this.string;
    };

    /**
     * Set string
     *
     * @method setString
     * @param {String} string
     */
    StringInputComponent.prototype.setString = function (string) {
        this.string = string;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);