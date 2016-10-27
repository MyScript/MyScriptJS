/* global window, document, $, MyScript, JSONEditor, JSONFormatter */

const myScriptInkPaperDomElement = document.querySelector('#myScriptInkPaperDomElement');
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
  document.querySelector('#inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);

  // Update current recognition type
  recognitionTypes.forEach((recognitionType) => {
    const element = document.querySelector('#' + recognitionType.type.toLowerCase() + 'Type');
    if (inkPaper.type && (recognitionType.type === inkPaper.type)) {
      element.classList.add('active');
      const protocolElement = document.querySelector('#websocketProtocol');
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
    const element = document.querySelector('#' + protocol.toLowerCase() + 'Protocol');
    if (inkPaper.protocol && (protocol === inkPaper.protocol)) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  // Update current stroke style
  Object.keys(inkPaper.paperOptions.renderingParams.strokeStyle).forEach((style) => {
    document.querySelector('#' + style.toLowerCase() + 'Style').value = inkPaper.paperOptions.renderingParams.strokeStyle[style];
  });
}

/** ===============================================================================================
 * Build configuration view
 * ============================================================================================= */
function buildConfiguration() {
  // Build recognition type param view + attach handlers
  const recognitionTypesTemplate = document.querySelector('#recognitionTypesTemplate');
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
  const protocolsTemplate = document.querySelector('#protocolsTemplate');
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
  const loggersTemplate = document.querySelector('#loggersTemplate');
  loggerList.forEach((i) => {
    const logger = i;
    const clone = loggersTemplate.content.cloneNode(true);
    const labelName = clone.querySelector('.inputName');
    labelName.textContent = i;

    clone.querySelectorAll('input[type=radio]').forEach((input) => {
      const inputReference = input;
      inputReference.name = logger;
      input.parentNode.addEventListener('pointerdown', (event) => {
        loggerConfig[event.target.control.name + 'Logger'].setLevel(event.target.control.value);
      });
    });
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
document.querySelector('#colorStyle').addEventListener('change', updateStyleEventHandler);
document.querySelector('#widthStyle').addEventListener('change', updateStyleEventHandler);

const updateConfigurationEventHandler = (event) => {
  const configuration = document.querySelector('#inkpaperConfiguration').value;
  inkPaper.paperOptions = JSON.parse(configuration);
  updateConfiguration();
};
document.querySelector('#updateconfiguration').addEventListener('pointerdown', updateConfigurationEventHandler);

/** ===============================================================================================
 * Test logger button
 * ============================================================================================= */
document.querySelector('#testLogs').addEventListener('click', () => {
  loggerList.forEach((logger) => {
    loggerConfig[logger + 'Logger'].debug(logger, 'DEBUG logger test');
    loggerConfig[logger + 'Logger'].info(logger, 'INFO logger test');
    loggerConfig[logger + 'Logger'].error(logger, 'ERROR logger test');
  });
});

/** ===============================================================================================
 * Update undo/redo
 * ============================================================================================= */
const updateUndoRedoStackEventHandler = () => {
  // Clear current undo/redo stack view
  const undoRedoStackTemplate = document.querySelector('#undoRedoStackTemplate');
  undoRedoStackTemplate.parentNode.querySelectorAll('button').forEach((elem) => {
    undoRedoStackTemplate.parentNode.removeChild(elem);
  });

  // Re-build undo/redo stack view + attach handlers
  inkPaper.undoRedoManager.stack.forEach((undoRedoStackElement, index) => {
    const stackElement = undoRedoStackElement;
    const clone = undoRedoStackTemplate.content.cloneNode(true);
    const button = clone.querySelector('button');
    button.textContent = MyScript.DebugConfig.InkModel.compactToString(stackElement);
    button.value = index;
    button.addEventListener('click', (event) => {
      const contentElement = document.querySelector('#undoRedoItemContent');
      contentElement.innerHTML = '';
      new JSONEditor(contentElement, {}).set(inkPaper.undoRedoManager.stack[event.target.value]);
    });
    if (index === inkPaper.undoRedoManager.currentPosition) {
      button.classList.remove('btn-secondary');
      button.classList.add('btn-info');
    }
    undoRedoStackTemplate.parentNode.insertBefore(clone, undoRedoStackTemplate.parentNode.firstChild);
  });

  document.querySelector('#undoRedoStackPosition').innerText = 'Position : ' + inkPaper.undoRedoManager.currentPosition;
  document.querySelector('#undoRedoCurrentModel').innerText = 'Current model : ' + MyScript.DebugConfig.InkModel.compactToString(inkPaper.model);
  document.querySelector('#lastModel').innerHTML = new JSONFormatter().toHtml(inkPaper.model);
  document.querySelector('#lastModelStats').innerHTML = new JSONFormatter().toHtml(inkPaper.getStats());

  // create the editor
  document.querySelector('#modeleditor').innerHTML = '';
  new JSONEditor(document.querySelector('#modeleditor'), {}).set(inkPaper.model);
  inkPaper.resize();
};
myScriptInkPaperDomElement.addEventListener('undoredoupdated', updateUndoRedoStackEventHandler);


document.querySelector('#undo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].undo();
});
document.querySelector('#redo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].redo();
});
document.querySelector('#clear').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].clear();
});

/** ===============================================================================================
 * Update result
 * ============================================================================================= */
myScriptInkPaperDomElement.addEventListener('success', (event) => {
  if (event.detail.rawResult) {
    document.querySelector('#lastRecognitionResult').innerHTML = new JSONFormatter().toHtml(event.detail.rawResult.result);
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

// TODO debug in the console use document.querySelector('#myScriptInkPaperDomElement')['data-myscript-ink-paper'].model
