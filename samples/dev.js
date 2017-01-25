/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
// Debug in the console use by using document.getElementById('myScriptInkPaperDomElement')['data-myscript-ink-paper'].model
const myScriptInkPaperDomElement = document.getElementById('myScriptInkPaperDomElement');
const inkPaper = MyScript.register(myScriptInkPaperDomElement);

const modeleditor = new JSONEditor(document.getElementById('modeleditor'), { name: 'model', mode: 'form' });
const settingseditor = new JSONEditor(document.getElementById('settingseditor'), { name: 'options', mode: 'form' });
const undoRedoItemContent = new JSONEditor(document.getElementById('undoRedoItemContent'), { name: 'model', mode: 'view' });

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
const recognitionTypes = [
  { type: 'TEXT', protocols: ['REST', 'WEBSOCKET'], renderer: 'canvas', apiVersion: 'V3' },
  { type: 'MATH', protocols: ['REST', 'WEBSOCKET'], renderer: 'canvas', apiVersion: 'V3' },
  { type: 'SHAPE', protocols: ['REST'], renderer: 'canvas', apiVersion: 'V3' },
  { type: 'MUSIC', protocols: ['REST'], renderer: 'canvas', apiVersion: 'V3' },
  { type: 'ANALYZER', protocols: ['REST'], renderer: 'canvas', apiVersion: 'V3' }
];
const protocols = ['REST', 'WEBSOCKET'];
const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'util'];
const loggerConfig = MyScript.DebugConfig.loggerConfig;

function compactToString(model) {
  return model.creationTime + ' [' + model.rawStrokes.length + ']';
}

/** ===============================================================================================
 * Update configuration view
 * ============================================================================================= */
function updateConfiguration() {
  // Update current configuration view
  settingseditor.set(inkPaper.options);
  settingseditor.expandAll();

  // Update current recognition type
  recognitionTypes.forEach((recognitionType) => {
    const element = document.getElementById(recognitionType.type.toLowerCase() + 'Type');
    if (recognitionType.type === inkPaper.options.recognitionParams.type) {
      element.classList.add('active');
      document.getElementById('websocketProtocol').disabled = !(element.dataset.websocket);
      document.getElementById('restProtocol').disabled = !(element.dataset.rest);
    } else {
      element.classList.remove('active');
    }
  });

  // Update current protocol
  protocols.forEach((protocol) => {
    const element = document.getElementById(protocol.toLowerCase() + 'Protocol');
    if (protocol === inkPaper.options.recognitionParams.protocol) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  // Update current stroke style
  document.getElementById('colorStyle').value = inkPaper.customStyle.strokeStyle.color;
  document.getElementById('widthStyle').value = inkPaper.customStyle.strokeStyle.width;
}

/** ===============================================================================================
 * Build configuration view
 * ============================================================================================= */
function buildConfiguration() {
  // Build recognition type param view + attach handlers
  const recognitionTypesTemplate = document.getElementById('recognitionTypesTemplate');
  recognitionTypes.forEach((item) => {
    const clonedNode = recognitionTypesTemplate.content.cloneNode(true);
    const button = clonedNode.querySelector('button');
    button.id = item.type.toLowerCase() + 'Type';
    button.value = item.type;
    button.innerHTML = item.type.toLowerCase();
    button.dataset.renderer = item.renderer;
    button.dataset.apiVersion = item.apiVersion;
    item.protocols.forEach((protocol) => {
      button.dataset[protocol.toLowerCase()] = protocol;
    });
    button.addEventListener('pointerdown', (event) => {
      inkPaper.options.renderingParams.renderer = event.target.dataset.renderer;
      inkPaper.options.recognitionParams.type = event.target.value;
      inkPaper.options.recognitionParams.apiVersion = event.target.dataset.apiVersion;
      if (!event.target.dataset.websocket) {
        inkPaper.options.recognitionParams.protocol = 'REST';
        inkPaper.options.recognitionParams.recognitionTriggerOn = 'QUIET_PERIOD';
      } else {
        inkPaper.options.recognitionParams.protocol = 'WEBSOCKET';
        inkPaper.options.recognitionParams.recognitionTriggerOn = 'PEN_UP';
      }
      inkPaper.options = inkPaper.options;
      updateConfiguration();
    });
    recognitionTypesTemplate.parentNode.appendChild(clonedNode);
  });

  // Build protocol param view + attach handlers
  const protocolsTemplate = document.getElementById('protocolsTemplate');
  protocols.forEach((protocol) => {
    const clonedNode = protocolsTemplate.content.cloneNode(true);
    const button = clonedNode.querySelector('button');
    button.id = protocol.toLowerCase() + 'Protocol';
    button.value = protocol;
    button.innerHTML = protocol.toLowerCase();
    button.addEventListener('pointerdown', (event) => {
      inkPaper.options.recognitionParams.protocol = event.target.value;
      if (event.target.value === 'REST') {
        inkPaper.options.recognitionParams.recognitionTriggerOn = 'QUIET_PERIOD';
      } else {
        inkPaper.options.recognitionParams.recognitionTriggerOn = 'PEN_UP';
      }
      inkPaper.options = inkPaper.options;
      updateConfiguration();
    });
    protocolsTemplate.parentNode.appendChild(clonedNode);
  });

  // Build log settings view + attach handlers
  const loggersTemplate = document.getElementById('loggersTemplate');
  loggerList.forEach((logger) => {
    const loggerRef = logger;
    const clone = loggersTemplate.content.cloneNode(true);
    const labelName = clone.querySelector('.inputName');
    labelName.textContent = logger;

    const nodeList = clone.querySelectorAll('input[type=radio]');
    for (let i = 0; i < nodeList.length; i++) { // NodeList.forEach not supported by Firefox: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
      const inputReference = nodeList[i];
      inputReference.name = loggerRef;
      inputReference.parentNode.addEventListener('pointerdown', (event) => {
        loggerConfig[event.target.control.name + 'Logger'].setLevel(event.target.control.value);
      });
    }
    loggersTemplate.parentNode.appendChild(clone);
  });

  // Update view with default settings
  updateConfiguration();
}

buildConfiguration();

/** ===============================================================================================
 * Change options button
 * ============================================================================================= */
const updateStyleEventHandler = (event) => {
  inkPaper.customStyle.strokeStyle[event.target.name] = event.target.value;
  updateConfiguration();
};
document.getElementById('colorStyle').addEventListener('change', updateStyleEventHandler);
document.getElementById('widthStyle').addEventListener('change', updateStyleEventHandler);

const updateConfigurationEventHandler = (event) => {
  inkPaper.options = settingseditor.get();
  updateConfiguration();
};

function updateUndoRedoStack(context) {
  // Clear current undo/redo stack view
  const template = document.getElementById('undoRedoStackTemplate');
  const nodeList = template.parentNode.querySelectorAll('button');
  for (let i = 0; i < nodeList.length; i++) { // NodeList.forEach not supported by Firefox: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
    template.parentNode.removeChild(nodeList[i]);
  }

  // Re-build undo/redo stack view + attach handlers
  context.stack.forEach((stackItem, index) => {
    const stackElement = stackItem;
    const clone = template.content.cloneNode(true);
    const button = clone.querySelector('button');
    button.textContent = compactToString(stackElement);
    button.value = index;
    button.addEventListener('click', (event) => {
      undoRedoItemContent.set(context.stack[event.target.value]);
    });
    if (index === context.currentPosition) {
      button.classList.remove('btn-secondary');
      button.classList.add('btn-info');
    }
    template.parentNode.insertBefore(clone, template.parentNode.firstChild);
  });
  undoRedoItemContent.set(context.stack[context.currentPosition]);
}

function updateViewFromModel(model, updateUndoRedo) {
  // Update recognition result
  document.getElementById('lastRecognitionResult').innerHTML = model && model.rawResult ? new JSONFormatter().toHtml(model.rawResult.result) : '';
  if (updateUndoRedo) {
    // Update undo/redo stack view
    updateUndoRedoStack(inkPaper.undoRedoContext);
  }

  document.getElementById('clear').disabled = model ? !model.canClear : undefined;
  document.getElementById('undo').disabled = model ? !model.canUndo : undefined;
  document.getElementById('redo').disabled = model ? !model.canRedo : undefined;
  document.getElementById('undoRedoStackPosition').innerText = 'Position : ' + model ? model.currentPosition : undefined;
  document.getElementById('undoRedoCurrentModel').innerText = 'Current model : ' + model ? compactToString(model) : undefined;
  document.getElementById('lastModel').innerHTML = model ? new JSONFormatter().toHtml(model) : undefined;
  document.getElementById('lastModelStats').innerHTML = model ? new JSONFormatter().toHtml(inkPaper.stats) : undefined;

  if (model) {
    modeleditor.set(model);
  }
  inkPaper.resize();
}

function changeCallback() {
  // Update undo/redo stack view
  updateViewFromModel(inkPaper.model, true);
}

function resultCallback() {
  // Update undo/redo stack view
  updateViewFromModel(inkPaper.model, false);
}

updateViewFromModel(inkPaper.model);

document.getElementById('updateconfiguration').addEventListener('pointerdown', updateConfigurationEventHandler);

/** ===============================================================================================
 * Test logger button
 * ============================================================================================= */
document.getElementById('testLogs').addEventListener('click', () => {
  loggerList.forEach((logger) => {
    loggerConfig[logger + 'Logger'].debug(logger, 'DEBUG logger test');
    loggerConfig[logger + 'Logger'].info(logger, 'INFO logger test');
    loggerConfig[logger + 'Logger'].error(logger, 'ERROR logger test');
  });
});

/** ===============================================================================================
 * Update undo/redo
 * ============================================================================================= */

document.getElementById('undo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].undo();
});
document.getElementById('redo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].redo();
});
document.getElementById('clear').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].clear();
});

/** ===============================================================================================
 * Get image data
 * ============================================================================================= */
document.getElementById('getImageData').addEventListener('pointerdown', () => {
  window.open(myScriptInkPaperDomElement['data-myscript-ink-paper'].png);
});

/** ===============================================================================================
 * Ask for recognition
 * ============================================================================================= */
document.getElementById('recognize').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].askForRecognition();
});

/** ===============================================================================================
 * Update result
 * ============================================================================================= */
myScriptInkPaperDomElement.addEventListener('change', changeCallback);
myScriptInkPaperDomElement.addEventListener('result', resultCallback);

/** ===============================================================================================
 * Generic section
 * ============================================================================================= */
window.addEventListener('resize', () => {
  console.log('Resizing the window');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', () => {
  console.log('Resizing the window while changing tabs');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});

$('.nav-tabs a:first').tab('show');
