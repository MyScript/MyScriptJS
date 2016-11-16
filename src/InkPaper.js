import { register } from './InkPaper2';

export class InkPaper {

  constructor(domElement, paperOptionsParam, callback) {
    this.domElement = domElement;
    this.inkPaper2 = register(domElement, paperOptionsParam);
    if (callback) {
      this.inkPaper2.callbacks.push(callback);
    }
  }

  getProtocol() {
    return this.inkPaper2.protocol;
  }

  setProtocol(protocol) {
    this.inkPaper2.protocol = protocol;
  }

  getType() {
    return this.inkPaper2.type;
  }

  setType(type) {
    this.inkPaper2.type = type;
  }

  // getTimeout() {
  //   // TODO
  // }
  //
  // setTimeout(timeout) {
  //   // TODO
  // }
  //
  // getComponents() {
  //   // TODO
  // }
  //
  // setComponents(components) {
  //   // TODO
  // }

  getApplicationKey() {
    return this.inkPaper2.paperOptions.recognitionParams.server.applicationKey;
  }

  setApplicationKey(applicationKey) {
    this.inkPaper2.paperOptions.recognitionParams.server.applicationKey = applicationKey;
  }

  getHmacKey() {
    return this.inkPaper2.paperOptions.recognitionParams.server.hmacKey;
  }

  setHmacKey(hmacKey) {
    this.inkPaper2.paperOptions.recognitionParams.server.hmacKey = hmacKey;
  }

  getTextParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.textParameter;
  }

  setTextParameters(textParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.textParameter;
    Object.assign(param, textParameters);
  }

  getMathParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.mathParameter;
  }

  setMathParameters(mathParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.mathParameter;
    Object.assign(param, mathParameters);
  }

  getShapeParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.shapeParameter;
  }

  setShapeParameters(shapeParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.shapeParameter;
    Object.assign(param, shapeParameters);
  }

  getMusicParameters() {
    return this.inkPaper2.paperOptions.recognitionParams.musicParameter;
  }

  setMusicParameters(musicParameters) {
    const param = this.inkPaper2.paperOptions.recognitionParams.musicParameter;
    Object.assign(param, musicParameters);
  }

  getAnalyzerParameters() {
    // FIXME
    return { textParameter: () => this.getTextParameters() };
  }

  setAnalyzerParameters(analyzerParameters) {
    // FIXME
    this.setTextParameters(analyzerParameters.textParameter);
  }

  getPenParameters() {
    return this.inkPaper2.paperOptions.renderingParams.strokeStyle;
  }

  setPenParameters(penParameters) {
    const strokeStyle = this.inkPaper2.paperOptions.renderingParams.strokeStyle;
    Object.assign(strokeStyle, penParameters);
  }

  setHost(host) {
    this.inkPaper2.paperOptions.recognitionParams.server.host = host;
  }

  setSSL(ssl) {
    this.inkPaper2.paperOptions.recognitionParams.server.scheme = ssl ? 'https' : 'http';
  }

  getStats() {
    this.inkPaper2.getStats();
  }

  // // @deprecated Useless
  // setPrecision(precision) {
  //   // TODO
  // }
  //
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
    if (changeCallback) {
      this.inkPaper2.callbacks.push(changeCallback);
    }
  }

  setResultCallback(resultCallback) {
    if (resultCallback) {
      this.inkPaper2.callbacks.push(resultCallback);
    }
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
    return this.canRedo();
  }

  redo() {
    this.inkPaper2.redo();
  }

  clear() {
    this.inkPaper2.clear();
  }

}
