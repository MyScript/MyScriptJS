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
        this._instanceId = undefined;
        this.timerId = undefined;
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this.callback = callback;
        this.options = { // Default options
            type: 'TEXT',
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

        for (var i in options) {
            this.options[i] = options[i]; // Override options
        }

        // Capture
        var captureCanvas = _createCanvas(element);
        captureCanvas.id = 'ms-capture-canvas';
        captureCanvas.style.position = 'absolute';
        captureCanvas.style.zIndex = '2';
        this._inkGrabber = new scope.InkGrabber(captureCanvas.getContext('2d'));

        // Rendering
        var renderingCanvas = _createCanvas(element);
        renderingCanvas.id = 'ms-rendering-canvas';
        captureCanvas.style.position = 'absolute';
        renderingCanvas.style.zIndex = '1';
        this._textRenderer = new scope.TextRenderer(renderingCanvas.getContext('2d'));
        this._mathRenderer = new scope.MathRenderer(renderingCanvas.getContext('2d'));
        this._shapeRenderer = new scope.ShapeRenderer(renderingCanvas.getContext('2d'));
        this._musicRenderer = new scope.MusicRenderer(renderingCanvas.getContext('2d'));
        this._analyzerRenderer = new scope.AnalyzerRenderer(renderingCanvas.getContext('2d'));

        // Recognizers
        this._textRecognizer = new scope.TextRecognizer(this.options.url);
        this._mathRecognizer = new scope.MathRecognizer(this.options.url);
        this._shapeRecognizer = new scope.ShapeRecognizer(this.options.url);
        this._musicRecognizer = new scope.MusicRecognizer(this.options.url);
        this._analyzerRecognizer = new scope.AnalyzerRecognizer(this.options.url);

        this._typeChanged(this.options.type);
        this._attachListeners(element);
        this._initParameters(this.options);
        this._initRenderingCanvas();
    }

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
                this._selectedRecognizer.clearShapeRecognitionSession(this.options.applicationKey, this._instanceId);
                this._instanceId = undefined;
            }

            clearTimeout(this.timerId);
            if (this.options.timeout > 0) {
                this.timerId = setTimeout(this.recognize.bind(this), this.options.timeout);
            } else if (this.options.timeout > -1) {
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
                this._selectedRecognizer.clearShapeRecognitionSession(this.options.applicationKey, this._instanceId);
                this._instanceId = undefined;
            }

            clearTimeout(this.timerId);
            if (this.options.timeout > 0) {
                this.timerId = setTimeout(this.recognize.bind(this), this.options.timeout);
            } else if (this.options.timeout > -1) {
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
            this._selectedRecognizer.clearShapeRecognitionSession(this.options.applicationKey, this._instanceId);
        }
        this.components = [];
        this.redoComponents = [];
        this.lastNonRecoComponentIdx = 0;
        this._inkGrabber.clear();
        this._selectedRenderer.clear();
        this._instanceId = undefined;

        this._initRenderingCanvas();
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

        clearTimeout(this.timerId);
        if (this.options.timeout > 0) {
            this.timerId = setTimeout(this.recognize.bind(this), this.options.timeout);
        } else if (this.options.timeout > -1) {
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
                inputUnit.setComponents(this.options.components.concat(components));
                input = [inputUnit];
            } else if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                input = components.slice(this.lastNonRecoComponentIdx);
            } else {
                input = input.concat(this.options.components, components);
            }
            this._selectedRecognizer.doSimpleRecognition(
                this.options.applicationKey,
                this._instanceId,
                input,
                this.options.hmacKey
            ).then(
                function (data) {
                    if (!this._instanceId) {
                        this._instanceId = data.getInstanceId();
                    } else if (this._instanceId === data.getInstanceId()) {
                        this.callback(undefined, new Error('Wrong instance', data.getInstanceId()));
                    }

                    if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                        this.lastNonRecoComponentIdx = components.length;
                    }

                    if (this.options.renderInput || this.options.renderOuput) {
                        this._selectedRenderer.clear();

                        if (this.options.renderInput) {
                            this._initRenderingCanvas();
                        }

                        if (this.options.renderOuput) {
                            if (data instanceof scope.ShapeResult) {
                                this._selectedRenderer.drawRecognitionResult(components, data.getShapeDocument());
                            }
                            else if (data instanceof scope.AnalyzerResult) {
                                this._selectedRenderer.drawRecognitionResult(components, data.getAnalyzerDocument());
                            }
                        }

                    }
                    this.callback(data);
                }.bind(this),
                function (error) {
                    this.callback(undefined, error);
                }.bind(this)
            );
        } else {
            this._selectedRenderer.clear();
            this._initRenderingCanvas();
            this.callback();
        }
    };

    /**
     * Set recognition type
     *
     * @private
     * @param {'TEXT'|'MATH'|'SHAPE'|'ANALYZER'|'MUSIC'} type
     */
    InkPaper.prototype._typeChanged = function (type) {
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

    InkPaper.prototype._initParameters = function (options) {
        if (options.textParameters) {
            for (var i in options.textParameters) {
                this._textRecognizer.getParameters()[i] = options.textParameters[i]; // Override options
                this._analyzerRecognizer.getParameters().getTextParameters()[i] = options.textParameters[i]; // Override options
            }
        }
        if (options.mathParameters) {
            for (var j in options.mathParameters) {
                this._mathRecognizer.getParameters()[j] = options.mathParameters[j]; // Override options
            }
        }
        if (options.shapeParameters) {
            for (var k in options.shapeParameters) {
                this._shapeRecognizer.getParameters()[k] = options.shapeParameters[k]; // Override options
            }
        }
        if (options.musicParameters) {
            for (var l in options.musicParameters) {
                this._musicRecognizer.getParameters()[l] = options.musicParameters[l]; // Override options
            }
        }
        if (options.analyzerParameters) {
            for (var n in options.analyzerParameters) {
                this._analyzerRecognizer.getParameters()[n] = options.analyzerParameters[n]; // Override options
            }
        }
    };

    InkPaper.prototype._initRenderingCanvas = function () {
        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            } else {
                throw new Error('Missing music staff');
            }
        }
        this._selectedRenderer.drawComponents(this.options.components.concat(this.components));
    };

    /**
     * Tool to create canvas
     *
     * @private
     * @param {Element} parent
     * @returns {Element}
     */
    function _createCanvas(parent) {
        var canvas = document.createElement('canvas');
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        canvas.style.width = parent.style.width;
        canvas.style.height = parent.style.height;
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