/* eslint-disable no-undef */
// We are using intensely document here as it is a pure frontend script for testing purpose only.
let editorSupervisor = document.querySelector('#editorSupervisor');
if (!editorSupervisor) {
  const input = document.createElement('div');
  // input.style = 'visibility:hidden;'
  input.type = 'hidden';
  input.id = 'editorSupervisor';
  document.querySelector('body').appendChild(input);
  editorSupervisor = document.querySelector('#editorSupervisor');
}

/**
 * Compute a more easily comparable hash from result for an analyzer result.
 * @param analysis
 */
function computeAnalyzerHash(analysis) {
  const computedResult = [];
  analysis.shapes.forEach((shape) => {
    if (shape.candidates[0].label) {
      computedResult.push(shape.candidates[0].label);
    } else {
      computedResult.push(shape.candidates[0].type);
    }
  });
  analysis.textLines.forEach((textLine) => {
    computedResult.push('txt:' + textLine.result.textSegmentResult.candidates[0].label);
  });
  analysis.tables.forEach((table) => {
    computedResult.push('tables:' + table.cells.length);
  });
  computedResult.push('groups:' + analysis.groups.length);
  return computedResult.sort().join();
}

/**
 * Compute a more easily comparable hash from exports for shape.
 * @param segments
 */
function computeShapeHash(segments) {
  const computedResult = [];
  // Computing a custom hash of shape result.
  segments.forEach((segment) => {
    if (segment.candidates[0].label) {
      computedResult.push(segment.candidates[0].label);
    } else {
      computedResult.push(segment.candidates[0].type);
    }
  });
  if (computedResult.length > 0) {
    return computedResult.sort().join();
  }
  return '';
}

/**
 * Compute a more easily comparable hash from result for a text result.
 * @param segments
 */
function computeTextHash(segments) {
  const computedResult = [];

  const textLabels = [];
  segments.textSegmentResult.candidates.forEach(candidate => textLabels.push(candidate.label));
  computedResult.push('text:' + textLabels.join(','));

  const wordLabels = [];
  if (segments.wordSegments) {
    segments.wordSegments.forEach((segment) => {
      segment.candidates.forEach(candidate => wordLabels.push(candidate.label));
    });
    computedResult.push('word:' + wordLabels.join(','));
  }

  const charLabels = [];
  if (segments.charSegments) {
    segments.charSegments.forEach((segment) => {
      segment.candidates.forEach(candidate => charLabels.push(candidate.label));
    });
    computedResult.push('character:' + charLabels.join(','));
  }

  return computedResult.join(';');
}

const component = document.querySelector('#editor');

component.addEventListener('idle', (evt) => {
  console.log('event idle', evt);
  editorSupervisor.lastevent = evt;

  const idleEvt = evt.detail;
  editorSupervisor.idle = idleEvt.idle;
  editorSupervisor.dataset.idle = idleEvt.idle;
});

component.addEventListener('change', (evt) => {
  console.log('event change', evt);
  editorSupervisor.lastevent = evt;

  const changeEvt = evt.detail;
  editorSupervisor.state = 'UNDEFINED';
  editorSupervisor.dataset.state = 'UNDEFINED';

  editorSupervisor.dataset.canundo = changeEvt.canUndo;
  editorSupervisor.dataset.canredo = changeEvt.canRedo;
  editorSupervisor.dataset.canclear = changeEvt.canClear;

  const editor = evt.target.editor;
  editorSupervisor.dataset.rawstrokes = editor.stats.strokesCount;

  editorSupervisor.nbstrokes = editor.stats.strokesCount;
  editorSupervisor.unloaded = !changeEvt.initialized;
});

component.addEventListener('exported', (evt) => {
  console.log('event exported', evt);
  editorSupervisor.lastevent = evt;
  editorSupervisor.innerHTML = '';

  const resultEvt = evt.detail;
  if (resultEvt.exports) {
    editorSupervisor.state = 'EXPORTED';
    editorSupervisor.dataset.state = 'EXPORTED';
    editorSupervisor.exports = resultEvt.exports;
    Object.keys(resultEvt.exports)
      .forEach(function (key) {
        const exportElement = document.createElement('span');
        exportElement.dataset.key = key;
        exportElement.value = resultEvt.exports[key];
        if (key === 'ANALYSIS') {
          exportElement.innerText = computeAnalyzerHash(exportElement.value);
        } else if (key === 'SEGMENTS') {
          exportElement.innerText = computeShapeHash(exportElement.value);
        } else if (key === 'CANDIDATES') {
          exportElement.innerText = computeTextHash(exportElement.value);
        } else {
          exportElement.innerText = typeof exportElement.value === 'string' ? exportElement.value : JSON.stringify(exportElement.value);
        }
        editorSupervisor.appendChild(exportElement);
      });
  }
});

editorSupervisor.unloaded = !component.initialized;

/* eslint-enable no-undef */
