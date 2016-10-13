import { describe, it, beforeEach } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { testLogger as logger } from '../../src/configuration/LoggerConfig';
import { InkPaper } from '../../src/MyScriptJS';
import * as Point from '../../src/model/Point';

const document = {};

describe('Testing the MyScriptJS librairy', () => {
  let fakeDomElement;

  beforeEach(() => {
    fakeDomElement = sinon.spy();
  });

  it('Testing pen-down', () => {
    const fakePoint = Point.createPoint(12, 16);
    // const inkPaperUnderTest = new InkPaper().penDown(fakePoint, 1);
  });
});
