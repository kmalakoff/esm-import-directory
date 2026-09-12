import assert from 'assert';
import importDirectory from 'esm-import-directory';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');
const isModule = typeof __filename === 'undefined';

describe('default', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  it('default: true, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: false });
    assert.equal((results as unknown[]).length, isModule ? 1 : 2);
  });

  it('default: true, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: true, recursive: true });
    assert.equal((results as unknown[]).length, isModule ? 5 : 10);
  });

  it('default: false, recursive: false', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: false });
    assert.equal((results as unknown[]).length, 2);
  });

  it('default: false, recursive: true', async () => {
    const results = await importDirectory(DATA_DIR, { default: false, recursive: true });
    assert.equal((results as unknown[]).length, 10);
  });
});
