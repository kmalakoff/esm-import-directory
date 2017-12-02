import path from 'path';
import { assert } from 'chai';

import importDirectory from '../..';

const dirname = path.dirname(import.meta.url.replace('file://', ''));
const DATA_DIRECTORY = path.join(dirname, '..', 'data', 'directory');

describe('defaultOptions', () => {
  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false });
    assert.equal(results.length, 1);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true });
    assert.equal(results.length, 5);
  });
});
