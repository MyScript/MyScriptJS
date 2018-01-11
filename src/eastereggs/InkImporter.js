/* eslint-disable no-undef */
import { editorLogger as logger } from '../configuration/LoggerConfig';

/**
 * Function to copy past to inject ink during tutorial.
 * @param editorParam
 * @param strokes
 * @param delayBetweenStrokes
 * @param lastOneDelay
 */
export function inkImporter(editorParam, strokes, delayBetweenStrokes, lastOneDelay) {
  const editor = editorParam;
  logger.debug('inkImporter start importing =>', strokes);
  const origGrabber = Object.assign({}, editor.behavior.grabber);
  origGrabber.detach = editor.behavior.grabber.detach;
  editor.behavior.grabber = {};
  const actions = [];
  strokes.forEach((stroke) => {
    if (stroke.convert) {
      actions.push({ action: 'convert', value: true });
    } else if (stroke.setDelay) {
      actions.push({ action: 'setDelay', value: stroke.setDelay });
    } else {
      if (stroke.color) {
        actions.push({ action: 'setColor', value: stroke.color });
      }
      stroke.X.forEach((x, idx) => {
        let action = 'move';
        if (idx === 0) {
          action = 'down';
        } else if (idx === (stroke.X.length - 1)) {
          action = 'up';
        }
        actions.push({ action, point: { x: stroke.X[idx], y: stroke.Y[idx] } });
      });
    }
  });
  logger.debug('Array of actions =>', actions);
  const play = (actionsArray, position, delay) => {
    if (position < actionsArray.length) {
      const currentAction = actionsArray[position];
      let nextDelay = delay;
      if (currentAction.action === 'convert') {
        editor.convert();
      } else if (currentAction.action === 'setDelay') {
        nextDelay = currentAction.value;
      } else if (currentAction.action === 'setColor') {
        editor.penStyle = {
          color: currentAction.value,
        };
      } else {
        currentAction.point.t = new Date().getTime();
        if (currentAction.action === 'down') {
          editor.pointerDown(currentAction.point);
        } else if (currentAction.action === 'up') {
          editor.pointerUp(currentAction.point);
        } else if (currentAction.action === 'move') {
          editor.pointerMove(currentAction.point);
        }
      } if (lastOneDelay && position === actionsArray.map(x => x.action).lastIndexOf('down') - 1) {
        setTimeout(() => {
          play(actionsArray, position + 1, nextDelay);
        }, lastOneDelay);
      } else if (position === actionsArray.length - 1) {
        const event = new Event('drawEnded');
        document.dispatchEvent(event);
        editor.behavior.grabber = origGrabber;
      } else {
        setTimeout(() => {
          play(actionsArray, position + 1, nextDelay);
        }, nextDelay);
      }
    }
  };
  play(actions, 0, delayBetweenStrokes);
}
