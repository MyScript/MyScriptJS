/* global window, document, $, MyScript, JSONEditor, JSONFormatter */

const myScriptInkPaperDomElement = document.getElementById('myScriptInkPaperDomElement');
const inkPaper = MyScript.register(myScriptInkPaperDomElement);

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
const recognitionTypes = [{ type: 'TEXT', ws: true }, { type: 'MATH', ws: true }, { type: 'SHAPE', ws: false }, { type: 'MUSIC', ws: false }, { type: 'ANALYZER', ws: false }];
const protocols = ['REST', 'WebSocket'];
const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'util'];
const loggerConfig = MyScript.DebugConfig.loggerConfig;

/** ===============================================================================================
 * Update configuration view
 * ============================================================================================= */
function updateConfiguration() {
  // Update current configuration view
  document.getElementById('inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);

  // Update current recognition type
  recognitionTypes.forEach((recognitionType) => {
    const element = document.getElementById(recognitionType.type.toLowerCase() + 'Type');
    if (inkPaper.type && (recognitionType.type === inkPaper.type)) {
      element.classList.add('active');
      const protocolElement = document.getElementById('websocketProtocol');
      if (element.dataset.ws === 'true') {
        protocolElement.removeAttribute('disabled');
      } else {
        protocolElement.setAttribute('disabled', true);
      }
    } else {
      element.classList.remove('active');
    }
  });

  // Update current protocol
  protocols.forEach((protocol) => {
    const element = document.getElementById(protocol.toLowerCase() + 'Protocol');
    if (inkPaper.protocol && (protocol === inkPaper.protocol)) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  // Update current stroke style
  Object.keys(inkPaper.paperOptions.renderingParams.strokeStyle).forEach((style) => {
    document.getElementById(style.toLowerCase() + 'Style').value = inkPaper.paperOptions.renderingParams.strokeStyle[style];
  });
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
    button.dataset.ws = item.ws;
    button.addEventListener('pointerdown', (event) => {
      inkPaper.type = event.target.value;
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
      inkPaper.protocol = event.target.value;
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
 * Change paperOptions button
 * ============================================================================================= */
const updateStyleEventHandler = (event) => {
  inkPaper.paperOptions.renderingParams.strokeStyle[event.target.name] = event.target.value;
  updateConfiguration();
};
document.getElementById('colorStyle').addEventListener('change', updateStyleEventHandler);
document.getElementById('widthStyle').addEventListener('change', updateStyleEventHandler);

const updateConfigurationEventHandler = (event) => {
  const configuration = document.getElementById('inkpaperConfiguration').value;
  inkPaper.paperOptions = JSON.parse(configuration);
  updateConfiguration();
};
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
function updateUndoRedoStackFromManager(manager) {
  // Clear current undo/redo stack view
  const template = document.getElementById('undoRedoStackTemplate');
  const nodeList = template.parentNode.querySelectorAll('button');
  for (let i = 0; i < nodeList.length; i++) { // NodeList.forEach not supported by Firefox: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
    template.parentNode.removeChild(nodeList[i]);
  }

  // Re-build undo/redo stack view + attach handlers
  manager.stack.forEach((stackItem, index) => {
    const stackElement = stackItem;
    const clone = template.content.cloneNode(true);
    const button = clone.querySelector('button');
    button.textContent = MyScript.DebugConfig.InkModel.compactToString(stackElement);
    button.value = index;
    button.addEventListener('click', (event) => {
      const contentElement = document.getElementById('undoRedoItemContent');
      contentElement.innerHTML = '';
      new JSONEditor(contentElement, {}).set(manager.stack[event.target.value]);
    });
    if (index === manager.currentPosition) {
      button.classList.remove('btn-secondary');
      button.classList.add('btn-info');
    }
    template.parentNode.insertBefore(clone, template.parentNode.firstChild);
  });
}

function updateViewFromModel(model) {
  // Update recognition result
  document.getElementById('lastRecognitionResult').innerHTML = model && model.rawResult ? new JSONFormatter().toHtml(model.rawResult.result) : '';
  // Update undo/redo stack view
  updateUndoRedoStackFromManager(inkPaper.undoRedoManager);

  document.getElementById('undoRedoStackPosition').innerText = 'Position : ' + model ? model.currentPosition : undefined;
  document.getElementById('undoRedoCurrentModel').innerText = 'Current model : ' + model ? MyScript.DebugConfig.InkModel.compactToString(model) : undefined;
  document.getElementById('lastModel').innerHTML = model ? new JSONFormatter().toHtml(model) : undefined;
  document.getElementById('lastModelStats').innerHTML = model ? new JSONFormatter().toHtml(inkPaper.getStats()) : undefined;

  // create the editor
  document.getElementById('modeleditor').innerHTML = '';
  if (model) {
    new JSONEditor(document.getElementById('modeleditor'), {}).set(model);
  }
  inkPaper.resize();
}
updateViewFromModel(inkPaper.model);

myScriptInkPaperDomElement.addEventListener('undoredoupdated', (e) => {

  const undoElement = document.getElementById('undo');
  if (e.detail.undoRedoPosition > 0) {
    undoElement.removeAttribute('disabled');
  } else {
    undoElement.setAttribute('disabled', true);
  }

  const redoElement = document.getElementById('redo');
  if (e.detail.undoRedoPosition < (e.detail.undoRedoStackLength - 1)) {
    redoElement.removeAttribute('disabled');
  } else {
    redoElement.setAttribute('disabled', true);
  }
  updateViewFromModel(inkPaper.model);
});


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
 * Update result
 * ============================================================================================= */
myScriptInkPaperDomElement.addEventListener('success', (event) => {
  if (event.detail) {
    updateViewFromModel(event.detail);
  }
});

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

// TODO debug in the console use document.getElementById('myScriptInkPaperDomElement')['data-myscript-ink-paper'].model
