import path from 'path';
import url from 'url';
import assert from 'assert';

import importDirectory from '../../lib/index.mjs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('default', () => {
  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: false });
    assert.equal(results.length, 1);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: true });
    assert.equal(results.length, 5);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: false });
    assert.equal(results.length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: true });
    assert.equal(results.length, 10);
  });
});
