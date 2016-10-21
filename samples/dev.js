/* eslint-disable no-undef */
const myScriptInkPaperDomElement = document.querySelector('#myScriptInkPaperDomElement');
const inkPaper = MyScript.register(myScriptInkPaperDomElement);

const unpdateUndoRedoStack = () => {
  const template = document.querySelector('#undoredoStackElementTemplate');
  template.parentNode.querySelectorAll('.undoRedoButton').forEach((elem) => {
    template.parentNode.removeChild(elem);
  });
  const addItem = (iStackElement, idx) => {
    const stackElement = iStackElement;
    const clone = template.content.cloneNode(true);
    const undoRedoButton = clone.querySelector('button');

    undoRedoButton.textContent = MyScript.DebugConfig.InkModel.compactToString(iStackElement);
    clone.querySelector('button').addEventListener('click', () => {
      document.querySelector('#undoRedoElementDetail').innerHTML = '';
      const jsoneditor = new JSONEditor(document.querySelector('#undoRedoElementDetail'), {});
      jsoneditor.set(stackElement);
    });
    undoRedoButton.classList.add('undoRedoButton');
    if (idx === inkPaper.undoRedoManager.currentPosition) {
      undoRedoButton.classList.remove('btn-secondary');
      undoRedoButton.classList.add('btn-info');
    }
    template.parentNode.insertBefore(clone, template.parentNode.firstChild);
  };

  inkPaper.undoRedoManager.stack.forEach((iStackElement, idx) => {
    addItem(iStackElement, idx);
  });
  document.querySelector('#undoRedoStackPosition').innerText = 'Position : ' + inkPaper.undoRedoManager.currentPosition;
  document.querySelector('#undoRedoCurrentModel').innerText = 'Current model : ' + MyScript.DebugConfig.InkModel.compactToString(inkPaper.model);
};

myScriptInkPaperDomElement.addEventListener('success', (successEvent) => {
  console.log(successEvent);
  if (successEvent.detail.rawResult) {
    document.getElementById('lastRecognitionResult').innerHTML = new JSONFormatter().toHtml(successEvent.detail.rawResult.result);
  }
});

// Update undo/redo stack when required.
myScriptInkPaperDomElement.addEventListener('undoredoupdated', (successEvent) => {
  unpdateUndoRedoStack();
  document.getElementById('lastModel').innerHTML = new JSONFormatter().toHtml(inkPaper.model);
  document.getElementById('lastModelStats').innerHTML = new JSONFormatter().toHtml(inkPaper.getStats());

  // create the editor
  const jsoneditorElement = document.getElementById('jsoneditor');
  jsoneditorElement.innerHTML = '';
  const jsoneditor = new JSONEditor(jsoneditorElement, {});
  jsoneditor.set(inkPaper.model);
  inkPaper.resize();
});

$('.nav-tabs a:first').tab('show');

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
const recoTypes = [{ type: 'math', ws: true }, { type: 'text', ws: true }, { type: 'shape', ws: false }, { type: 'analyzer', ws: false }, { type: 'music', ws: false }];
const protocolesTypes = ['rest', 'websocket'];

function updateConfiguration() {
  document.querySelector('#inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);
  recoTypes.forEach((subId) => {
    const elemClass = document.querySelector('#' + subId.type + 'Mode').classList;
    if (inkPaper.type && subId.type.toUpperCase() === inkPaper.type.toUpperCase()) {
      elemClass.add('active');
      if (subId.ws && subId.ws === true) {
        document.querySelector('#websocketMode').removeAttribute('disabled');
      } else {
        document.querySelector('#websocketMode').setAttribute('disabled', true);
      }
    } else {
      elemClass.remove('active');
    }
  });

  protocolesTypes.forEach((id) => {
    const elemClass = document.querySelector('#' + id + 'Mode').classList;
    if (inkPaper.protocol && id.toUpperCase() === inkPaper.protocol.toUpperCase()) {
      elemClass.add('active');
    } else {
      elemClass.remove('active');
    }
  });
}
updateConfiguration();


/** ===============================================================================================
 * Change recognition type buttons
 * ============================================================================================= */


const mathModeButton = document.querySelector('#mathMode');
mathModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.type = 'MATH';
  updateConfiguration();
});

const textModeButton = document.querySelector('#textMode');
textModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.type = 'TEXT';
  updateConfiguration();
});

const shapeModeButton = document.querySelector('#shapeMode');
shapeModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.type = 'SHAPE';
  updateConfiguration();
});

const analyzerModeButton = document.querySelector('#analyzerMode');
analyzerModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.type = 'ANALYZER';
  updateConfiguration();
});

const musicModeButton = document.querySelector('#musicMode');
musicModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.type = 'MUSIC';
  updateConfiguration();
});

/** ===============================================================================================
 * Change protocol buttons
 * ============================================================================================= */
const restButton = document.querySelector('#restMode');
restButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.protocol = 'REST';
  updateConfiguration();
});

const wsButton = document.querySelector('#websocketMode');
wsButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.protocol = 'WebSocket';
  updateConfiguration();
});

/** ===============================================================================================
 * Change brush buttons
 * ============================================================================================= */
document.querySelector('#color').addEventListener('change', (pointerDownEvent) => {
  inkPaper.paperOptions.renderingParams.strokeStyle.color = pointerDownEvent.target.value;
  updateConfiguration();
});
document.querySelector('#width').addEventListener('change', (pointerDownEvent) => {
  inkPaper.paperOptions.renderingParams.strokeStyle.width = pointerDownEvent.target.value;
  updateConfiguration();
});

/** ===============================================================================================
 * Undo redo buttons
 * ============================================================================================= */
const myScriptUndoDomElement = document.querySelector('#undo');
myScriptUndoDomElement.addEventListener('pointerdown', (pointerDownEvent) => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].undo();
});

const myScriptRedoDomElement = document.querySelector('#redo');
myScriptRedoDomElement.addEventListener('pointerdown', (pointerDownEvent) => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].redo();
});

const myScriptClearDomElement = document.querySelector('#clear');
myScriptClearDomElement.addEventListener('pointerdown', (pointerDownEvent) => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].clear();
});
window.addEventListener('resize', (event) => {
  console.log('Resizing the window');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  console.log('Resizing the window while changing tabs');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});


document.querySelector('#updateconfiguration').addEventListener('click', () => {
  const newConfiguration = document.querySelector('#inkpaperConfiguration').innerHTML;
  inkPaper.paperOptions = JSON.parse(newConfiguration);
  updateConfiguration();
});
// TO debug in the console use document.querySelector('#myScriptInkPaperDomElement')['data-myscript-ink-paper'].model


/** ===============================================================================================
 * Logger section
 * ============================================================================================= */
const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'util'];
const template = document.querySelector('#logtemplate');
const loggerConfig = MyScript.DebugConfig.loggerConfig;
const changeLogLevel = function (logger, level) {
  loggerConfig[logger + 'Logger'].setLevel(level);
};
loggerList.forEach((i) => {
  const logger = i;
  const clone = template.content.cloneNode(true);
  const labelName = clone.querySelector('.inputName');
  labelName.textContent = i;
  clone.querySelector('.debugButton').parentNode.addEventListener('click', () => {
    changeLogLevel(logger, 'DEBUG');
  });
  clone.querySelector('.infoButton').parentNode.addEventListener('click', () => {
    changeLogLevel(logger, 'INFO');
  });
  clone.querySelector('.errorButton').parentNode.addEventListener('click', () => {
    changeLogLevel(logger, 'ERROR');
  });
  template.parentNode.appendChild(clone);
});
document.querySelector('#testLogs').onclick = () => {
  loggerList.forEach((logger) => {
    loggerConfig[logger + 'Logger'].debug(logger, 'DEBUG');
    loggerConfig[logger + 'Logger'].info(logger, 'INFO');
    loggerConfig[logger + 'Logger'].error(logger, 'ERROR');
  });
};

/* eslint-enable no-undef */
