'use strict';

(function (scope) {
    /**
     * InkPaper
     *
     * @class InkPaper
     * @param {Element} element
     * @param {Object} [options]
     * @param {Function} [callback] callback function
     * @param {Object} callback.data The recognition result
     * @param {Object} callback.err The err to the callback
     * @constructor
     */
    function InkPaper(element, options, callback) {
        this._element = element;
        this._instanceId = undefined;
        this._timerId = undefined;
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this.callback = callback;
        this.options = { // Default options
            type: 'TEXT',
            width: 400,
            height: 300,
            timeout: 2000,
            renderInput: true,
            renderOuput: false,
            components: [],
            textParameters: {},
            mathParameters: {},
            shapeParameters: {},
            musicParameters: {},
            analyzerParameters: {}
        };

        // Capture
        this._captureCanvas = _createCanvas(element, 'ms-capture-canvas');
        this._inkGrabber = new scope.InkGrabber(this._captureCanvas.getContext('2d'));

        // Rendering
        this._renderingCanvas = _createCanvas(element, 'ms-rendering-canvas');

        this._textRenderer = new scope.TextRenderer(this._renderingCanvas.getContext('2d'));
        this._mathRenderer = new scope.MathRenderer(this._renderingCanvas.getContext('2d'));
        this._shapeRenderer = new scope.ShapeRenderer(this._renderingCanvas.getContext('2d'));
        this._musicRenderer = new scope.MusicRenderer(this._renderingCanvas.getContext('2d'));
        this._analyzerRenderer = new scope.AnalyzerRenderer(this._renderingCanvas.getContext('2d'));

        this._textRecognizer = new scope.TextRecognizer();
        this._mathRecognizer = new scope.MathRecognizer();
        this._shapeRecognizer = new scope.ShapeRecognizer();
        this._musicRecognizer = new scope.MusicRecognizer();
        this._analyzerRecognizer = new scope.AnalyzerRecognizer();

        this._attachListeners(element);

        if (options) {
            for (var idx in options) {
                if (options[idx] !== undefined) {
                    this.options[idx] = options[idx]; // Override current options
                }
            }
        }

        this._initialize(this._getOptions());
    }

    /**
     * Set the width
     *
     * @method setWidth
     * @param {Number} width
     */
    InkPaper.prototype.setWidth = function (width) {
        this._captureCanvas.width = width;
        this._renderingCanvas.width = width;
        this._selectedRenderer.clear();
        this._initRenderingCanvas();
    };

    /**
     * Set the height
     *
     * @method setHeight
     * @param {Number} height
     */
    InkPaper.prototype.setHeight = function (height) {
        this._captureCanvas.height = height;
        this._renderingCanvas.height = height;
        this._selectedRenderer.clear();
        this._initRenderingCanvas();
    };

    /**
     * Set recognition type
     *
     * @method setType
     * @param {'TEXT'|'MATH'|'SHAPE'|'ANALYZER'|'MUSIC'} type
     */
    InkPaper.prototype.setType = function (type) {
        switch (type) {
            case 'TEXT':
                this._selectedRenderer = this._textRenderer;
                this._selectedRecognizer = this._textRecognizer;
                break;
            case 'MATH':
                this._selectedRenderer = this._mathRenderer;
                this._selectedRecognizer = this._mathRecognizer;
                break;
            case 'SHAPE':
                this._selectedRenderer = this._shapeRenderer;
                this._selectedRecognizer = this._shapeRecognizer;
                break;
            case 'MUSIC':
                this._selectedRenderer = this._musicRenderer;
                this._selectedRecognizer = this._musicRecognizer;
                break;
            case 'ANALYZER':
                this._selectedRenderer = this._analyzerRenderer;
                this._selectedRecognizer = this._analyzerRecognizer;
                break;
            default:
                throw new Error('Unknown type: ' + type);
        }
    };

    /**
     * Get the recognition timeout
     *
     * @method getTimeout
     * @returns {Number}
     */
    InkPaper.prototype.getTimeout = function () {
        return this.timeout;
    };

    /**
     * Set the recognition timeout
     *
     * @method setTimeout
     * @param {Number} timeout
     */
    InkPaper.prototype.setTimeout = function (timeout) {
        this.timeout = timeout;
    };

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    InkPaper.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    InkPaper.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get the HMAC key
     *
     * @method getHmacKey
     * @returns {String}
     */
    InkPaper.prototype.getHmacKey = function () {
        return this.hmacKey;
    };

    /**
     * Set the HMAC key
     *
     * @method setHmacKey
     * @param {String} hmacKey
     */
    InkPaper.prototype.setHmacKey = function (hmacKey) {
        this.hmacKey = hmacKey;
    };

    /**
     * Set text recognition parameters
     *
     * @method setTextParameters
     * @param {TextParameters} textParameters
     */
    InkPaper.prototype.setTextParameters = function (textParameters) {
        if (textParameters) {
            for (var i in textParameters) {
                if (textParameters[i] !== undefined) {
                    this._textRecognizer.getParameters()[i] = textParameters[i]; // Override options
                    this._analyzerRecognizer.getParameters().getTextParameters()[i] = textParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Set math recognition parameters
     *
     * @method setMathParameters
     * @param {MathParameters} mathParameters
     */
    InkPaper.prototype.setMathParameters = function (mathParameters) {
        if (mathParameters) {
            for (var i in mathParameters) {
                if (mathParameters[i] !== undefined) {
                    this._mathRecognizer.getParameters()[i] = mathParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Set shape recognition parameters
     *
     * @method setShapeParameters
     * @param {ShapeParameters} shapeParameters
     */
    InkPaper.prototype.setShapeParameters = function (shapeParameters) {
        if (shapeParameters) {
            for (var i in shapeParameters) {
                if (shapeParameters[i] !== undefined) {
                    this._shapeRecognizer.getParameters()[i] = shapeParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Set music recognition parameters
     *
     * @method setMusicParameters
     * @param {MusicParameters} musicParameters
     */
    InkPaper.prototype.setMusicParameters = function (musicParameters) {
        if (musicParameters) {
            for (var i in musicParameters) {
                if (musicParameters[i] !== undefined) {
                    this._musicRecognizer.getParameters()[i] = musicParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Set analyzer recognition parameters
     *
     * @method setAnalyzerParameters
     * @param {AnalyzerParameters} analyzerParameters
     */
    InkPaper.prototype.setAnalyzerParameters = function (analyzerParameters) {
        if (analyzerParameters) {
            for (var i in analyzerParameters) {
                if (analyzerParameters[i] !== undefined) {
                    this._analyzerRecognizer.getParameters()[i] = analyzerParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * @private
     * @method _initialize
     * @param {Object} options
     */
    InkPaper.prototype._initialize = function (options) {

        this._setHost(options.url);

        this.setTextParameters(options.textParameters); // jshint ignore:line
        this.setMathParameters(options.mathParameters); // jshint ignore:line
        this.setShapeParameters(options.shapeParameters); // jshint ignore:line
        this.setMusicParameters(options.musicParameters); // jshint ignore:line
        this.setAnalyzerParameters(options.analyzerParameters); // jshint ignore:line

        // Recognition type
        this.setType(options.type);
        this.setTimeout(options.timeout);
        this.setApplicationKey(options.applicationKey);
        this.setHmacKey(options.hmacKey);

        this.setWidth(options.width);
        this.setHeight(options.height);
    };

    /**
     * Get options
     *
     * @private
     * @method _getOptions
     * @returns {Object}
     */
    InkPaper.prototype._getOptions = function () {
        return this.options;
    };

    /**
     * Get the renderer
     *
     * @method getRenderer
     * @returns {AbstractRenderer}
     */
    InkPaper.prototype.getRenderer = function () {
        return this._selectedRenderer;
    };

    /**
     * Get the ink capturer
     *
     * @method getInkGrabber
     * @returns {InkGrabber}
     */
    InkPaper.prototype.getInkGrabber = function () {
        return this._inkGrabber;
    };

    /**
     * Get the recognizer
     *
     * @method getRecognizer
     * @returns {AbstractRecognizer}
     */
    InkPaper.prototype.getRecognizer = function () {
        return this._selectedRecognizer;
    };

    /**
     * Set the recognition callback
     *
     * @method setCallback
     * @param {Function} callback callback function
     * @param {Object} callback.data The recognition result
     * @param {Object} callback.err The err to the callback
     */
    InkPaper.prototype.setCallback = function (callback) {
        this.callback = callback;
    };

    /**
     * Recognize
     *
     * @method recognize
     * @returns {Promise}
     */
    InkPaper.prototype.recognize = function () {
        return this._doRecognition(this.components);
    };

    /**
     * Return true if there is components onto the undo list
     *
     * @method hasUndo
     * @returns {Boolean}
     */
    InkPaper.prototype.hasUndo = function () {
        return this.components.length > 0;
    };

    /**
     * Undo
     *
     * @method undo
     */
    InkPaper.prototype.undo = function () {
        if (this.hasUndo()) {
            this.redoComponents.push(this.components.pop());

            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this.lastNonRecoComponentIdx = 0;
                this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
                this._instanceId = undefined;
            }
            this._element.dispatchEvent(new CustomEvent('undo-changed', {detail: {hasUndo: this.hasUndo()}}));

            clearTimeout(this._timerId);
            if (this.getTimeout() > 0) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else if (this.getTimeout() > -1) {
                this.recognize();
            }
        }
    };

    /**
     * Return true if there is components onto the undo list
     *
     * @method hasRedo
     * @returns {Boolean}
     */
    InkPaper.prototype.hasRedo = function () {
        return this.redoComponents.length > 0;
    };

    /**
     * Redo
     *
     * @method redo
     */
    InkPaper.prototype.redo = function () {
        if (this.hasRedo()) {
            this.components.push(this.redoComponents.pop());

            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this.lastNonRecoComponentIdx = 0;
                this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
                this._instanceId = undefined;
            }
            this._element.dispatchEvent(new CustomEvent('redo-changed', {detail: {hasUndo: this.hasUndo()}}));

            clearTimeout(this._timerId);
            if (this.getTimeout() > 0) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else if (this.getTimeout() > -1) {
                this.recognize();
            }
        }
    };

    /**
     * Clear the ink paper
     *
     * @method clear
     */
    InkPaper.prototype.clear = function () {
        if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
            this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
        }
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this._inkGrabber.clear();
        this._instanceId = undefined;

        this._initRenderingCanvas();
        this._element.dispatchEvent(new CustomEvent('cleared'));
    };

    InkPaper.event = {
        'addDomListener': function (element, useCapture, myfunction) {
            element.addEventListener(useCapture, myfunction);
        }
    };

    /**
     *
     * @private
     * @method _down
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._down = function (x, y, t) {
        this._inkGrabber.startCapture(x, y, t);
    };

    /**
     *
     * @private
     * @method _move
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._move = function (x, y, t) {
        this._inkGrabber.continueCapture(x, y, t);
    };

    /**
     *
     * @private
     * @method _move
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._up = function (x, y, t) {
        this._inkGrabber.endCapture(x, y, t);

        var stroke = this._inkGrabber.getStroke();

        this._inkGrabber.clear();
        this._selectedRenderer.drawComponent(stroke);

        this.components.push(stroke);

        clearTimeout(this._timerId);
        if (this.getTimeout() > 0) {
            this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
        } else if (this.getTimeout() > -1) {
            this.recognize();
        }
    };

    /**
     * Do recognition
     *
     * @private
     * @method _doRecognition
     * @param {AbstractComponent[]} components Input components
     */
    InkPaper.prototype._doRecognition = function (components) {
        if (components.length > 0) {
            var input = [];
            if (this._selectedRecognizer instanceof scope.TextRecognizer) {
                var inputUnit = new scope.TextInputUnit();
                inputUnit.setComponents(this._getOptions().components.concat(components));
                input = [inputUnit];
            } else if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                input = components.slice(this.lastNonRecoComponentIdx);
            } else {
                input = input.concat(this._getOptions().components, components);
            }
            this._selectedRecognizer.doSimpleRecognition(
                this.getApplicationKey(),
                this._instanceId,
                input,
                this.getHmacKey()
            ).then(
                function (data) {
                    if (!this._instanceId) {
                        this._instanceId = data.getInstanceId();
                    } else if (this._instanceId === data.getInstanceId()) {
                        this.callback(undefined, new Error('Wrong instance', data.getInstanceId()));
                        this._element.dispatchEvent(new CustomEvent('recognition-failed', {detail: {message: 'Wrong instance'}}));
                        return data;
                    }

                    if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                        this.lastNonRecoComponentIdx = components.length;
                    }

                    if (this._getOptions().renderInput || this._getOptions().renderOuput) {
                        this._selectedRenderer.clear();

                        if (this._getOptions().renderInput) {
                            this._initRenderingCanvas();
                        }

                        if (this._getOptions().renderOuput) {
                            if (data instanceof scope.ShapeResult) {
                                this._selectedRenderer.drawRecognitionResult(components, data.getShapeDocument());
                            }
                            else if (data instanceof scope.AnalyzerResult) {
                                this._selectedRenderer.drawRecognitionResult(components, data.getAnalyzerDocument());
                            }
                        }

                    }
                    this.callback(data);
                    this._element.dispatchEvent(new CustomEvent('recognition-succeed', {detail: data}));
                    return data;
                }.bind(this),
                function (error) {
                    this.callback(undefined, error);
                    this._element.dispatchEvent(new CustomEvent('recognition-failed', {detail: error}));
                    return error;
                }.bind(this)
            );
        } else {
            this._selectedRenderer.clear();
            this._initRenderingCanvas();
            this._element.dispatchEvent(new CustomEvent('recognition-succeed'));
            this.callback();
        }
    };

    /**
     * Set recognition service host
     *
     * @private
     * @param {String} url
     */
    InkPaper.prototype._setHost = function (url) {
        if (this._textRecognizer.getHost() !== url) {
            this._textRecognizer = new scope.TextRecognizer(url);
        }
        if (this._mathRecognizer.getHost() !== url) {
            this._mathRecognizer = new scope.MathRecognizer(url);
        }
        if (this._shapeRecognizer.getHost() !== url) {
            this._shapeRecognizer = new scope.ShapeRecognizer(url);
        }
        if (this._musicRecognizer.getHost() !== url) {
            this._musicRecognizer = new scope.MusicRecognizer(url);
        }
        if (this._analyzerRecognizer.getHost() !== url) {
            this._analyzerRecognizer = new scope.AnalyzerRecognizer(url);
        }
    };

    /**
     * Tool to attach touch events
     *
     * @private
     * @param {Element} element
     */
    InkPaper.prototype._attachListeners = function (element) {
        var self = this;
        var pointerId;
        element.addEventListener('pointerdown', function (e) {
            if (!pointerId) {
                pointerId = e.pointerId;
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._down(coord.x, coord.y, coord.t);
            }
        }, false);

        element.addEventListener('pointermove', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._move(coord.x, coord.y, coord.t);
            }
        }, false);

        element.addEventListener('pointerup', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._up(coord.x, coord.y, coord.t);

                pointerId = undefined;
            }
        }, false);

        element.addEventListener('pointerleave', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._up(coord.x, coord.y, coord.t);

                pointerId = undefined;
            }
        }, false);
    };

    InkPaper.prototype._initRenderingCanvas = function () {
        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            } else {
                throw new Error('Missing music staff');
            }
        }
        this._selectedRenderer.drawComponents(this._getOptions().components.concat(this.components));
    };

    /**
     * Tool to create canvas
     *
     * @private
     * @param {Element} parent
     * @param {String} id
     * @returns {Element}
     */
    function _createCanvas(parent, id) {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        parent.appendChild(canvas);
        return canvas;
    }

    /**
     * Tool to get proper coordinates
     *
     * @private
     * @param {Event} e
     * @param {Element} element
     * @returns {Object}
     */
    function _getCoordinates(e, element) {
        var x;
        var y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        return {
            x: x,
            y: y,
            t: e.timeStamp
        };
    }

    // Export
    scope.InkPaper = InkPaper;
})(MyScript);