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

function createImage(clef, src) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const img = browserDocument.createElement('img');
  img.dataset.clef = clef;
  img.src = src;
  img.style.display = 'none';
  return img;
}

export function preloadMusicSymbols(renderDomElement) {
  Object.keys(MyScriptJSConstants.MusicClefs).forEach((key) => {
    renderDomElement.appendChild(createImage(key, `data:image/svg+xml,${MyScriptJSConstants.MusicClefs[key].svg}`));
  });
}

function drawStaff(staff, context) {
  context.save();
  try {
    context.beginPath();
    for (let i = 0; i < staff.count; i++) {
      context.moveTo(0, staff.top + (i * staff.gap));
      context.lineTo(context.canvas.width, staff.top + (i * staff.gap));
    }
    context.stroke();
  } finally {
    context.restore();
  }
}

function drawClef(clef, context) {
  // eslint-disable-next-line no-undef
  context.drawImage(document.querySelector(`img[data-clef=${clef.value.symbol}]`), clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
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
