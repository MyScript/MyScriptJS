import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';


export const MusicSymbols = {
  accidental: 'accidental',
  arpeggiate: 'arpeggiate',
  bar: 'bar',
  beam: 'beam',
  clef: 'clef',
  decoration: 'decoration',
  dots: 'dots',
  head: 'head',
  ledgerLine: 'ledgerLine',
  rest: 'rest',
  staff: 'staff',
  stem: 'stem',
  tieOrSlur: 'tieOrSlur',
  timeSignature: 'timeSignature',
};

function drawStaff(staff, context) {
  context.save();
  try {
    context.beginPath();
    for (let i = 0; i < staff.count; i++) {
      context.moveTo(0, staff.top + (i * staff.gap));
      context.lineTo(context.canvas.clientWidth, staff.top + (i * staff.gap));
    }
    context.stroke();
  } finally {
    context.restore();
  }
}

function drawClef(clef, context) {
  // eslint-disable-next-line no-undef
  const imageObj = new Image();
  imageObj.onload = () => {
    context.drawImage(imageObj, clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
  };
  imageObj.src = `data:image/svg+xml,${MyScriptJSConstants.MusicClefs[clef.value.symbol].svg}`;
}

function drawMusicNode(component, context) {
  switch (component.type) {
    case MusicSymbols.clef:
      drawClef(component, context);
      break;
    case MusicSymbols.staff:
      drawStaff(component, context);
      break;
    default:
      logger.error(`${component.type} not implemented`);
  }
}

export function drawMusicPrimitive(component, context) {
  logger.debug(`draw ${component.type} music node`);
  drawMusicNode(component, context);
}
