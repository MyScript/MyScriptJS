/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
// Debug in the console use by using document.getElementById('myScriptEditorDomElement')['data-myscript-editor'].model
const myScriptEditorDomElement = document.getElementById('myScriptEditorDomElement');
const editor = MyScript.register(myScriptEditorDomElement);

const modeleditor = new JSONEditor(document.getElementById('modeleditor'), { name: 'model', mode: 'form' });
const settingseditor = new JSONEditor(document.getElementById('settingseditor'), { name: 'configuration', mode: 'form' });
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
const loggerList = ['grabber', 'editor', 'renderer', 'model', 'recognizer', 'util'];
const loggerConfig = MyScript.DebugConfig.loggerConfig;

function compactToString(model) {
  return model.creationTime + ' [' + model.rawStrokes.length + ']';
}

/** ===============================================================================================
 * Update configuration view
 * ============================================================================================= */
function updateConfiguration() {
  // Update current configuration view
  settingseditor.set(editor.configuration);
  settingseditor.expandAll();

  // Update current recognition type
  recognitionTypes.forEach((recognitionType) => {
    const element = document.getElementById(recognitionType.type.toLowerCase() + 'Type');
    if (recognitionType.type === editor.configuration.recognitionParams.type) {
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
    if (protocol === editor.configuration.recognitionParams.protocol) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  // Update current stroke style
  document.getElementById('colorStyle').value = editor.customStyle.strokeStyle.color;
  document.getElementById('widthStyle').value = editor.customStyle.strokeStyle.width;
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
      editor.configuration.renderingParams.renderer = event.target.dataset.renderer;
      editor.configuration.recognitionParams.type = event.target.value;
      editor.configuration.recognitionParams.apiVersion = event.target.dataset.apiVersion;
      if (!event.target.dataset.websocket) {
        editor.configuration.recognitionParams.protocol = 'REST';
        editor.configuration.recognitionTriggerOn = 'QUIET_PERIOD';
      } else {
        editor.configuration.recognitionParams.protocol = 'WEBSOCKET';
        editor.configuration.recognitionTriggerOn = 'POINTER_UP';
      }
      editor.configuration = editor.configuration;
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
      editor.configuration.recognitionParams.protocol = event.target.value;
      if (event.target.value === 'REST') {
        editor.configuration.recognitionTriggerOn = 'QUIET_PERIOD';
      } else {
        editor.configuration.recognitionTriggerOn = 'POINTER_UP';
      }
      editor.configuration = editor.configuration;
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
 * Change configuration button
 * ============================================================================================= */
const updateStyleEventHandler = (event) => {
  editor.customStyle.strokeStyle[event.target.name] = event.target.value;
  updateConfiguration();
};
document.getElementById('colorStyle').addEventListener('change', updateStyleEventHandler);
document.getElementById('widthStyle').addEventListener('change', updateStyleEventHandler);

const updateConfigurationEventHandler = (event) => {
  editor.configuration = settingseditor.get();
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
    updateUndoRedoStack(editor.undoRedoContext);
  }
  document.getElementById('undoRedoStackPosition').innerText = 'Position : ' + model ? model.currentPosition : undefined;
  document.getElementById('undoRedoCurrentModel').innerText = 'Current model : ' + model ? compactToString(model) : undefined;
  document.getElementById('lastModel').innerHTML = model ? new JSONFormatter().toHtml(model) : undefined;
  document.getElementById('lastModelStats').innerHTML = model ? new JSONFormatter().toHtml(editor.stats) : undefined;

  if (model) {
    modeleditor.set(model);
  }
  editor.resize();
}

function changeCallback(e) {
  document.getElementById('clear').disabled = !e.detail.canClear;
  document.getElementById('undo').disabled = !e.detail.canUndo;
  document.getElementById('redo').disabled = !e.detail.canRedo;
  // Update undo/redo stack view
  updateViewFromModel(editor.model, true);
}

function resultCallback(e) {
  // Update undo/redo stack view
  updateViewFromModel(editor.model, false);
}

updateViewFromModel(editor.model);

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
  myScriptEditorDomElement['data-myscript-editor'].undo();
});
document.getElementById('redo').addEventListener('pointerdown', () => {
  myScriptEditorDomElement['data-myscript-editor'].redo();
});
document.getElementById('clear').addEventListener('pointerdown', () => {
  myScriptEditorDomElement['data-myscript-editor'].clear();
});

/** ===============================================================================================
 * Get image data
 * ============================================================================================= */
document.getElementById('getImageData').addEventListener('pointerdown', () => {
  window.open(myScriptEditorDomElement['data-myscript-editor'].png);
});

/** ===============================================================================================
 * Ask for recognition
 * ============================================================================================= */
document.getElementById('recognize').addEventListener('pointerdown', () => {
  myScriptEditorDomElement['data-myscript-editor'].askForRecognition();
});

/** ===============================================================================================
 * Update result
 * ============================================================================================= */
myScriptEditorDomElement.addEventListener('change', changeCallback);
myScriptEditorDomElement.addEventListener('result', resultCallback);

/** ===============================================================================================
 * Generic section
 * ============================================================================================= */
window.addEventListener('resize', () => {
  console.log('Resizing the window');
  myScriptEditorDomElement['data-myscript-editor'].resize();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', () => {
  console.log('Resizing the window while changing tabs');
  myScriptEditorDomElement['data-myscript-editor'].resize();
});

$('.nav-tabs a:first').tab('show');
