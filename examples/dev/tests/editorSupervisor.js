/* eslint-disable no-underscore-dangle */
// We are using intensely document here as it is a pure frontend script for testing purpose only.
(function () {
  const component = document.querySelector('#editor');

  let editorSupervisor = document.querySelector('#editorSupervisor');
  if (!editorSupervisor) {
    editorSupervisor = document.createElement('div');
    editorSupervisor.type = 'hidden';
    editorSupervisor.id = 'editorSupervisor';
    editorSupervisor = document.querySelector('body').appendChild(editorSupervisor);
  }

  let svgSupervisor = document.querySelector('#svgSupervisor');
  if (!svgSupervisor) {
    svgSupervisor = document.createElement('div');
    svgSupervisor.type = 'hidden';
    svgSupervisor.id = 'svgSupervisor';
    svgSupervisor = document.querySelector('body').appendChild(svgSupervisor);

    const storeSvg = () => {
      let storedSvgElement = svgSupervisor.querySelector('#storedSvg');
      if (!storedSvgElement) {
        storedSvgElement = document.createElement('span');
        storedSvgElement.id = 'storedSvg';
        storedSvgElement = svgSupervisor.appendChild(storedSvgElement);
      }
      storedSvgElement.innerText = component.editor.domElement.querySelector('svg').outerHTML;
    };

    const compareSvg = () => {
      let currentSvgElement = svgSupervisor.querySelector('#newSvg');
      if (!currentSvgElement) {
        currentSvgElement = document.createElement('span');
        currentSvgElement.id = 'newSvg';
        currentSvgElement = svgSupervisor.appendChild(currentSvgElement);
      }
      currentSvgElement.innerText = component.editor.domElement.querySelector('svg').outerHTML;

      svgSupervisor.dataset.samesvg = currentSvgElement.innerText === document.querySelector('#storedSvg').innerText;
    };

    const svgControls = ['storeSvg', 'compareSvg'];
    svgControls.forEach((svgControl) => {
      let button = document.querySelector('#' + svgControl);
      if (!button) {
        button = document.createElement('button');
        button.id = svgControl;
        button.dataset.control = svgControl;
        button.innerText = svgControl;
        button = document.querySelector('body').appendChild(button);

        button.addEventListener('click', () => {
          switch (svgControl) {
            case 'compareSvg':
              compareSvg();
              break;
            default:
              storeSvg();
              break;
          }
        });
      }
    });
  }

  const controls = ['clear', 'undo', 'redo', 'import_', 'exportContent', 'convert', 'waitForIdle'];
  controls.forEach((control) => {
    let button = document.querySelector('#' + control);
    if (!button) {
      button = document.createElement('button');
      button.id = control;
      button.dataset.control = control;
      button.innerText = control;
      button = document.querySelector('body').appendChild(button);

      const importContentField = document.getElementById('importContentField');

      button.addEventListener('click', () => {
        switch (control) {
          case 'clear':
            component.editor.clear();
            break;
          case 'undo':
            component.editor.undo();
            break;
          case 'redo':
            component.editor.redo();
            break;
          case 'exportContent':
            component.editor.export_();
            break;
          case 'import_':
            component.editor.import_(new Blob([importContentField.value], { type: importContentField.dataset.type }));
            break;
          case 'convert':
            component.editor.convert();
            break;
          case 'waitForIdle':
            editorSupervisor.idle = false;
            editorSupervisor.dataset.idle = false;
            component.editor.waitForIdle();
            break;
          default:
            break;
        }
      });
    }
  });

  let disconnectButton = document.querySelector('#disconnect');
  if (!disconnectButton) {
    disconnectButton = document.createElement('button');
    disconnectButton.id = 'disconnect';
    disconnectButton.dataset.control = 'disconnect';
    disconnectButton.innerText = 'disconnect';
    disconnectButton = document.querySelector('body').appendChild(disconnectButton);

    disconnectButton.addEventListener('click', () => {
      const editor = component.editor;
      editor.recognizer.close(editor.recognizerContext, editor.model, () => {
        console.log('socket closed');
      });
    });
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

  component.addEventListener('idle', (evt) => {
    console.log('event idle', evt);
    editorSupervisor.lastevent = evt;

    const idleEvt = evt.detail;
    editorSupervisor.idle = idleEvt.idle;
    editorSupervisor.dataset.idle = idleEvt.idle;
  });

  component.addEventListener('changed', (evt) => {
    console.log('event changed', evt);
    editorSupervisor.lastevent = evt;

    const changedEvt = evt.detail;
    editorSupervisor.state = 'UNDEFINED';
    editorSupervisor.dataset.state = 'UNDEFINED';

    editorSupervisor.dataset.canundo = changedEvt.canUndo;
    editorSupervisor.dataset.canredo = changedEvt.canRedo;
    editorSupervisor.dataset.canclear = changedEvt.canClear;

    editorSupervisor.nbstrokes = evt.target.editor.getStats().strokesCount;
    editorSupervisor.unloaded = !changedEvt.initialized;
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
        .forEach((key) => {
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
})();
/* eslint-enable no-undef, wrap-iife */
