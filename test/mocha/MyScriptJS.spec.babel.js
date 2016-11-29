import { describe, it, beforeEach } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';

describe('Testing the MyScriptJS library', () => {
  let fakeDomElement;

  beforeEach(() => {
    fakeDomElement = sinon.spy();
  });

  it('Testing pen-down', () => {
    // const inkPaperUnderTest = new InkPaper().endPendingStroke(fakePoint, 1);
  });
});
