'use strict';

(function (scope) {
    /**
     * Parameters used for both input and output canvas draw.
     *
     * @deprecated Use 'PenParameters' instead
     * @class RenderingParameters
     * @constructor
     */
    function RenderingParameters() {
        scope.PenParameters.call(this);
    }

    /**
     * Inheritance property
     */
    RenderingParameters.prototype = new scope.PenParameters();

    /**
     * Constructor property
     */
    RenderingParameters.prototype.constructor = RenderingParameters;

    // Export
    scope.RenderingParameters = RenderingParameters;
})(MyScript);