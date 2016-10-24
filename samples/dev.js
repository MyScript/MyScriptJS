/* global window, document, $, MyScript, JSONEditor, JSONFormatter */

const myScriptInkPaperDomElement = document.querySelector('#myScriptInkPaperDomElement');
const inkPaper = MyScript.register(myScriptInkPaperDomElement);

const updateUndoRedoStack = () => {
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

myScriptInkPaperDomElement.addEventListener('success', (e) => {
  console.log(e);
  if (e.detail.rawResult) {
    document.querySelector('#lastRecognitionResult').innerHTML = new JSONFormatter().toHtml(e.detail.rawResult.result);
  }
});

// Update undo/redo stack when required.
myScriptInkPaperDomElement.addEventListener('undoredoupdated', () => {
  updateUndoRedoStack();
  document.querySelector('#lastModel').innerHTML = new JSONFormatter().toHtml(inkPaper.model);
  document.querySelector('#lastModelStats').innerHTML = new JSONFormatter().toHtml(inkPaper.getStats());

  // create the editor
  const jsonEditorElement = document.querySelector('#jsoneditor');
  jsonEditorElement.innerHTML = '';
  const jsonEditor = new JSONEditor(jsonEditorElement, {});
  jsonEditor.set(inkPaper.model);
  inkPaper.resize();
});

$('.nav-tabs a:first').tab('show');

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
const recognitionTypes = [{ type: 'math', ws: true }, { type: 'text', ws: true }, { type: 'shape', ws: false }, { type: 'analyzer', ws: false }, { type: 'music', ws: false }];
const protocolTypes = ['rest', 'websocket'];

function updateConfiguration() {
  document.querySelector('#inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);
  recognitionTypes.forEach((subId) => {
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

  protocolTypes.forEach((id) => {
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
const updateTypeEventHandler = (event) => {
  inkPaper.type = event.target.value;
  updateConfiguration();
};
document.querySelector('#mathMode').addEventListener('pointerdown', updateTypeEventHandler);
document.querySelector('#textMode').addEventListener('pointerdown', updateTypeEventHandler);
document.querySelector('#shapeMode').addEventListener('pointerdown', updateTypeEventHandler);
document.querySelector('#analyzerMode').addEventListener('pointerdown', updateTypeEventHandler);
document.querySelector('#musicMode').addEventListener('pointerdown', updateTypeEventHandler);

/** ===============================================================================================
 * Change protocol buttons
 * ============================================================================================= */
const updateProtocolEventHandler = (event) => {
  inkPaper.protocol = event.target.value;
  updateConfiguration();
};
document.querySelector('#restMode').addEventListener('pointerdown', updateProtocolEventHandler);
document.querySelector('#websocketMode').addEventListener('pointerdown', updateProtocolEventHandler);

/** ===============================================================================================
 * Change brush buttons
 * ============================================================================================= */
const updateStyleEventHandler = (event) => {
  inkPaper.paperOptions.renderingParams.strokeStyle[event.target.name] = event.target.value;
  updateConfiguration();
};
document.querySelector('#color').addEventListener('change', updateStyleEventHandler);
document.querySelector('#width').addEventListener('change', updateStyleEventHandler);

/** ===============================================================================================
 * Undo redo buttons
 * ============================================================================================= */
document.querySelector('#undo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].undo();
});
document.querySelector('#redo').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].redo();
});
document.querySelector('#clear').addEventListener('pointerdown', () => {
  myScriptInkPaperDomElement['data-myscript-ink-paper'].clear();
});
window.addEventListener('resize', () => {
  console.log('Resizing the window');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', () => {
  console.log('Resizing the window while changing tabs');
  myScriptInkPaperDomElement['data-myscript-ink-paper'].resize();
});


document.querySelector('#updateconfiguration').addEventListener('click', () => {
  const newConfiguration = document.querySelector('#inkpaperConfiguration').innerHTML;
  inkPaper.paperOptions = JSON.parse(newConfiguration);
  updateConfiguration();
});
// TODO debug in the console use document.querySelector('#myScriptInkPaperDomElement')['data-myscript-ink-paper'].model

/** ===============================================================================================
 * Logger section
 * ============================================================================================= */
const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'util'];
const template = document.querySelector('#logtemplate');
const loggerConfig = MyScript.DebugConfig.loggerConfig;

const changeLogLevelEventHandler = (event) => {
  loggerConfig[`${event.target.control.name}Logger`].setLevel(event.target.control.value);
};

loggerList.forEach((i) => {
  const logger = i;
  const clone = template.content.cloneNode(true);
  const labelName = clone.querySelector('.inputName');
  labelName.textContent = i;

  clone.querySelectorAll('input[type=radio]').forEach((input) => {
    const inputReference = input;
    inputReference.name = logger;
  });

  // TODO: use unique id also in generated templates
  clone.querySelector('.debugButton').addEventListener('pointerdown', changeLogLevelEventHandler);
  clone.querySelector('.infoButton').addEventListener('pointerdown', changeLogLevelEventHandler);
  clone.querySelector('.errorButton').addEventListener('pointerdown', changeLogLevelEventHandler);
  template.parentNode.appendChild(clone);
});
document.querySelector('#testLogs').onclick = () => {
  loggerList.forEach((logger) => {
    loggerConfig[logger + 'Logger'].debug(logger, 'DEBUG logger test');
    loggerConfig[logger + 'Logger'].info(logger, 'INFO logger test');
    loggerConfig[logger + 'Logger'].error(logger, 'ERROR logger test');
  });
};
