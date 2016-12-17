'use strict';
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
        this._initialized = false;
        this._lastSentComponentIndex = 0;
        this._components = [];
        this._redoComponents = [];
        this.isStarted = false;
        this.resultCallback = callback;
        this.changeCallback = undefined;


        // Capture
        var tempCanvas = _createCanvas(element, 'ms-temp-canvas');
        this.canvasRatio = _getCanvasRatio(tempCanvas);
        element.removeChild(tempCanvas);
        //this.canvasRatio = 1;

        this._captureCanvas = _createCanvas(element, 'ms-capture-canvas');

        this._inkGrabber = new scope.InkGrabber(this._captureCanvas.getContext('2d'));

        // Rendering
        this._renderingCanvas = _createCanvas(element, 'ms-rendering-canvas');


        this._textRenderer = new scope.TextRenderer(this._renderingCanvas.getContext('2d'));
        this._mathRenderer = new scope.MathRenderer(this._renderingCanvas.getContext('2d'));
        this._shapeRenderer = new scope.ShapeRenderer(this._renderingCanvas.getContext('2d'));
        this._musicRenderer = new scope.MusicRenderer(this._renderingCanvas.getContext('2d'));
        this._analyzerRenderer = new scope.AnalyzerRenderer(this._renderingCanvas.getContext('2d'));

        // Recognition
        this._textRecognizer = new scope.TextRecognizer();
        this._mathRecognizer = new scope.MathRecognizer();
        this._shapeRecognizer = new scope.ShapeRecognizer();
        this._musicRecognizer = new scope.MusicRecognizer();
        this._analyzerRecognizer = new scope.AnalyzerRecognizer();

        this._textWSRecognizer = new scope.TextWSRecognizer(this._handleMessage.bind(this));
        this._mathWSRecognizer = new scope.MathWSRecognizer(this._handleMessage.bind(this));

        this._attachListeners(element);

        this.options = { // Default options
            type: scope.RecognitionType.TEXT,
            protocol: scope.Protocol.REST,
            ssl: true,
            width: 400,
            height: 300,
            timeout: 2000,
            typeset: false,
            components: [],
            textParameters: new scope.TextParameter(),
            mathParameters: new scope.MathParameter(),
            shapeParameters: new scope.ShapeParameter(),
            musicParameters: new scope.MusicParameter(),
            analyzerParameters: new scope.AnalyzerParameter()
        };

        if (options) {
            for (var idx in options) {
                if (options[idx] !== undefined) {
                    this.options[idx] = options[idx]; // Override current options
                }
            }
        }

        // Recognition type
        this.setType(this.options.type);

        this.setHost(this.options.host);
        this.setSSL(this.options.ssl);

        this.setTextParameters(this.options.textParameters); // jshint ignore:line
        this.setMathParameters(this.options.mathParameters); // jshint ignore:line
        this.setShapeParameters(this.options.shapeParameters); // jshint ignore:line
        this.setMusicParameters(this.options.musicParameters); // jshint ignore:line
        this.setAnalyzerParameters(this.options.analyzerParameters); // jshint ignore:line

        this.setProtocol(this.options.protocol);
        this.setTimeout(this.options.timeout);
        this.setApplicationKey(this.options.applicationKey);
        this.setHmacKey(this.options.hmacKey);

        this.setPenParameters(this.options.penParameters);

        this.setPrecision(this.options.precision);
        this.setTypeset(this.options.typeset);
        this.setComponents(this.options.components);

        this.setWidth(this.options.width);
        this.setHeight(this.options.height);
    }

    /**
     * Set the width
     *
     * @method setWidth
     * @param {Number} width
     */
    InkPaper.prototype.setWidth = function (width) {
        if (width > 0) {
            this._captureCanvas.width = width * this.canvasRatio;
            this._captureCanvas.style.width = width + 'px';
            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

            this._renderingCanvas.width = width * this.canvasRatio;
            this._renderingCanvas.style.width = width + 'px';
            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
        }
        this._initRenderingCanvas();
    };

    /**
     * Set the height
     *
     * @method setHeight
     * @param {Number} height
     */
    InkPaper.prototype.setHeight = function (height) {
        if (height > 0) {
            this._captureCanvas.height = height * this.canvasRatio;
            this._captureCanvas.style.height = height + 'px';
            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

            this._renderingCanvas.height = height * this.canvasRatio;
            this._renderingCanvas.style.height = height + 'px';

            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
        }
        this._initRenderingCanvas();
    };

    /**
     * Set the network protocol (REST or WebSocket)
     *
     * @param {'REST'|'WebSocket'} protocol
     */
    InkPaper.prototype.setProtocol = function (protocol) {
        switch (protocol) {
            case scope.Protocol.REST:
                this._selectedRecognizer = this._selectedRESTRecognizer;
                break;
            case scope.Protocol.WS:
                this.setTimeout(-1); // FIXME hack to avoid border issues
                this._selectedRecognizer = this._selectedWSRecognizer;
                break;
            default:
                throw new Error('Unknown protocol: ' + protocol);
        }
        this._instanceId = undefined;
        this._initialized = false;
        this._lastSentComponentIndex = 0;
    };

    /**
     * Get the network protocol (REST or WebSocket)
     *
     * @returns {'REST'|'WebSocket'}
     */
    InkPaper.prototype.getProtocol = function () {
        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            return scope.Protocol.WS;
        } else {
            return scope.Protocol.REST;
        }
    };

    /**
     * Set recognition type
     *
     * @method setType
     * @param {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
     */
    InkPaper.prototype.setType = function (type) {
        switch (type) {
            case scope.RecognitionType.TEXT:
                this._selectedRenderer = this._textRenderer;
                this._selectedRESTRecognizer = this._textRecognizer;
                this._selectedWSRecognizer = this._textWSRecognizer;
                break;
            case scope.RecognitionType.MATH:
                this._selectedRenderer = this._mathRenderer;
                this._selectedRESTRecognizer = this._mathRecognizer;
                this._selectedWSRecognizer = this._mathWSRecognizer;
                break;
            case scope.RecognitionType.SHAPE:
                this._selectedRenderer = this._shapeRenderer;
                this._selectedRESTRecognizer = this._shapeRecognizer;
                break;
            case scope.RecognitionType.MUSIC:
                this._selectedRenderer = this._musicRenderer;
                this._selectedRESTRecognizer = this._musicRecognizer;
                break;
            case scope.RecognitionType.ANALYZER:
                this._selectedRenderer = this._analyzerRenderer;
                this._selectedRESTRecognizer = this._analyzerRecognizer;
                break;
            default:
                throw new Error('Unknown type: ' + type);
        }
        this._instanceId = undefined;
        this._initialized = false;
        this._lastSentComponentIndex = 0;
    };

    /**
     * Get recognition type
     *
     * @method getType
     * @returns {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
     */
    InkPaper.prototype.getType = function () {
        if (this._selectedRenderer instanceof scope.TextRenderer) {
            return scope.RecognitionType.TEXT;
        }
        if (this._selectedRenderer instanceof scope.MathRenderer) {
            return scope.RecognitionType.MATH;
        }
        if (this._selectedRenderer instanceof scope.ShapeRenderer) {
            return scope.RecognitionType.SHAPE;
        }
        if (this._selectedRenderer instanceof scope.MusicRenderer) {
            return scope.RecognitionType.MUSIC;
        }
        if (this._selectedRenderer instanceof scope.AnalyzerRenderer) {
            return scope.RecognitionType.ANALYZER;
        }
        throw new Error('Unknown type');
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
     * Set the recognition precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    InkPaper.prototype.setPrecision = function (precision) {
        this._textRecognizer.setPrecision(precision);
        this._textWSRecognizer.setPrecision(precision);
        this._mathRecognizer.setPrecision(precision);
        this._mathWSRecognizer.setPrecision(precision);
        this._shapeRecognizer.setPrecision(precision);
        this._musicRecognizer.setPrecision(precision);
        this._analyzerRecognizer.setPrecision(precision);
    };

    /**
     * Get the default components
     *
     * @method getComponents
     * @return {Array} components
     */
    InkPaper.prototype.getComponents = function () {
        return this.options.components;
    };

    /**
     * Set the default components
     *
     * @method setComponents
     * @param {Array} components
     */
    InkPaper.prototype.setComponents = function (components) {
        this.options.components = components;
        this._initRenderingCanvas();
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
     * @param {TextParameter} textParameters
     */
    InkPaper.prototype.setTextParameters = function (textParameters) {
        if (textParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in textParameters) {
                if (textParameters[i] !== undefined) {
                    this._textRecognizer.getParameters()[i] = textParameters[i]; // Override options
                    this._textWSRecognizer.getParameters()[i] = textParameters[i]; // Override options
                    this._analyzerRecognizer.getParameters().getTextParameters()[i] = textParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get text recognition parameters
     *
     * @method getTextParameters
     * @returns {TextParameter} textParameters
     */
    InkPaper.prototype.getTextParameters = function () {
        return this._textRecognizer.getParameters();
    };

    /**
     * Set math recognition parameters
     *
     * @method setMathParameters
     * @param {MathParameter} mathParameters
     */
    InkPaper.prototype.setMathParameters = function (mathParameters) {
        if (mathParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in mathParameters) {
                if (mathParameters[i] !== undefined) {
                    this._mathRecognizer.getParameters()[i] = mathParameters[i]; // Override options
                    this._mathWSRecognizer.getParameters()[i] = mathParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get math recognition parameters
     *
     * @method getMathParameters
     * @returns {MathParameter} mathParameters
     */
    InkPaper.prototype.getMathParameters = function () {
        return this._mathRecognizer.getParameters();
    };

    /**
     * Set shape recognition parameters
     *
     * @method setShapeParameters
     * @param {ShapeParameter} shapeParameters
     */
    InkPaper.prototype.setShapeParameters = function (shapeParameters) {
        if (shapeParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in shapeParameters) {
                if (shapeParameters[i] !== undefined) {
                    this._shapeRecognizer.getParameters()[i] = shapeParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get shape recognition parameters
     *
     * @method getShapeParameters
     * @returns {ShapeParameter} shapeParameters
     */
    InkPaper.prototype.getShapeParameters = function () {
        return this._shapeRecognizer.getParameters();
    };

    /**
     * Set music recognition parameters
     *
     * @method setMusicParameters
     * @param {MusicParameter} musicParameters
     */
    InkPaper.prototype.setMusicParameters = function (musicParameters) {
        if (musicParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in musicParameters) {
                if (musicParameters[i] !== undefined) {
                    this._musicRecognizer.getParameters()[i] = musicParameters[i]; // Override options
                }
            }
            this._initRenderingCanvas();
        }
    };

    /**
     * Get music recognition parameters
     *
     * @method getMusicParameters
     * @returns {MusicParameter} musicParameters
     */
    InkPaper.prototype.getMusicParameters = function () {
        return this._musicRecognizer.getParameters();
    };

    /**
     * Set analyzer recognition parameters
     *
     * @method setAnalyzerParameters
     * @param {AnalyzerParameter} analyzerParameters
     */
    InkPaper.prototype.setAnalyzerParameters = function (analyzerParameters) {
        if (analyzerParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in analyzerParameters) {
                if (analyzerParameters[i] !== undefined) {
                    this._analyzerRecognizer.getParameters()[i] = analyzerParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get analyzer recognition parameters
     *
     * @method getAnalyzerParameters
     * @returns {AnalyzerParameter} analyzerParameters
     */
    InkPaper.prototype.getAnalyzerParameters = function () {
        return this._analyzerRecognizer.getParameters();
    };

    /**
     * Set pen parameters
     *
     * @method setPenParameters
     * @param {PenParameters} penParameters
     */
    InkPaper.prototype.setPenParameters = function (penParameters) {
        if (penParameters) {
            for (var i in penParameters) {
                if (penParameters[i] !== undefined) {
                    this._selectedRenderer.getParameters()[i] = penParameters[i]; // Override options
                }
            }
            var params = this._selectedRenderer.getParameters();
            this._inkGrabber.setParameters(params); // Override options
            this._textRenderer.setParameters(params); // Override options
            this._mathRenderer.setParameters(params); // Override options
            this._shapeRenderer.setParameters(params); // Override options
            this._musicRenderer.setParameters(params); // Override options
            this._analyzerRenderer.setParameters(params); // Override options
        }
    };

    /**
     * Get pen parameters
     *
     * @method getPenParameters
     * @returns {PenParameters} penParameters
     */
    InkPaper.prototype.getPenParameters = function () {
        return this._selectedRenderer.getParameters();
    };

    /**
     * Enable / disable typeset
     *
     * @method setTypeset
     * @param {Boolean} typeset
     */
    InkPaper.prototype.setTypeset = function (typeset) {
        this._textRenderer.setTypeset(typeset);
        this._mathRenderer.setTypeset(typeset);
        this._shapeRenderer.setTypeset(typeset);
        this._musicRenderer.setTypeset(typeset);
        this._analyzerRenderer.setTypeset(typeset);
    };

    /**
     * Get available languages
     *
     * @method getAvailableLanguages
     * @param {String} [inputMode] input mode
     */
    InkPaper.prototype.getAvailableLanguages = function (inputMode) {
        this._selectedRESTRecognizer.getAvailableLanguageList(
            this.getApplicationKey(),
            inputMode ? inputMode : this._textRecognizer.getParameters().getInputMode()
        ).then(
            function (data) {
                this._onResult(data);
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
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
     * Set the change callback
     *
     * @method setChangeCallback
     * @param {Function} callback callback function
     * @param {Object} callback.data The inkPaper state
     */
    InkPaper.prototype.setChangeCallback = function (changeCallback) {
        this.changeCallback = changeCallback;
    };

    /**
     * Set the recognition result callback
     *
     * @method setResultCallback
     * @param {Function} callback callback function
     * @param {Object} callback.data The recognition result
     */
    InkPaper.prototype.setResultCallback = function (callback) {
        this.resultCallback = callback;
    };

    /**
     * Recognize
     *
     * @method recognize
     * @returns {Promise}
     */
    InkPaper.prototype.recognize = function () {
        var input = this.getComponents().concat(this._components);
        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            if (this._initialized) {
                var lastInput = input.slice(this._lastSentComponentIndex);

                if (lastInput.length > 0) {
                    this._lastSentComponentIndex = input.length;
                    if (!this.isStarted) {
                        this.isStarted = true;
                        this._selectedRecognizer.startWSRecognition(lastInput);
                    } else {
                        this._selectedRecognizer.continueWSRecognition(lastInput, this._instanceId);
                    }
                } else {
                    this._renderResult();
                }
            }
        } else {
            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this._instanceId = undefined;
            }

            if (input.length > 0) {
                if (!this.isStarted) {
                    this._startRESTRecognition(input);
                } else {
                    this._continueRESTRecognition(input, this._instanceId);
                }
            } else {
                this._renderResult();
            }
        }
    };

    InkPaper.prototype._startRESTRecognition = function (components) {

        this._instanceId = undefined;
        this._selectedRecognizer.doSimpleRecognition(
            this.getApplicationKey(),
            this._instanceId,
            components,
            this.getHmacKey()
        ).then(
            function (data) {
                if (!this.isStarted) {
                    this.isStarted = true;
                    this._lastSentComponentIndex = components.length;
                    this._instanceId = data.getInstanceId();
                    this._renderResult(data);
                }
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
    };

    InkPaper.prototype._continueRESTRecognition = function (components, instanceId) {

        this._selectedRecognizer.doSimpleRecognition(
            this.getApplicationKey(),
            instanceId,
            components,
            this.getHmacKey()
        ).then(
            function (data) {
                this._lastSentComponentIndex = this._lastSentComponentIndex + components.length;
                this._renderResult(data);
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
    };

    InkPaper.prototype._clearRESTRecognition = function (instanceId) {

        if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
            this.isStarted = false;
            this._lastSentComponentIndex = 0;
            this._selectedRecognizer.clearShapeRecognitionSession(
                this.getApplicationKey(),
                instanceId
            ).then(
                function (data) {
                    this._instanceId = undefined;
                    this._onResult(data);
                }.bind(this),
                function (error) {
                    this._onResult(undefined, error);
                }.bind(this)
            );
        } else {
            this._onResult();
        }
    };

    /**
     * Return true if you can undo
     *
     * @method canUndo
     * @returns {Boolean}
     */
    InkPaper.prototype.canUndo = function () {
        return this._components.length > 0;
    };

    /**
     * Undo
     *
     * @method undo
     */
    InkPaper.prototype.undo = function () {
        if (this.canUndo()) {
            //Remove the scratched state for Math strokes
            this._components.forEach(function(stroke){
                stroke.scratchedStroke = false;
            });
            //Remove the latsModel used for Shape
            this.updatedModel = undefined;

            this._redoComponents.push(this._components.pop());

            this._clearRESTRecognition(this._instanceId);

            this._initRenderingCanvas();
            this._onChange();

            this.isStarted = false;
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this._selectedRecognizer.resetWSRecognition();
            } else {
                clearTimeout(this._timerId);
                if (this.getTimeout() > -1) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else {
                    this._onResult();
                }
            }
        }
    };

    /**
     * Return true if you can redo
     *
     * @method canRedo
     * @returns {Boolean}
     */
    InkPaper.prototype.canRedo = function () {
        return this._redoComponents.length > 0;
    };

    /**
     * Redo
     *
     * @method redo
     */
    InkPaper.prototype.redo = function () {
        if (this.canRedo()) {
            this._components.push(this._redoComponents.pop());

            this._clearRESTRecognition(this._instanceId);

            this._initRenderingCanvas();
            this._onChange();

            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.recognize();
            } else {
                clearTimeout(this._timerId);
                this.isStarted = false;
                if (this.getTimeout() > -1) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else {
                    this._onResult();
                }
            }
        }
    };

    /**
     * Clear the ink paper
     *
     * @method clear
     */
    InkPaper.prototype.clear = function () {
        this._components = [];
        this._redoComponents = [];
        this._initRenderingCanvas();
        this._clearRESTRecognition(this._instanceId);

        this._onChange();

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            this.isStarted = false;
            this._selectedRecognizer.resetWSRecognition();
        } else if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            clearTimeout(this._timerId);
            this._onResult();
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > -1) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else {
                this._onResult();
            }
        }
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
        clearTimeout(this._timerId);
        var sizeChanged = false;
        if (this._captureCanvas.clientHeight * this.canvasRatio !== this._captureCanvas.height) {
            this._captureCanvas.height = this._captureCanvas.clientHeight * this.canvasRatio;
            this._renderingCanvas.height = this._renderingCanvas.clientHeight * this.canvasRatio;
            sizeChanged = true;
        }

        if (this._captureCanvas.clientWidth * this.canvasRatio !== this._captureCanvas.width) {
            this._captureCanvas.width = this._captureCanvas.clientWidth * this.canvasRatio;
            this._renderingCanvas.width = this._renderingCanvas.clientWidth * this.canvasRatio;
            sizeChanged = true;
        }

        //Safari trash the canvas content when heigth or width are modified.
        if (sizeChanged) {

            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
            this._initRenderingCanvas();
        }

        if (this.canRedo()) {
            this._redoComponents = [];
            this._onChange();
        }

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

        this._components.push(stroke);
        this._onChange();

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            if (!this._selectedRecognizer.isOpen() && !this._selectedRecognizer.isConnecting()) {
                this._selectedRecognizer.open();
            } else {
                this.recognize();
            }
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > -1) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            }
        }
    };

    InkPaper.prototype._onResult = function (data, err) {
        if (this.resultCallback) {
            this.resultCallback(data, err);
        }
        if (err) {
            this._element.dispatchEvent(new CustomEvent('error', {detail: err}));
        } else {
            this._element.dispatchEvent(new CustomEvent('success', {detail: data}));
        }
    };

    InkPaper.prototype._onChange = function () {
        var data = {
            canUndo: this.canUndo(),
            undoLength: this._components.length,
            canRedo: this.canRedo(),
            redoLength: this._redoComponents.length
        };

        if (this.changeCallback) {
            this.changeCallback(data)
        }
        this._element.dispatchEvent(new CustomEvent('changed', {detail: data}));
    };

    InkPaper.prototype._renderResult = function (data) {
        this.updatedModel = this._selectedRenderer.drawRecognitionResult(this.getComponents().concat(this._components), data? data.getDocument(): undefined);
        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            }
        }
        this._onResult(data);
        return data;
    };

    /**
     * Set recognition service url
     *
     * @param {String} host
     */
    InkPaper.prototype.setHost = function (host) {
        this._textRecognizer.setHost(host);
        this._textWSRecognizer.setHost(host);
        this._mathRecognizer.setHost(host);
        this._mathWSRecognizer.setHost(host);
        this._shapeRecognizer.setHost(host);
        this._musicRecognizer.setHost(host);
        this._analyzerRecognizer.setHost(host);
    };

    /**
     * @private
     */
    InkPaper.prototype.setSSL = function (ssl) {
        this._textRecognizer.setSSL(ssl);
        this._textWSRecognizer.setSSL(ssl);
        this._mathRecognizer.setSSL(ssl);
        this._mathWSRecognizer.setSSL(ssl);
        this._shapeRecognizer.setSSL(ssl);
        this._musicRecognizer.setSSL(ssl);
        this._analyzerRecognizer.setSSL(ssl);
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

        //Desactivation of contextmenu to prevent safari to fire pointerdown only once
        element.addEventListener("contextmenu", function (e) {
                                     e.preventDefault();
                                     e.stopPropagation();
                                     return false;
                                 }
        );

        element.addEventListener('pointerdown', function (e) {
            if (!pointerId) {
                pointerId = e.pointerId;
                e.preventDefault();pointerId
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

                var point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
                self._up(point.x, point.y, point.t);
                pointerId = undefined;
            }
        }, false);

        element.addEventListener('pointerout', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
                self._up(point.x, point.y, point.t);
                pointerId = undefined;
            }
        }, false);
    };

    InkPaper.prototype._initRenderingCanvas = function () {
        this._selectedRenderer.clear();

        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            }
        }
        if(this._selectedRecognizer instanceof scope.ShapeRecognizer && this.updatedModel){
            this._selectedRenderer.drawRecognitionResult(this.updatedModel.components, this.updatedModel.document);
        } else {
            this._selectedRenderer.drawComponents(this.getComponents().concat(this._components));
        }
    };

    /**
     *
     * @param message
     * @param error
     * @returns {boolean} false no immediate replay needed, true when the call need to be replay ASAP
     * @private
     */
    InkPaper.prototype._handleMessage = function (message, error) {
        var replayNeeded = false;
        if (error) {
            replayNeeded = true;
            this._instanceId = undefined;
            this.isStarted = false;
            this._lastSentComponentIndex = 0;
            this._onResult(undefined, error);
        }

        if (message) {
            switch (message.type) {
                case 'open':
                    this._selectedWSRecognizer.initWSRecognition(this.getApplicationKey());
                    break;
                case 'hmacChallenge':
                    this._selectedWSRecognizer.takeUpHmacChallenge(this.getApplicationKey(), message.getChallenge(), this.getHmacKey());
                    break;
                case 'init':
                    this.isStarted = false;
                    this._initialized = true;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    this.recognize();
                    break;
                case 'reset':
                    this.isStarted = false;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    this.recognize();
                    break;
                case 'close':
                    this._initialized = false;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    break;
                default:
                    this.isStarted = true;
                    if (!this._instanceId) {
                        this._instanceId = message.getInstanceId();
                    }
                    this._renderResult(message);
                    break;
            }
        }
        return replayNeeded;
    };

    /**
     * Return the stats allowing to monitor what ink size is send to the server.
     * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
     */
    InkPaper.prototype.getStats = function () {
        var stats = {strokesCount: 0, pointsCount: 0, byteSize: 0, humanSize: 0, humanUnit: 'BYTE'};
        if (this._components) {
            stats.strokesCount = this._components.length;
            var pointsCount = 0;
            for (var strokeNb = 0; strokeNb < this._components.length; strokeNb++) {
                pointsCount = pointsCount + this._components[strokeNb].x.length;
            }
            stats.strokesCount = this._components.length;
            stats.pointsCount = pointsCount;
            //We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecogntion
            var byteSize = 270;
            byteSize = JSON.stringify(this._components).length;
            stats.byteSize = byteSize;
            if (byteSize < 270) {
                stats.humanUnit = 'BYTE';
                stats.byteSize = 0;
                stats.humanSize = 0;
            } else if (byteSize < 2048) {
                stats.humanUnit = 'BYTES';
                stats.humanSize = byteSize;
            } else if (byteSize < 1024 * 1024) {
                stats.humanUnit = 'KiB';
                stats.humanSize = (byteSize / 1024).toFixed(2);
            } else {
                stats.humanUnit = 'MiB';
                stats.humanSize = (byteSize / 1024 / 1024).toFixed(2);
            }
        }
        return stats;
    };

    /**
     *
     * @param marginX the horizontal margin to apply (by default 10)
     * @param marginY the vertical margin to apply (by default 10)
     * @returns {ImageData} Build an ImageData object with content shrink to border of strokes.
     * @private
     */
    InkPaper.prototype.getInkAsImageData = function (marginX, marginY) {
        //Remove the scratched strokes
        var componentCopy = [];
        this._components.forEach(function(stroke) {
                                     if (stroke.scratchedStroke !== true) {
                                         componentCopy.push(stroke);
                                     }
                                 }
        );

        if (!marginX) {
            marginX = 10;
        }
        if (!marginY) {
            marginY = 10;
        }

        if (componentCopy && componentCopy.length > 0) {
            var updatedStrokes;
            var strokesCount = componentCopy.length;
            //Initializing min and max
            var minX = componentCopy[0].x[0];
            var maxX = componentCopy[0].x[0];
            var minY = componentCopy[0].y[0];
            var maxY = componentCopy[0].y[0];

            // Computing the min and max for x and y
            for (var strokeNb = 0; strokeNb < componentCopy.length; strokeNb++) {
                var pointCount = componentCopy[strokeNb].x.length;
                for (var pointNb = 0; pointNb < pointCount; pointNb++) {
                    var currentX = componentCopy[strokeNb].x[pointNb];
                    var currentY = componentCopy[strokeNb].y[pointNb];
                    if (currentX < minX) {
                        minX = currentX;
                    }
                    if (currentX > maxX) {
                        maxX = currentX;
                    }
                    if (currentY < minY) {
                        minY = currentY;
                    }
                    if (currentY > maxY) {
                        maxY = currentY;
                    }
                }
            }
            var nonDisplayCanvas = document.createElement('canvas');
            nonDisplayCanvas.width = (maxX ) + (2 * marginX);
            nonDisplayCanvas.height = (maxY ) + (2 * marginY)

            var ctx = nonDisplayCanvas.getContext("2d");

            var imageRendered = new scope.ImageRenderer(ctx);
            imageRendered.drawComponents(componentCopy, ctx);

            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
            return ctx.getImageData(minX - marginX, minY - marginY, (maxX - minX ) + (2 * marginX), (maxY - minY ) + (2 * marginY));
        }
    };

    /**
     *
     * @param marginX the horizontal margin to apply (by default 10)
     * @param marginY the vertical margin to apply (by default 10)
     * @returns {String} Build an String containg dataUrl with content shrink to border of strokes.
     * @private
     */
    InkPaper.prototype.getInkAsPng = function (marginX, marginY) {
        var imageRenderingCanvas = document.createElement('canvas');
        imageRenderingCanvas.style.display = 'none';

        var imageDataToRender = this.getInkAsImageData();
        imageRenderingCanvas.width = imageDataToRender.width;
        imageRenderingCanvas.style.width = imageDataToRender.width + 'px';
        imageRenderingCanvas.height = imageDataToRender.height;
        imageRenderingCanvas.style.height = imageDataToRender.height + 'px';
        var ctx = imageRenderingCanvas.getContext('2d');
        ctx.putImageData(imageDataToRender, 0, 0);
        return imageRenderingCanvas.toDataURL("image/png");
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
        var count = document.querySelectorAll('canvas[id^=' + id + ']').length;
        var canvas = document.createElement('canvas');
        canvas.id = id + '-' + count;
        parent.appendChild(canvas);
        return canvas;
    }

    /**
     * Tool to get canvas ratio (retina display)
     *
     * @private
     * @param {Element} canvas
     * @returns {Number}
     */
    function _getCanvasRatio(canvas) {
        if (canvas) {
            var context = canvas.getContext('2d'),
                devicePixelRatio = window.devicePixelRatio || 1,
                backingStoreRatio = context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStoreRatio;
        }
        return 1;
    }


    /**
     * Tool to get proper coordinates
     *
     * @private
     * @param {Event} e
     * @param {Element} element
     * @returns {Object}
     */
    function _getCoordinates(e, container) {
        if (e.changedTouches) e = e.changedTouches[0];
        var rect = container.getBoundingClientRect();
        return {
            x: e.clientX - rect.left - container.clientLeft,
            y: e.clientY - rect.top - container.clientTop,
            t: e.timeStamp
        };
    }

    // Export
    scope.InkPaper = InkPaper;
})(MyScript);
