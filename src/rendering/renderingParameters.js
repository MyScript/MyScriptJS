(function (scope) {

    /**
     * Create a RenderingParameters
     * @constructor
     */
    function RenderingParameters () {
    }

    /**
     * Default renderer color parameter
     * @type {string}
     */
    RenderingParameters.prototype.color = 'black';

    /**
     * Default renderer rect parameter
     * @type {string}
     */
    RenderingParameters.prototype.rectColor = 'rgba(0, 0, 0, 0.2)';

    /**
     * Default renderer font parameter
     * @type {string}
     */
    RenderingParameters.prototype.font = 'Times New Roman';

    /**
     * Default renderer decoration parameter
     * @type {string}
     */
    RenderingParameters.prototype.decoration = '';

    /**
     * Default renderer width parameter
     * @type {number}
     */
    RenderingParameters.prototype.width = 4;

    /**
     * Default renderer pressure type parameter
     * @type {string}
     */
    RenderingParameters.prototype.pressureType = 'SIMULATED';

    /**
     * Default renderer alpha parameter
     * @type {string}
     */
    RenderingParameters.prototype.alpha = '1.0f';

    /**
     * Get the color renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getColor = function () {
        return this.color;
    };

    /**
     * Get the rect renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getRectColor = function () {
        return this.rectColor;
    };

    /**
     * Get the font renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getFont = function () {
        return this.font;
    };

    /**
     * Get the decoration renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getDecoration = function () {
        return this.decoration;
    };

    /**
     * Get the width renderer parameter
     * @returns {number}
     */
    RenderingParameters.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get the pressure renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getPressureType = function () {
        return this.pressureType;
    };

    /**
     * Get the alpha renderer parameter
     * @returns {string}
     */
    RenderingParameters.prototype.getAlpha = function () {
        return this.alpha;
    };

    // Export
    scope.RenderingParameters = RenderingParameters;
})(MyScript);