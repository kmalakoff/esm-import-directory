import path from 'path';
import url from 'url';
import chai from 'chai';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIRECTORY = path.join(__dirname, '..', 'data', 'directory');

describe('default', () => {
  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: true, recursive: false });
    assert.equal(results.length, 1);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: true, recursive: true });
    assert.equal(results.length, 5);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: false, recursive: false });
    assert.equal(results.length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIRECTORY, { default: false, recursive: true });
    assert.equal(results.length, 10);
  });
});
