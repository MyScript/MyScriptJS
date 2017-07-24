/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
// Debug in the console use by using document.getElementById('myScriptEditorDomElement')['data-myscript-editor'].model
const myScriptEditorDomElement = document.getElementById('myScriptEditorDomElement');
const editor = MyScript.register(myScriptEditorDomElement, {
  recognitionParams: {
    server: {
      scheme: 'http',
      host: 'localhost:8894',
      applicationKey: '7d223f9e-a3cb-4213-ba4b-85e930605f8b',
      hmacKey: '5ab1935e-529a-4d48-a695-158450e52b13',
      websocket: {
        pingEnabled: false
      }
    }
  }
});

const modeleditor = new JSONEditor(document.getElementById('modeleditor'), { name: 'model', mode: 'form' });
const settingseditor = new JSONEditor(document.getElementById('settingseditor'), { name: 'configuration', mode: 'form' });
const undoRedoItemContent = new JSONEditor(document.getElementById('undoRedoItemContent'), { name: 'model', mode: 'view' });

/** ===============================================================================================
 * Configuration section
 * ============================================================================================= */
const loggerList = ['grabber', 'editor', 'renderer', 'model', 'recognizer', 'util', 'callback'];

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

  // Update current configuration
  document.getElementById('type').value = editor.configuration.recognitionParams.type;
  document.getElementById('protocol').value = editor.configuration.recognitionParams.protocol;
  document.getElementById('apiVersion').value = editor.configuration.recognitionParams.apiVersion;
  document.getElementById('trigger').value = editor.configuration.recognitionTriggerOn;

  // Update current style
  document.getElementById('colorStyle').value = editor.penStyle.color;
  document.getElementById('widthStyle').value = editor.penStyle['-myscript-pen-width'];
}

/** ===============================================================================================
 * Build configuration view
 * ============================================================================================= */
function buildConfiguration() {
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
        MyScript.LoggerConfig
          .getLogger(event.target.control.name)
          .setLevel(event.target.control.value, false);
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

updateViewFromModel(editor.model);

document.getElementById('colorStyle').addEventListener('change', (e) => {
  editor.penStyle.color = e.target.value;
});

document.getElementById('widthStyle').addEventListener('change', (e) => {
  editor.penStyle['-myscript-pen-width'] = e.target.value;
});

document.getElementById('type').addEventListener('change', (e) => {
  editor.configuration.recognitionParams.type = e.target.value;
  editor.configuration = editor.configuration;
});

document.getElementById('protocol').addEventListener('change', (e) => {
  editor.configuration.recognitionParams.protocol = e.target.value;
  editor.configuration = editor.configuration;
});

document.getElementById('apiVersion').addEventListener('change', (e) => {
  editor.configuration.recognitionParams.apiVersion = e.target.value;
  editor.configuration = editor.configuration;
});

document.getElementById('trigger').addEventListener('change', (e) => {
  editor.configuration.recognitionTriggerOn = e.target.value;
  editor.configuration = editor.configuration;
});

document.getElementById('updateconfiguration').addEventListener('pointerdown', (e) => {
  editor.configuration = settingseditor.get();
});

/** ===============================================================================================
 * Test logger button
 * ============================================================================================= */
document.getElementById('testLogs').addEventListener('click', () => {
  loggerList.forEach((name) => {
    const logger = MyScript.LoggerConfig.getLogger(name);
    logger.debug(name, 'test DEBUG log');
    logger.info(name, 'test INFO log');
    logger.error(name, 'test ERROR log');
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
document.getElementById('convert').addEventListener('pointerdown', () => {
  myScriptEditorDomElement['data-myscript-editor'].convert();
});
document.getElementById('export').addEventListener('pointerdown', () => {
  myScriptEditorDomElement['data-myscript-editor'].exportContent();
});
document.getElementById('getImageData').addEventListener('pointerdown', () => {
  window.open(myScriptEditorDomElement['data-myscript-editor'].png);
});

/** ===============================================================================================
 * Update result
 * ============================================================================================= */
myScriptEditorDomElement.addEventListener('change', (e) => {
  if (e.detail) {
    document.getElementById('clear').disabled = !e.detail.canClear;
    document.getElementById('undo').disabled = !e.detail.canUndo;
    document.getElementById('redo').disabled = !e.detail.canRedo;
    document.getElementById('export').disabled = !e.detail.canUndo;
    document.getElementById('convert').disabled = !e.detail.canUndo;
    document.getElementById('getImageData').disabled = !e.detail.canUndo;
  }
});
myScriptEditorDomElement.addEventListener('exported', (e) => {
  document.getElementById('lastRecognitionResult').innerHTML = e.detail && e.detail.exports ? new JSONFormatter().toHtml(e.detail.exports) : '';
});

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
