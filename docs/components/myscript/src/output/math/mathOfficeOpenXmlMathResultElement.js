'use strict';

(function (scope) {
    /**
     * MathOfficeOpenXmlMathResultElement result element
     *
     * @class MathOfficeOpenXmlMathResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathOfficeOpenXmlMathResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }


    /**
     * Inheritance property
     */
    MathOfficeOpenXmlMathResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathOfficeOpenXmlMathResultElement.prototype.constructor = MathOfficeOpenXmlMathResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathOfficeOpenXmlMathResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathOfficeOpenXmlMathResultElement = MathOfficeOpenXmlMathResultElement;
})(MyScript);
