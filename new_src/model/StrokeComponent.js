
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

export const defaultStroke = {
  type: 'stroke',
  x: [],
  y: [],
  t: [],
  p: [],
  d: [],
  l: [],
  color: undefined,
  alpha: undefined,
  width: 0 };

export function createStrokeComponent(obj) {
  const stroke = Object.assign(Object.assign({}, defaultStroke), obj);
  return stroke;
}


export function toJSON(stroke) {
  // TODO Check why t is not managed by cloud backend
  return { type: stroke.type, x: stroke.x, y: stroke.y, t: stroke.t };
}


export function getLength(stroke) {
  return stroke.x.length;
}

export function getLastIndexPoint(stroke) {
  return stroke.x.length - 1;
}

export function addPoint(stroke, point) {
  const strokecopy = Object.assign({}, stroke);
  if (filterPointByAcquisitionDelta(strokecopy, point.x, point.y, strokecopy.x, strokecopy.y, getLastIndexPoint(strokecopy), strokecopy.width, strokecopy.x.length)) {
    strokecopy.x.push(point.x);
    strokecopy.y.push(point.y);
    strokecopy.t.push(point.t);
    strokecopy.p.push(computePressure(point.x, point.y, strokecopy.x, strokecopy.y, strokecopy.l, getLastIndexPoint(strokecopy)));
    strokecopy.d.push(computeDistance(point.x, point.y, strokecopy.x, strokecopy.y, getLastIndexPoint(strokecopy)));
    strokecopy.l.push(computeLength(point.x, point.y, strokecopy.x, strokecopy.y, strokecopy.l, getLastIndexPoint(strokecopy)));
  }
  return strokecopy;
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
      l: stroke.l[index] };
  }
  return point;
}

