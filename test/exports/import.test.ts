import assert from 'assert';
import importDirectory from 'esm-import-directory';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof importDirectory, 'function');
  });
});
