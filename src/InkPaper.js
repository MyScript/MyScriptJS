import { register } from './InkPaper2';

export class InkPaper {

  constructor(domElement, paperOptionsParam) {
    this.domElement = domElement;
    this.inkPaper2 = register(domElement);
    // Override default parameters using es6 accessors
    Object.assign(this, paperOptionsParam);

    const inkPaper1Ref = this;
    // Callback adapter to throw proper inkPaper events
    const mainCallback = (data) => {
      if (data.state === 'RECOGNITION ERROR') {
        if (inkPaper1Ref.resultCallback) {
          inkPaper1Ref.resultCallback(undefined, data.rawResult);
        }
        if (inkPaper1Ref.changeCallback) {
          inkPaper1Ref.changeCallback(undefined, data.rawResult);
        }
        // We are making usage of a browser provided class
        // eslint-disable-next-line no-undef
        this.domElement.dispatchEvent(new CustomEvent('error', { detail: data.rawResult }));
      } else {
        if (inkPaper1Ref.resultCallback) {
          inkPaper1Ref.resultCallback(data.rawResult);
        }
        // We are making usage of a browser provided class
        // eslint-disable-next-line no-undef
        this.domElement.dispatchEvent(new CustomEvent('success', { detail: data.rawResult }));

        const changeData = {
          canClear: data.undoRedoStackLength > 0,
          canUndo: data.undoRedoPosition > 0,
          canRedo: data.undoRedoPosition < (data.undoRedoStackLength - 1)
        };
        if (inkPaper1Ref.changeCallback) {
          inkPaper1Ref.changeCallback(changeData);
        }
        // We are making usage of a browser provided class
        // eslint-disable-next-line no-undef
        this.domElement.dispatchEvent(new CustomEvent('changed', { detail: changeData }));
      }
    };

    this.inkPaper2.callbacks = [mainCallback];
  }

  get protocol() {
    return this.inkPaper2.protocol;
  }

  set protocol(protocol) {
    this.inkPaper2.protocol = protocol;
  }

  get type() {
    return this.inkPaper2.type;
  }

  set type(type) {
    this.inkPaper2.type = type;
  }

  get applicationKey() {
    return this.inkPaper2.paperOptions.recognitionParams.server.applicationKey;
  }

  set applicationKey(applicationKey) {
    this.inkPaper2.paperOptions.recognitionParams.server.applicationKey = applicationKey;
  }

  get hmacKey() {
    return this.inkPaper2.paperOptions.recognitionParams.server.hmacKey;
  }

  set hmacKey(hmacKey) {
    this.inkPaper2.paperOptions.recognitionParams.server.hmacKey = hmacKey;
  }

  get textParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.textParameter;
  }

  set textParameters(textParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.textParameter;
    Object.assign(param, textParameters);
  }

  get mathParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.mathParameter;
  }

  set mathParameters(mathParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.mathParameter;
    Object.assign(param, mathParameters);
  }

  get shapeParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.shapeParameter;
  }

  set shapeParameters(shapeParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.shapeParameter;
    Object.assign(param, shapeParameters);
  }

  get musicParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.musicParameter;
  }

  set musicParameters(musicParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.musicParameter;
    Object.assign(param, musicParameters);
  }

  get analyzerParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.analyzerParameter;
  }

  set analyzerParameters(analyzerParameters) {
    if (analyzerParameters) {
      const param = this.inkPaper2.paperOptions.recognitionParams.analyzerParameter;
      Object.assign(param, analyzerParameters);
    }
  }

  get penParameters() {
    return this.inkPaper2.paperOptions.renderingParams.strokeStyle;
  }

  set penParameters(penParameters) {
    const strokeStyle = this.inkPaper2.paperOptions.renderingParams.strokeStyle;
    Object.assign(strokeStyle, penParameters);
  }

  set host(host) {
    this.inkPaper2.paperOptions.recognitionParams.server.host = host;
  }

  set ssl(ssl) {
    this.inkPaper2.paperOptions.recognitionParams.server.scheme = ssl ? 'https' : 'http';
  }

  get timeout() {
    return this.inkPaper2.triggerRecognitionQuietPeriod;
  }

  set timeout(timeout) {
    this.inkPaper2.triggerRecognitionQuietPeriod = timeout;
  }

  set precision(precision) {
    this.inkPaper2.xyFloatPrecision = precision;
    this.inkPaper2.timestampFloatPrecision = precision;
  }

  set resultCallback(resultCallback) {
    this.innerResultCallback = resultCallback;
  }

  get resultCallback() {
    return this.innerResultCallback;
  }

  set changeCallback(changeCallback) {
    this.innerChangeCallback = changeCallback;
  }

  get changeCallback() {
    return this.innerChangeCallback;
  }

  /** ===============================================================================================
   * Wrappers around legacy accessors
   * ============================================================================================= */

  getProtocol() {
    return this.protocol;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getApplicationKey() {
    return this.applicationKey;
  }

  setApplicationKey(applicationKey) {
    this.applicationKey = applicationKey;
  }

  getHmacKey() {
    return this.hmacKey;
  }

  setHmacKey(hmacKey) {
    this.hmacKey = hmacKey;
  }

  getTextParameters() {
    return this.textParameters;
  }

  setTextParameters(textParameters) {
    this.textParameters = textParameters;
  }

  getMathParameters() {
    return this.mathParameters;
  }

  setMathParameters(mathParameters) {
    this.mathParameters = mathParameters;
  }

  getShapeParameters() {
    return this.shapeParameters;
  }

  setShapeParameters(shapeParameters) {
    this.shapeParameters = shapeParameters;
  }

  getMusicParameters() {
    return this.musicParameters;
  }

  setMusicParameters(musicParameters) {
    this.musicParameters = musicParameters;
  }

  getAnalyzerParameters() {
    return this.analyzerParameters;
  }

  setAnalyzerParameters(analyzerParameters) {
    this.analyzerParameters = analyzerParameters;
  }

  getPenParameters() {
    return this.penParameters;
  }

  setPenParameters(penParameters) {
    this.penParameters = penParameters;
  }

  setHost(host) {
    this.host = host;
  }

  setSSL(ssl) {
    this.ssl = ssl;
  }

  getTimeout() {
    return this.timeout;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
  }

  setPrecision(precision) {
    this.precision = precision;
  }

  // getComponents() {
  //   // TODO
  // }
  //
  // setComponents(components) {
  //   // TODO
  // }

  getStats() {
    this.inkPaper2.getStats();
  }

  // // @deprecated Useless (true by default)
  // setTypeset(typeset) {
  //   // TODO
  // }

  // // @deprecated
  // getAvailableLanguages(inputMode) {
  //
  // }

  // // @deprecated
  // getRenderer() {
  //   // TODO
  // }
  //
  // // @deprecated
  // getInkGrabber() {
  //   // TODO
  // }

  getRecognizer() {
    return this.inkPaper2.recognizer;
  }

  setChangeCallback(changeCallback) {
    this.changeCallback = changeCallback;
  }

  setResultCallback(resultCallback) {
    this.resultCallback = resultCallback;
  }

  recognize() {
    this.inkPaper2.askForRecognition();
  }

  canUndo() {
    return this.inkPaper2.canUndo();
  }

  undo() {
    this.inkPaper2.undo();
  }

  canRedo() {
    return this.inkPaper2.canRedo();
  }

  redo() {
    this.inkPaper2.redo();
  }

  clear() {
    this.inkPaper2.clear();
  }

}
