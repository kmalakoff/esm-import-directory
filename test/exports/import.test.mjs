import assert from 'assert';
import importDirectory from 'esm-import-directory';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof importDirectory, 'function');
  });
});
