import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Stroke symbol
 * @typedef {Object} Stroke
 * @property {String} type Symbol type, 'stroke' for stroke
 * @property {Array<Number>} x X coordinates
 * @property {Array<Number>} y Y coordinates
 * @property {Array<Number>} t Timestamps matching x,y coordinates
 * @property {Array<Number>} p Pressure
 * @property {Array<Number>} l Length from origin
 * @property {Number} width (for rendering) Pen/brush width
 * @property {String} color (for rendering) Pen/brush color
 */

function computeDistance(x, y, xArray, yArray, lastIndexPoint) {
  const distance = Math.sqrt(Math.pow((y - yArray[lastIndexPoint - 1]), 2) + Math.pow((x - xArray[lastIndexPoint - 1]), 2));
  return isNaN(distance) ? 0 : distance;
}

function computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
  const length = lArray[lastIndexPoint - 1] + computeDistance(x, y, xArray, yArray, lastIndexPoint);
  return isNaN(length) ? 0 : length;
}

function computePressure(x, y, xArray, yArray, lArray, lastIndexPoint) {
  let ratio = 1.0;
  const distance = computeDistance(x, y, xArray, yArray, lastIndexPoint);
  const length = computeLength(x, y, xArray, yArray, lArray, lastIndexPoint);

  if (length === 0) {
    ratio = 0.5;
  } else if (distance === length) {
    ratio = 1.0;
  } else if (distance < 10) {
    ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
  } else if (distance > length - 10) {
    ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
  }
  const pressure = ratio * Math.max(0.1, 1.0 - (0.1 * Math.sqrt(distance)));
  return isNaN(parseFloat(pressure)) ? 0.5 : pressure;
}

function filterPointByAcquisitionDelta(x, y, xArray, yArray, width) {
  const delta = (2 + (width / 4));
  let ret = false;
  if (xArray.length === 0 || yArray.length === 0 || Math.abs(xArray[xArray.length - 1] - x) >= delta || Math.abs(yArray[yArray.length - 1] - y) >= delta) {
    ret = true;
  }
  return ret;
}

/**
 * Create a new stroke
 * @param {Object} properties Properties to be applied to the stroke.
 * @return {Stroke} New stroke with properties for quadratics draw
 */
export function createStrokeComponent(properties) {
  const defaultStroke = {
    type: 'stroke',
    x: [],
    y: [],
    t: [],
    p: [],
    l: [],
    width: 0
  };
  return Object.assign({}, defaultStroke, properties);
}

/**
 * Get a JSON copy of a stroke by filtering its properties
 * @param {Stroke} stroke Current stroke
 * @return {{type: String, x: Array<Number>, y: Array<Number>, t: Array<Number>}} Simplified stroke object
 */
export function toJSON(stroke) {
  return { type: stroke.type, x: stroke.x, y: stroke.y, t: stroke.t };
}

/**
 * Mutate a stroke by adding a point to it.
 * @param {Stroke} stroke Current stroke
 * @param {{x: Number, y: Number, t: Number}} point Point to add
 * @return {Stroke} Updated stroke
 */
export function addPoint(stroke, point) {
  const strokeReference = stroke;
  if (filterPointByAcquisitionDelta(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.width)) {
    strokeReference.x.push(point.x);
    strokeReference.y.push(point.y);
    strokeReference.t.push(point.t);
    strokeReference.p.push(computePressure(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, strokeReference.x.length - 1));
    strokeReference.l.push(computeLength(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, strokeReference.x.length - 1));
  } else {
    logger.debug('ignore filtered point', point);
  }
  return strokeReference;
}

/**
 * Slice a stroke and return the sliced part of it
 * @param {Stroke} stroke Current stroke
 * @param {Number} [start=0] Zero-based index at which to begin extraction
 * @param {Number} [end=length] Zero-based index at which to end extraction
 * @return {Stroke} Sliced stroke
 */
export function slice(stroke, start = 0, end = stroke.x.length) {
  const slicedStroke = createStrokeComponent({ color: stroke.color, width: stroke.width });
  for (let i = start; i < end; i++) {
    addPoint(slicedStroke, {
      x: stroke.x[i],
      y: stroke.y[i],
      t: stroke.t[i]
    });
  }
  return slicedStroke;
}

/**
 * Extract point by index
 * @param {Stroke} stroke Current stroke
 * @param {Number} index Zero-based index
 * @return {{x: Number, y: Number, t: Number, p: Number, l: Number}} Point with properties for quadratics draw
 */
export function getPointByIndex(stroke, index) {
  let point;
  if (index !== undefined && index >= 0 && index < stroke.x.length) {
    point = {
      x: stroke.x[index],
      y: stroke.y[index],
      t: stroke.t[index],
      p: stroke.p[index],
      l: stroke.l[index]
    };
  }
  return point;
}
