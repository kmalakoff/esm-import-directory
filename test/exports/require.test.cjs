const assert = require('assert');
const importDirectory = require('esm-import-directory');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof importDirectory, 'function');
  });
});
