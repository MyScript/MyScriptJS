import { beforeEach, describe, it } from 'mocha';
import { assert } from 'chai';
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
    const filledStroke = { type: 'stroke', x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], y: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], t: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27], p: [0.5, 0.8504651218778779, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082], l: [0, 2.23606797749979, 4.47213595499958, 6.708203932499369, 8.94427190999916, 11.180339887498949, 13.416407864998739, 15.652475842498529, 17.88854381999832, 20.12461179749811], width: 0 };
    it(`Check addPoint (adding ${pointsNb} points)`, () => {
      for (let i = 0; i < pointsNb; i++) {
        StrokeComponent.addPoint(stroke, { x: i, y: i * 2, t: i * 3 });
      }
      assert.deepEqual(filledStroke, stroke);
    });

    const point = { x: 5, y: 10, t: 15, p: 0.6372367375521082, l: 11.180339887498949 };
    it('Check getPointByIndex', () => {
      assert.deepEqual(point, StrokeComponent.getPointByIndex(stroke, 5));
    });

    const slicedStroke = { type: 'stroke', x: [5, 6, 7, 8, 9], y: [10, 12, 14, 16, 18], t: [15, 18, 21, 24, 27], p: [0.5, 0.8504651218778779, 0.6372367375521082, 0.6372367375521082, 0.6372367375521082], l: [0, 2.23606797749979, 4.47213595499958, 6.708203932499369, 8.94427190999916], width: 0, color: undefined };
    it('Check slice', () => {
      assert.deepEqual(slicedStroke, StrokeComponent.slice(stroke, 5));
    });
  });

  // TODO Test all other function
});
