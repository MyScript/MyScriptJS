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
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this.resultCallback = callback;
        this.changeCallback = undefined;
        this.canvasRatio = 1;
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

        // Capture
        this._captureCanvas = _createCanvas(element, 'ms-capture-canvas');
        this._inkGrabber = new scope.InkGrabber(this._captureCanvas.getContext('2d'));

        // Rendering
        this._renderingCanvas = _createCanvas(element, 'ms-rendering-canvas');
        this.canvasRatio = _getCanvasRatio(this._renderingCanvas);

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
        this._captureCanvas.width = width * this.canvasRatio;
        this._captureCanvas.style.width = width + 'px';
        this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

        this._renderingCanvas.width = width * this.canvasRatio;
        this._renderingCanvas.style.width = width + 'px';
        this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
        this._initRenderingCanvas();
    };

    /**
     * Set the height
     *
     * @method setHeight
     * @param {Number} height
     */
    InkPaper.prototype.setHeight = function (height) {
        this._captureCanvas.height = height * this.canvasRatio;
        this._captureCanvas.style.height = height + 'px';
        this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

        this._renderingCanvas.height = height * this.canvasRatio;
        this._renderingCanvas.style.height = height + 'px';
        this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
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
        this.lastNonRecoComponentIdx = 0;
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
        this.lastNonRecoComponentIdx = 0;
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
     * Set recognition language
     *
     * @deprecated Use setTextParameters instead
     * @method setLanguage
     * @param  String language
     */
    InkPaper.prototype.setLanguage = function (language) {
        if (this.options.type === scope.RecognitionType.TEXT) {
            this.isStarted = false;
            this._selectedWSRecognizer.resetWSRecognition();
            this._selectedWSRecognizer.getParameters().setLanguage(language);
        }
    };

    /**
     * Set math recognition format result types
     *
     * @deprecated Use setMathParameters instead
     * @method setResultTypes
     * @param  Array resultTypes
     */
    InkPaper.prototype.setResultTypes = function (resultTypes) {
        if (this.options.type === scope.RecognitionType.MATH) {
            this.isStarted = false;
            this._selectedWSRecognizer.resetWSRecognition();
            this._selectedWSRecognizer.getParameters().setResultTypes(resultTypes.map(function (x) {
                return x.toUpperCase();
            }));
        }
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
     * @private
     * @method _initialize
     * @param {Object} options
     */
    InkPaper.prototype._initialize = function (options) {

        // Recognition type
        this.setType(options.type);

        this.setHost(options.host);

        this.setTextParameters(options.textParameters); // jshint ignore:line
        this.setMathParameters(options.mathParameters); // jshint ignore:line
        this.setShapeParameters(options.shapeParameters); // jshint ignore:line
        this.setMusicParameters(options.musicParameters); // jshint ignore:line
        this.setAnalyzerParameters(options.analyzerParameters); // jshint ignore:line

        this.setProtocol(options.protocol);
        this.setTimeout(options.timeout);
        this.setApplicationKey(options.applicationKey);
        this.setHmacKey(options.hmacKey);

        this.setPenParameters(options.penParameters);

        this.setPrecision(options.precision);
        this.setTypeset(options.typeset);

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
                return this._onResult(data);
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
                return error;
            }.bind(this)
        ).done();
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
     * @deprecated Use setResultCallback instead
     * @param {Function} callback callback function
     * @param {Object} callback.data The recognition result
     * @param {Object} callback.err The err to the callback
     */
    InkPaper.prototype.setCallback = function (callback) {
        this.resultCallback = callback;
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
        return this._doRecognition(this.components);
    };

    /**
     * Return true if you can undo
     *
     * @method canUndo
     * @returns {Boolean}
     */
    InkPaper.prototype.canUndo = function () {
        return this.components.length > 0;
    };

    /**
     * Undo
     *
     * @method undo
     */
    InkPaper.prototype.undo = function () {
        if (this.canUndo()) {
            this.redoComponents.push(this.components.pop());

            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this.lastNonRecoComponentIdx = 0;
                if (this._instanceId) {
                    this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
                    this._inkGrabber.clear();
                    this._instanceId = undefined;
                }
            }
            this._initRenderingCanvas();
            this._onChange({
                canUndo: this.canUndo(),
                undoLength: this.components.length,
                canRedo: this.canRedo(),
                redoLength: this.redoComponents.length
            });

            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            } else {
                clearTimeout(this._timerId);
                if (this.getTimeout() > 0) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else if (this.getTimeout() > -1) {
                    this.recognize();
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
        return this.redoComponents.length > 0;
    };

    /**
     * Redo
     *
     * @method redo
     */
    InkPaper.prototype.redo = function () {
        if (this.canRedo()) {
            this.components.push(this.redoComponents.pop());

            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this.lastNonRecoComponentIdx = 0;
                if (this._instanceId) {
                    this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
                    this._inkGrabber.clear();
                    this._instanceId = undefined;
                }
            }
            this._initRenderingCanvas();
            this._onChange({
                canUndo: this.canUndo(),
                undoLength: this.components.length,
                canRedo: this.canRedo(),
                redoLength: this.redoComponents.length
            });

            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.recognize();
            } else {
                clearTimeout(this._timerId);
                if (this.getTimeout() > 0) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else if (this.getTimeout() > -1) {
                    this.recognize();
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
        if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
            if (this._instanceId) {
                this._selectedRecognizer.clearShapeRecognitionSession(this.getApplicationKey(), this._instanceId);
                this._instanceId = undefined;
            }
        }
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this._inkGrabber.clear();
        this._instanceId = undefined;

        this._initRenderingCanvas();
        this._onChange({
            canUndo: this.canUndo(),
            undoLength: this.components.length,
            canRedo: this.canRedo(),
            redoLength: this.redoComponents.length
        });

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            this.isStarted = false;
            this._selectedRecognizer.resetWSRecognition();
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > 0) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else if (this.getTimeout() > -1) {
                this.recognize();
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

        if (this._captureCanvas.clientHeight != this._captureCanvas.height) {
            this._captureCanvas.height = this._captureCanvas.clientHeight;
            this._renderingCanvas.height = this._renderingCanvas.clientHeight;
        }
        if (this._captureCanvas.clientWidth != this._captureCanvas.width) {
            this._captureCanvas.width = this._captureCanvas.clientWidth;
            this._renderingCanvas.width = this._renderingCanvas.clientWidth;
        }

        if (this.canRedo()) {
            this.redoComponents = [];
            this._onChange({
                canUndo: this.canUndo(),
                undoLength: this.components.length,
                canRedo: this.canRedo(),
                redoLength: this.redoComponents.length
            });
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

        this.components.push(stroke);
        this._onChange({
            canUndo: this.canUndo(),
            undoLength: this.components.length,
            canRedo: this.canRedo(),
            redoLength: this.redoComponents.length
        });

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            if (!this._selectedRecognizer.isOpen() && !this._selectedRecognizer.isConnecting()) {
                this._selectedRecognizer.open();
            } else {
                this.recognize();
            }
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > 0) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else if (this.getTimeout() > -1) {
                this.recognize();
            }
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
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                if (this._initialized) {
                    var inputWS = [];
                    if (this._selectedRecognizer instanceof scope.TextWSRecognizer) {
                        var inputUnitWS = new scope.TextInputUnit();
                        inputUnitWS.setComponents(this._getOptions().components.concat(components.slice(this.lastNonRecoComponentIdx)));
                        inputWS = [inputUnitWS];
                    } else {
                        inputWS = components.slice(this.lastNonRecoComponentIdx);
                    }
                    this.lastNonRecoComponentIdx = components.length;


                    if (this.isStarted) {
                        this._selectedRecognizer.continueWSRecognition(inputWS, this._instanceId);
                    } else {
                        this.isStarted = true;
                        this._selectedRecognizer.startWSRecognition(inputWS);
                    }
                }
            } else {
                var input = [];
                if (this._selectedRecognizer instanceof scope.TextRecognizer) {
                    var inputUnit = new scope.TextInputUnit();
                    inputUnit.setComponents(this._getOptions().components.concat(components));
                    input = [inputUnit];
                } else if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                    input = components.slice(this.lastNonRecoComponentIdx);
                    this.lastNonRecoComponentIdx = components.length;
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
                        return this._parseResult(data, input);
                    }.bind(this),
                    function (error) {
                        this._onResult(undefined, error);
                        return error;
                    }.bind(this)
                ).done();
            }
        } else {
            this.isStarted = false;
            this._selectedRenderer.clear();
            this._initRenderingCanvas();
            this._onResult();
        }
    };

    InkPaper.prototype._onResult = function (data, err) {
        if (this.resultCallback) {
            this.resultCallback(data, err);
        }
        if (err) {
            this._element.dispatchEvent(new CustomEvent('failure', {detail: err}));
        } else {
            this._element.dispatchEvent(new CustomEvent('success', {detail: data}));
        }
    };

    InkPaper.prototype._onChange = function (changes) {
        if (this.changeCallback) {
            this.changeCallback(changes)
        }
        this._element.dispatchEvent(new CustomEvent('changed', {detail: changes}));
    };

    InkPaper.prototype._parseResult = function (data, input) {

        if (!this._instanceId) {
            this._instanceId = data.getInstanceId();
        } else if (this._instanceId !== data.getInstanceId()) {
            this._onResult(data);
            return data;
        }

        if (data.getDocument().hasScratchOutResults() || this._selectedRenderer.isTypesetting()) {
            this._selectedRenderer.clear();
            this._selectedRenderer.drawRecognitionResult(input, data.getDocument());
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
                console.log('pointerenter');
                console.log(e);
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
        this._selectedRenderer.clear();
        this._drawInput(this.components);
    };

    InkPaper.prototype._drawInput = function (components) {
        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            } else {
                console.log('Missing music staff');
            }
        }
        this._selectedRenderer.drawComponents(this._getOptions().components.concat(components));
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
            this.lastNonRecoComponentIdx = 0;
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
                    this.lastNonRecoComponentIdx = 0;
                    this.recognize();
                    break;
                case 'reset':
                    this._instanceId = undefined;
                    this.lastNonRecoComponentIdx = 0;
                    this.recognize();
                    break;
                case 'close':
                    this._initialized = false;
                    this._instanceId = undefined;
                    this.lastNonRecoComponentIdx = 0;
                    break;
                default:
                {
                    this._parseResult(message, this.components);
                    break;
                }
            }
        }
        return replayNeeded;
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
