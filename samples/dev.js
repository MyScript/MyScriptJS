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
const recognitionTypes = [{ type: 'MATH', ws: true }, { type: 'TEXT', ws: true }, { type: 'SHAPE', ws: false }, { type: 'ANALYZER', ws: false }, { type: 'MUSIC', ws: false }];
const protocols = ['REST', 'WebSocket'];
const styles = ['color', 'width'];

const enableWebSocket = (enabled) => {
  if (enabled && enabled === true) {
    document.querySelector('#websocketProtocol').removeAttribute('disabled');
  } else {
    document.querySelector('#websocketProtocol').setAttribute('disabled', true);
  }
};
const setActiveRecognitionType = (type) => {
  recognitionTypes.forEach((recognitionType) => {
    const elemClass = document.querySelector('#' + recognitionType.type.toLowerCase() + 'Type').classList;
    if (type && (recognitionType.type === type)) {
      elemClass.add('active');
      enableWebSocket(recognitionType.ws);
    } else {
      elemClass.remove('active');
    }
  });
};
const setActiveProtocol = (mode) => {
  protocols.forEach((protocol) => {
    const elemClass = document.querySelector('#' + protocol.toLowerCase() + 'Protocol').classList;
    if (mode && (protocol === mode)) {
      elemClass.add('active');
    } else {
      elemClass.remove('active');
    }
  });
};
const setCurrentStyle = (strokeStyle) => {
  styles.forEach((style) => {
    document.querySelector('#' + style.toLowerCase() + 'Style').value = strokeStyle[style];
  });
};
function updateConfiguration() {
  document.querySelector('#inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);
  setActiveRecognitionType(inkPaper.type);
  setActiveProtocol(inkPaper.protocol);
  setCurrentStyle(inkPaper.paperOptions.renderingParams.strokeStyle);
}
updateConfiguration();

/** ===============================================================================================
 * Change configuration button
 * ============================================================================================= */
// FIXME: not working => behavior is a functional-style parameter so it is not possible to apply configuration with a JSON.parse
const updateConfigurationEventHandler = (event) => {
  const configuration = document.querySelector('#inkpaperConfiguration').value;
  inkPaper.paperOptions = JSON.parse(configuration);
  updateConfiguration();
};
document.querySelector('#updateconfiguration').addEventListener('pointerdown', updateConfigurationEventHandler);

/** ===============================================================================================
 * Change recognition type buttons
 * ============================================================================================= */
const updateTypeEventHandler = (event) => {
  inkPaper.type = event.target.value;
  updateConfiguration();
};
recognitionTypes.forEach((recognitionType) => {
  document.querySelector('#' + recognitionType.type.toLowerCase() + 'Type').addEventListener('pointerdown', updateTypeEventHandler);
});

/** ===============================================================================================
 * Change protocol buttons
 * ============================================================================================= */
const updateProtocolEventHandler = (event) => {
  inkPaper.protocol = event.target.value;
  updateConfiguration();
};
protocols.forEach((protocol) => {
  document.querySelector('#' + protocol.toLowerCase() + 'Protocol').addEventListener('pointerdown', updateProtocolEventHandler);
});

/** ===============================================================================================
 * Change brush buttons
 * ============================================================================================= */
const updateStyleEventHandler = (event) => {
  inkPaper.paperOptions.renderingParams.strokeStyle[event.target.name] = event.target.value;
  updateConfiguration();
};
styles.forEach((style) => {
  document.querySelector('#' + style.toLowerCase() + 'Style').addEventListener('change', updateStyleEventHandler);
});

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


// TODO debug in the console use document.querySelector('#myScriptInkPaperDomElement')['data-myscript-ink-paper'].model

/** ===============================================================================================
 * Logger section
 * ============================================================================================= */
const loggerList = ['grabber', 'inkpaper', 'renderer', 'model', 'recognizer', 'util'];
const template = document.querySelector('#logtemplate');
const loggerConfig = MyScript.DebugConfig.loggerConfig;

const changeLogLevelEventHandler = (event) => {
  loggerConfig[event.target.control.name + 'Logger'].setLevel(event.target.control.value);
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
