/* eslint-disable no-undef */
// We are using intensely document here as it is a pure frontend script for testing purpose only.
let inkPaperSupervisor = document.querySelector('#inkPaperSupervisor');
let spanSubElement;
if (!inkPaperSupervisor) {
  const input = document.createElement('div');
  // input.style = 'visibility:hidden;'
  input.type = 'hidden';
  input.id = 'inkPaperSupervisor';
  document.querySelector('body').appendChild(input);
  inkPaperSupervisor = document.querySelector('#inkPaperSupervisor');
  spanSubElement = document.createElement('span');
  inkPaperSupervisor.appendChild(spanSubElement);
}

/**
 * Compute a more easily comparable hash from result for an analyzer result.
 * @param result
 */
function computeAnalyzerHash(result) {
  const computedResult = [];
  result.shapes.forEach((shape) => {
    if (shape.candidates[0].label) {
      computedResult.push(shape.candidates[0].label);
    } else {
      computedResult.push(shape.candidates[0].type);
    }
  });
  result.textLines.forEach((textLine) => {
    computedResult.push('txt:' + textLine.result.textSegmentResult.candidates[0].label);
  });
  result.tables.forEach((table) => {
    computedResult.push('tables:' + table.cells.length);
  });
  computedResult.push('groups:' + result.groups.length);
  return computedResult.sort().join();
}

/**
 * Compute a more easily comparable hash from result for an shape result.
 * @param result
 */
function computeShapeHash(result) {
  const computedResult = [];
  // Computing a custom hash of shape result.
  result.segments.forEach((segment) => {
    console.log(segment);
    if (segment.candidates[0].label) {
      computedResult.push(segment.candidates[0].label);
    } else {
      computedResult.push(segment.candidates[0].type);
    }
  });
  return computedResult.sort().join();
}

/**
 * Compute a more easily comparable hash from result for a text result.
 * @param result
 */
function computeTextHash(result) {
  const computedResult = [];

  const textLabels = [];
  result.textSegmentResult.candidates.forEach(candidate => textLabels.push(candidate.label));
  computedResult.push('text:' + textLabels.join(','));

  const wordLabels = [];
  if (result.wordSegments) {
    result.wordSegments.forEach((segment) => {
      segment.candidates.forEach(candidate => wordLabels.push(candidate.label));
    });
    computedResult.push('word:' + wordLabels.join(','));
  }

  const charLabels = [];
  if (result.charSegments) {
    result.charSegments.forEach((segment) => {
      segment.candidates.forEach(candidate => charLabels.push(candidate.label));
    });
    computedResult.push('character:' + charLabels.join(','));
  }

  return computedResult.join(';');
}


const inkPaperDomElement = document.querySelector('#inkPaper');
const inkPaper = inkPaperDomElement['data-myscript-ink-paper'];

inkPaperDomElement.addEventListener('change', (evt) => {
  inkPaperSupervisor.lastevent = evt;

  const changeEvt = evt.detail;
  inkPaperSupervisor.state = 'UNDEFINED';
  inkPaperSupervisor.dataset.state = 'UNDEFINED';

  inkPaperSupervisor.dataset.canundo = changeEvt.canUndo;
  inkPaperSupervisor.dataset.canredo = changeEvt.canRedo;
  inkPaperSupervisor.dataset.canclear = changeEvt.canClear;
  inkPaperSupervisor.dataset.rawstrokes = inkPaper.model.rawStrokes.length;

  inkPaperSupervisor.nbstrokes = inkPaper.model.rawStrokes.length;
});

inkPaperDomElement.addEventListener('result', (evt) => {
  inkPaperSupervisor.lastevent = evt;

  const resultEvt = evt.detail;
  if (resultEvt.rawResult && (resultEvt.rawResult.result || resultEvt.recognitionResult)) {
    inkPaperSupervisor.state = 'RECOGNITION OVER';
    inkPaperSupervisor.dataset.state = 'RECOGNITION OVER';

    if (resultEvt.rawResult.result.shapes) {
      inkPaperSupervisor.lastresult = computeAnalyzerHash(resultEvt.rawResult.result);
    } else if (resultEvt.rawResult.result.segments) {
      inkPaperSupervisor.lastresult = computeShapeHash(resultEvt.rawResult.result);
    } else if (resultEvt.rawResult.result.textSegmentResult) {
      inkPaperSupervisor.lastresult = computeTextHash(resultEvt.rawResult.result);
    } else if (resultEvt.recognitionResult) {
      inkPaperSupervisor.lastresult = resultEvt.recognitionResult;
    } else {
      inkPaperSupervisor.lastresult = resultEvt.rawResult.result;
    }
  }

  spanSubElement.innerText = inkPaperSupervisor.lastresult;
})
;

/* eslint-enable no-undef */
