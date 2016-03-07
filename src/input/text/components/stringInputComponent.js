'use strict';

(function (scope) {
    /**
     * String input component
     *
     * @class StringInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function StringInputComponent(obj) {
        scope.AbstractTextInputComponent.call(this, obj);
        this.type = 'string';
        if (obj) {
            if (obj.string) {
                this.string = obj.string;
            }
        }
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
     * @deprecated Use 'getLabel'
     * @method getString
     * @returns {String}
     */
    StringInputComponent.prototype.getString = function () {
        return this.string;
    };

    /**
     * Set string
     *
     * @deprecated Use 'setLabel'
     * @method setString
     * @param {String} string
     */
    StringInputComponent.prototype.setString = function (string) {
        this.string = string;
    };

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    StringInputComponent.prototype.getLabel = function () {
        return this.string;
    };

    /**
     * Set label
     *
     * @method setLabel
     * @param {String} label
     */
    StringInputComponent.prototype.setLabel = function (label) {
        this.string = label;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);
