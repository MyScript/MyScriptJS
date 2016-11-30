import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
import { testLogger as logger } from '../../../../src/configuration/LoggerConfig';
import * as StrokeComponent from '../../../../src/model/StrokeComponent';

describe('Check StrokeComponent', () => {
  describe('constructor', () => {
    let obj;
    let stroke;

    beforeEach(() => {
      stroke = StrokeComponent.createStrokeComponent(obj);
    });

    it('Check mandatory properties', () => {
      assert.property(stroke, 'type');
      assert.propertyVal(stroke, 'type', 'stroke');
      assert.property(stroke, 'x');
      assert.property(stroke, 'y');
      assert.property(stroke, 't');
      assert.property(stroke, 'p');
      assert.property(stroke, 'd');
      assert.property(stroke, 'l');
      assert.property(stroke, 'width');
    });

    obj = { color: '#000F55', width: 3, x: [10, 20], y: [30, 40], t: [50, 60] };
    Object.keys(obj).forEach((key) => {
      it(`Check custom constructor param ${key}`, () => {
        assert.property(stroke, key);
        assert.propertyVal(stroke, key, obj[key]);
      });
    });

    it('Check toJSON function', () => {
      assert.deepEqual({ type: 'stroke', x: obj.x, y: obj.y, t: obj.t }, StrokeComponent.toJSON(stroke));
    });
  });

  describe('workflow', () => {
    const stroke = StrokeComponent.createStrokeComponent();

    const pointsNb = 10;
    it(`Check addPoint (adding ${pointsNb} points)`, () => {
      for (let i = 0; i < pointsNb; i++) {
        StrokeComponent.addPoint(stroke, { x: i, y: i * 2, t: i * 3 });
      }
    });

    it(`Check length  === ${pointsNb}`, () => {
      assert.equal(pointsNb, StrokeComponent.getLength(stroke), 'Length of stroke is not as expected');
    });

    it('Check getPointByIndex', () => {
      const point = { x: 5, y: 10, t: 15, p: 0.6372367375521082, d: 2.23606797749979, l: 11.180339887498949 };
      assert.deepEqual(point, StrokeComponent.getPointByIndex(stroke, 5));
    });

    it('Check getBounds', () => {
      const bounds = { minX: 0, maxX: 9, minY: 0, maxY: 18 };
      assert.deepEqual(bounds, StrokeComponent.getStrokeBounds(stroke));
    });

    it('Check slice', () => {
      const slicedStroke = { type: 'stroke', x: [5, 6, 7, 8, 9], y: [10, 12, 14, 16, 18], t: [15, 18, 21, 24, 27], p: [0.5, 0.8504651218778779, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082], d: [0, 2.23606797749979, 2.23606797749979, 2.23606797749979, 2.23606797749979], l: [0, 2.23606797749979, 4.47213595499958, 6.708203932499369, 8.94427190999916], width: 0, color: undefined };
      assert.deepEqual(slicedStroke, StrokeComponent.slice(stroke, 5));
    });
  });

  // TODO Test all other function
});
