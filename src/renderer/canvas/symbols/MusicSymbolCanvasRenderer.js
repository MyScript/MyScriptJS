import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import { drawLine } from './ShapeSymbolCanvasRenderer';

/**
 * @type {{F: {svg: String, getBoundingBox: function}, C: {svg: String, getBoundingBox: function}, G: {svg: String, getBoundingBox: function}}}
 */
export const MusicClefs = { // constants was calculated from the svg image, so it should remains together
  F: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="20"><g transform="translate(6.600000e-3,3.125356e-3)"><path d="M17.3 3.1 C17.3 3.5 17.1 3.8 16.8 4.1 C16.5 4.4 15.9 4.5 15.5 4.3 C15 4.1 14.7 3.7 14.7 3.2 C14.6 2.8 14.8 2.5 15 2.2 C15.3 1.9 15.7 1.8 16 1.8 C16.4 1.8 16.8 2 17 2.3 C17.2 2.5 17.3 2.8 17.3 3.1 z"/><path d="M17.3 8.9 C17.3 9.3 17.1 9.7 16.8 9.9 C16.5 10.3 15.9 10.3 15.5 10.2 C15 10 14.7 9.5 14.7 9.1 C14.6 8.7 14.8 8.3 15 8 C15.3 7.8 15.7 7.6 16 7.6 C16.5 7.7 17 8 17.2 8.4 C17.2 8.6 17.3 8.8 17.3 8.9 z"/><path d="M13 7.2 C13 10 11.8 12.7 9.8 14.7 C7.3 17.2 4 18.8 0.7 19.8 C0.3 20.1 -0.4 19.8 0.3 19.4 C1.6 18.8 3 18.3 4.2 17.5 C7 15.8 9.3 13.1 9.8 9.9 C10.1 8 10.1 5.9 9.6 4 C9.2 2.6 8.2 1.1 6.7 0.9 C5.3 0.7 3.7 1.2 2.7 2.2 C2.5 2.4 2 3.2 2 4 C2.6 3.6 2.6 3.6 3.1 3.4 C4.2 2.9 5.7 3.6 6 4.9 C6.3 6 6.1 7.5 5 8.1 C3.8 8.7 2 8.5 1.4 7.2 C0.3 5.3 0.9 2.6 2.6 1.2 C4.4 -0.3 7.1 -0.3 9.2 0.4 C11.4 1.3 12.7 3.5 12.9 5.8 C13 6.2 13 6.7 13 7.2 z"/></g></svg>',
    getBoundingBox: (gap, xAnchor, yAnchor) => ({
      height: gap * 3,
      width: (gap * 3) * (18 / 20),
      x: xAnchor,
      y: yAnchor - gap
    })
  },
  C: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="25"><g transform="matrix(1,0,0,1.030698,-309.364,-543.8647)"><path d="M 325.9 546.8 C 325.8 548.7 324.7 550.7 322.8 551.5 C 321.1 552.1 319.1 552.2 317.6 551 C 316.6 550.2 316.2 548.4 317.3 547.5 C 318.3 546.5 320.4 547.4 320.3 548.9 C 320.7 549.9 318.5 550.5 319.7 551.3 C 321 551.6 322.3 550.5 322.6 549.3 C 323.1 547.5 323.1 545.6 322.7 543.8 C 322.4 542.9 321.9 541.5 320.7 541.9 C 319.2 542.2 318.3 543.8 317.9 545.1 C 317.6 543.2 316.4 541.5 315 540.2 C 315 544.1 315 548 315 551.9 L 314.1 551.9 C 314.1 543.9 314.1 535.7 314.1 527.7 L 315 527.7 C 315 531.5 315 535.5 315 539.4 C 316.4 538.1 317.6 536.4 317.8 534.5 C 318.3 535.9 319.3 537.5 321 537.8 C 322.2 537.8 322.5 536.3 322.8 535.4 C 323.1 533.7 323.1 531.8 322.6 530.1 C 322.2 529 320.9 528 319.6 528.3 C 318.6 529 320.6 529.6 320.3 530.6 C 320.5 532 318.8 533 317.6 532.3 C 316.3 531.6 316.4 529.7 317.4 528.8 C 318 528.1 319.3 527.7 320.3 527.7 C 321.2 527.7 321.8 527.7 322.6 528 C 324.6 528.7 325.7 530.7 325.9 532.7 C 326.2 534.9 324.9 537.3 322.8 538.2 C 321.5 538.7 319.9 538.3 318.8 537.3 C 318.7 538.3 318.2 539.2 317.7 539.9 C 318.1 540.6 318.6 541.8 318.8 542.1 C 320.1 540.9 322.5 540.8 323.8 542 C 325.2 543.1 326.1 545 325.9 546.8 z "/></g><g transform="matrix(1,0,0,1.030928,-309.364,-543.9805)"><path d="M 312.2 551.9 L 309.4 551.9 L 309.4 527.7 L 312.2 527.7 L 312.2 551.9 z "/></g></svg>',
    getBoundingBox: (gap, xAnchor, yAnchor) => ({
      height: gap * 3,
      width: (gap * 3) * (18 / 25),
      x: xAnchor,
      y: yAnchor - (gap * (3 / 2))
    })
  },
  G: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="40"><g><path d="m 12 3.4 c 0.3 3.1 -2 5.6 -4.1 7.6 -0.9 0.9 -0.2 0.1 -0.6 0.6 -0.1 -0.5 -0.3 -1.7 -0.3 -2.1 0.1 -2.6 2.3 -6.5 4.2 -7.9 0.3 0.6 0.6 0.6 0.8 1.8 z m 0.7 15.9 c -1.2 -0.9 -2.8 -1.1 -4.3 -0.9 -0.2 -1.2 -0.4 -2.5 -0.6 -3.7 2.4 -2.3 4.9 -4.9 5 -8.4 0.1 -2.2 -0.3 -4.6 -1.7 -6.4 C 9.5 0.1 8.3 2.1 7.4 3.3 c -1.5 2.6 -1.1 5.8 -0.6 8.6 -0.8 0.9 -1.9 1.7 -2.7 2.7 -2.4 2.3 -4.4 5.3 -4 8.7 0.2 3.3 2.6 6.3 5.9 7.1 1.2 0.3 2.6 0.3 3.8 0.1 0.2 2.2 1 4.5 0.1 6.7 -0.7 1.6 -2.8 2.9 -4.3 2.2 -0.6 -0.3 -0.1 -0.1 -0.5 -0.2 1.1 -0.3 2 -1 2.3 -1.5 0.8 -1.4 -0.4 -3.6 -2.2 -3.3 -2.3 0 -3.2 3.1 -1.7 4.6 1.3 1.5 3.8 1.3 5.4 0.3 1.8 -1.2 2 -3.5 1.8 -5.5 -0.1 -0.7 -0.4 -2.6 -0.4 -3.3 0.7 -0.2 0.2 -0.1 1.2 -0.4 2.7 -1 4.4 -4.2 3.6 -7 -0.3 -1.4 -1 -2.9 -2.3 -3.7 z m 0.6 5.7 c 0.2 2 -1.1 4.2 -3.1 4.9 -0.1 -0.8 -0.2 -1 -0.3 -1.4 -0.5 -2.4 -0.7 -4.9 -1.1 -7.3 1.6 -0.2 3.5 0.5 4 2.1 0.2 0.6 0.3 1.2 0.4 1.8 z m -5.1 5.1 c -2.5 0.1 -5 -1.6 -5.6 -4 -0.7 -2.1 -0.5 -4.5 0.8 -6.4 1.1 -1.7 2.6 -3 4 -4.5 0.2 1.1 0.4 2.2 0.5 3.3 -3 0.8 -5 4.6 -3.2 7.3 0.5 0.8 2 2.2 2.8 1.6 -1.1 -0.7 -2 -1.8 -1.8 -3.2 -0.1 -1.3 1.4 -2.9 2.7 -3.1 0.4 2.8 0.9 6 1.4 8.8 -0.5 0.1 -1 0.1 -1.5 0.1 z"/></g></svg>',
    getBoundingBox: (gap, xAnchor, yAnchor) => ({
      height: gap * (15 / 2),
      width: (gap * (15 / 2)) * (15 / 40),
      x: xAnchor,
      y: yAnchor - (gap * (9 / 2))
    })
  }
};

/**
 * @type {{accidental: String, arpeggiate: String, bar: String, beam: String, clef: String, decoration: String, dots: String, head: String, ledgerLine: String, rest: String, staff: String, stem: String, tieOrSlur: String, timeSignature: String}}
 */
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

/**
 * Attach resources to be used to render symbol
 * @param {Element} element DOM element to attach resources
 */
export function preloadMusicSymbols(element) {
  Object.keys(MusicClefs).forEach((key) => {
    element.appendChild(createImage(key, `data:image/svg+xml,${MusicClefs[key].svg}`));
  });
}

function drawStaff(context, staff) {
  for (let i = 0; i < staff.count; i++) {
    const p1 = { x: 0, y: staff.top + (i * staff.gap) };
    const p2 = { x: context.canvas.width, y: staff.top + (i * staff.gap) };
    drawLine(context, p1, p2);
  }
}

function drawClef(context, clef) {
  // eslint-disable-next-line no-undef
  context.drawImage(document.querySelector(`img[data-clef=${clef.value.symbol}]`), clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
}

/**
 * Draw a music symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
export function drawMusicSymbol(context, symbol) {
  logger.debug(`draw ${symbol.type} symbol`);
  switch (symbol.type) {
    case MusicSymbols.clef:
      drawClef(context, symbol);
      break;
    case MusicSymbols.staff:
      drawStaff(context, symbol);
      break;
    default:
      logger.error(`${symbol.type} not implemented`);
  }
}
