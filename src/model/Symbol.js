import { MusicClefs } from '../renderer/canvas/symbols/MusicSymbolCanvasRenderer';
import Constants from '../configuration/Constants';

function mergeBounds(boundsA, boundsB) {
  return {
    minX: Math.min(boundsA.minX, boundsB.minX),
    maxX: Math.max(boundsA.maxX, boundsB.maxX),
    minY: Math.min(boundsA.minY, boundsB.minY),
    maxY: Math.max(boundsA.maxY, boundsB.maxY)
  };
}

function getLineBounds(line) {
  return {
    minX: Math.min(line.firstPoint.x, line.lastPoint.x),
    maxX: Math.max(line.firstPoint.x, line.lastPoint.x),
    minY: Math.min(line.firstPoint.y, line.lastPoint.y),
    maxY: Math.max(line.firstPoint.y, line.lastPoint.y)
  };
}

function getEllipseBounds(ellipse) {
  const angleStep = 0.02; // angle delta between interpolated points on the arc, in radian

  let z1 = Math.cos(ellipse.orientation);
  let z3 = Math.sin(ellipse.orientation);
  let z2 = z1;
  let z4 = z3;
  z1 *= ellipse.maxRadius;
  z2 *= ellipse.minRadius;
  z3 *= ellipse.maxRadius;
  z4 *= ellipse.minRadius;

  const n = Math.abs(ellipse.sweepAngle) / angleStep;

  const x = [];
  const y = [];

  for (let i = 0; i <= n; i++) {
    const angle = ellipse.startAngle + ((i / n) * ellipse.sweepAngle);
    const alpha = Math.atan2(Math.sin(angle) / ellipse.minRadius, Math.cos(angle) / ellipse.maxRadius);

    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);

    x.push(ellipse.center.x + ((z1 * cosAlpha) - (z4 * sinAlpha)));
    y.push(ellipse.center.y + ((z2 * sinAlpha) + (z3 * cosAlpha)));
  }

  return {
    minX: Math.min(...x),
    maxX: Math.max(...x),
    minY: Math.min(...y),
    maxY: Math.max(...y)
  };
}

function getTextLineBounds(textLine) {
  return {
    minX: textLine.data.topLeftPoint.x,
    maxX: textLine.data.topLeftPoint.x + textLine.data.width,
    minY: textLine.data.topLeftPoint.y,
    maxY: textLine.data.topLeftPoint.y + textLine.data.height
  };
}

function getClefBounds(clef) {
  return {
    minX: clef.boundingBox.x,
    maxX: clef.boundingBox.x + clef.boundingBox.width,
    minY: clef.boundingBox.y,
    maxY: clef.boundingBox.y + clef.boundingBox.height
  };
}

function getStrokeBounds(stroke) {
  return {
    minX: Math.min(...stroke.x),
    maxX: Math.max(...stroke.x),
    minY: Math.min(...stroke.y),
    maxY: Math.max(...stroke.y)
  };
}

/**
 * Get the box enclosing the given symbols
 * @param {Array} symbols Symbols to extract bounds from
 * @param {Bounds} [bounds] Starting bounds for recursion
 * @return {Bounds} Bounding box enclosing symbols
 */
export function getSymbolsBounds(symbols, bounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE }) {
  let boundsRef = bounds;
  boundsRef = symbols
      .filter(symbol => symbol.type === 'stroke')
      .map(getStrokeBounds)
      .reduce(mergeBounds, boundsRef);
  boundsRef = symbols
      .filter(symbol => symbol.type === 'clef')
      .map(getClefBounds)
      .reduce(mergeBounds, boundsRef);
  boundsRef = symbols
      .filter(symbol => symbol.type === 'line')
      .map(getLineBounds)
      .reduce(mergeBounds, boundsRef);
  boundsRef = symbols
      .filter(symbol => symbol.type === 'ellipse')
      .map(getEllipseBounds)
      .reduce(mergeBounds, boundsRef);
  boundsRef = symbols
      .filter(symbol => symbol.type === 'textLine')
      .map(getTextLineBounds)
      .reduce(mergeBounds, boundsRef);
  return boundsRef;
}

function getDefaultMusicSymbols(configuration) {
  const defaultStaff = Object.assign({}, { type: 'staff' }, configuration.recognitionParams.v3.musicParameter.staff);
  const defaultClef = {
    type: 'clef',
    value: Object.assign({}, configuration.recognitionParams.v3.musicParameter.clef)
  };
  defaultClef.value.yAnchor = defaultStaff.top + (defaultStaff.gap * (defaultStaff.count - defaultClef.value.line));
  delete defaultClef.value.line;
  defaultClef.boundingBox = MusicClefs[defaultClef.value.symbol].getBoundingBox(defaultStaff.gap, 0, defaultClef.value.yAnchor);
  return [defaultStaff, defaultClef];
}

/**
 * Get the default symbols for the current recognition type
 * @param {Configuration} configuration Current recognition parameters from which extract default symbols
 * @return {Array} Symbols matching configuration
 */
export function getDefaultSymbols(configuration) {
  switch (configuration.recognitionParams.type) {
    case Constants.RecognitionType.MUSIC:
      return getDefaultMusicSymbols(configuration);
    default:
      return [];
  }
}
