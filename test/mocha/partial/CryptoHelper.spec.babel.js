import { describe, it } from 'mocha';
import { assert } from 'chai';
import * as CryptoHelper from '../../../src/recognizer/CryptoHelper';

describe('Hmac computation test', () => {
  it('nominal case', () => {
    const computedHmac = CryptoHelper.computeHmac('Message', 'Key');
    assert.equal(computedHmac, '7a2d9a9ad584ccbb3c110bf4e94d8dfef284eb258da89b2aeb01c43fa7e9d719a2b765af3f208f62ed36723d9562b9fe68a9f7e38b49e2ae6558deadcb274d8f');
  });
});
