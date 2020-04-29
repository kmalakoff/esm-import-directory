import path from 'path';
import url from 'url';
import chai from 'chai';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('recursive', () => {
  it('recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: false });
    assert.equal(results.length, 1);
  });

  it('recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { recursive: true });
    assert.equal(results.length, 5);
  });
});
