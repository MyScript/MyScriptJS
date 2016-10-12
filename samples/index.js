/* eslint-disable no-undef */
const myScriptInkPaperDomElement = document.querySelector('#myScriptInkPaperDomElement');
const inkPaper = MyScript.register(myScriptInkPaperDomElement);

const unpdateUndoRedoStack = () => {
  const template = document.querySelector('#undoredoStackElementTemplate');
  template.parentNode.querySelectorAll('.undoRedoButton').forEach((elem) => {
    template.parentNode.removeChild(elem);
  });
  const addItem = (iStackElement) => {
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
    template.parentNode.insertBefore(clone, template.parentNode.firstChild);
  };

  inkPaper.undoRedoManager.stack.forEach((iStackElement) => {
    addItem(iStackElement);
  });
  addItem(inkPaper.model);
};

myScriptInkPaperDomElement.addEventListener('success', (successEvent) => {
  console.log(successEvent);
  document.getElementById('lastModel').innerHTML = new JSONFormatter().toHtml(successEvent.detail);
  document.getElementById('lastModelStats').innerHTML = new JSONFormatter().toHtml(MyScript.DebugConfig.ModelStats.computeStats(successEvent.detail));
  document.getElementById('lastRecognitionResult').innerHTML = new JSONFormatter().toHtml(successEvent.detail.rawResult.result);
  // create the editor
  const jsoneditorElement = document.getElementById('jsoneditor');
  jsoneditorElement.innerHTML = '';
  const jsoneditor = new JSONEditor(jsoneditorElement, {});
  jsoneditor.set(successEvent.detail);
  unpdateUndoRedoStack();
});

$('.nav-tabs a:first').tab('show');

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
function updateConfiguration() {
  document.querySelector('#inkpaperConfiguration').innerHTML = JSON.stringify(inkPaper.paperOptions, ' ', 2);
}
updateConfiguration();


/** ===============================================================================================
 * Change recogntion type buttons
 * ============================================================================================= */
const mathModeButton = document.querySelector('#mathMode');
mathModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.paperOptions = inkPaper.paperOptions.switchToMode('CDK_V3_REST_MATH', inkPaper.paperOptions);
  updateConfiguration();
});

const textModeButton = document.querySelector('#textMode');
textModeButton.addEventListener('pointerdown', (pointerDownEvent) => {
  inkPaper.paperOptions = inkPaper.paperOptions.switchToMode('CDK_V3_REST_TEXT', inkPaper.paperOptions);
  updateConfiguration();
});
// TODO Manage the other mode
// <button id="mathMode" class="btn btn-primary">Math</button>
// <button id="textMode" class="btn btn-primary">Text</button>
// <button id="shapeMode" class="btn btn-primary">Shape</button>
// <button id="musicMode" class="btn btn-primary">Music</button>
// </div>

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
