(function (scope) {

    /**
     * Create a RenderingParameters
     *
     * @class RenderingParameters
     * @param {String} color
     * @param {String} rectColor
     * @param {String} font
     * @param {String} decoration
     * @param {Number} width
     * @param {String} pressureType
     * @param {String} alpha
     * @param {Boolean} doFadeOutLoop
     * @param {Boolean} showBoundingBoxes
     * @constructor
     */
    function RenderingParameters (color, rectColor, font, decoration, width, pressureType, alpha, doFadeOutLoop, showBoundingBoxes) {
        this.color = color || 'black';
        this.rectColor = rectColor || 'rgba(0, 0, 0, 0.2)';
        this.font = font || 'Times New Roman';
        this.decoration = decoration || '';
        this.width = width || 4;
        this.pressureType = pressureType || 'SIMULATED';
        this.alpha = alpha || '1.0';
        this.doFadeOutLoop = doFadeOutLoop || false;
        this.showBoundingBoxes = showBoundingBoxes || false;
    }

    /**
     * Get the color renderer parameter
     *
     * @method getColor
     * @returns {String} The color of the ink
     */
    RenderingParameters.prototype.getColor = function () {
        return this.color;
    };

    /**
     * Set the color renderer parameter
     *
     * @method setColor
     * @param {String} color
     */
    RenderingParameters.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     * Get the rect renderer parameter
     *
     * @method getRectColor
     * @returns {String} the rectangle color
     */
    RenderingParameters.prototype.getRectColor = function () {
        return this.rectColor;
    };

    /**
     * Set the rect renderer parameter
     *
     * @method setRectColor
     * @param {String} rectColor
     */
    RenderingParameters.prototype.setRectColor = function (rectColor) {
        this.rectColor = rectColor;
    };

    /**
     * Get the font renderer parameter
     *
     * @method getFont
     * @returns {String} The font
     */
    RenderingParameters.prototype.getFont = function () {
        return this.font;
    };

    /**
     * Set the font renderer parameter
     *
     * @method setFont
     * @param {String} font
     */
    RenderingParameters.prototype.setFont = function (font) {
        this.font = font;
    };

    /**
     * Get the decoration renderer parameter
     *
     * @method getDecoration
     * @returns {String} The decoration
     */
    RenderingParameters.prototype.getDecoration = function () {
        return this.decoration;
    };

    /**
     * Set the decoration renderer parameter
     *
     * @method setDecoration
     * @param {String} decoration
     */
    RenderingParameters.prototype.setDecoration = function (decoration) {
        this.decoration = decoration;
    };

    /**
     * Get the width renderer parameter
     *
     * @method getWidth
     * @returns {Number} The ink width
     */
    RenderingParameters.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Set the width renderer parameter
     *
     * @method setWidth
     * @param {Number} width
     */
    RenderingParameters.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     * Get the pressure renderer parameter
     *
     * @method getPressureType
     * @returns {String} The pressure type
     */
    RenderingParameters.prototype.getPressureType = function () {
        return this.pressureType;
    };

    /**
     * Set the pressure renderer parameter
     *
     * @method setPressureType
     * @param {String} pressureType
     */
    RenderingParameters.prototype.setPressureType = function (pressureType) {
        this.pressureType = pressureType;
    };

    /**
     * Get the alpha renderer parameter
     *
     * @method getAlpha
     * @returns {String} The alpha
     */
    RenderingParameters.prototype.getAlpha = function () {
        return this.alpha;
    };

    /**
     * Set the alpha renderer parameter
     *
     * @method setAlpha
     * @param {String} alpha
     */
    RenderingParameters.prototype.getAlpha = function (alpha) {
        this.alpha = alpha;
    };

    /**
     * Get fade out ink fore HTML5 canvas
     *
     * @method getDoFadeOutLoop
     * @returns {Boolean}
     */
    RenderingParameters.prototype.getDoFadeOutLoop = function () {
        return this.doFadeOutLoop;
    };

    /**
     * Set fade out ink fore HTML5 canvas
     *
     * @method setDoFadeOutLoop
     * @param {Boolean} doFadeOutLoop
     */
    RenderingParameters.prototype.setDoFadeOutLoop = function (doFadeOutLoop) {
        this.doFadeOutLoop = doFadeOutLoop;
    };

    /**
     * This property is use to show or not show the bounding box
     *
     * @method getShowBoundingBoxes
     * @returns {Boolean}
     */
    RenderingParameters.prototype.getShowBoundingBoxes = function () {
        return this.showBoundingBoxes;
    };

    /**
     * Set the show state of bounding box
     *
     * @method setShowBoundingBoxes
     * @param {Boolean} showBoundingBoxes
     */
    RenderingParameters.prototype.setShowBoundingBoxes = function (showBoundingBoxes) {
        this.showBoundingBoxes = showBoundingBoxes;
    };

    // Export
    scope.RenderingParameters = RenderingParameters;
})(MyScript);