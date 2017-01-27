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


document.querySelector('#inkPaper').addEventListener('change', (evt) => {
  inkPaperSupervisor.lastevent = evt;
  if (evt.detail.rawResult.result.shapes) {
    inkPaperSupervisor.lastresult = computeAnalyzerHash(evt.detail.rawResult.result);
  } else if (evt.detail.rawResult.result.segments) {
    inkPaperSupervisor.lastresult = computeShapeHash(evt.detail.rawResult.result);
  } else if (evt.detail.rawResult.result.results && evt.detail.rawResult.result.results[0] && evt.detail.rawResult.result.results[0].type === 'MUSICXML') {
    inkPaperSupervisor.lastresult = evt.detail.rawResult.result.results[0].value;
  } else {
    inkPaperSupervisor.lastresult = evt.detail.rawResult.result;
  }

  spanSubElement.innerText = inkPaperSupervisor.lastresult;

  inkPaperSupervisor.nbstrokes = evt.detail.rawStrokes.length;
  inkPaperSupervisor.canundo = evt.detail.canUndo;
  inkPaperSupervisor.canredo = evt.detail.canRedo;
  inkPaperSupervisor.canclear = evt.detail.canClear;
});
/* eslint-enable no-undef */
