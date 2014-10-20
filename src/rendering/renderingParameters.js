(function (scope) {

    /**
     * Create a RenderingParameters
     *
     * @class RenderingParameters
     * @constructor
     */
    function RenderingParameters () {
    }

    /**
     * Default renderer color parameter
     *
     * @property color
     * @type {string}
     * @default black
     */
    RenderingParameters.prototype.color = 'black';

    /**
     * Default renderer rect parameter
     *
     * @property rectColor
     * @type {string}
     * @default rgba(0, 0, 0, 0.2)
     */
    RenderingParameters.prototype.rectColor = 'rgba(0, 0, 0, 0.2)';

    /**
     * Default renderer font parameter
     *
     * @property font
     * @type {string}
     * @default Times New Roman
     */
    RenderingParameters.prototype.font = 'Times New Roman';

    /**
     * Default renderer decoration parameter
     *
     * @property decoration
     * @type {string}
     * @default
     */
    RenderingParameters.prototype.decoration = '';

    /**
     * Default renderer width parameter
     *
     * @property width
     * @type {number}
     * @default 4
     */
    RenderingParameters.prototype.width = 4;

    /**
     * Default renderer pressure type parameter
     *
     * @property pressureType
     * @type {string}
     * @default SIMULATED
     */
    RenderingParameters.prototype.pressureType = 'SIMULATED';

    /**
     * Default renderer alpha parameter
     *
     * @property alpha
     * @type {string}
     * @default 1.0f
     */
    RenderingParameters.prototype.alpha = '1.0f';

    /**
     * Get the color renderer parameter
     *
     * @method getColor
     * @returns {string} The color of the ink
     */
    RenderingParameters.prototype.getColor = function () {
        return this.color;
    };

    /**
     * Get the rect renderer parameter
     *
     * @method getRectColor
     * @returns {string} the rectangle color
     */
    RenderingParameters.prototype.getRectColor = function () {
        return this.rectColor;
    };

    /**
     * Get the font renderer parameter
     *
     * @method getFont
     * @returns {string} The font
     */
    RenderingParameters.prototype.getFont = function () {
        return this.font;
    };

    /**
     * Get the decoration renderer parameter
     *
     * @method getDecoration
     * @returns {string} The decoration
     */
    RenderingParameters.prototype.getDecoration = function () {
        return this.decoration;
    };

    /**
     * Get the width renderer parameter
     *
     * @method getWidth
     * @returns {number} The ink width
     */
    RenderingParameters.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get the pressure renderer parameter
     *
     * @method getPressureType
     * @returns {string} The pressure type
     */
    RenderingParameters.prototype.getPressureType = function () {
        return this.pressureType;
    };

    /**
     * Get the alpha renderer parameter
     *
     * @method getAlpha
     * @returns {string} The alpha
     */
    RenderingParameters.prototype.getAlpha = function () {
        return this.alpha;
    };

    // Export
    scope.RenderingParameters = RenderingParameters;
})(MyScript);