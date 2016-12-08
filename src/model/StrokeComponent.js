function computeDistance(x, y, xArray, yArray, lastIndexPoint) {
  let distance = Math.sqrt(Math.pow((y - yArray[lastIndexPoint - 1]), 2) + Math.pow((x - xArray[lastIndexPoint - 1]), 2));

  if (isNaN(distance)) {
    distance = 0;
  }

  return distance;
}

function computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
  let length = lArray[lastIndexPoint - 1] + computeDistance(x, y, xArray, yArray, lastIndexPoint);

  if (isNaN(length)) {
    length = 0;
  }

  return length;
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
  let pressure = ratio * Math.max(0.1, 1.0 - (0.1 * Math.sqrt(distance)));
  if (isNaN(parseFloat(pressure))) {
    pressure = 0.5;
  }
  return pressure;
}

function filterPointByAcquisitionDelta(x, y, xArray, yArray, lastIndexPoint, width, length) {
  const delta = (2 + (width / 4));
  let ret = false;
  if (length === 0 || Math.abs(xArray[lastIndexPoint] - x) >= delta || Math.abs(yArray[lastIndexPoint] - y) >= delta) {
    ret = true;
  }
  return ret;
}

/**
 * Create a new stroke
 * @param obj
 * @return {{type: string, x: Array, y: Array, t: Array, p: Array, d: Array, l: Array, width: number}}
 */
export function createStrokeComponent(obj) {
  const defaultStroke = {
    type: 'stroke',
    x: [],
    y: [],
    t: [],
    p: [],
    d: [],
    l: [],
    width: 0
  };
  return Object.assign({}, defaultStroke, obj);
}

/**
 * Get a JSON copy of a stroke by filtering its properties
 * @param stroke
 * @return {{type, x, y, t}}
 */
export function toJSON(stroke) {
  return { type: stroke.type, x: stroke.x, y: stroke.y, t: stroke.t };
}

export function getLength(stroke) {
  return stroke.x.length;
}

function getLastIndexPoint(stroke) {
  return stroke.x.length - 1;
}

/**
 * Mutate a stroke by adding a point to it.
 *
 * @param stroke
 * @param point
 * @returns stroke
 */
export function addPoint(stroke, point) {
  const strokeReference = stroke;
  if (filterPointByAcquisitionDelta(point.x, point.y, strokeReference.x, strokeReference.y, getLastIndexPoint(strokeReference), strokeReference.width, strokeReference.x.length)) {
    strokeReference.x.push(point.x);
    strokeReference.y.push(point.y);
    strokeReference.t.push(point.t);
    strokeReference.p.push(computePressure(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, getLastIndexPoint(strokeReference)));
    strokeReference.d.push(computeDistance(point.x, point.y, strokeReference.x, strokeReference.y, getLastIndexPoint(strokeReference)));
    strokeReference.l.push(computeLength(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, getLastIndexPoint(strokeReference)));
  }
  return strokeReference;
}

/**
 * Slice a stroke and return the sliced part of it
 * @param stroke
 * @param start
 * @param end
 * @return {{type: string, x: Array, y: Array, t: Array, p: Array, d: Array, l: Array, width: number}}
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

export function getPointByIndex(stroke, index) {
  let point;
  if (index !== undefined && index >= 0 && index < stroke.x.length) {
    point = {
      x: stroke.x[index],
      y: stroke.y[index],
      t: stroke.t[index],
      p: stroke.p[index],
      d: stroke.d[index],
      l: stroke.l[index]
    };
  }
  return point;
}

/**
 * Get the stroke bounding box
 * @param stroke
 * @return {{minX: number, maxX: number, minY: number, maxY: number}}
 */
export function getStrokeBounds(stroke) {
  return {
    minX: Math.min(...stroke.x),
    maxX: Math.max(...stroke.x),
    minY: Math.min(...stroke.y),
    maxY: Math.max(...stroke.y)
  };
}
